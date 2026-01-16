import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { inventory } from '../data/inventory';

const ShopShowcase: FC = () => (
  <section id="tienda" className="section-wrapper bg-sand">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Tienda del taller"
        title="Repuestos y accesorios disponibles"
        description={
          <span>
            Mostramos los productos que trabajamos con sus modelos compatibles. Los precios se consultan.
          </span>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {inventory.map((item) => (
          <article
            key={item.id}
            className="flex h-full flex-col justify-between rounded-3xl border border-clay/60 bg-cream p-8 shadow-warm"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                  {item.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  {item.brand}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-ink">{item.name}</h3>
              <p className="text-ink/70 leading-relaxed">{item.notes}</p>
              <div className="text-sm text-ink/70">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                  Modelos compatibles
                </p>
                <p>{item.compatibleModels.join(' · ')}</p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">Precio a consultar</p>
              <a
                href="#contacto"
                className="text-sm font-semibold text-primary transition hover:text-secondary"
              >
                Consultar
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ShopShowcase;
