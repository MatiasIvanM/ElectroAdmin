# Electrocentro Landing Page

Landing page comercial para **Electrocentro**, taller de reparaciones electrónicas con foco en soluciones para hogares, agro e industria.

## Características principales

- ⚡️ Secciones diferenciadas para verticales de Hogar, Agro e Industria.
- 🛠️ Presentación de servicios clave con métricas y beneficios.
- 🛍️ Vitrina comercial con productos destacados listos para cotizar.
- 💡 Espacio de tips enlazado a contenidos de Instagram (stories, reels y posts).
- 🤝 Sección de service oficial con alianzas estratégicas.
- 📨 Formulario de newsletter con feedback inmediato.
- 📞 Formulario de contacto y datos de atención extendida.
- 🌌 Hero con efecto *parallax* y fondos estáticos para dar sensación premium.
- 🎨 Estilos con Tailwind CSS y componentes en TypeScript.

## Tecnologías

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Create React App

## Desarrollo

```bash
cd client
npm install
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

### Tests

```bash
cd client
npm test
```

## Estructura relevante

- `client/src/components` — componentes reutilizables (branding, encabezados, navegación).
- `client/src/data` — fuentes de datos tipadas para servicios, industrias, productos y tips.
- `client/src/sections` — secciones principales de la landing page.

## Personalización

- Ajustá colores y fuentes en `client/tailwind.config.js`.
- Modificá imágenes de fondo y gradientes desde la misma configuración.
- Actualizá enlaces sociales y de contacto directamente en cada sección correspondiente.
