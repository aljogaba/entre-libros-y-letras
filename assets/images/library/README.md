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

1. Sincroniza el repositorio público con **Fetch/Pull** en GitHub Desktop.
2. Identifica el `id` del libro en `assets/data/biblioteca-jorge.json`.
3. Guarda la portada con ese nombre exacto en esta carpeta.
4. Revisa la página con Live Server en VS Code.
5. Revisa los cambios, crea el commit y usa **Push origin** en GitHub Desktop.

Para nuevas incorporaciones bibliográficas, primero se registra el libro desde el repositorio administrativo y se publica `biblioteca-jorge.json`; después puede agregarse aquí su portada.

El `README.md` de la raíz es la referencia operativa principal del sitio público.
