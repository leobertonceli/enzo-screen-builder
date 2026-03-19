const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string

interface GroqMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface GroqResponse {
  choices: { message: { content: string } }[]
}

export async function generateContent(prompt: string): Promise<string> {
  const messages: GroqMessage[] = [
    {
      role: 'system',
      content:
        'Você é um assistente criativo para um design system de saúde/bem-estar. Responda APENAS com JSON válido, sem markdown, sem blocos de código. Gere conteúdo realista em português brasileiro.',
    },
    { role: 'user', content: prompt },
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

/**
 * Generate content for a specific component based on its controls
 */
export async function generateComponentContent(
  componentName: string,
  controlKeys: string[],
): Promise<Record<string, string>> {
  const prompt = `Gere conteúdo criativo para o componente "${componentName}" de um app de saúde/bem-estar.

Preciso de valores para estes campos: ${controlKeys.filter((k) => !k.startsWith('show') && !['size', 'filled', 'action', 'leftAsset', 'rightAsset', 'divider'].includes(k)).join(', ')}

Regras:
- Títulos: curtos (2-5 palavras)
- Subtítulos: uma frase curta
- Labels de botão/link: 1-3 palavras (ação)
- Category: 1-2 palavras
- Nomes de ícones: use ícones Material Design (mdi) sem prefixo "mdi-", ex: "heart-outline", "calendar-check", "account-circle"
- Contexto: app de saúde, consultas médicas, bem-estar, planos de saúde, exames

Responda APENAS com um JSON objeto com os campos solicitados. Exemplo:
{"title": "Sua consulta", "subtitle": "Agende sua próxima visita", "buttonLabel": "Agendar"}

Seja criativo e varie o contexto (saúde, exames, médicos, bem-estar, planos, receitas, lembretes, etc). Gere conteúdo DIFERENTE a cada vez.`

  const raw = await generateContent(prompt)

  try {
    // Clean potential markdown code blocks
    const cleaned = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    console.warn('Failed to parse AI response:', raw)
    return {}
  }
}
