import type { CSSProperties } from 'react'

export type BadgeType = 'counter' | 'dot'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  type?: BadgeType
  size?: BadgeSize
  stroke?: boolean
  count?: number
  className?: string
  style?: CSSProperties
}

export function Badge({ type = 'counter', size = 'md', stroke = false, count = 1, className, style }: BadgeProps) {
  const isMd = size === 'md'
  const isDot = type === 'dot'
  const dotSize = isMd ? 20 : 16
  const borderWidth = isMd ? 2 : 1.5

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-brand)',
    borderRadius: 'var(--radius-pill)',
    flexShrink: 0,
    ...(stroke && { boxShadow: `0 0 0 ${borderWidth}px var(--color-gray-white)` }),
  }

  if (isDot) {
    return <div className={className} style={{ ...baseStyle, width: dotSize, height: dotSize, ...style }} />
  }

  return (
    <div className={className} style={{
      ...baseStyle,
      minWidth: isMd ? 20 : 16,
      height: isMd ? 20 : 16,
      padding: isMd ? '4px 6px' : '2px 4px',
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        lineHeight: 1,
        color: 'var(--color-gray-white)',
        whiteSpace: 'nowrap',
      }}>{count}</span>
    </div>
  )
}
