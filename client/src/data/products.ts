export interface Product {
  name: string;
  category: string;
  description: string;
  highlight: string;
}

export const products: Product[] = [
  {
    name: 'Kit Hogar Connect',
    category: 'Hogar',
    description: 'Paquete de instalación con sensores inteligentes, climatización eficiente y soporte remoto.',
    highlight: 'Instalación en 72hs'
  },
  {
    name: 'Panel AgroSmart',
    category: 'Agro',
    description: 'Tablero IP65 con control remoto de electroválvulas y monitoreo de presión en tiempo real.',
    highlight: 'Garantía extendida 18 meses'
  },
  {
    name: 'UPS Industrial 40KVA',
    category: 'Industria',
    description: 'Sistema redundante con telemetría, bypass automático y analítica predictiva.',
    highlight: 'Servicio 24/7 incluido'
  }
];
