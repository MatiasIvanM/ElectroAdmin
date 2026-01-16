import type { FC } from 'react';

const Hero: FC = () => (
  <section
    id="inicio"
    className="relative flex min-h-screen items-center justify-center bg-hero-pattern bg-cover bg-center"
  >
    <div className="absolute inset-0 bg-cream/40" aria-hidden />
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center text-ink">
      <span className="rounded-full border border-secondary/30 bg-cream/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
        Desde 1998
      </span>
      <h1 className="text-4xl font-headline font-semibold text-ink md:text-6xl">
        Electrocentro: tu taller de confianza para hogar, campo y empresa
      </h1>
      <p className="max-w-3xl text-lg text-ink/70">
        Somos un equipo cercano que arregla, asesora y cuida tus equipos como si fueran propios. Trabajo prolijo, tiempos claros y atencion humana.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="#contacto"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold uppercase tracking-wide text-cream shadow-warm transition hover:bg-primary"
        >
          Pedir presupuesto
        </a>
        <a
          href="#servicios"
          className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-cream/70 px-6 py-3 font-semibold uppercase tracking-wide text-ink/80 transition hover:border-secondary hover:text-secondary"
        >
          Conocer servicios
        </a>
      </div>
      <dl className="grid w-full grid-cols-1 gap-6 text-left text-ink/70 sm:grid-cols-3">
        <div className="rounded-2xl border border-clay/60 bg-cream/90 p-6 shadow-warm">
          <dt className="text-xs uppercase tracking-[0.3em] text-secondary">Confianza</dt>
          <dd className="mt-2 text-2xl font-semibold text-ink">+1200 trabajos</dd>
        </div>
        <div className="rounded-2xl border border-clay/60 bg-cream/90 p-6 shadow-warm">
          <dt className="text-xs uppercase tracking-[0.3em] text-secondary">Transparencia</dt>
          <dd className="mt-2 text-2xl font-semibold text-ink">Presupuesto claro</dd>
        </div>
        <div className="rounded-2xl border border-clay/60 bg-cream/90 p-6 shadow-warm">
          <dt className="text-xs uppercase tracking-[0.3em] text-secondary">Garantia</dt>
          <dd className="mt-2 text-2xl font-semibold text-ink">Soporte real</dd>
        </div>
      </dl>
    </div>
  </section>
);

export default Hero;
