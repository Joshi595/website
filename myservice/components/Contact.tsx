
import React from 'react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactProps {
  onNavigate: () => void;
}

// joshi vardhan lella
const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <section id="kontakt" className="py-32 bg-[#1a2a22] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-24 items-center">
          <ScrollReveal direction="left" className="lg:col-span-3">
            <div>
              <div className="mb-10 flex items-center gap-4">
                <div className="h-[2px] w-12 bg-yellow-400"></div>
                <span className="text-yellow-400 font-bold tracking-[0.3em] uppercase text-xs">Let's Bloom</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold serif mb-10 leading-tight">Schneller Gartenservice in Erlangen/Dechsendorf und Umgebung</h2>
              <p className="text-xl text-[#f1f5f2]/60 font-light mb-12 leading-relaxed max-w-lg">
                Kontaktieren Sie uns für ein unverbindliches Erstgespräch. Gemeinsam planen wir die Verwandlung Ihres Außenbereichs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div>
                  <span className="text-yellow-400 block font-black uppercase text-[10px] tracking-widest mb-4">Besuchen Sie uns</span>
                  <p className="text-lg opacity-80 italic">Bischofsweiherstraße 14<br />91056 Erlangen, Germany</p>
                </div>
                <div>
                  <span className="text-yellow-400 block font-black uppercase text-[10px] tracking-widest mb-4">Rufen Sie an</span>
                  <p className="text-lg opacity-80">0176/54079960</p>
                  <p className="text-[#f1f5f2]/40 text-sm mt-1">E-Mail: gartensass@gmx.de</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200} className="lg:col-span-2">
            <div className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-3xl text-[#1a2a22] text-center">
              <div className="mb-10 text-6xl">✨</div>
              <h3 className="text-4xl font-bold serif mb-6">Starten Sie jetzt</h3>
              <p className="text-[#1a2a22]/40 mb-12 leading-relaxed">Klicken Sie unten, um zu unserer detaillierten Kontaktseite zu gelangen und Ihr Projekt zu besprechen.</p>
              <button
                onClick={onNavigate}
                className="w-full py-6 bg-[#1a2a22] text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#2b4036] transition-all shadow-2xl flex items-center justify-center gap-4 group"
              >
                {t.contact.cta}
                <div className="w-12 h-[2px] bg-yellow-400 group-hover:w-16 transition-all"></div>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
