import type { FC, FormEvent } from 'react';
import SectionHeading from '../components/SectionHeading';

const Newsletter: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email');
    if (typeof email === 'string' && email.trim()) {
      window.alert(`Gracias por suscribirte, ${email}! Pronto recibiras nuestras novedades.`);
      form.reset();
    }
  };

  return (
    <section id="newsletter" className="section-wrapper bg-sand">
      <div className="mx-auto max-w-4xl rounded-[3rem] border border-clay/70 bg-newsletter-pattern p-10 text-ink shadow-warm">
        <SectionHeading
          eyebrow="Newsletter"
          title="Recibi tips y avisos utiles"
          description={
            <span>
              Contenido mensual con mantenimientos preventivos, novedades y promos honestas de Electrocentro.
            </span>
          }
          align="center"
        />
        <form
          className="mt-8 flex flex-col gap-4 sm:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            required
            className="w-full flex-1 rounded-full border border-clay/70 bg-cream px-6 py-4 text-base text-ink focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
            placeholder="Tu correo"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-4 font-semibold uppercase tracking-wide text-cream shadow-warm transition hover:bg-secondary sm:w-auto"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
