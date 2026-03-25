import React from 'react';

type Props = {
  activeTab: 'chat' | 'settings' | 'sales';
  setActiveTab: (tab: 'chat' | 'settings' | 'sales') => void;
};

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <aside className="h-screen w-60 flex flex-col p-3 bg-white dark:bg-[#0a0a0a] border-r border-[#cbd5e1] dark:border-white/5 font-headline font-medium text-[13px] z-50 transition-colors duration-300">
    <div className="px-3 mb-6 mt-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-[#0262a5] dark:text-white tracking-tight leading-none italic">
          Sales Manager
        </h2>
      </div>
    </div>

    <nav className="flex-1 flex flex-col gap-1 text-slate-600 dark:text-[#8b949e]">
      <a
        onClick={() => setActiveTab('chat')}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
          activeTab === 'chat'
            ? 'bg-slate-100 dark:bg-[#161b22] text-[#0262a5] dark:text-[#65a7ef] font-bold shadow-sm border border-[#cbd5e1] dark:border-white/5'
            : 'hover:bg-slate-100 dark:hover:bg-[#161b22] hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">dashboard</span>
        <span>Asistente</span>
      </a>

      <a className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-[#161b22] hover:text-slate-900 dark:hover:text-white rounded-md transition-all duration-200 cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">inventory_2</span>
        <span>Inventario</span>
      </a>

      <a
        onClick={() => setActiveTab('sales')}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
          activeTab === 'sales'
            ? 'bg-slate-100 dark:bg-[#161b22] text-[#0262a5] dark:text-[#65a7ef] font-bold shadow-sm border border-[#cbd5e1] dark:border-white/5'
            : 'hover:bg-slate-100 dark:hover:bg-[#161b22] hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">receipt_long</span>
        <span>Ventas</span>
      </a>

      <a
        onClick={() => setActiveTab('settings')}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-all duration-200 cursor-pointer ${
          activeTab === 'settings'
            ? 'bg-slate-100 dark:bg-[#161b22] text-[#0262a5] dark:text-[#65a7ef] font-bold shadow-sm border border-[#cbd5e1] dark:border-white/5'
            : 'hover:bg-slate-100 dark:hover:bg-[#161b22] hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <span className="material-symbols-outlined text-[18px]">settings</span>
        <span>Configuración</span>
      </a>
    </nav>

    <div className="mt-auto flex flex-col gap-1 border-t border-[#cbd5e1] dark:border-white/5 pt-3">
      <button className="mb-4 w-full bg-[#0262a5] dark:bg-[#1d4ed8] text-white font-bold py-2 rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 text-[12px] cursor-pointer">
        <span className="material-symbols-outlined text-[16px]">add</span>
        <span>Nueva venta</span>
      </button>

      <a className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 dark:text-[#8b949e] hover:bg-slate-100 dark:hover:bg-[#161b22] hover:text-slate-900 dark:hover:text-white rounded-md transition-all duration-200 cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">help</span>
        <span>Ayuda</span>
      </a>

      <a className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 dark:text-[#8b949e] hover:bg-slate-100 dark:hover:bg-[#161b22] hover:text-slate-900 dark:hover:text-white rounded-md transition-all duration-200 cursor-pointer">
        <span className="material-symbols-outlined text-[18px]">logout</span>
        <span>Cerrar sesion</span>
      </a>
    </div>
  </aside>
);
