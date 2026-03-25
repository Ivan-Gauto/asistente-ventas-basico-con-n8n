import React from 'react';
import { LocalProduct } from '../hooks/useStock';

type Props = {
  storeName: string;
  stockItems: LocalProduct[];
  isFetching: boolean;
};

export const RightPanel: React.FC<Props> = ({ storeName, stockItems, isFetching }) => (
  <aside className="w-72 flex flex-col bg-white dark:bg-[#0a0a0a] border-l border-[#cbd5e1] dark:border-white/5 h-full transition-colors duration-300">
    <div className="p-4 h-full flex flex-col pt-6">
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="font-headline font-bold text-slate-400 dark:text-white uppercase tracking-tight text-[11px] opacity-60">Status</h2>
        <span className="px-1.5 py-0.5 bg-[#0262a5]/10 dark:bg-[#65a7ef]/10 text-[#0262a5] dark:text-[#65a7ef] text-[9px] font-bold rounded uppercase tracking-wider">
          LIVE
        </span>
      </div>

      <p className="font-label text-[11px] font-medium text-slate-500 dark:text-[#8b949e] mb-4">
        Store: <span className="text-[#0262a5] dark:text-[#65a7ef] font-bold">{storeName}</span>
      </p>

      <div className="flex-1 flex flex-col overflow-hidden">
        {isFetching && stockItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400 dark:text-[#8b949e] animate-in fade-in duration-300">
            <span className="material-symbols-outlined text-4xl mb-3 animate-spin text-[#0262a5] dark:text-[#65a7ef]">
              sync
            </span>
          </div>
        ) : (
          <div className="space-y-1.5 overflow-y-auto hide-scrollbar flex-1 pb-4 animate-in fade-in duration-500">
            {stockItems.length > 0 ? (
              stockItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-slate-50 dark:bg-[#161b22] rounded-lg flex items-start gap-2.5 hover:bg-slate-100 dark:hover:bg-[#1d2127] transition-all duration-200 border border-[#cbd5e1] dark:border-white/5 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-md bg-white dark:bg-[#0a0a0a] flex items-center justify-center flex-shrink-0 border border-[#cbd5e1] dark:border-white/5">
                    <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-[18px]">
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

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-label font-bold text-[12px] text-slate-900 dark:text-white truncate">
                        {item.name}
                      </span>
                      <span className="font-label font-bold text-[12px] text-[#0262a5] dark:text-[#65a7ef] shrink-0">
                        {item.price}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-0.5">
                      <span className="font-label text-[10px] text-slate-500 dark:text-[#8b949e]">
                        Stock: {item.stock}
                      </span>
                      <span
                        className={`w-1 h-1 rounded-full ${
                          item.stock > 10
                            ? 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]'
                            : item.stock > 0
                            ? 'bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.5)]'
                            : 'bg-red-500 animate-pulse shadow-[0_0_4px_rgba(239,68,68,0.5)]'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 text-[#8b949e]">
                <p className="font-label text-[11px]">No items found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 pt-3 border-t border-[#cbd5e1] dark:border-white/5 shrink-0">
        <div className="bg-slate-50 dark:bg-[#161b22] rounded-xl p-3 border border-[#cbd5e1] dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-[#65a7ef] text-[16px] animate-pulse">
              sync
            </span>
            <span className="font-label font-bold text-[10px] text-slate-900 dark:text-white uppercase tracking-wider">
              AUTO-SINC
            </span>
          </div>
          <p className="font-label text-[10px] text-slate-500 dark:text-[#8b949e] leading-tight opacity-80">
            Escaneo de stock en tiempo real activo.
          </p>
        </div>
      </div>
    </div>
  </aside>
);
