import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { LinkIcon, SparklesIcon } from './icons';

interface ResponseDisplayProps {
  response: string;
  sources: any[];
}

const Sources: React.FC<{ sources: any[] }> = ({ sources }) => {
  if (sources.length === 0) return null;

  const validSources = sources.filter(source => source.web && source.web.uri && source.web.title);

  return (
    <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700/60 rounded-lg">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-300 mb-3">
        <LinkIcon className="w-5 h-5" />
        Sumber
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {validSources.map((source, index) => {
          const { uri, title } = source.web;
          const domain = new URL(uri).hostname;
          return (
            <a
              key={index}
              href={uri}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-900/70 hover:bg-gray-800 rounded-md transition-colors"
            >
              <p className="text-blue-400 truncate font-medium">{title}</p>
              <p className="text-gray-500 text-sm truncate">{domain}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};


const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ response, sources }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <Sources sources={sources} />
      
      <div className="flex items-center gap-3 mb-4">
         <SparklesIcon className="w-6 h-6 text-blue-400"/>
         <h2 className="text-xl font-semibold">Jawaban</h2>
      </div>

      <div className="text-gray-300 leading-relaxed text-base markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {response}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ResponseDisplay;