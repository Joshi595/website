
import React, { useRef, useEffect, useState } from 'react';
import { Service } from '../types';
import AIContentEditor from './AIContentEditor';
import ScrollReveal from './ScrollReveal';
import { generateServiceImage } from '../services/gemini';

const ParallaxImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const centerOffset = (rect.top + rect.height / 2) / windowHeight - 0.5;
      setOffset(centerOffset * 40); 
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleError = () => {
    // Fallback: show placeholder with nature emoji
    setImgSrc('');
  };

  if (!imgSrc) {
    return <div className="w-full h-full bg-gradient-to-br from-[#f4f7f5] to-[#e8efea] flex items-center justify-center text-[#8b9a8f] text-6xl" role="img" aria-label="Bild nicht verfügbar">🌿</div>;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <img 
        src={imgSrc} 
        alt={alt} 
        onError={handleError}
        style={{ transform: `scale(1.2) translateY(${offset}px)` }}
        className="w-full h-full object-cover transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </div>
  );
};

interface ServicesProps {
  services: Service[];
  isEditMode: boolean;
  onUpdate: (services: Service[]) => void;
}

const Services: React.FC<ServicesProps> = ({ services, isEditMode, onUpdate }) => {
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>({});

  const handleUpdateService = (index: number, field: keyof Service, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    onUpdate(newServices);
  };

  const handleGenerateImage = async (index: number, serviceTitle: string) => {
    const serviceId = services[index].id;
    setLoadingImages(prev => ({ ...prev, [serviceId]: true }));
    
    try {
      const imageUrl = await generateServiceImage(serviceTitle);
      handleUpdateService(index, 'image', imageUrl);
    } catch (error) {
      console.error("Image generation failed:", error);
      alert("Bildgenerierung fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setLoadingImages(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  return (
    <section id="leistungen" className="py-32 bg-gradient-to-br from-[#fdfdfc] via-blue-50/30 to-emerald-50/40 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-yellow-100/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-emerald-200/30 to-cyan-100/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-pink-100/20 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-yellow-50 rounded-full border border-yellow-200">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span className="text-yellow-700 font-bold text-[10px] tracking-widest uppercase">Unsere Expertise</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-[#1a2a22] serif leading-tight bg-gradient-to-r from-[#1a2a22] to-emerald-700 bg-clip-text text-transparent">
                Handwerk trifft Magie ✨
              </h2>
            </div>
            <div className="lg:w-1/3">
               <p className="text-[#1a2a22]/60 leading-relaxed font-light text-lg mb-8">
                 Wir bieten umfassende Lösungen für Ihren Außenbereich – von der kreativen Neugestaltung bis zur nachhaltigen Pflege.
               </p>
               <div className="inline-flex items-center gap-4 p-5 bg-gradient-to-r from-yellow-50 to-yellow-100/50 text-[#1a2a22] rounded-2xl shadow-lg border border-yellow-200/60 group cursor-default hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center text-[#1a2a22] font-black text-xl transition-all group-hover:scale-110 group-hover:rotate-3 shadow-lg">28€</div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-yellow-700">Transparente Preise</div>
                    <div className="text-sm font-medium text-[#1a2a22]/70">Faire Stundensätze für alle</div>
                  </div>
               </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, idx) => {
            const isLoading = loadingImages[service.id];
            
            return (
              <ScrollReveal key={service.id} delay={idx * 150} direction="up" className="h-full">
                <div className="group flex flex-col h-full bg-white p-2 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#f4f7f5] hover:border-yellow-200/50 relative hover:-translate-y-3 hover:scale-105 overflow-hidden">
                  {/* Subtle background glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-200/0 via-yellow-100/10 to-emerald-100/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div className="overflow-hidden rounded-[2.2rem] mb-10 aspect-[4/5] relative bg-gradient-to-br from-[#f4f7f5] to-emerald-50/50">
                    {isLoading ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a2a22]/20 to-[#1a2a22]/40 backdrop-blur-sm z-20">
                         <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4 shadow-lg"></div>
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white animate-pulse">Generiere Meisterwerk</span>
                      </div>
                    ) : (
                      <ParallaxImage src={service.image} alt={service.title} />
                    )}
                    
                    {isEditMode && !isLoading && (
                      <button 
                        onClick={() => handleGenerateImage(idx, service.title)}
                        className="absolute bottom-6 right-6 px-4 py-2 bg-gradient-to-r from-[#1a2a22] to-[#2b4036] text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl hover:shadow-xl transition-all z-30 flex items-center gap-2 border border-white/10 group/btn hover:scale-110"
                      >
                         <span className="group-hover/btn:animate-spin">✨</span> AI Bild
                      </button>
                    )}

                    {!isEditMode && service.image && (
                      <div className="absolute bottom-6 left-6 px-4 py-2 bg-gradient-to-r from-[#1a2a22]/90 to-[#2b4036]/90 backdrop-blur-md rounded-full text-white text-[9px] font-black uppercase tracking-widest border border-yellow-400/30 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg">
                         <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                         Premium Referenzen
                      </div>
                    )}

                    <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl shadow-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 group-hover:shadow-yellow-400/50">
                      {service.icon}
                    </div>
                  </div>
                  
                  <div className="px-8 py-10 flex-grow flex flex-col justify-center items-center text-center relative z-10">
                    {isEditMode ? (
                      <AIContentEditor 
                        value={service.title} 
                        onSave={(val) => handleUpdateService(idx, 'title', val)}
                        context="Service title for a luxury gardening brand."
                        className="text-2xl font-bold text-[#1a2a22] serif"
                      />
                    ) : (
                      <h3 className="text-2xl font-bold text-[#1a2a22] serif group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-yellow-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all duration-300">{service.title}</h3>
                    )}
                    <p className="text-[#1a2a22]/60 text-sm mt-4 group-hover:text-[#1a2a22] transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-24 p-12 md:p-16 bg-gradient-to-r from-yellow-50/80 via-emerald-50/40 to-yellow-50/80 backdrop-blur-sm rounded-[4rem] border border-yellow-100/60 flex flex-col md:flex-row items-center justify-between gap-12 group hover:bg-gradient-to-r hover:from-yellow-100/90 hover:via-emerald-50/60 hover:to-yellow-100/90 transition-all duration-700 shadow-lg hover:shadow-2xl">
            <div className="max-w-xl text-center md:text-left relative z-10">
              <h4 className="text-3xl md:text-4xl font-bold text-[#1a2a22] serif mb-6 group-hover:translate-x-2 transition-transform duration-500">
                🎯 Transparente Preise
              </h4>
              <p className="text-[#1a2a22]/60 text-lg leading-relaxed font-light">
                Bei Mein Gärtla gibt es keine versteckten Kosten. Wir berechnen für alle handwerklichen Leistungen einen fairen Stundensatz – <span className="font-semibold text-emerald-700">immer ehrlich, immer fair.</span>
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-10 rounded-[3rem] shadow-2xl shadow-yellow-200/50 group-hover:scale-110 transition-all duration-500 border border-yellow-100 relative z-10">
              <span className="text-6xl font-black text-transparent bg-gradient-to-r from-yellow-600 to-emerald-600 bg-clip-text serif flex items-baseline gap-2">
                28€ 
                <span className="text-xl font-light serif text-emerald-600/80 italic">/ Std.</span>
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Services;
