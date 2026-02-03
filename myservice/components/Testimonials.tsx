import React from 'react';
import ScrollReveal from './ScrollReveal';

const reviews = [
  {
    id: 1,
    author: "Familie Müller",
    text: "Unser Garten ist kaum wiederzuerkennen. Die Planung war professionell und das Ergebnis übertrifft unsere Erwartungen bei weitem!",
    rating: 5
  },
  {
    id: 2,
    author: "Dr. Stefan Weber",
    text: "Sehr zuverlässiges Team. Die Pflegearbeiten werden immer pünktlich und mit größter Sorgfalt ausgeführt. Absolut empfehlenswert.",
    rating: 5
  },
  {
    id: 3,
    author: "Elena Schmidt",
    text: "Kreative Köpfe mit einem Auge fürs Detail. Besonders die neuen Pflanzkonzepte haben unserem Außenbereich neues Leben eingehaucht.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="bewertungen" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[#3c5a4d] font-medium text-lg mb-4 block">Kundenstimmen</span>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1a2a22] serif">Was unsere Kunden sagen</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, idx) => (
            <ScrollReveal key={review.id} delay={idx * 150} direction="up">
              <div className="bg-[#f4f7f5]/30 p-10 rounded-[3rem] border border-[#f4f7f5] relative h-full">
                <div className="flex text-yellow-400 mb-6 text-xl">
                  {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <p className="text-[#1a2a22]/70 text-lg leading-relaxed mb-8 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#e8efea] rounded-full flex items-center justify-center text-[#1a2a22] font-bold">
                    {review.author.charAt(0)}
                  </div>
                  <span className="font-bold text-[#1a2a22]">{review.author}</span>
                </div>
                <div className="absolute top-10 right-10 text-[#e8efea] text-6xl opacity-30 serif">“</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2a22] text-white rounded-full font-bold text-sm">
                  <span className="text-yellow-400">★</span> 4.9/5 Basierend auf 120+ Bewertungen
              </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Testimonials;