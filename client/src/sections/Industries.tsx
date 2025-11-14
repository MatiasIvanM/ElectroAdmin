import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { industries } from '../data/industries';

const Industries: FC = () => (
  <section id="industrias" className="section-wrapper bg-gradient-to-b from-midnight to-graphite">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Donde operamos"
        title="Cobertura especializada para hogar, agro e industria"
        description={
          <span>
            Tres verticales, una misma experiencia: equipos certificados, repuestos originales y conectividad para monitorear cada intervención.
          </span>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {industries.map((industry) => (
          <article
            key={industry.name}
            className="relative flex flex-col gap-4 rounded-3xl border border-soft-white/10 bg-midnight/80 p-8 shadow-lg backdrop-blur"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-2xl">
              {industry.icon}
            </div>
            <h3 className="text-2xl font-semibold text-soft-white">{industry.name}</h3>
            <p className="text-soft-white/70 leading-relaxed">{industry.description}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">{industry.focus}</p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary via-accent to-primary" aria-hidden />
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
