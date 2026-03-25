import React from 'react';

export const SalesRegisterView: React.FC = () => {
  return (
    <div className="flex-1 p-6 bg-white dark:bg-[#0a0a0a] min-h-screen overflow-y-auto slide-in-from-bottom-2 animate-in duration-300 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-2xl font-bold text-slate-900 dark:text-white tracking-tight italic uppercase opacity-80">Sales log</h1>
            <p className="text-[13px] text-slate-500 dark:text-[#8b949e] font-medium mt-0.5">
              Updates for <span className="text-[#0262a5] dark:text-[#65a7ef] font-bold">Tuesday, Oct 24</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white dark:bg-[#111] border border-[#cbd5e1] dark:border-white/5 rounded-md text-[11px] font-bold text-slate-500 dark:text-[#8b949e] flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-[#161b22] transition-colors uppercase tracking-widest shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              Oct 24
            </button>
            <button className="px-3 py-1.5 bg-white dark:bg-[#111] border border-[#cbd5e1] dark:border-white/5 rounded-md text-[11px] font-bold text-slate-500 dark:text-[#8b949e] flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-[#161b22] transition-colors uppercase tracking-widest shadow-sm cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              Filter
            </button>
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl shadow-sm border border-[#cbd5e1] dark:border-white/5 transition-all duration-300 bg-white dark:bg-[#111]">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-[#0262a5]/5 dark:bg-[#65a7ef]/10 rounded-lg">
                <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-[18px]">payments</span>
              </span>
              <span className="text-[9px] font-bold text-white bg-[#0262a5] dark:bg-[#65a7ef] px-1.5 py-0.5 rounded uppercase tracking-widest">+12.5%</span>
            </div>
            <h3 className="text-slate-400 dark:text-[#8b949e] text-[10px] font-bold uppercase tracking-widest">Revenue</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-headline text-slate-900 dark:text-white">$14,290.50</span>
            </div>
          </div>

          <div className="p-4 rounded-xl shadow-sm border border-[#cbd5e1] dark:border-white/5 transition-all duration-300 bg-white dark:bg-[#111]">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-slate-500 dark:text-white text-[18px]">receipt</span>
              </span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-[#8b949e] bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded uppercase tracking-widest">Avg: $240</span>
            </div>
            <h3 className="text-slate-400 dark:text-[#8b949e] text-[10px] font-bold uppercase tracking-widest">Sales</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-headline text-slate-900 dark:text-white">58</span>
            </div>
          </div>

          <div className="p-4 rounded-xl shadow-sm border border-[#cbd5e1] dark:border-white/5 transition-all duration-300 bg-white dark:bg-[#111]">
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                <span className="material-symbols-outlined text-slate-500 dark:text-white text-[18px]">analytics</span>
              </span>
              <span className="text-[9px] font-bold text-white dark:text-[#0a0a0a] bg-slate-900 dark:bg-[#65a7ef] px-1.5 py-0.5 rounded uppercase tracking-widest">Target</span>
            </div>
            <h3 className="text-slate-400 dark:text-[#8b949e] text-[10px] font-bold uppercase tracking-widest">Average</h3>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold font-headline text-slate-900 dark:text-white">$246.38</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[13px] font-bold text-slate-400 dark:text-white uppercase tracking-widest opacity-40">Orders Log</h2>
              <button className="text-[#0262a5] dark:text-[#65a7ef] text-[9px] font-bold uppercase tracking-widest hover:brightness-125 transition-colors cursor-pointer">Full view</button>
            </div>
            <div className="bg-white dark:bg-[#111] shadow-sm overflow-hidden border border-[#cbd5e1] dark:border-white/5 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#161b22]/50 border-b border-[#cbd5e1] dark:border-white/5">
                    <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-widest">Time</th>
                    <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-widest">Product</th>
                    <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-widest">User</th>
                    <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-widest">Total</th>
                    <th className="px-4 py-2.5 text-[9px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-widest text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cbd5e1] dark:divide-white/5">
                  {[
                    { id: '88219', time: 'Oct 24, 02:14 PM', items: 'Lux Scarf', customer: 'Julian Smith', initials: 'JS', amount: '$450.00', status: 'PAID' },
                    { id: '88218', time: 'Oct 24, 01:55 PM', items: 'Leather Belt', customer: 'Elena Aris', initials: 'EA', amount: '$185.20', status: 'PND' },
                    { id: '88217', time: 'Oct 24, 12:30 PM', items: 'Silk Dress', customer: 'Maria Rossi', initials: 'MR', amount: '$1,299.00', status: 'PAID' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                      <td className="px-4 py-3">
                        <p className="text-[12px] font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{row.time}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-[12px] font-semibold text-slate-600 dark:text-white/90">{row.items}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold ${row.customer === 'Invitado' ? 'bg-slate-100 text-slate-400' : 'bg-[#0262a5]/10 text-[#0262a5] dark:bg-[#65a7ef]/10 dark:text-[#65a7ef]'}`}>
                            {row.initials}
                          </div>
                          <span className="text-[12px] text-slate-500 dark:text-white/80">{row.customer}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-[12px] text-slate-900 dark:text-white">{row.amount}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${row.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 shadow-sm' : 'bg-amber-500/10 text-amber-600 dark:text-amber-500'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white dark:bg-[#111] p-4 rounded-xl border border-[#cbd5e1] dark:border-white/5 shadow-sm">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-widest mb-4 italic opacity-80">Inventory flow</h3>
              <div className="space-y-3">
                {[
                  { name: 'Lux Scarf', qty: '12 uds', val: '$1.8k' },
                  { name: 'Dark Blazer', qty: '8 uds', val: '$4.2k' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-md bg-slate-50 dark:bg-[#0a0a0a] shrink-0 border border-[#cbd5e1] dark:border-white/5 group-hover:bg-[#0262a5]/5 transition-colors"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">{p.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 dark:text-[#8b949e] uppercase tracking-tight">{p.qty}</p>
                    </div>
                    <p className="text-[11px] font-bold text-[#0262a5] dark:text-[#65a7ef]">{p.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-100 dark:bg-[#111] p-4 rounded-xl text-slate-900 dark:text-white border border-[#cbd5e1] dark:border-white/5 relative overflow-hidden group shadow-sm">
              <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0">
                <span className="material-symbols-outlined text-7xl">target</span>
              </div>
              <h4 className="font-headline font-bold text-[11px] uppercase tracking-widest mb-1 opacity-70">Daily Goal</h4>
              <p className="text-[10px] font-medium text-slate-500 dark:text-white/60 mb-3 leading-tight">Need $2,400 more for reach $18k.</p>
              <div className="w-full bg-white dark:bg-[#0a0a0a] h-1.5 rounded-full overflow-hidden border border-[#cbd5e1] dark:border-white/5">
                <div className="bg-[#0262a5] dark:bg-[#65a7ef] h-full shadow-sm" style={{ width: '82%' }}></div>
              </div>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-widest text-[#0262a5] dark:text-[#65a7ef]">82% Achieved</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
