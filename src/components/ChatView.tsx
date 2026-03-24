import React from 'react';
import { Message } from '../types';

type Props = {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  setInputValue: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  chatFeedRef: React.RefObject<HTMLDivElement>;
};

export const ChatView: React.FC<Props> = ({
  messages,
  isTyping,
  inputValue,
  setInputValue,
  handleSubmit,
  chatFeedRef,
}) => (
  <>
    <div
      ref={chatFeedRef}
      className="flex-1 overflow-y-auto px-8 pt-8 pb-32 flex flex-col hide-scrollbar scroll-smooth bg-white dark:bg-[#0c0e13]"
    >
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-12">
          <div className="max-w-md">
            <div className="w-16 h-16 bg-[#0262a5]/10 dark:bg-[#00497d]/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#0262a5]/20">
              <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-3xl">
                chat_bubble
              </span>
            </div>
            <h1 className="font-headline font-bold text-2xl text-[#2d333d] dark:text-[#e2e2e6] mb-2">
              ¿En qué puedo ayudarte hoy?
            </h1>
            <p className="font-body text-[#5a5f6a] dark:text-[#c4c7cf] mb-8">
              Listo para gestionar el inventario, revisar pedidos o redactar mensajes para tus clientes.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setInputValue('Revisar inventario')}
                className="p-4 bg-[#f9f9ff] dark:bg-[#1a1c1e] rounded-xl text-left hover:brightness-95 transition-all duration-200 border border-[#cbd5e1] dark:border-[#44474e]/20 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] mb-2 block">
                  inventory_2
                </span>
                <span className="font-label font-semibold text-sm block text-[#2d333d] dark:text-[#e2e2e6]">
                  Revisar Inventario
                </span>
                <span className="font-label text-xs text-[#5a5f6a] dark:text-[#c4c7cf]">
                  Niveles de stock reales
                </span>
              </button>
              <button
                onClick={() => setInputValue('Reporte de ventas')}
                className="p-4 bg-[#f9f9ff] dark:bg-[#1a1c1e] rounded-xl text-left hover:brightness-95 transition-all duration-200 border border-[#cbd5e1] dark:border-[#44474e]/20 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] mb-2 block">
                  analytics
                </span>
                <span className="font-label font-semibold text-sm block text-[#2d333d] dark:text-[#e2e2e6]">
                  Reporte de Ventas
                </span>
                <span className="font-label text-xs text-[#5a5f6a] dark:text-[#c4c7cf]">
                  Rendimiento diario
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 flex flex-col pb-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.isUser
                  ? 'flex flex-col items-end w-full animate-in slide-in-from-right-4 duration-300'
                  : 'flex flex-col items-start max-w-3xl animate-in slide-in-from-left-4 duration-300'
              }
            >
              <div
                className={
                  m.isUser
                    ? 'bg-[#0262a5] text-white p-4 rounded-2xl rounded-tr-sm shadow-md max-w-[70%]'
                    : 'bg-[#f1f3fd] dark:bg-[#282a2e] text-[#2d333d] dark:text-[#e2e2e6] p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] border border-[#cbd5e1] dark:border-[#44474e]/20'
                }
              >
                <p className="font-body leading-relaxed whitespace-pre-wrap text-sm">{m.text}</p>
              </div>
              <span className="mt-1.5 mx-1 text-[10px] text-[#5a5f6a] dark:text-[#c4c7cf] font-label uppercase tracking-widest opacity-80">
                {m.time} • {m.isUser ? 'Vendedor' : 'Asistente IA'}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col items-start max-w-3xl animate-in fade-in duration-300">
              <div className="bg-[#f1f3fd] dark:bg-[#282a2e] p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 border border-[#cbd5e1] dark:border-[#44474e]/20">
                <div className="w-1.5 h-1.5 bg-[#5a5f6a] dark:bg-[#c4c7cf] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-[#5a5f6a] dark:bg-[#c4c7cf] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-[#5a5f6a] dark:bg-[#c4c7cf] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    <div className="px-8 pb-8 pt-4 absolute bottom-0 w-full bg-gradient-to-t from-white dark:from-[#0c0e13] via-white/80 dark:via-[#0c0e13]/80 to-transparent">
      <div className="max-w-4xl mx-auto relative">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-[#f9f9ff] dark:bg-[#1a1c1e] rounded-full p-2 pl-6 pr-2 shadow-sm focus-within:ring-2 focus-within:ring-[#0262a5]/40 dark:focus-within:ring-[#65a7ef]/40 transition-all duration-300 border border-[#cbd5e1] dark:border-[#44474e]/20"
        >
          <button
            type="button"
            className="p-2 text-[#5a5f6a] dark:text-[#c4c7cf] hover:text-[#0262a5] dark:hover:text-[#65a7ef] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-[#2d333d] dark:text-[#e2e2e6] placeholder:text-[#5a5f6a]/60 dark:placeholder:text-[#c4c7cf]/60 font-body px-4 py-3 outline-none"
            placeholder="Escribe tu instrucción o consulta aquí..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#0262a5] dark:bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center hover:translate-y-[-2px] transition-transform duration-200 active:scale-95 shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </div>
    </div>
  </>
);
