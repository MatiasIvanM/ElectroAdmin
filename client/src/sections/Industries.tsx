import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { industries } from '../data/industries';

const Industries: FC = () => (
  <section id="industrias" className="section-wrapper bg-gradient-to-b from-cream to-sand">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Donde trabajamos"
        title="Cuidamos equipos en casa, campo y empresa"
        description={
          <span>
            Tres frentes, misma forma de trabajar: buena comunicacion, cuidado y seguimiento de cada arreglo.
          </span>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {industries.map((industry) => (
          <article
            key={industry.name}
            className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-clay/60 bg-cream p-8 shadow-warm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/15 text-2xl">
              {industry.icon}
            </div>
            <h3 className="text-2xl font-semibold text-ink">{industry.name}</h3>
            <p className="text-ink/70 leading-relaxed">{industry.description}</p>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">{industry.focus}</p>
            <div
              className="absolute inset-x-0 bottom-0 h-1 rounded-b-3xl bg-gradient-to-r from-secondary via-accent to-primary/70"
              aria-hidden
            />
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Industries;
