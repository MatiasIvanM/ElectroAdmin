import type { FC } from 'react';
import SectionHeading from '../components/SectionHeading';
import { tips } from '../data/tips';

const badgeStyles: Record<typeof tips[number]['type'], string> = {
  stories: 'bg-secondary/15 text-secondary',
  reels: 'bg-accent/20 text-accent',
  posts: 'bg-primary/15 text-primary'
};

const Tips: FC = () => (
  <section id="tips" className="section-wrapper bg-gradient-to-b from-sand to-cream">
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
      <SectionHeading
        eyebrow="Tips y comunidad"
        title="Consejos simples para alargar la vida de tus equipos"
        description={
          <span>
            Sumate a la comunidad para ver consejos simples, checklists y cuidados diarios.
          </span>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {tips.map((tip) => (
          <article
            key={tip.title}
            className="flex h-full flex-col justify-between rounded-3xl border border-clay/60 bg-cream p-8 shadow-warm"
          >
            <div className="space-y-4">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeStyles[tip.type]}`}>
                {tip.type}
              </span>
              <h3 className="text-xl font-semibold text-ink">{tip.title}</h3>
              <p className="text-ink/70 leading-relaxed">{tip.description}</p>
            </div>
            <a
              href={tip.link}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-secondary"
            >
              Ver en Instagram
              <span aria-hidden>+</span>
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Tips;
