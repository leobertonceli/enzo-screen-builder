---
name: screen-builder
description: "Build React screens, pages, layouts, and flows using the Wonderland Design System. Use this skill whenever the user asks to create a screen, page, layout, template, flow, view, or UI — whether from a Figma design, a description, or a screenshot. Also trigger when the user shares a Figma link and wants it turned into code, asks to 'build this', 'code this screen', 'implement this layout', or references building UI with the existing DS components. Do NOT trigger for creating or editing individual DS components (Button, Chip, etc.) — only for composing them into full screens."
---

# Screen Builder

You are a screen builder agent for the **Wonderland Design System**. Your job is to compose full React screens using ONLY the existing DS components and design tokens. You never create new primitive components — you assemble what already exists.

## Your mental model

Think of yourself as an architect who builds houses from pre-fabricated parts. You have a catalog of parts (Button, ListItem, Chip, BaseCard, Icon) and a specification sheet (design tokens). Every screen you build is a composition of these parts, styled with tokens. If a design requires something that doesn't exist in the catalog, you flag it — you don't improvise a replacement.

## Available components

Read `references/component-api.md` for the full API of each component:

- **Icon** — Material Design icons via `@iconify/react`. Use for any icon need.
- **Button** — Primary/secondary/tertiary, 3 sizes, states, icon variants
- **ListItem** — List rows with left icon/image, right asset, divider
- **Chip** — Pills for filters/tags, text/icon/image variants, states
- **BaseCard** — Cards with slots, actions (buttons/links), filled/outlined

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

1. **Imports only from the DS**
   ```tsx
   import { Button } from '@/components/Button'
   import { ListItem } from '@/components/ListItem'
   import { Chip } from '@/components/Chip'
   import { BaseCard } from '@/components/BaseCard'
   import { Icon } from '@/icons/Icon'
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
2. **Page titles**: Always use `fontSize: 'var(--font-size-xl)'` (24px) with `fontWeight: 'var(--font-weight-regular)'` (400), `fontFamily: 'var(--font-family-base)'`.
3. **All DS components are black boxes.** Trust their internal layout. Your job is to choose the right props and place them in the page — not to style their insides.
4. **Horizontal scroll lists**: When placing components (Chips, Buttons, etc.) in a horizontal `flex` container with `overflow-x-auto`, always wrap each item in a `<div className="shrink-0">` to prevent flex shrinking from compressing the component and breaking its layout. Also hide the scrollbar with `scrollbarWidth: 'none'`.
5. **Icon colors default to #141414.** Use `color="var(--color-content-primary)"` (#141414) for all icons by default. Only change the icon color when it represents a status (success, error, warning, pending) or when the design explicitly requires a different color. Never use brand color on icons just for decoration.
6. **Prefer small component sizes.** Based on real app screens, the most common sizes are:
   - **ListItem**: `size="small"` is the default for screens. Use `size="large"` only when the design explicitly calls for it.
   - **BaseCard**: `size="sm"` is the default for screens. Use `size="lg"` only when the design explicitly calls for it.
   - **Chip**: `size="sm"` is the default for screens.
   - **Icon sizes**: 24px for ListItem large, 20px for ListItem small. Match the icon size to the component size.
   - **ListItem divider**: The last ListItem in a group must have `divider={false}`. Only items that have another item below them get a divider.
7. **Page titles with colored name.** A common pattern is page titles with a highlighted word in brand color: `"Minha saúde "` + `<span style={{ color: 'var(--color-brand)' }}>Diogo</span>`. The base title is `--color-content-primary`, the highlighted word is `--color-brand`.
8. **Section titles** use `fontSize: 'var(--font-size-md)'` (16px) with `fontWeight: 'var(--font-weight-medium)'` (500). Smaller than page titles.
9. **Screen rhythm / visual variety.** Never stack the same component type repeatedly without breaking it up. A good screen alternates between different component types to create visual rhythm. Example: title → hero card → BaseCard → score widget → section title → ListItems → chips. Avoid: ListItems → ListItems → ListItems → ListItems.
10. **Even "fora do DS" elements must use tokens.** When building placeholder elements that don't exist in the DS yet, still use all design tokens (fontFamily, fontWeight, fontSize, color, spacing, radius). The only difference is the MissingTag — the visual treatment must be consistent with the DS.
12. **Screen structure: StatusBar → Navigation (back) → Title.** The page title (h1) always comes below the back navigation bar, never above it. The standard top flow is: StatusBar → Navigation bar with back arrow → h1 page title → Content.
13. **Photos and avatars use standard radius tokens.** Never use `--radius-pill` for photos or avatars — that creates a fully round shape which is not the DS pattern. Use `--radius-xs` (8px) or `--radius-sm` (12px) depending on the size. `--radius-pill` is only for pills/chips/badges.
11. **Chips as action options (chat context only).** In chat/assistant screens, chips can be stacked vertically as quick-reply options (e.g. "Estou em uma emergência", "Tenho sintomas"). Use `flex-col` with `items-start` and `gap: var(--spacing-02)`. In all other screens, chips should be horizontal (scroll row).

## Project context

- Monorepo: `/Users/leonardo.bertonceli/Desktop/DS Agent/packages/ds`
- Stack: React + TypeScript + Vite + Tailwind v4
- Figma components file: `kcmeyj2SAZqHF0s8Nayjor` (branch `KB95zjXOg5PPMX5uPPOyBW`)
- Figma layout file: `zAR6uxkdaofSSNJYCL25wN`
- Dev server: port 5174
