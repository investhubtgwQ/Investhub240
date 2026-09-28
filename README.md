# Invest Plus

Invest Plus is a crypto investment wallet platform with customer authentication,
wallet balances, deposits, withdrawals, swaps, investment plans, and an
administrator approval dashboard.

## Local development

Install dependencies and run the checks:

```bash
npm install --legacy-peer-deps
npm run build
```

The workspace contains the Invest Plus frontend, the API server, and the
component preview sandbox. The frontend calls the API through same-origin
`/api` routes; no frontend API URL variable is required.

## Vercel deployment

This repository is configured for Vercel as:

- a Vite static frontend built to `artifacts/invest-plus/dist/public`
- serverless Express API functions under `/api`
- SPA fallback routing for client-side frontend routes

Import the repository into Vercel with the repository root as the project root.
The checked-in `vercel.json` supplies the install command, build command,
function configuration, output directory, and SPA rewrite.

### Required environment variables

Configure these variables in the Vercel project for every environment that
serves the API:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Secret used to hash and sign authenticated sessions |
| `ADMIN_EMAIL` | Administrator login email |
| `ADMIN_PASSWORD` | Administrator login password |

`LOG_LEVEL` is optional and defaults to `info`.

Do not expose these server variables as `VITE_*` variables. The frontend uses
relative `/api` requests so the browser and API remain on the same origin.

### Build verification

The deployment build can be reproduced locally with:

```bash
npm install --legacy-peer-deps
npm run build
npm run build --workspace=@workspace/api-server
npm run typecheck --workspace=@workspace/mockup-sandbox
```