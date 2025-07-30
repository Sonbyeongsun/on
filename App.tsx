import React, { useState, useCallback } from 'react';
import { fetchEncouragingQuote } from './services/geminiService';
import QuoteCard from './components/QuoteCard';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import ErrorDisplay from './components/ErrorDisplay';
import EmotionSelector from './components/EmotionSelector';

export default function App() {
  const [quote, setQuote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSelectEmotion = useCallback(async (emotion: string) => {
    setIsLoading(true);
    setError(null);
    setQuote(null);
    setShowResult(true);
    try {
      const newQuote = await fetchEncouragingQuote(emotion);
      setQuote(newQuote);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setShowResult(false);
    setQuote(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200 text-gray-800 flex flex-col p-4 transition-all duration-500">
      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center mb-4">
          <Header />

          <main className="w-full flex-grow flex flex-col items-center justify-center space-y-8 mt-8">
            {!showResult ? (
              <EmotionSelector onSelect={handleSelectEmotion} isLoading={isLoading} />
            ) : (
              <>
                <div className="w-full min-h-[250px] flex items-center justify-center">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : error ? (
                    <ErrorDisplay message={error} />
                  ) : quote ? (
                    <QuoteCard quote={quote} />
                  ) : null}
                </div>

                <button
                  onClick={handleReset}
                  disabled={isLoading}
                  className="bg-sky-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-sky-300 disabled:cursor-not-allowed"
                >
                  마음 다시 선택하기
                </button>
              </>
            )}
          </main>
        </div>
      </div>
      <footer className="text-center py-2 text-gray-600 text-sm">
        <p>전일고 위(Wee)클래스에서 만들었습니다.</p>
      </footer>
    </div>
  );
}