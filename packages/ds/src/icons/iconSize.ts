/**
 * Semantic icon size constants for DS components.
 * Use these instead of magic numbers when rendering <Icon>.
 *
 * Usage:  <Icon name="close" size={ICON_SIZE.md} />
 *
 * SVG file selection by the Icon component:
 *   ≤12 → sm (12px file)
 *   ≤16 → md (16px file)
 *   ≤24 → lg (24px file, also used for size=20)
 *   >24 → xlg (32px file)
 */
export const ICON_SIZE = {
  xs:  12,  // decorative — inline indicators, star ratings
  sm:  16,  // compact UI — tags, tabs, checkboxes, card arrows
  md:  20,  // content icons — list items, text fields, buttons
  lg:  24,  // nav icons — NavBar, BottomBar, prominent actions
  xl:  32,  // empty states, illustrations
  xxl: 36,  // success / celebration states
} as const

export type IconSizeKey   = keyof typeof ICON_SIZE
export type IconSizeValue = (typeof ICON_SIZE)[IconSizeKey]
