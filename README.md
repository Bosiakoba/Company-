# Young Future Tech

Agency marketing site: React, Vite, Tailwind. Contact and newsletter flows use a small Node server (`server.ts`) plus [Resend](https://resend.com) for email.

## Local development

1. **Install**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set:

   - `RESEND_API_KEY` — from Resend
   - `RESEND_FROM_EMAIL` — a sender Resend has verified
   - `CONTACT_RECEIVER_EMAIL` — your inbox for leads

   Never commit `.env.local` or real API keys. `.gitignore` ignores `.env*` except `.env.example` (placeholders only). If a key was ever pushed, rotate it in the provider (e.g. Resend) and rewrite Git history; then force-push.

3. **Run**

   ```bash
   npm run dev
   ```

   The site and `POST /api/contact` are served by the same process.

## Production build

```bash
npm run build
npm run start
```

`npm run start` runs the preview server (`tsx server.ts --preview`) so static files and `/api/contact` still work. If you deploy only static files to a CDN (no Node), you must add a serverless function or external form backend that matches what `lib/lead.ts` posts to `/api/contact`.

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Dev server + Vite + API        |
| `npm run build`| Vite build to `dist/`          |
| `npm run start`| Preview `dist/` + API        |
| `npm run lint` | ESLint (requires `npm install`)|
