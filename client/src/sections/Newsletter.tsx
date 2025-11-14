import type { FC, FormEvent } from 'react';
import SectionHeading from '../components/SectionHeading';

const Newsletter: FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email');
    if (typeof email === 'string' && email.trim()) {
      window.alert(`¡Gracias por suscribirte, ${email}! Pronto recibirás nuestras novedades.`);
      form.reset();
    }
  };

  return (
    <section id="newsletter" className="section-wrapper bg-midnight">
      <div className="mx-auto max-w-4xl rounded-[3rem] border border-secondary/30 bg-newsletter-pattern p-10 text-midnight shadow-2xl">
        <SectionHeading
          eyebrow="Newsletter"
          title="Recibí alertas técnicas y promociones exclusivas"
          description={
            <span>
              Contenido mensual con tendencias del sector, mantenimientos preventivos y lanzamientos especiales de Electrocentro.
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
            className="w-full flex-1 rounded-full border border-midnight/10 bg-soft-white px-6 py-4 text-base text-midnight focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/40"
            placeholder="Tu correo empresarial"
          />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-4 font-semibold uppercase tracking-wide text-soft-white shadow-lg transition hover:bg-secondary hover:text-midnight sm:w-auto"
          >
            Suscribirme
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
