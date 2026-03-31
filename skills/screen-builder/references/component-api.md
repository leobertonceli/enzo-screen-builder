# Wonderland DS — Component API Reference

## Icon

```tsx
import { Icon } from '../icons/Icon'

<Icon name="home" size={24} color="var(--color-content-primary)" />
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| name | string | — | Material Design icon name in kebab-case (e.g. "chevron-right", "home", "search"). Browse: https://icon-sets.iconify.design/mdi/ |
| size | number | 24 | px width & height |
| color | string | "currentColor" | CSS color value — use tokens |

---

## NavBar

Top header for all screens. Replaces AppBar. Includes its own status bar internally.

```tsx
import { NavBar } from '../components/NavBar/NavBar'

// Page type — centered title, back arrow
<NavBar type="page" title="Agendar consulta" rightIcons={0} onBack={() => {}} />

// Page with description + 1 right icon
<NavBar type="page" title="Dra. Isabella Moreira" showDescription description="Clínica médica" rightIcons={1} rightIcon1="dots-vertical" onBack={() => {}} />

// Modal type — left-aligned title
<NavBar type="modal" title="Filtros" rightIcons={1} rightIcon1="close" />
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| type | 'page' \| 'modal' | 'page' | page = centered title + back arrow; modal = left-aligned title |
| showTitle | boolean | true | |
| title | string | 'Título' | |
| showDescription | boolean | false | Only visible when showTitle is true |
| description | string | 'Descrição' | Smaller subtitle below title |
| iconLeft | boolean | true | page only: show back arrow (true) or spacer (false) |
| rightIcons | 0 \| 1 \| 2 | 0 | Number of right icon buttons |
| rightIcon1 | string | 'dots-vertical' | MDI icon name |
| rightIcon2 | string | 'share-variant-outline' | MDI icon name |
| onBack | () => void | — | Back arrow callback |
| onRightIcon1 | () => void | — | |
| onRightIcon2 | () => void | — | |

**Rules:**
- ALWAYS use NavBar for screen headers — never build a custom header div
- `type="page"` for detail/flow screens (with back navigation)
- `type="modal"` for bottom sheets and modal overlays

---

## BottomBar

Bottom tab navigation for hub/root screens.

```tsx
import { BottomBar } from '../components/BottomBar/BottomBar'

<BottomBar
  selected="Alice Agora"
  onTabSelect={(tab) => setActive(tab)}
  meuPlanoMode="initials"
  userInitials="LB"
/>
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| selected | 'Alice Agora' \| 'Minha saúde' \| 'Rede Alice' \| 'Meu plano' | 'Alice Agora' | Active tab |
| onTabSelect | (tab) => void | — | Tab change callback |
| tab1Label | string | 'Alice Agora' | |
| tab2Label | string | 'Minha saúde' | |
| tab3Label | string | 'Rede Alice' | |
| tab4Label | string | 'Meu plano' | |
| tab1Icon | string | 'heart' | MDI icon name |
| tab2Icon | string | 'pulse' | MDI icon name |
| tab3Icon | string | 'map-marker' | MDI icon name |
| meuPlanoMode | 'photo' \| 'initials' | 'initials' | Avatar style for 4th tab |
| userInitials | string | — | Shown when meuPlanoMode='initials' |
| userImageUrl | string | — | Shown when meuPlanoMode='photo' |
| width | string \| number | 375 | |

**Rules:**
- Only use on hub/root screens (Alice Agora, Minha saúde, Rede Alice, Meu plano)
- Never use on detail or flow screens
- Component manages its own active state internally — pass `selected` as initial value

---

## TextField

```tsx
import { TextField } from '../components/TextField/TextField'

// Interactive mode (real input — use in screens with forms)
<TextField label="Nome completo" onValueChange={(v) => setNome(v)} />

// With left icon
<TextField label="Buscar" leftIcon="magnify" onValueChange={(v) => setSearch(v)} />

// With error
<TextField label="CPF" hasError helperText="CPF inválido" onValueChange={(v) => {}} />
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| label | string | 'Label' | Floating label |
| value | string | — | Controlled value |
| onValueChange | (value: string) => void | — | Use this for interactive screens — enables real input |
| variant | 'Idle' \| 'Focus' \| 'Filled' \| 'Disable' | 'Idle' | Auto-managed when onValueChange is set |
| hasError | boolean | false | Red border + error styling |
| helperText | string | — | Helper or error message below field |
| counter | string | — | Character counter (e.g. '0/100') |
| leftIcon | string | — | MDI icon name |
| rightIcon | string | — | MDI icon name |
| width | string \| number | '100%' | |

**Rules:**
- Always use `onValueChange` in screens — not `onChange` (that's playground-only)
- When using `onValueChange`, variant is auto-computed — don't pass variant manually

---

## Tabs

```tsx
import { Tabs } from '../components/Tabs/Tabs'

// Text tabs (underline style)
<Tabs
  style="texts"
  items={[{ label: 'Consultas' }, { label: 'Exames', badge: 2 }, { label: 'Histórico' }]}
  activeIndex={0}
  onChange={(i) => setTab(i)}
/>

// Filter tabs (pill style)
<Tabs
  style="filter"
  items={[{ label: 'Todos' }, { label: 'Pendentes', badge: 3 }, { label: 'Concluídos' }]}
  activeIndex={activeFilter}
  onChange={(i) => setFilter(i)}
/>
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| style | 'texts' \| 'filter' | 'texts' | texts = underline tabs; filter = pill tabs |
| items | { label: string; badge?: number }[] | — | Tab items |
| activeIndex | number | 0 | Active tab index |
| onChange | (index: number) => void | — | |
| className | string | — | |

**Rules:**
- `texts`: full-width, horizontal, underline — use for main content sections
- `filter`: wrapping pills — use for filtering/sorting

---

## Button

```tsx
import { Button } from '../components/Button'

<Button label="Agendar consulta" style="primary" size="large" className="w-full" />
<Button label="Cancelar" style="secondary" size="medium" />
<Button label="Ver detalhes" style="tertiary" size="small" type="right-icon" iconElement={<Icon name="chevron-right" size={16} />} />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | "Button label" | |
| style | string | "primary" | "primary", "secondary", "tertiary" |
| size | string | "large" | "large" (56px), "medium" (48px), "small" (40px) |
| state | string | "enabled" | "enabled", "disabled", "loading" |
| type | string | "text" | "text", "left-icon", "right-icon", "only-icon" |
| darkMode | boolean | false | |
| iconElement | ReactNode | — | |
| onClick | () => void | — | |
| className | string | — | "w-full", "flex-1" for sizing |

---

## ListItem

```tsx
import { ListItem } from '../components/ListItem'

<ListItem
  title="Consulta agendada"
  description="Dr. Felipe Andrade · Cardiologia"
  size="small"
  leftSide="icon"
  icon={<Icon name="calendar-check" size={20} color="var(--color-content-primary)" />}
  rightAsset="icon"
  rightIconElement={<Icon name="chevron-right" size={20} color="var(--color-content-tertiary)" />}
  divider
  fullWidth
/>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| title | string | "Title" | |
| description | string | — | |
| size | string | "large" | "large", "small" |
| leftSide | string | "none" | "none", "icon", "image" |
| rightAsset | string | "icon" | "none", "icon", "text", "text-icon" |
| rightText | string | — | When rightAsset includes text |
| icon | ReactNode | — | Left icon element |
| rightIconElement | ReactNode | — | Default: chevron-right |
| imageSrc | string | — | For leftSide="image" |
| divider | boolean | true | Bottom border — set false on last item |
| fullWidth | boolean | true | |
| onClick | () => void | — | |

---

## Chip

```tsx
import { Chip } from '../components/Chip'

<Chip label="Cardiologia" variant="text" size="sm" state="idle" />
<Chip label="Filtro ativo" variant="text" size="sm" state="selected" />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | "Suggestion" | |
| variant | string | "text" | "text", "icon", "image" |
| size | string | "sm" | "sm", "md", "lg" |
| state | string | "idle" | "idle", "selected", "pressed", "disabled" |
| affordanceIcon | boolean | false | Close/action icon on right |
| iconElement | ReactNode | — | For variant="icon" |
| imageUrl | string | — | For variant="image" |
| onClick | () => void | — | |

---

## BaseCard

```tsx
import { BaseCard } from '../components/BaseCard'

<BaseCard
  size="small"
  filled={false}
  title="Próxima consulta"
  subtitle="Dr. Felipe Andrade · 15/04 às 14h"
  showCategory={false}
  action="button"
  buttonLabel="Ver detalhes"
  leftAsset={false}
  rightAsset={false}
  showSlot={false}
  width="100%"
/>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| size | string | "large" | "large", "small" |
| filled | boolean | false | true = filled bg, false = outlined |
| category | string | — | Magenta label |
| showCategory | boolean | true | |
| title | string | "Title" | |
| showTitle | boolean | true | |
| subtitle | string | — | |
| showSubtitle | boolean | true | |
| leftAsset | boolean | true | |
| rightAsset | boolean | true | |
| leftIcon | ReactNode | — | |
| rightIcon | ReactNode | — | |
| leftImage | string | — | Photo URL |
| action | string | "none" | "none", "button", "2buttons", "link", "2links" |
| buttonLabel | string | — | |
| linkLabel | string | — | |
| showSlot | boolean | true | |
| slot | ReactNode | — | |
| width | string \| number | 327 | |

---

## Callout

Informational banner with status color and optional link/close.

```tsx
import { Callout } from '../components/Callout/Callout'

<Callout status="Information" title="Seu plano cobre essa consulta" />
<Callout status="Alert" title="Pagamento pendente" description="Regularize para continuar usando os serviços." showLink linkLabel="Resolver agora" />
<Callout status="Warning" title="Atenção" description="Este procedimento requer autorização prévia." />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| status | string | 'Information' | 'Alert', 'Information', 'Warning', 'Highlight' |
| title | string | — | |
| description | string | — | |
| showLink | boolean | false | |
| linkLabel | string | — | |
| showClose | boolean | false | |
| highlightIcon | string | — | MDI icon name override |
| width | string \| number | '100%' | |

---

## Badge

Small counter or dot indicator. Usually overlaid on icons or avatars.

```tsx
import { Badge } from '../components/Badge/Badge'

<Badge type="counter" size="md" count={3} />
<Badge type="dot" size="sm" />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| type | string | 'counter' | 'counter', 'dot' |
| size | string | 'md' | 'sm', 'md' |
| stroke | boolean | false | White border (for overlaying on colored bg) |
| count | number | — | Number shown on counter type |

---

## Checkbox

```tsx
import { Checkbox } from '../components/Checkbox/Checkbox'

<Checkbox state="unselected" onChange={() => setChecked(!checked)} />
<Checkbox state="selected" />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| state | string | 'unselected' | 'unselected', 'selected', 'indeterminate' |
| disabled | boolean | false | |
| onChange | () => void | — | |

---

## Avatar

```tsx
import { Avatar } from '../components/Avatar/Avatar'

<Avatar size="medium" type="image" src="https://..." />
<Avatar size="large" type="placeholder" status="active" />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| size | string | 'large' | 'large', 'medium', 'small', 'xsmall' |
| type | string | 'placeholder' | 'image', 'placeholder' |
| status | string | 'idle' | 'idle', 'active' |
| src | string | — | Image URL |

---

## Shortcut

Quick action card — used for primary actions on hub screens.

```tsx
import { Shortcut } from '../components/Shortcut/Shortcut'

<Shortcut
  type="callout"
  title="Agendar consulta"
  subtitle="Encontre um especialista"
  icon={<Icon name="calendar-plus" size={24} color="var(--color-content-primary)" />}
  onClick={() => {}}
/>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| type | string | 'callout' | 'callout', 'support' |
| state | string | 'idle' | 'idle', 'pressed', 'disabled', 'loading' |
| title | string | — | |
| subtitle | string | — | |
| badge | boolean | false | |
| badgeCount | number | — | |
| icon | ReactNode | — | |
| onClick | () => void | — | |

---

## ChatBubble

```tsx
import { ChatBubble } from '../components/ChatBubble/ChatBubble'

<ChatBubble variant="text" text="Olá! Como posso te ajudar hoje?" time="09:41" />
<ChatBubble variant="reply" text="Quero agendar uma consulta" replyAuthor="Alice" replyText="Olá! Como posso te ajudar?" time="09:42" />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| variant | string | 'text' | 'text', 'reply', 'document', 'media' |
| text | string | — | |
| time | string | — | |
| replyAuthor | string | — | For variant='reply' |
| replyText | string | — | For variant='reply' |
| fileName | string | — | For variant='document' |
| fileFormat | string | — | For variant='document' |
| images | string[] | — | For variant='media' |
| reaction | boolean | false | |
| reactionEmoji | string | — | |
| width | string \| number | — | |

---

## ChatInput

```tsx
import { ChatInput } from '../components/ChatInput/ChatInput'

<ChatInput
  state="idle"
  placeholder="Escreva uma mensagem..."
  onSend={() => {}}
  showMic
  showPlus
  width="100%"
/>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| state | string | 'idle' | 'idle', 'typing', 'disabled' |
| placeholder | string | — | |
| value | string | — | |
| showMic | boolean | false | |
| showPlus | boolean | false | |
| reply | boolean | false | |
| replyName | string | — | |
| replyMessage | string | — | |
| onChange | (value: string) => void | — | |
| onSend | () => void | — | |
| onMic | () => void | — | |
| onAdd | () => void | — | |
| width | string \| number | — | |
