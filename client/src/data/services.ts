export interface Service {
  title: string;
  description: string;
  metrics: string;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    title: 'Diagnóstico Express 360°',
    description: 'Evaluación integral en laboratorio propio con instrumentación de precisión y trazabilidad digital.',
    metrics: 'Menos de 48hs para informes críticos',
    image: 'https://images.unsplash.com/photo-1581091870627-3b1e49f63b91?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Técnico revisando un tablero eléctrico'
  },
  {
    title: 'Soporte In-Situ',
    description: 'Personal certificado para puestas en marcha, mantenimiento predictivo en industria.',
    metrics: 'Cobertura en Devoto y alrededores',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Trabajo técnico en taller con herramientas'
  },
  {
    title: 'Retrofit & Modernización',
    description: 'Actualizamos tableros y maquinaria para integrar sensores, monitoreo remoto y ahorro energético.',
    metrics: 'ROI promedio en 14 meses',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Equipo técnico en planta industrial'
  }
];
