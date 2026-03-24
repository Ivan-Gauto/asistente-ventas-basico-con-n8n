const API_KEY = import.meta.env.VITE_N8N_API_KEY as string;

if (!API_KEY) {
  console.error(
    '[n8nApi] ⚠️ Falta la variable de entorno VITE_N8N_API_KEY. ' +
    'Crea un archivo .env.local con tu API key de n8n. Ver .env.example.'
  );
}


export async function createN8nWorkflow(workflowName: string) {
  const workflow = {
    name: workflowName,
    nodes: [
      {
        parameters: {},
        id: "1",
        name: "Start",
        type: "n8n-nodes-base.start",
        typeVersion: 1,
        position: [250, 300]
      }
    ],
    connections: {}
  };

  const res = await fetch("/rest/workflows", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-N8N-API-KEY": API_KEY
    },
    body: JSON.stringify(workflow)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error occurred while creating the workflow');
  }
  return data;
}

export async function sendToN8nWebhook(message: string, sessionId: string, webhookUrl: string = '/webhook/mi-chat-bot') {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message, sessionId })
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`El Webhook no está activo o la ruta (${webhookUrl}) es incorrecta. Inícialo en "Test workflow" desde n8n.`);
    }
    throw new Error(`Error en la comunicación con n8n (${res.status})`);
  }

  const data = await res.json();
  return data;
}
