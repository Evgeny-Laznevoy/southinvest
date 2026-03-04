import React from 'react';
import { Key, FileSignature, Briefcase, RefreshCcw, Percent } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      icon: Briefcase,
      title: "Подбор недвижимости",
      description: "Анализируем рынок, отбираем ликвидные объекты под ваши цели и бюджет."
    },
    {
      icon: FileSignature,
      title: "Юридическое оформление",
      description: "Проверяем чистоту сделки, готовим документы, регистрируем право собственности."
    },
    {
      icon: RefreshCcw,
      title: "Перепродажа",
      description: "Поможем реализовать актив на пике стоимости для фиксации максимальной прибыли."
    },
    {
      icon: Key,
      title: "Доверительное управление",
      description: "Организуем сдачу в аренду: поиск жильцов, клининг, ремонт, финансовые отчеты."
    },
    {
      icon: Percent,
      title: "Выгодная ипотека",
      description: "Поможем получить одобрение по ставкам от 3%. Работаем с семейной ипотекой и рассрочкой от застройщика."
    }
  ];

  return (
    <section id="services" className="py-10 md:py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase leading-tight mb-6">Наши услуги</h2>
          <p className="text-slate-400 mt-4 text-lg">Комплексный подход к вашим инвестициям</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {services.map((service, idx) => (
             <div 
              key={idx} 
              className="bg-brand-surface p-8 rounded-2xl border border-white/5 shadow-lg hover:bg-[#232742] hover:border-brand-blue/30 transition-all duration-300 group h-full"
             >
                <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
                   <service.icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};