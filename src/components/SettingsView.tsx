import React from 'react';

type Props = {
  webhookUrl: string;
  setWebhookUrl: (v: string) => void;
  storeName: string;
  setStoreName: (v: string) => void;
  saveSettings: () => void;
};

export const SettingsView: React.FC<Props> = ({
  webhookUrl,
  setWebhookUrl,
  storeName,
  setStoreName,
  saveSettings,
}) => (
  <div className="flex-1 w-full overflow-y-auto px-10 py-10 flex flex-col slide-in-from-bottom-4 animate-in duration-300">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-extrabold font-headline mb-8 text-[#2d333d] dark:text-white tracking-tight">
        Configuración del Sistema
      </h2>

      {/* Conexión n8n */}
      <div className="p-8 bg-[#ffffff] dark:bg-[#1a1c1e] rounded-3xl border border-[#adb2bf]/20 dark:border-[#44474e]/30 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0262a5] dark:bg-[#65a7ef]" />
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-2xl">cable</span>
          <h3 className="text-xl font-bold font-headline text-[#2d333d] dark:text-[#e2e2e6]">
            Conexión a n8n API
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-label font-bold text-[#5a5f6a] dark:text-[#c4c7cf] mb-2">
              Webhook URL de Producción
            </label>
            <input
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full bg-[#f1f3fd] dark:bg-[#282a2e] border border-[#adb2bf]/20 dark:border-[#44474e]/30 p-4 rounded-xl text-[#2d333d] dark:text-[#e2e2e6] outline-none focus:ring-2 focus:ring-[#0262a5]/50 transition-all font-body"
              placeholder="Ej. /webhook/mi-chat-bot"
            />
            <p className="mt-2 text-xs text-[#5a5f6a] dark:text-[#c4c7cf] font-body opacity-80">
              Ruta por defecto local para invocar el flujo del Agente Inteligente.
            </p>
          </div>
        </div>
      </div>

      {/* Perfil del local */}
      <div className="p-8 bg-[#ffffff] dark:bg-[#1a1c1e] rounded-3xl border border-[#adb2bf]/20 dark:border-[#44474e]/30 shadow-sm relative overflow-hidden mt-8">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0262a5] dark:bg-[#65a7ef]" />
        <div className="flex items-center gap-3 mb-6">
          <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-2xl">storefront</span>
          <h3 className="text-xl font-bold font-headline text-[#2d333d] dark:text-[#e2e2e6]">
            Perfil del Local Comercial
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-label font-bold text-[#5a5f6a] dark:text-[#c4c7cf] mb-2">
              Nombre o ID del Local
            </label>
            <input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-[#f1f3fd] dark:bg-[#282a2e] border border-[#adb2bf]/20 dark:border-[#44474e]/30 p-4 rounded-xl text-[#2d333d] dark:text-[#e2e2e6] outline-none focus:ring-2 focus:ring-[#0262a5]/50 transition-all font-body font-bold"
              placeholder="Mi Kiosco Central"
            />
          </div>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="pt-4 flex items-center gap-4 mt-8">
        <button
          onClick={saveSettings}
          className="bg-gradient-to-br from-[#0262a5] to-[#005692] dark:from-[#65a7ef] dark:to-[#00497d] text-white py-4 px-8 rounded-xl font-headline font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all active:scale-95 shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined">save</span>
          Guardar Configuración
        </button>
      </div>
    </div>
  </div>
);
