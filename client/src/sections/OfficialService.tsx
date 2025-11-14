import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { brands } from '../data/brands';

const OfficialService: FC = () => (
  <section id="service-oficial" className="section-wrapper bg-midnight">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Service oficial"
        title="Aliados estratégicos de marcas líderes"
        description={
          <span>
            Procesos auditados, capacitación continua y stock de repuestos originales para garantizar la continuidad operativa de tus equipos.
          </span>
        }
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {brands.map((brand) => (
          <article
            key={brand.name}
            className="flex flex-col gap-4 rounded-3xl border border-soft-white/10 bg-graphite/80 p-6 backdrop-blur"
          >
            <div>
              <h3 className="text-2xl font-semibold text-soft-white">{brand.name}</h3>
              <p className="text-soft-white/70">{brand.description}</p>
            </div>
            <a
              href={brand.url}
              className="text-sm font-semibold text-accent transition hover:text-secondary"
            >
              Ver certificaciones
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default OfficialService;
