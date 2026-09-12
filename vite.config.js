import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const pages = [
  'index.html',
  'horizon-academie-accueil.html',
  'horizon-academie-admin.html',
  'horizon-academie-eleve.html',
  'horizon-academie-parent.html',
  'horizon-academie-professeur-primaire.html',
  'horizon-academie-professeur-secondaire.html'
];

export default defineConfig({
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: pages.map((page) => resolve(process.cwd(), page))
    }
  }
});
