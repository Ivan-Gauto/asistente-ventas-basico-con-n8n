import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ChatView } from './components/ChatView';
import { SettingsView } from './components/SettingsView';
import { RightPanel } from './components/RightPanel';
import { useStock } from './hooks/useStock';
import { useTheme } from './hooks/useTheme';
import { useSettings } from './hooks/useSettings';
import { useChat } from './hooks/useChat';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'settings'>('chat');

  // Modular Logic Hooks
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { storeName, setStoreName, webhookUrl, setWebhookUrl, saveSettings } = useSettings();
  const { stockItems, isFetching: isFetchingStock } = useStock(webhookUrl);
  const { messages, inputValue, setInputValue, isTyping, chatFeedRef, handleSubmit } = useChat(webhookUrl);

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
