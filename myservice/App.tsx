import React, { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ContactPage from './components/ContactPage';
import ServicesGallery from './components/ServicesGallery';
import Footer from './components/Footer';
import { SiteContent, Service } from './types';
import { generateServiceImage, generateHeroBackgrounds } from './services/gemini';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const INITIAL_CONTENT: SiteContent = {
  heroTitle: "Gartenservice & Pflege",
  heroSubtitle: "Zuverlässig, Sauber, Fachgerecht.",
  heroBackgrounds: [
    'one',
    'two'
  ],
  aboutTitle: "Tradition trifft auf moderne Gartenkunst",
  services: [
    {
      id: "1",
      title: "Rasen-Service",
      description: "Ordentliches Mähen (auf Wunsch inklusive Abtransport).",
      icon: "🚜",
      image: 'assets/services/rasenn.png'
    },
    {
      id: "2",
      title: "Heckenschnitt",
      description: "Form- und Rückschnitt für eine gepflegte Optik",
      icon: "✂️",
      image: 'assets/services/heckeschnitt.jpeg'
    },
    {
      id: "3",
      title: "Unkrautentfernung",
      description: " Gründliche Säuberung von Beeten, Wegen und Fugen.",
      icon: "🌱",
      image: 'assets/services/Unkraut.jpeg'
    },
    {
      id: "4",
      title: "Saubere Außenanlagen",
      description: "Laubentfernung und Kehrdienst für Wege & Zufahrten.",
      icon: "🍂",
      image: 'assets/services/saubere.jpeg'
    },
    {
      id: "5",
      title: "Winterdienst",
      description: "Zuverlässige Schneebeseitigung (Gehwege, Einfahrten).",
      icon: "♻️",
      image: 'assets/services/winter.jpeg'
    }
  ]
};

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [isGeneratingBg, setIsGeneratingBg] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'contact' | 'gallery'>('home');

  React.useEffect(() => {
    (window as any).toggleEdit = () => setIsEditMode(prev => !prev);
  }, []);

  const navigateTo = useCallback((view: 'home' | 'contact' | 'gallery', id?: string) => {
    setCurrentView(view);
    if (id) {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, view === currentView ? 0 : 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentView]);

  const updateContent = useCallback((field: keyof SiteContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleGenerateAllImages = async () => {
    if (!confirm(t.editor.confirmImages)) return;
    setIsGeneratingAll(true);
    const updatedServices = [...content.services];
    try {
      for (let i = 0; i < updatedServices.length; i++) {
        const imageUrl = await generateServiceImage(updatedServices[i].title);
        updatedServices[i] = { ...updatedServices[i], image: imageUrl };
        updateContent('services', [...updatedServices]);
      }
    } catch (error) {
      alert(t.editor.batchFailed);
    } finally {
      setIsGeneratingAll(false);
    }
  };

  const handleGenerateBackgrounds = async () => {
    if (!confirm(t.editor.confirmBg)) return;
    setIsGeneratingBg(true);
    try {
      const newBgs = await generateHeroBackgrounds();
      if (newBgs.length > 0) updateContent('heroBackgrounds', newBgs);
    } catch (error) {
      alert(t.editor.bgFailed);
    } finally {
      setIsGeneratingBg(false);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-yellow-200 selection:text-[#1a2a22] bg-white">
      <Navbar onNavigate={navigateTo} currentView={currentView} />

      <main className="transition-opacity duration-500">
        {currentView === 'home' && (
          <>
            <Hero
              title={content.heroTitle}
              subtitle={content.heroSubtitle}
              backgrounds={content.heroBackgrounds}
              isGenerating={isGeneratingBg}
              isEditMode={isEditMode}
              onUpdate={(v) => updateContent('heroTitle', v)}
              onUpdateSubtitle={(v) => updateContent('heroSubtitle', v)}
              onNavigateContact={() => navigateTo('contact')}
              onNavigateGallery={() => navigateTo('gallery')}
            />
            <About
              title={content.aboutTitle}
              isEditMode={isEditMode}
              onUpdateTitle={(v) => updateContent('aboutTitle', v)}
            />
            <Services services={content.services} isEditMode={isEditMode} onUpdate={(v) => updateContent('services', v)} />
            <Contact onNavigate={() => navigateTo('contact')} />
          </>
        )}
        {currentView === 'contact' && <ContactPage />}
        {currentView === 'gallery' && (
          <ServicesGallery
            services={content.services}
            onBack={() => navigateTo('home')}
            onContact={() => navigateTo('contact')}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Floating Action Center */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <button
          onClick={() => navigateTo('contact')}
          aria-label={t.contact.cta}
          className="group relative flex items-center gap-3 px-8 py-4 bg-yellow-400 text-[#1a2a22] rounded-full shadow-[0_8px_25px_rgba(253,224,71,0.25)] hover:scale-105 transition-all duration-300 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
          <span className="text-xl relative z-10">📞</span>
          <span className="font-black uppercase tracking-widest text-sm relative z-10">{t.contact.cta}</span>
        </button>

        {isEditMode && (
          <div className="flex flex-col items-end gap-3 animate-in fade-in slide-in-from-bottom-4">
            <button
              onClick={handleGenerateBackgrounds}
              disabled={isGeneratingBg}
              aria-label={t.editor.generateBg}
              className="group px-6 py-3 bg-[#2b4036] text-white rounded-full shadow-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2 border border-white/10"
            >
              {isGeneratingBg ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <span>🖼️</span>}
              {t.editor.generateBg}
            </button>
            <button
              onClick={handleGenerateAllImages}
              disabled={isGeneratingAll}
              aria-label={t.editor.generateAll}
              className="group px-6 py-3 bg-white text-[#1a2a22] rounded-full shadow-xl font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2 border border-[#f1f5f2]"
            >
              {isGeneratingAll ? <div className="w-3 h-3 border-2 border-[#1a2a22] border-t-transparent rounded-full animate-spin"></div> : <span>✨</span>}
              {t.editor.generateAll}
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              aria-label={t.editor.close}
              className="px-6 py-2 bg-emerald-950 text-white rounded-full font-bold text-[10px] uppercase tracking-widest shadow-xl"
            >
              {t.editor.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;