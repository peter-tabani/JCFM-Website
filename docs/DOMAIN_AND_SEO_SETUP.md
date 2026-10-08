# Domain and search setup

The Vercel project is `jcfm-website` in Frank's projects. Its Production Branch
is `master`. `jesuschristfounderministry.com` is attached, but Vercel currently
shows **Invalid Configuration** until DNS is updated at Namecheap.

1. Sign in to Namecheap, open Domain List > Manage for
   `jesuschristfounderministry.com` > Advanced DNS.
2. For the root domain, set **A Record**, host **@**, value **216.198.79.1**.
   Remove only conflicting `@` A/AAAA/URL Redirect records. Keep MX/TXT records
   used for email. This value is what the Vercel project currently requests;
   check its Settings > Domains screen before saving if it changes.
3. In Vercel Settings > Domains, refresh the domain until it shows **Valid
   Configuration**. Vercel will then issue HTTPS automatically. Visit the
   domain and confirm it serves the current `master` website.
4. After the current code is deployed, check `/robots.txt` and `/sitemap.xml`
   on the new domain. Public page canonical URLs and social previews use this
   domain. Admin, login, portal and the unfinished Journey page are excluded
   from indexing.
5. Verify the domain in Google Search Console and submit
   `https://jesuschristfounderministry.com/sitemap.xml`. Search appearance can
   take time; submitting a sitemap does not guarantee ranking.

If you later add `www.jesuschristfounderministry.com`, point it to the CNAME
shown by Vercel and set a redirect to the root domain, keeping one canonical
version. Do not redirect the new domain to `jcfm.online`, which serves the older
site.
