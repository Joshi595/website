import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { generateCustomGardenImage } from '../services/gemini';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const DesignStudio: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Willkommen im Design Studio. Ich bin Ihr persönlicher KI-Gartenarchitekt. Beschreiben Sie mir Ihre Vision – egal ob ein moderner Dachgarten oder eine wilde Waldlandschaft – und ich visualisiere sie für Sie." }
  ]);
  const [input, setInput] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping || isGeneratingImage) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a high-end luxury garden designer for "Mein Gärtla". 
        A client says: "${userText}". 
        Acknowledge their ideas with professional enthusiasm, suggest one elegant architectural refinement, and end by telling them you are generating a visualization. 
        Keep it to 3-4 sentences in German.`,
      });

      const aiText = response.text || "Das klingt nach einem wunderbaren Projekt. Ich bereite nun eine exklusive Visualisierung für Sie vor.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setIsTyping(false);

      // Trigger Image Generation
      setIsGeneratingImage(true);
      const imageUrl = await generateCustomGardenImage(userText);
      setPreviewImage(imageUrl);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "Entschuldigung, es gab ein technisches Problem bei der Visualisierung. Bitte versuchen Sie es noch einmal." }]);
    } finally {
      setIsTyping(false);
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="bg-[#1a2a22] min-h-screen pt-24 flex flex-col lg:flex-row">
      {/* Left Pane: Chat Interface */}
      <div className="w-full lg:w-1/2 flex flex-col h-[calc(100vh-6rem)] border-r border-white/5">
        <div className="p-8 border-b border-white/5">
          <span className="text-yellow-400 font-black uppercase text-[10px] tracking-[0.3em] mb-2 block">Live Beratung</span>
          <h2 className="text-3xl font-bold text-white serif">Garten-Architekt</h2>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-6 rounded-3xl ${
                m.role === 'user' 
                  ? 'bg-yellow-400 text-[#1a2a22] rounded-tr-none font-medium' 
                  : 'bg-[#2b4036] text-white/90 rounded-tl-none font-light leading-relaxed'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#2b4036] p-6 rounded-3xl rounded-tl-none flex gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-8 bg-[#1a2a22]">
          <div className="relative group">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Beschreiben Sie Ihren Traumgarten..."
              className="w-full py-5 px-8 bg-[#2b4036]/50 border-2 border-white/5 focus:border-yellow-400/50 rounded-full outline-none text-white placeholder:text-white/20 transition-all text-lg pr-20"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping || isGeneratingImage}
              className="absolute right-4 top-2 bottom-2 aspect-square bg-yellow-400 rounded-full flex items-center justify-center text-[#1a2a22] shadow-xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
            >
              <span className="text-2xl font-bold">↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Pane: Visual Preview */}
      <div className="w-full lg:w-1/2 h-[calc(100vh-6rem)] relative bg-[#0d1611] overflow-hidden group">
        {previewImage ? (
          <div className="w-full h-full relative animate-in fade-in duration-1000">
            <img 
              src={previewImage} 
              alt="Garten Visualisierung" 
              className={`w-full h-full object-cover transition-all duration-700 ${isGeneratingImage ? 'scale-105 blur-md grayscale' : 'scale-100'}`}
            />
            {!isGeneratingImage && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2a22] via-transparent to-transparent opacity-60"></div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="w-32 h-32 bg-yellow-400/5 rounded-full flex items-center justify-center text-6xl mb-8 animate-pulse">
              🌿
            </div>
            <h3 className="text-2xl text-white serif mb-4">Warten auf Inspiration</h3>
            <p className="text-white/30 max-w-sm font-light">
              Nutzen Sie den Chat auf der linken Seite, um Ihre Ideen zu teilen. Ich werde hier eine professionelle Visualisierung für Sie erstellen.
            </p>
          </div>
        )}

        {isGeneratingImage && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a2a22]/40 backdrop-blur-md z-20">
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-8"></div>
            <p className="text-white font-black uppercase tracking-[0.4em] text-xs animate-pulse">Generiere Visualisierung...</p>
          </div>
        )}

        {previewImage && !isGeneratingImage && (
          <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <span className="text-yellow-400 font-black uppercase text-[9px] tracking-widest mb-2 block">Visualisierung v1.0</span>
             <p className="text-white text-sm font-light leading-relaxed">
               Dies ist eine KI-gestützte Darstellung basierend auf Ihren aktuellen Wünschen. Wir können jedes Detail gemeinsam verfeinern.
             </p>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(251, 191, 36, 0.3); }
      `}} />
    </div>
  );
};

export default DesignStudio;