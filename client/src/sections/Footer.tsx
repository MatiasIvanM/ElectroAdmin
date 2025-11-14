import type { FC } from 'react';
import BrandMark from '../components/BrandMark';

const Footer: FC = () => (
  <footer className="bg-midnight/90 border-t border-soft-white/10">
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
      <BrandMark />
      <p className="text-sm text-soft-white/60">
        © {new Date().getFullYear()} Electrocentro. Tecnología y servicio para avanzar sin cortes.
      </p>
      <div className="flex items-center gap-4 text-sm text-soft-white/60">
        <a className="transition hover:text-secondary" href="https://www.instagram.com/electrocentro/">Instagram</a>
        <a className="transition hover:text-secondary" href="mailto:hola@electrocentro.com">Email</a>
        <a className="transition hover:text-secondary" href="tel:+543794000000">WhatsApp</a>
      </div>
    </div>
  </footer>
);

export default Footer;
