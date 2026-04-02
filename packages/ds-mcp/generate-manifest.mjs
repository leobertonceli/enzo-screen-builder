/**
 * generate-manifest.mjs
 *
 * Gera ds-manifest.json automaticamente.
 *
 * Tokens → lidos direto do index.css (sempre atualizados).
 * Componentes → definidos aqui embaixo em COMPONENTS (fonte de verdade).
 *
 * Quando adicionar um componente novo ao DS:
 *   1. Adicione a entrada em COMPONENTS abaixo.
 *   2. Rode: npm run generate
 *
 * O manifest é regenerado e quem usa o MCP recebe a versão nova.
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CSS_PATH = join(__dirname, '../ds/src/index.css')
const OUT_PATH = join(__dirname, 'ds-manifest.json')

// ─── TOKEN PARSER ────────────────────────────────────────────────────────────
// Lê o index.css e extrai grupos de tokens por prefixo.

function parseTokens(css) {
  const lines = css.split('\n')
  const all = {}

  for (const line of lines) {
    const match = line.match(/^\s*(--[\w-]+)\s*:\s*(.+?);/)
    if (match) {
      all[match[1].trim()] = match[2].trim()
    }
  }

  const pick = (prefix) =>
    Object.fromEntries(Object.entries(all).filter(([k]) => k.startsWith(prefix)))

  // Semânticos (os mais usados no dia a dia)
  const semanticColors = {
    '--color-brand':             all['--color-brand']             ?? 'var(--color-magenta-60)',
    '--color-brand-pressed':     all['--color-brand-pressed']     ?? 'var(--color-magenta-70)',
    '--color-brand-subtle':      all['--color-brand-subtle']      ?? 'var(--color-magenta-00)',
    '--color-content-primary':   all['--color-content-primary']   ?? 'var(--color-gray-100)',
    '--color-content-secondary': all['--color-content-secondary'] ?? 'var(--color-gray-60)',
    '--color-content-tertiary':  all['--color-content-tertiary']  ?? 'var(--color-gray-50)',
    '--color-surface':           all['--color-surface']           ?? 'var(--color-gray-white)',
    '--color-surface-subtle':    all['--color-surface-subtle']    ?? 'var(--color-gray-10)',
    '--color-surface-bg':        all['--color-surface-bg']        ?? 'var(--color-gray-00)',
    '--color-divider':           all['--color-divider']           ?? 'var(--color-gray-10)',
    '--color-stroke':            all['--color-stroke']            ?? 'var(--color-gray-20)',
    '--color-gray-white':        all['--color-gray-white']        ?? '#FFFFFF',
  }

  return {
    colors:     semanticColors,
    spacing:    pick('--spacing-0').concat
                  ? pick('--spacing-') : pick('--spacing-'),
    fontSize:   pick('--font-size-'),
    fontWeight: pick('--font-weight-'),
    fontFamily: {
      '--font-family-base':  all['--font-family-base']  ?? '"Haffer", system-ui, sans-serif',
      '--font-family-label': all['--font-family-label'] ?? '"DM Sans", system-ui, sans-serif',
    },
    radius: pick('--radius-'),
  }
}

// ─── COMPONENTES ─────────────────────────────────────────────────────────────
// Fonte de verdade. Adicione novos componentes aqui.

const COMPONENTS = [
  {
    name: 'Button',
    description: 'Primary action button for CTAs. Full-width via className="w-full".',
    import: "import { Button } from '../components/Button/Button'",
    props: [
      { name: 'label',       type: 'string',                                           required: true },
      { name: 'style',       type: "'primary' | 'secondary' | 'tertiary'",            default: "'primary'" },
      { name: 'size',        type: "'small'(40px) | 'medium'(48px) | 'large'(56px)", default: "'large'" },
      { name: 'state',       type: "'enabled' | 'pressed' | 'disabled' | 'loading'", default: "'enabled'" },
      { name: 'type',        type: "'text' | 'left-icon' | 'right-icon' | 'only-icon'", default: "'text'" },
      { name: 'darkMode',    type: 'boolean',                                          default: 'false' },
      { name: 'iconElement', type: 'ReactNode',                                        description: 'Custom icon element' },
      { name: 'className',   type: 'string',                                           description: 'Layout classes only, e.g. w-full' },
      { name: 'onClick',     type: '() => void' },
    ],
    usage: '<Button label="Agendar consulta" style="primary" size="large" className="w-full" />',
  },
  {
    name: 'ListItem',
    description: 'Row item for lists. Last item in group must have divider={false}.',
    import: "import { ListItem } from '../components/ListItem/ListItem'",
    props: [
      { name: 'title',       type: 'string',                                 required: true },
      { name: 'description', type: 'string',                                 description: 'Subtitle (optional)' },
      { name: 'size',        type: "'large' | 'small'",                     default: "'small'", description: 'Prefer small in screens' },
      { name: 'leftSide',    type: "'none' | 'icon' | 'image'",            default: "'none'" },
      { name: 'icon',        type: 'ReactNode',                              description: "Used with leftSide='icon'" },
      { name: 'imageSrc',    type: 'string',                                 description: "Used with leftSide='image'" },
      { name: 'rightAsset',  type: "'none' | 'icon' | 'text' | 'text-icon'", default: "'icon'" },
      { name: 'rightText',   type: 'string',                                 description: "Used with rightAsset='text' or 'text-icon'" },
      { name: 'divider',     type: 'boolean',                                default: 'true' },
      { name: 'onClick',     type: '() => void' },
    ],
    usage: '<ListItem title="Fleury" description="1.2 km · Aberto até 18h" size="small" leftSide="icon" icon={<Icon name="localPin" size={24} />} rightAsset="none" divider={false} />',
  },
  {
    name: 'Chip',
    description: 'Filter pills, quick-reply chips, day/time selectors.',
    import: "import { Chip } from '../components/Chip/Chip'",
    props: [
      { name: 'label',          type: 'string',                                       required: true },
      { name: 'variant',        type: "'text' | 'icon' | 'image'",                  default: "'text'" },
      { name: 'size',           type: "'small' | 'medium' | 'large'",               default: "'small'" },
      { name: 'state',          type: "'idle' | 'pressed' | 'selected' | 'disabled'", default: "'idle'" },
      { name: 'showCounter',    type: 'boolean',                                      default: 'false' },
      { name: 'affordanceIcon', type: 'boolean',                                      default: 'false' },
      { name: 'iconElement',    type: 'ReactNode',                                    description: "Only for variant='icon'" },
      { name: 'onClick',        type: '() => void' },
    ],
    usage: "<Chip label=\"Online\" state={isSelected ? 'selected' : 'idle'} onClick={() => setFilter('Online')} />",
  },
  {
    name: 'BaseCard',
    description: 'Content card with optional category, title, subtitle, slot, and actions. Never place two side by side.',
    import: "import { BaseCard } from '../components/BaseCard/BaseCard'",
    props: [
      { name: 'size',         type: "'small' | 'large'",                                              default: "'small'" },
      { name: 'filled',       type: 'boolean',                                                         default: 'false', description: 'false=outlined/white, true=filled/gray' },
      { name: 'showCategory', type: 'boolean',                                                         default: 'false' },
      { name: 'category',     type: 'string',                                                          description: 'Small label above title' },
      { name: 'showTitle',    type: 'boolean',                                                         default: 'true' },
      { name: 'title',        type: 'string' },
      { name: 'showSubtitle', type: 'boolean',                                                         default: 'false' },
      { name: 'subtitle',     type: 'string' },
      { name: 'showSlot',     type: 'boolean',                                                         default: 'false' },
      { name: 'slot',         type: 'ReactNode',                                                       description: 'Custom content area' },
      { name: 'action',       type: "'none' | 'button' | '2buttons' | 'link' | '2links'",            default: "'none'" },
      { name: 'linkLabel',    type: 'string' },
      { name: 'buttonLabel',  type: 'string' },
      { name: 'width',        type: 'number | string',                                                 default: '327' },
      { name: 'onClick',      type: '() => void' },
    ],
    usage: '<BaseCard showCategory={true} category="Plano" showTitle={true} title="Sua cobertura está ativa" action="link" linkLabel="Ver detalhes" width={327} />',
  },
  {
    name: 'NavBar',
    description: 'Top header bar for flow/detail screens. Includes StatusBar. type=page has back arrow, type=modal has close X.',
    import: "import { NavBar } from '../components/NavBar/NavBar'",
    props: [
      { name: 'type',            type: "'page' | 'modal'",  default: "'page'", description: 'page=back←, modal=close✕' },
      { name: 'showTitle',       type: 'boolean',            default: 'true' },
      { name: 'title',           type: 'string',             description: 'Centered title text' },
      { name: 'showDescription', type: 'boolean',            default: 'false' },
      { name: 'description',     type: 'string',             description: 'Small subtitle below title' },
      { name: 'rightIcons',      type: '0 | 1 | 2',         default: '0', description: 'Number of right icon buttons (page only)' },
      { name: 'rightIcon1',      type: 'string',             default: "'dots-vertical'" },
      { name: 'rightIcon2',      type: 'string',             default: "'share-variant-outline'" },
      { name: 'onBack',          type: '() => void' },
      { name: 'onClose',         type: '() => void' },
      { name: 'onRightIcon1',    type: '() => void' },
      { name: 'onRightIcon2',    type: '() => void' },
    ],
    usage: '<NavBar type="page" showTitle={true} title="Agendar consulta" rightIcons={0} />',
  },
  {
    name: 'BottomBar',
    description: 'Bottom tab navigation. Hub screens only — never on flow/detail screens.',
    import: "import { BottomBar } from '../components/BottomBar/BottomBar'",
    props: [
      { name: 'selected',     type: "'Alice Agora' | 'Minha saúde' | 'Rede Alice' | 'Meu plano'", required: true },
      { name: 'tab1Label',    type: 'string',                default: "'Alice Agora'" },
      { name: 'tab2Label',    type: 'string',                default: "'Minha saúde'" },
      { name: 'tab3Label',    type: 'string',                default: "'Rede Alice'" },
      { name: 'tab4Label',    type: 'string',                default: "'Meu plano'" },
      { name: 'meuPlanoMode', type: "'photo' | 'initials'", default: "'photo'" },
      { name: 'userImageUrl', type: 'string' },
      { name: 'userInitials', type: 'string' },
      { name: 'width',        type: 'number',                default: '375' },
      { name: 'onChange',     type: '(tab: string) => void' },
    ],
    usage: '<BottomBar selected="Minha saúde" meuPlanoMode="photo" userImageUrl={personPhoto} width={375} />',
  },
  {
    name: 'CardMFC',
    description: "Doctor card in compact (row) or highlighted (hero) style.",
    import: "import { CardMFC } from '../components/CardMFC/CardMFC'",
    props: [
      { name: 'style',       type: "'compact' | 'highlighted'",  required: true, description: 'compact=row, highlighted=full hero card' },
      { name: 'name',        type: 'string',                      required: true },
      { name: 'label',       type: 'string',                      description: "Small label above name, e.g. 'Minha médica'" },
      { name: 'bio',         type: 'string',                      description: 'Only in highlighted style' },
      { name: 'rating',      type: 'string' },
      { name: 'distance',    type: 'string' },
      { name: 'modality',    type: 'string',                      description: "e.g. 'Online e presencial'" },
      { name: 'imageUrl',    type: 'string',                      description: 'mfc-1-fabiana.jpg | mfc-2-tiago.jpg | mfc-3-manuela.jpg' },
      { name: 'linkLabel',   type: 'string',                      description: 'CTA link text' },
      { name: 'width',       type: 'number | string',             default: "'100%'" },
      { name: 'onLinkClick', type: '() => void' },
    ],
    usage: '<CardMFC style="compact" name="Beatriz Santos" label="Dermatologista" rating="4.8" modality="Online" imageUrl={mfcFabiana} linkLabel="Agendar" width="100%" />',
  },
  {
    name: 'Shortcut',
    description: 'Callout (full-width, brand bg) or support (half-width, gray bg) action card.',
    import: "import { Shortcut } from '../components/Shortcut/Shortcut'",
    props: [
      { name: 'type',     type: "'callout' | 'support'",  required: true },
      { name: 'state',    type: "'idle' | 'disabled'",    default: "'idle'" },
      { name: 'title',    type: 'string',                  required: true },
      { name: 'subtitle', type: 'string',                  description: 'Callout only' },
      { name: 'icon',     type: 'ReactNode',               required: true },
      { name: 'badge',    type: 'boolean',                 description: 'Support only' },
      { name: 'onClick',  type: '() => void' },
    ],
    usage: '<Shortcut type="support" title="Meu médico" icon={<Icon name="stethoscope" size={24} color="var(--color-content-primary)" />} />',
  },
  {
    name: 'Avatar',
    description: 'User photo or initials avatar.',
    import: "import { Avatar } from '../components/Avatar/Avatar'",
    props: [
      { name: 'size',   type: "'large'(80px) | 'medium'(64px) | 'small'(48px) | 'xsmall'(32px)", required: true },
      { name: 'type',   type: "'image' | 'initials'",                                               required: true },
      { name: 'status', type: "'idle' | 'active'",                                                  default: "'idle'", description: 'active=brand ring' },
      { name: 'src',    type: 'string',                                                              description: "For type='image'" },
    ],
    usage: '<Avatar size="small" type="image" status="idle" src={personPhoto} />',
  },
  {
    name: 'Tabs',
    description: 'Tab switcher in texts or filter style.',
    import: "import { Tabs } from '../components/Tabs/Tabs'",
    props: [
      { name: 'style',       type: "'texts' | 'filter'",              required: true },
      { name: 'items',       type: '{ label: string; badge?: number }[]', required: true },
      { name: 'activeIndex', type: 'number',                           required: true },
      { name: 'onChange',    type: '(index: number) => void',         required: true },
    ],
    usage: "<Tabs style=\"texts\" items={[{ label: 'Online' }, { label: 'Presencial' }]} activeIndex={activeTab} onChange={setActiveTab} />",
  },
  {
    name: 'Tag',
    description: 'Status badge with color variants.',
    import: "import { Tag } from '../components/Tag/Tag'",
    props: [
      { name: 'variant', type: "'Red' | 'Magenta' | 'Blue' | 'Green' | 'Orange' | 'Grey' | 'Disabled'", required: true },
      { name: 'icon',    type: 'string',                                                                   default: "'No icon'" },
      { name: 'label',   type: 'string',                                                                   required: true },
    ],
    usage: '<Tag variant="Green" icon="No icon" label="Disponível" />',
  },
  {
    name: 'Link',
    description: 'Inline text link. Brand color on light bg, white on dark bg.',
    import: "import { Link } from '../components/Link/Link'",
    props: [
      { name: 'label',   type: 'string',                           required: true },
      { name: 'size',    type: "'small'(14px) | 'large'(16px)",   default: "'small'" },
      { name: 'context', type: "'on-light' | 'on-dark'",          default: "'on-light'" },
      { name: 'icon',    type: "'none' | 'left' | 'right'",       default: "'none'" },
      { name: 'onClick', type: '() => void' },
    ],
    usage: '<Link label="Ver todos" size="small" context="on-light" icon="right" onClick={handleSeeAll} />',
  },
  {
    name: 'ChatInput',
    description: 'Chat message input bar.',
    import: "import { ChatInput } from '../components/ChatInput/ChatInput'",
    props: [
      { name: 'state',       type: "'idle' | 'focus' | 'typing' | 'recording' | 'transcribing' | 'loading' | 'disabled'", default: "'idle'" },
      { name: 'placeholder', type: 'string' },
      { name: 'showMic',     type: 'boolean',          default: 'true' },
      { name: 'showPlus',    type: 'boolean',          default: 'false' },
      { name: 'width',       type: 'number | string',  default: '327', description: "Use '100%' inside padded container" },
      { name: 'value',       type: 'string' },
      { name: 'onSend',      type: '() => void' },
    ],
    usage: '<ChatInput state="idle" showPlus={false} width="100%" />',
  },
  {
    name: 'ChatBubble',
    description: 'Individual chat message bubble (user or assistant).',
    import: "import { ChatBubble } from '../components/ChatBubble/ChatBubble'",
    props: [
      { name: 'sender',  type: 'boolean',  required: true, description: 'true=assistant (left), false=user (right)' },
      { name: 'text',    type: 'string',   required: true },
      { name: 'time',    type: 'string' },
      { name: 'loading', type: 'boolean',  default: 'false' },
    ],
    usage: '<ChatBubble sender={true} text="Como posso ajudar?" time="14:30" />',
  },
  {
    name: 'TextField',
    description: 'Text input field.',
    import: "import { TextField } from '../components/TextField/TextField'",
    props: [
      { name: 'label',       type: 'string' },
      { name: 'placeholder', type: 'string' },
      { name: 'value',       type: 'string' },
      { name: 'state',       type: "'default' | 'focus' | 'filled' | 'error' | 'disabled'", default: "'default'" },
      { name: 'helperText',  type: 'string' },
      { name: 'errorText',   type: 'string' },
      { name: 'onChange',    type: '(value: string) => void' },
      { name: 'width',       type: 'number | string', default: '327' },
    ],
    usage: '<TextField label="Nome completo" placeholder="Digite seu nome" state="default" width={327} />',
  },
  {
    name: 'Checkbox',
    description: 'Boolean checkbox input.',
    import: "import { Checkbox } from '../components/Checkbox/Checkbox'",
    props: [
      { name: 'label',    type: 'string' },
      { name: 'checked',  type: 'boolean',   required: true },
      { name: 'disabled', type: 'boolean',   default: 'false' },
      { name: 'onChange', type: '() => void' },
    ],
    usage: "<Checkbox label=\"Aceito os termos\" checked={accepted} onChange={() => setAccepted(v => !v)} />",
  },
  {
    name: 'Badge',
    description: 'Notification count badge.',
    import: "import { Badge } from '../components/Badge/Badge'",
    props: [
      { name: 'count',   type: 'number' },
      { name: 'visible', type: 'boolean', default: 'true' },
    ],
    usage: '<Badge count={3} />',
  },
  {
    name: 'Callout',
    description: 'Inline alert/info/warning/highlight message block.',
    import: "import { Callout } from '../components/Callout/Callout'",
    props: [
      { name: 'status',        type: "'Alert' | 'Information' | 'Warning' | 'Highlight'", required: true },
      { name: 'title',         type: 'string',            required: true },
      { name: 'description',   type: 'string' },
      { name: 'showLink',      type: 'boolean',           default: 'false' },
      { name: 'linkLabel',     type: 'string' },
      { name: 'showClose',     type: 'boolean',           default: 'false' },
      { name: 'highlightIcon', type: 'string',            description: "Icon name, only for status='Highlight'" },
      { name: 'width',         type: 'number | string',   default: '327' },
    ],
    usage: '<Callout status="Information" title="Preparo necessário" description="Jejum de 8h antes da coleta." width="100%" />',
  },
  {
    name: 'Icon',
    description: 'DS icon system. camelCase names. Size auto-selects the right SVG (sm=12, md=16, lg=24, xlg=32).',
    import: "import { Icon } from '../icons/Icon'",
    props: [
      { name: 'name',  type: 'string',  required: true, description: 'camelCase: heartOutlined, chevronArrowRight, add, user, bell, localPin, creditCard, paper, sorting, checkOutlined' },
      { name: 'size',  type: 'number',  default: '24', description: '12 | 16 | 24 | 32' },
      { name: 'color', type: 'string',  default: 'currentColor' },
    ],
    usage: '<Icon name="heartOutlined" size={24} color="var(--color-content-primary)" />',
  },
]

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

const css = readFileSync(CSS_PATH, 'utf8')
const tokens = parseTokens(css)

const manifest = {
  version: '1.0.0',
  ds: 'Wonderland Design System — Alice Health',
  importBase: "All imports from '../components/<Name>/<Name>' relative to packages/ds/src/screens/",
  tokens,
  rules: RULES,
  components: COMPONENTS,
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
console.log(`  ${COMPONENTS.length} componentes`)
console.log(`  ${tokenCount} tokens (lidos do index.css)`)
