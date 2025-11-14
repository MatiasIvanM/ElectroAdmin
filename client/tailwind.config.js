/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2d3a9b",
        secondary: "#ff6b35",
        accent: "#00bcd4",
        midnight: "#0d1b2a",
        graphite: "#1b263b",
        "soft-white": "#f6f9fc"
      },
      fontFamily: {
        headline: ['\"Poppins\"', 'ui-sans-serif', 'system-ui'],
        body: ['\"Inter\"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: "0 0 25px rgba(45, 58, 155, 0.25)"
      },
      backgroundImage: {
        'hero-pattern': "linear-gradient(135deg, rgba(45,58,155,0.92), rgba(13,27,42,0.92)), url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80')",
        'newsletter-pattern': "linear-gradient(135deg, rgba(0,188,212,0.15), rgba(255,107,53,0.15))"
      }
    }
  },
  plugins: []
};
