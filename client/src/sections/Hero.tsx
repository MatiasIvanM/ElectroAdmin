import type { FC } from 'react';

const Hero: FC = () => (
  <section
    id="inicio"
    className="relative flex min-h-screen items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed"
  >
    <div className="absolute inset-0 bg-midnight/70" aria-hidden />
    <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
      <span className="rounded-full border border-secondary/50 bg-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-secondary">
        Servicio técnico premium
      </span>
      <h1 className="text-4xl font-headline font-semibold text-soft-white drop-shadow md:text-6xl">
        Electrocentro: mantenimiento integral para hogares, agro e industria
      </h1>
      <p className="max-w-3xl text-lg text-soft-white/85">
        Somos el taller comercial que combina ingeniería, logística y experiencia humana para que tus operaciones eléctricas nunca se detengan.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          href="#contacto"
          className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 font-semibold uppercase tracking-wide text-midnight shadow-glow transition hover:bg-soft-white"
        >
          Agenda una asesoría
        </a>
        <a
          href="#industrias"
          className="inline-flex items-center justify-center rounded-full border border-soft-white/30 px-6 py-3 font-semibold uppercase tracking-wide text-soft-white/90 transition hover:border-secondary hover:text-secondary"
        >
          Explorar soluciones
        </a>
      </div>
      <dl className="grid w-full grid-cols-1 gap-6 text-left text-soft-white/80 sm:grid-cols-3">
        <div className="rounded-2xl border border-soft-white/10 bg-midnight/50 p-6 backdrop-blur">
          <dt className="text-xs uppercase tracking-[0.3em] text-secondary">Cobertura</dt>
          <dd className="mt-2 text-2xl font-semibold text-soft-white">+1200 hogares</dd>
        </div>
        <div className="rounded-2xl border border-soft-white/10 bg-midnight/50 p-6 backdrop-blur">
          <dt className="text-xs uppercase tracking-[0.3em] text-secondary">Industria</dt>
          <dd className="mt-2 text-2xl font-semibold text-soft-white">Servicio 24/7</dd>
        </div>
        <div className="rounded-2xl border border-soft-white/10 bg-midnight/50 p-6 backdrop-blur">
          <dt className="text-xs uppercase tracking-[0.3em] text-secondary">Satisfacción</dt>
          <dd className="mt-2 text-2xl font-semibold text-soft-white">NPS 94/100</dd>
        </div>
      </dl>
    </div>
  </section>
);

export default Hero;
