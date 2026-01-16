export interface Industry {
  name: string;
  description: string;
  icon: string;
  focus: string;
}

export const industries: Industry[] = [
  {
    name: 'Hogar Inteligente',
    description: 'Mantenimiento y reparación de electrodomésticos, climatización y soluciones IoT para hogares conectados.',
    icon: '🏠',
    focus: 'Electrodomésticos, domótica'
  },
  {
    name: 'Agro y Campo',
    description: 'Automatización de sistemas de riego, monitoreo energético y soporte para maquinaria agroindustrial.',
    icon: '🌱',
    focus: 'Electroválvulas, tableros inteligentes, sensorización'
  },
  {
    name: 'Industria y Energía',
    description: 'Servicios para líneas industriales, UPS críticas y plantas con procesos 24/7.',
    icon: '🏭',
    focus: 'UPS, tableros de potencia, monitoreo predictivo'
  }
];
