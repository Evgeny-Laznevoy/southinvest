import React from 'react';
import { ShieldCheck, TrendingUp, Search, Headphones } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Гарантии по ФЗ-214",
      description: "Все объекты реализуются через эскроу-счета согласно ФЗ-214. Ваши средства замораживаются в банке до полной сдачи дома."
    },
    {
      icon: TrendingUp,
      title: "Высокая доходность",
      description: "Предлагаем объекты с потенциалом роста цены от 25% и пассивным доходом от сдачи в аренду."
    },
    {
      icon: Search,
      title: "Эксклюзивный подбор",
      description: "Доступ к закрытым продажам и предстартовым ценам в лучших ЖК побережья."
    },
    {
      icon: Headphones,
      title: "Сервис 24/7",
      description: "Персональный менеджер всегда на связи. Помогаем даже после покупки."
    }
  ];

  return (
    <section id="features" className="py-10 md:py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase leading-tight mb-6">Почему выбирают нас</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">Мы не просто продаем квадратные метры, мы предлагаем готовые инвестиционные решения и качество жизни.</p>
          
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-green-400 text-sm font-medium animate-[fadeIn_0.5s_ease-out]">
             <ShieldCheck size={16} className="hidden md:block" />
             <span>Работаем только с объектами по ФЗ-214 (Эскроу-счета)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-brand-surface rounded-2xl hover:bg-[#232742] transition-colors duration-300 border border-white/5 group hover:border-brand-blue/30">
              <div className="w-14 h-14 bg-brand-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue transition-colors">
                <feature.icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};