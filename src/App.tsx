import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ChatView } from './components/ChatView';
import { SettingsView } from './components/SettingsView';
import { RightPanel } from './components/RightPanel';
import { SalesRegisterView } from './components/SalesRegisterView'; 
import { useStock } from './hooks/useStock';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { useChat } from './hooks/useChat';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'settings' | 'sales'>('chat');

  const { isDarkMode, toggleDarkMode } = useTheme();
  const { 
    storeName, 
    setStoreName, 
    webhookUrl, 
    setWebhookUrl, 
    saveSettings,
    isTestMode,
    toggleTestMode
  } = useSettings();
  const { stockItems, isFetching: isFetchingStock } = useStock(webhookUrl);
  const { messages, inputValue, setInputValue, isTyping, chatFeedRef, handleSubmit } = useChat(webhookUrl);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white flex h-screen w-full flex-1 overflow-hidden font-body transition-colors duration-300`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
          activeTab={activeTab} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 flex flex-col bg-slate-50 dark:bg-[#0a0a0a] relative">
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
            
            {activeTab === 'sales' && (
              <SalesRegisterView />
            )}
            
            {activeTab === 'settings' && (
              <SettingsView
                webhookUrl={webhookUrl}
                setWebhookUrl={setWebhookUrl}
                storeName={storeName}
                setStoreName={setStoreName}
                saveSettings={saveSettings}
                isTestMode={isTestMode}
                toggleTestMode={toggleTestMode}
              />
            )}
          </main>
          
          <RightPanel 
            storeName={storeName} 
            stockItems={stockItems} 
            isFetching={isFetchingStock} 
          />
        </div>
      </div>
    </div>
  );
}
