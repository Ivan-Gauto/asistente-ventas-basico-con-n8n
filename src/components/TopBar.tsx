import React from 'react';

type Props = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: 'chat' | 'settings' | 'sales';
};

export const TopBar: React.FC<Props> = ({ isDarkMode, toggleDarkMode, activeTab }) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'chat':
        return 'Asistente';
      case 'sales':
        return 'Registro de ventas';
      case 'settings':
        return 'Configuración';
      default:
        return 'Asistente';
    }
  };

  return (
    <header className="flex justify-between items-center w-full px-6 h-12 bg-white dark:bg-[#0a0a0a] backdrop-blur-xl sticky top-0 z-50 border-b border-[#cbd5e1] dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-[#8b949e] font-headline uppercase opacity-70">
          {getTabTitle()}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-1.5 transition-all duration-200 active:scale-90 text-slate-400 dark:text-[#8b949e] hover:text-[#0262a5] dark:hover:text-white cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </header>
  );
};
