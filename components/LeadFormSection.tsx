
import React, { useState } from 'react';
import { Button } from './Button';

interface LeadFormSectionProps {
  onOpenModal: (title: string) => void;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ onOpenModal }) => {
  return (
    <section className="py-12 md:py-24 relative overflow-hidden bg-slate-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/images/apartments.jpg" 
          onError={(e) => {
            // Fallback if image is missing or name is incorrect
            e.currentTarget.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
          }}
          alt="Современные апартаменты у моря в Крыму и Краснодарском крае" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Decorative accent */}
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-teal rounded-full blur-3xl opacity-20 mix-blend-screen z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold uppercase leading-tight mb-6 drop-shadow-md">
          Составим персональную подборку
        </h2>
        <p className="text-xl text-sky-100 max-w-2xl mx-auto mb-10 drop-shadow-sm">
          Получите ТОП-10 инвестиционных локаций Крыма и Краснодарского края с расчетом доходности на вашу почту или в мессенджер.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => onOpenModal('Скачать подборку')} variant="white" size="lg" className="shadow-xl">
            Скачать подборку
          </Button>
          <Button 
            onClick={() => onOpenModal('Получить консультацию')} 
            variant="outline" 
            size="lg" 
            className="border-sky-200 text-sky-100 hover:bg-white hover:!text-brand-main hover:border-transparent transition-colors"
          >
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};
