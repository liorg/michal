import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DailyContent from '@/components/DailyContent';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { tips, meals, videos } from '@/lib/data';

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <Hero />
      <DailyContent tips={tips} meals={meals} videos={videos} />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
