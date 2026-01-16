import type { FC } from 'react';
import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#tienda', label: 'Tienda' },
  { href: '#tips', label: 'Tips' },
  { href: '#service-oficial', label: 'Service oficial' },
  { href: '#contacto', label: 'Contacto' }
];

const getInitialTheme = (): 'light' | 'dark' => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const Navigation: FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-clay/70 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <BrandMark />
        <ul className="hidden items-center gap-6 text-sm font-semibold text-ink/80 md:flex">
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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-clay/80 text-ink/70 transition hover:border-secondary hover:text-secondary"
            aria-pressed={theme === 'dark'}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M6.76 4.84l-1.8-1.79-1.42 1.41 1.8 1.8 1.42-1.42zm10.48 0l1.8-1.79 1.42 1.41-1.8 1.8-1.42-1.42zM12 6a6 6 0 100 12 6 6 0 000-12zm9 5h-2v2h2v-2zm-16 0H3v2h2v-2zm10.24 8.16l1.8 1.79 1.42-1.41-1.8-1.8-1.42 1.42zm-8.48 0l-1.8 1.79-1.42-1.41 1.8-1.8 1.42 1.42zM11 3h2v2h-2V3zm0 16h2v2h-2v-2z" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M21 14.5A8.5 8.5 0 0110.5 3a7 7 0 000 14A8.5 8.5 0 0021 14.5z" />
              </svg>
            )}
          </button>
          <a
            href="#contacto"
            className="rounded-full bg-secondary px-5 py-2 text-xs font-semibold uppercase tracking-wide text-cream shadow-warm transition hover:bg-primary"
          >
            Cotiza tu proyecto
          </a>
        </div>
      </div>
      <div className="flex justify-center border-t border-clay/60 bg-sand/80 px-6 py-2 text-xs text-ink/60 md:hidden">
        <span>Explora la web y conoce todo lo que hacemos</span>
      </div>
    </nav>
  );
};

export default Navigation;
