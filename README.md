# Sitio web de BOTAS (GitHub Pages)

Sitio estático (HTML + CSS + JavaScript, sin framework ni build) para difundir BOTAS y recibir
feedback. Pensado para publicarse en **GitHub Pages** en `https://huesomx.github.io/B.O.T.A.S/`.

```
website/
├── index.html      # 4 pestañas: ¿Qué es? · El proyecto · Cómo empezar · Descarga y contacto
├── styles.css      # estética minimalista blanco y negro, responsive
├── main.js         # pestañas + cuenta regresiva + envío del formulario
└── assets/         # logo, favicon y capturas/diagramas
```

## 1) Qué tienes que editar (placeholders)

| Dónde | Qué | Marca |
|---|---|---|
| `index.html` → sección `#proyecto` | Bio, motivo del proyecto y enlaces a repos/trabajos previos | textos `[EDITAR: …]` y enlaces `data-edit-link` |
| `index.html` → formulario | **Access key de Web3Forms** | `value="TU_ACCESS_KEY_DE_WEB3FORMS"` |
| `main.js` (arriba) | Fecha de lanzamiento y correo de contacto | `LAUNCH_DATE`, `CONTACT_EMAIL` |

### Conseguir la access key de Web3Forms (gratis, ~2 min)
1. Entra a <https://web3forms.com> y escribe el correo donde quieres recibir los mensajes
   (`aatr010423@gmail.com`).
2. Te llega una **access key** por correo.
3. Pégala en `index.html`, en `value="…"` del campo oculto `access_key`.

Mientras no la configures, el formulario muestra un aviso y ofrece el enlace `mailto:` de
respaldo (no se pierde el contacto).

## 2) Probar en local

```bash
cd website
python3 -m http.server 8000
# abre http://localhost:8000
```

Comprueba: las 4 pestañas, el diseño en móvil (ventana angosta), la cuenta regresiva y el envío
del formulario.

## 3) Publicar en GitHub Pages (vía GitHub Actions)

Ya se incluye el workflow `.github/workflows/pages.yml`, que publica **solo** la carpeta
`website/` cuando hay un push a `main`.

Pasos (una sola vez):
1. Sube el repositorio a GitHub (rama `main`).
2. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Cada push a `main` vuelve a desplegar. El sitio queda en
   `https://huesomx.github.io/B.O.T.A.S/`.

### Alternativa sin Actions
Crear una rama `gh-pages` con el contenido de `website/` en su raíz y en
**Settings → Pages** elegir *Deploy from a branch → `gh-pages` / root*.

## Notas

- Todas las rutas son **relativas** (el sitio vive en la subruta `/B.O.T.A.S/`); no usar rutas
  que empiecen con `/`.
- Las imágenes de `assets/` son copias de capturas y diagramas del repositorio; reemplázalas por
  versiones limpias/actualizadas cuando quieras (mismos nombres de archivo).
- Sin rastreadores ni cookies.
