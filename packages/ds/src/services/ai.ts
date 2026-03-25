import skillMd from '../../../../skills/screen-builder/SKILL.md?raw'
import componentApi from '../../../../skills/screen-builder/references/component-api.md?raw'
import designTokens from '../../../../skills/screen-builder/references/design-tokens.md?raw'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY as string
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_MODEL = 'llama-3.3-70b-versatile'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type GeneratedLayout = 'search' | 'list' | 'home' | 'settings'

export interface GeneratedTemplate {
  layout: GeneratedLayout
  pageTitle: string

  // search layout — search bar + chip filters + cards
  searchPlaceholder?: string
  filters?: { key: string; label: string }[]
  cards?: {
    key: string
    title: string
    subtitle?: string
    description?: string
    status?: string
    imageUrl?: string
  }[]

  // list / settings layout — sections with list items
  sections?: {
    title?: string
    items: { key: string; title: string; description?: string; icon?: string; badge?: string }[]
  }[]

  // home layout — greeting + quick actions
  greeting?: string
  userName?: string
  quickActions?: { key: string; label: string; icon: string }[]

  // shared optional card
  helpCard?: {
    category: string
    title: string
    subtitle: string
    linkLabel: string
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function parseJSON<T>(raw: string): T | null {
  try {
    const cleaned = raw.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
    return JSON.parse(cleaned) as T
  } catch {
    console.warn('Failed to parse AI response:', raw)
    return null
  }
}

async function callGroq(system: string, user: string): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Groq API error ${res.status}: ${err}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? ''
}

// ─────────────────────────────────────────────────────────────────────────────
// System prompt — built from skill files
// ─────────────────────────────────────────────────────────────────────────────

const SKILL_SYSTEM_PROMPT = `${skillMd}

---

## Component API Reference

${componentApi}

---

## Design Tokens

${designTokens}
`

// ─────────────────────────────────────────────────────────────────────────────
// Exported functions
// ─────────────────────────────────────────────────────────────────────────────

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
 * Generate a full screen template from a user description.
 * Uses the Wonderland DS skill context to produce varied, well-composed screens.
 */
export async function generateTemplateContent(userPrompt: string): Promise<GeneratedTemplate | null> {
  const raw = await callGroq(
    `${SKILL_SYSTEM_PROMPT}

---

## Your task

You will receive a user description of a screen. Based on the description and the DS rules above, generate a JSON object that describes the screen content.

Choose the most appropriate layout:
- "search": search bar + chip filters + result cards (e.g. find doctors, pharmacies, exams)
- "list": sections with list items (e.g. settings, history, favorites, orders)
- "home": greeting + quick actions + cards (e.g. home, dashboard, my plan)
- "settings": settings sections with toggles and items

Return ONLY valid JSON with this schema:

{
  "layout": "search" | "list" | "home" | "settings",
  "pageTitle": "Screen title",

  // IF layout === "search":
  "searchPlaceholder": "Search placeholder",
  "filters": [{ "key": "unique-key", "label": "Filter label" }],
  "cards": [{
    "key": "unique-key",
    "title": "Card title",
    "subtitle": "Subtitle",
    "description": "Brief description",
    "status": "Status or extra info",
    "imageUrl": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&h=80&fit=crop&crop=face"
  }],

  // IF layout === "list" or "settings":
  "sections": [{
    "title": "Section name (optional)",
    "items": [{
      "key": "unique-key",
      "title": "Item title",
      "description": "Description",
      "icon": "mdi-icon-name-without-prefix",
      "badge": "Optional badge (e.g. New, 3)"
    }]
  }],

  // IF layout === "home":
  "greeting": "Greeting (e.g. Olá,)",
  "userName": "User name (e.g. Marina)",
  "quickActions": [{ "key": "key", "label": "Label", "icon": "mdi-icon-name" }],

  // OPTIONAL in all layouts:
  "helpCard": {
    "category": "Short category",
    "title": "Card title",
    "subtitle": "Explanatory subtitle",
    "linkLabel": "Link label"
  }
}

Rules:
- "search": 4-5 filters, 3-4 cards with realistic health data
- "list"/"settings": 2-3 sections with 3-5 items each
- "home": 4-6 quick actions with relevant MDI icons
- Icons: always MDI without prefix (e.g. "heart-outline", "calendar-check", "pill", "stethoscope")
- Content in Brazilian Portuguese, creative and relevant to health apps
- Vary the screen type based on the description — do NOT always default to search
- Always include helpCard with relevant content
- Respond ONLY with the JSON, no markdown, no explanation`,
    `Create a screen for: "${userPrompt}"`,
  )

  return parseJSON<GeneratedTemplate>(raw)
}
