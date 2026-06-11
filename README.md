This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploying to production

This app server-renders pages and uses API route handlers for auth, so it must
run as a **long-running Node.js server** (`next start`) — it is not a static
export.

### 1. Environment variables

Copy `.env.example` and fill it in. The only required variable is:

| Variable      | Required | Notes                                                      |
| ------------- | -------- | ---------------------------------------------------------- |
| `AUTH_SECRET` | **yes**  | Signs session cookies. Generate with `openssl rand -hex 32`. |

In production the app **refuses to sign sessions if `AUTH_SECRET` is unset** —
it will throw rather than silently fall back to an insecure dev secret.

### 2. Build and start

```bash
npm ci          # install exact, locked dependencies
npm run build   # produce the optimized production build
npm run start   # start the server (defaults to port 3000; override with PORT)
```

### 3. Data persistence (important)

User accounts are stored in a JSON file at `data/users.json` on the local
filesystem (see `lib/users.ts`). This means:

- The host **must provide a persistent, writable disk** mounted at the project
  root. A VPS, container with a volume, or a host like Railway/Render/Fly.io
  with a persistent volume all work.
- **Serverless/edge platforms (e.g. Vercel) will not persist this data** —
  their filesystems are read-only or ephemeral, so registrations and profile
  edits would be lost between requests. To deploy there, swap `lib/users.ts`
  for a hosted database (keeping the same exported functions) first.

The `data/` directory is gitignored and is created automatically on first
write, so no setup is needed beyond providing writable storage.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for platform-specific details.
