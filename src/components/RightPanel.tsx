import React from 'react';
import { LocalProduct } from '../hooks/useStock';

type Props = {
  storeName: string;
  stockItems: LocalProduct[];
  isFetching: boolean;
};

export const RightPanel: React.FC<Props> = ({ storeName, stockItems, isFetching }) => (
  <aside className="w-80 flex flex-col bg-[#f9f9ff] dark:bg-[#0c0e13] border-l border-[#cbd5e1] dark:border-[#44474e]/20 h-full transition-colors duration-300">
    <div className="p-6 h-full flex flex-col pt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-headline font-bold text-[#2d333d] dark:text-white uppercase tracking-tight">Estado Local</h2>
        <span className="px-2 py-0.5 bg-[#0262a5]/10 dark:bg-[#00497d]/50 text-[#0262a5] dark:text-[#65a7ef] text-[10px] font-bold rounded uppercase tracking-wider">
          En Vivo
        </span>
      </div>

      <p className="font-label text-xs font-medium text-[#5a5f6a] dark:text-[#c4c7cf] mb-6">
        Inventario: {storeName}
      </p>

      <div className="flex-1 flex flex-col overflow-hidden">
        {isFetching && stockItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5a5f6a] dark:text-[#c4c7cf] animate-in fade-in zoom-in duration-300">
            <span className="material-symbols-outlined text-5xl mb-4 text-[#0262a5] dark:text-[#65a7ef] animate-spin">
              sync
            </span>
            <h3 className="font-headline font-bold text-lg text-[#2d333d] dark:text-[#e2e2e6] mb-1">
              Cargando productos
            </h3>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto hide-scrollbar flex-1 pb-4 animate-in fade-in duration-500">
            {stockItems.length > 0 ? (
              stockItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white dark:bg-[#1a1c1e] rounded-xl flex items-start gap-3 hover:translate-x-1 transition-all duration-200 shadow-sm border border-[#cbd5e1] dark:border-[#44474e]/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#f1f3fd] dark:bg-[#282a2e] flex items-center justify-center flex-shrink-0 border border-[#cbd5e1]/50 dark:border-transparent">
                    <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef]">
                      {item.name.toLowerCase().includes('phone') ||
                      item.name.toLowerCase().includes('celular')
                        ? 'smartphone'
                        : item.name.toLowerCase().includes('audio') ||
                          item.name.toLowerCase().includes('auricular') ||
                          item.name.toLowerCase().includes('headphone')
                        ? 'headphones'
                        : 'laptop'}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-label font-bold text-sm text-[#2d333d] dark:text-[#e2e2e6] truncate max-w-[120px]">
                        {item.name}
                      </span>
                      <span className="font-label font-bold text-sm text-[#0262a5] dark:text-[#65a7ef] shrink-0 ml-2">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <span className="font-label text-xs text-[#5a5f6a] dark:text-[#c4c7cf]">
                        Stock: {item.stock} uds.
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.stock > 10
                            ? 'bg-emerald-500'
                            : item.stock > 0
                            ? 'bg-amber-500'
                            : 'bg-red-500 animate-pulse'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5a5f6a] dark:text-[#c4c7cf]">
                <span className="material-symbols-outlined text-4xl mb-3 opacity-50">
                  inventory_2
                </span>
                <p className="font-label text-sm">No se hallaron productos.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 pt-4 border-t border-[#cbd5e1] dark:border-[#44474e]/20 shrink-0">
        <div className="bg-[#f1f3fd] dark:bg-[#333539]/50 rounded-2xl p-4 border border-[#cbd5e1]/50 dark:border-[#44474e]/30 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-sm animate-pulse">
                sync
              </span>
              <span className="font-label font-bold text-[11px] text-[#2d333d] dark:text-[#e2e2e6] uppercase tracking-wider">
                Auto‑Sincronización
              </span>
            </div>
          </div>
          <p className="font-label text-[10px] text-[#5a5f6a] dark:text-[#c4c7cf] leading-relaxed">
            El sistema detecta nuevos productos autónomamente cada minuto.
          </p>
        </div>
      </div>
    </div>
  </aside>
);
