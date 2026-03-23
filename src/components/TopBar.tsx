import React from 'react';

type Props = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const TopBar: React.FC<Props> = ({ isDarkMode, toggleDarkMode }) => (
  <header className="flex justify-between items-center w-full px-8 h-16 bg-[#f9f9ff]/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/10">
    <div className="flex items-center gap-4">
      <span className="text-xl font-extrabold tracking-tight text-[#2d333d] dark:text-slate-50 font-headline">
        Asistente de Ventas
      </span>
    </div>
    <div className="flex items-center gap-4">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-slate-800 transition-colors duration-200 active:scale-95 text-[#5a5f6a] dark:text-slate-400"
      >
        <span className="material-symbols-outlined">
          {isDarkMode ? 'light_mode' : 'dark_mode'}
        </span>
      </button>
    </div>
  </header>
);
