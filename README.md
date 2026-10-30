# Entre libros y letras — sitio web

Sitio público de **Entre libros y letras**, preparado como sitio estático para GitHub Pages. No utiliza base de datos, servidor ni dependencias externas de JavaScript.

## Alcance del repositorio

Este repositorio contiene la **capa pública y editorial** del club: lecturas, noticias, galería, línea del tiempo, identidad visual y Biblioteca de Jorge.

La administración interna se mantiene separada en el repositorio privado `aljogaba/entre-libros-y-letras-admin`.

### Separación obligatoria

**Repositorio público:**
- narrativa pública del club;
- lecturas;
- fotografías y galería;
- noticias;
- hitos de la historia;
- identidad visual;
- Biblioteca pública de Jorge.

**Repositorio privado administrativo:**
- inventario y movimientos de ejemplares;
- asistencias;
- faltas;
- comodines;
- incidencias;
- participación;
- reglas administrativas;
- cualquier dato interno que no deba publicarse.

No se trasladan automáticamente datos administrativos a la web pública. Una sesión puede existir en ambos repositorios, pero cada uno conserva su propósito y nivel de detalle.

## Principio de mantenimiento

> Para actualizar contenido ordinario del club se modifican datos e imágenes. No se toca CSS, JavaScript ni la estructura HTML salvo que exista una necesidad de diseño o funcionalidad explícita.

El sitio ya está diseñado para que las actualizaciones habituales se hagan principalmente desde `assets/data/` y `assets/images/`.

## Fuentes públicas de contenido

| Contenido | Fuente |
|---|---|
| Lecturas y lectura actual | `assets/data/books.json` |
| Galería | `assets/data/gallery.json` |
| Noticias | `assets/data/news.json` |
| Línea del tiempo | `assets/data/timeline.json` |
| Stickers | `assets/data/stickers.json` |
| Biblioteca de Jorge | `assets/data/biblioteca-jorge.json` — derivado del repo administrativo |
| Cifras visibles de portada | `index.html` |

### Regla contra duplicación

- No crear un segundo JSON para la misma información.
- No copiar datos administrativos a archivos públicos solo para “tenerlos también aquí”.
- No editar manualmente `biblioteca-jorge.json`; se publica desde el repo administrativo.
- No crear marcadores o archivos temporales cuando ya existe el archivo final.

## Flujo normal después de una sesión

Este es el proceso canónico para actualizar la web después de una reunión. No todos los pasos son obligatorios en todas las sesiones; se aplica únicamente lo que corresponda.

### 1. Sincronizar

En **GitHub Desktop**:

1. abre `entre-libros-y-letras`;
2. usa **Fetch origin**;
3. si hay cambios remotos, usa **Pull origin**.

Después abre el repositorio en **VS Code**.

### 2. Actualizar la lectura

Edita `assets/data/books.json`.

Reglas:
- debe existir **una sola** lectura con `"current": true`;
- la lectura vigente usa `"status": "Leyendo"`;
- al cerrar una lectura, cambia a `"current": false` y `"status": "Leído"`;
- la nota debe describir públicamente la lectura o su lugar en la historia del club, no procesos administrativos.

Ejemplo de portada:

```json
"cover": "assets/images/books/el-tulipan-negro.jpg"
```

Si la imagen no existe todavía, el sitio muestra una cubierta tipográfica de respaldo.

### 3. Agregar o sustituir la portada del libro

Las portadas de las lecturas del club viven en:

```text
assets/images/books/
```

Usa nombres breves, sin espacios ni acentos, y conserva exactamente la ruta declarada en `books.json`.

Cuando se sustituye una portada, se reemplaza el archivo conservando el mismo nombre. No hace falta cambiar CSS ni JavaScript.

### 4. Agregar la fotografía de la sesión

Las fotos de reuniones viven en:

```text
assets/images/meetings/
```

Convención recomendada:

```text
AAAA-MM-DD-presencial.webp
```

Ejemplo:

```text
2026-10-29-presencial.webp
```

Después agrega una sola ficha correspondiente en `assets/data/gallery.json` y haz que `src` apunte **directamente al archivo final**.

Reglas:
- no usar SVG intermedios ni rutas indirectas para sustituir fotografías;
- si ya existe la foto definitiva, `gallery.json` debe apuntar directamente a ella;
- `width` y `height` describen las dimensiones de la imagen y ayudan a reservar espacio en pantalla;
- la leyenda debe ser pública y editorial, no administrativa.

### 5. Agregar una noticia, solo si hay algo que contar

Edita `assets/data/news.json`.

Una noticia requiere `date`, `tag`, `title`, `text` y `link`.

Las noticias sirven para comunicar acontecimientos relevantes del club, no para registrar cada operación interna.

### 6. Agregar un hito histórico, solo si realmente es un hito

Edita `assets/data/timeline.json`.

La línea del tiempo no es una bitácora de todas las sesiones. Se actualiza cuando ocurre un cambio significativo: fundación, aniversario, nueva etapa, cambio importante en la dinámica u otro momento que merezca conservarse como parte de la historia pública.

### 7. Revisar las cifras visibles de portada

`index.html` contiene dos cifras públicas que actualmente se mantienen de forma manual:

- `lecturas registradas`;
- `encuentros documentados`.

Después de añadir una nueva lectura o un nuevo encuentro documentado, comprueba que esas cifras coincidan con el contenido público.

No usar en esta sección cifras de inventario, asistencias, incidencias ni participación administrativa.

### 8. Revisar localmente

En VS Code:

1. abre `index.html` con **Live Server**;
2. revisa Inicio, Lecturas, Galería y Sobre el club;
3. confirma que la lectura actual sea correcta;
4. confirma que las imágenes carguen;
5. confirma que no haya textos numéricos obsoletos;
6. si el navegador conserva una imagen anterior, usa una recarga fuerte (`Ctrl+F5`).

> Los JSON se cargan mediante JavaScript. Abrir `index.html` con doble clic puede impedir su carga en algunos navegadores.

### 9. Publicar

En **GitHub Desktop**:

1. revisa exactamente qué archivos cambiaron;
2. crea el commit;
3. usa **Push origin**.

No es necesario usar comandos Git en PowerShell para el flujo ordinario.

## Biblioteca física de Jorge

`biblioteca.html` es un estante digital de los libros que Jorge posee físicamente. Es independiente de las lecturas del club y no muestra procedencia, lotes ni distribución administrativa.

La página se alimenta únicamente de:

```text
assets/data/biblioteca-jorge.json
```

Ese archivo es una **salida derivada** del repositorio privado `aljogaba/entre-libros-y-letras-admin`; no se edita manualmente ni funciona como una segunda fuente de verdad.

La publicación se prepara desde el repositorio administrativo con:

```powershell
.\publicar_biblioteca.cmd
```

Después se revisa el cambio en este repositorio público y se publica mediante GitHub Desktop.

### Portadas de la Biblioteca de Jorge

Las portadas personales viven en:

```text
assets/images/library/
```

No es necesario editar el JSON para agregar una portada a un libro ya registrado. La web usa automáticamente el `id` del libro como nombre de archivo.

Formato preferido:

```text
{id}.webp
```

También se aceptan `.jpg`, `.jpeg` y `.png`; la web prueba esos formatos automáticamente si no encuentra el `.webp`.

Si no existe una imagen para ese `id`, la página conserva la cubierta tipográfica de respaldo.

Las instrucciones específicas están en `assets/images/library/README.md`.

El acceso a esta biblioteca se mantiene discreto desde el footer; no forma parte de la navegación principal del club.

## Agregar un sticker

1. Copia la imagen optimizada a `assets/images/stickers/`.
2. Añade su ruta y texto alternativo a `assets/data/stickers.json`.
3. Revisa el resultado con Live Server.

## Estructura

```text
index.html
lecturas.html
galeria.html
nosotros.html
biblioteca.html
assets/
  css/
    main.css
    biblioteca.css
  js/
    site.js
    biblioteca.js
  data/
    books.json
    gallery.json
    news.json
    timeline.json
    stickers.json
    biblioteca-jorge.json
  documents/
  images/
    about/
    books/
    identity/
    library/
    meetings/
    stickers/
    titivillus/
```

## Criterio editorial

El primer año del club concluye con *Cien años de soledad*. El segundo año inicia con *Cadáver exquisito*.

En textos públicos se prioriza la experiencia del club: libros, conversación, comunidad, memoria y acontecimientos relevantes. Los detalles disciplinarios y administrativos permanecen fuera del sitio.

La firma utilizada es: `by Alberto Jorge Galindo Barboza`.

## Derechos y contenido de terceros

Los textos originales, diseño, identidad visual, fotografías propias y materiales originales del proyecto están protegidos por derechos de autor. Las cubiertas de libros, títulos, nombres de autores, citas breves y otros materiales de terceros conservan los derechos de sus respectivos titulares y se utilizan únicamente con fines informativos, culturales o de identificación bibliográfica.
