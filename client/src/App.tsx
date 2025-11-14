import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Industries from './sections/Industries';
import ShopShowcase from './sections/ShopShowcase';
import Tips from './sections/Tips';
import OfficialService from './sections/OfficialService';
import Newsletter from './sections/Newsletter';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App = (): JSX.Element => (
  <div className="min-h-screen bg-midnight text-soft-white">
    <Navigation />
    <main className="flex flex-col pt-24">
      <Hero />
      <Services />
      <Industries />
      <ShopShowcase />
      <Tips />
      <OfficialService />
      <Newsletter />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default App;
