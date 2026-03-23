# Wonderland Design System — Project Rules

## Rule #1: Always use design tokens

**NEVER use hardcoded values** for colors, fonts, sizes, spacing, or radii.
Every visual property MUST reference a CSS custom property (token) from `packages/ds/src/index.css`.

### Colors
- Use `var(--color-gray-white)`, `var(--color-gray-100)`, etc. — NEVER `#FFFFFF`, `#141414`, `white`
- Use `var(--color-content-primary)`, `var(--color-content-secondary)`, etc. for semantic colors
- Use `var(--color-brand)` for magenta — NEVER `#BE0380`

### Fonts
- `fontFamily: 'var(--font-family-base)'` (Haffer) — NEVER omit fontFamily on text elements
- `fontFamily: 'var(--font-family-label)'` (DM Sans) for content/paragraph text
- `fontSize: 'var(--font-size-xs)'` (12px), `var(--font-size-sm)` (14px), `var(--font-size-md)` (16px), etc.
- NEVER use Tailwind `text-[12px]`, `text-[14px]`, `text-white`, `font-medium`, etc. for styled text
- `fontWeight: 'var(--font-weight-medium)'` (500), `var(--font-weight-semibold)` (600)

### Spacing
- Use `var(--spacing-01)` (4px) through `var(--spacing-10)` (80px)
- Prefer tokens over hardcoded px: `padding: 'var(--spacing-04)'` instead of `padding: 16`

### Border radius
- `var(--radius-xs)` (8px), `var(--radius-sm)` (12px), `var(--radius-md)` (16px), `var(--radius-lg)` (20px), `var(--radius-pill)` (200px)
- NEVER use `borderRadius: 8`, `borderRadius: 12`, etc.

### Icons
- Use `<Icon name="..." />` from `src/icons/Icon.tsx` (Material Design Icons via @iconify/react)
- NEVER use inline SVGs for standard icons — only for custom/unique shapes (logo, decorative)

## Rule #2: Tailwind v4 bug workaround

`text-[var(--...)]`, `bg-[var(--...)]` arbitrary values DON'T generate CSS in Tailwind v4.
Always use inline `style={{ }}` props for token-based values instead.

## Rule #3: Component architecture

- Components live in `packages/ds/src/components/<Name>/<Name>.tsx`
- Playground configs in `packages/ds/src/playground/configs/<Name>Config.tsx`
- All component specs come from Figma — always verify sizes, colors, radii against Figma before implementing
- Controls MUST be contextual: only show options that are relevant to the current selection
  - Example: icon picker only appears when a variant with icon is selected (e.g. `left-icon`, `right-icon`, `only-icon`)
  - Example: right text input only appears when `rightAsset` includes text (e.g. `text`, `text-icon`)
  - Use `showWhen: { field: 'controlName', values: ['value1', 'value2'] }` in ControlDef to define visibility rules
  - This applies to ALL components — every new config must define `showWhen` for context-dependent controls

## Rule #4: Always reuse existing components

**NEVER recreate what already exists.** When building new components, ALWAYS compose from existing DS components.
- If the design includes a button → use `<Button>` from `components/Button`
- If the design includes a list item → use `<ListItem>` from `components/ListItem`
- If the design includes a chip → use `<Chip>` from `components/Chip`
- Same applies to `<Icon>`, tokens, and any shared element
- This is the entire point of a design system: consistency and reuse
- Before writing ANY styled element, check if a component already solves it
- **This also applies to UI patterns in the playground**: if a toggle, inspect overlay, toolbar, or layout already exists in one page, reuse the exact same code/pattern in other pages. NEVER create a different version of the same UI element.

## Rule #5: Playground control types

- When a control has **more than 4 options**, use `type: 'select'` (dropdown) instead of `type: 'radio'` (pills)
- Radio pills work well for 2–4 options; beyond that they wrap and clutter the panel
- Example: a `state` control with 7 options → `select`; an `items` control with 4 options → `radio`

## Rule #6: Figma is the source of truth

- Always check Figma for exact values before implementing or fixing components
- File key for components: `kcmeyj2SAZqHF0s8Nayjor` (branch `KB95zjXOg5PPMX5uPPOyBW`)
- File key for layout: `zAR6uxkdaofSSNJYCL25wN`

## Dev setup
- Monorepo: `/Users/leonardo.bertonceli/Desktop/DS Agent/packages/ds`
- Dev server: port 5174 (launch.json config "ds")
- Stack: React + TypeScript + Vite + Tailwind v4
