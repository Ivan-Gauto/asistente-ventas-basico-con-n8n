import { useState, useEffect, useCallback } from 'react';
import { sendToN8nWebhook } from '../n8nApi';

export type LocalProduct = {
  name: string;
  price: string;
  stock: number;
};

export const useStock = (webhookUrl: string) => {
  const [stockItems, setStockItems] = useState<LocalProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchStock = useCallback(async () => {
    setIsFetching(true);
    try {
      const resp = await sendToN8nWebhook(
        'Escribe SÓLO un array JSON válido con todo el stock disponible en Airtable. Ejemplo de respuesta esperada: [{"name": "item", "price": "100", "stock": 5}]. Sin bloques de código markdown, sólo el texto JSON puro.',
        'system-fetch-stock',
        webhookUrl
      );

      let txt = typeof resp === 'string' ? resp : resp.response ?? resp.output ?? resp.message ?? '';
      const jsonMatch = txt.match(/\[.*\]/s);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length) setStockItems(parsed);
      }
    } catch (e) {
      console.error('Error fetching stock:', e);
    }
    setIsFetching(false);
  }, [webhookUrl]);

  // carga inicial + auto‑refresh cada 2 min
  useEffect(() => {
    fetchStock();
    const id = setInterval(fetchStock, 120_000);
    return () => clearInterval(id);
  }, [fetchStock]);

  return { stockItems, isFetching, refetch: fetchStock };
};
