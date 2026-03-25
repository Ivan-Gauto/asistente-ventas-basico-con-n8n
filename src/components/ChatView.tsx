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
      className="flex-1 overflow-y-auto px-6 pt-6 pb-24 flex flex-col hide-scrollbar scroll-smooth bg-white dark:bg-[#0a0a0a] transition-colors duration-300"
    >
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-6 animate-in fade-in duration-500">
            <div className="max-w-md">
              <div className="w-12 h-12 bg-slate-100 dark:bg-[#161b22] rounded-xl flex items-center justify-center mx-auto mb-4 border border-[#cbd5e1] dark:border-white/5">
                <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-2xl">
                  chat_bubble
                </span>
              </div>
              <h1 className="font-headline font-bold text-xl text-slate-900 dark:text-white mb-1">
                Assistant Services
              </h1>
              <p className="font-body text-[13px] text-slate-600 dark:text-[#8b949e] mb-6">
                How can I help you today?
              </p>
              <div className="grid grid-cols-2 gap-2 text-slate-900 dark:text-white">
                <button
                  onClick={() => setInputValue('Check stock')}
                  className="p-3 bg-white dark:bg-[#111] rounded-lg text-left hover:bg-slate-50 dark:hover:bg-[#161b22] transition-all duration-200 border border-[#cbd5e1] dark:border-white/5 shadow-sm cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-[18px] mb-1.2 block opacity-80 group-hover:opacity-100">
                    inventory_2
                  </span>
                  <span className="font-label font-semibold text-[11px] block opacity-80 group-hover:opacity-100 uppercase tracking-widest text-[#0262a5] dark:text-white">
                    Inventory
                  </span>
                </button>
                <button
                  onClick={() => setInputValue('Sales report')}
                  className="p-3 bg-white dark:bg-[#111] rounded-lg text-left hover:bg-slate-50 dark:hover:bg-[#161b22] transition-all duration-200 border border-[#cbd5e1] dark:border-white/5 shadow-sm cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-[18px] mb-1.2 block opacity-80 group-hover:opacity-100">
                    analytics
                  </span>
                  <span className="font-label font-semibold text-[11px] block opacity-80 group-hover:opacity-100 uppercase tracking-widest text-[#0262a5] dark:text-white">
                    Report
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col pb-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.isUser
                    ? 'flex flex-col items-end w-full animate-in slide-in-from-bottom-2 duration-300'
                    : 'flex flex-col items-start w-full animate-in slide-in-from-bottom-2 duration-300'
                }
              >
                <div
                  className={
                    m.isUser
                      ? 'bg-[#0262a5] dark:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-2xl max-w-[85%] shadow-sm'
                      : 'bg-slate-100 dark:bg-[#161b22] text-slate-900 dark:text-[#e2e2e6] px-4 py-2.5 rounded-2xl max-w-[90%] border border-[#cbd5e1] dark:border-white/5 shadow-sm'
                  }
                >
                  <p className="font-body leading-relaxed whitespace-pre-wrap text-[13px]">{m.text}</p>
                </div>
                <span className="mt-1.5 mx-1 text-[9px] text-[#8b949e] font-label uppercase tracking-widest opacity-60">
                  {m.time} • {m.isUser ? 'User' : 'Assistant'}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col items-start w-full animate-in fade-in duration-300">
                <div className="bg-slate-100 dark:bg-[#161b22] px-4 py-2 rounded-2xl flex items-center gap-1 border border-[#cbd5e1] dark:border-white/5">
                  <div className="w-1 h-1 bg-slate-400 dark:bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-slate-400 dark:bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-slate-400 dark:bg-[#8b949e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <div className="px-6 pb-6 pt-2 absolute bottom-0 w-full bg-gradient-to-t from-white dark:from-[#0a0a0a] via-white/90 dark:via-[#0a0a0a]/90 to-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto relative px-2 pointer-events-auto">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white dark:bg-[#111] rounded-full p-1 pl-4 pr-1 shadow-md focus-within:ring-2 focus-within:ring-[#0262a5]/30 dark:focus-within:ring-[#1d4ed8]/40 transition-all duration-300 border border-[#cbd5e1] dark:border-white/5"
        >
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#8b949e]/50 font-body px-2 py-1.5 outline-none text-[13px]"
            placeholder="Type your message..."
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#0262a5] dark:bg-[#1d4ed8] text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity duration-200 active:scale-95 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </form>
      </div>
    </div>
  </>
);
