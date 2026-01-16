import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { services } from '../data/services';

const Services: FC = () => (
  <section id="servicios" className="section-wrapper bg-cream">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Que hacemos"
        title="Un taller cercano con manos tecnicas"
        description={
          <span>
            Desde la primera charla hasta la entrega, acompanamos cada trabajo con diagnostico claro, repuestos correctos y garantia real.
          </span>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.title}
            className="group relative overflow-hidden rounded-3xl border border-clay/60 bg-sand p-8 shadow-warm transition hover:-translate-y-1"
          >
            <div className="mb-5 overflow-hidden rounded-2xl">
              <img
                src={service.image}
                alt={service.imageAlt}
                className="h-40 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/10 blur-3xl transition group-hover:bg-secondary/20" aria-hidden />
            <h3 className="text-xl font-semibold text-ink">{service.title}</h3>
            <p className="mt-4 text-ink/70 leading-relaxed">{service.description}</p>
            <p className="mt-6 text-sm uppercase tracking-[0.3em] text-secondary">{service.metrics}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
