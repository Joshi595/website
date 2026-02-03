
import React, { useState, useRef, useEffect } from 'react';
import { polishContent } from '../services/gemini';

interface AIContentEditorProps {
  value: string;
  onSave: (val: string) => void;
  context: string;
  className?: string;
}

const AIContentEditor: React.FC<AIContentEditorProps> = ({ value, onSave, context, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handlePolish = async () => {
    setIsLoading(true);
    try {
      const refinedText = await polishContent(currentValue, context);
      setCurrentValue(refinedText);
      onSave(refinedText);
    } catch (error) {
      console.error("AI polishing failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    onSave(currentValue);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEditing]);

  if (!isEditing) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className={`group relative cursor-pointer p-2 -m-2 rounded-xl transition-all border-2 border-transparent hover:border-emerald-200 hover:bg-emerald-50/50 ${className}`}
      >
        {value}
        <span className="absolute -top-4 -right-2 hidden group-hover:flex bg-emerald-800 text-white text-[9px] px-3 py-1.5 rounded-full shadow-xl uppercase font-black tracking-widest items-center gap-1.5 z-20">
          <span className="text-[12px]">✨</span> Polish with AI
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full z-30">
      <textarea
        ref={textAreaRef}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        className={`w-full bg-white border-2 border-emerald-600 rounded-2xl p-6 shadow-2xl focus:outline-none focus:ring-8 focus:ring-emerald-50 min-h-[120px] text-emerald-950 ${className}`}
      />
      <div className="flex flex-wrap gap-2 mt-3 p-1">
        <button 
          onClick={handleSave}
          className="px-6 py-2.5 bg-emerald-800 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-emerald-900 transition-all"
        >
          Save Changes
        </button>
        <button 
          onClick={handlePolish}
          disabled={isLoading}
          className="px-6 py-2.5 bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg hover:bg-emerald-200 disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          {isLoading ? (
            <span className="animate-spin text-sm">↻</span>
          ) : (
            <><span>✨</span> AI Refine</>
          )}
        </button>
        <button 
          onClick={() => { setCurrentValue(value); setIsEditing(false); }}
          className="px-6 py-2.5 bg-white text-emerald-900 border border-emerald-100 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-50 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AIContentEditor;
