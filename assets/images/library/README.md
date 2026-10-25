# Portadas — Biblioteca de Jorge

Esta carpeta contiene las portadas del estante digital personal de Jorge.

## Regla de nombres

Cada portada debe usar exactamente el `id` del libro que aparece en `assets/data/biblioteca-jorge.json`.

Formato preferido:

```text
{id}.webp
```

También se aceptan, como respaldo:

```text
{id}.jpg
{id}.jpeg
{id}.png
```

La web intenta automáticamente `webp → jpg → jpeg → png`. Si no encuentra ninguna imagen, conserva la cubierta tipográfica de respaldo.

## Ejemplos

```text
assets/images/library/1984.webp
assets/images/library/delatora.webp
assets/images/library/el-tulipan-negro.webp
assets/images/library/cien-anos-de-soledad.webp
```

No es necesario editar `biblioteca-jorge.json` para agregar una portada de un libro ya registrado.

## Flujo normal

1. Identifica el `id` del libro en `assets/data/biblioteca-jorge.json`.
2. Guarda la portada con ese nombre en esta carpeta.
3. Haz `git add`, `git commit` y `git push` en el repositorio público.

Ejemplo:

```powershell
git add assets/images/library
git commit -m "Agrega portadas a Biblioteca de Jorge"
git push
```

Para nuevas incorporaciones bibliográficas, primero se registra el libro desde el repositorio administrativo y se publica `biblioteca-jorge.json`; después puede agregarse aquí su portada.
