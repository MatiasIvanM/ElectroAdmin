import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { brands } from '../data/brands';

const OfficialService: FC = () => (
  <section id="service-oficial" className="section-wrapper bg-cream">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Service oficial"
        title="Respaldo real de marcas lideres"
        description={
          <span>
            Somos service oficial y trabajamos con repuestos originales y protocolos de cada marca.
          </span>
        }
      />
      <div className="logo-marquee">
        <div className="logo-track">
          {[...brands, ...brands].map((brand, index) => (
            <article
              key={`${brand.name}-${index}`}
              className="logo-item"
              data-tone={brand.logoTone}
              data-halo={brand.logoHaloMode ?? 'on'}
              aria-label={brand.name}
            >
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className={`logo-image ${brand.logoTone === 'light' ? 'logo-image--light' : ''}`}
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OfficialService;
