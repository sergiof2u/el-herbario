// @ts-check
import { defineConfig } from 'astro/config';

// Dominio propio: elherbariobotanico.com (Namecheap). public/CNAME le dice a
// GitHub Pages cuál es el dominio; www redirige solo. Las rutas internas usan
// ruta() de src/site.ts, así que cambiar base no rompe nada.
export default defineConfig({
  site: 'https://elherbariobotanico.com',
  base: '/',
  trailingSlash: 'always',
});
