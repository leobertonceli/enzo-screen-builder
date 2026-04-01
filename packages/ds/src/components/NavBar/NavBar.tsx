import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

export type NavBarType = 'page' | 'modal'

export interface NavBarProps {
  type?: NavBarType
  // title & description — both types
  showTitle?: boolean
  title?: string
  showDescription?: boolean
  description?: string
  // page only
  iconLeft?: boolean
  // both types
  rightIcons?: 0 | 1 | 2
  rightIcon1?: string
  rightIcon2?: string
  rightIcon1Size?: number
  rightIcon2Size?: number
  // callbacks
  onBack?: () => void
  onRightIcon1?: () => void
  onRightIcon2?: () => void
  /** Playground inline-editing callback */
  onChange?: (key: string, val: unknown) => void
}

const iconButtonStyle: CSSProperties = {
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
}

const truncate: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

// Shared title/description styles — identical across page and modal
const titleStyle: CSSProperties = {
  ...truncate,
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-content-primary)',
  lineHeight: 'var(--line-height-title-sm)',
}

const descriptionStyle: CSSProperties = {
  ...truncate,
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-content-secondary)',
  lineHeight: 'var(--line-height-title-sm)',
}

function RightIcons({
  count,
  icon1,
  icon2,
  icon1Size = ICON_SIZE.lg,
  icon2Size = ICON_SIZE.lg,
  onIcon1,
  onIcon2,
}: {
  count: 0 | 1 | 2
  icon1: string
  icon2: string
  icon1Size?: number
  icon2Size?: number
  onIcon1?: () => void
  onIcon2?: () => void
}) {
  if (count === 0) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
      {count >= 1 && (
        <button style={iconButtonStyle} onClick={onIcon1} aria-label="Ação 1">
          <Icon name={icon1} size={icon1Size} color="var(--color-content-primary)" />
        </button>
      )}
      {count === 2 && (
        <button style={iconButtonStyle} onClick={onIcon2} aria-label="Ação 2">
          <Icon name={icon2} size={icon2Size} color="var(--color-content-primary)" />
        </button>
      )}
    </div>
  )
}

function editable(
  onChange: ((key: string, val: unknown) => void) | undefined,
  key: string,
): React.HTMLAttributes<HTMLElement> {
  if (!onChange) return {}
  return {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e) => onChange(key, (e.currentTarget as HTMLElement).textContent ?? ''),
    onKeyDown: (e) => {
      if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() }
    },
    style: { outline: 'none', cursor: 'text' },
  }
}

export function NavBar({
  type = 'page',
  showTitle = true,
  title = 'Título',
  showDescription = false,
  description = 'Descrição',
  iconLeft = true,
  rightIcons = 0,
  rightIcon1 = 'menuKebab',
  rightIcon2 = 'shareAndroid',
  rightIcon1Size = ICON_SIZE.lg,
  rightIcon2Size = ICON_SIZE.lg,
  onBack,
  onRightIcon1,
  onRightIcon2,
  onChange,
}: NavBarProps) {
  const hasDesc = showTitle && showDescription && !!description
  const contentHeight = hasDesc ? 72 : 60

  // ── PAGE type ──────────────────────────────────────────────────────────────
  if (type === 'page') {
    return (
      <div style={{ width: 375, background: 'var(--color-surface)', fontFamily: 'var(--font-family-base)' }}>
        <div style={{
          height: contentHeight,
          display: 'flex',
          alignItems: 'center',
          paddingRight: 'var(--spacing-04)',
          position: 'relative',
          background: 'var(--color-surface)',
        }}>
          {/* Left — back icon or spacer */}
          {iconLeft ? (
            <div style={{ paddingLeft: 'var(--spacing-04)', flexShrink: 0 }}>
              <button style={iconButtonStyle} onClick={onBack} aria-label="Voltar">
                <Icon name="chevronArrowLeft" size={ICON_SIZE.lg} color="var(--color-content-primary)" />
              </button>
            </div>
          ) : (
            <div style={{ width: 'var(--spacing-06)', flexShrink: 0 }} />
          )}

          {/* Center — absolutely positioned */}
          {showTitle && title && (
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 200,
              pointerEvents: 'none',
            }}>
              <span {...editable(onChange, 'title')} style={titleStyle}>
                {title}
              </span>
              {hasDesc && (
                <span {...editable(onChange, 'description')} style={descriptionStyle}>
                  {description}
                </span>
              )}
            </div>
          )}

          {/* Right icons */}
          <div style={{ marginLeft: 'auto' }}>
            <RightIcons
              count={rightIcons}
              icon1={rightIcon1}
              icon2={rightIcon2}
              icon1Size={rightIcon1Size}
              icon2Size={rightIcon2Size}
              onIcon1={onRightIcon1}
              onIcon2={onRightIcon2}
            />
          </div>
        </div>
      </div>
    )
  }

  // ── MODAL type ─────────────────────────────────────────────────────────────
  return (
    <div style={{ width: 375, background: 'var(--color-surface)', fontFamily: 'var(--font-family-base)' }}>
      <div style={{
        height: contentHeight,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'var(--spacing-06)',
        paddingRight: 'var(--spacing-04)',
        background: 'var(--color-surface)',
        gap: 'var(--spacing-03)',
      }}>
        {/* Left — title + description, left-aligned */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {showTitle && title && (
            <span {...editable(onChange, 'title')} style={titleStyle}>
              {title}
            </span>
          )}
          {hasDesc && (
            <span {...editable(onChange, 'description')} style={descriptionStyle}>
              {description}
            </span>
          )}
        </div>

        {/* Right icons */}
        <RightIcons
          count={rightIcons}
          icon1={rightIcon1}
          icon2={rightIcon2}
          onIcon1={onRightIcon1}
          onIcon2={onRightIcon2}
        />
      </div>
    </div>
  )
}
