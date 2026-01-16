# Electrocentro

Landing page comercial para Electrocentro, taller de reparaciones electronicas con foco en hogares, agro e industria.
Incluye un panel /admin con inventario y metricas (mock) y un backend con autenticacion y roles.

## Caracteristicas

- Secciones para servicios, industrias, tienda, tips, service oficial y contacto.
- Tienda conectada a inventario con fichas tecnicas (sin precios).
- Panel /admin con login, roles, inventario y metricas mockeadas.
- Modo claro/oscuro automatico con toggle.

## Tecnologias

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Node.js + Express

## Requisitos

- Node 18+

## Desarrollo

Frontend:

```bash
cd client
npm install
npm run dev
```

Backend:

```bash
cd Server
npm install
npm start
```

## Variables de entorno

Backend (Server):

- `ADMIN_EMAIL`: email del admin inicial
- `ADMIN_PASSWORD`: password del admin inicial

Frontend (client):

- `VITE_API_URL`: URL del backend (ej: http://localhost:3001)
- `VITE_ADMIN_MOCK`: `true` para forzar datos mock en /admin

## Rutas importantes

- `http://localhost:5173/` landing
- `http://localhost:5173/admin` panel admin
- `http://localhost:3001/api/products` productos (mock)
- `http://localhost:3001/api/metrics` metricas (mock)

## Estructura relevante

- `client/src/components` componentes reutilizables
- `client/src/sections` secciones de la landing
- `client/src/admin` panel admin
- `client/src/data` data mock para inventario y metricas
- `Server/src/Routes` endpoints del backend
- `Server/src/data` data mock persistida

## Deploy a GitHub Pages

El workflow `/.github/workflows/deploy.yml` publica el frontend en GitHub Pages.
Asegurate de tener GitHub Actions habilitado en Settings > Pages.
