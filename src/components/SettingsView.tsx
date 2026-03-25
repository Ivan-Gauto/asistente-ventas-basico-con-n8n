import React from 'react';

type Props = {
  webhookUrl: string;
  setWebhookUrl: (v: string) => void;
  storeName: string;
  setStoreName: (v: string) => void;
  saveSettings: () => void;
  isTestMode: boolean;
  toggleTestMode: () => void;
};

export const SettingsView: React.FC<Props> = ({
  webhookUrl,
  setWebhookUrl,
  storeName,
  setStoreName,
  saveSettings,
  isTestMode,
  toggleTestMode,
}) => (
  <div className="flex-1 w-full overflow-y-auto px-10 py-10 flex flex-col slide-in-from-bottom-4 animate-in duration-300 bg-white dark:bg-[#0c0e13]">
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center">
      
      <div className="mb-12">
        <h2 className="text-4xl font-black font-headline mb-4 text-[#2d333d] dark:text-white tracking-tight">
          Entorno de Webhook
        </h2>
      </div>

      <button 
        onClick={toggleTestMode}
        className={`group relative flex items-center gap-6 px-12 py-10 rounded-[40px] transition-all cursor-pointer shadow-2xl hover:translate-y-[-4px] active:scale-[0.96] border-4 ${
          isTestMode 
          ? 'bg-amber-100/40 text-amber-700 border-amber-300 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700/50' 
          : 'bg-emerald-100/40 text-emerald-700 border-emerald-300 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700/50'
        }`}
      >
        <div className={`p-5 rounded-3xl transition-transform group-hover:rotate-12 ${
          isTestMode 
          ? 'bg-amber-500/20 dark:bg-amber-500/10' 
          : 'bg-emerald-500/20 dark:bg-emerald-500/10'
        }`}>
          <span className={`material-symbols-outlined text-5xl ${
            isTestMode ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
          }`}>
            {isTestMode ? 'construction' : 'rocket_launch'}
          </span>
        </div>
        
        <div className="text-left">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] opacity-50 mb-1">Modo Actual</p>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-black font-headline">
              {isTestMode ? 'TEST' : 'PRODUCCIÓN'}
            </p>
            <div className={`w-3 h-3 rounded-full animate-pulse ${isTestMode ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          </div>
        </div>
      </button>

    </div>
  </div>
);
