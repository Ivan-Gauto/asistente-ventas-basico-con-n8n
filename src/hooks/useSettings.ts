import { useState } from 'react';

export const useSettings = () => {
  const [storeName, setStoreName] = useState(() => localStorage.getItem('storeName') || 'Mi Kiosco Central');
  const [webhookUrl, setWebhookUrl] = useState(() =>
    localStorage.getItem('n8nWebhookUrl') || import.meta.env.VITE_N8N_WEBHOOK_URL || '/webhook-test/mi-chat-bot'
  );

  const saveSettings = () => {
    localStorage.setItem('n8nWebhookUrl', webhookUrl);
    localStorage.setItem('storeName', storeName);
    alert('Configuración guardada exitosamente.');
  };

  return { storeName, setStoreName, webhookUrl, setWebhookUrl, saveSettings };
};
