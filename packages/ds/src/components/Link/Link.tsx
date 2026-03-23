import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type LinkSize = 'lg' | 'sm'
export type LinkContext = 'on-light' | 'on-dark'
export type LinkIcon = 'none' | 'left' | 'right'

export interface LinkProps {
  label?: string
  size?: LinkSize
  context?: LinkContext
  icon?: LinkIcon
  onClick?: () => void
  className?: string
}

/* ── Size map ── */
const sizeMap: Record<LinkSize, {
  fontSize: string
  lineHeight: string
  iconSize: number
  gap: string
  minWidth: number
}> = {
  lg: {
    fontSize: 'var(--font-size-md)',       // 16px
    lineHeight: '1.24',
    iconSize: 24,
    gap: 'var(--spacing-03)',              // 12px
    minWidth: 112,
  },
  sm: {
    fontSize: 'var(--font-size-sm)',       // 14px
    lineHeight: '1.16',
    iconSize: 16,
    gap: 'var(--spacing-02)',              // 8px
    minWidth: 80,
  },
}

/* ── Color map: context × state ── */
type ColorEntry = { color: string }

const colorMap: Record<LinkContext, Record<'enabled' | 'pressed', ColorEntry>> = {
  'on-light': {
    enabled: { color: 'var(--color-brand)' },
    pressed: { color: 'var(--color-brand-pressed)' },
  },
  'on-dark': {
    enabled: { color: 'var(--color-gray-white)' },
    pressed: { color: 'rgba(255,255,255,0.7)' },
  },
}

export function Link({
  label = 'Link label',
  size = 'lg',
  context = 'on-light',
  icon = 'none',
  onClick,
  className,
}: LinkProps) {
  const s = sizeMap[size]
  const colors = colorMap[context]

  const iconName = icon === 'left' ? 'arrow-left' : 'arrow-right'

  const rootStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: icon !== 'none' ? s.gap : undefined,
    padding: 'var(--spacing-02) 0',
    borderRadius: 'var(--radius-pill)',
    minWidth: s.minWidth,
    cursor: 'pointer',
    color: colors.enabled.color,
    fontFamily: 'var(--font-family-base)',
    fontSize: s.fontSize,
    fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
    lineHeight: s.lineHeight,
    letterSpacing: 'var(--letter-spacing-button)',
    textAlign: 'center',
    border: 'none',
    background: 'none',
    transition: 'color 0.15s ease',
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = colors.pressed.color
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = colors.enabled.color
  }

  return (
    <button
      className={className}
      style={rootStyle}
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={(e) => { e.currentTarget.style.color = colors.enabled.color }}
      type="button"
    >
      {icon === 'left' && (
        <Icon name={iconName} size={s.iconSize} color="currentColor" />
      )}
      <span>{label}</span>
      {icon === 'right' && (
        <Icon name={iconName} size={s.iconSize} color="currentColor" />
      )}
    </button>
  )
}
