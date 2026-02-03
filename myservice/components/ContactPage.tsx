
import React, { useState } from 'react';

// This is the endpoint for the contact form, configured to send emails.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdadjdly";

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { 
        method: "POST",
        body: formData,
        headers: {
          'Accept': "application/json",
        }
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-[#1a2a22] min-h-screen flex items-center justify-center pt-32 pb-20 px-6">
        <div className="max-w-2xl w-full bg-white p-16 rounded-[4rem] shadow-6xl text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-10">✓</div>
          <h2 className="text-5xl font-bold text-[#1a2a22] serif mb-6">Vielen Dank!</h2>
          <p className="text-xl text-[#1a2a22]/60 font-light mb-12 leading-relaxed">
            Ihre Nachricht wurde erfolgreich an <strong>gartensass@gmx.de</strong> gesendet. Wir werden uns innerhalb der nächsten 24 Stunden bei Ihnen melden.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-12 py-5 bg-[#1a2a22] text-white rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Zurück zum Formular
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a2a22] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-yellow-400/50"></div>
            <span className="text-yellow-400 font-bold tracking-[0.4em] uppercase text-[10px]">Kontakt aufnehmen</span>
            <div className="h-[1px] w-12 bg-yellow-400/50"></div>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white serif mb-12 tracking-tight">
            Treten Sie mit uns in <span className="text-yellow-400">Verbindung</span>
          </h1>
          <p className="text-xl text-[#f1f5f2]/60 font-light max-w-2xl mx-auto leading-relaxed">
            Ob Neugestaltung, pflege oder Beratung – Mein Gärtla ist Ihr kompetenter Partner für magische Gartenwelten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div id="zentrale" className="lg:col-span-5 space-y-12 scroll-mt-32">
            <div className="bg-[#2b4036]/40 backdrop-blur-md p-10 rounded-[3rem] border border-white/5">
              <h3 className="text-2xl font-bold text-white serif mb-8">Unsere Zentrale</h3>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-[#1a2a22] text-2xl shadow-xl">📍</div>
                  <div>
                    <span className="block text-[#f1f5f2]/30 uppercase font-black text-[9px] tracking-widest mb-1">Standort</span>
                    <p className="text-xl text-white font-medium">Bischofsweiherstraße 14<br/>91056 Erlangen, Germany</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-[#3e5c4e] rounded-2xl flex items-center justify-center text-yellow-400 text-2xl shadow-xl border border-white/5">📞</div>
                  <div>
                    <span className="block text-[#f1f5f2]/30 uppercase font-black text-[9px] tracking-widest mb-1">Telefon</span>
                    <p className="text-xl text-white font-medium">0176/54079960</p>
                    <p className="text-[#f1f5f2]/40 text-sm mt-1">Mo-Fr: 08:00 - 18:00 Uhr</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-[#3e5c4e] rounded-2xl flex items-center justify-center text-yellow-400 text-2xl shadow-xl border border-white/5">💶</div>
                  <div>
                    <span className="block text-[#f1f5f2]/30 uppercase font-black text-[9px] tracking-widest mb-1">Servicegebühr</span>
                    <p className="text-xl text-white font-medium">28€ / Stunde</p>
                    <p className="text-[#f1f5f2]/40 text-sm mt-1">Festpreis für alle Serviceleistungen.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-400 p-10 rounded-[3rem] shadow-2xl">
              <h3 className="text-2xl font-bold text-[#1a2a22] serif mb-4">Besuchen Sie uns</h3>
              <p className="text-[#1a2a22]/70 mb-8 leading-relaxed">Kommen Sie auf einen Espresso bei Mein Gärtla vorbei und lassen Sie uns über Ihre Visionen sprechen.</p>
              
              <div className="aspect-video w-full bg-[#1a2a22] rounded-2xl overflow-hidden border border-[#2b4036] shadow-2xl relative">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  allowFullScreen 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mein Gärtla Location"
                  src="https://maps.google.com/maps?q=Bischofsweiherstraße%2014,%2091056%20Erlangen,%20Germany&t=k&z=18&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-3xl">
              <h3 className="text-4xl font-bold text-[#1a2a22] serif mb-4">Senden Sie uns eine Nachricht</h3>
              <p className="text-[#1a2a22]/40 mb-12">Füllen Sie das Formular aus, wir melden uns umgehend bei Ihnen.</p>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <input type="hidden" name="_subject" value="Mein Gärtla: Neue Anfrage von {{name}}" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group relative">
                    <label className="block text-[#1a2a22]/40 text-[10px] font-black uppercase tracking-widest mb-2 group-focus-within:text-yellow-500">Vor- & Nachname</label>
                    <input name="name" required type="text" className="w-full py-4 bg-transparent border-b-2 border-[#f4f7f5] focus:border-yellow-400 outline-none text-[#1a2a22] font-medium transition-all text-xl" placeholder="Max Mustermann" />
                  </div>
                  <div className="group relative">
                    <label className="block text-[#1a2a22]/40 text-[10px] font-black uppercase tracking-widest mb-2 group-focus-within:text-yellow-500">Telefonnummer</label>
                    <input name="phone" required type="tel" className="w-full py-4 bg-transparent border-b-2 border-[#f4f7f5] focus:border-yellow-400 outline-none text-[#1a2a22] font-medium transition-all text-xl" placeholder="0176..." />
                  </div>
                </div>

                <div className="group relative">
                  <label className="block text-[#1a2a22]/40 text-[10px] font-black uppercase tracking-widest mb-2 group-focus-within:text-yellow-500">E-Mail Adresse</label>
                  <input name="_replyto" required type="email" className="w-full py-4 bg-transparent border-b-2 border-[#f4f7f5] focus:border-yellow-400 outline-none text-[#1a2a22] font-medium transition-all text-xl" placeholder="max@beispiel.de" />
                </div>

                <div className="group relative">
                  <label className="block text-[#1a2a22]/40 text-[10px] font-black uppercase tracking-widest mb-2 group-focus-within:text-yellow-500">Thema</label>
                  <select name="topic" className="w-full py-4 bg-transparent border-b-2 border-[#f4f7f5] focus:border-yellow-400 outline-none text-[#1a2a22] font-medium transition-all text-xl appearance-none cursor-pointer">
                    <option>Neugestaltung</option>
                    <option>Gartenpflege</option>
                    <option>Planung & Beratung</option>
                    <option>Sonstiges</option>
                  </select>
                </div>

                <div className="group relative">
                  <label className="block text-[#1a2a22]/40 text-[10px] font-black uppercase tracking-widest mb-2 group-focus-within:text-yellow-500">Ihre Nachricht</label>
                  <textarea name="message" required rows={4} className="w-full py-4 bg-transparent border-b-2 border-[#f4f7f5] focus:border-yellow-400 outline-none text-[#1a2a22] font-medium transition-all text-xl resize-none" placeholder="Erzählen Sie uns von Ihrem Projekt..." />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-bold text-center animate-pulse">
                    Hoppla! Etwas ist schief gelaufen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.
                  </p>
                )}

                <button 
                  disabled={status === 'submitting'}
                  className="w-full py-6 bg-[#1a2a22] text-white font-black uppercase tracking-[0.2em] rounded-full hover:bg-yellow-400 hover:text-[#1a2a22] transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      Anfrage Absenden
                      <div className="w-12 h-[2px] bg-yellow-400 group-hover:w-16 transition-all"></div>
                    </>
                  )}
                </button>
                
                <p className="text-center text-[#1a2a22]/20 text-[10px] font-bold uppercase tracking-widest">
                  Mit dem Absenden akzeptieren Sie unsere <a href="#" className="underline hover:text-yellow-500">Datenschutzbestimmungen</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
