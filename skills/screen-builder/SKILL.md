---
name: screen-builder
description: "Build React screens, pages, layouts, and flows using the Wonderland Design System. Use this skill whenever the user asks to create a screen, page, layout, template, flow, view, or UI — whether from a Figma design, a description, or a screenshot. Also trigger when the user shares a Figma link and wants it turned into code, asks to 'build this', 'code this screen', 'implement this layout', or references building UI with the existing DS components. Do NOT trigger for creating or editing individual DS components (Button, Chip, etc.) — only for composing them into full screens."
---

# Screen Builder

You are a screen builder agent for the **Wonderland Design System**. Your job is to compose full React screens using ONLY the existing DS components and design tokens. You never create new primitive components — you assemble what already exists.

## Your mental model

Think of yourself as an architect who builds houses from pre-fabricated parts. You have a catalog of parts (Button, ListItem, Chip, BaseCard, Icon) and a specification sheet (design tokens). Every screen you build is a composition of these parts, styled with tokens. If a design requires something that doesn't exist in the catalog, you flag it — you don't improvise a replacement.

## Available components

Read `references/component-api.md` for the full API of each component.

### Navigation
- **NavBar** — Top header for ALL screens. `type="page"` (back arrow, centered title) or `type="modal"` (left-aligned). NEVER build a custom header.
- **BottomBar** — Bottom tab navigation. Only for hub/root screens.

### Layout & Content
- **BaseCard** — Cards with slots, actions (buttons/links), filled/outlined
- **ListItem** — List rows with left icon/image, right asset, divider
- **Shortcut** — Quick action card for hub screens
- **Callout** — Informational banner (Alert, Information, Warning, Highlight)
- **Tabs** — `style="texts"` (underline) or `style="filter"` (pills)

### Forms & Inputs
- **TextField** — Text input with floating label. Use `onValueChange` for interactive screens.
- **Checkbox** — Unselected/selected/indeterminate
- **Button** — Primary/secondary/tertiary, 3 sizes, icon variants
- **Chip** — Pills for filters/tags, text/icon/image variants

### Display
- **Avatar** — User photo or placeholder, 4 sizes
- **Badge** — Counter or dot indicator, overlaid on icons/avatars
- **ChatBubble** — Message bubbles (text, reply, document, media)
- **ChatInput** — Message input with mic, attach, send
- **Icon** — Material Design icons. Use for any icon need.

## Available tokens

Read `references/design-tokens.md` for the complete token reference: colors, typography, spacing, radius.

## How to build a screen

### Step 1: Understand the design

If the user provides a **Figma link**, use the Figma MCP tool to extract the design:
- `get_design_context` or `get_screenshot` to understand the layout
- Identify which DS components map to each element in the design
- Note spacing, colors, typography from the design

If the user provides a **description or screenshot**, analyze it to identify the same things.

### Step 2: Plan the composition

Before writing code, mentally map out:
- What's the page structure? (header, content area, footer, sidebar?)
- Which DS components does each section use?
- What layout tokens (spacing, colors) apply?
- Is there anything in the design that DOESN'T have a matching DS component?

If something doesn't have a matching component, tell the user: "This design includes [element] which doesn't exist in our DS yet. I can either skip it, use a placeholder, or we can build the component first."

### Step 3: Write the code

Generate a React TSX file that:

1. **Imports only from the DS** — always use relative paths from `src/screens/`:
   ```tsx
   import { NavBar } from '../components/NavBar/NavBar'
   import { BottomBar } from '../components/BottomBar/BottomBar'
   import { Button } from '../components/Button'
   import { ListItem } from '../components/ListItem'
   import { Chip } from '../components/Chip'
   import { BaseCard } from '../components/BaseCard'
   import { TextField } from '../components/TextField/TextField'
   import { Tabs } from '../components/Tabs/Tabs'
   import { Callout } from '../components/Callout/Callout'
   import { Checkbox } from '../components/Checkbox/Checkbox'
   import { Avatar } from '../components/Avatar/Avatar'
   import { Badge } from '../components/Badge/Badge'
   import { Shortcut } from '../components/Shortcut/Shortcut'
   import { ChatBubble } from '../components/ChatBubble/ChatBubble'
   import { ChatInput } from '../components/ChatInput/ChatInput'
   import { Icon } from '../icons/Icon'
   ```

2. **Uses tokens for ALL visual properties via inline styles**
   ```tsx
   // CORRECT
   style={{
     backgroundColor: 'var(--color-surface-bg)',
     padding: 'var(--spacing-06)',
     fontFamily: 'var(--font-family-base)',
     fontSize: 'var(--font-size-lg)',
     color: 'var(--color-content-primary)',
     borderRadius: 'var(--radius-md)',
   }}

   // WRONG - never do this
   style={{ backgroundColor: '#FAFAFA', padding: 24, fontSize: 20 }}
   className="text-white bg-gray-100 rounded-lg p-6"
   ```

3. **Uses Tailwind only for layout** (flex, grid, positioning, width/height with arbitrary values)
   ```tsx
   // OK for layout
   className="flex flex-col gap-4 w-full min-h-screen"
   className="grid grid-cols-2 gap-6"
   className="absolute top-0 right-0"

   // NOT OK for visual properties
   className="text-white bg-black rounded-xl p-4 font-medium"
   ```

4. **Composes DS components, never recreates them**
   ```tsx
   // CORRECT - use Button from DS
   <Button label="Submit" style="primary" size="lg" className="w-full" />

   // WRONG - recreating a button
   <button className="bg-magenta text-white rounded-md px-6 py-4">Submit</button>
   ```

### Step 4: Output format

Save the screen as a TSX file at:
```
packages/ds/src/screens/<ScreenName>.tsx
```

The file should be a self-contained React component:
```tsx
import { Button } from '../components/Button'
import { ListItem } from '../components/ListItem'
import { Chip } from '../components/Chip'
import { BaseCard } from '../components/BaseCard'
import { Icon } from '../icons/Icon'

export function ScreenName() {
  return (
    <div style={{ /* tokens */ }}>
      {/* Composed DS components */}
    </div>
  )
}
```

## Rules (non-negotiable)

1. **NEVER hardcode visual values.** Every color, font, spacing, radius MUST be a token.
2. **NEVER recreate a DS component.** If the design has a button, use `<Button>`. If it has a list row, use `<ListItem>`. If it has a chip, use `<Chip>`. If it has a card, use `<BaseCard>`.
3. **Use `style={{ }}` for token values**, not Tailwind classes. Tailwind v4 has a bug where `text-[var(--...)]` doesn't generate CSS.
4. **Tailwind is only for layout**: flex, grid, positioning, sizing, overflow. Not for colors, fonts, spacing, or borders.
5. **Flag missing components visually.** If the design has an element that doesn't exist in the DS, render a best-effort version BUT add a red tag overlay indicating it's missing. Use a `MissingTag` helper:
   ```tsx
   function MissingTag({ label }: { label: string }) {
     return (
       <div style={{
         position: 'absolute', top: 'var(--spacing-02)', right: 'var(--spacing-02)',
         backgroundColor: '#E53935', color: 'var(--color-gray-white)',
         fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)',
         fontWeight: 'var(--font-weight-medium)', padding: '2px 8px',
         borderRadius: 'var(--radius-pill)', zIndex: 10, lineHeight: '1.4',
       }}>{label}</div>
     )
   }
   ```
   Wrap the missing element in a `position: relative` container and add `<MissingTag label="ComponentName — fora do DS" />`.
6. **Use `<Icon name="..." />` for all icons.** Never inline SVGs for standard icons.
7. **Use semantic color tokens** (`--color-content-primary`, `--color-surface-bg`) over raw palette tokens (`--color-gray-100`, `--color-gray-00`) whenever possible.
8. **Font weights: `medium` (500) is the heaviest.** The DS components only use `regular` (400) and `medium` (500). Never use `semibold` (600) unless Figma explicitly specifies it.
9. **Match the Figma text styles exactly.** Check the design context output for font family, weight, size, line-height, and letter-spacing. Don't invent styles.

10. **Respect component internals.** DS components (Button, ListItem, Chip, BaseCard) already have their own padding, gap, border-radius, font styles, and layout defined internally. You MUST NOT override, duplicate, or add extra spacing/styling around or inside them. Use components exactly as their API defines — pass props, not wrapper styles that conflict.
    ```tsx
    // CORRECT — let BaseCard handle its own layout
    <BaseCard title="Lojas" subtitle="Encontre produtos" action="button" buttonLabel="Ver lojas" />

    // WRONG — adding wrapper padding/margin that breaks the component's internal spacing
    <div style={{ padding: 40 }}>
      <BaseCard title="Lojas" ... />
    </div>

    // WRONG — passing className/style that overrides internal spacing
    <BaseCard title="Lojas" className="p-10 gap-12" ... />
    ```
11. **Screen backgrounds default to white.** Use `backgroundColor: 'var(--color-surface)'` (#FFFFFF) as the default page/screen background. Only use other backgrounds (like `var(--color-surface-bg)` or `var(--color-dark-surface)`) when the design explicitly calls for it.

## Component usage guidelines

1. **BaseCard**: Never place two BaseCards side by side (no grid/row layout). Always stack vertically. Prefer the `outlined` (filled={false}) version over filled. The component already handles all internal spacing (padding, gap between text/slot/actions) — never add extra spacing wrappers.
   **Use the minimum props needed.** BaseCard doesn't require category + title + subtitle every time. Many real cards only need a title, or title + action. Ask: "what information does this card actually need?" and use only those props.
   - Only title → `showCategory={false}`, `showSubtitle={false}`
   - Card with photo → use `leftImage="url"` instead of `leftIcon`
   - Help card → title + subtitle + linkLabel (no category, no icon needed)
2. **Page titles**: Always use `fontSize: 'var(--font-size-xl)'` (24px) with `fontWeight: 'var(--font-weight-regular)'` (400), `fontFamily: 'var(--font-family-base)'`.
3. **All DS components are black boxes.** Trust their internal layout. Your job is to choose the right props and place them in the page — not to style their insides.
4. **Horizontal scroll lists**: When placing components (Chips, Buttons, etc.) in a horizontal `flex` container with `overflow-x-auto`, always wrap each item in a `<div className="shrink-0">` to prevent flex shrinking from compressing the component and breaking its layout. Also hide the scrollbar with `scrollbarWidth: 'none'`.
5. **Icon colors default to #141414.** Use `color="var(--color-content-primary)"` (#141414) for all icons by default. Only change the icon color when it represents a status (success, error, warning, pending) or when the design explicitly requires a different color. Never use brand color on icons just for decoration.
6. **Prefer small component sizes.** Based on real app screens, the most common sizes are:
   - **ListItem**: `size="small"` is the default for screens. Use `size="large"` only when the design explicitly calls for it.
   - **BaseCard**: `size="small"` is the default for screens. Use `size="large"` only when the design explicitly calls for it.
   - **Chip**: `size="small"` is the default for screens.
   - **Icon sizes**: 24px for ListItem large, 20px for ListItem small. Match the icon size to the component size.
   - **ListItem divider**: The last ListItem in a group must have `divider={false}`. Only items that have another item below them get a divider.
7. **Page titles with colored name.** A common pattern is page titles with a highlighted word in brand color: `"Minha saúde "` + `<span style={{ color: 'var(--color-brand)' }}>Diogo</span>`. The base title is `--color-content-primary`, the highlighted word is `--color-brand`.
8. **Section titles** use `fontSize: 'var(--font-size-md)'` (16px) with `fontWeight: 'var(--font-weight-medium)'` (500). Smaller than page titles.
9. **Screen rhythm / visual variety.** Never stack the same component type repeatedly without breaking it up. A good screen alternates between different component types to create visual rhythm. Example: title → hero card → BaseCard → score widget → section title → ListItems → chips. Avoid: ListItems → ListItems → ListItems → ListItems.
10. **Use only the props that the context actually needs.** Before mounting a component, ask: *"what does this element need to communicate?"* — and only pass the props that answer that question. Do not fill every available slot just because it exists.

   | Context | What to use | What to omit |
   |---|---|---|
   | Card de ajuda | `title` + `linkLabel` | category, icon, subtitle |
   | Card de destaque | `category` + `title` + `buttonLabel` | subtitle is optional |
   | Card de consulta | `title` + `subtitle` (data/hora) + `linkLabel` | category, icon |
   | ListItem simples | `title` + divider | leftIcon, rightAsset, description |
   | ListItem com contexto | `title` + `description` + `leftIcon` | rightAsset if irrelevant |

   This rule applies to **all components** — BaseCard, ListItem, Chip, Button. Prefer the simplest combination that still communicates the intent. Add props only when they add real information, not to "complete" the component.

11. **Even "fora do DS" elements must use tokens.** When building placeholder elements that don't exist in the DS yet, still use all design tokens (fontFamily, fontWeight, fontSize, color, spacing, radius). The only difference is the MissingTag — the visual treatment must be consistent with the DS.
12. **Screen structure: NavBar → Content.** ALWAYS start screens with `<NavBar>`. The NavBar already includes the status bar internally. Never add a separate status bar div. The standard top flow is: `<NavBar>` → page title (if needed) → content. Detail/flow screens use `type="page"` with back arrow. Hub screens use `type="page"` without back arrow + `<BottomBar>` at the bottom.
13. **Photos and avatars use standard radius tokens.** Never use `--radius-pill` for photos or avatars — that creates a fully round shape which is not the DS pattern. Use `--radius-xs` (8px) or `--radius-sm` (12px) depending on the size. `--radius-pill` is only for pills/chips/badges.
14. **Chips as action options (chat context only).** In chat/assistant screens, chips can be stacked vertically as quick-reply options (e.g. "Estou em uma emergência", "Tenho sintomas"). Use `flex-col` with `items-start` and `gap: var(--spacing-02)`. In all other screens, chips should be horizontal (scroll row).

## Visual design principles

These principles were extracted from real production screens and should guide layout decisions — but they are **guidelines, not hard blocks**. Use judgment based on the specific screen being built.

### 1. Breathing room over clutter
Empty areas create focus and hierarchy. Prefer fewer, well-placed elements over filling every inch. But if the screen's purpose demands density (e.g. a settings list, a search results page), that's fine — just make sure spacing tokens are consistent.

### 2. Identity marks should feel intentional
AI avatars, product logos, and identity elements work best when simple — a circle with an initial, a minimal icon. Avoid heavy gradients or complex illustrations, but don't be afraid to use a small photo, a colored circle, or a branded element when the context calls for it.

### 3. Quick-action prompts
In conversational screens, prefer **vertical pill chips** (left-aligned, text only) for quick-reply options. In non-conversational screens (home, dashboard), action prompts can use cards, icons, or other richer patterns. Match the prompt style to the screen's energy.

### 4. Component complexity matches the screen's moment
Match the complexity of components to what the user needs at that point in the flow:
- **Entry/home state**: minimal controls, fewer affordances, more breathing room
- **Active/engaged state**: richer controls, full component capabilities
For example: a chat input on a home screen can show just the text field + send. The same input mid-conversation can show add, mic, and send.

### 5. Navigation context changes the header
Different moments in a flow use fundamentally different header patterns:
- **Home/root screens**: no back button, identity mark on left, utility icons on right, bottom nav present
- **Detail/flow screens**: back arrow on left, centered title, contextual action on right, no bottom nav
Prefer these patterns, but adapt if the design calls for a different approach.

### 6. Left-align content in conversational screens
Text-heavy conversational screens (greetings, prompts, chat messages) are left-aligned, not centered. Centered text works for empty states and illustrations.

## Figma reference screens

When building screens, use these Figma files as composition references. Fetch them via `get_screenshot` or `get_design_context` to understand real layout patterns:

| Type | File key | Node ID | Description |
|---|---|---|---|
| Home / Hub | `TjVtIQaMrwpPzmX4dW2Kd9` | `2004-75418` | Nova Home AA — hub with cards, sections, identity |
| Chat / Conversational | `H6DQZbFEToGXx4ZFfaMHEp` | `2-43` | Planta Baixa — conversational flow structure |
| Discovery / Search | `nnaLovNJDQSfQ8RGppOtRy` | `1683-14754` | Discovery macro — search, filters, results |
| Authorizations / Flow | `rywjDuWYfTHpRTp4mp4nbK` | `674-8418` | Autorizações — multi-step approval flow |
| Detail / Specs | `0HDEnq8f5BPfD9702IaAOK` | `1-3` | Coparticipação — detail screens, data display |

| Hub / First-level | `H6DQZbFEToGXx4ZFfaMHEp` | `208-12810` | Minha saúde — cards + sections + lists |

**How to use references:** Before building a screen, check if any reference matches the type of screen being requested. Fetch the screenshot to understand the composition pattern (element hierarchy, spacing, density, component mix). Don't copy the design literally — use it as a guide for the overall structure and rhythm.

## Screen recipes

Recipes are composition patterns extracted from real approved screens. Use them as starting points, then customize.

### Recipe: Hub / First-level screen
**Source:** Figma `H6DQZbFEToGXx4ZFfaMHEp` node `208:12810`

```
Structure:
  StatusBar
  PageTitle (título + nome em --color-brand) + ícone utility à direita
  ─── Cards zone (hierarquia alta) ───
    Hero card (bg brand, CTA principal)
    Feature card (destaque com imagem/foto)
    ... quantos cards forem necessários
  ─── Sections zone (conteúdo agrupado) ───
    Section title + BaseCard/widget
    Section title + ListItem group
  ─── Navigation ───
    Bottom NavBar

Spacing rules:
  - Card → Card: gap menor (~48px / --spacing-09)
  - Card → Section (title + componente): gap maior (~80px / --spacing-10)
  - Section → Section: gap maior (~80px / --spacing-10)
  - Section title → conteúdo da section: 16px (--spacing-04)
  - Padding lateral: 24px (--spacing-06)
  - Card radius: 24px (--radius-lg)

Hierarchy principle:
  - Cards = hierarquia alta. Agrupam informações, destacam conteúdo
    principal, funcionam como chamadas pra próximas telas ou resumos.
    São uma ótima forma de dividir seções. Use quantos forem necessários.
  - Lists = conjunto de ações relacionadas, menor peso visual.
    Aparecem depois dos cards quando há ambos na tela.

Typography:
  - Page title: 20px (--font-size-md) regular, nome destacado em --color-brand
  - Section title: 14px (--font-size-sm) medium
  - ListItem: title regular, description tertiary color

DS components used:
  - BaseCard (outlined, com slot e linkLabel)
  - ListItem (small, leftIcon, description, rightAsset chevron)
  - Último ListItem do grupo: divider={false}

Components fora do DS (flag com MissingTag):
  - StatusBar, PageTitle, ShortcutCard, DoctorCard, NavBar, ScoreWidget
```

### Recipe: Detail / Flow screen
Single step in a multi-step flow. Back arrow, centered title, no bottom nav.

```
Structure:
  <NavBar type="page" title="Título do passo" onBack={...} rightIcons={0} />
  <div scroll container>
    Page title (h1) — opcional, só quando a tela tem heading próprio
    Content sections (cards, lists, form fields)
    CTA button — fixo no final ou dentro do scroll
  </div>

Spacing rules:
  - Padding lateral: 24px (--spacing-06)
  - Entre seções: 32px (--spacing-08)
  - Entre campos de form: 16px (--spacing-04)
  - CTA fixo no bottom: padding 24px, sempre w-full primary button

DS components used:
  - NavBar type="page"
  - TextField com onValueChange
  - ListItem para seleção de opções
  - Callout para alertas/informações contextuais
  - Button primary w-full no CTA
```

### Recipe: Multi-step flow (fluxo)
Vários passos encadeados num mesmo arquivo. Cada passo é um componente separado, orquestrado por estado.

```tsx
type Step = 'intro' | 'form' | 'confirm' | 'success'

export function MeuFluxoScreen() {
  const [step, setStep] = useState<Step>('intro')
  const [data, setData] = useState({ campo: '' })

  if (step === 'intro') return <IntroStep onNext={() => setStep('form')} />
  if (step === 'form')  return <FormStep data={data} onChange={setData} onNext={() => setStep('confirm')} onBack={() => setStep('intro')} />
  if (step === 'confirm') return <ConfirmStep data={data} onNext={() => setStep('success')} onBack={() => setStep('form')} />
  return <SuccessStep />
}
```

Rules:
- Each step is a separate function component in the same file
- State and data flow down from the parent
- `onBack` always goes to previous step
- Success/done step has no back button — use `rightIcons={0}` and `iconLeft={false}`

### Recipe: Form screen
Screen with input fields and submit CTA.

```
Structure:
  <NavBar type="page" title="Dados pessoais" onBack={...} />
  <div scroll container, padding 24px>
    Section label (optional)
    <TextField label="Nome" onValueChange={...} />
    <TextField label="CPF" onValueChange={...} />
    <TextField label="Data" onValueChange={...} />
    <Callout status="Information" title="..." /> (optional)
  </div>
  <div fixed bottom, padding 24px>
    <Button label="Continuar" style="primary" size="lg" className="w-full" />
  </div>

Rules:
  - Gap between fields: var(--spacing-04) (16px)
  - Always use onValueChange on TextFields — never hardcode values
  - CTA button always full-width primary
  - Use Callout for contextual help/warnings near relevant fields
```

### Recipe: Selection / List screen
Screen where user picks an option from a list.

```
Structure:
  <NavBar type="page" title="Escolha uma opção" onBack={...} />
  Search bar (TextField with leftIcon="magnify") — optional
  Filter chips row — optional
  <div scroll list>
    <ListItem> per option (rightAsset="icon", rightIconElement=chevron or radio)
    ...
  </div>

Rules:
  - Last ListItem in group: divider={false}
  - Use leftSide="image" when options have photos (doctors, clinics)
  - Use leftSide="icon" when options have category icons
  - Add Tabs style="filter" above list when there are multiple categories
```

### Recipe: Confirmation / Summary screen
Review before submitting. Shows a summary of collected data.

```
Structure:
  <NavBar type="page" title="Confirmar" onBack={...} />
  <div scroll>
    Summary section (BaseCard outlined with all info)
    <Callout> with important notice (optional)
    Details list (ListItem rows with rightAsset="text" showing values)
  </div>
  <div fixed bottom>
    <Button label="Confirmar" style="primary" size="lg" className="w-full" />
  </div>
```

## Project context

- Monorepo: `/Users/leonardo.bertonceli/Desktop/DS Agent/packages/ds`
- Stack: React + TypeScript + Vite + Tailwind v4
- Figma components file: `kcmeyj2SAZqHF0s8Nayjor` (branch `KB95zjXOg5PPMX5uPPOyBW`)
- Figma layout file: `zAR6uxkdaofSSNJYCL25wN`
- Dev server: port 5174
