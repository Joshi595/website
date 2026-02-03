import React from 'react';
import ScrollReveal from './ScrollReveal';

const projects = [
  { 
    id: 1, 
    title: 'Neupflanzung & Gestaltung', 
    category: 'Gestaltung', 
    image: 'five' 
  },
  { 
    id: 2, 
    title: 'Professioneller Baumschnitt', 
    category: 'Baumpflege', 
    image: 'six' 
  },
  { 
    id: 3, 
    title: 'Terrassenreinigung', 
    category: 'Reinigung', 
    image: 'seven' 
  },
  { 
    id: 4, 
    title: 'Nachhaltige Beetpflege', 
    category: 'Pflege', 
    image: 'eight' 
  },
  { 
    id: 5, 
    title: 'Präziser Heckenschnitt', 
    category: 'Formschnitt', 
    image: 'nine' 
  },
  { 
    id: 6, 
    title: 'Fachgerechte Rasenpflege', 
    category: 'Wartung', 
    image: 'ten' 
  },
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 bg-[#f4f7f5]/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-20">
        <ScrollReveal>
          <span className="text-[#3c5a4d] font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Referenzen</span>
          <h2 className="text-5xl md:text-6xl font-bold text-[#1a2a22] serif">Unsere Projekte</h2>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((item, idx) => (
          <ScrollReveal key={item.id} delay={idx * 100} direction="up">
            <div className="group relative overflow-hidden rounded-[3rem] bg-white cursor-pointer aspect-square shadow-sm hover:shadow-2xl transition-all duration-500">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'eleven';
                }}
              />
              <div className="absolute inset-0 bg-[#1a2a22]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
                <span className="text-yellow-400 uppercase tracking-[0.2em] text-[10px] font-black mb-3">{item.category}</span>
                <h3 className="text-3xl font-bold text-white serif">{item.title}</h3>
                <div className="mt-6 w-12 h-1 bg-yellow-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;