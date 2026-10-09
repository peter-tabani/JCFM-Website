# Photo uploads

The church and school footer links open `/admin/uploads`. Only signed-in
administrators can request an upload token, create media records, or manage
uploaded photos. Images upload directly from the browser to Vercel Blob. The
database stores the public image URL and caption; photo bytes do not pass
through the Next.js API.

## Vercel setup

In the `jcfm-website` project's **Storage** page, create a **Blob** store.
Select **Public** access because the photos appear on public pages. Connect it
to this project with **Add a read-write token env var to this connection**
checked. This adds `BLOB_READ_WRITE_TOKEN` to the selected environments.
Redeploy the site after connecting the store so functions receive the token.
The token is secret and must never be added to client code or committed.

Vercel Blob has a Hobby allowance, but storage, operations and delivery have
usage limits and may have charges on other plans. Check the current Vercel
pricing before uploading a large library.

## Use

Sign in with an existing admin account, choose the site section, select one
or more images, add an optional caption, then upload. New photos appear before
built-in photos. The upload page can hide or delete previously uploaded images.
Deleting an uploaded image removes its database record and attempts to remove
its Blob file. Existing images in the repository remain unchanged.

For local testing, install dependencies with `npm install` and use a local
`BLOB_READ_WRITE_TOKEN` from Vercel in a gitignored `.env` file. Vercel's
completion callback cannot reach localhost, though the browser upload and
database save can still be tested on the deployed site.
