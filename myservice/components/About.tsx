
import React from 'react';
import AIContentEditor from './AIContentEditor';
import ScrollReveal from './ScrollReveal';

interface AboutProps {
  title: string;
  isEditMode: boolean;
  onUpdateTitle: (val: string) => void;
}

const About: React.FC<AboutProps> = ({ title, isEditMode, onUpdateTitle }) => {
  return (
    <section id="überuns" className="py-32 bg-gradient-to-r from-[#1a2a22] via-emerald-900/20 to-[#1a2a22] relative overflow-hidden">
      {/* Modern gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-300/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-300/10 to-cyan-200/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2">
            <ScrollReveal direction="left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 to-emerald-400/30 rounded-[4rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="rounded-[4rem] overflow-hidden shadow-2xl border-[1rem] border-gradient-to-br from-emerald-300/30 to-yellow-300/30 group-hover:border-yellow-300/60 transition-all duration-500 relative">
                  <img
                    src="/assets/services/jahre.jpeg"
                    alt="Professionelle Gartenarbeit"
                    className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: 'center 25%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a22]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-gradient-to-br from-yellow-400 to-yellow-500 p-8 rounded-[3rem] shadow-2xl flex flex-col justify-center items-center text-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-yellow-300/50">
                  <span className="text-6xl font-black text-[#1a2a22]">6+</span>
                  <span className="text-[#1a2a22]/70 uppercase font-black text-[11px] tracking-widest leading-tight mt-2">Jahre<br />Erfahrung</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:w-1/2">
            <ScrollReveal direction="up" delay={200}>
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-yellow-400/20 backdrop-blur-md rounded-full border border-yellow-400/40">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-yellow-300 font-bold text-[10px] tracking-widest uppercase">Unsere Philosophie</span>
              </div>

              <div className="mb-10">
                {isEditMode ? (
                  <AIContentEditor
                    value={title}
                    onSave={onUpdateTitle}
                    context="About us title for a high-end garden designer."
                    className="text-5xl md:text-6xl font-bold text-white serif leading-tight"
                  />
                ) : (
                  <h3 className="text-5xl md:text-6xl font-bold text-white serif leading-tight bg-gradient-to-r from-white via-yellow-100 to-emerald-200 bg-clip-text text-transparent">
                    {title}
                  </h3>
                )}
              </div>

              <div className="mb-12">
                <p className="text-2xl text-white/90 leading-relaxed font-light">
                  Seit über <span className="text-yellow-300 font-semibold">6 Jahren</span> erschaffen wir mit <span className="text-emerald-300 font-semibold">Leidenschaft & Präzision</span> Gärten, die Ihre Vision wirklich werden lassen. 🌿
                </p>
              </div>

              <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-transparent hover:from-yellow-400/20 transition-all duration-500 border border-yellow-400/20 hover:border-yellow-400/40">
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 mb-4 group-hover:w-16 transition-all"></div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-3">✨ Ästhetik</h4>
                  <p className="text-white/60 text-base group-hover:text-white/80 transition-colors">Harmonische Designs für Ihre Traumarchitektur.</p>
                </div>
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-transparent hover:from-emerald-400/20 transition-all duration-500 border border-emerald-400/20 hover:border-emerald-400/40">
                  <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-cyan-300 mb-4 group-hover:w-16 transition-all"></div>
                  <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-3">🌍 Nachhaltigkeit</h4>
                  <p className="text-white/60 text-base group-hover:text-white/80 transition-colors">Respekt vor der Natur in jedem Projekt.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;