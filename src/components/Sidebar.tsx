import React from 'react';

type Props = {
  activeTab: 'chat' | 'settings' | 'sales';
  setActiveTab: (tab: 'chat' | 'settings' | 'sales') => void;
};

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => (
  <aside className="h-screen w-64 flex flex-col p-4 gap-2 bg-[#f9f9ff] dark:bg-slate-950 border-r border-[#cbd5e1] dark:border-outline-variant/10 font-headline font-medium text-sm z-50">
    <div className="px-2 mb-8 mt-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0262a5] dark:bg-[#65a7ef] flex items-center justify-center text-white font-bold shadow-lg">
          SC
        </div>
        <div>
          <h2 className="text-xl font-bold text-[#0262a5] dark:text-[#65a7ef] tracking-tight leading-none">
            Asistente de Ventas
          </h2>
          <span className="text-[10px] text-[#5a5f6a] dark:text-slate-400 font-bold uppercase tracking-wider">
            Asistente Principal
          </span>
        </div>
      </div>
    </div>

    <nav className="flex-1 flex flex-col gap-1">
      <a
        onClick={() => setActiveTab('chat')}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
          activeTab === 'chat'
            ? 'bg-[#e2e8f0] dark:bg-slate-900 text-[#0262a5] dark:text-[#65a7ef] font-bold shadow-sm'
            : 'text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 border border-transparent hover:border-[#cbd5e1] dark:hover:border-transparent'
        }`}
      >
        <span className="material-symbols-outlined">dashboard</span>
        <span>Panel General</span>
      </a>

      <a className="flex items-center gap-3 px-4 py-3 text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 rounded-lg transition-colors duration-200 cursor-pointer border border-transparent hover:border-[#cbd5e1] dark:hover:border-transparent">
        <span className="material-symbols-outlined">inventory_2</span>
        <span>Inventario</span>
      </a>

      <a
        onClick={() => setActiveTab('sales')}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
          activeTab === 'sales'
            ? 'bg-[#e2e8f0] dark:bg-slate-900 text-[#0262a5] dark:text-[#65a7ef] font-bold shadow-sm'
            : 'text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 border border-transparent hover:border-[#cbd5e1] dark:hover:border-transparent'
        }`}
      >
        <span className="material-symbols-outlined">receipt_long</span>
        <span>Registro de Ventas</span>
      </a>

      <a
        onClick={() => setActiveTab('settings')}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${
          activeTab === 'settings'
            ? 'bg-[#e2e8f0] dark:bg-slate-900 text-[#0262a5] dark:text-[#65a7ef] font-bold shadow-sm'
            : 'text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 border border-transparent hover:border-[#cbd5e1] dark:hover:border-transparent'
        }`}
      >
        <span className="material-symbols-outlined">settings</span>
        <span>Configuración</span>
      </a>
    </nav>

    <div className="mt-auto flex flex-col gap-1 border-t border-[#cbd5e1] dark:border-outline-variant/10 pt-4">
      <button className="mb-4 w-full bg-[#0262a5] dark:bg-[#65a7ef] text-white font-bold py-3 rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-[20px]">add</span>
        <span>Nueva Venta</span>
      </button>

      <a className="flex items-center gap-3 px-4 py-2 text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 rounded-lg transition-colors duration-200 cursor-pointer">
        <span className="material-symbols-outlined">help</span>
        <span>Ayuda</span>
      </a>

      <a className="flex items-center gap-3 px-4 py-2 text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 rounded-lg transition-colors duration-200 cursor-pointer">
        <span className="material-symbols-outlined">logout</span>
        <span>Cerrar Sesión</span>
      </a>
    </div>
  </aside>
);
