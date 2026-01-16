export interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  compatibleModels: string[];
  stock: number;
  criticalStock: number;
  notes: string;
}

export const inventory: InventoryItem[] = [
  {
    id: 'prd-001',
    name: 'Resistencia Horno 1200W',
    brand: 'Peabody',
    category: 'Hornos',
    compatibleModels: ['PE-6000', 'PE-6200'],
    stock: 12,
    criticalStock: 5,
    notes: 'Incluye terminales reforzadas y aislacion ceramica.'
  },
  {
    id: 'prd-002',
    name: 'Motor Ventilador 18W',
    brand: 'Liliana',
    category: 'Ventilacion',
    compatibleModels: ['VL-18', 'VL-20', 'VL-22'],
    stock: 7,
    criticalStock: 4,
    notes: 'Eje largo con buje sellado. Ideal para uso continuo.'
  },
  {
    id: 'prd-003',
    name: 'Placa Control Licuadora',
    brand: 'Oster',
    category: 'Licuadoras',
    compatibleModels: ['BLSTMG', 'BLSTPY', 'BVLB07'],
    stock: 5,
    criticalStock: 3,
    notes: 'Requiere calibracion de velocidad al instalar.'
  },
  {
    id: 'prd-004',
    name: 'Termostato Plancha 250V',
    brand: 'Yelmo',
    category: 'Planchas',
    compatibleModels: ['YP-200', 'YP-220'],
    stock: 18,
    criticalStock: 6,
    notes: 'Contacto doble. Incluye aislante termico.'
  },
  {
    id: 'prd-005',
    name: 'Capacitor Arranque 4uF',
    brand: 'Winco',
    category: 'Climatizacion',
    compatibleModels: ['ACW-900', 'ACW-1200'],
    stock: 9,
    criticalStock: 4,
    notes: 'Repuesto original. Verificar voltaje antes de instalar.'
  },
  {
    id: 'prd-006',
    name: 'Perilla Selector Temperatura',
    brand: 'Ultracomb',
    category: 'Hornos',
    compatibleModels: ['UC-55', 'UC-60'],
    stock: 14,
    criticalStock: 5,
    notes: 'Incluye escala serigrafiada. Compatible con hornos a gas.'
  }
];
