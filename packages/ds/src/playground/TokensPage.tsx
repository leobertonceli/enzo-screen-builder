import { useState } from 'react'

/* ── Data ────────────────────────────────────────────────────────── */

const colorGroups = [
  {
    label: 'Brand — Magenta',
    tokens: [
      { name: 'magenta-00',  hex: '#FFF0FA' },
      { name: 'magenta-10',  hex: '#FCC0E8' },
      { name: 'magenta-20',  hex: '#F59DD3' },
      { name: 'magenta-30',  hex: '#F770CA' },
      { name: 'magenta-40',  hex: '#EC5BB4' },
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
      { name: 'white',    hex: '#FFFFFF', alias: 'surface' },
      { name: 'gray-00',  hex: '#FAFAFA', alias: 'surface-bg' },
      { name: 'gray-10',  hex: '#F4F4F4', alias: 'surface-subtle · divider' },
      { name: 'gray-20',  hex: '#E0E0E0', alias: 'stroke' },
      { name: 'gray-30',  hex: '#C2C2C2' },
      { name: 'gray-40',  hex: '#A3A3A3' },
      { name: 'gray-50',  hex: '#8F8F8F', alias: 'content-tertiary' },
      { name: 'gray-60',  hex: '#6F6F6F', alias: 'content-secondary' },
      { name: 'gray-70',  hex: '#585858' },
      { name: 'gray-80',  hex: '#3D3D3D' },
      { name: 'gray-90',  hex: '#292929', alias: 'dark-surface-hover' },
      { name: 'gray-100', hex: '#141414', alias: 'content-primary · dark-surface' },
    ],
  },
]

// Each token renders itself: the preview IS the style
const typeTokens = [
  { name: 'Heading / Large',   family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-xxxxl)', sizeLabel: '64px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-heading)',   lhLabel: '1.0',  ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Heading / Small',   family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-xxxl)',  sizeLabel: '48px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-heading)',   lhLabel: '1.0',  ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Large',     family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-xxl)',   sizeLabel: '32px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-title)',     lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Large ·M',  family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-xxl)',   sizeLabel: '32px', weight: 'var(--font-weight-medium)',   weightLabel: '500', lh: 'var(--line-height-title)',     lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Medium',    family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-xl)',    sizeLabel: '24px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-title)',     lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Medium ·M', family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-xl)',    sizeLabel: '24px', weight: 'var(--font-weight-medium)',   weightLabel: '500', lh: 'var(--line-height-title)',     lhLabel: '1.24', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Small',     family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-lg)',    sizeLabel: '20px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-title-sm)',  lhLabel: '1.32', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Title / Small ·M',  family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-lg)',    sizeLabel: '20px', weight: 'var(--font-weight-medium)',   weightLabel: '500', lh: 'var(--line-height-title-sm)',  lhLabel: '1.32', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Large',     family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-md)',    sizeLabel: '16px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-label)',     lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Large ·SB', family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-md)',    sizeLabel: '16px', weight: 'var(--font-weight-semibold)', weightLabel: '600', lh: 'var(--line-height-label)',     lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Medium',    family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-sm)',    sizeLabel: '14px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-label)',     lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Medium ·SB',family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-sm)',    sizeLabel: '14px', weight: 'var(--font-weight-semibold)', weightLabel: '600', lh: 'var(--line-height-label)',     lhLabel: '1.44', ls: 'var(--letter-spacing-none)',     lsLabel: '—' },
  { name: 'Label / Small',     family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-xs)',    sizeLabel: '12px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-label-sm)',  lhLabel: '1.24', ls: 'var(--letter-spacing-label-sm)',  lsLabel: '0.01em' },
  { name: 'Label / Small ·SB', family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-xs)',    sizeLabel: '12px', weight: 'var(--font-weight-semibold)', weightLabel: '600', lh: 'var(--line-height-label-sm)',  lhLabel: '1.24', ls: 'var(--letter-spacing-label-sm)',  lsLabel: '0.01em' },
  { name: 'Para / Large',      family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-md)',    sizeLabel: '16px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-para-lg)',   lhLabel: '1.52', ls: 'var(--letter-spacing-para)',      lsLabel: '0.2px' },
  { name: 'Para / Large ·SB',  family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-md)',    sizeLabel: '16px', weight: 'var(--font-weight-semibold)', weightLabel: '600', lh: 'var(--line-height-para-lg)',   lhLabel: '1.52', ls: 'var(--letter-spacing-para)',      lsLabel: '0.2px' },
  { name: 'Para / Medium',     family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-sm)',    sizeLabel: '14px', weight: 'var(--font-weight-regular)',  weightLabel: '400', lh: 'var(--line-height-para-md)',   lhLabel: '1.64', ls: 'var(--letter-spacing-para)',      lsLabel: '0.2px' },
  { name: 'Para / Medium ·SB', family: 'var(--font-family-label)', familyLabel: 'DM Sans', size: 'var(--font-size-sm)',    sizeLabel: '14px', weight: 'var(--font-weight-semibold)', weightLabel: '600', lh: 'var(--line-height-para-md)',   lhLabel: '1.64', ls: 'var(--letter-spacing-para)',      lsLabel: '0.2px' },
  { name: 'Button / Large',   family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-md)',    sizeLabel: '16px', weight: 'var(--font-weight-medium)',   weightLabel: '500', lh: '1.24',                        lhLabel: '1.24', ls: 'var(--letter-spacing-none)',      lsLabel: '—' },
  { name: 'Button / Small',   family: 'var(--font-family-base)',  familyLabel: 'Haffer',  size: 'var(--font-size-sm)',    sizeLabel: '14px', weight: 'var(--font-weight-medium)',   weightLabel: '500', lh: '1.16',                        lhLabel: '1.16', ls: 'var(--letter-spacing-none)',      lsLabel: '—' },
]

const radiusTokens = [
  { name: '--radius-none', value: '0px' },
  { name: '--radius-sm',   value: '12px' },
  { name: '--radius-md',   value: '16px' },
  { name: '--radius-pill', value: '1000px' },
]

const spacingTokens = [
  { name: '--spacing-01', value: '4px',  px: 4  },
  { name: '--spacing-02', value: '8px',  px: 8  },
  { name: '--spacing-03', value: '12px', px: 12 },
  { name: '--spacing-04', value: '16px', px: 16 },
  { name: '--spacing-05', value: '20px', px: 20 },
  { name: '--spacing-06', value: '24px', px: 24 },
  { name: '--spacing-08', value: '32px', px: 32 },
]

function isDark(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 < 128
}

/* ── Sub-pages ───────────────────────────────────────────────────── */

function ColorsPage() {
  return (
    <div className="p-8 overflow-auto flex-1">
      {colorGroups.map(group => (
        <section key={group.label} className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-content-tertiary)] mb-5">
            {group.label}
          </h2>
          <div className="flex flex-wrap gap-3">
            {group.tokens.map(t => {
              const dark = isDark(t.hex)
              return (
                <div key={t.name} className="flex flex-col gap-1.5" style={{ width: 80 }}>
                  <div
                    className="h-14 w-full rounded-xl border border-black/[0.06] flex items-end p-1.5"
                    style={{ backgroundColor: t.hex }}
                  >
                    {t.alias && (
                      <span
                        className="text-[8px] font-mono leading-tight px-1 py-0.5 rounded"
                        style={{
                          background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)',
                          color: dark ? '#fff' : '#141414',
                        }}
                      >
                        {t.alias.split(' · ')[0]}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-content-primary)] leading-tight">{t.name}</span>
                  <span className="text-[10px] font-mono text-[var(--color-content-tertiary)] leading-tight">{t.hex}</span>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

function TypographyPage() {
  // Column widths matching Figma proportions (scaled down to fit)
  const cols = '320px 160px 120px 120px 120px 100px'

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-max bg-white">
        {/* Header row */}
        <div
          className="grid items-center px-8 py-3 border-b border-[#E0E0E0]"
          style={{ gridTemplateColumns: cols }}
        >
          {['Hierarchy', 'Typeface', 'Weight', 'Size', 'Line height', 'Tracking'].map(h => (
            <span key={h} className="text-[14px] text-[#141414]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {h}
            </span>
          ))}
        </div>

        {/* Style rows */}
        {typeTokens.map(t => (
          <div
            key={t.name}
            className="grid items-center px-8 border-t border-[#E0E0E0] hover:bg-[#FAFAFA] transition-colors"
            style={{ gridTemplateColumns: cols, minHeight: 100 }}
          >
            {/* Preview — IS the style */}
            <span
              style={{
                fontFamily: t.family,
                fontSize: t.size,
                fontWeight: t.weight,
                lineHeight: t.lh,
                letterSpacing: t.ls,
                color: '#141414',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              {t.name}
            </span>
            <span className="text-[16px] text-[#585858]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.familyLabel}</span>
            <span className="text-[16px] text-[#585858]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.weightLabel}</span>
            <div style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <p className="text-[16px] text-[#585858] leading-[1.44]">{t.sizeLabel}</p>
            </div>
            <span className="text-[16px] text-[#585858]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.lhLabel}</span>
            <span className="text-[16px] text-[#585858]" style={{ fontFamily: 'DM Sans, sans-serif' }}>{t.lsLabel}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SpacingPage() {
  return (
    <div className="p-8 overflow-auto flex-1">
      <div className="flex gap-16">
        {/* Spacing */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-content-tertiary)] mb-5">Spacing</h2>
          <div className="flex flex-col gap-4">
            {spacingTokens.map(t => (
              <div key={t.name} className="flex items-center gap-4">
                <div className="flex items-center" style={{ width: 130 }}>
                  <div
                    className="h-5 bg-[var(--color-brand)] rounded-sm"
                    style={{ width: t.px * 2 }}
                  />
                </div>
                <div className="flex gap-4">
                  <span className="text-[12px] font-mono text-[var(--color-content-primary)] w-28">{t.name}</span>
                  <span className="text-[12px] font-mono text-[var(--color-content-tertiary)]">{t.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-content-tertiary)] mb-5">Border Radius</h2>
          <div className="flex flex-col gap-4">
            {radiusTokens.map(t => (
              <div key={t.name} className="flex items-center gap-4">
                <div
                  className="size-10 bg-[var(--color-brand)] shrink-0"
                  style={{ borderRadius: t.value }}
                />
                <div className="flex gap-4">
                  <span className="text-[12px] font-mono text-[var(--color-content-primary)] w-28">{t.name}</span>
                  <span className="text-[12px] font-mono text-[var(--color-content-tertiary)]">{t.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ── Main ────────────────────────────────────────────────────────── */

type Tab = 'colors' | 'typography' | 'spacing'

const tabs: { id: Tab; label: string }[] = [
  { id: 'colors',     label: 'Cores' },
  { id: 'typography', label: 'Tipografia' },
  { id: 'spacing',    label: 'Spacing & Radius' },
]

export function TokensPage() {
  const [tab, setTab] = useState<Tab>('colors')

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[var(--color-surface-bg)]">
      {/* Tab bar */}
      <div className="flex gap-1 px-6 pt-4 border-b border-[var(--color-divider)] bg-white shrink-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-[13px] font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              tab === t.id
                ? 'text-[var(--color-brand)] border-[var(--color-brand)] bg-white'
                : 'text-[var(--color-content-secondary)] border-transparent hover:text-[var(--color-content-primary)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'colors'     && <ColorsPage />}
      {tab === 'typography' && <TypographyPage />}
      {tab === 'spacing'    && <SpacingPage />}
    </div>
  )
}
