import React from 'react';
import { SparklesIcon } from './icons';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-start gap-3 p-4 text-blue-400">
      <SparklesIcon className="w-6 h-6 animate-pulse" />
      <p className="text-lg font-medium text-gray-400">Sedang berpikir...</p>
    </div>
  );
};

export default Loader;