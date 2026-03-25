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
  <div className="flex-1 w-full overflow-y-auto px-6 py-6 flex flex-col animate-in slide-in-from-bottom-2 duration-300 bg-white dark:bg-[#0a0a0a]">
    <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
      
      <div className="mb-6">
        <h2 className="text-xl font-bold font-headline mb-2 text-slate-800 dark:text-white tracking-tight uppercase italic opacity-70">
          Configuration
        </h2>
      </div>

      <button 
        onClick={toggleTestMode}
        className={`group relative flex items-center gap-4 px-5 py-4 rounded-xl transition-all cursor-pointer shadow-sm border ${
          isTestMode 
          ? 'bg-amber-500/5 text-amber-600 dark:text-amber-500 border-amber-500/20' 
          : 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-500 border-emerald-500/20'
        }`}
      >
        <div className={`p-2.5 rounded-lg transition-transform group-hover:rotate-6 ${
          isTestMode 
          ? 'bg-amber-500/10' 
          : 'bg-emerald-500/10'
        }`}>
          <span className={`material-symbols-outlined text-2xl ${
            isTestMode ? 'text-amber-500' : 'text-emerald-500'
          }`}>
            {isTestMode ? 'construction' : 'rocket_launch'}
          </span>
        </div>
        
        <div className="text-left">
          <p className="text-[9px] font-bold uppercase tracking-widest opacity-40 mb-0.5">ACTIVE NODE</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold font-headline uppercase tracking-tight">
              {isTestMode ? 'TEST' : 'PRODUCTION'}
            </p>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isTestMode ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          </div>
        </div>
      </button>

      <div className="mt-8 pt-8 border-t border-[#cbd5e1] dark:border-white/5 w-full text-left">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1.5 block px-1 text-slate-400 dark:text-[#8b949e]">Webhook URL</label>
            <div className="bg-slate-50 dark:bg-[#111] p-3 rounded-lg border border-[#cbd5e1] dark:border-white/5 font-mono text-[10px] break-all opacity-80 text-slate-500 dark:text-[#8b949e]">
              {webhookUrl}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);
