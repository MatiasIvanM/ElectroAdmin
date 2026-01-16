import peabodyLogo from '../assets/brands/peabody.svg';
import lilianaLogo from '../assets/brands/liliana.svg';
import kiottoLogo from '../assets/brands/kiotto.png';
import crivelLogo from '../assets/brands/crivel.svg';
import yelmoLogo from '../assets/brands/yelmo.png';
import ultracombLogo from '../assets/brands/ultracomb.webp';
import osterLogo from '../assets/brands/oster.png';
import wincoLogo from '../assets/brands/winco.svg';

export interface Brand {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
  logoTone: 'light' | 'dark';
  logoHaloMode?: 'on' | 'off' | 'light';
}

export const brands: Brand[] = [
  {
    name: 'Peabody',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: peabodyLogo,
    logoTone: 'dark',
    logoHaloMode: 'light'
  },
  {
    name: 'Oster',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: osterLogo,
    logoTone: 'light',
    logoHaloMode: 'off'
  },
  {
    name: 'Liliana',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: lilianaLogo,
    logoTone: 'dark'
  },
  {
    name: 'Kiotto',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: kiottoLogo,
    logoTone: 'dark'
  },
  {
    name: 'Yelmo',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: yelmoLogo,
    logoTone: 'dark'
  },
  {
    name: 'Crivel',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: crivelLogo,
    logoTone: 'dark',
    logoHaloMode: 'light'
  },
  {
    name: 'Ultracomb',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: ultracombLogo,
    logoTone: 'dark',
    logoHaloMode: 'light'
  },
  {
    name: 'Winco',
    description: 'Electrodomésticos y segundas marcas oficiales',
    url: '',
    logoUrl: wincoLogo,
    logoTone: 'light',
    logoHaloMode: 'off'
  }
];
