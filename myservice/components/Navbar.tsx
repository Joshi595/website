import React, { useState, useEffect, useCallback } from 'react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  onNavigate: (view: 'home' | 'contact' | 'gallery', id?: string) => void;
  currentView: 'home' | 'contact' | 'gallery';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((view: 'home' | 'contact' | 'gallery', e: React.MouseEvent, id?: string) => {
    e.preventDefault();
    onNavigate(view, id);
    setIsMenuOpen(false);
  }, [onNavigate]);

  const navItems = [
    { name: t.nav.about, view: 'home' as const, id: 'überuns' },
    { name: t.nav.services, view: 'home' as const, id: 'leistungen' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${currentView !== 'home'
          ? "bg-gradient-to-r from-[#1a2a22]/95 via-[#1a2a22]/90 to-emerald-900/40 backdrop-blur-xl shadow-lg border-b border-white/5"
          : (isScrolled
            ? "bg-gradient-to-r from-[#1a2a22]/95 via-[#1a2a22]/90 to-emerald-900/40 backdrop-blur-xl shadow-lg border-b border-white/5 py-4"
            : "bg-transparent py-6")
        }`}
      role="navigation"
      aria-label="Hauptnavigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <button
          className="cursor-pointer group"
          onClick={(e) => handleNavClick('home', e)}
          aria-label={t.nav.home}
        >
          <Logo className="h-12 hover:scale-110 transition-transform duration-300" />
        </button>

        <div className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(item.view, e, item.id)}
              aria-current={currentView === 'gallery' && item.id === 'leistungen' ? 'page' : undefined}
              className={`transition-all duration-300 text-lg font-semibold relative group ${(currentView === 'gallery' && item.id === 'leistungen')
                  ? 'text-yellow-400'
                  : 'text-white/90 hover:text-yellow-300'
                }`}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-300 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <button
            onClick={(e) => handleNavClick('contact', e)}
            className={`px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-lg group relative overflow-hidden ${currentView === 'contact'
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1a2a22] shadow-yellow-400/50'
                : 'bg-gradient-to-r from-yellow-400/80 to-yellow-500/80 text-[#1a2a22] hover:from-yellow-400 hover:to-yellow-500 hover:shadow-[0_5px_20px_rgba(253,224,71,0.35)] hover:scale-105'
              }`}
            aria-current={currentView === 'contact' ? 'page' : undefined}
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative flex items-center gap-2">
              📞 {t.nav.contact}
            </span>
          </button>
          <LanguageSwitcher />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-yellow-400 transition-colors"
          aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#1a2a22] to-emerald-900/40 z-40 flex flex-col items-center justify-center p-8 space-y-10 animate-in fade-in duration-300 backdrop-blur-md">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 text-white text-3xl hover:text-yellow-400 transition-colors"
            aria-label="Menü schließen"
          >
            ✕
          </button>
          <Logo className="h-20 mb-10" />
          {navItems.map((item) => (
            <button
              key={item.name}
              className="text-white text-4xl font-bold hover:text-yellow-400 transition-all duration-300 relative group"
              onClick={(e) => handleNavClick(item.view, e as any, item.id)}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-300 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
          <button
            className="text-white text-4xl font-black serif px-8 py-4 border-b-4 border-yellow-400 hover:text-yellow-300 transition-colors"
            onClick={(e) => handleNavClick('contact', e as any)}
          >
            📞 {t.nav.contact}
          </button>
          <div className="mt-6">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;