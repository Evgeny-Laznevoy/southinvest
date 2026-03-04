import React from 'react';
// import { Instagram, Send } from 'lucide-react';

interface FooterProps {
  onPrivacyClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPrivacyClick }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
  };

  return (
    <footer className="bg-[#0b0c16] text-slate-400 pt-10 pb-8 md:pt-16 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Logo & Desc */}
          <div>
            <div className="text-2xl font-bold text-white mb-4">South<span className="text-brand-blue">Invest</span></div>
            <p className="text-sm leading-relaxed mb-6">
              Ваш надежный партнер на рынке курортной недвижимости юга России. Помогаем инвестировать выгодно и безопасно.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors">
                <Send size={20} />
              </a> */}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Навигация</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-blue transition-colors">Главная</a></li>
              <li><a href="#features" onClick={(e) => handleScroll(e, '#features')} className="hover:text-brand-blue transition-colors">Преимущества</a></li>
              <li><a href="#portfolio" onClick={(e) => handleScroll(e, '#portfolio')} className="hover:text-brand-blue transition-colors">Каталог</a></li>
              <li><a href="#investment" onClick={(e) => handleScroll(e, '#investment')} className="hover:text-brand-blue transition-colors">Инвесторам</a></li>
              <li><a href="#services" onClick={(e) => handleScroll(e, '#services')} className="hover:text-brand-blue transition-colors">Услуги</a></li>
            </ul>
          </div>

          {/* Regions (General) */}
          <div>
            <h4 className="text-white font-bold mb-6">Регионы работы</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>Крым (ЮБК, Западный берег)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>Сочи и Адлер</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>Анапа</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>Геленджик</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full"></span>Адыгея (Майкоп)</li>
            </ul>
          </div>

          {/* Presence Cities */}
          <div>
            <h4 className="text-white font-bold mb-6">Регионы присутствия</h4>
            <div className="space-y-5 text-sm">
              <div>
                <span className="block text-brand-blue font-semibold mb-2 text-xs uppercase tracking-wider">Крым</span>
                <p className="text-slate-400 leading-relaxed hover:text-white transition-colors">
                  Ялта, Алушта, Евпатория, Судак, Феодосия, Севастополь
                </p>
              </div>
              <div>
                <span className="block text-brand-blue font-semibold mb-2 text-xs uppercase tracking-wider">Краснодарский край</span>
                <p className="text-slate-400 leading-relaxed hover:text-white transition-colors">
                  Сочи, Анапа, Геленджик, Новороссийск, Туапсе
                </p>
              </div>
              <div>
                <span className="block text-brand-blue font-semibold mb-2 text-xs uppercase tracking-wider">Республика Адыгея</span>
                <p className="text-slate-400 leading-relaxed hover:text-white transition-colors">
                  Майкоп, Лаго-Наки
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SouthInvest Estate. Все права защищены.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" onClick={(e) => { e.preventDefault(); if(onPrivacyClick) onPrivacyClick(); }} className="hover:text-slate-300">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  );
};