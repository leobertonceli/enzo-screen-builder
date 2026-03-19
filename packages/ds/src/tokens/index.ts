/**
 * Design Tokens — Global App DS
 *
 * Source of truth: CSS custom properties in index.css
 * These TS constants mirror the CSS vars for use in JS contexts
 * (e.g. InspectOverlay, dynamic styles, tests).
 *
 * Sources:
 *   Colors:     Figma / Global Colors (z4zjxF4d3UWFZvHrdL93Yx)
 *   Typography: Figma / Type Tokens   (N2Mrca2Hq8zf39FaVuI2l4)
 */

// ── Colors ───────────────────────────────────────────────────────────

export const palette = {
  gray: {
    white: '#FFFFFF',
    '00':  '#FAFAFA',
    '10':  '#F4F4F4',
    '20':  '#E0E0E0',
    '30':  '#C2C2C2',
    '40':  '#A3A3A3',
    '50':  '#8F8F8F',
    '60':  '#6F6F6F',
    '70':  '#585858',
    '80':  '#3D3D3D',
    '90':  '#292929',
    '100': '#141414',
  },
  magenta: {
    '00':  '#FFF0FA',
    '10':  '#FCC0E8',
    '20':  '#F59DD3',
    '30':  '#F770CA',
    '40':  '#EC5BB4',
    '50':  '#E738AD',
    '60':  '#BE0380',  // brand primary
    '70':  '#960169',  // brand pressed
    '80':  '#750153',
    '90':  '#5B0043',
    '100': '#40002D',
  },
} as const

export const colors = {
  // Brand
  brand:            '#BE0380',  // magenta/60
  brandPressed:     '#960169',  // magenta/70
  brandSubtle:      '#FFF0FA',  // magenta/00

  // Content
  contentPrimary:   '#141414',  // gray/100
  contentSecondary: '#6F6F6F',  // gray/60
  contentTertiary:  '#8F8F8F',  // gray/50

  // Surface
  surface:          '#FFFFFF',
  surfaceSubtle:    '#F4F4F4',  // gray/10
  surfaceBg:        '#FAFAFA',  // gray/00

  // Borders
  divider:          '#F4F4F4',  // gray/10
  stroke:           '#E0E0E0',  // gray/20

  // Dark mode
  darkSurface:      '#141414',  // gray/100
  darkSurfaceHover: '#292929',  // gray/90
} as const

// ── Typography ───────────────────────────────────────────────────────

export const fontFamily = {
  base:  '"Haffer", system-ui, sans-serif',   // UI components (buttons, list items, titles)
  label: '"DM Sans", system-ui, sans-serif',  // Content text (labels, paragraphs)
} as const

export const fontSize = {
  xs:    '12px',   // gl-font-size-xs
  sm:    '14px',   // gl-font-size-sm
  md:    '16px',   // gl-font-size-md
  lg:    '20px',   // gl-font-size-lg
  xl:    '24px',   // gl-font-size-xl
  xxl:   '32px',   // gl-font-size-xxl
  xxxl:  '48px',   // gl-font-size-xxxl
  xxxxl: '64px',   // gl-font-size-xxxxl
} as const

export const fontWeight = {
  regular:  400,
  medium:   500,
  semibold: 600,
} as const

export const lineHeight = {
  heading:  1,      // Heading/Large, Small
  title:    1.24,   // Title/Large, Medium
  titleSm:  1.32,   // Title/Small
  label:    1.44,   // Label/Large, Medium
  labelSm:  1.24,   // Label/Small
  paraLg:   1.52,   // Paragraph/Large
  paraMd:   1.64,   // Paragraph/Medium
} as const

export const letterSpacing = {
  none:     '0px',
  button:   '0.5px',
  para:     '0.2px',
  labelSm:  '0.01em',
} as const

// ── Text styles (composite) ──────────────────────────────────────────
// Each maps to a named style in the Figma Type Tokens file

export const textStyles = {
  'heading/large':       { family: 'Haffer', size: 64, weight: 400, lineHeight: 1,    letterSpacing: 0 },
  'heading/small':       { family: 'Haffer', size: 48, weight: 400, lineHeight: 1,    letterSpacing: 0 },
  'title/large/plain':   { family: 'Haffer', size: 32, weight: 400, lineHeight: 1.24, letterSpacing: 0 },
  'title/large/heavy':   { family: 'Haffer', size: 32, weight: 500, lineHeight: 1.24, letterSpacing: 0 },
  'title/medium/plain':  { family: 'Haffer', size: 24, weight: 400, lineHeight: 1.24, letterSpacing: 0 },
  'title/medium/heavy':  { family: 'Haffer', size: 24, weight: 500, lineHeight: 1.24, letterSpacing: 0 },
  'title/small/plain':   { family: 'Haffer', size: 20, weight: 400, lineHeight: 1.32, letterSpacing: 0 },
  'title/small/heavy':   { family: 'Haffer', size: 20, weight: 500, lineHeight: 1.32, letterSpacing: 0 },
  'label/large/plain':   { family: 'DM Sans', size: 16, weight: 400, lineHeight: 1.44, letterSpacing: 0 },
  'label/large/heavy':   { family: 'DM Sans', size: 16, weight: 600, lineHeight: 1.44, letterSpacing: 0 },
  'label/medium/plain':  { family: 'DM Sans', size: 14, weight: 400, lineHeight: 1.44, letterSpacing: 0 },
  'label/medium/heavy':  { family: 'DM Sans', size: 14, weight: 600, lineHeight: 1.44, letterSpacing: 0 },
  'label/small/plain':   { family: 'DM Sans', size: 12, weight: 400, lineHeight: 1.24, letterSpacing: '0.01em' },
  'label/small/heavy':   { family: 'DM Sans', size: 12, weight: 600, lineHeight: 1.24, letterSpacing: '0.01em' },
  'para/large/plain':    { family: 'DM Sans', size: 16, weight: 400, lineHeight: 1.52, letterSpacing: '0.2px' },
  'para/large/heavy':    { family: 'DM Sans', size: 16, weight: 600, lineHeight: 1.52, letterSpacing: '0.2px' },
  'para/medium/plain':   { family: 'DM Sans', size: 14, weight: 400, lineHeight: 1.64, letterSpacing: '0.2px' },
  'para/medium/heavy':   { family: 'DM Sans', size: 14, weight: 600, lineHeight: 1.64, letterSpacing: '0.2px' },
} as const

// ── Border radius ────────────────────────────────────────────────────

export const radius = {
  none: '0px',
  sm:   '12px',
  md:   '16px',
  pill: '1000px',
} as const

// ── Spacing ──────────────────────────────────────────────────────────

export const spacing = {
  '01': '4px',
  '02': '8px',
  '03': '12px',
  '04': '16px',
  '05': '20px',
  '06': '24px',
  '08': '32px',
} as const
