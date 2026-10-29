// @ts-check
import { defineConfig } from 'astro/config';

// Mientras se conecta el dominio de Namecheap, vive en GitHub Pages bajo /el-herbario/.
// Al conectar el dominio: site = 'https://<dominio>', base = '/', y crear public/CNAME.
// Las rutas internas usan ruta() de src/site.ts, así que cambiar base no rompe nada.
export default defineConfig({
  site: 'https://sergiof2u.github.io',
  base: '/el-herbario/',
  trailingSlash: 'always',
});
