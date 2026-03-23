import React, { useState, useRef, useEffect } from 'react';
import { sendToN8nWebhook } from '../n8nApi';
import { Message } from '../types';

export const useChat = (webhookUrl: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatFeedRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
      try {
        const data = await sendToN8nWebhook(text, 'chat-react-session', webhookUrl);
        const aiResponse =
          typeof data === 'string'
            ? data
            : data.response ?? data.message ?? data.output ?? JSON.stringify(data, null, 2);

        setIsTyping(false);
        const newAiMsg: Message = {
          id: Date.now().toString() + 'ai',
          text: aiResponse,
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newAiMsg]);
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

  return { messages, inputValue, setInputValue, isTyping, chatFeedRef, handleSubmit };
};
