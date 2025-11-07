import React from 'react';
import { BrainCircuitIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto pt-4 pb-2 z-10">
      <div className="flex items-center gap-2 text-xl font-semibold text-gray-300">
        <BrainCircuitIcon className="w-6 h-6 text-blue-400" />
        <h1>AI Study HAFID</h1>
      </div>
    </header>
  );
};

export default Header;