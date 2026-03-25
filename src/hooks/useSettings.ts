import { useState, useCallback, useMemo } from 'react';

export const useSettings = () => {
  const [storeName, setStoreName] = useState(() => 
    localStorage.getItem('storeName') || 'Mi Kiosco Central'
  );
  
  const [webhookUrl, setWebhookUrl] = useState(() =>
    localStorage.getItem('n8nWebhookUrl') || 
    import.meta.env.VITE_N8N_WEBHOOK_URL || 
    '/webhook-test/mi-chat-bot'
  );

  const isTestMode = useMemo(() => webhookUrl.includes('/webhook-test/'), [webhookUrl]);

  const toggleTestMode = useCallback(() => {
    setWebhookUrl((currentUrl) => {
      const hasTestFragment = currentUrl.includes('/webhook-test/');
      const hasProdFragment = currentUrl.includes('/webhook/');

      let nextUrl = currentUrl;

      if (hasTestFragment) {
        nextUrl = currentUrl.replace('/webhook-test/', '/webhook/');
      } else if (hasProdFragment) {
        nextUrl = currentUrl.replace('/webhook/', '/webhook-test/');
      } else {
        nextUrl = '/webhook/mi-chat-bot';
      }
      
      localStorage.setItem('n8nWebhookUrl', nextUrl);
      return nextUrl;
    });
  }, []);

  const saveSettings = useCallback(() => {
    localStorage.setItem('n8nWebhookUrl', webhookUrl);
    localStorage.setItem('storeName', storeName);
    alert('Configuracion guardada exitosamente.');
  }, [webhookUrl, storeName]);

  return {
    storeName,
    setStoreName,
    webhookUrl,
    setWebhookUrl,
    saveSettings,
    isTestMode,
    toggleTestMode
  };
};
