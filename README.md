# RegardsKim Website + Dashboard (Single Next.js App)

This project serves both the public marketing site and the authenticated embedded dashboard in one Next.js deployment.

## Routes

- Public marketing: `/`
- Protected app (embedded in Shopify Admin): `/inbox`, `/inbox/[id]`, `/connections`, `/settings` (+ nested), `/billing`, `/analytics`

## Auth model

- All app routes require an active Shopify embedded session (via App Bridge).
- Auth is handled exclusively via Shopify session tokens — no standalone login/signup.
- Middleware passes all requests carrying a `host` param (embedded) straight through.
- Non-embedded access to app routes redirects to `/#install`.

## Environment variables

Copy `.env.example` to `.env.local` and set values as needed:

```bash
cp .env.example .env.local
```

Required:

- `NEXT_PUBLIC_API_URL` — backend base URL for all dashboard API calls.
  - Production backend: `https://regardskim-app-production.up.railway.app`

If omitted, the app defaults to the Railway URL in `src/lib/api.ts`.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build check

```bash
npm run build
```
