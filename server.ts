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
      companyName?: string;
      email: string;
      phone?: string;
      website?: string;
      country?: string;
      businessType?: string;
      projectType: string;
      scope?: string[];
      goals?: string[];
      pages?: string[];
      features?: string[];
      assets?: string[];
      stylePreference?: string;
      timeline?: string;
      budget?: string;
      currentWebsite?: string;
      referenceLinks?: string;
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

/** Inbox for Resend — set in `.env.local` (never commit real values). */
const RECEIVER_EMAIL = process.env.CONTACT_RECEIVER_EMAIL?.trim();
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

/** Reject oversized JSON bodies (abuse / accidental huge payloads). */
const MAX_BODY_BYTES = 256 * 1024;

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
    let total = 0;

    req.on('data', (chunk) => {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      total += buf.length;
      if (total > MAX_BODY_BYTES) {
        reject(new Error('PAYLOAD_TOO_LARGE'));
        return;
      }
      chunks.push(buf);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf8'));
    });

    req.on('error', reject);
  });
}

async function readJson<T>(req: IncomingMessage): Promise<T | null> {
  try {
    const raw = await readBody(req);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    if (error instanceof Error && error.message === 'PAYLOAD_TOO_LARGE') {
      throw error;
    }
    return null;
  }
}

async function sendLeadEmail(submission: LeadSubmission) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing from the environment.');
  }

  if (!RECEIVER_EMAIL) {
    throw new Error('CONTACT_RECEIVER_EMAIL is missing from the environment.');
  }

  const selectedGoals = submission.kind === 'contact' ? submission.goals?.filter(Boolean) ?? [] : [];
  const selectedPages = submission.kind === 'contact' ? submission.pages?.filter(Boolean) ?? [] : [];
  const selectedFeatures = submission.kind === 'contact' ? submission.features?.filter(Boolean) ?? [] : [];
  const selectedAssets = submission.kind === 'contact' ? submission.assets?.filter(Boolean) ?? [] : [];
  const selectedScope = submission.kind === 'contact' ? submission.scope?.filter(Boolean) ?? [] : [];

  const listBlock = (title: string, items: string[]) =>
    items.length
      ? ['', `${title}:`, ...items.map((item) => `- ${item}`)]
      : [];

  const htmlList = (items: string[]) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

  const email =
    submission.kind === 'contact'
      ? {
          subject: `New quote request from ${submission.firstName} ${submission.lastName}`,
          text: [
            'New quote request',
            `Name: ${submission.firstName} ${submission.lastName}`,
            submission.companyName ? `Company: ${submission.companyName}` : null,
            `Email: ${submission.email}`,
            submission.phone ? `Phone: ${submission.phone}` : null,
            submission.website ? `Website: ${submission.website}` : null,
            submission.country ? `Country: ${submission.country}` : null,
            submission.businessType ? `Business Type: ${submission.businessType}` : null,
            `Project Type: ${submission.projectType}`,
            submission.stylePreference ? `Style Preference: ${submission.stylePreference}` : null,
            submission.timeline ? `Timeline: ${submission.timeline}` : null,
            submission.budget ? `Budget: ${submission.budget}` : null,
            submission.currentWebsite ? `Current Website: ${submission.currentWebsite}` : null,
            submission.referenceLinks ? `Reference Links: ${submission.referenceLinks}` : null,
            ...listBlock('Project Scope', selectedScope),
            ...listBlock('Goals', selectedGoals),
            ...listBlock('Pages Needed', selectedPages),
            ...listBlock('Features', selectedFeatures),
            ...listBlock('Assets / Readiness', selectedAssets),
            '',
            'Project Brief:',
            submission.message,
          ]
            .filter((line): line is string => line !== null)
            .join('\n'),
          html: `
            <h2>New quote request</h2>
            <p><strong>Name:</strong> ${escapeHtml(submission.firstName)} ${escapeHtml(submission.lastName)}</p>
            ${submission.companyName ? `<p><strong>Company:</strong> ${escapeHtml(submission.companyName)}</p>` : ''}
            <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
            ${submission.phone ? `<p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>` : ''}
            ${submission.website ? `<p><strong>Website:</strong> ${escapeHtml(submission.website)}</p>` : ''}
            ${submission.country ? `<p><strong>Country:</strong> ${escapeHtml(submission.country)}</p>` : ''}
            ${submission.businessType ? `<p><strong>Business Type:</strong> ${escapeHtml(submission.businessType)}</p>` : ''}
            <p><strong>Project Type:</strong> ${escapeHtml(submission.projectType)}</p>
            ${submission.stylePreference ? `<p><strong>Style Preference:</strong> ${escapeHtml(submission.stylePreference)}</p>` : ''}
            ${submission.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(submission.timeline)}</p>` : ''}
            ${submission.budget ? `<p><strong>Budget:</strong> ${escapeHtml(submission.budget)}</p>` : ''}
            ${submission.currentWebsite ? `<p><strong>Current Website:</strong> ${escapeHtml(submission.currentWebsite)}</p>` : ''}
            ${submission.referenceLinks ? `<p><strong>Reference Links:</strong> ${escapeHtml(submission.referenceLinks)}</p>` : ''}
            ${selectedScope.length ? `<p><strong>Project Scope:</strong></p>${htmlList(selectedScope)}` : ''}
            ${selectedGoals.length ? `<p><strong>Goals:</strong></p>${htmlList(selectedGoals)}` : ''}
            ${selectedPages.length ? `<p><strong>Pages Needed:</strong></p>${htmlList(selectedPages)}` : ''}
            ${selectedFeatures.length ? `<p><strong>Features:</strong></p>${htmlList(selectedFeatures)}` : ''}
            ${selectedAssets.length ? `<p><strong>Assets / Readiness:</strong></p>${htmlList(selectedAssets)}` : ''}
            <p><strong>Project Brief:</strong></p>
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

    if (submission === null) {
      sendJson(res, 400, { success: false, error: 'Invalid form submission.' });
      return;
    }

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
    if (error instanceof Error && error.message === 'PAYLOAD_TOO_LARGE') {
      sendJson(res, 413, { success: false, error: 'Request body is too large.' });
      return;
    }

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
  let pathname = requestUrl.pathname;

  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    pathname = '/';
  }

  if (pathname === '/') {
    serveFile(path.join(DIST_DIR, 'index.html'), res);
    return;
  }

  const relative = pathname.replace(/^\/+/, '');
  const candidate = path.resolve(DIST_DIR, relative);
  const distRoot = path.resolve(DIST_DIR);
  const relToDist = path.relative(distRoot, candidate);
  const isInside = !relToDist.startsWith('..') && !path.isAbsolute(relToDist);

  if (isInside && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    serveFile(candidate, res);
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
