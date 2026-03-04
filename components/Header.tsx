
import React, { useState, useEffect } from 'react';
import { Menu, X, Circle } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  onCtaClick: () => void;
  isPrivacyPage?: boolean;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onCtaClick, isPrivacyPage = false, onNavigateHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isPrivacyPage && onNavigateHome) {
      onNavigateHome();
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Преимущества', href: '#features' },
    { name: 'Локации', href: '#portfolio' },
    { name: 'Инвесторам', href: '#investment' },
    { name: 'Услуги', href: '#services' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-brand-main/90 backdrop-blur-md border-white/5 py-3 shadow-lg shadow-black/20' 
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
               e.preventDefault();
               if (onNavigateHome) onNavigateHome();
               else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 z-50"
          >
            <div className="text-2xl font-bold tracking-tight transition-colors text-white">
              South<span className="text-brand-blue">Invest</span>
            </div>
          </a>

          {/* Desktop Nav - Hide on Privacy Page */}
          {!isPrivacyPage && (
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium transition-colors text-slate-300 hover:text-white"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button onClick={onCtaClick} size="sm" variant={isScrolled ? 'white' : 'primary'}>
              Подобрать локацию
            </Button>
          </div>

          {/* Mobile Toggle Button - Visible only on mobile */}
          {!isPrivacyPage && (
            <button 
              className="md:hidden z-50 text-white w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <Menu size={24} />
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Sidebar & Overlay */}
      {!isPrivacyPage && (
        <div 
          className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
            isMobileMenuOpen ? 'visible' : 'invisible delay-300'
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-brand-main/80 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar Menu - Sliding from Right */}
          <div 
            className={`absolute right-0 top-0 h-full w-[280px] bg-brand-surface border-l border-white/5 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="text-xl font-bold text-white">
                South<span className="text-brand-blue">Invest</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links List */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue/20 transition-all duration-200"
                  >
                    <Circle size={8} className="text-slate-500 group-hover:text-white fill-current" />
                    <span className="font-medium text-base">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Sidebar Footer CTA */}
            <div className="p-6 border-t border-white/5 bg-brand-dark/30">
              <Button 
                onClick={() => {
                  onCtaClick();
                  setIsMobileMenuOpen(false);
                }} 
                fullWidth
                variant="white"
                className="shadow-xl"
              >
                Подобрать локацию
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
