// Catálogo. Textos y precios del documento «El Herbario · Contenidos de la web»
// (F:\OneDrive\EL HERBARIO BOTANICO). Precios de la web; en la tienda física
// las tisanas cuestan $18.000.

export type Producto = {
  id: string;
  nombre: string;
  tipo?: string;
  presentacion: string;
  precio: number;
  descripcion: string;
  ingredientes?: string[];
  contiene?: string[];
  modoDeUso?: string;
  foto?: { src: string; alt: string };
};

export type Categoria = {
  id: string;
  nombre: string;
  intro: string;
  nota?: string;
  foto?: { src: string; alt: string };
  productos: Producto[];
  ritual?: { titulo: string; pasos: string[] };
};

export const tisanas: Categoria = {
  id: 'tisanas',
  nombre: 'Tisanas',
  intro: 'Flores y hojas cultivadas despacio, secadas con paciencia y mezcladas para acompañar tus pausas.',
  nota: 'Cada bolsa de 20 g rinde 20 porciones.',
  foto: { src: 'fotos/tisana-bolsa.jpg', alt: 'Bolsa naranja de tisana de El Herbario, ilustrada con plantas, entre lavanda, pasiflora y azahar' },
  productos: [
    {
      id: 'corazon-en-flor',
      nombre: 'Corazón en Flor',
      tipo: 'Mezcla de tisanas naturalmente dulce',
      presentacion: '20 g',
      precio: 25000,
      descripcion: 'Un abrazo dulce para el corazón. Toronjil, cidrón y flor de clitoria se encuentran con naranja y canela, y la dulzura viene de la hoja de estevia, la planta misma.',
      ingredientes: ['toronjil', 'cidrón', 'clitoria', 'naranja', 'canela', 'hoja de estevia'],
    },
    {
      id: 'vida-en-movimiento',
      nombre: 'Vida en Movimiento',
      tipo: 'Tisana herbal',
      presentacion: '20 g',
      precio: 25000,
      descripcion: 'Despierta el pulso y afloja lo que se queda quieto. Albahaca y tomillo con la acidez brillante de la jamaica y la limonaria.',
      ingredientes: ['albahaca', 'jamaica', 'limonaria', 'tomillo'],
    },
    {
      id: 'beso-de-montana',
      nombre: 'Beso de Montaña',
      tipo: 'Tisana herbal',
      presentacion: '20 g',
      precio: 25000,
      descripcion: 'Frescura que inspira, aliento que te acompaña. Menta, romero y eucalipto con la flor de bugambilia.',
      ingredientes: ['menta', 'romero', 'eucalipto', 'bugambilia'],
    },
  ],
  ritual: {
    titulo: 'Ritual de la tisana',
    pasos: [
      'Pon una cucharadita de la mezcla en tu taza favorita.',
      'Vierte agua recién caliente y tapa para guardar los aromas.',
      'Deja reposar tres minutos mientras las flores y hojas despiertan.',
      'Cuela y sirve.',
      'Endulza si lo deseas.',
      'Bebe despacio. Hay calma que solo llega cuando te detienes a esperarla.',
    ],
  },
};

export const chai: Categoria = {
  id: 'chai',
  nombre: 'Chai y especias',
  intro: 'Mezclas para preparar con leche o agua, con especias que calientan y acompañan.',
  productos: [
    {
      id: 'ritual-de-oro',
      nombre: 'Ritual de Oro',
      tipo: 'Golden milk',
      presentacion: '50 g',
      precio: 40000,
      descripcion: 'Se bebe despacio, como quien enciende una luz por dentro. Cúrcuma dorada con canela, jengibre, pimienta, cardamomo y clavo.',
      ingredientes: ['cúrcuma', 'canela', 'jengibre', 'pimienta', 'cardamomo', 'clavo'],
    },
    {
      id: 'tierra-dulce',
      nombre: 'Tierra Dulce',
      tipo: 'Chai de remolacha',
      presentacion: '50 g',
      precio: 40000,
      descripcion: 'La dulzura de la tierra en una taza. Remolacha, canela, semilla de hinojo y clavo, para una bebida suave de color profundo.',
      ingredientes: ['remolacha', 'canela', 'semilla de hinojo', 'clavo'],
    },
  ],
  ritual: {
    titulo: 'Ritual del chai',
    pasos: [
      'Añade una cucharadita de la mezcla a una taza de la leche de tu preferencia.',
      'Hierve suavemente durante tres minutos mientras las especias despiertan sus aromas.',
      'Cuela y sirve.',
      'Puedes espumar la leche para una experiencia más cremosa y ritual.',
      'Endulza si lo deseas.',
      'Bebe despacio. Hay historias que solo aparecen cuando el tiempo se aquieta.',
    ],
  },
};

export const cosmetica: Categoria = {
  id: 'cosmetica',
  nombre: 'Cosmética botánica',
  intro: 'Cuidado hecho a mano con ingredientes botánicos, para tratar la piel con suavidad y cariño.',
  productos: [
    {
      id: 'crema-copoazu',
      nombre: 'Crema facial de copoazú',
      presentacion: '30 g',
      precio: 60000,
      descripcion: 'Hidrata y nutre profundamente. Una crema hecha a mano con manteca de copoazú y extracto de caléndula y azucena.',
      ingredientes: ['manteca de copoazú', 'extracto de caléndula y azucena'],
    },
    {
      id: 'la-pajara-pinta',
      nombre: 'La Pájara Pinta',
      tipo: 'Bálsamo rubor',
      presentacion: '15 g',
      precio: 45000,
      descripcion: 'Color para tus mejillas, sobre una base de oleato de flores de rosa, romero y lavanda, con manteca de copoazú y cera de abeja.',
      ingredientes: ['oleato de flores (rosa, romero, lavanda)', 'manteca de copoazú', 'cera de abeja', 'pigmentos minerales (óxido de hierro)'],
      modoDeUso: 'Úsala sobre tus labios y mejillas para aprovechar sus cualidades humectantes mientras te brinda un toque de color.',
      foto: { src: 'fotos/pajara-pinta.jpg', alt: 'Lata rosada del bálsamo rubor La Pájara Pinta junto a romero, lavanda y pétalos de rosa' },
    },
    {
      id: 'jabon-lavanda',
      nombre: 'Jabón botánico de lavanda',
      presentacion: '90 g',
      precio: 15000,
      descripcion: 'Un jabón de glicerina con flores de lavanda y aceites esenciales, para un baño tranquilo.',
      ingredientes: ['glicerina', 'flores de lavanda', 'aceites esenciales'],
      foto: { src: 'fotos/jabon-lavanda.jpg', alt: 'Dos barras de jabón con flores de lavanda junto a su etiqueta redonda' },
    },
  ],
};

// Kits: respuesta de Daniela del 2026-10-29.
export const kits: Categoria = {
  id: 'kits',
  nombre: 'Kits',
  intro: 'Jardines que caben en una bolsa, pero contienen todo un universo.',
  productos: [
    {
      id: 'kit-jardin-nocturno',
      nombre: 'Jardín nocturno',
      tipo: 'Kit',
      presentacion: 'Kit',
      precio: 90000,
      descripcion: 'En este jardín encontrarás el poder de plantas como toronjil, manzanilla, lavanda, geranio y clitoria, y aceites como el neroli y el incienso, para crear diferentes productos para el bienestar y el descanso.',
      contiene: ['tisana Jardín nocturno', 'roll-on Jardín nocturno', 'pomada para pies', 'infusor de acero inoxidable'],
      foto: { src: 'fotos/roll-on-jardin-nocturno.jpg', alt: 'Roll-on Jardín nocturno de El Herbario entre lavanda y flores de azahar' },
    },
    {
      id: 'kit-jardin-en-calma',
      nombre: 'Jardín en calma',
      tipo: 'Kit',
      presentacion: 'Kit',
      precio: 80000,
      descripcion: 'En este jardín encontrarás el poder de plantas como lavanda, manzanilla y hierbabuena, y aceites esenciales de geranio, lavanda e incienso.',
      contiene: ['tisana Jardín en calma', 'roll-on Calma a la mano', 'infusor de acero inoxidable'],
    },
    {
      id: 'kit-jardin-para-volver-a-ti',
      nombre: 'Jardín para volver a ti',
      tipo: 'Kit',
      presentacion: 'Kit',
      precio: 120000,
      descripcion: 'Este es un kit de cuidado personal, una caricia para nuestra piel y sentidos.',
      contiene: ['crema facial de copoazú', 'roll-on Calma a la mano', 'cosmetiquera'],
      foto: { src: 'fotos/cosmetiquera.jpg', alt: 'Cosmetiquera de tela con el sello de El Herbario y la etiqueta «Jardín para volver a ti», con la crema facial de copoazú y el roll-on Calma a la mano' },
    },
  ],
};

// Perfume: uno solo, personalizado por familias aromáticas (máximo dos).
export const perfume = {
  id: 'alma-de-jardin',
  nombre: 'Alma de Jardín',
  tipo: 'Perfume botánico personalizado',
  presentacion: 'Spray · 30 ml',
  precio: 70000,
  preparacion: 'Dos días',
  frase: 'Que el jardín acompañe tu camino.',
  descripcion: 'Perfume elaborado artesanalmente con extractos botánicos. Evoca un paseo por el jardín con aromas de madera, flores y frutos.',
  foto: { src: 'fotos/alma-de-jardin.jpg', alt: 'Frasco de Alma de Jardín con tapa de madera, envuelto en papel de flores rosadas, entre flores blancas' },
  maxFamilias: 2,
  familias: [
    { id: 'amaderado', nombre: 'Amaderado', caracter: 'Cálido · Profundo · Envolvente', descripcion: 'Aromas de maderas y resinas que evocan la tierra, los bosques y la quietud.', notas: 'sándalo e incienso' },
    { id: 'citrico', nombre: 'Cítrico', caracter: 'Fresco · Luminoso · Vital', descripcion: 'Aromas chispeantes que recuerdan la luz del sol y la frescura de los frutos.', notas: 'naranja y limón' },
    { id: 'especiado', nombre: 'Especiado', caracter: 'Cálido · Intenso · Misterioso', descripcion: 'Notas aromáticas con carácter que aportan profundidad y un toque vibrante.', notas: 'cardamomo y clavo' },
    { id: 'floral', nombre: 'Floral', caracter: 'Dulce · Delicado · Romántico', descripcion: 'Aromas de flores que aportan dulzura, suavidad y sensibilidad al perfume.', notas: 'rosa y jazmín' },
    { id: 'herbal', nombre: 'Herbal', caracter: 'Verde · Natural · Despierto', descripcion: 'Aromas de hojas y plantas que evocan jardines vivos, hierbas frescas y naturaleza.', notas: 'romero y geranio' },
  ],
};

/** Todo lo que se puede añadir al carrito, por id, para el script del carrito. */
export const catalogo = Object.fromEntries(
  [...tisanas.productos, ...chai.productos, ...cosmetica.productos, ...kits.productos, perfume].map((p) => [
    p.id,
    { nombre: p.nombre, precio: p.precio, presentacion: p.presentacion },
  ]),
);
