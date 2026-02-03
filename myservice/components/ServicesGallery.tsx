import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { generateServiceDetails } from '../services/gemini';

interface ServicesGalleryProps {
  services: Service[];
  onBack: () => void;
  onContact: () => void;
}

const ServicesGallery: React.FC<ServicesGalleryProps> = ({ services, onBack, onContact }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [localServices, setLocalServices] = useState<Service[]>(services);

  const handleOpenDetail = async (service: Service) => {
    if (service.detailedDescription && service.benefits) {
      setSelectedService(service);
      return;
    }

    setSelectedService(service);
    setIsGenerating(true);
    
    try {
      const details = await generateServiceDetails(service.title);
      const updatedService = { ...service, ...details };
      
      setLocalServices(prev => 
        prev.map(s => s.id === service.id ? updatedService : s)
      );
      
      setSelectedService(updatedService);
    } catch (error) {
      console.error("Failed to generate details:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedService(null);
    setIsGenerating(false);
  };

  return (
    <div className="bg-[#1a2a22] min-h-screen pt-32 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="mb-20">
          <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-3 text-yellow-400 font-black uppercase text-[10px] tracking-widest group"
          >
            <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            Zurück zur Startseite
          </button>
          
          <h2 className="text-5xl md:text-8xl font-bold text-white serif mb-6">Unser <span className="text-yellow-400">Leistungskatalog</span></h2>
          <p className="text-xl text-[#f1f5f2]/60 font-light max-w-2xl leading-relaxed">
            Tauchen Sie ein in unsere Welt der Gartenpflege. Jedes Icon steht für höchste Qualität und Liebe zum Detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {localServices.map((service, index) => (
            <div 
              key={service.id} 
              onClick={() => handleOpenDetail(service)}
              className="group cursor-pointer bg-[#2b4036]/30 rounded-[4rem] overflow-hidden border border-white/5 flex flex-col md:row shadow-2xl hover:border-yellow-400/30 transition-all duration-500"
            >
              <div className="w-full aspect-video md:aspect-square relative overflow-hidden bg-[#1a2a22]/40">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-[#2b4036]/20" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a22]/60 to-transparent"></div>
                <div className="absolute top-6 left-6 w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-xl shadow-lg">
                  {service.icon}
                </div>
              </div>
              
              <div className="w-full p-12 flex flex-col justify-center">
                <span className="text-yellow-400/40 font-black uppercase text-[9px] tracking-[0.3em] mb-4 block">Service 0{index + 1}</span>
                <h3 className="text-3xl font-bold text-white serif mb-6">{service.title}</h3>
                <p className="text-[#f1f5f2]/50 leading-relaxed font-light mb-8 line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center gap-3">
                   <div className="h-[2px] w-8 bg-yellow-400 group-hover:w-12 transition-all"></div>
                   <span className="text-white font-bold text-[10px] uppercase tracking-widest">Detail-Ansicht</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center p-20 bg-yellow-400 rounded-[5rem] text-[#1a2a22]">
           <h4 className="text-4xl md:text-6xl font-bold serif mb-8">Haben Sie ein spezielles Anliegen?</h4>
           <p className="text-[#1a2a22]/60 text-xl max-w-xl mx-auto mb-12">Wir bieten auch individuelle Lösungen an, die über unseren Standardkatalog hinausgehen.</p>
           <button 
             onClick={onContact}
             className="px-12 py-6 bg-[#1a2a22] text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-3xl"
           >
             Jetzt Beraten Lassen
           </button>
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-[#1a2a22]/95 backdrop-blur-2xl"
            onClick={handleCloseDetail}
          ></div>
          
          <div className="relative w-full max-w-7xl bg-white rounded-[4rem] overflow-hidden shadow-6xl flex flex-col lg:flex-row h-full lg:h-auto max-h-[90vh] animate-in slide-in-from-bottom-12 duration-500">
            <div className="w-full lg:w-1/2 h-64 lg:h-auto relative bg-[#f4f7f5]">
              {selectedService.image ? (
                <img 
                  src={selectedService.image} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#f4f7f5]/30" />
              )}
              <div className="absolute inset-0 bg-[#1a2a22]/20"></div>
              <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center text-4xl shadow-2xl">
                {selectedService.icon}
              </div>
              <button 
                onClick={handleCloseDetail}
                className="lg:hidden absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full text-white text-2xl"
              >✕</button>
            </div>

            <div className="w-full lg:w-1/2 p-10 lg:p-20 overflow-y-auto">
              <button 
                onClick={handleCloseDetail}
                className="hidden lg:flex absolute top-10 right-10 w-14 h-14 bg-[#f4f7f5] rounded-full items-center justify-center text-[#1a2a22] hover:bg-yellow-400 transition-colors shadow-sm"
              >
                <span className="text-2xl">✕</span>
              </button>

              {isGenerating ? (
                <div className="space-y-12 animate-pulse">
                  <div className="h-4 w-24 bg-[#f4f7f5] rounded"></div>
                  <div className="h-20 w-3/4 bg-[#f4f7f5] rounded-3xl"></div>
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-[#f4f7f5] rounded"></div>
                    <div className="h-4 w-full bg-[#f4f7f5] rounded"></div>
                    <div className="h-4 w-2/3 bg-[#f4f7f5] rounded"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-12 bg-[#f4f7f5] rounded-2xl"></div>
                    <div className="h-12 bg-[#f4f7f5] rounded-2xl"></div>
                  </div>
                  <p className="text-[#1a2a22]/30 text-xs font-black uppercase tracking-widest text-center mt-20">
                    ✨ Gemini generiert exklusive Details...
                  </p>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                  <span className="text-[#1a2a22]/40 font-black uppercase text-[10px] tracking-[0.4em] mb-6 block">Detailierte Analyse</span>
                  <h3 className="text-5xl lg:text-7xl font-bold text-[#1a2a22] serif mb-10 leading-tight">
                    {selectedService.title}
                  </h3>
                  
                  <div className="prose prose-emerald mb-12">
                    <p className="text-xl text-[#1a2a22]/70 leading-relaxed font-light whitespace-pre-line">
                      {selectedService.detailedDescription || selectedService.description}
                    </p>
                  </div>

                  {selectedService.benefits && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-[#f4f7f5]">
                      {selectedService.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f4f7f5]/50 border border-[#e8efea]/50">
                          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-black shrink-0">✓</div>
                          <span className="text-sm font-bold text-[#1a2a22] tracking-tight">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-16">
                    <button 
                      onClick={onContact}
                      className="w-full py-6 bg-[#1a2a22] text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#2b4036] transition-all shadow-2xl flex items-center justify-center gap-4 group"
                    >
                      Jetzt unverbindlich anfragen
                      <div className="w-12 h-[2px] bg-yellow-400 group-hover:w-16 transition-all"></div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesGallery;