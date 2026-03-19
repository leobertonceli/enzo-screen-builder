import { useEffect, useRef, useState } from 'react'

interface InspectData {
  rect: DOMRect
  padding: { top: number; right: number; bottom: number; left: number }
  tag: string
  width: number
  height: number
  font: { family: string; size: string; weight: string; lineHeight: string; letterSpacing: string } | null
}

interface Props {
  active: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function InspectOverlay({ active, containerRef }: Props) {
  const [data, setData] = useState<InspectData | null>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!active) { setData(null); return }

    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
        if (!el || !container.contains(el)) { setData(null); return }

        const rect = el.getBoundingClientRect()
        const s = window.getComputedStyle(el)

        // Only show font info for text-bearing elements
        const hasText = el.childNodes.length > 0 &&
          [...el.childNodes].some(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())
        const isTextEl = ['p', 'span', 'h1','h2','h3','h4','h5','h6','a','button','label'].includes(el.tagName.toLowerCase())

        const fontFamily = s.fontFamily.split(',')[0].replace(/["']/g, '').trim()

        const fontWeight = s.fontWeight === '400' ? 'Regular (400)' :
                           s.fontWeight === '500' ? 'Medium (500)' :
                           s.fontWeight === '600' ? 'SemiBold (600)' :
                           s.fontWeight === '700' ? 'Bold (700)' : s.fontWeight

        setData({
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
        })
      })
    }

    const onLeave = () => setData(null)

    window.addEventListener('mousemove', onMove)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frameRef.current)
    }
  }, [active, containerRef])

  if (!active || !data) return null

  const { rect, padding: p } = data

  return (
    <>
      {/* Padding overlays — fixed so they sit on top of everything */}
      {/* Top padding */}
      {p.top > 0 && (
        <div
          className="fixed pointer-events-none bg-[#0fa]"
          style={{
            opacity: 0.25,
            left: rect.left + p.left,
            top:  rect.top,
            width:  rect.width - p.left - p.right,
            height: p.top,
            zIndex: 9998,
          }}
        />
      )}
      {/* Bottom padding */}
      {p.bottom > 0 && (
        <div
          className="fixed pointer-events-none bg-[#0fa]"
          style={{
            opacity: 0.25,
            left: rect.left + p.left,
            top:  rect.bottom - p.bottom,
            width:  rect.width - p.left - p.right,
            height: p.bottom,
            zIndex: 9998,
          }}
        />
      )}
      {/* Left padding */}
      {p.left > 0 && (
        <div
          className="fixed pointer-events-none bg-[#0fa]"
          style={{
            opacity: 0.25,
            left: rect.left,
            top:  rect.top,
            width:  p.left,
            height: rect.height,
            zIndex: 9998,
          }}
        />
      )}
      {/* Right padding */}
      {p.right > 0 && (
        <div
          className="fixed pointer-events-none bg-[#0fa]"
          style={{
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
          outline: '1px solid #4D9EF5',
          zIndex: 9999,
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed pointer-events-none z-[10000] bg-[#141414] text-white rounded-lg px-3 py-2 text-[11px] font-mono shadow-xl"
        style={{
          left: Math.min(rect.left, window.innerWidth - 220),
          top:  rect.bottom + 8,
          minWidth: 180,
        }}
      >
        {/* Element info */}
        <div className="text-[#666] mb-2">{data.tag} · {Math.round(data.width)}×{Math.round(data.height)}px</div>

        {/* Padding */}
        <div className="text-[#888] uppercase tracking-wider text-[9px] mb-1">Padding</div>
        <div className="flex flex-col gap-0.5 mb-2">
          {p.top > 0    && <span><span className="text-[#0fa]">↑</span> {p.top}px</span>}
          {p.bottom > 0 && <span><span className="text-[#0fa]">↓</span> {p.bottom}px</span>}
          {p.left > 0   && <span><span className="text-[#0fa]">←</span> {p.left}px</span>}
          {p.right > 0  && <span><span className="text-[#0fa]">→</span> {p.right}px</span>}
          {p.top === 0 && p.bottom === 0 && p.left === 0 && p.right === 0 && (
            <span className="text-[#555]">—</span>
          )}
        </div>

        {/* Typography */}
        {data.font && (
          <>
            <div className="border-t border-[#2a2a2a] pt-2 mt-1">
              <div className="text-[#888] uppercase tracking-wider text-[9px] mb-1">Typography</div>
              <div className="flex flex-col gap-0.5">
                <span><span className="text-[#f9a]">ff</span> {data.font.family}</span>
                <span><span className="text-[#f9a]">sz</span> {data.font.size}</span>
                <span><span className="text-[#f9a]">wt</span> {data.font.weight}</span>
                <span><span className="text-[#f9a]">lh</span> {data.font.lineHeight}</span>
                {data.font.letterSpacing !== '0px' && (
                  <span><span className="text-[#f9a]">ls</span> {data.font.letterSpacing}</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
