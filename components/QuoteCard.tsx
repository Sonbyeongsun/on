import React from 'react';

interface QuoteCardProps {
  quote: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <div className="animate-fade-in-up bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center border border-white/50">
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
      `}</style>
      <p className="font-handwriting text-3xl md:text-4xl leading-relaxed text-gray-800">
        “{quote}”
      </p>
    </div>
  );
};

export default QuoteCard;