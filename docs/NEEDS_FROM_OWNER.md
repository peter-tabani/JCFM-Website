# What's left for you (Admin & Public Site)

This covers the admin console + public-site work. For payments/accounts setup
see `docs/PAYMENTS_SETUP.md`.

## 1. Add your real content (in the admin console)

Sign in at `/login` as an admin, then add real data — it saves to the database
and (where wired) shows on the public site:

- **Life at JCFM** (`/admin/media`) — upload photos **and videos (including sermons)**; each shows in the "Life at JCFM" gallery on the home page, where visitors click a thumbnail to open a watch screen with next/prev arrows. Choose Photo or Video, give a title + category, and paste an image URL or a YouTube/Vimeo link.
- **Members** (`/admin/members`) — private directory; **not** shown publicly.
- **Events** (`/admin/events`) — published events appear on the **home page**
  "Upcoming Events" section. Until you add events, the section shows the 3
  placeholder posters from the old design.
- **Leadership** (`/admin/team`) — the people here are the public `/leadership`
  page. It's pre-seeded with the original 5; edit/add/remove as you like.

## 2. Images (you host them)

There is no file-upload yet — image fields take a **URL or a path**:

- **Event posters / team photos:** either use an existing in-repo path
  (e.g. `/images/events/event1.jpeg`, `/images/staff/director.png`) or paste a
  full `https://…` URL to an image you host (e.g. Cloudinary, imgur, your CDN).
- If you want true in-dashboard image upload, that's a future addition (needs a
  storage provider like Cloudinary/S3) — tell me and I'll wire it.

## 3. Things deliberately left as SAMPLE (clearly labelled in the UI)

These were **not** in the approved scope, so they still show placeholder data
and are marked with a "Sample data" badge in the admin:

- **Branches** (`/admin/branches`) — directory + attendance are placeholders.
  The branch **count** (9) is real (from the site's branch list).
- **School** (`/admin/school`) — enrolment, fees, applications are placeholders.
- **Settings** (`/admin/settings`) — does not save yet.
- **Overview** dashboard — the **activity feed**, **calendar**, and per-branch
  attendance numbers are still sample; the Members / Sermons / Giving / Branches
  figures are **real**.

No public **Sermons** or **Branches** section was added to the site (you didn't
approve adding new public sections), so admin Sermons/Branches are not visible
to the public yet. Say the word and I'll add those sections.

## 4. Donations

- The admin **Donations** ledger is the **real** online giving (Stripe + PayPal),
  read-only, in USD.
- **Manual/offline donation entry was not built** (not in scope). If you want to
  log cash/M-Pesa/bank gifts in the same ledger, I can add that.

## 5. Admin accounts & security

- Change the seeded admin password (`ChangeMe123!`) — there is **no
  change-password screen yet**; for now reset it by re-running the seed with a
  new `SEED_ADMIN_PASSWORD`, or ask me to add a change-password form.
- Grant admin to more people by adding their email to `ADMIN_EMAILS`
  (`lib/admin.ts`) before they sign up, or by running the seed for them.
- All admin write APIs require an admin session (verified: they return 403 to
  everyone else).

## 6. Reminder

- Database migrations are additive only; nothing was dropped.
- Secrets stay in `.env` (gitignored). Never commit real keys.
