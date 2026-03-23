import { useEffect, useRef, useState } from 'react'

interface InspectData {
  rect: DOMRect
  padding: { top: number; right: number; bottom: number; left: number }
  tag: string
  width: number
  height: number
  font: { family: string; size: string; weight: string; lineHeight: string; letterSpacing: string } | null
  dsTokens: DSTokenMatch[]
  dsComponent: string | null
  borderRadius: string
  backgroundColor: string
  color: string
}

interface DSTokenMatch {
  property: string
  value: string
  token: string | null
  isDS: boolean
}

/* ── DS token maps for reverse-lookup ── */
const COLOR_TOKENS: Record<string, string> = {
  '#ffffff': '--color-gray-white',
  '#fafafa': '--color-gray-00',
  '#f4f4f4': '--color-gray-10',
  '#e0e0e0': '--color-gray-20',
  '#c2c2c2': '--color-gray-30',
  '#a3a3a3': '--color-gray-40',
  '#8f8f8f': '--color-gray-50',
  '#6f6f6f': '--color-gray-60',
  '#585858': '--color-gray-70',
  '#3d3d3d': '--color-gray-80',
  '#292929': '--color-gray-90',
  '#141414': '--color-gray-100',
  '#fff0fa': '--color-magenta-00',
  '#fcc0e8': '--color-magenta-10',
  '#f59dd3': '--color-magenta-20',
  '#f770ca': '--color-magenta-30',
  '#ec5bb4': '--color-magenta-40',
  '#e738ad': '--color-magenta-50',
  '#be0380': '--color-magenta-60 (brand)',
  '#960169': '--color-magenta-70',
  '#750153': '--color-magenta-80',
  '#5b0043': '--color-magenta-90',
  '#40002d': '--color-magenta-100',
}

const FONT_SIZE_TOKENS: Record<string, string> = {
  '12': '--font-size-xs',
  '14': '--font-size-sm',
  '16': '--font-size-md',
  '20': '--font-size-lg',
  '24': '--font-size-xl',
  '32': '--font-size-xxl',
  '48': '--font-size-xxxl',
  '64': '--font-size-xxxxl',
}

const SPACING_TOKENS: Record<string, string> = {
  '4': '--spacing-01',
  '8': '--spacing-02',
  '12': '--spacing-03',
  '16': '--spacing-04',
  '20': '--spacing-05',
  '24': '--spacing-06',
  '32': '--spacing-08',
}

const RADIUS_TOKENS: Record<string, string> = {
  '0': '--radius-none',
  '8': '--radius-xs',
  '12': '--radius-sm',
  '16': '--radius-md',
  '20': '--radius-lg',
  '24': '--radius-xl',
  '1000': '--radius-pill',
}

const FONT_WEIGHT_TOKENS: Record<string, string> = {
  '300': '--font-weight-light',
  '400': '--font-weight-regular',
  '500': '--font-weight-medium',
  '600': '--font-weight-semibold',
}

/* Known DS component names — detected by data-component attribute or class patterns */
const DS_COMPONENTS = ['Button', 'Chip', 'ListItem', 'BaseCard', 'ChatInput', 'Icon']

function rgbToHex(rgb: string): string {
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!match) return rgb.toLowerCase()
  const [, r, g, b] = match
  return '#' + [r, g, b].map(n => parseInt(n).toString(16).padStart(2, '0')).join('')
}

function findColorToken(value: string): string | null {
  if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)') return null
  const hex = rgbToHex(value).toLowerCase()
  return COLOR_TOKENS[hex] ?? null
}

function findSpacingToken(px: number): string | null {
  return SPACING_TOKENS[String(Math.round(px))] ?? null
}

function findRadiusToken(value: string): string | null {
  const px = Math.round(parseFloat(value))
  if (isNaN(px)) return null
  return RADIUS_TOKENS[String(px)] ?? null
}

function findFontSizeToken(value: string): string | null {
  const px = Math.round(parseFloat(value))
  return FONT_SIZE_TOKENS[String(px)] ?? null
}

function findFontWeightToken(value: string): string | null {
  return FONT_WEIGHT_TOKENS[value] ?? null
}

function detectDSComponent(el: HTMLElement): string | null {
  // Walk up from element to find a DS component wrapper
  let current: HTMLElement | null = el
  while (current) {
    // Check data attribute
    const comp = current.getAttribute('data-component')
    if (comp && DS_COMPONENTS.includes(comp)) return comp

    // Check class names for component indicators
    for (const name of DS_COMPONENTS) {
      if (current.classList?.contains(name.toLowerCase()) || current.classList?.contains(`ds-${name.toLowerCase()}`)) {
        return name
      }
    }

    current = current.parentElement
  }
  return null
}

function collectTokenMatches(s: CSSStyleDeclaration, el: HTMLElement): DSTokenMatch[] {
  const matches: DSTokenMatch[] = []

  // Background color
  const bg = s.backgroundColor
  if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
    const token = findColorToken(bg)
    matches.push({ property: 'bg', value: rgbToHex(bg), token, isDS: token !== null })
  }

  // Text color
  const color = s.color
  if (color) {
    const token = findColorToken(color)
    matches.push({ property: 'color', value: rgbToHex(color), token, isDS: token !== null })
  }

  // Border radius
  const br = s.borderRadius
  if (br && br !== '0px') {
    const token = findRadiusToken(br)
    matches.push({ property: 'radius', value: Math.round(parseFloat(br)) + 'px', token, isDS: token !== null })
  }

  // Font size
  const fs = s.fontSize
  if (fs) {
    const token = findFontSizeToken(fs)
    matches.push({ property: 'font-size', value: Math.round(parseFloat(fs)) + 'px', token, isDS: token !== null })
  }

  // Font weight
  const fw = s.fontWeight
  if (fw && fw !== 'normal' && fw !== '400') {
    const token = findFontWeightToken(fw)
    matches.push({ property: 'font-weight', value: fw, token, isDS: token !== null })
  }

  // Font family
  const ff = s.fontFamily.split(',')[0].replace(/["']/g, '').trim()
  if (ff) {
    const isDS = ff === 'Haffer' || ff === 'DM Sans'
    matches.push({ property: 'font-family', value: ff, token: ff === 'Haffer' ? '--font-family-base' : ff === 'DM Sans' ? '--font-family-label' : null, isDS })
  }

  // Paddings
  const paddings = [
    { prop: 'padding-top', val: parseFloat(s.paddingTop) },
    { prop: 'padding-right', val: parseFloat(s.paddingRight) },
    { prop: 'padding-bottom', val: parseFloat(s.paddingBottom) },
    { prop: 'padding-left', val: parseFloat(s.paddingLeft) },
  ]
  for (const p of paddings) {
    if (p.val > 0) {
      const token = findSpacingToken(p.val)
      matches.push({ property: p.prop, value: p.val + 'px', token, isDS: token !== null })
    }
  }

  return matches
}

interface Props {
  active: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function InspectOverlay({ active, containerRef }: Props) {
  const [data, setData] = useState<InspectData | null>(null)
  const [pinned, setPinned] = useState<InspectData | null>(null)
  const frameRef = useRef<number>(0)

  // Always listen for right-click, even when inspect mode is off
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onContextMenu = (e: MouseEvent) => {
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (!el || !container.contains(el)) return

      e.preventDefault()
      const inspected = inspectElement(el)
      setPinned(inspected)
      setData(inspected)
    }

    container.addEventListener('contextmenu', onContextMenu)
    return () => {
      container.removeEventListener('contextmenu', onContextMenu)
    }
  }, [containerRef])

  // Hover inspect when active mode is on
  useEffect(() => {
    if (!active && !pinned) { setData(null); return }

    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      if (pinned) return
      if (!active) return
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
        if (!el || !container.contains(el)) { setData(null); return }
        setData(inspectElement(el))
      })
    }

    const onLeave = () => {
      if (!pinned) setData(null)
    }

    // Click to dismiss pinned
    const onClick = (e: MouseEvent) => {
      if (pinned) {
        e.preventDefault()
        e.stopPropagation()
        setPinned(null)
        setData(null)
      }
    }

    window.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    if (pinned) {
      window.addEventListener('click', onClick, true)
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('click', onClick, true)
      cancelAnimationFrame(frameRef.current)
    }
  }, [active, containerRef, pinned])

  const displayData = pinned ?? data
  if (!displayData) return null

  const { rect, padding: p } = displayData

  // Count DS matches
  const dsCount = displayData.dsTokens.filter(t => t.isDS).length
  const totalProps = displayData.dsTokens.length
  const nonDSCount = totalProps - dsCount

  return (
    <>
      {/* Padding overlays — fixed so they sit on top of everything */}
      {p.top > 0 && (
        <div
          className="fixed pointer-events-none"
          style={{
            backgroundColor: '#00ffaa',
            opacity: 0.25,
            left: rect.left + p.left,
            top:  rect.top,
            width:  rect.width - p.left - p.right,
            height: p.top,
            zIndex: 9998,
          }}
        />
      )}
      {p.bottom > 0 && (
        <div
          className="fixed pointer-events-none"
          style={{
            backgroundColor: '#00ffaa',
            opacity: 0.25,
            left: rect.left + p.left,
            top:  rect.bottom - p.bottom,
            width:  rect.width - p.left - p.right,
            height: p.bottom,
            zIndex: 9998,
          }}
        />
      )}
      {p.left > 0 && (
        <div
          className="fixed pointer-events-none"
          style={{
            backgroundColor: '#00ffaa',
            opacity: 0.25,
            left: rect.left,
            top:  rect.top,
            width:  p.left,
            height: rect.height,
            zIndex: 9998,
          }}
        />
      )}
      {p.right > 0 && (
        <div
          className="fixed pointer-events-none"
          style={{
            backgroundColor: '#00ffaa',
            opacity: 0.25,
            left: rect.right - p.right,
            top:  rect.top,
            width:  p.right,
            height: rect.height,
            zIndex: 9998,
          }}
        />
      )}

      {/* Element border */}
      <div
        className="fixed pointer-events-none"
        style={{
          left:   rect.left,
          top:    rect.top,
          width:  rect.width,
          height: rect.height,
          outline: pinned ? '2px solid #FF6B00' : '1px solid #4D9EF5',
          zIndex: 9999,
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed pointer-events-none"
        style={{
          zIndex: 10000,
          backgroundColor: '#141414',
          color: '#ffffff',
          borderRadius: 12,
          padding: '12px 14px',
          fontSize: 11,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          left: Math.min(rect.left, window.innerWidth - 280),
          top:  rect.bottom + 8,
          minWidth: 240,
          maxWidth: 320,
          border: pinned ? '1px solid #FF6B00' : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Element info */}
        <div style={{ color: '#666', marginBottom: 8 }}>
          {displayData.tag} · {Math.round(displayData.width)}×{Math.round(displayData.height)}px
        </div>

        {/* DS Component badge */}
        {displayData.dsComponent && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            borderRadius: 6,
            backgroundColor: 'rgba(0, 200, 120, 0.15)',
            color: '#00C878',
            fontSize: 10,
            fontWeight: 600,
            marginBottom: 8,
            letterSpacing: 0.5,
          }}>
            ✓ DS Component: {displayData.dsComponent}
          </div>
        )}

        {/* DS Token compliance summary */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 8,
          fontSize: 10,
        }}>
          {dsCount > 0 && (
            <span style={{ color: '#00C878' }}>
              ✓ {dsCount} token{dsCount > 1 ? 's' : ''}
            </span>
          )}
          {nonDSCount > 0 && (
            <span style={{ color: '#FF6B6B' }}>
              ✗ {nonDSCount} non-DS
            </span>
          )}
        </div>

        {/* Padding section */}
        <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 9, marginBottom: 4 }}>Padding</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 8 }}>
          {p.top > 0    && <span><span style={{ color: '#00ffaa' }}>↑</span> {p.top}px {findSpacingToken(p.top) ? <span style={{ color: '#00C878' }}>({findSpacingToken(p.top)})</span> : <span style={{ color: '#FF6B6B' }}>(no token)</span>}</span>}
          {p.bottom > 0 && <span><span style={{ color: '#00ffaa' }}>↓</span> {p.bottom}px {findSpacingToken(p.bottom) ? <span style={{ color: '#00C878' }}>({findSpacingToken(p.bottom)})</span> : <span style={{ color: '#FF6B6B' }}>(no token)</span>}</span>}
          {p.left > 0   && <span><span style={{ color: '#00ffaa' }}>←</span> {p.left}px {findSpacingToken(p.left) ? <span style={{ color: '#00C878' }}>({findSpacingToken(p.left)})</span> : <span style={{ color: '#FF6B6B' }}>(no token)</span>}</span>}
          {p.right > 0  && <span><span style={{ color: '#00ffaa' }}>→</span> {p.right}px {findSpacingToken(p.right) ? <span style={{ color: '#00C878' }}>({findSpacingToken(p.right)})</span> : <span style={{ color: '#FF6B6B' }}>(no token)</span>}</span>}
          {p.top === 0 && p.bottom === 0 && p.left === 0 && p.right === 0 && (
            <span style={{ color: '#555' }}>—</span>
          )}
        </div>

        {/* Typography section */}
        {displayData.font && (
          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 8, marginTop: 4 }}>
            <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 9, marginBottom: 4 }}>Typography</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span><span style={{ color: '#f9a' }}>ff</span> {displayData.font.family}</span>
              <span><span style={{ color: '#f9a' }}>sz</span> {displayData.font.size}</span>
              <span><span style={{ color: '#f9a' }}>wt</span> {displayData.font.weight}</span>
              <span><span style={{ color: '#f9a' }}>lh</span> {displayData.font.lineHeight}</span>
              {displayData.font.letterSpacing !== '0px' && (
                <span><span style={{ color: '#f9a' }}>ls</span> {displayData.font.letterSpacing}</span>
              )}
            </div>
          </div>
        )}

        {/* DS Token details */}
        {displayData.dsTokens.length > 0 && (
          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 8, marginTop: 4 }}>
            <div style={{ color: '#888', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 9, marginBottom: 4 }}>DS Tokens</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {displayData.dsTokens.map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
                  <span style={{ color: t.isDS ? '#00C878' : '#FF6B6B', fontSize: 8 }}>{t.isDS ? '●' : '○'}</span>
                  <span style={{ color: '#888', minWidth: 70 }}>{t.property}</span>
                  <span style={{ color: t.isDS ? '#00C878' : '#FF6B6B' }}>{t.token ?? t.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pinned indicator */}
        {pinned && (
          <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 6, marginTop: 6, fontSize: 9, color: '#FF6B00', textAlign: 'center' }}>
            Right-click pinned · click anywhere to dismiss
          </div>
        )}
      </div>
    </>
  )
}

/* Helper: inspect a single element and build InspectData */
function inspectElement(el: HTMLElement): InspectData {
  const rect = el.getBoundingClientRect()
  const s = window.getComputedStyle(el)

  const hasText = el.childNodes.length > 0 &&
    [...el.childNodes].some(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
  const isTextEl = ['p', 'span', 'h1','h2','h3','h4','h5','h6','a','button','label'].includes(el.tagName.toLowerCase())

  const fontFamily = s.fontFamily.split(',')[0].replace(/["']/g, '').trim()

  const fontWeight = s.fontWeight === '400' ? 'Regular (400)' :
                     s.fontWeight === '500' ? 'Medium (500)' :
                     s.fontWeight === '600' ? 'SemiBold (600)' :
                     s.fontWeight === '700' ? 'Bold (700)' : s.fontWeight

  return {
    rect,
    padding: {
      top:    parseFloat(s.paddingTop),
      right:  parseFloat(s.paddingRight),
      bottom: parseFloat(s.paddingBottom),
      left:   parseFloat(s.paddingLeft),
    },
    tag:    el.tagName.toLowerCase(),
    width:  parseFloat(s.width),
    height: parseFloat(s.height),
    font: (hasText || isTextEl) ? {
      family:        fontFamily,
      size:          Math.round(parseFloat(s.fontSize)) + 'px',
      weight:        fontWeight,
      lineHeight:    s.lineHeight,
      letterSpacing: s.letterSpacing === 'normal' ? '0px' : s.letterSpacing,
    } : null,
    dsTokens: collectTokenMatches(s, el),
    dsComponent: detectDSComponent(el),
    borderRadius: s.borderRadius,
    backgroundColor: s.backgroundColor,
    color: s.color,
  }
}
