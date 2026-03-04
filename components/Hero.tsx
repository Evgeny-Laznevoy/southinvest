import React from 'react';
import { Button } from './Button';
import { ArrowRight, MapPin } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const handleScrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/1050-1920x1080.jpg"
          alt="Панорамный вид на курортную недвижимость юга России: Крым, Сочи, Анапа"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center space-x-2 bg-brand-blue/20 backdrop-blur-sm border border-brand-blue/30 rounded-full px-4 py-1.5 text-sm font-medium text-sky-200">
            <MapPin size={16} />
            <span>Крым • Сочи • Анапа • Геленджик<span className="hidden md:inline"> • Адыгея</span></span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Курортная недвижимость юга России для <span className="text-brand-blue">отдыха</span> и <span className="text-brand-teal">инвестиций</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
            Подберем для вас лучшие локации с доходностью до 30% годовых или идеальный дом у моря для жизни.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Button onClick={onCtaClick} size="lg" className="group whitespace-nowrap shrink-0">
              Получить каталог
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button onClick={handleScrollToPortfolio} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:!text-brand-main hover:border-white whitespace-nowrap shrink-0">
              Смотреть локации
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold text-white">1500+</p>
              <p className="text-sm text-slate-400">Локаций в базе</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">12%</p>
              <p className="text-sm text-slate-400">Средний рост цены</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">7 лет</p>
              <p className="text-sm text-slate-400">Опыта на рынке</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};