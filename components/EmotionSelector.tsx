import React from 'react';

interface Emotion {
  label: string;
  value: string;
  emoji: string;
}

const emotions: Emotion[] = [
  { label: '지쳐요', value: 'exhausted', emoji: '😩' },
  { label: '불안해요', value: 'anxious', emoji: '😟' },
  { label: '우울해요', value: 'depressed', emoji: '😔' },
  { label: '무기력해요', value: 'lethargic', emoji: '😑' },
  { label: '화나요', value: 'angry', emoji: '😠' },
  { label: '자신 없어요', value: 'not_confident', emoji: '😥' },
  { label: '막막해요', value: 'overwhelmed', emoji: '😵' },
  { label: '외로워요', value: 'lonely', emoji: '🥺' },
  { label: '집중이 안돼요', value: 'cant_focus', emoji: '🤯' },
  { label: '번아웃 같아요', value: 'burnout', emoji: '🥵' },
];

interface EmotionSelectorProps {
  onSelect: (emotion: string) => void;
  isLoading: boolean;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({ onSelect, isLoading }) => {
  return (
    <div className="w-full max-w-3xl text-center animate-fade-in">
        <style>{`
            @keyframes fade-in {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">오늘 어떤 마음이신가요?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {emotions.map((emotion) => (
            <button
                key={emotion.value}
                onClick={() => onSelect(emotion.label)}
                disabled={isLoading}
                className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-70 rounded-xl shadow-md border border-white/50 hover:bg-sky-100 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label={`'${emotion.label}' 선택`}
            >
                <span className="text-4xl mb-2" aria-hidden="true">{emotion.emoji}</span>
                <span className="font-semibold text-gray-800 text-center">{emotion.label}</span>
            </button>
        ))}
        </div>
    </div>
  );
};

export default EmotionSelector;
