import type { FC } from 'react';
import BrandMark from '../components/BrandMark';

const Footer: FC = () => (
  <footer className="bg-sand/90 border-t border-clay/70">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
      <BrandMark />
      <p className="text-sm text-ink/60">
        Copyright {new Date().getFullYear()} Electrocentro. Trabajo honesto para que todo siga funcionando.
      </p>
      <div className="flex items-center gap-4 text-sm text-ink/60">
        <a className="transition hover:text-secondary" href="https://www.instagram.com">Instagram</a>
        <a className="transition hover:text-secondary" href="mailto:electrocentrodevoto@gmail.com">Email</a>
        <a className="transition hover:text-secondary" href="https://wa.me/+5493564647346?text=Hola%2C%20me%20interesa%20saber%20mas%20sobre%20sus%20servicios" target='_blank'>WhatsApp</a>
      </div>
    </div>
  </footer>
);

export default Footer;
