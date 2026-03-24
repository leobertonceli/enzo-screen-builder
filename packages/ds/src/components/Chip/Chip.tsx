import type { CSSProperties, ReactNode } from 'react'
import { Icon } from '../../icons/Icon'

/* ── Types ───────────────────────────────────────────────────────── */
export type ChipVariant = 'text' | 'icon' | 'image'
export type ChipSize = 'small' | 'medium' | 'large'
export type ChipState = 'idle' | 'pressed' | 'selected' | 'disabled'

export interface ChipProps {
  label?: string
  variant?: ChipVariant
  size?: ChipSize
  state?: ChipState
  counter?: string
  showCounter?: boolean
  affordanceIcon?: boolean
  affordanceIconElement?: ReactNode
  iconElement?: ReactNode
  imageUrl?: string
  onClick?: () => void
  className?: string
}

/* ── Size map ────────────────────────────────────────────────────── */
const sizeMap = {
  small: {
    py: 'var(--spacing-03)',          // 12px
    px: 'var(--spacing-05)',          // 20px
    plIcon: 'var(--spacing-03)',      // 12px
    gap: 'var(--spacing-02)',         // 8px
    iconTextGap: 6,
    fontSize: 'var(--font-size-sm)',  // 14px
    counterSize: 'var(--font-size-xs)', // 12px
    iconSize: 16,
    imageSize: 20,
    closeSize: 12,
    minW: 56,
  },
  medium: {
    py: 'var(--spacing-04)',          // 16px
    px: 'var(--spacing-05)',          // 20px
    plIcon: 14,
    gap: 'var(--spacing-03)',         // 12px
    iconTextGap: 10,
    fontSize: 'var(--font-size-sm)',  // 14px
    counterSize: 'var(--font-size-sm)', // 14px
    iconSize: 20,
    imageSize: 24,
    closeSize: 16,
    minW: 80,
  },
  large: {
    py: 'var(--spacing-05)',          // 20px
    px: 'var(--spacing-06)',          // 24px
    plIcon: 18,
    gap: 'var(--spacing-04)',         // 16px
    iconTextGap: 10,
    fontSize: 'var(--font-size-md)',  // 16px
    counterSize: 'var(--font-size-md)', // 16px
    iconSize: 24,
    imageSize: 32,
    closeSize: 16,
    minW: 104,
  },
} as const

/* ── State colors ────────────────────────────────────────────────── */
const stateMap = {
  idle: {
    bg: 'transparent',
    border: 'var(--color-stroke)',
    color: 'var(--color-content-primary)',
  },
  pressed: {
    bg: 'transparent',
    border: 'var(--color-content-primary)',
    color: 'var(--color-content-primary)',
  },
  selected: {
    bg: 'var(--color-magenta-00)',
    border: 'var(--color-magenta-10)',
    color: 'var(--color-content-primary)',
  },
  disabled: {
    bg: 'transparent',
    border: 'var(--color-stroke)',
    color: 'var(--color-gray-30)',
  },
}

/* ── Component ───────────────────────────────────────────────────── */
export function Chip({
  label = 'Suggestion',
  variant = 'text',
  size = 'small',
  state = 'idle',
  counter = '000',
  showCounter = false,
  affordanceIcon = false,
  affordanceIconElement,
  iconElement,
  imageUrl,
  onClick,
  className,
}: ChipProps) {
  const s = sizeMap[size]
  const colors = stateMap[state]
  const isDisabled = state === 'disabled'
  const hasIcon = variant === 'icon' || variant === 'image'

  const containerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    minWidth: s.minW,
    paddingTop: s.py,
    paddingBottom: s.py,
    paddingLeft: hasIcon ? s.plIcon : s.px,
    paddingRight: affordanceIcon ? (size === 'small' ? 18 : s.px) : s.px,
    borderRadius: 'var(--radius-pill)',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.bg,
    cursor: isDisabled ? 'default' : 'pointer',
    fontFamily: 'var(--font-family-base)',
    fontWeight: 'var(--font-weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    lineHeight: 'var(--line-height-title)',
    transition: 'all 0.15s ease',
  }

  const textStyle: CSSProperties = {
    fontSize: s.fontSize,
    color: colors.color,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  const counterStyle: CSSProperties = {
    fontSize: s.counterSize,
    color: colors.color,
    whiteSpace: 'nowrap',
  }

  return (
    <button
      type="button"
      className={className}
      style={containerStyle}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {/* Left side: icon or image */}
      {variant === 'icon' && (
        <div className="flex items-center shrink-0" style={{ gap: s.iconTextGap }}>
          <div
            className="shrink-0 flex items-center justify-center overflow-hidden"
            style={{
              width: s.iconSize,
              height: s.iconSize,
              opacity: isDisabled ? 0.24 : 1,
            }}
          >
            {iconElement}
          </div>
          <span style={textStyle}>{label}</span>
        </div>
      )}

      {variant === 'image' && (
        <div className="flex items-center shrink-0" style={{ gap: s.iconTextGap }}>
          <div
            className="shrink-0 overflow-hidden"
            style={{
              width: s.imageSize,
              height: s.imageSize,
              borderRadius: 'var(--radius-pill)',
              opacity: isDisabled ? 0.24 : 1,
            }}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
          <span style={textStyle}>{label}</span>
        </div>
      )}

      {/* Text variant — just label */}
      {variant === 'text' && <span style={textStyle}>{label}</span>}

      {/* Right side: counter + affordance icon */}
      {(showCounter || affordanceIcon) && (
        <div className="flex items-center shrink-0" style={{ gap: 6 }}>
          {showCounter && <span style={counterStyle}>{counter}</span>}
          {affordanceIcon && (
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: s.closeSize,
                height: s.closeSize,
                opacity: isDisabled ? 0.24 : 1,
              }}
            >
              {affordanceIconElement || (
                <Icon name="close" size={s.closeSize} color={colors.color} />
              )}
            </div>
          )}
        </div>
      )}
    </button>
  )
}
