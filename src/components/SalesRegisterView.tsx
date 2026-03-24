import React from 'react';

export const SalesRegisterView: React.FC = () => {
  return (
    <div className="flex-1 p-8 bg-white dark:bg-surface min-h-screen overflow-y-auto slide-in-from-bottom-4 animate-in duration-300 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Welcome */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl font-extrabold text-[#2d333d] dark:text-white tracking-tight">Registro de Ventas</h1>
            <p className="text-[#5a5f6a] dark:text-on-surface-variant font-medium mt-1">
              Resumen de actividad para <span className="text-[#0262a5] dark:text-primary font-bold">martes, 24 de oct.</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-[#f9f9ff] dark:bg-surface-container-high border border-[#cbd5e1] dark:border-outline-variant/10 rounded-lg text-xs font-bold text-[#2d333d] dark:text-on-surface flex items-center gap-2 hover:bg-[#e4e8f3] dark:hover:bg-surface-container-highest transition-colors uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              24 oct. 2023
            </button>
            <button className="px-4 py-2 bg-[#f9f9ff] dark:bg-surface-container-high border border-[#cbd5e1] dark:border-outline-variant/10 rounded-lg text-xs font-bold text-[#2d333d] dark:text-on-surface flex items-center gap-2 hover:bg-[#e4e8f3] dark:hover:bg-surface-container-highest transition-colors uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-lg">filter_list</span>
              Filtrar
            </button>
          </div>
        </div>

        {/* 1. Sales Summary Section (Bento Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl shadow-sm border border-[#cbd5e1] dark:border-white/5 group hover:border-[#0262a5]/30 dark:hover:border-primary/30 transition-all duration-500 bg-[#f9f9ff] dark:bg-[#161b22]">
            <div className="flex items-center justify-between mb-6">
              <span className="p-3 bg-[#0262a5]/10 dark:bg-primary/10 rounded-xl group-hover:bg-[#0262a5]/20 dark:group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-[#0262a5] dark:text-primary">payments</span>
              </span>
              <span className="text-[10px] font-bold text-[#0262a5] dark:text-primary bg-[#0262a5]/10 dark:bg-primary/10 px-2 py-1 rounded-md uppercase tracking-widest">+12.5%</span>
            </div>
            <h3 className="text-[#5a5f6a] dark:text-on-surface-variant text-xs font-bold uppercase tracking-widest">Ventas Totales Hoy</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold font-headline text-[#2d333d] dark:text-white">$14,290.50</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl shadow-sm border border-[#cbd5e1] dark:border-white/5 group hover:border-[#0262a5]/30 dark:hover:border-primary/30 transition-all duration-500 bg-[#f9f9ff] dark:bg-[#161b22]">
            <div className="flex items-center justify-between mb-6">
              <span className="p-3 bg-black/5 dark:bg-white/5 rounded-xl group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#5a5f6a] dark:text-on-surface-variant">receipt</span>
              </span>
              <span className="text-[10px] font-bold text-[#5a5f6a] dark:text-on-surface-variant bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md uppercase tracking-widest">Prom: $240</span>
            </div>
            <h3 className="text-[#5a5f6a] dark:text-on-surface-variant text-xs font-bold uppercase tracking-widest">Transacciones Totales</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold font-headline text-[#2d333d] dark:text-white">58</span>
              <span className="text-[#5a5f6a] dark:text-on-surface-variant text-xs font-bold uppercase tracking-widest ml-1">entradas</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl shadow-sm border border-[#cbd5e1] dark:border-white/5 group hover:border-[#0262a5]/30 dark:hover:border-primary/30 transition-all duration-500 bg-[#f9f9ff] dark:bg-[#161b22]">
            <div className="flex items-center justify-between mb-6">
              <span className="p-3 bg-black/5 dark:bg-white/5 rounded-xl group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-[#5a5f6a] dark:text-on-surface-variant">analytics</span>
              </span>
              <span className="text-[10px] font-bold text-[#0262a5]/80 dark:text-primary/80 bg-[#0262a5]/10 dark:bg-primary/10 px-2 py-1 rounded-md uppercase tracking-widest">Alto Valor</span>
            </div>
            <h3 className="text-[#5a5f6a] dark:text-on-surface-variant text-xs font-bold uppercase tracking-widest">Valor Promedio Venta</h3>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold font-headline text-[#2d333d] dark:text-white">$246.38</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-extrabold font-headline text-[#2d333d] dark:text-white uppercase tracking-tight">Transacciones Recientes</h2>
              <button className="text-[#0262a5] dark:text-primary text-[10px] font-extrabold uppercase tracking-widest hover:brightness-125 transition-colors">Ver Todo</button>
            </div>
            <div className="bg-white dark:bg-[#0f1218] rounded-2xl shadow-sm overflow-hidden border border-[#cbd5e1] dark:border-white/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f9f9ff] dark:bg-[#161b22]/50 border-b border-[#cbd5e1] dark:border-white/5">
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-widest">Fecha / Hora</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-widest">Artículo(s)</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-widest">Cliente</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-widest">Monto</th>
                    <th className="px-6 py-4 text-[10px] font-extrabold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-widest text-center">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#cbd5e1] dark:divide-white/5">
                  {[
                    { id: '88219', time: '24 oct., 02:14 PM', items: 'Bufanda de Cachemira de Lujo', customer: 'Julian Smith', initials: 'JS', amount: '$450.00', status: 'Completado' },
                    { id: '88218', time: '24 oct., 01:55 PM', items: 'Cinturón de Cuero Italiano', customer: 'Elena Aris', initials: 'EA', amount: '$185.20', status: 'Pendiente' },
                    { id: '88217', time: '24 oct., 12:30 PM', items: 'Vestido de Noche de Seda', customer: 'Maria Rossi', initials: 'MR', amount: '$1,299.00', status: 'Completado' },
                    { id: '88216', time: '24 oct., 11:15 AM', items: 'Juego de Gemelos - Plata', customer: 'Invitado', initials: 'CI', amount: '$89.00', status: 'Completado' },
                  ].map((row) => (
                    <tr key={row.id} className="hover:bg-[#f9f9ff] dark:hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-[#2d333d] dark:text-white">{row.time}</p>
                        <p className="text-[10px] font-bold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-wider">#{row.id}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-semibold text-[#2d333d] dark:text-on-surface">{row.items}</p>
                        {row.id === '88219' && <p className="text-[10px] font-bold text-[#0262a5] dark:text-primary uppercase tracking-tight">+2 otros artículos</p>}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-lg ${row.customer === 'Invitado' ? 'bg-[#5a5f6a]/10' : 'bg-[#0262a5]/10 text-[#0262a5] dark:bg-primary/10 dark:text-primary'} flex items-center justify-center text-[10px] font-bold`}>
                            {row.initials}
                          </div>
                          <span className="text-sm font-semibold text-[#2d333d] dark:text-white">{row.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-extrabold text-sm text-[#2d333d] dark:text-white">{row.amount}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest ${row.status === 'Completado' ? 'bg-[#0262a5]/10 text-[#0262a5] dark:bg-primary/10 dark:text-primary' : 'bg-[#5a5f6a]/10 text-[#5a5f6a] dark:text-on-surface-variant border border-[#cbd5e1] dark:border-white/5'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-white dark:bg-[#0f1218] p-6 rounded-2xl shadow-sm border border-[#cbd5e1] dark:border-white/5">
              <h3 className="text-[10px] font-extrabold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0262a5] dark:text-primary text-lg">workspace_premium</span>
                Mejores Productos
              </h3>
              <div className="space-y-5">
                {[
                  { name: 'Bufanda Cachemira', qty: '12 uds', val: '$1.8k', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxBWHSY0uX_08_Qcw9jZpxZ-wYI0ADjuQeQsqdu0izTtT5z1VGz5fVrnT9fnDIHijeaqhazklTX1SI5_UONUO9dU5zCDkdksEaWVr12NvW5meQFOpTfUCNzSVD7raTQulQGfS-YmTwk4S99MlKb1D6e5bkAWs54WZsPmrHkBMpQ7IMxRavXEokrGk8mBf0Sg_RMgf38oMRHVwoVbE7hZAC_QNYR8_yomr7VjGUMVUX-od8NfQP-uG1Jpnvb11vz_KfJZHC_7GYfVMf' },
                  { name: 'Blazer Marino', qty: '8 uds', val: '$4.2k', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSfUxd6k9OGmJXgXfvH_FIve27-Ku71kQ53PdcWuZ8h6Kj4TO6PtqJox04-oZrqTj_2cUbMMqrVZ37LVN8oVrurZ3p5XSwa70hq1gT0meKBQt23KFioDCkHw8l9-yZzaKpcd0rGlnY966ejiGC1WTktNm_7hGCnLnSX03MG4W3Hm30XNb3TVJslUYtoV411qaj3PSevl69ZxOaIEk09yrQMznm1RbTBpz91hieI6oXd1brjK3sC4MG9OsSupjyV4Zgk_4AxCpCq-TM' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-[#f1f3fd] dark:bg-[#1e293b] overflow-hidden shrink-0 border border-[#cbd5e1] dark:border-white/5">
                      <img alt={p.name} className="w-full h-full object-cover" src={p.img} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#2d333d] dark:text-white truncate">{p.name}</p>
                      <p className="text-[10px] font-bold text-[#5a5f6a] dark:text-on-surface-variant uppercase tracking-tight">{p.qty}</p>
                    </div>
                    <p className="text-xs font-extrabold text-[#0262a5] dark:text-primary">{p.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0262a5] dark:bg-primary p-6 rounded-2xl text-white dark:text-[#050608] shadow-lg relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-9xl">target</span>
              </div>
              <h4 className="font-headline font-extrabold text-lg uppercase tracking-tight mb-2">Meta Diaria</h4>
              <p className="text-xs font-bold opacity-90 mb-5 leading-relaxed">Estás a $2,400 de alcanzar el objetivo de $18k.</p>
              <div className="w-full bg-white/20 dark:bg-[#050608]/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white dark:bg-[#050608] h-full shadow-sm" style={{ width: '82%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <p className="text-[10px] font-extrabold uppercase tracking-widest">82% Alcanzado</p>
                <span className="material-symbols-outlined text-sm">trending_up</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
