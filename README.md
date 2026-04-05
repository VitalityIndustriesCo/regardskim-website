# RegardsKim Website + Dashboard (Single Next.js App)

This project serves both the public marketing site and the authenticated dashboard in one Next.js deployment.

## Routes

- Public marketing: `/`
- Public auth/setup: `/login`, `/onboarding`
- Protected app: `/inbox`, `/inbox/[id]`, `/connections`, `/settings` (+ nested settings pages), `/billing`, `/analytics`

## Auth model

- Login stores JWT token in:
  - `localStorage` (`token`) for client API calls
  - `token` cookie for middleware route protection
- Middleware protects app routes and redirects unauthenticated users to `/login?redirect=<path>`.
- Marketing pages remain fully public.

## Environment variables

Copy `.env.example` to `.env.local` and set values as needed:

```bash
cp .env.example .env.local
```

Required:

- `NEXT_PUBLIC_API_URL` — backend base URL for all dashboard API calls.
  - Production backend: `https://regardskim-app-production.up.railway.app`

If omitted, the app currently defaults to the same Railway URL in `src/lib/api.ts`.

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

Build should include marketing + dashboard routes in one project.
