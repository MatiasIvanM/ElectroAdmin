export interface Brand {
  name: string;
  description: string;
  url: string;
}

export const brands: Brand[] = [
  {
    name: 'ABB',
    description: 'Drives & controladores industriales',
    url: 'https://new.abb.com/'
  },
  {
    name: 'Siemens',
    description: 'Automatización y digitalización',
    url: 'https://new.siemens.com/'
  },
  {
    name: 'Schneider Electric',
    description: 'Energía segura y eficiente',
    url: 'https://www.se.com/'
  },
  {
    name: 'Daikin',
    description: 'Climatización residencial y comercial',
    url: 'https://www.daikin.com/'
  }
];
