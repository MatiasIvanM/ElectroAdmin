import type { FC } from 'react';
import BrandMark from './BrandMark';

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#tienda', label: 'Tienda' },
  { href: '#tips', label: 'Tips' },
  { href: '#service-oficial', label: 'Service oficial' },
  { href: '#contacto', label: 'Contacto' }
];

const Navigation: FC = () => (
  <nav className="fixed left-0 right-0 top-0 z-50 border-b border-soft-white/10 bg-midnight/60 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <BrandMark />
      <ul className="hidden items-center gap-6 text-sm font-semibold text-soft-white/80 md:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a
              className="transition-colors hover:text-secondary"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href="#contacto"
        className="rounded-full border border-secondary bg-secondary/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary transition hover:bg-secondary hover:text-midnight"
      >
        Cotizá tu proyecto
      </a>
    </div>
    <div className="flex justify-center border-t border-soft-white/5 bg-midnight/80 px-6 py-2 text-xs text-soft-white/60 md:hidden">
      <span>Explorá la web deslizando y descubrí cada vertical</span>
    </div>
  </nav>
);

export default Navigation;
