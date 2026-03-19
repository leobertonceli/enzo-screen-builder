import type { CSSProperties, ReactNode } from 'react'
import { Button } from '../Button'

/* ── Types ───────────────────────────────────────────────────────── */
export type CardSize = 'lg' | 'sm'
export type CardAction = 'none' | 'button' | '2buttons' | 'link' | '2links'

export interface BaseCardProps {
  size?: CardSize
  filled?: boolean
  category?: string
  showCategory?: boolean
  title?: string
  showTitle?: boolean
  subtitle?: string
  showSubtitle?: boolean
  leftAsset?: boolean
  rightAsset?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  action?: CardAction
  slot?: ReactNode
  showSlot?: boolean
  buttonLabel?: string
  buttonLabel2?: string
  linkLabel?: string
  linkLabel2?: string
  onClick?: () => void
  className?: string
  width?: number | string
}

/* ── Size map ────────────────────────────────────────────────────── */
const sizeMap = {
  lg: {
    padding: 'var(--spacing-06)',         // 24px
    gap: 'var(--spacing-06)',             // 24px
    categorySize: 'var(--font-size-sm)',  // 14px
    titleSize: 'var(--font-size-lg)',     // 20px
    subtitleSize: 'var(--font-size-sm)',  // 14px
    titleLineHeight: '1.16',
    assetSize: 24,
    linkGap: 24,
    dividerH: 16,
  },
  sm: {
    padding: 'var(--spacing-05)',         // 20px
    gap: 'var(--spacing-06)',             // 24px
    categorySize: 'var(--font-size-xs)',  // 12px
    titleSize: 'var(--font-size-md)',     // 16px
    subtitleSize: 'var(--font-size-xs)',  // 12px
    titleLineHeight: '1.24',
    assetSize: 20,
    linkGap: 20,
    dividerH: 12,
  },
} as const

/* ── Component ───────────────────────────────────────────────────── */
export function BaseCard({
  size = 'lg',
  filled = false,
  category = 'Category',
  showCategory = true,
  title = 'Title',
  showTitle = true,
  subtitle = 'Subtitle',
  showSubtitle = true,
  leftAsset = true,
  rightAsset = true,
  leftIcon,
  rightIcon,
  action = 'none',
  slot,
  showSlot = true,
  buttonLabel = 'Button label',
  buttonLabel2 = 'Button label',
  linkLabel = 'Link label',
  linkLabel2 = 'Link label',
  onClick,
  className,
  width = 327,
}: BaseCardProps) {
  const s = sizeMap[size]
  const hasLinks = action === 'link' || action === '2links'

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: s.gap,
    alignItems: 'flex-start',
    width,
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    fontFamily: 'var(--font-family-base)',
    cursor: onClick ? 'pointer' : undefined,
    ...(filled
      ? { backgroundColor: 'var(--color-surface-bg)' }
      : { border: '1px solid rgba(20,20,20,0.1)', backgroundColor: 'var(--color-surface)' }
    ),
    ...(hasLinks
      ? { paddingTop: s.padding, paddingLeft: s.padding, paddingRight: s.padding, paddingBottom: 'var(--spacing-04)' }
      : { padding: s.padding }
    ),
  }

  const categoryStyle: CSSProperties = {
    fontSize: s.categorySize,
    color: 'var(--color-brand)',
    fontWeight: 'var(--font-weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    lineHeight: '1.24',
  }

  const titleStyle: CSSProperties = {
    fontSize: s.titleSize,
    color: 'var(--color-content-primary)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 'var(--letter-spacing-none)',
    lineHeight: s.titleLineHeight,
  }

  const subtitleStyle: CSSProperties = {
    fontSize: s.subtitleSize,
    color: 'var(--color-content-secondary)',
    fontWeight: 'var(--font-weight-regular)',
    letterSpacing: 'var(--letter-spacing-none)',
    lineHeight: '1.24',
  }

  const linkStyle: CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-brand)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 'var(--letter-spacing-button)',
    lineHeight: '1.16',
    fontFamily: 'var(--font-family-base)',
    padding: 'var(--spacing-02) 0',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  }

  const btnSize = size === 'lg' ? 'md' : 'sm' as const

  return (
    <div className={className} style={containerStyle} onClick={onClick}>
      {/* Top section: assets + text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', width: '100%', paddingBottom: 'var(--spacing-04)', position: 'relative' }}>
        {/* Left asset */}
        {leftAsset && (
          <div className="flex items-center" style={{ width: s.assetSize, height: s.assetSize }}>
            {leftIcon || (
              <div style={{ width: s.assetSize, height: s.assetSize, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-subtle)', overflow: 'hidden' }} />
            )}
          </div>
        )}

        {/* Text group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', width: '100%' }}>
          {showCategory && <span style={categoryStyle}>{category}</span>}
          {showTitle && <span style={titleStyle}>{title}</span>}
          {showSubtitle && <span style={subtitleStyle}>{subtitle}</span>}
        </div>

        {/* Right asset — positioned absolute top-right */}
        {rightAsset && (
          <div className="flex items-center" style={{ position: 'absolute', top: 0, right: 0, width: s.assetSize, height: s.assetSize }}>
            {rightIcon || (
              <div style={{ width: s.assetSize, height: s.assetSize, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-subtle)', overflow: 'hidden' }} />
            )}
          </div>
        )}
      </div>

      {/* Slot area */}
      {showSlot && (
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {slot || (
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed #8000F0',
                backgroundColor: '#F7F0FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--font-size-xs)',
                color: '#8000F0',
                fontFamily: 'var(--font-family-base)',
              }}
            >
              CustomSlot
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {action === 'button' && (
        <div style={{ width: '100%' }}>
          <Button label={buttonLabel} style="primary" size={btnSize} className="w-full" />
        </div>
      )}

      {action === '2buttons' && (
        <div style={{ display: 'flex', gap: 'var(--spacing-02)', width: '100%' }}>
          <Button label={buttonLabel} style="primary" size={btnSize} className="flex-1" />
          <Button label={buttonLabel2} style="primary" size={btnSize} className="flex-1" />
        </div>
      )}

      {action === 'link' && (
        <button type="button" style={linkStyle}>
          {linkLabel}
        </button>
      )}

      {action === '2links' && (
        <div className="flex items-center" style={{ gap: s.linkGap }}>
          <button type="button" style={linkStyle}>{linkLabel}</button>
          {/* Vertical divider */}
          <div style={{ width: 0, height: s.dividerH, borderLeft: '1px solid var(--color-stroke)' }} />
          <button type="button" style={linkStyle}>{linkLabel2}</button>
        </div>
      )}
    </div>
  )
}
