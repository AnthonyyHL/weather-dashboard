import { CohereClientV2 } from 'cohere-ai';

// Configuración del cliente Cohere
const cohere = new CohereClientV2({
  // Si no tienes la API key configurada, puedes usar una variable de entorno
});

export async function chat() {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: 'Hello! This is a test message. Please respond with a simple greeting.',
        },
      ],
    });

    return response;
  } catch (error) {
    console.error('Error en chat function:', error);
    throw error;
  }
}
