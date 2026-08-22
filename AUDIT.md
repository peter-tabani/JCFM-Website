# JCFM Website — Audit & Deployment Readiness

Stack: Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict), Tailwind CSS 4, NextAuth 4, Resend, Twilio. ~79 components/pages across a public church site, a school/admissions section, a donor portal, and an admin console.

Verified locally: `npx tsc --noEmit` (clean), `npm run lint` (was broken, now working — see below), `npm audit` (was 16 vulnerabilities, now 0), `npm run build` (font step needs outbound internet — see Deployment notes).

## Fixed during this pass

**Admin login could be bypassed with any password.** `CredentialsProvider` in `app/api/auth/[...nextauth]/route.ts` accepted *any non-empty password* for the allowlisted admin emails in `lib/admin.ts` — those emails are printed right on the public `/login` page ("Demo Credentials: admin@jcfm.org · any password"). Anyone could sign in to `/admin` this way. Fixed: the credentials provider and its form are now compiled out in production (`NODE_ENV=production`) — admin sign-in works only through Google OAuth in production, still allowlist-gated by `lib/admin.ts`. Demo login still works in `npm run dev` for local testing.

**Session secret silently fell back to a hardcoded default.** `NEXTAUTH_SECRET` defaulted to the literal string `"jcfm-dev-secret-change-me"` if the env var was missing — a public, guessable secret would let anyone forge a valid admin session cookie. Fixed: the app now throws on startup in production if `NEXTAUTH_SECRET` isn't set, instead of running insecurely.

**Donor signup endpoints were an open relay.** `/api/donor-welcome` and `/api/donor-sms` are unauthenticated by design (called from a public signup form), but had no input validation — anyone could POST arbitrary `name`/`email`/`phone` values and use your Resend/Twilio credits to send email or SMS to any address, and the `name` field was interpolated unescaped into the email HTML (basic HTML injection). Fixed: both routes now validate email/phone format and length, and the email route HTML-escapes the name. Added Nginx-level rate limiting on both routes in `deploy/nginx.conf.example` as a second layer, since app-level validation alone doesn't stop volume abuse.

**`npm audit`: 16 vulnerabilities → 0.** Mostly transitive (axios/form-data pulled in by Twilio, plus a Next.js point release with several patched CVEs). `npm audit fix` handled the transitive ones; `next` was bumped 16.1.6 → 16.3.0 (same major).

**`npm run lint` crashed outright** with `TypeError: Converting circular structure to JSON`, so no lint had been running. Root cause: `eslint.config.mjs` wrapped `next/core-web-vitals` through `@eslint/eslintrc`'s `FlatCompat`, which breaks on this ESLint version because `eslint-plugin-react`'s flat config self-references. This is a known upstream issue ([vercel/next.js#84596](https://github.com/vercel/next.js/discussions/84596)). Fixed by switching to the flat configs Next.js now ships directly (`eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`), bypassing the compat layer. Lint now runs and found real issues (below).

**Two real bugs lint surfaced, fixed:**
- `components/admin/AdminSidebar.tsx` defined a `Section` component *inside* the parent's render function, so it was recreated on every render — a React anti-pattern that resets any state/DOM inside it and hurts perf. Moved it to module scope.
- `app/api/donor-sms/route.ts` used `require("twilio")` inside an ES module (forbidden by the TypeScript ESLint rules, and inconsistent with the `resend` route's dynamic `import()`). Switched to `await import("twilio")`.

**Added:** security response headers and `robots.txt` (`next.config.ts`, `app/robots.ts`), `.env.example` documenting every required variable, `ecosystem.config.js` (PM2), `deploy/nginx.conf.example`, and `DEPLOYMENT.md` with step-by-step VPS setup.

## Still open — recommended before/soon after launch

**Before launch:**
- Generate a real password hash for each admin with `node scripts/hash-password.mjs "the real password"`, set it as `ADMIN_PASSWORD_HASH_ADMIN`/`_BISHOP`/`_COORDINATOR` on the server, and keep the allowlisted emails in `lib/admin.ts` in sync. Google sign-in was removed from the admin console (it let anyone with a matching Gmail in, with no password the ministry controls) — without a hash set, that admin simply can't sign in.
- `AuthGuard`/`DonorAuthGuard` (`components/admin/AuthGuard.tsx`, `components/donor/DonorAuthGuard.tsx`) only check the session client-side, in a `useEffect`. That's fine today because the admin pages only render hardcoded/static content, but if you wire in real data fetching later, protect those API calls server-side too (e.g. a `middleware.ts` checking the session, or a server-side check in each route handler) — a client-side-only guard doesn't stop someone from calling the underlying API directly.
- Two admin/donor pages call `setState` synchronously inside a `useEffect` (`app/donors/portal/(app)/projects/page.tsx:50`, `components/sections/UpcomingEvents.tsx:42`) — flagged by the new `react-hooks/set-state-in-effect` lint rule. Not breaking anything today, but worth a look; the usual fix is to derive the value during render instead of syncing it into state via an effect.

**Performance (worth doing, not blocking):**
- Every image on the site is a plain `<img>` (19 across `app/`/`components/`) instead of `next/image` — no automatic resizing, lazy-loading, or format conversion. `public/images/1.png` alone is 6.5 MB. This is the single biggest performance win available: swapping to `next/image` on the hero, staff photos, and gallery would cut page weight substantially. Lint now flags every instance (`@next/next/no-img-element`) so they're easy to find with `npm run lint`.
- No metadata beyond a title/description (no Open Graph tags, no `sitemap.xml` — `robots.txt` now points at one that doesn't exist yet). Worth adding before relying on search/social traffic.

**Housekeeping:**
- ~15 unused imports/variables flagged by lint (`no-unused-vars`) — cosmetic, safe to clean up whenever.
- The project isn't in git yet (no repo found in the folder). `DEPLOYMENT.md` assumes `git clone`/`git pull` for deploys — set up a repo (GitHub/GitLab) before following it, or swap that step for `rsync`/`scp`.

## Deployment

See `DEPLOYMENT.md` for the full PM2 + Nginx walkthrough. Two things worth flagging up front:

- `next build` fetches Google Fonts (Montserrat, Playfair Display) at build time — the build machine needs outbound internet access, or the build fails. (Confirmed this is what happened in my sandbox, which blocks that domain — not a bug in the project, just something to check on your VPS/CI.)
- `ecosystem.config.js` runs a single fork-mode PM2 instance on port 3000, proxied by Nginx per `deploy/nginx.conf.example`. Bump `instances` in the ecosystem file if you want cluster mode once traffic justifies it.
