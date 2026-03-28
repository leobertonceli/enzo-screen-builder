import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type AppBarType = 'home' | 'section' | 'brand' | 'search' | 'ia'

export interface AppBarProps {
  type?: AppBarType
  title?: string
  subtitle?: string
  userName?: string
  showRightIcons?: boolean
  showProgressBar?: boolean
  onBack?: () => void
  onAction1?: () => void
  onAction2?: () => void
  className?: string
}

const statusBarStyle: CSSProperties = {
  height: 44,
  background: 'var(--color-surface)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: 'var(--spacing-04)',
  paddingRight: 'var(--spacing-04)',
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-medium)',
  color: 'var(--color-content-primary)',
}

const contentAreaStyle: CSSProperties = {
  height: 60,
  display: 'flex',
  alignItems: 'center',
  paddingLeft: 'var(--spacing-04)',
  paddingRight: 'var(--spacing-04)',
  position: 'relative',
  background: 'var(--color-surface)',
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

function RightIcons({ onAction1, onAction2 }: { onAction1?: () => void; onAction2?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-01)', marginLeft: 'auto', flexShrink: 0 }}>
      <button style={iconButtonStyle} onClick={onAction1} aria-label="Archive">
        <Icon name="archive-outline" size={24} color="var(--color-content-primary)" />
      </button>
      <button style={iconButtonStyle} onClick={onAction2} aria-label="Folder">
        <Icon name="folder-outline" size={24} color="var(--color-content-primary)" />
      </button>
    </div>
  )
}

function StatusBar() {
  return (
    <div style={statusBarStyle}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-01)' }}>
        <Icon name="signal-cellular-3" size={16} color="var(--color-content-primary)" />
        <Icon name="wifi" size={16} color="var(--color-content-primary)" />
        <Icon name="battery" size={16} color="var(--color-content-primary)" />
      </div>
    </div>
  )
}

export function AppBar({
  type = 'home',
  title = 'Alice Agora',
  subtitle,
  userName = 'Leonardo',
  showRightIcons = true,
  showProgressBar = false,
  onBack,
  onAction1,
  onAction2,
  className,
}: AppBarProps) {
  const containerStyle: CSSProperties = {
    width: 375,
    background: 'var(--color-surface)',
    fontFamily: 'var(--font-family-base)',
    position: 'relative',
  }

  const renderContent = () => {
    if (type === 'home') {
      return (
        <div style={contentAreaStyle}>
          {/* Avatar + greeting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-03)' }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-xs)',
              background: 'var(--color-gray-00)',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
            }}>
              Oi, {userName}
            </span>
          </div>
          {showRightIcons && <RightIcons onAction1={onAction1} onAction2={onAction2} />}
        </div>
      )
    }

    if (type === 'section') {
      return (
        <div style={contentAreaStyle}>
          <button style={iconButtonStyle} onClick={onBack} aria-label="Back">
            <Icon name="chevron-left" size={24} color="var(--color-content-primary)" />
          </button>
          {/* Center title */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              lineHeight: 'var(--line-height-label)',
            }}>
              {title}
            </span>
            {subtitle && (
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-tertiary)',
                lineHeight: 'var(--line-height-label)',
              }}>
                {subtitle}
              </span>
            )}
          </div>
          {showRightIcons && <RightIcons onAction1={onAction1} onAction2={onAction2} />}
        </div>
      )
    }

    if (type === 'brand') {
      return (
        <div style={{ position: 'relative' }}>
          <div style={contentAreaStyle}>
            <button style={iconButtonStyle} onClick={onBack} aria-label="Menu">
              <Icon name="menu" size={24} color="var(--color-content-primary)" />
            </button>
            {/* Center logo */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-content-primary)',
              }}>
                {title || 'alice'}
              </span>
            </div>
            {showRightIcons && <RightIcons onAction1={onAction1} onAction2={onAction2} />}
          </div>
          {showProgressBar && (
            <div style={{
              height: 2,
              width: '100%',
              background: 'var(--color-surface-subtle)',
              position: 'relative',
            }}>
              <div style={{
                height: '100%',
                width: '17%',
                background: 'var(--color-brand)',
              }} />
            </div>
          )}
        </div>
      )
    }

    if (type === 'search') {
      return (
        <div style={contentAreaStyle}>
          <button style={iconButtonStyle} onClick={onBack} aria-label="Back">
            <Icon name="chevron-left" size={24} color="var(--color-content-primary)" />
          </button>
          {/* Search input */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-02)',
            border: `1px solid var(--color-stroke)`,
            borderRadius: 'var(--radius-sm)',
            padding: '0 var(--spacing-03)',
            height: 40,
            background: 'var(--color-surface)',
            marginRight: 'var(--spacing-02)',
          }}>
            <Icon name="magnify" size={20} color="var(--color-content-secondary)" />
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-tertiary)',
            }}>
              {title || 'Buscar...'}
            </span>
          </div>
          {showRightIcons && <RightIcons onAction1={onAction1} onAction2={onAction2} />}
        </div>
      )
    }

    if (type === 'ia') {
      return (
        <div style={{ position: 'relative' }}>
          <div style={contentAreaStyle}>
            <button style={iconButtonStyle} onClick={onBack} aria-label="Back">
              <Icon name="chevron-left" size={24} color="var(--color-content-primary)" />
            </button>
            {/* AI circle placeholder */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-pill)',
              background: 'var(--color-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="auto-fix" size={24} color="var(--color-gray-white)" />
            </div>
            {showRightIcons && <RightIcons onAction1={onAction1} onAction2={onAction2} />}
          </div>
          {showProgressBar && (
            <div style={{
              height: 2,
              width: '100%',
              background: 'var(--color-surface-subtle)',
              position: 'relative',
            }}>
              <div style={{
                height: '100%',
                width: '17%',
                background: 'var(--color-brand)',
              }} />
            </div>
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div style={containerStyle} className={className}>
      <StatusBar />
      {renderContent()}
    </div>
  )
}
