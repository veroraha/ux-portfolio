import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const pages = ['index', 'about', 'projects', 'otw', 'bttf', 'flix'];

// Mirrors public/.htaccess for the dev and preview servers: serve /about from
// about.html and send /about.html to /about, so links behave the same as on
// the Apache host.
function cleanUrls() {
  const rewrite = (root) => (req, res, next) => {
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname;

    const htmlMatch = path.match(/^\/([^/]+)\.html$/);
    if (htmlMatch) {
      const target = htmlMatch[1] === 'index' ? '/' : `/${htmlMatch[1]}`;
      res.statusCode = 301;
      res.setHeader('Location', target + url.search);
      res.end();
      return;
    }

    if (path.length > 1 && path.endsWith('/')) {
      res.statusCode = 301;
      res.setHeader('Location', path.replace(/\/+$/, '') + url.search);
      res.end();
      return;
    }

    const slugMatch = path.match(/^\/([^/.]+)$/);
    if (slugMatch && existsSync(resolve(root, `${slugMatch[1]}.html`))) {
      req.url = `/${slugMatch[1]}.html${url.search}`;
    }
    next();
  };

  return {
    name: 'clean-urls',
    configureServer(server) {
      server.middlewares.use(rewrite(server.config.root));
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite(resolve(server.config.root, server.config.build.outDir)));
    }
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [cleanUrls()],
  server: {
    port: 43123,
    host: true
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, `./${page}.html`]))
    }
  }
});
