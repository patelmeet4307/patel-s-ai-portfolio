import NeuralBackground from '@/components/NeuralBackground';
import CursorGlow from '@/components/CursorGlow';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Stats from '@/components/Stats';
import CareerGoals from '@/components/CareerGoals';
import Education from '@/components/Education';
import DailyActivity from '@/components/DailyActivity';
import Projects from '@/components/Projects';
import Achievements from '@/components/Achievements';
import Skills from '@/components/Skills';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background Effects */}
      <NeuralBackground />
      <CursorGlow />
      <div className="neural-bg" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Stats />
        <CareerGoals />
        <Education />
        <DailyActivity />
        <Projects />
        <Achievements />
        <Skills />
        <CTA />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
