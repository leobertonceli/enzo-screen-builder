import type { EspecialistasContent } from '../screens/EspecialistasScreen'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string

interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface GroqResponse {
  choices: { message: { content: string } }[]
}

async function callGroq(prompt: string, userMessage: string): Promise<string> {
  const messages: GroqMessage[] = [
    { role: 'system', content: prompt },
    { role: 'user', content: userMessage },
  ]

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.9,
      max_tokens: 1024,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq API error: ${res.status} — ${err}`)
  }

  const data = (await res.json()) as GroqResponse
  return data.choices[0].message.content
}

function parseJSON<T>(raw: string): T | null {
  try {
    const cleaned = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
    return JSON.parse(cleaned) as T
  } catch {
    console.warn('Failed to parse AI response:', raw)
    return null
  }
}

/**
 * Generate content for a specific component based on its controls
 */
export async function generateComponentContent(
  componentName: string,
  controlKeys: string[],
): Promise<Record<string, string>> {
  const fields = controlKeys
    .filter((k) => !k.startsWith('show') && !['size', 'filled', 'action', 'leftAsset', 'rightAsset', 'divider'].includes(k))
    .join(', ')

  const raw = await callGroq(
    'Você é um assistente criativo para um design system de saúde/bem-estar. Responda APENAS com JSON válido, sem markdown, sem blocos de código. Gere conteúdo realista em português brasileiro.',
    `Gere conteúdo criativo para o componente "${componentName}" de um app de saúde/bem-estar.

Preciso de valores para estes campos: ${fields}

Regras:
- Títulos: curtos (2-5 palavras)
- Subtítulos: uma frase curta
- Labels de botão/link: 1-3 palavras (ação)
- Category: 1-2 palavras
- Nomes de ícones: Material Design sem prefixo "mdi-", ex: "heart-outline", "calendar-check"
- Contexto: app de saúde, consultas médicas, bem-estar, planos de saúde, exames

Responda APENAS com um JSON objeto com os campos solicitados.
Seja criativo e varie o contexto. Gere conteúdo DIFERENTE a cada vez.`,
  )

  return parseJSON<Record<string, string>>(raw) ?? {}
}

/**
 * Generate full screen content for EspecialistasScreen
 */
export async function generateEspecialistasContent(customPrompt?: string): Promise<EspecialistasContent | null> {
  const context = customPrompt
    ? `O usuário quer: "${customPrompt}"`
    : 'Gere conteúdo variado e criativo para uma tela de especialistas médicos.'

  const raw = await callGroq(
    'Você é um assistente criativo para um app de saúde. Responda APENAS com JSON válido, sem markdown, sem blocos de código. Use português brasileiro.',
    `${context}

Gere o conteúdo completo para uma tela de busca de médicos especialistas. Retorne um JSON com exatamente esta estrutura:

{
  "pageTitle": "string (ex: Especialistas, Encontre seu médico, etc)",
  "searchPlaceholder": "string (placeholder da busca)",
  "specialties": [
    { "key": "unique-key", "label": "Nome da especialidade" }
  ],
  "doctors": [
    {
      "key": "unique-key",
      "name": "Nome do médico com título (Dr./Dra.)",
      "specialty": "Especialidade",
      "rating": "4.x",
      "availability": "Disponível hoje / Próxima: Dia, hora",
      "imageUrl": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face"
    }
  ],
  "recentSection": "string (título da seção de recentes)",
  "recentDoctors": [
    { "key": "unique-key", "title": "Nome do médico", "description": "Especialidade · Última consulta: data" }
  ],
  "helpCard": {
    "category": "categoria curta",
    "title": "título da dúvida",
    "subtitle": "subtítulo explicativo",
    "linkLabel": "label do link"
  }
}

Regras:
- 5 a 6 especialidades
- 3 médicos com dados realistas
- 2 consultas recentes
- Use sempre as mesmas URLs de imagem do Unsplash acima (só mude o photo ID se quiser variar)
- Varie bastante o contexto: pode ser ortopedia, neurologia, pediatria, ginecologia, etc
- Gere conteúdo DIFERENTE a cada vez`,
  )

  return parseJSON<EspecialistasContent>(raw)
}
