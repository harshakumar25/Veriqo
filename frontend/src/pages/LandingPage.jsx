import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Sectors from '../components/Sectors';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { RevealOnScroll } from '../components/motion/RevealOnScroll';

export default function LandingPage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState('ENTREPRENEUR');
  const [currentLang, setCurrentLang] = useState('en');

  const handleOpenAuth = (role = 'ENTREPRENEUR') => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
      <Navbar
        onOpenAuth={handleOpenAuth}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />
      <main>
        <HeroSection
          onOpenAuth={handleOpenAuth}
          currentLang={currentLang}
        />
        <RevealOnScroll>
          <HowItWorks />
        </RevealOnScroll>
        <RevealOnScroll>
          <Features />
        </RevealOnScroll>
        <RevealOnScroll>
          <Sectors />
        </RevealOnScroll>
        <RevealOnScroll>
          <CTASection onOpenAuth={handleOpenAuth} />
        </RevealOnScroll>
      </main>
      <Footer onOpenAuth={handleOpenAuth} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authRole}
      />
    </div>
  );
}
