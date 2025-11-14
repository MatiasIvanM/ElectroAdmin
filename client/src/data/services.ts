export interface Service {
  title: string;
  description: string;
  metrics: string;
}

export const services: Service[] = [
  {
    title: 'Diagnóstico Express 360°',
    description: 'Evaluación integral en laboratorio propio con instrumentación de precisión y trazabilidad digital.',
    metrics: 'Menos de 48hs para informes críticos'
  },
  {
    title: 'Soporte In-Situ',
    description: 'Cuadrillas certificadas para puestas en marcha, mantenimiento predictivo y asistencia 24/7.',
    metrics: 'Cobertura en todo el Litoral'
  },
  {
    title: 'Retrofit & Modernización',
    description: 'Actualizamos tableros y maquinaria para integrar sensores, monitoreo remoto y ahorro energético.',
    metrics: 'ROI promedio en 14 meses'
  }
];
