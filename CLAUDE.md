# Wonderland Design System — Project Rules

## ⚠️ Before writing any UI code

This project uses the **Wonderland Design System**. Before creating any screen, component, or UI element:

- Check what components exist in `packages/ds/src/components/`
- Read the component source to understand exact props and import paths
- Check `packages/ds/src/index.css` for available design tokens

**Never invent a UI element from scratch if a DS component already solves it.**

> The `wonderland-ds` MCP server (`list_components`, `get_component`, `get_tokens`) exposes the same information as a stable API for external consumers outside the repo.

---

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

## Rule #6: All DS components must be interactive

Every component in the design system must work as a functional prototype, not just a visual layer:
- Stateful components (tabs, toggles, inputs, selectors) MUST manage their own internal state via `useState`
- Accept an optional controlled prop (e.g. `selected`, `value`) and sync with `useEffect`
- All clickable elements MUST have real `onClick` handlers — never decorative-only
- Add CSS transitions on color, opacity, transform for state changes (see Rule #8 for timing)
- This principle applies to every new or updated component going forward

## Rule #8: Motion standards

All state transitions must feel smooth and natural — never instant. Use these values consistently:

### Easing
- **Positional** (sliding, moving): `cubic-bezier(0.34, 1.4, 0.64, 1)` — spring with subtle overshoot
- **Fade / color / opacity**: `ease` is fine

### Duration
- Position changes (slide): `0.35s`
- Color, opacity, background, border: `0.3s`

### Sliding indicator pattern
When multiple items share an active indicator (tabs, bottom bar, segmented control):
- **NEVER** put the indicator inside each item with show/hide
- Use a **single absolutely-positioned element** in the parent that slides via `left` or `transform`
- Example (Tabs): `left: calc(${activeIndex} / ${total} * 100%)`, `width: calc(100% / ${total})`
- Example (BottomBar): `left: calc(${activeIndex} * 25% + 12.5%)`, `transform: translateX(-50%)`

## Rule #9: Playground ↔ Component sync is bidirectional

Interacting directly with a component in the playground **must** update the control panel — not just the other way around.

### Simple components (no complex state)
Pass `onChange` directly in the `render` function:
```tsx
render: (p, onChange) => (
  <Tabs
    activeIndex={Number(p.activeIndex)}
    onChange={(i) => onChange('activeIndex', String(i))}
  />
)
```

### Complex components (TextField and similar)
Use a wrapper component with `useRef(false)` to prevent update loops:
```tsx
const internalChangeRef = useRef(false)

// Inside interaction handler — before calling onChange:
internalChangeRef.current = true
onChange('variant', newVariant)

// Inside useEffect that syncs external → internal:
if (internalChangeRef.current) {
  internalChangeRef.current = false
  return // skip — this change came from the component itself
}
```

### Already implemented
- ✅ TextField — syncs `variant` and `value`
- ✅ Tabs — syncs `activeIndex`
- ✅ BottomBar — syncs `selected`

### Still pending
- ⬜ Checkbox, Toggle, and other stateful components

## Rule #10: Icons — always use DS icons

Icons live in `packages/ds/src/icons/svg/{iconName}/Size={sm|md|lg|xlg}.svg`.

- **Name format**: camelCase — `heartOutlined`, `chevronArrowRight`, `sorting`, `add`
- **Size mapping**: `sm=12px`, `md=16px`, `lg=24px`, `xlg=32px` — `<Icon size={24} />` picks the right file automatically
- `fill="#141414"` is replaced with `currentColor` at load time — `color` prop works as expected
- Browse all 222 icons in `iconCatalog.ts` organized by category

**Common mappings from old MDI names:**
| MDI (never use)           | DS (use this)        |
|---------------------------|----------------------|
| `chevron-left/right`      | `chevronArrowLeft/Right` |
| `plus`                    | `add`                |
| `check`                   | `checkOutlined`      |
| `heart-outline`           | `heartOutlined`      |
| `account`                 | `user`               |
| `arrow-up-down`           | `sorting`            |
| `map-marker-outline`      | `localPin`           |
| `credit-card-outline`     | `creditCard`         |
| `bell-outline`            | `bell`               |
| `file-document-outline`   | `paper`              |

## Rule #11: Figma is the source of truth

- Always check Figma for exact values before implementing or fixing components
- File key for components: `kcmeyj2SAZqHF0s8Nayjor` (branch `KB95zjXOg5PPMX5uPPOyBW`)
- File key for layout: `zAR6uxkdaofSSNJYCL25wN`

## Dev setup
- Monorepo: `/Users/leonardo.bertonceli/Desktop/DS Agent/packages/ds`
- Dev server: port 5174 (launch.json config "ds")
- Stack: React + TypeScript + Vite + Tailwind v4
