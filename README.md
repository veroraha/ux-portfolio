# Vanessa Eroraha — UX Portfolio

Personal site for Vanessa Eroraha, a multi-disciplinary UX designer and product owner. The site is static HTML, CSS, and JavaScript, built with Vite.

Live reference: [vanessaeroraha.com](https://vanessaeroraha.com)

## Pages

- `index.html` / `home.html` — intro headline, current role, and calls to action. Keep these two files in sync.
- `about.html` — background at Booz Allen Hamilton and Virginia Tech, plus personal notes.
- `projects.html` — framed gallery cards for the three case studies.
- `otw.html` — **On The Way**: route-aware recommendations for smarter pitstops.
- `bttf.html` — **Back to the Future**: bringing music sharing back to Spotify.
- `flix.html` — **Flixtape**: reimagining Netflix’s playlist service.
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

`.gitlab-ci.yml` builds with Vite and publishes `dist` to GitLab Pages on `main`.
