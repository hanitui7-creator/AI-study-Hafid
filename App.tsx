import React, { useState, useCallback, useEffect, useRef } from 'react';
import { generateResponseStream } from './services/geminiService';
import Header from './components/Header';
import Loader from './components/Loader';
import ResponseDisplay from './components/ResponseDisplay';
import { SendIcon } from './components/icons';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const responseEndRef = useRef<HTMLDivElement>(null);


  const handleQuerySubmit = useCallback(async (currentQuery: string) => {
    if (!currentQuery.trim()) return;

    setIsLoading(true);
    setResponse('');
    setSources([]);
    setError('');
    setHasSearched(true);
    
    try {
      const stream = await generateResponseStream(currentQuery);
      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setResponse(fullText);

        const chunkSources = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunkSources) {
          setSources(prevSources => {
            const existingUris = new Set(prevSources.map(s => s.web?.uri).filter(Boolean));
            const newUniqueSources = chunkSources.filter(s => s.web?.uri && !existingUris.has(s.web.uri));
            if (newUniqueSources.length > 0) {
                return [...prevSources, ...newUniqueSources];
            }
            return prevSources;
          });
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga.';
      setError(`Gagal mendapatkan respons: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleQuerySubmit(query);
  };
  
  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [response]);

  const sampleQueries = [
    "Jelaskan konsep rekursi dalam ilmu komputer dengan contoh Python sederhana.",
    "Apa saja penyebab utama Perang Dunia I?",
    "Jelaskan proses fotosintesis dalam istilah yang sederhana.",
    "Selesaikan integral berikut: ∫(3x^2 + 2x - 5) dx"
  ];
  
  const handleSampleQueryClick = (sample: string) => {
    setQuery(sample);
    handleQuerySubmit(sample);
  }

  return (
    <div className="min-h-screen font-sans p-4 flex flex-col max-h-screen">
      <Header />
      <main className="flex-grow w-full max-w-4xl mx-auto flex flex-col overflow-y-auto pb-32">
        {hasSearched ? (
          <div className="w-full">
            {isLoading && !response && <Loader />}
            {error && <div className="text-rose-300 bg-rose-950/50 p-4 rounded-lg border border-rose-800">{error}</div>}
            {(response || sources.length > 0) && !error && (
              <ResponseDisplay response={response} sources={sources} />
            )}
            <div ref={responseEndRef} />
          </div>
        ) : (
           <div className="flex-grow flex flex-col justify-center items-center text-center">
              <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-300">Selamat datang di AI Study HAFID</h2>
                <p className="mt-2 text-gray-400">Tutor AI pribadi Anda. Tanyakan apa saja atau coba contoh.</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                   {sampleQueries.map((sample, index) => (
                      <button 
                        key={index}
                        onClick={() => handleSampleQueryClick(sample)}
                        disabled={isLoading}
                        className="p-4 bg-gray-800/70 text-gray-300 rounded-lg text-left hover:bg-gray-700/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {sample}
                      </button>
                   ))}
                </div>
              </div>
           </div>
        )}
      </main>
      
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900 to-transparent">
        <div className="w-full max-w-4xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Tanyakan apa saja..."
                className="w-full p-4 pr-16 text-base bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow duration-200 placeholder-gray-400 backdrop-blur-sm"
                rows={Math.max(1, Math.min(query.split('\n').length, 5))}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
                aria-label="Kirim pertanyaan"
              >
                <SendIcon className="w-5 h-5" />
              </button>
            </form>
         </div>
         <footer className="text-center pb-2 text-gray-600 text-xs">
            <p>Didukung oleh Google Gemini. Hanya untuk tujuan pendidikan.</p>
        </footer>
      </div>

    </div>
  );
};

export default App;