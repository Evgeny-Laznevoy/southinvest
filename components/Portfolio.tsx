
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '../types';
import { Button } from './Button';

interface PortfolioProps {
  onCtaClick: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onCtaClick }) => {
  const [activeTab, setActiveTab] = useState('crimea');

  const tabs = [
    { id: 'crimea', label: 'Крым' },
    { id: 'sochi', label: 'Сочи' },
    // { id: 'anapa', label: 'Анапа' },
  ];

  const properties: PropertyCard[] = [
    // --- АНАПА ---
    {
      id: 'a1',
      title: 'ЛУЧИ',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
      location: 'Анапа',
      category: 'anapa',
      priceStart: '',
      yield: ''
    },
    {
      id: 'a2',
      title: 'HOTEL&SPA SUNGARDEN',
      image: 'https://images.unsplash.com/photo-1571896349842-6e547adc2660?auto=format&fit=crop&q=80&w=800',
      location: 'Анапа',
      category: 'anapa',
      priceStart: '',
      yield: ''
    },
    {
      id: 'a3',
      title: 'ГК "НИКОЛАЙ ПЕРВЫЙ"',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      location: 'Анапа',
      category: 'anapa',
      priceStart: '',
      yield: ''
    },
    {
      id: 'a4',
      title: 'КОМПЛЕКС РЕЗИДЕНЦИЙ "ГРАФ ТОЛСТОЙ"',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      location: 'Анапа',
      category: 'anapa',
      priceStart: '',
      yield: ''
    },
    {
      id: 'a5',
      title: 'ЖК "ХОЗЯИН МОРЕЙ"',
      image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=800',
      location: 'Анапа',
      category: 'anapa',
      priceStart: '',
      yield: ''
    },
    {
      id: 'a6',
      title: 'САН-ГАРДЕН',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
      location: 'Анапа',
      category: 'anapa',
      priceStart: '',
      yield: ''
    },

    // --- КРЫМ (ЛОКАЦИИ) ---
    {
      id: 'c1',
      title: 'ЯЛТА',
      image: '/assets/images/ялта-локация.jpg',
      location: 'Крым',
      category: 'crimea',
      priceStart: '',
      yield: ''
    },
    {
      id: 'c2',
      title: 'АЛУШТА',
      image: '/assets/images/алушта-локация.jpg',
      location: 'Крым',
      category: 'crimea',
      priceStart: '',
      yield: ''
    },
    {
      id: 'c3',
      title: 'ЕВПАТОРИЯ',
      image: '/assets/images/евпатория-локация.jpg',
      location: 'Крым',
      category: 'crimea',
      priceStart: '',
      yield: ''
    },
    {
      id: 'c4',
      title: 'ЮБК',
      image: '/assets/images/юбк.jpg',
      location: 'Крым',
      category: 'crimea',
      priceStart: '',
      yield: ''
    },

    // --- СОЧИ (ЛОКАЦИИ) ---
    {
      id: 's1',
      title: 'АДЛЕР',
      image: '/assets/images/адлер-локация.jpg',
      location: 'Сочи',
      category: 'sochi',
      priceStart: '',
      yield: ''
    },
    {
      id: 's2',
      title: 'БЫТХА',
      image: '/assets/images/бытха.jpg',
      location: 'Сочи',
      category: 'sochi',
      priceStart: '',
      yield: ''
    },
    {
      id: 's3',
      title: 'ХОСТА',
      image: '/assets/images/scale_1200.jpg',
      location: 'Сочи',
      category: 'sochi',
      priceStart: '',
      yield: ''
    },
    {
      id: 's4',
      title: 'ЦЕНТРАЛЬНЫЙ РАЙОН',
      image: '/assets/images/сочи.jpg',
      location: 'Сочи',
      category: 'sochi',
      priceStart: '',
      yield: ''
    },
    {
      id: 's5',
      title: 'ЛАЗАРЕВСКОЕ',
      image: '/assets/images/лазаревское.jpg',
      location: 'Сочи',
      category: 'sochi',
      priceStart: '',
      yield: ''
    },
  ];

  const filteredItems = properties.filter(item => item.category === activeTab);

  return (
    <section id="portfolio" className="py-10 md:py-20 bg-transparent text-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
           <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-8">
            Продаем лучшие комплексы<br />
            Сочи, Крыма, Анапы
          </h2>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-0 bg-white/5 p-1 rounded-2xl md:rounded-full inline-flex mx-auto border border-white/5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-3 rounded-xl md:rounded-full text-sm md:text-base font-medium transition-all duration-300
                  ${activeTab === tab.id 
                    ? 'bg-brand-blue text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.5s_ease-out]">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-white/5 shadow-lg bg-brand-surface"
              onClick={onCtaClick}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={`Объект недвижимости ${item.title} в локации ${item.location}`} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800';
                }}
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-main via-brand-main/50 to-transparent opacity-90"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-center">
                <h3 className="text-xl font-bold uppercase text-white mb-2 drop-shadow-lg">{item.title}</h3>
                
                {item.priceStart ? (
                  <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="pt-2 text-sm text-sky-200">
                      <p className="mb-1">{item.priceStart}</p>
                      <p className="text-xs text-slate-300">Доходность {item.yield}</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <div className="pt-2 text-xs text-brand-blue font-medium uppercase tracking-wider">
                      Смотреть объекты в этой локации
                    </div>
                  </div>
                )}
              </div>

               <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-blue/50 rounded-xl transition-colors pointer-events-none"></div>
            </div>
          ))}

          {filteredItems.length === 0 && (
             <div className="col-span-full py-12 text-center text-slate-500 bg-brand-surface/50 rounded-xl border border-dashed border-slate-700">
                <p>В данном разделе пока нет локаций для отображения.</p>
                <Button onClick={onCtaClick} variant="outline" className="mt-4">Оставить заявку на подбор</Button>
             </div>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-8 md:mt-12 text-center">
           <Button onClick={onCtaClick} variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:border-brand-blue hover:text-white">
             Получить полный каталог {tabs.find(t => t.id === activeTab)?.label}
             <ArrowRight className="ml-2 w-5 h-5" />
           </Button>
        </div>

      </div>
    </section>
  );
};
