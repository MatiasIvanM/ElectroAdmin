import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { services } from '../data/services';

const Services: FC = () => (
  <section id="servicios" className="section-wrapper bg-midnight">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Qué hacemos"
        title="Un taller comercial con ingeniería aplicada"
        description={
          <span>
            Desde la recepción hasta el campo, conectamos equipos técnicos con herramientas digitales, trazabilidad en vivo y un enfoque preventivo que minimiza paradas no planificadas.
          </span>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="group relative overflow-hidden rounded-3xl border border-soft-white/10 bg-gradient-to-br from-graphite/60 to-midnight/80 p-8 backdrop-blur transition hover:shadow-glow"
          >
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl transition group-hover:bg-secondary/20" aria-hidden />
            <h3 className="text-xl font-semibold text-soft-white">{service.title}</h3>
            <p className="mt-4 text-soft-white/70 leading-relaxed">{service.description}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-secondary">{service.metrics}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
