import type { FC, FormEvent } from 'react';
import SectionHeading from '../components/SectionHeading';

const Contact: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const company = formData.get('company');
    window.alert(`¡Gracias ${company || 'empresa'}! Nuestro equipo se comunicará a la brevedad.`);
    form.reset();
  };

  return (
    <section id="contacto" className="section-wrapper bg-gradient-to-b from-midnight to-graphite">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        <SectionHeading
          eyebrow="Contacto"
          title="Diseñemos juntos tu próximo hito energético"
          description={
            <span>
              Contanos qué necesitás y coordinamos una reunión técnica o demostración virtual.
            </span>
          }
        />
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-soft-white/10 bg-midnight/70 p-8 backdrop-blur"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide text-soft-white/70">
                Nombre completo
                <input
                  type="text"
                  name="name"
                  required
                  className="rounded-2xl border border-soft-white/10 bg-graphite/70 px-4 py-3 text-soft-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide text-soft-white/70">
                Empresa
                <input
                  type="text"
                  name="company"
                  required
                  className="rounded-2xl border border-soft-white/10 bg-graphite/70 px-4 py-3 text-soft-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </label>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide text-soft-white/70">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-2xl border border-soft-white/10 bg-graphite/70 px-4 py-3 text-soft-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide text-soft-white/70">
                Teléfono
                <input
                  type="tel"
                  name="phone"
                  className="rounded-2xl border border-soft-white/10 bg-graphite/70 px-4 py-3 text-soft-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide text-soft-white/70">
              Detalles del proyecto
              <textarea
                name="message"
                rows={4}
                className="rounded-2xl border border-soft-white/10 bg-graphite/70 px-4 py-3 text-soft-white focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
                placeholder="Contanos qué equipos debemos poner en marcha"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-secondary px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-midnight shadow-glow transition hover:bg-soft-white"
            >
              Enviar consulta
            </button>
          </form>
          <aside className="flex flex-col gap-6 rounded-3xl border border-soft-white/10 bg-midnight/50 p-8 text-soft-white/80">
            <div>
              <h3 className="text-lg font-semibold text-soft-white">Horario extendido</h3>
              <p>Lu a Vi 8:30 - 19 hs / Sábados 9 - 13 hs</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-soft-white">Centro de operaciones</h3>
              <p>Parque Industrial NEA, Nave 11</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-soft-white">Canales directos</h3>
              <ul className="space-y-2 text-sm">
                <li>WhatsApp: +54 379 400 0000</li>
                <li>Correo: hola@electrocentro.com</li>
                <li>Instagram: @electrocentro</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;
