# 🤖 Asistente de Ventas — Chat con n8n

Interfaz de chat inteligente para gestión de inventario y ventas, conectada a un agente de n8n mediante webhooks.

## ✨ Características

- Chat en tiempo real con un agente IA (vía n8n Webhook)
- Panel de inventario sincronizado con Airtable a través de n8n
- Modo oscuro / claro
- Configuración de webhook y nombre del local desde la UI
- Auto-sincronización del stock cada 2 minutos

## 🛠️ Stack Tecnológico

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: TailwindCSS v4
- **Backend/IA**: n8n (self-hosted o cloud) + Airtable

## 🚀 Inicio rápido

### 1. Clonar e instalar dependencias

```bash
git clone <url-del-repo>
cd chat-n8n
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores reales:

```env
VITE_N8N_API_KEY=tu_api_key_de_n8n
VITE_N8N_WEBHOOK_URL=/webhook-test/mi-chat-bot
```

### 3. Correr en desarrollo

```bash
npm run dev
```

> Requiere tener n8n corriendo en `http://localhost:5678` con el workflow "Agente Inteligente" activo.

## 🌐 Despliegue en Vercel

1. Importar el repositorio en [vercel.com](https://vercel.com)
2. En *Settings → Environment Variables*, configurar:
   - `VITE_N8N_API_KEY` → API key de tu instancia de n8n cloud
   - `VITE_N8N_WEBHOOK_URL` → URL pública del webhook (ej: `https://tu-instancia.n8n.cloud/webhook/mi-chat-bot`)
3. Deploy 🚀

## 📁 Estructura del proyecto

```
src/
├── App.tsx         # Componente principal (chat + panel lateral)
├── n8nApi.ts       # Cliente HTTP para n8n (webhooks y API REST)
├── main.tsx        # Entry point de React
└── index.css       # Estilos globales
```

## ⚙️ Variables de entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `VITE_N8N_API_KEY` | Sí | API Key de n8n para crear workflows |
| `VITE_N8N_WEBHOOK_URL` | No | URL del webhook (default: `/webhook-test/mi-chat-bot`) |
