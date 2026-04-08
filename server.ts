import fs from 'node:fs';
import path from 'node:path';
import { createServer as createHttpServer, type IncomingMessage, type ServerResponse } from 'node:http';

import * as dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const PREVIEW_MODE = process.argv.includes('--preview');
const ROOT = process.cwd();
const DIST_DIR = path.resolve(ROOT, 'dist');

type LeadSubmission =
  | {
      kind: 'contact';
      firstName: string;
      lastName: string;
      email: string;
      projectType: string;
      details?: string[];
      message: string;
    }
  | {
      kind: 'newsletter';
      email: string;
    };

class ResendApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ResendApiError';
  }
}

const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL || 'receiver@example.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sendJson(res: ServerResponse, statusCode: number, payload: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });

    req.on('error', reject);
  });
}

async function readJson<T>(req: IncomingMessage): Promise<T> {
  const raw = await readBody(req);
  return raw ? (JSON.parse(raw) as T) : ({} as T);
}

async function sendLeadEmail(submission: LeadSubmission) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing from the environment.');
  }

  const selectedDetails = submission.kind === 'contact' ? submission.details?.filter(Boolean) ?? [] : [];

  const email =
    submission.kind === 'contact'
      ? {
          subject: `New website inquiry from ${submission.firstName} ${submission.lastName}`,
          text: [
            'New contact form submission',
            `Name: ${submission.firstName} ${submission.lastName}`,
            `Email: ${submission.email}`,
            `Project Type: ${submission.projectType}`,
            ...(selectedDetails.length
              ? ['', 'Selected Details:', ...selectedDetails.map((detail) => `- ${detail}`)]
              : []),
            '',
            'Additional Notes:',
            submission.message,
          ].join('\n'),
          html: `
            <h2>New contact form submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(submission.firstName)} ${escapeHtml(submission.lastName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
            <p><strong>Project Type:</strong> ${escapeHtml(submission.projectType)}</p>
            ${
              selectedDetails.length
                ? `<p><strong>Selected Details:</strong></p><ul>${selectedDetails
                    .map((detail) => `<li>${escapeHtml(detail)}</li>`)
                    .join('')}</ul>`
                : ''
            }
            <p><strong>Additional Notes:</strong></p>
            <p style="white-space:pre-wrap;">${escapeHtml(submission.message)}</p>
          `,
        }
      : {
          subject: `New newsletter signup from ${submission.email}`,
          text: [
            'New newsletter signup',
            `Email: ${submission.email}`,
          ].join('\n'),
          html: `
            <h2>New newsletter signup</h2>
            <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
          `,
        };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [RECEIVER_EMAIL],
      subject: email.subject,
      text: email.text,
      html: email.html,
    }),
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ResendApiError(response.status, result?.message || 'Resend rejected the message.');
  }
}

async function handleLeadRequest(req: IncomingMessage, res: ServerResponse) {
  try {
    const submission = await readJson<LeadSubmission>(req);

    if (!submission || typeof submission !== 'object' || !('kind' in submission)) {
      sendJson(res, 400, { success: false, error: 'Invalid form submission.' });
      return;
    }

    if (submission.kind === 'contact') {
      const { firstName, lastName, email, projectType, message } = submission;

      if (!firstName || !lastName || !email || !projectType || !message) {
        sendJson(res, 400, { success: false, error: 'Please fill out every contact field.' });
        return;
      }

      await sendLeadEmail(submission);
      sendJson(res, 200, { success: true, message: 'Contact form sent successfully.' });
      return;
    }

    if (submission.kind === 'newsletter') {
      if (!submission.email) {
        sendJson(res, 400, { success: false, error: 'Please provide an email address.' });
        return;
      }

      await sendLeadEmail(submission);
      sendJson(res, 200, { success: true, message: 'Newsletter signup sent successfully.' });
      return;
    }

    sendJson(res, 400, { success: false, error: 'Unsupported submission type.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send the form right now.';

    if (error instanceof ResendApiError) {
      sendJson(res, error.status, { success: false, error: message });
      return;
    }

    sendJson(res, 500, { success: false, error: message });
  }
}

function contentTypeFor(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
    case '.mjs':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.mp4':
      return 'video/mp4';
    case '.woff':
      return 'font/woff';
    case '.woff2':
      return 'font/woff2';
    case '.ico':
      return 'image/x-icon';
    case '.html':
    default:
      return 'text/html; charset=utf-8';
  }
}

function serveFile(filePath: string, res: ServerResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', contentTypeFor(filePath));
  fs.createReadStream(filePath).pipe(res);
}

function servePreviewRequest(req: IncomingMessage, res: ServerResponse) {
  const requestUrl = new URL(req.url || '/', 'http://localhost');
  const pathname = decodeURIComponent(requestUrl.pathname);
  const filePath = pathname === '/' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, pathname);

  if (pathname !== '/' && fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(filePath, res);
    return;
  }

  serveFile(path.join(DIST_DIR, 'index.html'), res);
}

function listenWithFallback(
  server: ReturnType<typeof createHttpServer>,
  host: string,
  initialPort: number,
  label: string
) {
  const attemptListen = (port: number): Promise<number> =>
    new Promise((resolve, reject) => {
      const onError = (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
          console.log(`Port ${port} is in use, trying another one...`);
          server.removeListener('error', onError);
          void attemptListen(port + 1).then(resolve, reject);
          return;
        }

        reject(error);
      };

      server.once('error', onError);
      server.listen(port, host, () => {
        server.removeListener('error', onError);
        resolve(port);
      });
    });

  void attemptListen(initialPort).then((port) => {
    const displayHost = host === '0.0.0.0' ? 'localhost' : host;
    console.log(`${label} ready at http://${displayHost}:${port}`);
  });
}

async function start() {
  if (PREVIEW_MODE) {
    if (!fs.existsSync(DIST_DIR)) {
      throw new Error('Build output not found. Run "npm run build" before previewing.');
    }

    const server = createHttpServer((req, res) => {
      const pathname = new URL(req.url || '/', 'http://localhost').pathname;

      if (req.method === 'POST' && pathname === '/api/contact') {
        void handleLeadRequest(req, res);
        return;
      }

      if (req.method === 'GET' || req.method === 'HEAD') {
        servePreviewRequest(req, res);
        return;
      }

      sendJson(res, 405, { success: false, error: 'Method not allowed.' });
    });
    listenWithFallback(server, HOST, PORT, 'Preview server');
    return;
  }

  const vite = await createViteServer({
    server: {
      middlewareMode: true,
    },
    appType: 'spa',
  });

  const server = createHttpServer((req, res) => {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname;

    if (req.method === 'POST' && pathname === '/api/contact') {
      void handleLeadRequest(req, res);
      return;
    }

    vite.middlewares(req, res, () => {
      void (async () => {
        try {
          const url = req.url || '/';
          const template = fs.readFileSync(path.resolve(ROOT, 'index.html'), 'utf-8');
          const html = await vite.transformIndexHtml(url, template);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (error) {
          vite.ssrFixStacktrace(error as Error);
          res.statusCode = 500;
          res.end(error instanceof Error ? error.stack || error.message : String(error));
        }
      })();
    });
  });

  listenWithFallback(server, HOST, PORT, 'Dev server');
}

void start();
