import React, { useState, useRef, useEffect } from 'react';
import { createN8nWorkflow, sendToN8nWebhook } from './n8nApi';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  time: string;
};

type LocalProduct = {
  name: string;
  price: string;
  stock: number;
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [stockItems, setStockItems] = useState<LocalProduct[]>([]);
  const [isFetchingStock, setIsFetchingStock] = useState(false);
  const chatFeedRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('chat');
  
  const [storeName, setStoreName] = useState(() => {
    return localStorage.getItem('storeName') || 'Mi Kiosco Central';
  });
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('n8nWebhookUrl') || import.meta.env.VITE_N8N_WEBHOOK_URL || '/webhook-test/mi-chat-bot';
  });

  const scrollToBottom = () => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Autoload stock on startup and auto-refresh
  useEffect(() => {
    fetchStock();
    
    // Auto-refresh every 2 minutes mapped into memory
    const intervalId = setInterval(() => {
      fetchStock();
    }, 120000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const fetchStock = async () => {
    setIsFetchingStock(true);
    try {
      const resp = await sendToN8nWebhook(
        'Escribe SÓLO un array JSON válido con todo el stock disponible en Airtable. Ejemplo de respuesta esperada: [{"name": "item", "price": "100", "stock": 5}]. Sin bloques de código markdown, sólo el texto JSON puro.',
        'system-fetch-stock',
        webhookUrl
      );
      
      let textResponse = "";
      if (typeof resp === 'string') textResponse = resp;
      else if (resp.response) textResponse = resp.response;
      else if (resp.output) textResponse = resp.output;
      else if (resp.message) textResponse = resp.message;

      const jsonMatch = textResponse.match(/\[.*\]/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStockItems(parsed);
        }
      }
    } catch (e) {
      console.error('Error fetching stock:', e);
    }
    setIsFetchingStock(false);
  };

  const saveSettings = () => {
    localStorage.setItem('n8nWebhookUrl', webhookUrl);
    localStorage.setItem('storeName', storeName);
    alert('Configuración guardada exitosamente.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      time,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');

    // Simulated Assistant Flow & n8n API Integration
    setTimeout(async () => {
      setIsTyping(true);
      const isWorkflowCreation = text.toLowerCase().startsWith('crear workflow');
      
      try {
        let aiResponseText = "";
        
        if (isWorkflowCreation) {
          const workflowName = text.replace(/crear workflow/i, '').trim() || "Test desde IA";
          await createN8nWorkflow(workflowName);
          aiResponseText = `¡Listo! He creado el flujo "${workflowName}" en tu n8n local correctamente.`;
        } else {
          // Send to webhook!
          let data;
          try {
             data = await sendToN8nWebhook(text, "chat-react-session", webhookUrl);
          } catch(err: any) {
             throw new Error(`Fallback al webhook falló: ${err.message}`);
          }
          
          if (typeof data === 'string') aiResponseText = data;
          else if (data.response) aiResponseText = data.response;
          else if (data.message) aiResponseText = data.message;
          else if (data.output) aiResponseText = data.output;
          else aiResponseText = JSON.stringify(data, null, 2);
        }
        
        setTimeout(() => {
          setIsTyping(false);
          const newAiMsg: Message = {
            id: Date.now().toString() + 'ai',
            text: aiResponseText,
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, newAiMsg]);
        }, 1000);

      } catch (error: any) {
        setIsTyping(false);
        const errorMsg: Message = {
          id: Date.now().toString() + 'ai-err',
          text: `Error de conexión con n8n: ${error.message} (Revisa que tu servidor local esté activo).`,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    }, 600);
  };

  return (
    <div className="bg-background text-on-background flex h-screen w-full flex-1 overflow-hidden font-body">
      {/* SideNavBar */}
      <aside className="h-screen w-64 flex flex-col p-4 gap-2 bg-[#f9f9ff] dark:bg-slate-950 border-r border-outline-variant/10 font-headline font-medium text-sm z-50">
        <div className="px-2 mb-8 mt-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold shadow-lg">SC</div>
            <div>
              <h2 className="text-xl font-bold text-[#0262a5] dark:text-[#65a7ef] tracking-tight leading-none">Asistente de Ventas</h2>
              <span className="text-[10px] text-[#5a5f6a] dark:text-slate-400 font-bold uppercase tracking-wider">Asistente Principal</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          <a onClick={() => setActiveTab('chat')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${activeTab === 'chat' ? 'bg-[#f1f3fd] dark:bg-slate-900 text-[#0262a5] dark:text-[#65a7ef] font-bold' : 'text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900'}`}>
            <span className="material-symbols-outlined">dashboard</span>
            <span>Panel General</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 rounded-lg transition-colors duration-200 cursor-pointer">
            <span className="material-symbols-outlined">inventory_2</span>
            <span>Inventario</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900 rounded-lg transition-colors duration-200 cursor-pointer">
            <span className="material-symbols-outlined">receipt_long</span>
            <span>Registro de Ventas</span>
          </a>
          <a onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 cursor-pointer ${activeTab === 'settings' ? 'bg-[#f1f3fd] dark:bg-slate-900 text-[#0262a5] dark:text-[#65a7ef] font-bold' : 'text-[#5a5f6a] dark:text-slate-400 hover:bg-[#f1f3fd] dark:hover:bg-slate-900'}`}>
            <span className="material-symbols-outlined">settings</span>
            <span>Configuración</span>
          </a>
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant/10 pt-4">
          <button className="mb-4 w-full bg-primary text-on-primary dark:text-on-primary-fixed font-bold py-3 rounded-xl shadow-md hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 h-16 bg-[#f9f9ff]/70 dark:bg-slate-950/70 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/10">
          <div className="flex items-center gap-4">
            <span className="text-xl font-extrabold tracking-tight text-[#2d333d] dark:text-slate-50 font-headline">Asistente de Ventas</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-surface-container-highest dark:hover:bg-slate-800 transition-colors duration-200 active:scale-95 text-[#5a5f6a] dark:text-slate-400"
            >
              <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </header>

        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col bg-surface-container-lowest dark:bg-[#0c0e13] relative">
            
            {/* Chat View */}
            {activeTab === 'chat' && (
              <>
                {/* Chat Feed */}
                <div ref={chatFeedRef} className="flex-1 overflow-y-auto px-8 pt-8 pb-32 flex flex-col hide-scrollbar scroll-smooth">
                  
                  {messages.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center mt-12">
                      <div className="max-w-md">
                        <div className="w-16 h-16 bg-[#65a7ef]/20 dark:bg-[#00497d]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-3xl">chat_bubble</span>
                        </div>
                        <h1 className="font-headline font-bold text-2xl text-[#2d333d] dark:text-[#e2e2e6] mb-2">¿En qué puedo ayudarte hoy?</h1>
                        <p className="font-body text-[#5a5f6a] dark:text-[#c4c7cf] mb-8">Listo para gestionar el inventario, revisar pedidos o redactar mensajes para tus clientes.</p>
                        <div className="grid grid-cols-2 gap-3">
                          <button onClick={() => setInputValue("Revisar inventario")} className="p-4 bg-[#f1f3fd] dark:bg-[#1a1c1e] rounded-xl text-left hover:brightness-95 dark:hover:brightness-125 transition-all duration-200 border border-[#adb2bf]/20 dark:border-[#44474e]/20 shadow-sm cursor-pointer">
                            <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] mb-2 block">inventory_2</span>
                            <span className="font-label font-semibold text-sm block text-[#2d333d] dark:text-[#e2e2e6]">Revisar Inventario</span>
                            <span className="font-label text-xs text-[#5a5f6a] dark:text-[#c4c7cf]">Niveles de stock reales</span>
                          </button>
                          <button onClick={() => setInputValue("Reporte de ventas")} className="p-4 bg-[#f1f3fd] dark:bg-[#1a1c1e] rounded-xl text-left hover:brightness-95 dark:hover:brightness-125 transition-all duration-200 border border-[#adb2bf]/20 dark:border-[#44474e]/20 shadow-sm cursor-pointer">
                            <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] mb-2 block">analytics</span>
                            <span className="font-label font-semibold text-sm block text-[#2d333d] dark:text-[#e2e2e6]">Reporte de Ventas</span>
                            <span className="font-label text-xs text-[#5a5f6a] dark:text-[#c4c7cf]">Rendimiento diario</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 flex flex-col pb-6">
                      {messages.map((m) => (
                        <div key={m.id} className={m.isUser ? 'flex flex-col items-end w-full animate-in slide-in-from-right-4 duration-300' : 'flex flex-col items-start max-w-3xl animate-in slide-in-from-left-4 duration-300'}>
                          <div className={m.isUser ? 'bg-[#0262a5] text-white p-4 rounded-2xl rounded-tr-sm shadow-md max-w-[70%]' : 'bg-[#e4e8f3] dark:bg-[#282a2e] text-[#2d333d] dark:text-[#e2e2e6] p-4 rounded-2xl rounded-tl-sm shadow-sm max-w-[85%] border border-[#adb2bf]/10 dark:border-[#44474e]/20'}>
                            <p className="font-body leading-relaxed whitespace-pre-wrap text-sm">{m.text}</p>
                          </div>
                          <span className="mt-1.5 mx-1 text-[10px] text-[#5a5f6a] dark:text-[#c4c7cf] font-label uppercase tracking-widest opacity-80">
                            {m.time} • {m.isUser ? 'Vendedor' : 'Asistente IA'}
                          </span>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex flex-col items-start max-w-3xl animate-in fade-in duration-300">
                          <div className="bg-[#e4e8f3] dark:bg-[#282a2e] p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 border border-[#adb2bf]/10 dark:border-[#44474e]/20">
                            <div className="w-1.5 h-1.5 bg-[#5a5f6a] dark:bg-[#c4c7cf] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-[#5a5f6a] dark:bg-[#c4c7cf] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1.5 h-1.5 bg-[#5a5f6a] dark:bg-[#c4c7cf] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="px-8 pb-8 pt-4 absolute bottom-0 w-full bg-gradient-to-t from-[#ffffff] dark:from-[#0c0e13] via-[#ffffff]/90 dark:via-[#0c0e13]/90 to-transparent">
                  <div className="max-w-4xl mx-auto relative">
                    <form onSubmit={handleSubmit} className="flex items-center bg-[#e4e8f3] dark:bg-[#1a1c1e] rounded-full p-2 pl-6 pr-2 shadow-sm focus-within:ring-2 focus-within:ring-[#0262a5]/40 dark:focus-within:ring-[#65a7ef]/40 transition-all duration-300 border border-[#adb2bf]/10 dark:border-[#44474e]/20">
                      <button type="button" className="p-2 text-[#5a5f6a] dark:text-[#c4c7cf] hover:text-[#0262a5] dark:hover:text-[#65a7ef] transition-colors cursor-pointer">
                        <span className="material-symbols-outlined">attach_file</span>
                      </button>
                      <input 
                        className="flex-1 bg-transparent border-none focus:ring-0 text-[#2d333d] dark:text-[#e2e2e6] placeholder:text-[#5a5f6a]/60 dark:placeholder:text-[#c4c7cf]/60 font-body px-4 py-3 outline-none" 
                        placeholder="Escribe tu instrucción o consulta aquí..." 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <button type="submit" className="bg-gradient-to-br from-[#0262a5] to-[#005692] dark:from-[#65a7ef] dark:to-[#00497d] text-white w-12 h-12 rounded-full flex items-center justify-center hover:translate-y-[-2px] transition-transform duration-200 active:scale-95 shadow-lg shadow-[#0262a5]/20 cursor-pointer">
                        <span className="material-symbols-outlined">send</span>
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}

            {/* Settings View */}
            {activeTab === 'settings' && (
              <div className="flex-1 w-full overflow-y-auto px-10 py-10 flex flex-col slide-in-from-bottom-4 animate-in duration-300">
                <div className="max-w-3xl">
                  <h2 className="text-3xl font-extrabold font-headline mb-8 text-[#2d333d] dark:text-white tracking-tight">Configuración del Sistema</h2>
                  
                  <div className="space-y-8">
                    {/* Sección: Conexión n8n */}
                    <div className="p-8 bg-[#ffffff] dark:bg-[#1a1c1e] rounded-3xl border border-[#adb2bf]/20 dark:border-[#44474e]/30 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0262a5] dark:bg-[#65a7ef]"></div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-2xl">cable</span>
                        <h3 className="text-xl font-bold font-headline text-[#2d333d] dark:text-[#e2e2e6]">Conexión a n8n API</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-label font-bold text-[#5a5f6a] dark:text-[#c4c7cf] mb-2">Webhook URL de Producción</label>
                          <input 
                            value={webhookUrl} 
                            onChange={e => setWebhookUrl(e.target.value)}
                            className="w-full bg-[#f1f3fd] dark:bg-[#282a2e] border border-[#adb2bf]/20 dark:border-[#44474e]/30 p-4 rounded-xl text-[#2d333d] dark:text-[#e2e2e6] outline-none focus:ring-2 focus:ring-[#0262a5]/50 transition-all font-body" 
                            placeholder="Ej. /webhook/mi-chat-bot"
                          />
                          <p className="mt-2 text-xs text-[#5a5f6a] dark:text-[#c4c7cf] font-body opacity-80">Ruta por defecto local para invocar el flujo del Agente Inteligente.</p>
                        </div>
                      </div>
                    </div>

                    {/* Sección: Interfaz y Perfil */}
                    <div className="p-8 bg-[#ffffff] dark:bg-[#1a1c1e] rounded-3xl border border-[#adb2bf]/20 dark:border-[#44474e]/30 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0262a5] dark:bg-[#65a7ef]"></div>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-2xl">storefront</span>
                        <h3 className="text-xl font-bold font-headline text-[#2d333d] dark:text-[#e2e2e6]">Perfil del Local Comercial</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-label font-bold text-[#5a5f6a] dark:text-[#c4c7cf] mb-2">Nombre o ID del Local</label>
                          <input 
                            value={storeName} 
                            onChange={e => setStoreName(e.target.value)}
                            className="w-full bg-[#f1f3fd] dark:bg-[#282a2e] border border-[#adb2bf]/20 dark:border-[#44474e]/30 p-4 rounded-xl text-[#2d333d] dark:text-[#e2e2e6] outline-none focus:ring-2 focus:ring-[#0262a5]/50 transition-all font-body font-bold" 
                            placeholder="Mi Kiosco Central"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <button onClick={saveSettings} className="bg-gradient-to-br from-[#0262a5] to-[#005692] dark:from-[#65a7ef] dark:to-[#00497d] text-white py-4 px-8 rounded-xl font-headline font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all active:scale-95 shadow-md cursor-pointer">
                        <span className="material-symbols-outlined">save</span>
                        Guardar Configuración
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Right Panel: Local Status */}
          <aside className="w-80 flex flex-col bg-[#f9f9ff] dark:bg-[#0c0e13] border-l border-[#adb2bf]/10 dark:border-[#44474e]/20 h-full">
            <div className="p-6 h-full flex flex-col pt-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-headline font-bold text-[#2d333d] dark:text-white">Estado Local</h2>
                <span className="px-2 py-0.5 bg-[#65a7ef]/20 dark:bg-[#00497d]/50 text-[#0262a5] dark:text-[#65a7ef] text-[10px] font-bold rounded uppercase tracking-wider">En Vivo</span>
              </div>
              <p className="font-label text-xs font-medium text-[#5a5f6a] dark:text-[#c4c7cf] mb-6">Inventario: {storeName}</p>
              
              <div className="flex-1 flex flex-col overflow-hidden">
                {isFetchingStock && stockItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5a5f6a] dark:text-[#c4c7cf] animate-in fade-in zoom-in duration-300">
                    <span className="material-symbols-outlined text-5xl mb-4 text-[#0262a5] dark:text-[#65a7ef] animate-spin">sync</span>
                    <h3 className="font-headline font-bold text-lg text-[#2d333d] dark:text-[#e2e2e6] mb-1">Cargando productos...</h3>
                    <p className="font-label text-xs">Sincronizando inventario local con Airtable mediante n8n.</p>
                  </div>
                ) : (
                  <div className="space-y-3 overflow-y-auto hide-scrollbar flex-1 pb-4 animate-in fade-in duration-500">
                    {stockItems.length > 0 ? stockItems.map((item, idx) => (
                      <div key={idx} className="p-4 bg-[#ffffff] dark:bg-[#1a1c1e] rounded-xl flex items-start gap-3 hover:translate-x-1 transition-transform duration-200 shadow-sm border border-[#adb2bf]/20 dark:border-[#44474e]/30">
                        <div className="w-10 h-10 rounded-lg bg-[#f1f3fd] dark:bg-[#282a2e] flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef]">
                            {item.name.toLowerCase().includes('phone') || item.name.toLowerCase().includes('celular') ? 'smartphone' : item.name.toLowerCase().includes('audio') || item.name.toLowerCase().includes('auricular') || item.name.toLowerCase().includes('headphone') ? 'headphones' : 'laptop'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="font-label font-bold text-sm text-[#2d333d] dark:text-[#e2e2e6] truncate max-w-[120px]">{item.name}</span>
                            <span className="font-label font-bold text-sm text-[#0262a5] dark:text-[#65a7ef] shrink-0 ml-2">{item.price}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span className="font-label text-xs text-[#5a5f6a] dark:text-[#c4c7cf]">Stock: {item.stock} uds.</span>
                            <span className={`w-2 h-2 rounded-full ${item.stock > 10 ? 'bg-emerald-500' : item.stock > 0 ? 'bg-amber-500' : 'bg-red-500 animate-pulse'}`}></span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5a5f6a] dark:text-[#c4c7cf]">
                        <span className="material-symbols-outlined text-4xl mb-3 opacity-50">inventory_2</span>
                        <p className="font-label text-sm">No se hallaron productos en el flujo de Airtable.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-2 pt-4 border-t border-[#adb2bf]/10 dark:border-[#44474e]/20 shrink-0">
                <div className="bg-[#e4e8f3]/50 dark:bg-[#333539]/50 rounded-2xl p-4 border border-[#adb2bf]/10 dark:border-[#44474e]/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#0262a5] dark:text-[#65a7ef] text-sm animate-pulse">sync</span>
                      <span className="font-label font-bold text-xs text-[#2d333d] dark:text-[#e2e2e6]">Auto-Sincronización</span>
                    </div>
                    {isFetchingStock && stockItems.length > 0 && (
                       <span className="w-2 h-2 rounded-full bg-[#0262a5] dark:bg-[#65a7ef] animate-ping"></span>
                    )}
                  </div>
                  <p className="font-label text-[11px] text-[#5a5f6a] dark:text-[#c4c7cf] leading-relaxed">
                    El sistema detecta e incorpora nuevos productos autónomamente cada pocos minutos desde la base en la nube.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
