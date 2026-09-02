import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 43123,
    host: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        home: './home.html',
        about: './about.html',
        projects: './projects.html',
        otw: './otw.html',
        bttf: './bttf.html',
        flix: './flix.html'
      }
    }
  }
});
