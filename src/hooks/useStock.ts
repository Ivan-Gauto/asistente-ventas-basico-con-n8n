import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export type LocalProduct = {
  name: string;
  price: string;
  stock: number;
};

export const useStock = (_webhookUrl: string) => {
  const [stockItems, setStockItems] = useState<LocalProduct[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchStock = useCallback(async () => {
    setIsFetching(true);
    try {
      console.log('Consultando tabla "producto" en Supabase...');
      const { data, error } = await supabase
        .from('producto')
        .select('*');

      if (error) {
        console.error('Error de Supabase:', error.message);
        throw error;
      }

      console.log('Datos crudos recibidos:', data);

      if (data && data.length > 0) {
        const mapped: LocalProduct[] = data.map((p: any) => ({
          name: p.nombre || 'Sin nombre',
          price: p.precio ? (p.precio.toString().startsWith('$') ? p.precio : `$${p.precio}`) : '$0',
          stock: Number(p.stock || 0)
        }));
        setStockItems(mapped);
      } else {
        setStockItems([]);
        console.warn('La tabla "producto" está vacía o el RLS (Row Level Security) está bloqueando el acceso.');
      }
    } catch (e) {
      console.error('Error fatal al obtener stock:', e);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchStock();

    // Suscripción en tiempo real
    const channel = supabase
      .channel('cambios-inventario')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'producto' },
        (payload) => {
          console.log('Cambio detectado en la base de datos', payload);
          fetchStock();
        }
      )
      .subscribe((status) => {
        console.log('Estado suscripción Realtime:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStock]);

  return { stockItems, isFetching, refetch: fetchStock };
};
