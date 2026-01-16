export interface MetricsSummary {
  consultas: number;
  conversiones: number;
  productosMasVistos: string[];
  stockCritico: number;
  monthly: MonthlyMetric[];
}

export interface MonthlyMetric {
  label: string;
  consultas: number;
  conversiones: number;
  isPartial?: boolean;
}

export const metricsSummary: MetricsSummary = {
  consultas: 128,
  conversiones: 23,
  productosMasVistos: [
    'Resistencia Horno 1200W',
    'Placa Control Licuadora',
    'Termostato Plancha 250V'
  ],
  stockCritico: 3,
  monthly: [
    { label: 'Ene', consultas: 90, conversiones: 12 },
    { label: 'Feb', consultas: 102, conversiones: 16 },
    { label: 'Mar', consultas: 118, conversiones: 18 },
    { label: 'Abr', consultas: 97, conversiones: 14 },
    { label: 'May', consultas: 124, conversiones: 20 },
    { label: 'Jun', consultas: 110, conversiones: 17 },
    { label: 'Jul', consultas: 130, conversiones: 21 },
    { label: 'Ago', consultas: 142, conversiones: 24 },
    { label: 'Sep', consultas: 136, conversiones: 22 },
    { label: 'Oct', consultas: 121, conversiones: 19 },
    { label: 'Nov', consultas: 115, conversiones: 18 },
    { label: 'Dic', consultas: 88, conversiones: 11, isPartial: true }
  ]
};
