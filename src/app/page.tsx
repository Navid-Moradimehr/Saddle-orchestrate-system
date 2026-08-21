'use client';
import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/theme-context';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/layout/Footer';

// Keep the first meaningful content in the server-rendered HTML. Each section
// remains code-split, while only browser-only islands opt out of SSR.
const HeroSection = dynamic(() => import('@/components/hero/HeroSection'));
const IntroSection = dynamic(() => import('@/components/layout/IntroSection'));
const ServicesSection = dynamic(() => import('@/components/services/ServicesSection'));
const WorkflowSection = dynamic(() => import('@/components/workflow/WorkflowSection'));
const LaboratorySection = dynamic(() => import('@/components/laboratory/LaboratorySection'));
const AboutSection = dynamic(() => import('@/components/layout/AboutSection'));
const ContactSection = dynamic(() => import('@/components/contact/ContactSection'));
// These two islands depend on timers/pointer APIs and should not expose
// server-only fallback controls before hydration attaches their handlers.
const ChatbotMascot = dynamic(() => import('@/components/chatbot/ChatbotMascot'), { ssr: false });
const PullChainToggle = dynamic(() => import('@/components/theme/PullChainToggle'), { ssr: false });
const ModeSelector = dynamic(() => import('@/components/theme/ModeSelector'));

export default function HomePage() {
  const { visualMode } = useTheme();

  const modeClasses = {
    human: 'bg-cream dark:bg-charcoal',
    system: 'bg-cream dark:bg-charcoal',
    combined: 'bg-cream dark:bg-charcoal',
  };

  return (
    <div data-visual-mode={visualMode} className={`min-h-screen transition-colors duration-500 ${modeClasses[visualMode]}`}>
      <Navbar />
      <PullChainToggle />
      <main id="main-content">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-orange focus:px-4 focus:py-3 focus:text-charcoal">Skip to content</a>
        <HeroSection />
        <IntroSection />
        <ModeSelector />
        <ServicesSection />
        <WorkflowSection />
        <LaboratorySection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotMascot />
    </div>
  );
}
