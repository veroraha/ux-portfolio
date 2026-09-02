# Vanessa Eroraha — UX Design Portfolio

A multi-disciplinary UX Designer & Product Owner portfolio showcasing case studies, design systems, and user research.

## Features & Tech Stack
- **Design System:** Custom warm retro/editorial palette (Cream `#FFF2D0`, Coral `#FF5A5A`, Olive `#808249`, Brown `#321F12`).
- **Pages:**
  - `index.html` / `home.html`: Headline statement and intro hero.
  - `about.html`: Professional narrative, background (Booz Allen, Virginia Tech CS/HCI), and interests.
  - `projects.html`: Gallery-style museum placards for *On The Way*, *Back to the Future*, and *Flixtape*.
  - `Eroraha Resume.pdf`: Downloadable/viewable resume PDF.
- **Interactivity:** Responsive mobile hamburger/dropdown menu, smooth entrance animations, and clean semantic markup.

## Running Locally

### Option 1: Vite Dev Server (Recommended)
```bash
npm install
npm run dev
```

### Option 2: Any Static Web Server
```bash
npx serve .
# or Python 3:
python3 -m http.server 8080
```

## Pushing to GitLab

1. Create a new blank project on [GitLab](https://gitlab.com/projects/new).
2. Link and push your local repository:
```bash
git remote add gitlab git@gitlab.com:<your-gitlab-username>/<your-repo-name>.git
git branch -M main
git push -u gitlab main
```
The included `.gitlab-ci.yml` file will automatically build and publish your site via **GitLab Pages**.
