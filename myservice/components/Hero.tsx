import React, { useState, useEffect } from 'react';
import AIContentEditor from './AIContentEditor';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  title: string;
  subtitle: string;
  backgrounds: string[];
  isGenerating?: boolean;
  isEditMode: boolean;
  onUpdate: (val: string) => void;
  onUpdateSubtitle: (val: string) => void;
  onNavigateContact: () => void;
  onNavigateGallery: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  backgrounds,
  isGenerating = false,
  isEditMode,
  onUpdate,
  onUpdateSubtitle,
  onNavigateContact,
  onNavigateGallery
}) => {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (backgrounds.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [backgrounds]);

  return (
    <section 
      className="relative h-[100vh] flex items-center overflow-hidden hero-pan"
      style={{
        backgroundImage: `url(/assets/services/jahre.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        transform: 'scaleX(-1)'
      }}
    >
      {/* Dark Overlay - 55% opacity */}
      <div className="absolute inset-0 bg-black/55 z-0"></div>

      {/* Alternative: Using multiple backgrounds with fallback */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((img, idx) => (
          <div
            key={`${img}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${idx === currentIdx ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
          </div>
        ))}

        {/* Dark Overlay on top of images */}
        <div className="absolute inset-0 bg-black/55 z-10"></div>

        {/* AI Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-700">
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(253,224,71,0.5)]"></div>
            <h4 className="text-white text-2xl font-bold serif tracking-widest animate-pulse">{t.editor.generatingAI}</h4>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mt-4">Meisterhafte Gartenmotive werden generiert</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full" style={{ transform: 'scaleX(-1)' }}>
        <div className="max-w-4xl">
          <div className="mb-4">
            {isEditMode ? (
              <AIContentEditor
                value={title}
                onSave={onUpdate}
                context="A bold, luxury headline for a high-end gardening brand."
                className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[1] serif tracking-tight drop-shadow-2xl"
              />
            ) : (
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[1] serif tracking-tight drop-shadow-2xl">
                {isEditMode ? title : t.hero.title}
              </h1>
            )}
          </div>

          <div className="mb-12 max-w-2xl">
            {isEditMode ? (
              <AIContentEditor
                value={subtitle}
                onSave={onUpdateSubtitle}
                context="A short, professional tagline with three keywords."
                className="text-xl md:text-2xl text-white/90 font-normal tracking-widest uppercase drop-shadow-md"
              />
            ) : (
              <p className="text-xl md:text-2xl text-white/90 font-normal tracking-widest uppercase drop-shadow-md">
                {isEditMode ? subtitle : t.hero.subtitle}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <button
              onClick={onNavigateContact}
              className="px-10 py-5 bg-yellow-400 text-[#1a2a22] rounded-full font-black text-lg hover:bg-yellow-300 transition-all shadow-[0_8px_20px_rgba(253,224,71,0.3)] hover:-translate-y-1 text-center uppercase tracking-widest border-2 border-yellow-500/30"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={onNavigateGallery}
              className="px-10 py-5 bg-white/20 backdrop-blur-xl text-white border-2 border-white/40 rounded-full font-bold text-lg hover:bg-white/30 transition-all text-center tracking-wide flex items-center justify-center gap-3 group shadow-2xl"
            >
              {t.hero.ctaSecondary}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-12 left-12 flex gap-3 z-30">
        {backgrounds.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentIdx ? 'w-12 bg-yellow-400 shadow-[0_0_10px_rgba(253,224,71,1)]' : 'w-4 bg-white/30'
              }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes panHorizontal {
          0% { background-position: left 20%; }
          50% { background-position: right 20%; }
          100% { background-position: left 20%; }
        }
        .hero-pan {
          animation: panHorizontal 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;