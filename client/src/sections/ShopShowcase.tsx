import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { products } from '../data/products';

const ShopShowcase: FC = () => (
  <section id="tienda" className="section-wrapper bg-midnight">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Tienda comercial"
        title="Soluciones listas para integrar a tu operación"
        description={
          <span>
            Packs configurables, logística inmediata y soporte técnico incluido para que tus inversiones empiecen a rendir desde el día uno.
          </span>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.name}
            className="flex h-full flex-col justify-between rounded-3xl border border-soft-white/10 bg-graphite/70 p-8 shadow-lg backdrop-blur"
          >
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary">
                {product.category}
              </span>
              <h3 className="text-2xl font-semibold text-soft-white">{product.name}</h3>
              <p className="text-soft-white/70 leading-relaxed">{product.description}</p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary">{product.highlight}</p>
              <a
                href="#contacto"
                className="text-sm font-semibold text-accent transition hover:text-secondary"
              >
                Cotizar
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ShopShowcase;
