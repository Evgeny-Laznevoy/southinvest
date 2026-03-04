import React from 'react';
import { PieChart, BarChart3, Wallet } from 'lucide-react';

export const InvestmentStats: React.FC = () => {
  return (
    <section id="investment" className="py-10 md:py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Выгода инвестиций</h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Недвижимость на юге — это актив, который работает на вас. Мы помогаем создать стратегию, сочетающую личное использование и получение дохода.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-surface p-3 rounded-lg shadow-sm border border-white/5 text-brand-teal">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Капитализация объекта</h4>
                  <p className="text-slate-400 mt-1">Рост стоимости актива на 20-40% за цикл строительства (1.5 - 2 года).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-surface p-3 rounded-lg shadow-sm border border-white/5 text-brand-blue">
                  <Wallet size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Пассивный доход</h4>
                  <p className="text-slate-400 mt-1">От 8% до 15% годовых от сдачи в аренду через управляющую компанию.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-surface p-3 rounded-lg shadow-sm border border-white/5 text-indigo-400">
                  <PieChart size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Ликвидность</h4>
                  <p className="text-slate-400 mt-1">Спрос на аренду в сезон превышает предложение в 3 раза.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-surface rounded-3xl p-6 md:p-8 shadow-2xl border border-white/5">
             <h3 className="text-xl font-bold mb-6 text-center text-white">Пример доходности апартамента</h3>
             
             <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 gap-2">
                  <span className="text-slate-400 text-sm md:text-base">Стоимость покупки</span>
                  {/* Applied blur effect to hide the specific price, but keep symbol visible */}
                  <div className="font-bold text-base md:text-lg text-white flex gap-1 whitespace-nowrap">
                    <span className="blur-[6px] select-none opacity-80 cursor-default" aria-hidden="true">0 000 000</span>
                    <span>₽</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4 gap-2">
                  <span className="text-slate-400 text-sm md:text-base">Рост цены за год (20%)</span>
                  <span className="font-bold text-green-400 text-sm md:text-base whitespace-nowrap">+ 1 700 000 ₽</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4 gap-2">
                  <span className="text-slate-400 text-sm md:text-base">Аренда (чистыми)</span>
                  <span className="font-bold text-brand-blue text-sm md:text-base whitespace-nowrap">+ 950 000 ₽</span>
                </div>
                <div className="pt-2">
                   <div className="flex justify-between items-center mb-2 gap-2">
                     <span className="text-base md:text-lg font-bold text-white">Итоговая выгода</span>
                     <span className="text-xl md:text-2xl font-extrabold text-brand-teal whitespace-nowrap">2 650 000 ₽</span>
                   </div>
                   <div className="w-full bg-slate-700/50 rounded-full h-2.5">
                      <div className="bg-brand-teal h-2.5 rounded-full" style={{ width: '31%' }}></div>
                   </div>
                   <p className="text-xs text-right text-slate-500 mt-2">ROI: 31% за первый год</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};