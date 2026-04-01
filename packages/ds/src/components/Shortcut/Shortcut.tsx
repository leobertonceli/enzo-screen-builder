import type { ReactNode } from 'react'
import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

export type ShortcutType = 'callout' | 'support'
export type ShortcutState = 'idle' | 'pressed' | 'disabled' | 'loading'

export interface ShortcutProps {
  type?: ShortcutType
  state?: ShortcutState
  title?: string
  subtitle?: string
  badge?: boolean
  badgeCount?: number
  icon?: ReactNode
  onClick?: () => void
  className?: string
}

const calloutBg: Record<ShortcutState, string> = {
  idle:     'var(--color-brand)',
  pressed:  'var(--color-brand-pressed)',
  disabled: 'var(--color-surface-subtle)',
  loading:  'var(--color-gray-00)',
}

const supportBg: Record<ShortcutState, string> = {
  idle:     'var(--color-off-gray-00)',
  pressed:  'var(--color-gray-20)',
  disabled: 'var(--color-surface-subtle)',
  loading:  'var(--color-gray-00)',
}

function Badge({ count, onBrand = false }: { count?: number; onBrand?: boolean }) {
  return (
    <div style={{
      minWidth: 20,
      height: 20,
      borderRadius: 'var(--radius-pill)',
      backgroundColor: onBrand ? 'var(--color-gray-white)' : 'var(--color-brand)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 var(--spacing-01)',
    }}>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: onBrand ? 'var(--color-brand)' : 'var(--color-gray-white)',
        lineHeight: 1,
      }}>
        {count ?? 1}
      </span>
    </div>
  )
}

export function Shortcut({
  type = 'callout',
  state = 'idle',
  title = 'Título',
  subtitle = 'Subtítulo',
  badge = false,
  badgeCount = 1,
  icon,
  onClick,
  className,
}: ShortcutProps) {
  const isLoading  = state === 'loading'
  const isDisabled = state === 'disabled'
  const isOnBrand  = type === 'callout' && !isDisabled && !isLoading
  const showBadge  = badge && (state === 'idle' || state === 'pressed')
  const showContent = !isLoading

  const contentColor = isOnBrand
    ? 'var(--color-gray-white)'
    : isDisabled
    ? 'var(--color-gray-30)'
    : 'var(--color-content-primary)'

  const iconColor = contentColor

  const bg = type === 'callout' ? calloutBg[state] : supportBg[state]

  /* ── Callout ───────────────────────────────────────────────────── */
  if (type === 'callout') {
    return (
      <div
        onClick={onClick}
        className={className}
        style={{
          position: 'relative',
          width: 327,
          height: 160,
          borderRadius: 'var(--radius-xl)',
          backgroundColor: bg,
          padding: 'var(--spacing-05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: onClick ? 'pointer' : undefined,
          flexShrink: 0,
        }}
      >
        {showContent && (
          <>
            {/* Top: icon */}
            <div style={{ width: 24, height: 24 }}>
              {icon ?? <Icon name="checkOutlined" size={ICON_SIZE.lg} color={iconColor} />}
            </div>

            {/* Bottom: text + chevron */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', minWidth: 0 }}>
                <p style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  lineHeight: 'var(--line-height-title)',
                  color: contentColor,
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {subtitle}
                </p>
                <p style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 'var(--font-weight-medium)',
                  lineHeight: 'var(--line-height-title)',
                  color: contentColor,
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {title}
                </p>
              </div>
              <Icon name="chevronArrowRight" size={ICON_SIZE.sm} color={iconColor} />
            </div>
          </>
        )}

        {/* Badge — absolute top-right */}
        {showBadge && (
          <div style={{ position: 'absolute', top: 'var(--spacing-05)', right: 'var(--spacing-05)' }}>
            <Badge count={badgeCount} onBrand={isOnBrand} />
          </div>
        )}
      </div>
    )
  }

  /* ── Support ───────────────────────────────────────────────────── */
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: 156,
        height: 124,
        borderRadius: 'var(--radius-xl)',
        backgroundColor: bg,
        padding: 'var(--spacing-04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : undefined,
        flexShrink: 0,
      }}
    >
      {showContent && (
        <>
          {/* Top: icon + badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: 24, height: 24 }}>
              {icon ?? <Icon name="heartOutlined" size={ICON_SIZE.lg} color={iconColor} />}
            </div>
            {showBadge && <Badge count={badgeCount} />}
          </div>

          {/* Bottom: title */}
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-title)',
            letterSpacing: 'var(--letter-spacing-button)',
            color: isDisabled ? 'var(--color-gray-30)' : 'var(--color-content-primary)',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </p>
        </>
      )}
    </div>
  )
}
