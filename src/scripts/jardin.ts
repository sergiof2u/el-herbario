// «Mi jardín»: el carrito. Vive en el navegador de cada visitante (localStorage)
// y termina en un mensaje de WhatsApp con el pedido armado.
import { catalogo } from '../productos';
import { sitio, pesos, whatsappUrl } from '../site';

type Linea = { clave: string; id: string; cantidad: number; familias?: string[] };
type Regalo = { activo: boolean; para: string; de: string; mensaje: string };
type Jardin = { lineas: Linea[]; regalo: Regalo };

const LLAVE = 'el-herbario-jardin';
const base = document.body.dataset.base ?? '/';

function vacio(): Jardin {
  return { lineas: [], regalo: { activo: false, para: '', de: '', mensaje: '' } };
}

function leer(): Jardin {
  try {
    const crudo = localStorage.getItem(LLAVE);
    if (!crudo) return vacio();
    const j = JSON.parse(crudo) as Jardin;
    j.lineas = (j.lineas ?? []).filter((l) => catalogo[l.id]);
    j.regalo = { ...vacio().regalo, ...j.regalo };
    return j;
  } catch {
    return vacio();
  }
}

let jardin = leer();

function guardar() {
  try { localStorage.setItem(LLAVE, JSON.stringify(jardin)); } catch { /* sin almacenamiento: el jardín dura lo que la página */ }
  pintar();
}

const unidades = () => jardin.lineas.reduce((s, l) => s + l.cantidad, 0);
const subtotal = () => jardin.lineas.reduce((s, l) => s + catalogo[l.id].precio * l.cantidad, 0);

function anadir(id: string, cantidad: number, familias?: string[]) {
  const clave = familias?.length ? `${id}:${[...familias].sort().join('+')}` : id;
  const linea = jardin.lineas.find((l) => l.clave === clave);
  if (linea) linea.cantidad = Math.min(20, linea.cantidad + cantidad);
  else jardin.lineas.push({ clave, id, cantidad, familias });
  guardar();
  avisar(`${catalogo[id].nombre} está en tu jardín.`);
}

let temporizador: number | undefined;
function avisar(texto: string) {
  const aviso = document.querySelector<HTMLElement>('[data-aviso]');
  if (!aviso) return;
  aviso.innerHTML = '';
  aviso.append(texto);
  if (!location.pathname.endsWith('/mi-jardin/')) {
    const a = document.createElement('a');
    a.href = `${base}mi-jardin/`.replace('//', '/');
    a.textContent = 'Ver mi jardín';
    aviso.append(a);
  }
  aviso.classList.add('visible');
  clearTimeout(temporizador);
  temporizador = window.setTimeout(() => aviso.classList.remove('visible'), 3200);
}

function detalle(l: Linea) {
  const p = catalogo[l.id];
  return l.familias?.length ? `${p.presentacion} · ${l.familias.join(' y ')}` : p.presentacion;
}

function mensajeWhatsApp() {
  const filas = jardin.lineas.map((l) => {
    const p = catalogo[l.id];
    return `• ${l.cantidad} × ${p.nombre} (${detalle(l)}): ${pesos(p.precio * l.cantidad)}`;
  });
  const total = subtotal();
  const partes = [
    'Hola, El Herbario. Quiero hacer este pedido:',
    '',
    ...filas,
    '',
    `Subtotal: ${pesos(total)}`,
    total >= sitio.envioGratisDesde ? 'Envío incluido.' : '',
  ];
  const r = jardin.regalo;
  if (r.activo) {
    partes.push('', 'Es para regalar.');
    if (r.para) partes.push(`Para: ${r.para}`);
    if (r.de) partes.push(`De: ${r.de}`);
    if (r.mensaje) partes.push(`Mensaje de la tarjeta: ${r.mensaje}`);
  }
  return partes.filter((x, i, a) => !(x === '' && a[i - 1] === '')).join('\n').trim();
}

// Lista del jardín: en /mi-jardin/ y en el panel de «Arma tu jardín».
function pintarLista(contenedor: HTMLElement) {
  const lista = contenedor.querySelector<HTMLElement>('[data-lista]');
  const vacioEl = contenedor.querySelector<HTMLElement>('[data-vacio]');
  const lleno = contenedor.querySelector<HTMLElement>('[data-lleno]');
  if (!lista) return;
  const hay = jardin.lineas.length > 0;
  if (vacioEl) vacioEl.hidden = hay;
  if (lleno) lleno.hidden = !hay;
  lista.innerHTML = '';
  for (const l of jardin.lineas) {
    const p = catalogo[l.id];
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="lista__nombre"></span>
      <span class="lista__precio"></span>
      <span class="lista__detalle"></span>
      <span class="lista__acciones">
        <span class="cantidad cantidad--chica">
          <button type="button" data-l-menos aria-label="Quitar uno">−</button>
          <input type="number" min="1" max="20" aria-label="Cantidad" />
          <button type="button" data-l-mas aria-label="Añadir uno">+</button>
        </span>
        <button type="button" class="quitar" data-l-quitar>Quitar</button>
      </span>`;
    li.querySelector('.lista__nombre')!.textContent = p.nombre;
    li.querySelector('.lista__precio')!.textContent = pesos(p.precio * l.cantidad);
    li.querySelector('.lista__detalle')!.textContent = detalle(l);
    const input = li.querySelector('input')!;
    input.value = String(l.cantidad);
    const fijar = (n: number) => {
      if (!Number.isFinite(n)) return;
      l.cantidad = Math.max(1, Math.min(20, Math.round(n)));
      guardar();
    };
    li.querySelector('[data-l-menos]')!.addEventListener('click', () => fijar(l.cantidad - 1));
    li.querySelector('[data-l-mas]')!.addEventListener('click', () => fijar(l.cantidad + 1));
    input.addEventListener('change', () => fijar(Number(input.value)));
    li.querySelector('[data-l-quitar]')!.addEventListener('click', () => {
      jardin.lineas = jardin.lineas.filter((x) => x !== l);
      guardar();
    });
    lista.append(li);
  }
  const total = subtotal();
  contenedor.querySelectorAll<HTMLElement>('[data-subtotal]').forEach((el) => (el.textContent = pesos(total)));
  contenedor.querySelectorAll<HTMLElement>('[data-envio]').forEach((el) => {
    const falta = sitio.envioGratisDesde - total;
    el.textContent = falta > 0 ? `Te faltan ${pesos(falta)} para que el envío sea gratis.` : 'Tu envío va incluido.';
  });
  contenedor.querySelectorAll<HTMLAnchorElement>('[data-whatsapp]').forEach((a) => (a.href = whatsappUrl(mensajeWhatsApp())));
}

function pintar() {
  const n = unidades();
  document.querySelectorAll<HTMLElement>('[data-contador]').forEach((el) => (el.textContent = String(n)));
  document.querySelectorAll<HTMLElement>('[data-jardin]').forEach(pintarLista);
}

// Selectores de cantidad de las fichas
document.querySelectorAll<HTMLElement>('[data-cantidad]').forEach((caja) => {
  const input = caja.querySelector('input')!;
  const fijar = (n: number) => (input.value = String(Math.max(1, Math.min(20, n || 1))));
  caja.querySelector('[data-menos]')!.addEventListener('click', () => fijar(Number(input.value) - 1));
  caja.querySelector('[data-mas]')!.addEventListener('click', () => fijar(Number(input.value) + 1));
  input.addEventListener('change', () => fijar(Number(input.value)));
});

document.querySelectorAll<HTMLButtonElement>('[data-anadir]').forEach((boton) => {
  boton.addEventListener('click', () => {
    const input = boton.closest('.comprar')?.querySelector<HTMLInputElement>('[data-cantidad] input');
    anadir(boton.dataset.anadir!, Number(input?.value) || 1);
    if (input) input.value = '1';
  });
});

// Perfume: una o dos familias
document.querySelectorAll<HTMLFormElement>('[data-perfume]').forEach((form) => {
  const casillas = [...form.querySelectorAll<HTMLInputElement>('input[name="familia"]')];
  const boton = form.querySelector<HTMLButtonElement>('[data-perfume-boton]')!;
  const ayuda = form.querySelector<HTMLElement>('[data-perfume-ayuda]');
  const actualizar = () => {
    const elegidas = casillas.filter((c) => c.checked);
    casillas.forEach((c) => (c.disabled = !c.checked && elegidas.length >= 2));
    boton.disabled = elegidas.length === 0;
    if (ayuda) {
      ayuda.textContent = elegidas.length === 0
        ? 'Elige al menos una familia.'
        : elegidas.length === 1
          ? `Elegiste ${elegidas[0].value}. Puedes sumar una más.`
          : `Elegiste ${elegidas[0].value} y ${elegidas[1].value}.`;
    }
  };
  casillas.forEach((c) => c.addEventListener('change', actualizar));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const elegidas = casillas.filter((c) => c.checked).map((c) => c.value);
    if (!elegidas.length) return;
    anadir('alma-de-jardin', 1, elegidas);
    casillas.forEach((c) => (c.checked = false));
    actualizar();
  });
  actualizar();
});

// «Arma tu jardín»: para mí o para regalar, y pestañas por categoría
const formRegalo = document.querySelector<HTMLElement>('[data-para-quien]');
if (formRegalo) {
  const caja = document.querySelector<HTMLElement>('[data-regalo]')!;
  const radios = [...formRegalo.querySelectorAll<HTMLInputElement>('input[name="para"]')];
  const campos = [...caja.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-campo]')];
  radios.forEach((r) => (r.checked = (r.value === 'regalo') === jardin.regalo.activo));
  campos.forEach((c) => (c.value = jardin.regalo[c.dataset.campo as 'para' | 'de' | 'mensaje']));
  caja.hidden = !jardin.regalo.activo;
  radios.forEach((r) => r.addEventListener('change', () => {
    jardin.regalo.activo = r.value === 'regalo' && r.checked;
    caja.hidden = !jardin.regalo.activo;
    guardar();
  }));
  campos.forEach((c) => c.addEventListener('input', () => {
    jardin.regalo[c.dataset.campo as 'para' | 'de' | 'mensaje'] = c.value;
    guardar();
  }));
}

document.querySelectorAll<HTMLElement>('[role="tablist"]').forEach((lista) => {
  const pestanas = [...lista.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const mostrar = (p: HTMLButtonElement) => {
    pestanas.forEach((x) => {
      const activa = x === p;
      x.setAttribute('aria-selected', String(activa));
      x.tabIndex = activa ? 0 : -1;
      document.getElementById(x.getAttribute('aria-controls')!)!.hidden = !activa;
    });
  };
  pestanas.forEach((p, i) => {
    p.addEventListener('click', () => mostrar(p));
    p.addEventListener('keydown', (e) => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      const sig = pestanas[(i + d + pestanas.length) % pestanas.length];
      sig.focus();
      mostrar(sig);
    });
  });
  // La portada enlaza a una pestaña: /arma-tu-jardin/?p=perfumes
  const pedida = pestanas.find((p) => p.dataset.pestana === new URLSearchParams(location.search).get('p'));
  if (pedida) mostrar(pedida);
});

// Mensaje del regalo también desde /mi-jardin/
document.querySelectorAll<HTMLElement>('[data-resumen-regalo]').forEach((el) => {
  const r = jardin.regalo;
  el.hidden = !r.activo;
  if (r.activo) el.textContent = `Es para regalar${r.para ? ` a ${r.para}` : ''}${r.mensaje ? `. Tarjeta: «${r.mensaje}»` : ''}.`;
});

window.addEventListener('storage', (e) => {
  if (e.key === LLAVE) { jardin = leer(); pintar(); }
});

pintar();
