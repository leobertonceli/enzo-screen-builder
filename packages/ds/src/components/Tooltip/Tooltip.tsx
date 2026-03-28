export type TooltipPosition = 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'

export interface TooltipProps {
  label?: string
  position?: TooltipPosition
  darkVariant?: boolean
  className?: string
}

export function Tooltip({ label = 'Lorem Ipsum', position = 'top-left', darkVariant = false, className }: TooltipProps) {
  const bg = darkVariant ? 'var(--color-gray-70)' : 'var(--color-dark-surface)'
  const arrowColor = darkVariant ? '#585858' : '#141414'
  const S = 8

  const contentStyle = {
    backgroundColor: bg,
    borderRadius: 'var(--radius-xxs)',
    padding: '8px 12px',
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0 as const,
  }

  const textStyle = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-title)',
    color: 'var(--color-gray-white)',
    margin: 0,
    whiteSpace: 'nowrap' as const,
  }

  const arrowTop    = { width: 0, height: 0, borderLeft: `${S}px solid transparent`, borderRight: `${S}px solid transparent`, borderTop: `${S}px solid ${arrowColor}`, flexShrink: 0 as const }
  const arrowBottom = { width: 0, height: 0, borderLeft: `${S}px solid transparent`, borderRight: `${S}px solid transparent`, borderBottom: `${S}px solid ${arrowColor}`, flexShrink: 0 as const }
  const arrowLeft   = { width: 0, height: 0, borderTop: `${S}px solid transparent`, borderBottom: `${S}px solid transparent`, borderLeft: `${S}px solid ${arrowColor}`, flexShrink: 0 as const }
  const arrowRight  = { width: 0, height: 0, borderTop: `${S}px solid transparent`, borderBottom: `${S}px solid transparent`, borderRight: `${S}px solid ${arrowColor}`, flexShrink: 0 as const }

  const alignMap: Record<TooltipPosition, string> = {
    'top-left': 'flex-start', 'top': 'center', 'top-right': 'flex-end',
    'bottom-left': 'flex-start', 'bottom': 'center', 'bottom-right': 'flex-end',
    'left': 'center', 'right': 'center',
  }

  const content = <div style={contentStyle}><p style={textStyle}>{label}</p></div>

  if (position.startsWith('top')) {
    return (
      <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: alignMap[position] }}>
        {content}
        <div style={arrowTop} />
      </div>
    )
  }
  if (position.startsWith('bottom')) {
    return (
      <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: alignMap[position] }}>
        <div style={arrowBottom} />
        {content}
      </div>
    )
  }
  if (position === 'left') {
    return (
      <div className={className} style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }}>
        {content}
        <div style={arrowLeft} />
      </div>
    )
  }
  if (position === 'right') {
    return (
      <div className={className} style={{ display: 'inline-flex', flexDirection: 'row', alignItems: 'center' }}>
        <div style={arrowRight} />
        {content}
      </div>
    )
  }
  return content
}
