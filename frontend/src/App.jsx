
import Header from './components/Header';
import Hero from './components/Hero';
import IntelligenceLayer from './components/IntelligenceLayer';
import Architecture from './components/Architecture';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Header />
      <main className="relative">
        <Hero />
        <IntelligenceLayer />
        <Architecture />
      </main>
      <Footer />
    </div>
  );
}

export default App;
