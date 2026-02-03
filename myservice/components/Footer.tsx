import React from 'react';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (view: 'home' | 'contact' | 'gallery', id?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gradient-to-b from-[#1a2a22] via-emerald-950/40 to-[#0d1510] py-32 border-t border-white/5 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-yellow-300/5 to-transparent rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-300/10 to-cyan-200/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-20">
          <div className="max-w-md">
            <button
              onClick={() => onNavigate('home')}
              className="cursor-pointer group mb-8 hover:scale-110 transition-transform duration-300"
            >
              <Logo className="h-14" />
            </button>
            <p className="text-white/60 text-lg font-light leading-relaxed hover:text-white/80 transition-colors">
              Exklusive Gartengestaltung und <span className="text-yellow-300 font-medium">leidenschaftliche Pflege</span> für anspruchsvolle Kunden in Erlangen und Umgebung.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 lg:gap-32">
            <div>
              <h5 className="text-yellow-400 font-black uppercase text-[11px] tracking-widest mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span> Navigation
              </h5>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => onNavigate('home')}
                    className="text-white/60 hover:text-yellow-300 transition-all duration-300 text-sm font-medium group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t.nav.home}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('home', 'überuns')}
                    className="text-white/60 hover:text-yellow-300 transition-all duration-300 text-sm font-medium group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t.nav.about}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('home', 'leistungen')}
                    className="text-white/60 hover:text-yellow-300 transition-all duration-300 text-sm font-medium group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {t.nav.services}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 text-sm font-bold group flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    {t.nav.contact}
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-emerald-400 font-black uppercase text-[11px] tracking-widest mb-8 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> Rechtliches
              </h5>
              <ul className="space-y-4">
                {['Impressum', 'Datenschutz', 'AGB'].map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-emerald-300 transition-all duration-300 text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/30 text-[10px] font-bold tracking-[0.3em] uppercase hover:text-white/50 transition-colors">
            © {new Date().getFullYear()} Mein Gärtla GmbH. {t.footer.rights}
          </div>
          <div className="flex gap-8">
            {[
              { name: 'Instagram', emoji: '📷' },
              { name: 'Pinterest', emoji: '📌' },
              { name: 'Houzz', emoji: '🏡' }
            ].map(social => (
              <a
                key={social.name}
                href="#"
                className="text-white/40 hover:text-yellow-400 transition-all duration-300 uppercase text-[10px] font-black tracking-widest group flex items-center gap-1.5"
              >
                <span className="group-hover:scale-125 transition-transform">{social.emoji}</span>
                <span className="hidden sm:inline">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;