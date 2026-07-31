# Entre libros y letras - sitio web

Sitio estático listo para GitHub Pages. No utiliza base de datos, servidor ni dependencias externas de JavaScript.

## Abrirlo en la computadora

1. Abre esta carpeta en VS Code.
2. Haz clic derecho sobre `index.html`.
3. Selecciona **Open with Live Server**.

> Los archivos JSON se cargan mediante JavaScript. Al abrir `index.html` con doble clic, algunos navegadores bloquean esa carga; Live Server evita el problema.

## Publicarlo en GitHub Pages

1. Crea un repositorio nuevo.
2. Copia todo el contenido de esta carpeta en la raíz del repositorio.
3. Haz commit y push a la rama `main`.
4. En GitHub entra a **Settings → Pages**.
5. Selecciona **Deploy from a branch**, rama `main`, carpeta `/(root)`.

## Cambiar la lectura actual

Edita `assets/data/books.json`:

- deja `"current": true` solamente en el libro actual;
- cambia el anterior a `"current": false` y `"status": "Leído"`;
- usa `"status": "Leyendo"` para el libro vigente.

## Agregar un libro y su portada local

1. Copia la portada en `assets/images/books/`.
2. Usa un nombre breve, sin acentos ni espacios, por ejemplo: `nuevo-libro.jpg`.
3. Agrega un bloque al final de `assets/data/books.json`.
4. En `cover` escribe la ruta local:

```json
"cover": "assets/images/books/nuevo-libro.jpg"
```

5. Verifica que solo una lectura tenga `"current": true`.

El sitio no necesita Open Library ni otro servidor de portadas. Si una imagen falta, todavía mostrará una cubierta tipográfica de respaldo.

## Agregar una reunión

1. Copia la foto en `assets/images/meetings/`.
2. Usa nombres simples: `2026-08-15-nombre.webp`.
3. Agrega la ficha correspondiente a `assets/data/gallery.json`.

## Agregar una noticia

Edita `assets/data/news.json`. Cada noticia requiere fecha, etiqueta, título, texto y vínculo.

## Agregar un sticker

1. Copia la imagen optimizada a `assets/images/stickers/`.
2. Añade su ruta y texto alternativo a `assets/data/stickers.json`.

## Estructura

```text
index.html
lecturas.html
galeria.html
nosotros.html
assets/
  css/main.css
  js/site.js
  data/
  documents/
  images/
    about/
    books/
    identity/
    meetings/
    stickers/
    titivillus/
```

## Criterio editorial

El primer año del club concluye con *Cien años de soledad*. El segundo año inicia con *Cadáver exquisito*.

La firma utilizada es: `by Alberto Jorge Galindo Barboza`.
