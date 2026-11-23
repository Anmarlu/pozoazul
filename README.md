# Portal Institucional — IETAE Pozo Azul

Portal web institucional de la **Institución Educativa Técnica Agropecuaria y Empresarial Pozo Azul** (Código DANE `213670000200`), ubicada en el corregimiento de Pozo Azul, municipio de San Pablo, Sur de Bolívar, Colombia.

Diseñado con enfoque **mobile-first**, accesibilidad **WCAG 2.2 Nivel AA**, rendimiento optimizado para conexiones rurales y arquitectura desacoplada preparada para evolucionar hacia **Next.js (App Router)** y un backend autogestionable.

---

## Características principales

- **Inicio (`/`):** Presentación institucional, fotografía territorial en WebP, accesos rápidos (SINAI, SIMAT, Circulares y Matrículas), noticias destacadas, próximos eventos y sección de formación técnica agropecuaria y empresarial.
- **Nuestra Institución (`/institucion`):** Datos oficiales de identificación (DANE `213670000200`, naturaleza oficial, Calendario A), historia y sedes rurales asociadas, misión, visión, valores, escudo oficial (*«Esfuerzo y Superación»*), estructura directiva y documentos institucionales.
- **Oferta Académica (`/oferta-academica`):** Niveles educativos (Preescolar, Básica Primaria, Básica Secundaria y Media Técnica), especialidad agroempresarial, proyectos productivos y galería optimizada en WebP.
- **Noticias, Eventos y Circulares (`/noticias` y `/noticias/:slug`):** Pestañas accesibles, búsqueda por texto, filtrado por categoría gestionado con `useReducer`, calendario cronológico, circulares y vista de detalle por parámetro dinámico `:slug`.
- **Trámites y Servicios (`/tramites`):** Guías paso a paso para matrícula de estudiantes nuevos y antiguos, formatos institucionales, acordeón accesible de preguntas frecuentes y horarios de atención.
- **Plataformas Educativas (`/plataformas`):** Accesos oficiales verificados a **SINAI** (`https://home.sinai.net.co/`) y **SIMAT** (`https://www.sistemamatriculas.gov.co/simat/app`) con instrucciones paso a paso y aviso de seguridad externa.
- **Contacto (`/contacto`):** Ubicación, canal oficial en Facebook (`https://www.facebook.com/IEpozoazul/`) y formulario con validación accesible en cliente.
- **Documentación API REST (`/api-docs`):** Especificación **OpenAPI 3.0** (`public/api/openapi.json`) visualizada con **Swagger UI** cargada bajo demanda (`React.lazy`).
- **Barra flotante de accesibilidad:** Controles laterales para **Alto contraste**, **Aumentar letra (`A+`)**, **Reducir letra (`A−`)** y **Restablecer vista**, persistidos en el navegador mediante `Context API`.

---

## Stack tecnológico

- **Frontend:** React 19, TypeScript (`strict`), Vite 6, Tailwind CSS 4
- **Enrutamiento:** React Router 7
- **Cliente HTTP y API REST:** Axios + Mock REST local en Vite (`/api/*`) + OpenAPI 3.0 / Swagger UI (`swagger-ui-dist`)
- **Iconografía:** Lucide React
- **Pruebas:** Vitest, React Testing Library, `@testing-library/user-event`, `jsdom`

---

## Requisitos previos

- **Node.js** 20 o superior
- **npm** 10 o superior

---

## Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Anmarlu/pozoazul.git
cd pozoazul

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo (incluye Mock REST en /api/*)
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` y la documentación Swagger UI en `http://localhost:5173/api-docs`.

---

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite con los endpoints REST locales (`/api/*`). |
| `npm run build` | Ejecuta verificación de tipos (`tsc --noEmit`) y genera el build de producción en `dist/`. |
| `npm run preview` | Previsualiza el build de producción con los endpoints `/api/*`. |
| `npm run typecheck` | Valida TypeScript en modo estricto sin emitir archivos. |
| `npm test` | Ejecuta la suite completa de pruebas unitarias e integración con Vitest. |
| `npm run test:watch` | Ejecuta Vitest en modo observador. |

---

## Estructura del proyecto

```text
├── public/
│   ├── api/openapi.json              # Contrato OpenAPI 3.0
│   └── images/                       # Escudo oficial y fotografías optimizadas en WebP
├── src/
│   ├── app/                          # App raíz, Layout accesible y configuración de rutas
│   ├── components/
│   │   ├── layout/                   # Header, Footer y AccessibilityRail
│   │   └── ui/                       # Accordion y StatusState (loading/empty/error)
│   ├── context/                      # PortalPreferencesContext (Context API + useContext)
│   ├── mocks/                        # Datos locales y middleware Mock REST de Vite
│   ├── pages/                        # Vistas de cada ruta y newsReducer (useReducer)
│   ├── services/                     # Instancia Axios y patrón Repository desacoplado
│   ├── styles/                       # Tokens de diseño (Azul Rey, Azul Escudo, Marfil y Blanco)
│   ├── types/                        # Contratos TypeScript de dominio
│   └── utils/                        # Formateo de fechas es-CO y validación de formulario
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Licencia y uso

Proyecto desarrollado como entregable académico de **Desarrollo Web II** y base técnica para el portal oficial de la **IETAE Pozo Azul** (San Pablo, Sur de Bolívar, Colombia).
