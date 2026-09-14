# Vanessa Eroraha — UX Portfolio

Personal site for Vanessa Eroraha, a multi-disciplinary UX designer and product owner. The site is static HTML, CSS, and JavaScript, built with Vite.

Live reference: [vanessaeroraha.com](https://vanessaeroraha.com)

## Pages

URLs are extensionless: `/`, `/about`, `/projects`, `/otw`, `/bttf`, `/flix`. Requests for `page.html`, trailing slashes, and `index.html` 301 to the canonical form (`public/.htaccess` on Bluehost; the `cleanUrls` plugin in `vite.config.js` for `npm run dev` / `npm run preview`). Internal links use root-relative paths (`/about`).

- `index.html` — `/`: intro headline, current role, and calls to action.
- `about.html` — `/about`: background at Booz Allen Hamilton and Virginia Tech, plus personal notes.
- `projects.html` — `/projects`: one framed case study and its placard at a time, with left/right arrows and a `1 of 3` counter.
- `otw.html` — `/otw`: **On The Way**: route-aware recommendations for smarter pitstops.
- `bttf.html` — `/bttf`: **Back to the Future**: bringing music sharing back to Spotify.
- `flix.html` — `/flix`: **Flixtape**: reimagining Netflix’s playlist service.
- `Eroraha Resume.pdf` — resume, linked from the nav on every page.

## Design

Alabaster page background (`#F7F6F2`), dusty mauve accent (`#957083`), and a plum footer (`#281822`). Type is Avenir. Case studies use lowercase section headers, figure captions, and a shared layout in `styles.css`.

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at [http://localhost:43123](http://localhost:43123).

```bash
npm run build
npm run preview
```

You can also serve the files with any static server (`npx serve .` or `python3 -m http.server`).

## Deploy

The site is hosted on Bluehost and built by GitHub Actions.

1. Every push to `main` runs `.github/workflows/deploy.yml`, which builds with Vite and force-pushes the contents of `dist` to the `deploy` branch (a single orphan commit).
2. Bluehost's cPanel **Git Version Control** has this repo cloned with the `deploy` branch checked out. Clicking **Update from Remote** then **Deploy HEAD Commit** runs `public/.cpanel.yml` (shipped inside `dist`), which copies the built files into `~/public_html/`.

`public/.htaccess` serves the extensionless URLs (and 301s the `.html` forms), sets MIME types for the MP4 demos, and adds cache headers for the fingerprinted assets. The page rewrite intentionally takes precedence over the same-named asset folders (`otw/`, `bttf/`, `flix/`), which is why it sets `DirectorySlash Off`.

### One-time Bluehost setup

1. cPanel → **Domains**: confirm the document root for the domain and turn on the free AutoSSL certificate.
2. cPanel → **Git Version Control** → **Create**. Clone `https://github.com/veroraha/ux-portfolio.git` into a path outside the docroot, e.g. `/home/<cpanel-user>/repos/ux-portfolio`.
3. **Manage** → **Basic Information**: set the checked-out branch to `deploy`.
4. **Manage** → **Pull or Deploy**: **Update from Remote**, then **Deploy HEAD Commit**.
5. Delete any placeholder files Bluehost left in `public_html` (`index.php`, `default.html`).

If the domain is an addon domain rather than the primary one, change `DEPLOYPATH` in `public/.cpanel.yml` to that domain's document root.

### Optional: auto-pull on Bluehost

cPanel does not pull when GitHub pushes. To pick up new builds without clicking, add a cPanel cron job (every 15 minutes):

```bash
cd $HOME/repos/ux-portfolio && git pull --ff-only origin deploy && uapi VersionControlDeployment create repository_root=$HOME/repos/ux-portfolio
```
