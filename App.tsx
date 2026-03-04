
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Portfolio } from './components/Portfolio';
import { InvestmentStats } from './components/InvestmentStats';
import { Services } from './components/Services';
import { LeadFormSection } from './components/LeadFormSection';
import { Footer } from './components/Footer';
import { Modal } from './components/Modal';
import { PrivacyPolicy } from './components/PrivacyPolicy';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Скачать подборку локаций');
  const [currentView, setCurrentView] = useState<'home' | 'privacy'>('home');

  const openModal = (title?: string | any) => {
    // If title is a string, use it. Otherwise (e.g. event object), use default.
    setModalTitle(typeof title === 'string' ? title : 'Скачать подборку локаций');
    setIsModalOpen(true);
  };
  
  const closeModal = () => setIsModalOpen(false);

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleNavigatePrivacy = () => {
    setCurrentView('privacy');
    setIsModalOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen">
      {currentView === 'home' ? (
        <>
          {/* 1. Header (Navigation) */}
          <Header onCtaClick={openModal} onNavigateHome={handleNavigateHome} />

          <main>
            {/* 2. Hero Section */}
            <Hero onCtaClick={openModal} />

            {/* 3. Why Choose Us */}
            <Features />

            {/* 4. Selection of Favorable Conditions (Portfolio) */}
            <Portfolio onCtaClick={openModal} />

            {/* 5. Investment Benefits */}
            <InvestmentStats />

            {/* 6. Our Services */}
            <Services />

            {/* 7. Call to Action (Lead Gen) */}
            <LeadFormSection onOpenModal={openModal} />
          </main>

          {/* Footer */}
          <Footer onPrivacyClick={handleNavigatePrivacy} />
        </>
      ) : (
        <>
          <Header onCtaClick={openModal} isPrivacyPage={true} onNavigateHome={handleNavigateHome} />
          <PrivacyPolicy onBack={handleNavigateHome} />
          <Footer onPrivacyClick={handleNavigatePrivacy} />
        </>
      )}

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalTitle}
        onPrivacyClick={handleNavigatePrivacy}
      />
    </div>
  );
}

export default App;
