# El Herbario — sitio web

Tienda en línea de El Herbario (@elherbariobotanico), oficios botánicos de Daniela:
tisanas, chai, perfumes personalizados y cosmética botánica, de un jardín de
Subachoque. Proyecto independiente: no comparte notas ni código con otros sitios.
Las notas del proyecto van en `F:\OneDrive\EL HERBARIO BOTANICO\NOTAS DEL PROYECTO.md`.

Estático, hecho con Astro. Sin pasarela de pago: el carrito («Mi jardín») vive en el
navegador del visitante y termina en un mensaje de WhatsApp con el pedido armado.

Estas instrucciones aplican a cualquier IA que trabaje en este repositorio.

## Contenido

- Fuente de los textos: `F:\OneDrive\EL HERBARIO BOTANICO\El Herbario · Contenidos de la web.pdf`.
  No inventar textos, precios ni ingredientes: si no está ahí, queda pendiente.
- `src/site.ts`: WhatsApp, Instagram, punto de venta, envío gratis, medios de pago, menú.
- `src/productos.ts`: catálogo (tisanas, chai, cosmética y el perfume con sus familias).
  Precios de la web; en la tienda física las tisanas cuestan $18.000.
- `src/scripts/jardin.ts`: carrito, perfume (máximo dos familias), regalo, pestañas
  de «Arma tu jardín» y el mensaje de WhatsApp.

## Identidad

Paleta de Daniela, como tokens en `src/styles/global.css`: rosado empolvado `#F5E1DF`
(fondo principal), amarillo mantequilla `#F7EAB5` (jardines personalizados, mensajes
especiales, algunas secciones), verde pistacho `#B5C77A` (detalles botánicos, pequeños
fondos), verde bosque `#40513A` (títulos, botones, navegación, textos destacados).
Tipografías: Gilda Display para títulos y Jost para texto, de Google Fonts. En el CSS se
usan `--serif` y `--sans`, nunca el nombre de la fuente.

## Imágenes

En `public/fotos/`, reducidas: lado largo de 1600 px (2400 la portada), JPEG calidad 80,
progresivo. Los originales viven en `F:\OneDrive\EL HERBARIO BOTANICO\IMAGENES`.
Las fotos se muestran con la luz del archivo: sin velos, degradados, `opacity` ni
`filter`; el texto va fuera de la foto.

## Redacción

- Tuteo y plural de la marca («creamos», «nuestra»). La historia va en tercera persona,
  con Daniela como protagonista.
- Nada de superlativos de venta. Nunca la construcción «no es X, sino Y».

## Rutas

Toda ruta interna pasa por `ruta()` de `src/site.ts`.

## Comandos

- `npm run dev`: servidor local (en la app de Claude, «el-herbario» en el puerto 4324)
- `npm run build`: compila a `dist/`
