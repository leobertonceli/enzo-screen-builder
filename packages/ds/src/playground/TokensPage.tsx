import { useState } from 'react'

/* ════════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════════ */
function isHexDark(hex: string) {
  const h = hex.replace('#', '').slice(0, 6)
  if (h.length < 6) return false
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 140
}

/* ════════════════════════════════════════════════════════════════
   DATA — COLORS
════════════════════════════════════════════════════════════════ */

type ColorToken = { name: string; hex: string; alias?: string }

const semanticTokens: ColorToken[] = [
  { name: 'brand',              hex: '#BE0380' },
  { name: 'brand-pressed',      hex: '#960169' },
  { name: 'brand-subtle',       hex: '#FFF0FA' },
  { name: 'content-primary',    hex: '#141414' },
  { name: 'content-secondary',  hex: '#6F6F6F' },
  { name: 'content-tertiary',   hex: '#8F8F8F' },
  { name: 'surface',            hex: '#FFFFFF' },
  { name: 'surface-subtle',     hex: '#F4F4F4' },
  { name: 'surface-bg',         hex: '#FAFAFA' },
  { name: 'divider',            hex: '#F4F4F4' },
  { name: 'stroke',             hex: '#E0E0E0' },
  { name: 'dark-surface',       hex: '#141414' },
  { name: 'dark-surface-hover', hex: '#292929' },
]

const solidPalettes: { label: string; tokens: ColorToken[] }[] = [
  {
    label: 'Magenta',
    tokens: [
      { name: 'magenta-00',  hex: '#FFF0FA' },
      { name: 'magenta-10',  hex: '#FCC0E8' },
      { name: 'magenta-20',  hex: '#F59DD3' },
      { name: 'magenta-30',  hex: '#F770CA' },
      { name: 'magenta-40',  hex: '#EC5CB4' },
      { name: 'magenta-50',  hex: '#E738AD' },
      { name: 'magenta-60',  hex: '#BE0380', alias: 'brand' },
      { name: 'magenta-70',  hex: '#960169', alias: 'brand-pressed' },
      { name: 'magenta-80',  hex: '#750153' },
      { name: 'magenta-90',  hex: '#5B0043' },
      { name: 'magenta-100', hex: '#40002D' },
    ],
  },
  {
    label: 'Gray',
    tokens: [
      { name: 'gray-white', hex: '#FFFFFF', alias: 'surface' },
      { name: 'gray-00',    hex: '#FAFAFA', alias: 'surface-bg' },
      { name: 'gray-10',    hex: '#F4F4F4', alias: 'surface-subtle' },
      { name: 'gray-20',    hex: '#E0E0E0', alias: 'stroke' },
      { name: 'gray-30',    hex: '#C2C2C2' },
      { name: 'gray-40',    hex: '#A3A3A3' },
      { name: 'gray-50',    hex: '#8F8F8F', alias: 'content-tertiary' },
      { name: 'gray-60',    hex: '#6F6F6F', alias: 'content-secondary' },
      { name: 'gray-70',    hex: '#585858' },
      { name: 'gray-80',    hex: '#3D3D3D' },
      { name: 'gray-90',    hex: '#292929', alias: 'dark-hover' },
      { name: 'gray-100',   hex: '#141414', alias: 'content-primary' },
    ],
  },
  {
    label: 'Red',
    tokens: [
      { name: 'red-00',  hex: '#FFE3EB' },
      { name: 'red-10',  hex: '#FCC0D0' },
      { name: 'red-20',  hex: '#FA98B2' },
      { name: 'red-30',  hex: '#F76F94' },
      { name: 'red-40',  hex: '#FF4D7C' },
      { name: 'red-50',  hex: '#EB003F' },
      { name: 'red-60',  hex: '#E0003C' },
      { name: 'red-70',  hex: '#B50030' },
      { name: 'red-80',  hex: '#960028' },
      { name: 'red-90',  hex: '#800022' },
      { name: 'red-100', hex: '#69001C' },
    ],
  },
  {
    label: 'Fuchsia',
    tokens: [
      { name: 'fuchsia-00',  hex: '#FDE3FF' },
      { name: 'fuchsia-10',  hex: '#F8C0FC' },
      { name: 'fuchsia-20',  hex: '#F398FA' },
      { name: 'fuchsia-30',  hex: '#EE6FF7' },
      { name: 'fuchsia-40',  hex: '#E947F5' },
      { name: 'fuchsia-50',  hex: '#E000F0' },
      { name: 'fuchsia-60',  hex: '#D100E0' },
      { name: 'fuchsia-70',  hex: '#A900B5' },
      { name: 'fuchsia-80',  hex: '#8C0096' },
      { name: 'fuchsia-90',  hex: '#770080' },
      { name: 'fuchsia-100', hex: '#620069' },
    ],
  },
  {
    label: 'Violet',
    tokens: [
      { name: 'violet-00',  hex: '#F7F0FF' },
      { name: 'violet-10',  hex: '#E0C0FC' },
      { name: 'violet-20',  hex: '#CC98FA' },
      { name: 'violet-30',  hex: '#B86FF7' },
      { name: 'violet-40',  hex: '#A447F5' },
      { name: 'violet-50',  hex: '#8000F0' },
      { name: 'violet-60',  hex: '#7800E0' },
      { name: 'violet-70',  hex: '#6100B5' },
      { name: 'violet-80',  hex: '#500096' },
      { name: 'violet-90',  hex: '#440080' },
      { name: 'violet-100', hex: '#380069' },
    ],
  },
  {
    label: 'Blue',
    tokens: [
      { name: 'blue-00',  hex: '#F0F4FF' },
      { name: 'blue-10',  hex: '#C0D0FC' },
      { name: 'blue-20',  hex: '#98B2FA' },
      { name: 'blue-30',  hex: '#6189FA' },
      { name: 'blue-40',  hex: '#4775F5' },
      { name: 'blue-50',  hex: '#1F59F9' },
      { name: 'blue-60',  hex: '#003CE0' },
      { name: 'blue-70',  hex: '#0030B5' },
      { name: 'blue-80',  hex: '#002896' },
      { name: 'blue-90',  hex: '#002280' },
      { name: 'blue-100', hex: '#001C69' },
    ],
  },
  {
    label: 'Turquoise',
    tokens: [
      { name: 'turquoise-00',  hex: '#E3FFFD' },
      { name: 'turquoise-10',  hex: '#C0FCF8' },
      { name: 'turquoise-20',  hex: '#98FAF3' },
      { name: 'turquoise-30',  hex: '#6FF7EE' },
      { name: 'turquoise-40',  hex: '#47F5E9' },
      { name: 'turquoise-50',  hex: '#00F0E0' },
      { name: 'turquoise-60',  hex: '#00E0D1' },
      { name: 'turquoise-70',  hex: '#00B5A9' },
      { name: 'turquoise-80',  hex: '#00968C' },
      { name: 'turquoise-90',  hex: '#008077' },
      { name: 'turquoise-100', hex: '#006962' },
    ],
  },
  {
    label: 'Green',
    tokens: [
      { name: 'green-00',  hex: '#E3FFE6' },
      { name: 'green-10',  hex: '#C0FCC8' },
      { name: 'green-20',  hex: '#98FAA5' },
      { name: 'green-30',  hex: '#6FF781' },
      { name: 'green-40',  hex: '#47F55E' },
      { name: 'green-50',  hex: '#00F020' },
      { name: 'green-60',  hex: '#3CDA52' },
      { name: 'green-70',  hex: '#00B518' },
      { name: 'green-80',  hex: '#009618' },
      { name: 'green-90',  hex: '#008011' },
      { name: 'green-100', hex: '#00690E' },
    ],
  },
  {
    label: 'Lime',
    tokens: [
      { name: 'lime-00',  hex: '#F6FFE3' },
      { name: 'lime-10',  hex: '#E8FCC0' },
      { name: 'lime-20',  hex: '#D9FA98' },
      { name: 'lime-30',  hex: '#CAF76F' },
      { name: 'lime-40',  hex: '#BBF547' },
      { name: 'lime-50',  hex: '#A0F000' },
      { name: 'lime-60',  hex: '#96E000' },
      { name: 'lime-70',  hex: '#79B500' },
      { name: 'lime-80',  hex: '#649600' },
      { name: 'lime-90',  hex: '#558000' },
      { name: 'lime-100', hex: '#466900' },
    ],
  },
  {
    label: 'Yellow',
    tokens: [
      { name: 'yellow-00',  hex: '#FFFAE7' },
      { name: 'yellow-10',  hex: '#FCF1C2' },
      { name: 'yellow-20',  hex: '#FAE89D' },
      { name: 'yellow-30',  hex: '#F7DD74' },
      { name: 'yellow-40',  hex: '#F6D44E' },
      { name: 'yellow-50',  hex: '#FBC800' },
      { name: 'yellow-60',  hex: '#ECBD00' },
      { name: 'yellow-70',  hex: '#C09900' },
      { name: 'yellow-80',  hex: '#A28200' },
      { name: 'yellow-90',  hex: '#8F7200' },
      { name: 'yellow-100', hex: '#7B6300' },
    ],
  },
  {
    label: 'Orange',
    tokens: [
      { name: 'orange-00',  hex: '#FFF6E7' },
      { name: 'orange-10',  hex: '#FCE9C2' },
      { name: 'orange-20',  hex: '#FADB9D' },
      { name: 'orange-30',  hex: '#F7CB74' },
      { name: 'orange-40',  hex: '#F6BE4E' },
      { name: 'orange-50',  hex: '#FBA700' },
      { name: 'orange-60',  hex: '#EC9D00' },
      { name: 'orange-70',  hex: '#C08000' },
      { name: 'orange-80',  hex: '#A16C01' },
      { name: 'orange-90',  hex: '#8F5F00' },
      { name: 'orange-100', hex: '#7B5200' },
    ],
  },
]

type TransparentToken = { name: string; rgba: string; opacity: string }

const transparentWhite: TransparentToken[] = [
  { name: 'white-05',  rgba: 'rgba(255,255,255,0.05)',  opacity: '5%'  },
  { name: 'white-10',  rgba: 'rgba(255,255,255,0.10)',  opacity: '10%' },
  { name: 'white-15',  rgba: 'rgba(255,255,255,0.15)',  opacity: '15%' },
  { name: 'white-20',  rgba: 'rgba(255,255,255,0.20)',  opacity: '20%' },
  { name: 'white-30',  rgba: 'rgba(255,255,255,0.30)',  opacity: '30%' },
  { name: 'white-40',  rgba: 'rgba(255,255,255,0.40)',  opacity: '40%' },
  { name: 'white-50',  rgba: 'rgba(255,255,255,0.50)',  opacity: '50%' },
  { name: 'white-60',  rgba: 'rgba(255,255,255,0.60)',  opacity: '60%' },
  { name: 'white-70',  rgba: 'rgba(255,255,255,0.70)',  opacity: '70%' },
  { name: 'white-80',  rgba: 'rgba(255,255,255,0.80)',  opacity: '80%' },
  { name: 'white-90',  rgba: 'rgba(255,255,255,0.90)',  opacity: '90%' },
]

const transparentBlack: TransparentToken[] = [
  { name: 'black-05',  rgba: 'rgba(20,20,20,0.05)',  opacity: '5%'  },
  { name: 'black-10',  rgba: 'rgba(20,20,20,0.10)',  opacity: '10%' },
  { name: 'black-15',  rgba: 'rgba(20,20,20,0.15)',  opacity: '15%' },
  { name: 'black-20',  rgba: 'rgba(20,20,20,0.20)',  opacity: '20%' },
  { name: 'black-30',  rgba: 'rgba(20,20,20,0.30)',  opacity: '30%' },
  { name: 'black-40',  rgba: 'rgba(20,20,20,0.40)',  opacity: '40%' },
  { name: 'black-50',  rgba: 'rgba(20,20,20,0.50)',  opacity: '50%' },
  { name: 'black-60',  rgba: 'rgba(20,20,20,0.60)',  opacity: '60%' },
  { name: 'black-70',  rgba: 'rgba(20,20,20,0.70)',  opacity: '70%' },
  { name: 'black-80',  rgba: 'rgba(20,20,20,0.80)',  opacity: '80%' },
  { name: 'black-90',  rgba: 'rgba(20,20,20,0.90)',  opacity: '90%' },
]

const offPalettes: { label: string; bg: string; tokens: ColorToken[] }[] = [
  {
    label: 'Off — Magenta',
    bg: '#F2E9EE',
    tokens: [
      { name: 'off-magenta-00',  hex: '#F2E9EE' },
      { name: 'off-magenta-20',  hex: '#E2D6E0' },
      { name: 'off-magenta-50',  hex: '#D0C4CE' },
      { name: 'off-magenta-100', hex: '#4B0824' },
    ],
  },
  {
    label: 'Off — Blue',
    bg: '#F5F6FA',
    tokens: [
      { name: 'off-blue-00',  hex: '#F5F6FA' },
      { name: 'off-blue-20',  hex: '#DEE2ED' },
      { name: 'off-blue-50',  hex: '#CFD4E0' },
      { name: 'off-blue-100', hex: '#222735' },
    ],
  },
  {
    label: 'Off — Gray',
    bg: '#F3F2F0',
    tokens: [
      { name: 'off-gray-00',  hex: '#F3F2F0' },
      { name: 'off-gray-20',  hex: '#DDDDD5' },
      { name: 'off-gray-50',  hex: '#C4C0B6' },
      { name: 'off-gray-100', hex: '#141414' },
    ],
  },
]

/* ════════════════════════════════════════════════════════════════
   DATA — TYPOGRAPHY
════════════════════════════════════════════════════════════════ */

const fontFamilyTokens = [
  { token: '--font-family-base',  value: 'Haffer',  usage: 'UI: buttons, títulos, list items, componentes' },
  { token: '--font-family-label', value: 'DM Sans', usage: 'Conteúdo: parágrafos, labels, body text' },
]

const fontSizeTokens = [
  { token: '--font-size-xs',    value: '12px',  source: 'gl-font-size-sm'  },
  { token: '--font-size-sm',    value: '14px',  source: 'gl-font-size-md'  },
  { token: '--font-size-md',    value: '16px',  source: 'gl-font-size-lg'  },
  { token: '--font-size-lg',    value: '20px',  source: 'gl-font-size-xl'  },
  { token: '--font-size-xl',    value: '24px',  source: 'gl-font-size-2xl' },
  { token: '--font-size-xxl',   value: '32px',  source: 'gl-font-size-3xl' },
  { token: '--font-size-xxxl',  value: '48px',  source: 'gl-font-size-4xl' },
  { token: '--font-size-xxxxl', value: '64px',  source: 'gl-font-size-5xl' },
]

const fontWeightTokens = [
  { token: '--font-weight-light',    value: '300', label: 'Light'    },
  { token: '--font-weight-regular',  value: '400', label: 'Regular'  },
  { token: '--font-weight-medium',   value: '500', label: 'Medium'   },
  { token: '--font-weight-semibold', value: '600', label: 'Semibold' },
]

const lineHeightTokens = [
  { token: '--line-height-heading',  value: '1.0',    source: 'gl-line-height-rule-01', usage: 'Heading' },
  { token: '--line-height-title',    value: '1.24',   source: 'gl-line-height-rule-02', usage: 'Title L/M' },
  { token: '--line-height-title-sm', value: '1.32',   source: 'gl-line-height-rule-03', usage: 'Title S' },
  { token: '--line-height-label',    value: '1.44',   source: 'gl-line-height-rule-04', usage: 'Label L/M' },
  { token: '--line-height-label-sm', value: '1.24',   source: 'gl-line-height-rule-02', usage: 'Label S' },
  { token: '--line-height-para-lg',  value: '1.52',   source: 'gl-line-height-rule-05', usage: 'Paragraph L' },
  { token: '--line-height-para-md',  value: '1.64',   source: 'gl-line-height-rule-06', usage: 'Paragraph M' },
]

const letterSpacingTokens = [
  { token: '--letter-spacing-none',     value: '0px',    usage: 'Headings, titles, buttons' },
  { token: '--letter-spacing-button',   value: '0.5px',  usage: 'Buttons (gl-letter-spacing-rule-02)' },
  { token: '--letter-spacing-para',     value: '0.2px',  usage: 'Paragraphs' },
  { token: '--letter-spacing-label-sm', value: '0.01em', usage: 'Label / Small' },
]

const typeScale = [
  { name: 'Heading / Large',    family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-xxxxl)', sLabel: '64px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-heading)',  lhLabel: '1.0',  ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Heading / Small',    family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-xxxl)',  sLabel: '48px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-heading)',  lhLabel: '1.0',  ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Large',      family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-xxl)',   sLabel: '32px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-title)',    lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Large · M',  family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-xxl)',   sLabel: '32px', weight: 'var(--font-weight-medium)',   wLabel: '500', lh: 'var(--line-height-title)',    lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Medium',     family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-xl)',    sLabel: '24px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-title)',    lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Medium · M', family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-xl)',    sLabel: '24px', weight: 'var(--font-weight-medium)',   wLabel: '500', lh: 'var(--line-height-title)',    lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Small',      family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-lg)',    sLabel: '20px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-title-sm)', lhLabel: '1.32', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Small · M',  family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-lg)',    sLabel: '20px', weight: 'var(--font-weight-medium)',   wLabel: '500', lh: 'var(--line-height-title-sm)', lhLabel: '1.32', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Large',      family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-md)',    sLabel: '16px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-label)',    lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Large · SB', family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-md)',    sLabel: '16px', weight: 'var(--font-weight-semibold)', wLabel: '600', lh: 'var(--line-height-label)',    lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Medium',     family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-sm)',    sLabel: '14px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-label)',    lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Medium · SB',family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-sm)',    sLabel: '14px', weight: 'var(--font-weight-semibold)', wLabel: '600', lh: 'var(--line-height-label)',    lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Small',      family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-xs)',    sLabel: '12px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-label-sm)', lhLabel: '1.24', ls: 'var(--letter-spacing-label-sm)', lsLabel: '0.01em' },
  { name: 'Label / Small · SB', family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-xs)',    sLabel: '12px', weight: 'var(--font-weight-semibold)', wLabel: '600', lh: 'var(--line-height-label-sm)', lhLabel: '1.24', ls: 'var(--letter-spacing-label-sm)', lsLabel: '0.01em' },
  { name: 'Para / Large',       family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-md)',    sLabel: '16px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-para-lg)',  lhLabel: '1.52', ls: 'var(--letter-spacing-para)',     lsLabel: '0.2px' },
  { name: 'Para / Large · SB',  family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-md)',    sLabel: '16px', weight: 'var(--font-weight-semibold)', wLabel: '600', lh: 'var(--line-height-para-lg)',  lhLabel: '1.52', ls: 'var(--letter-spacing-para)',     lsLabel: '0.2px' },
  { name: 'Para / Medium',      family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-sm)',    sLabel: '14px', weight: 'var(--font-weight-regular)',  wLabel: '400', lh: 'var(--line-height-para-md)',  lhLabel: '1.64', ls: 'var(--letter-spacing-para)',     lsLabel: '0.2px' },
  { name: 'Para / Medium · SB', family: 'var(--font-family-label)', fLabel: 'DM Sans', size: 'var(--font-size-sm)',    sLabel: '14px', weight: 'var(--font-weight-semibold)', wLabel: '600', lh: 'var(--line-height-para-md)',  lhLabel: '1.64', ls: 'var(--letter-spacing-para)',     lsLabel: '0.2px' },
  { name: 'Button / Large',     family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-md)',    sLabel: '16px', weight: 'var(--font-weight-medium)',   wLabel: '500', lh: '1.24',                        lhLabel: '1.24', ls: 'var(--letter-spacing-button)',   lsLabel: '0.5px' },
  { name: 'Button / Small',     family: 'var(--font-family-base)',  fLabel: 'Haffer',  size: 'var(--font-size-sm)',    sLabel: '14px', weight: 'var(--font-weight-medium)',   wLabel: '500', lh: '1.16',                        lhLabel: '1.16', ls: 'var(--letter-spacing-button)',   lsLabel: '0.5px' },
]

/* ════════════════════════════════════════════════════════════════
   DATA — SPACING & RADIUS
════════════════════════════════════════════════════════════════ */

const spacingTokens = [
  { token: '--spacing-01', value: '4px',   px: 4   },
  { token: '--spacing-02', value: '8px',   px: 8   },
  { token: '--spacing-03', value: '12px',  px: 12  },
  { token: '--spacing-04', value: '16px',  px: 16  },
  { token: '--spacing-05', value: '20px',  px: 20  },
  { token: '--spacing-06', value: '24px',  px: 24  },
  { token: '--spacing-08', value: '32px',  px: 32  },
  { token: '--spacing-10', value: '40px',  px: 40  },
  { token: '--spacing-12', value: '48px',  px: 48  },
  { token: '--spacing-16', value: '64px',  px: 64  },
  { token: '--spacing-20', value: '80px',  px: 80  },
  { token: '--spacing-24', value: '96px',  px: 96  },
  { token: '--spacing-32', value: '128px', px: 128 },
  { token: '--spacing-40', value: '160px', px: 160 },
]

const radiusTokens = [
  { token: '--radius-none', value: '0px',    px: 0    },
  { token: '--radius-xxs',  value: '4px',    px: 4    },
  { token: '--radius-xs',   value: '8px',    px: 8    },
  { token: '--radius-sm',   value: '12px',   px: 12   },
  { token: '--radius-md',   value: '16px',   px: 16   },
  { token: '--radius-lg',   value: '20px',   px: 20   },
  { token: '--radius-xl',   value: '24px',   px: 24   },
  { token: '--radius-xxl',  value: '32px',   px: 32   },
  { token: '--radius-pill', value: '1000px', px: 1000 },
]

const borderWidthTokens = [
  { token: '--border-width-none', value: '0px'  },
  { token: '--border-width-xs',   value: '1px'  },
  { token: '--border-width-sm',   value: '1.5px' },
  { token: '--border-width-md',   value: '2px'  },
  { token: '--border-width-lg',   value: '4px'  },
]

/* ════════════════════════════════════════════════════════════════
   DATA — EFFECTS
════════════════════════════════════════════════════════════════ */

const shadowTokens = [
  { token: '--shadow-01', value: '0px 4px 8px rgba(0,0,0,0.08)',   label: 'Level 01' },
  { token: '--shadow-02', value: '0px 8px 16px rgba(0,0,0,0.08)',  label: 'Level 02' },
  { token: '--shadow-03', value: '0px 16px 32px rgba(0,0,0,0.08)', label: 'Level 03' },
  { token: '--shadow-04', value: '0px 32px 64px rgba(0,0,0,0.08)', label: 'Level 04' },
]

const opacityTokens = [
  { token: '--opacity-semi-transparent', value: '0.16', pct: '16%', usage: 'Sutil, hover states' },
  { token: '--opacity-medium',           value: '0.40', pct: '40%', usage: 'Ícones desabilitados' },
  { token: '--opacity-intense',          value: '0.64', pct: '64%', usage: 'Overlay médio' },
  { token: '--opacity-semi-opaque',      value: '0.80', pct: '80%', usage: 'Modal backdrop' },
]

const elevationTokens = [
  { token: '--elevation-01', value: '10',  usage: 'Tooltips, dropdowns' },
  { token: '--elevation-02', value: '20',  usage: 'Popovers, selects' },
  { token: '--elevation-03', value: '30',  usage: 'Modais' },
  { token: '--elevation-04', value: '40',  usage: 'Notificações' },
  { token: '--elevation-05', value: '50',  usage: 'Máximo / crítico' },
]

/* ════════════════════════════════════════════════════════════════
   SUB-COMPONENTS — shared
════════════════════════════════════════════════════════════════ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-semibold)',
      color: 'var(--color-content-tertiary)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 'var(--spacing-05)',
      marginTop: 0,
    }}>
      {children}
    </h2>
  )
}

function TokenLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-label)',
      fontSize: '10px',
      color: 'var(--color-content-primary)',
      lineHeight: 1.4,
    }}>
      {children}
    </span>
  )
}

function TokenMeta({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: 'var(--font-family-label)',
      fontSize: '10px',
      color: 'var(--color-content-tertiary)',
      lineHeight: 1.4,
    }}>
      {children}
    </span>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE — COLORS
════════════════════════════════════════════════════════════════ */

/* Checkerboard pattern for transparent swatches */
const CHECKER_BG = `
  linear-gradient(45deg, #ccc 25%, transparent 25%),
  linear-gradient(-45deg, #ccc 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, #ccc 75%),
  linear-gradient(-45deg, transparent 75%, #ccc 75%)
`

function ColorSwatch({ hex, alias }: { hex: string; alias?: string }) {
  const dark = isHexDark(hex)
  return (
    <div style={{
      height: 52, width: '100%',
      borderRadius: 'var(--radius-xs)',
      backgroundColor: hex,
      border: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', alignItems: 'flex-end',
      padding: 'var(--spacing-01)',
      boxSizing: 'border-box',
    }}>
      {alias && (
        <span style={{
          fontFamily: 'var(--font-family-label)',
          fontSize: '8px',
          lineHeight: 1.2,
          padding: '2px 4px',
          borderRadius: 4,
          background: dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)',
          color: dark ? '#fff' : '#141414',
          whiteSpace: 'nowrap',
        }}>
          {alias}
        </span>
      )}
    </div>
  )
}

function TransparentSwatch({ rgba, bg }: { rgba: string; bg: string }) {
  return (
    <div style={{
      height: 52, width: '100%',
      borderRadius: 'var(--radius-xs)',
      border: '1px solid rgba(0,0,0,0.06)',
      overflow: 'hidden',
      position: 'relative',
      backgroundImage: CHECKER_BG,
      backgroundSize: '8px 8px',
      backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
      backgroundColor: bg,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundColor: rgba,
      }} />
    </div>
  )
}

function ColorsPage() {
  return (
    <div style={{ padding: 'var(--spacing-08)', overflowY: 'auto', flex: 1 }}>

      {/* Semantic */}
      <section style={{ marginBottom: 'var(--spacing-08)' }}>
        <SectionTitle>Semânticos</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-03)' }}>
          {semanticTokens.map(t => (
            <div key={t.name} style={{ width: 96, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <ColorSwatch hex={t.hex} />
              <TokenLabel>--color-{t.name}</TokenLabel>
              <TokenMeta>{t.hex.toUpperCase()}</TokenMeta>
            </div>
          ))}
        </div>
      </section>

      {/* Solid palettes */}
      {solidPalettes.map(group => (
        <section key={group.label} style={{ marginBottom: 'var(--spacing-08)' }}>
          <SectionTitle>{group.label}</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-03)' }}>
            {group.tokens.map(t => (
              <div key={t.name} style={{ width: 80, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <ColorSwatch hex={t.hex} alias={t.alias} />
                <TokenLabel>{t.name}</TokenLabel>
                <TokenMeta>{t.hex.toUpperCase()}</TokenMeta>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Transparent — White */}
      <section style={{ marginBottom: 'var(--spacing-08)' }}>
        <SectionTitle>Transparências — Branco</SectionTitle>
        <div style={{
          padding: 'var(--spacing-04)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#141414',
          display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-03)',
        }}>
          {transparentWhite.map(t => (
            <div key={t.name} style={{ width: 80, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <TransparentSwatch rgba={t.rgba} bg="#141414" />
              <span style={{ fontFamily: 'var(--font-family-label)', fontSize: '10px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{t.name}</span>
              <span style={{ fontFamily: 'var(--font-family-label)', fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.4 }}>{t.opacity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Transparent — Black */}
      <section style={{ marginBottom: 'var(--spacing-08)' }}>
        <SectionTitle>Transparências — Preto</SectionTitle>
        <div style={{
          padding: 'var(--spacing-04)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#FAFAFA',
          display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-03)',
        }}>
          {transparentBlack.map(t => (
            <div key={t.name} style={{ width: 80, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <TransparentSwatch rgba={t.rgba} bg="#FAFAFA" />
              <TokenLabel>{t.name}</TokenLabel>
              <TokenMeta>{t.opacity}</TokenMeta>
            </div>
          ))}
        </div>
      </section>

      {/* Off colors */}
      <section style={{ marginBottom: 'var(--spacing-08)' }}>
        <SectionTitle>Off Colors — Acessibilidade</SectionTitle>
        <div style={{ display: 'flex', gap: 'var(--spacing-06)', flexWrap: 'wrap' }}>
          {offPalettes.map(group => (
            <div key={group.label}>
              <p style={{ fontFamily: 'var(--font-family-label)', fontSize: '11px', color: 'var(--color-content-tertiary)', marginBottom: 8, marginTop: 0 }}>{group.label}</p>
              <div style={{ display: 'flex', gap: 'var(--spacing-03)' }}>
                {group.tokens.map(t => (
                  <div key={t.name} style={{ width: 80, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <ColorSwatch hex={t.hex} />
                    <TokenLabel>{t.name.replace('off-', '')}</TokenLabel>
                    <TokenMeta>{t.hex.toUpperCase()}</TokenMeta>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE — TYPOGRAPHY
════════════════════════════════════════════════════════════════ */

function TypographyPage() {
  const gridCols = '300px 140px 120px 100px 110px 100px'

  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>

      {/* ── Raw tokens ── */}
      <div style={{ padding: 'var(--spacing-08)', display: 'flex', gap: 'var(--spacing-08)', flexWrap: 'wrap', borderBottom: '1px solid var(--color-divider)' }}>

        {/* Font families */}
        <div style={{ minWidth: 280 }}>
          <SectionTitle>Font Families</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            {fontFamilyTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--spacing-04)', padding: 'var(--spacing-03) var(--spacing-04)', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)' }}>
                <span style={{ fontFamily: t.value === 'Haffer' ? 'var(--font-family-base)' : 'var(--font-family-label)', fontSize: 'var(--font-size-md)', fontWeight: 500, color: 'var(--color-content-primary)', minWidth: 80 }}>{t.value}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TokenLabel>{t.token}</TokenLabel>
                  <TokenMeta>{t.usage}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font sizes */}
        <div>
          <SectionTitle>Font Sizes</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
            {fontSizeTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <span style={{ fontFamily: 'var(--font-family-base)', fontSize: t.value, fontWeight: 400, color: 'var(--color-content-primary)', lineHeight: 1.2, width: 100, flexShrink: 0 }}>Aa</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TokenLabel>{t.token}</TokenLabel>
                  <TokenMeta>{t.value} · {t.source}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Font weights */}
        <div>
          <SectionTitle>Font Weights</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            {fontWeightTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-lg)', fontWeight: t.value, color: 'var(--color-content-primary)', lineHeight: 1.2, width: 80, flexShrink: 0 }}>{t.label}</span>
                <div>
                  <TokenLabel>{t.token}</TokenLabel>
                  <br />
                  <TokenMeta>{t.value}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line heights & letter spacing */}
        <div style={{ display: 'flex', gap: 'var(--spacing-08)', flexWrap: 'wrap' }}>
          <div>
            <SectionTitle>Line Heights</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
              {lineHeightTokens.map(t => (
                <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)', padding: '4px 0' }}>
                  <span style={{ fontFamily: 'var(--font-family-label)', fontSize: '11px', color: 'var(--color-content-primary)', width: 32, textAlign: 'center', backgroundColor: 'var(--color-surface-subtle)', padding: '2px 4px', borderRadius: 4, flexShrink: 0 }}>{t.value}</span>
                  <div>
                    <TokenLabel>{t.token}</TokenLabel>
                    <br />
                    <TokenMeta>{t.usage}</TokenMeta>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>Letter Spacing</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
              {letterSpacingTokens.map(t => (
                <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)', padding: '4px 0' }}>
                  <span style={{ fontFamily: 'var(--font-family-label)', fontSize: '11px', letterSpacing: t.value, color: 'var(--color-content-primary)', width: 48, textAlign: 'center', backgroundColor: 'var(--color-surface-subtle)', padding: '2px 4px', borderRadius: 4, flexShrink: 0 }}>Aa</span>
                  <div>
                    <TokenLabel>{t.token}</TokenLabel>
                    <br />
                    <TokenMeta>{t.value} · {t.usage}</TokenMeta>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Type scale table ── */}
      <div style={{ minWidth: 'max-content', backgroundColor: 'var(--color-surface)' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '12px 32px', borderBottom: '1px solid var(--color-divider)' }}>
          {['Hierarquia', 'Typeface', 'Weight', 'Size', 'Line Height', 'Tracking'].map(h => (
            <span key={h} style={{ fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)' }}>{h}</span>
          ))}
        </div>
        {/* Rows */}
        {typeScale.map(t => (
          <div
            key={t.name}
            style={{ display: 'grid', gridTemplateColumns: gridCols, padding: '0 32px', borderTop: '1px solid var(--color-divider)', minHeight: 88, alignItems: 'center' }}
          >
            <span style={{ fontFamily: t.family, fontSize: t.size, fontWeight: t.weight, lineHeight: t.lh, letterSpacing: t.ls, color: 'var(--color-content-primary)', display: 'block', padding: '16px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {t.name}
            </span>
            <span style={{ fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)' }}>{t.fLabel}</span>
            <span style={{ fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)' }}>{t.wLabel}</span>
            <span style={{ fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)' }}>{t.sLabel}</span>
            <span style={{ fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)' }}>{t.lhLabel}</span>
            <span style={{ fontFamily: 'var(--font-family-label)', fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)' }}>{t.lsLabel}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE — SPACING & RADIUS
════════════════════════════════════════════════════════════════ */

const SCALE_FACTOR = 0.6 // visual scale so large values fit

function SpacingPage() {
  return (
    <div style={{ padding: 'var(--spacing-08)', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-12)', flexWrap: 'wrap' }}>

        {/* Spacing */}
        <section>
          <SectionTitle>Spacing — base 4px</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            {spacingTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <div style={{ width: 160, display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    height: 16,
                    width: Math.min(t.px * SCALE_FACTOR, 160),
                    backgroundColor: 'var(--color-brand)',
                    borderRadius: 2,
                    flexShrink: 0,
                  }} />
                </div>
                <div style={{ width: 120, flexShrink: 0 }}><TokenLabel>{t.token}</TokenLabel></div>
                <TokenMeta>{t.value}</TokenMeta>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <SectionTitle>Border Radius</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
            {radiusTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  backgroundColor: 'var(--color-brand)',
                  borderRadius: t.value === '1000px' ? 9999 : t.px,
                }} />
                <div>
                  <TokenLabel>{t.token}</TokenLabel>
                  <br />
                  <TokenMeta>{t.value}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Widths */}
        <section>
          <SectionTitle>Border Widths</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
            {borderWidthTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <div style={{
                  width: 40, height: 40, flexShrink: 0,
                  borderRadius: 'var(--radius-xs)',
                  border: `${t.value} solid var(--color-brand)`,
                  backgroundColor: 'var(--color-surface)',
                }} />
                <div>
                  <TokenLabel>{t.token}</TokenLabel>
                  <br />
                  <TokenMeta>{t.value}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   PAGE — EFFECTS (shadows, opacity, elevation)
════════════════════════════════════════════════════════════════ */

export function EffectsPage() {
  return (
    <div style={{ padding: 'var(--spacing-08)', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-12)', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* Shadows */}
        <section>
          <SectionTitle>Shadows</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)' }}>
            {shadowTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-06)' }}>
                <div style={{
                  width: 64, height: 64, flexShrink: 0,
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: t.value,
                }} />
                <div>
                  <TokenLabel>{t.token}</TokenLabel>
                  <br />
                  <TokenMeta>{t.label}</TokenMeta>
                  <br />
                  <TokenMeta>{t.value}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opacity */}
        <section>
          <SectionTitle>Opacity</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
            {opacityTokens.map(t => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <div style={{
                  width: 48, height: 48, flexShrink: 0,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'var(--color-brand)',
                  opacity: parseFloat(t.value),
                }} />
                <div>
                  <TokenLabel>{t.token}</TokenLabel>
                  <br />
                  <TokenMeta>{t.pct} · {t.usage}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Elevation */}
        <section>
          <SectionTitle>Elevation — z-index scale</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            {elevationTokens.map((t, i) => (
              <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                <div style={{
                  width: 48, height: 28, flexShrink: 0,
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: `rgba(190,3,128,${0.15 + i * 0.17})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-family-base)', fontSize: '11px', fontWeight: 500, color: 'var(--color-gray-white)' }}>{t.value}</span>
                </div>
                <div>
                  <TokenLabel>{t.token}</TokenLabel>
                  <br />
                  <TokenMeta>{t.usage}</TokenMeta>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════
   MAIN — TokensPage
════════════════════════════════════════════════════════════════ */

export type TokensTab = 'colors' | 'typography' | 'spacing'

const TABS: { id: TokensTab; label: string }[] = [
  { id: 'colors',     label: 'Cores' },
  { id: 'typography', label: 'Tipografia' },
  { id: 'spacing',    label: 'Spacing & Radius' },
]

export function TokensPage({ initialTab = 'colors' }: { initialTab?: TokensTab }) {
  const [tab, setTab] = useState<TokensTab>(initialTab)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', backgroundColor: 'var(--color-surface-bg)' }}>

      {/* Tab bar */}
      <div style={{
        display: 'flex', gap: 4, padding: '0 24px',
        borderBottom: '1px solid var(--color-divider)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: tab === t.id ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
              color: tab === t.id ? 'var(--color-brand)' : 'var(--color-content-secondary)',
              padding: '10px 16px',
              borderBottom: tab === t.id ? '2px solid var(--color-brand)' : '2px solid transparent',
              marginBottom: -1,
              background: 'none',
              border: 'none',
              borderBottomStyle: 'solid',
              borderBottomWidth: 2,
              borderBottomColor: tab === t.id ? 'var(--color-brand)' : 'transparent',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {tab === 'colors'     && <ColorsPage />}
        {tab === 'typography' && <TypographyPage />}
        {tab === 'spacing'    && <SpacingPage />}
      </div>
    </div>
  )
}
