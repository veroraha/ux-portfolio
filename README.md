# Vanessa Eroraha — UX Portfolio

Personal site for Vanessa Eroraha, a multi-disciplinary UX designer and product owner. The site is static HTML, CSS, and JavaScript, built with Vite.

Live reference: [vanessaeroraha.com](https://vanessaeroraha.com)

## Pages

URLs are extensionless: `/`, `/about`, `/projects`, `/bah`, `/otw`, `/bttf`, `/flix`. Requests for `page.html`, trailing slashes, and `index.html` 301 to the canonical form (`public/.htaccess` on Bluehost; the `cleanUrls` plugin in `vite.config.js` for `npm run dev` / `npm run preview`). Internal links use root-relative paths (`/about`).

- `index.html` — `/`: intro headline, current role, and calls to action.
- `about.html` — `/about`: background at Booz Allen Hamilton and Virginia Tech, plus personal notes.
- `projects.html` — `/projects`: one framed case study and its placard at a time, with left/right arrows and a `1 of 4` counter.
- `bah.html` — `/bah`: **My latest work**: designing a mission-critical operating tool.
- `otw.html` — `/otw`: **On The Way**: route-aware recommendations for smarter pitstops.
- `bttf.html` — `/bttf`: **Back to the Future**: bringing music sharing back to Spotify.
- `flix.html` — `/flix`: **Flixtape**: reimagining Netflix’s playlist service.
- `Eroraha Resume.pdf` — resume, linked from the nav on every page.

Case-study images, videos, and the about-page headshot live in `otw/`, `bttf/`, `flix/`, `bah/`, and `me/` next to the HTML. Vite hashes those files into `dist/assets/` on build. `public/` only holds files that must keep their names in the built site (`.htaccess`, `.cpanel.yml`, and the resume).

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

`.htaccess` (repo root, copied into `dist` from `public/.htaccess`) serves `/projects` from `projects.html` and 301s the `.html` forms. `RewriteBase /` is set for Bluehost. When the unbundled repo is served as the docroot, the rewrite also wins over same-named asset folders (`otw/`, `bttf/`, `flix/`, `bah/`) and `DirectorySlash Off` stops Apache from 403'ing those folder names. The file must sit in `public_html`, not in a `public/` subfolder.

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
