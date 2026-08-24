# Sitio web de LIMA (GitHub Pages)

Sitio estático (HTML + CSS + JavaScript, sin framework ni build) para difundir LIMA,
publicar la evidencia de investigación y recibir feedback. Publicado en
**https://hudesde.github.io/LIMA-Web/**.

```
LIMA-Web/
├── index.html      # 5 pestañas (ver abajo)
├── styles.css      # estética minimalista blanco y negro, responsive
├── main.js         # i18n ES/EN/PT + pestañas + cuenta regresiva + formulario
└── assets/
    ├── videos/     # demostraciones en video de peticiones reales
    ├── research/   # diagramas y gráficas de la evaluación y usabilidad
    └── docs/       # reporte de usabilidad (PDF) y datos crudos (CSV)
```

## Pestañas

| Pestaña | Contenido |
|---|---|
| **¿Qué es?** | Propuesta de valor, características, enfoque HCAI |
| **Sobre mí** | Autor, motivación y contexto académico |
| **Cómo empezar** | Ejemplos en video, instalación paso a paso, código de acceso |
| **Investigación** | **Transparencia completa**: todo lo que no cupo en la charla |
| **Descarga y contacto** | Instalación y formulario que asigna un código de acceso |

## La pestaña «Investigación»

Existe por una razón concreta: una charla de 20 minutos obliga a recortar, y todo lo
recortado debe quedar públicamente disponible. Incluye la arquitectura completa con sus
tres diagramas, el detalle de TaskLearner, la evaluación automatizada sobre 250 tareas,
la comparativa DeepSeek vs GPT-4o, el estudio de usabilidad (*n*=14, ISO 9241-11) con
sus 21 gráficas, la validación multi-distribución, las **limitaciones honestas** y el
trabajo futuro — más los **datos crudos descargables** (dataset, resultados por modelo y
el reporte completo de usabilidad en PDF).

## Desarrollo local

No hay build. Basta con servir la carpeta:

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>.

> Al añadir texto nuevo, define la clave i18n en **los tres idiomas** (`es`, `en`, `pt`)
> dentro de `main.js`. Si una clave falta en un idioma, al cambiar de idioma el texto se
> queda en el anterior en lugar de traducirse.
