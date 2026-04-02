/**
 * generate-manifest.mjs
 *
 * Gera ds-manifest.json automaticamente lendo o código-fonte do DS.
 *
 * - Tokens → lidos direto do index.css
 * - Componentes → extraídos automaticamente dos arquivos .tsx
 * - Descriptions e usage → definidos em COMPONENT_META abaixo (só isso é manual)
 *
 * Quando adicionar um componente novo:
 *   1. Crie o arquivo em packages/ds/src/components/<Name>/<Name>.tsx
 *   2. Adicione uma entrada em COMPONENT_META abaixo (description + usage)
 *   3. npm run release
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DS_ROOT   = join(__dirname, '../ds/src')
const CSS_PATH  = join(DS_ROOT, 'index.css')
const OUT_PATH  = join(__dirname, 'ds-manifest.json')

// ─── TOKEN PARSER ────────────────────────────────────────────────────────────

function parseTokens(css) {
  const all = {}
  for (const line of css.split('\n')) {
    const m = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);/)
    if (m) all[m[1].trim()] = m[2].trim()
  }

  const pick = (prefix) =>
    Object.fromEntries(Object.entries(all).filter(([k]) => k.startsWith(prefix)))

  return {
    colors: {
      '--color-brand':             all['--color-brand'],
      '--color-brand-pressed':     all['--color-brand-pressed'],
      '--color-brand-subtle':      all['--color-brand-subtle'],
      '--color-content-primary':   all['--color-content-primary'],
      '--color-content-secondary': all['--color-content-secondary'],
      '--color-content-tertiary':  all['--color-content-tertiary'],
      '--color-surface':           all['--color-surface'],
      '--color-surface-subtle':    all['--color-surface-subtle'],
      '--color-surface-bg':        all['--color-surface-bg'],
      '--color-divider':           all['--color-divider'],
      '--color-stroke':            all['--color-stroke'],
      '--color-gray-white':        all['--color-gray-white'],
    },
    spacing:    pick('--spacing-'),
    fontSize:   pick('--font-size-'),
    fontWeight: pick('--font-weight-'),
    fontFamily: {
      '--font-family-base':  all['--font-family-base'],
      '--font-family-label': all['--font-family-label'],
    },
    radius: pick('--radius-'),
  }
}

// ─── PROP EXTRACTOR ──────────────────────────────────────────────────────────
// Lê o arquivo .tsx e extrai props da interface <Name>Props

function extractProps(tsxPath, componentName) {
  const src = readFileSync(tsxPath, 'utf8')

  // Coleta tipos exportados: type X = 'a' | 'b' | 'c'
  const typeMap = {}
  for (const m of src.matchAll(/^export type (\w+)\s*=\s*([^\n]+)/gm)) {
    typeMap[m[1]] = m[2].trim().replace(/\s*\/\/.*$/gm, '').trim()
  }

  // Acha o bloco da interface Props
  const ifaceMatch = src.match(
    new RegExp(`export interface ${componentName}Props\\s*\\{([\\s\\S]*?)\\n\\}`)
  )
  if (!ifaceMatch) return []

  const block = ifaceMatch[1]
  const props = []

  // Extrai defaults do destructuring da função
  const fnMatch = src.match(
    new RegExp(`export function ${componentName}\\s*\\(\\s*\\{([\\s\\S]*?)\\}\\s*:\\s*${componentName}Props`)
  )
  const defaults = {}
  if (fnMatch) {
    for (const m of fnMatch[1].matchAll(/(\w+)\s*=\s*([^,\n]+)/g)) {
      defaults[m[1].trim()] = m[2].trim().replace(/['"]/g, '').replace(/,$/, '').trim()
    }
  }

  // Parseia cada linha da interface
  for (const line of block.split('\n')) {
    // Pega comentário JSDoc inline /** ... */
    const commentMatch = line.match(/\/\*\*\s*(.+?)\s*\*\//)
    const description = commentMatch ? commentMatch[1] : undefined

    // Remove o comentário e parseia prop
    const clean = line.replace(/\/\*\*.*?\*\//, '').trim()
    const propMatch = clean.match(/^(\w+)\??\s*:\s*(.+)$/)
    if (!propMatch) continue

    const name    = propMatch[1].trim()
    const rawType = propMatch[2].trim().replace(/,$/, '').trim()

    // Resolve alias de tipo (ex: ButtonStyle → 'primary' | 'secondary' | 'tertiary')
    let type = typeMap[rawType] ?? rawType

    // Limpa tipos internos que não fazem sentido pra documentação
    if (type.includes('(key: string, val: unknown)')) continue // playground-only
    if (name === 'className') continue // detalhe de layout, não relevante
    if (name === 'htmlType') continue  // detalhe técnico

    const prop = { name, type }
    if (description)       prop.description = description
    if (defaults[name])    prop.default = defaults[name]

    props.push(prop)
  }

  return props
}

// ─── COMPONENT META ──────────────────────────────────────────────────────────
// Só description e usage são manuais. Props são extraídas automaticamente.
// Adicione uma entrada aqui quando criar um componente novo.

const COMPONENT_META = {
  Button: {
    description: 'Primary action button for CTAs. Full-width via className="w-full".',
    usage: '<Button label="Agendar consulta" style="primary" size="large" className="w-full" />',
  },
  ListItem: {
    description: 'Row item for lists. Last item in group must have divider={false}.',
    usage: '<ListItem title="Fleury" description="1.2 km · Aberto até 18h" size="small" leftSide="icon" icon={<Icon name="localPin" size={24} />} rightAsset="none" divider={false} />',
  },
  Chip: {
    description: 'Filter pills, quick-reply chips, day/time selectors.',
    usage: "<Chip label=\"Online\" state={isSelected ? 'selected' : 'idle'} onClick={() => setFilter('Online')} />",
  },
  BaseCard: {
    description: 'Content card with optional category, title, subtitle, slot, and actions. Never place two side by side.',
    usage: '<BaseCard showCategory={true} category="Plano" showTitle={true} title="Sua cobertura está ativa" action="link" linkLabel="Ver detalhes" width={327} />',
  },
  NavBar: {
    description: 'Top header bar for flow/detail screens. Includes StatusBar. type=page has back arrow, type=modal has close X.',
    usage: '<NavBar type="page" showTitle={true} title="Agendar consulta" rightIcons={0} />',
  },
  BottomBar: {
    description: 'Bottom tab navigation. Hub screens only — never on flow/detail screens.',
    usage: '<BottomBar selected="Minha saúde" meuPlanoMode="photo" userImageUrl={personPhoto} width={375} />',
  },
  CardMFC: {
    description: 'Doctor card in compact (row) or highlighted (hero) style.',
    usage: '<CardMFC style="compact" name="Beatriz Santos" label="Dermatologista" rating="4.8" modality="Online" imageUrl={mfcFabiana} linkLabel="Agendar" width="100%" />',
  },
  Shortcut: {
    description: 'Callout (full-width, brand bg) or support (half-width, gray bg) action card.',
    usage: '<Shortcut type="support" title="Meu médico" icon={<Icon name="stethoscope" size={24} color="var(--color-content-primary)" />} />',
  },
  Avatar: {
    description: 'User photo or initials avatar.',
    usage: '<Avatar size="small" type="image" status="idle" src={personPhoto} />',
  },
  Tabs: {
    description: 'Tab switcher in texts or filter style.',
    usage: "<Tabs style=\"texts\" items={[{ label: 'Online' }, { label: 'Presencial' }]} activeIndex={activeTab} onChange={setActiveTab} />",
  },
  Tag: {
    description: 'Status badge with color variants.',
    usage: '<Tag variant="Green" icon="No icon" label="Disponível" />',
  },
  Link: {
    description: 'Inline text link. Brand color on light bg, white on dark bg.',
    usage: '<Link label="Ver todos" size="small" context="on-light" icon="right" onClick={handleSeeAll} />',
  },
  ChatInput: {
    description: 'Chat message input bar.',
    usage: '<ChatInput state="idle" showPlus={false} width="100%" />',
  },
  ChatBubble: {
    description: 'Individual chat message bubble (user or assistant).',
    usage: '<ChatBubble sender={true} text="Como posso ajudar?" time="14:30" />',
  },
  TextField: {
    description: 'Text input field.',
    usage: '<TextField label="Nome completo" placeholder="Digite seu nome" width={327} />',
  },
  Checkbox: {
    description: 'Boolean checkbox input.',
    usage: "<Checkbox label=\"Aceito os termos\" checked={accepted} onChange={() => setAccepted(v => !v)} />",
  },
  Badge: {
    description: 'Notification count badge.',
    usage: '<Badge count={3} />',
  },
  Callout: {
    description: 'Inline alert/info/warning/highlight message block.',
    usage: '<Callout status="Information" title="Preparo necessário" description="Jejum de 8h antes da coleta." width="100%" />',
  },
  Icon: {
    description: 'DS icon system. camelCase names. Size auto-selects the right SVG (sm=12, md=16, lg=24, xlg=32).',
    usage: '<Icon name="heartOutlined" size={24} color="var(--color-content-primary)" />',
    // Icon não tem Props interface — definição manual
    props: [
      { name: 'name',  type: 'string',  description: 'camelCase: heartOutlined, chevronArrowRight, add, user, bell, localPin, creditCard, paper, sorting, checkOutlined' },
      { name: 'size',  type: 'number',  default: '24', description: '12 | 16 | 24 | 32' },
      { name: 'color', type: 'string',  default: 'currentColor' },
    ],
  },
}

// ─── DISCOVER & BUILD COMPONENTS ─────────────────────────────────────────────

function buildComponents() {
  const componentsDir = join(DS_ROOT, 'components')
  const entries = readdirSync(componentsDir, { withFileTypes: true })
    .filter(e => e.isDirectory())
    .map(e => e.name)

  const components = []

  for (const name of entries) {
    const meta = COMPONENT_META[name]
    if (!meta) {
      console.warn(`  ⚠ ${name} — sem meta em COMPONENT_META, ignorado`)
      continue
    }

    const tsxPath = join(componentsDir, name, `${name}.tsx`)
    if (!existsSync(tsxPath)) {
      console.warn(`  ⚠ ${name}.tsx não encontrado, ignorado`)
      continue
    }

    // Props manuais (ex: Icon) ou extraídas do arquivo
    const props = meta.props ?? extractProps(tsxPath, name)

    components.push({
      name,
      description: meta.description,
      import: `import { ${name} } from '../components/${name}/${name}'`,
      props,
      usage: meta.usage,
    })
  }

  // Adiciona Icon (está em icons/, não em components/)
  const iconMeta = COMPONENT_META['Icon']
  if (iconMeta && !components.find(c => c.name === 'Icon')) {
    components.push({
      name: 'Icon',
      description: iconMeta.description,
      import: "import { Icon } from '../icons/Icon'",
      props: iconMeta.props,
      usage: iconMeta.usage,
    })
  }

  // Ordena alfabeticamente
  return components.sort((a, b) => a.name.localeCompare(b.name))
}

// ─── RULES ───────────────────────────────────────────────────────────────────

const RULES = [
  'NEVER hardcode colors, spacing, font sizes — always use var(--token).',
  'NEVER recreate a component — compose from what exists.',
  'Use style={{}} for token values. Tailwind only for layout (flex, grid, overflow).',
  'fontFamily is required on every text element you write directly.',
  'Screen background is var(--color-surface).',
  'Last ListItem in a group: divider={false}.',
  'CTA Button always outside the scroll container (flex column pattern).',
  'Page titles in flow screens: <h1> with font-size-xl (24px) regular below NavBar — NOT in NavBar title prop.',
  'Icon color defaults to var(--color-content-primary). Icons use camelCase names.',
]

// ─── SCREEN TEMPLATE ─────────────────────────────────────────────────────────

const SCREEN_TEMPLATE = `export function MyScreen() {
  return (
    <div style={{
      width: 375, minHeight: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" showTitle={true} title="Título" />
      <div className="flex-1 overflow-y-auto" style={{ padding: 'var(--spacing-06)' }}>
        {/* scrollable content */}
      </div>
      {/* CTA outside scroll — always visible */}
      <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)', borderTop: '1px solid var(--color-stroke)', backgroundColor: 'var(--color-surface)', flexShrink: 0 }}>
        <Button label="Confirmar" style="primary" size="large" className="w-full" />
      </div>
    </div>
  )
}`

// ─── GENERATE ────────────────────────────────────────────────────────────────

const css        = readFileSync(CSS_PATH, 'utf8')
const tokens     = parseTokens(css)
const components = buildComponents()

const manifest = {
  version: '1.0.0',
  ds: 'Wonderland Design System — Alice Health',
  importBase: "All imports from '../components/<Name>/<Name>' relative to packages/ds/src/screens/",
  tokens,
  rules: RULES,
  components,
  assets: {
    mfcPhotos: [
      "import mfcFabiana from '../assets/mfc/mfc-1-fabiana.jpg'",
      "import mfcTiago   from '../assets/mfc/mfc-2-tiago.jpg'",
      "import mfcManuela from '../assets/mfc/mfc-3-manuela.jpg'",
    ],
    personPhoto: "import personPhoto from '../assets/placeholders/person.jpg'",
  },
  screenTemplate: SCREEN_TEMPLATE,
}

writeFileSync(OUT_PATH, JSON.stringify(manifest, null, 2))

const tokenCount = Object.values(tokens).reduce((acc, g) => acc + Object.keys(g).length, 0)
console.log(`✓ ds-manifest.json gerado`)
console.log(`  ${components.length} componentes (extraídos automaticamente)`)
console.log(`  ${tokenCount} tokens (lidos do index.css)`)
