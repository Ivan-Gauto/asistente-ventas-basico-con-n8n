import React, { useState, useRef, useEffect } from 'react';
import { createN8nWorkflow, sendToN8nWebhook } from './n8nApi';
import { Message } from './types';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ChatView } from './components/ChatView';
import { SettingsView } from './components/SettingsView';
import { RightPanel } from './components/RightPanel';
import { useStock } from './hooks/useStock';

export default function App() {
  // UI state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('chat');

  const [storeName, setStoreName] = useState(() => localStorage.getItem('storeName') || 'Mi Kiosco Central');
  const [webhookUrl, setWebhookUrl] = useState(() =>
    localStorage.getItem('n8nWebhookUrl') || import.meta.env.VITE_N8N_WEBHOOK_URL || '/webhook-test/mi-chat-bot'
  );

  const chatFeedRef = useRef<HTMLDivElement>(null);

  // Stock hook
  const { stockItems, isFetching: isFetchingStock } = useStock(webhookUrl);

  // Scroll to bottom when messages or typing change
  const scrollToBottom = () => {
    if (chatFeedRef.current) chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
  };
  useEffect(() => scrollToBottom(), [messages, isTyping]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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
    const newUserMsg: Message = { id: Date.now().toString(), text, isUser: true, time };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');

    setTimeout(async () => {
      setIsTyping(true);
      const isWorkflowCreation = text.toLowerCase().startsWith('crear workflow');
      try {
        let aiResponse = '';
        if (isWorkflowCreation) {
          const workflowName = text.replace(/crear workflow/i, '').trim() || 'Test desde IA';
          await createN8nWorkflow(workflowName);
          aiResponse = `¡Listo! He creado el flujo "${workflowName}" en tu n8n local correctamente.`;
        } else {
          const data = await sendToN8nWebhook(text, 'chat-react-session', webhookUrl);
          if (typeof data === 'string') aiResponse = data;
          else aiResponse = data.response ?? data.message ?? data.output ?? JSON.stringify(data, null, 2);
        }
        setTimeout(() => {
          setIsTyping(false);
          const newAiMsg: Message = {
            id: Date.now().toString() + 'ai',
            text: aiResponse,
            isUser: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, newAiMsg]);
        }, 1000);
      } catch (error: any) {
        setIsTyping(false);
        const errMsg: Message = {
          id: Date.now().toString() + 'ai-err',
          text: `Error de conexión con n8n: ${error.message} (Revisa que tu servidor local esté activo).`,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    }, 600);
  };

  return (
    <div className="bg-background text-on-background flex h-screen w-full flex-1 overflow-hidden font-body">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          <main className="flex-1 flex flex-col bg-surface-container-lowest dark:bg-[#0c0e13] relative">
            {activeTab === 'chat' && (
              <ChatView
                messages={messages}
                isTyping={isTyping}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSubmit={handleSubmit}
                chatFeedRef={chatFeedRef}
              />
            )}
            {activeTab === 'settings' && (
              <SettingsView
                webhookUrl={webhookUrl}
                setWebhookUrl={setWebhookUrl}
                storeName={storeName}
                setStoreName={setStoreName}
                saveSettings={saveSettings}
              />
            )}
          </main>
          <RightPanel storeName={storeName} stockItems={stockItems} isFetching={isFetchingStock} />
        </div>
      </div>
    </div>
  );
}
