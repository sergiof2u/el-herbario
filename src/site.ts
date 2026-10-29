// Datos de El Herbario que se repiten en el sitio. Viven aquí y en ningún otro lugar.

export const sitio = {
  nombre: 'El Herbario',
  lema: 'Oficios botánicos',
  origen: 'De un jardín de Subachoque',
  instagram: 'elherbariobotanico',
  whatsapp: '573004037009',
  whatsappVisible: '300 403 7009',
  puntoDeVenta: 'Tienda Suma Subachoque',
  envioGratisDesde: 100000,
  mediosDePago: 'transferencia Bancolombia, Daviplata y llave',
};

export const instagramUrl = `https://www.instagram.com/${sitio.instagram}/`;

export function whatsappUrl(texto?: string) {
  const base = `https://wa.me/${sitio.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** Toda ruta interna pasa por aquí, para que el sitio funcione en una subcarpeta. */
export function ruta(camino = '') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const limpio = camino.replace(/^\//, '');
  return `${base}/${limpio}`;
}

export function pesos(valor: number) {
  return '$' + valor.toLocaleString('es-CO');
}

export const menu = [
  { href: 'tienda/', texto: 'Tienda' },
  { href: 'arma-tu-jardin/', texto: 'Arma tu jardín' },
  { href: 'nuestra-historia/', texto: 'Nuestra historia' },
  { href: 'contacto/', texto: 'Contacto' },
  // Manifiesto: vuelve cuando llegue el texto (src/pages/_manifiesto.astro → manifiesto.astro).
];
