/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        sand: "rgb(var(--color-sand) / <alpha-value>)",
        clay: "rgb(var(--color-clay) / <alpha-value>)"
      },
      fontFamily: {
        headline: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        body: ['"Work Sans"', "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        warm: "0 20px 45px rgb(var(--color-ink) / 0.14)"
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(120deg, rgb(var(--color-cream) / 0.92), rgb(var(--color-sand) / 0.9)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80')",
        'newsletter-pattern': "linear-gradient(135deg, rgb(var(--color-secondary) / 0.18), rgb(var(--color-primary) / 0.1))"
      }
    }
  },
  plugins: []
};
