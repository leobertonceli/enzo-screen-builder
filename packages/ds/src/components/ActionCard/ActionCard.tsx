import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type ActionCardStatus = 'active' | 'disabled' | 'incomplete' | 'completed'

export interface ActionCardProps {
  status?: ActionCardStatus
  title?: string
  content?: string
  badge?: boolean
  badgeLabel?: string
  showButton?: boolean
  buttonLabel?: string
  onClick?: () => void
  className?: string
}

export function ActionCard({
  status = 'active',
  title = 'Card title',
  content = 'Card content',
  badge = true,
  badgeLabel = 'Badge',
  showButton = true,
  buttonLabel = 'Action',
  onClick,
  className,
}: ActionCardProps) {
  const getBgColor = () => {
    if (status === 'active') return 'var(--color-brand)'
    if (status === 'disabled') return 'var(--color-surface-subtle)'
    if (status === 'incomplete') return 'var(--color-off-magenta-00)'
    if (status === 'completed') return 'var(--color-off-magenta-00)'
    return 'var(--color-brand)'
  }

  const containerStyle: CSSProperties = {
    width: 335,
    padding: 'var(--spacing-06)',
    borderRadius: 'var(--radius-xl)',
    background: getBgColor(),
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-06)',
    fontFamily: 'var(--font-family-base)',
    boxSizing: 'border-box',
  }

  // Active variant
  if (status === 'active') {
    const badgeBg = 'var(--color-black-15)'
    const badgeStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--spacing-01)',
      background: badgeBg,
      borderRadius: 'var(--radius-xs)',
      padding: '4px 8px',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-gray-white)',
      alignSelf: 'flex-start',
    }

    const titleStyle: CSSProperties = {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xl)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-gray-white)',
      margin: 0,
      lineHeight: 'var(--line-height-title)',
    }

    const contentStyle: CSSProperties = {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-regular)',
      color: 'var(--color-gray-white)',
      margin: 0,
    }

    const buttonStyle: CSSProperties = {
      background: 'var(--color-gray-100)',
      color: 'var(--color-gray-white)',
      height: 48,
      width: '100%',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }

    return (
      <div style={containerStyle} className={className}>
        {badge && (
          <div style={badgeStyle}>
            <Icon name="lock-outline" size={16} color="var(--color-gray-white)" />
            {badgeLabel}
          </div>
        )}
        <div>
          <p style={titleStyle}>{title}</p>
          {content && <p style={{ ...contentStyle, marginTop: 'var(--spacing-02)' }}>{content}</p>}
        </div>
        {showButton && (
          <button style={buttonStyle} onClick={onClick}>
            {buttonLabel}
          </button>
        )}
      </div>
    )
  }

  // Disabled variant
  if (status === 'disabled') {
    const badgeBg = 'var(--color-black-10)'
    const badgeStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--spacing-01)',
      background: badgeBg,
      borderRadius: 'var(--radius-xs)',
      padding: '4px 8px',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-content-secondary)',
      alignSelf: 'flex-start',
    }

    const titleStyle: CSSProperties = {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-content-secondary)',
      margin: 0,
    }

    const contentStyle: CSSProperties = {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-regular)',
      color: 'var(--color-content-secondary)',
      margin: 0,
    }

    return (
      <div style={containerStyle} className={className}>
        {badge && (
          <div style={badgeStyle}>
            <Icon name="lock-outline" size={16} color="var(--color-content-secondary)" />
            {badgeLabel}
          </div>
        )}
        <div>
          <p style={titleStyle}>{title}</p>
          {content && <p style={{ ...contentStyle, marginTop: 'var(--spacing-02)' }}>{content}</p>}
        </div>
      </div>
    )
  }

  // Incomplete variant
  if (status === 'incomplete') {
    const badgeBg = 'var(--color-black-10)'
    const badgeStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--spacing-01)',
      background: badgeBg,
      borderRadius: 'var(--radius-xs)',
      padding: '4px 8px',
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-content-primary)',
      alignSelf: 'flex-start',
    }

    const titleStyle: CSSProperties = {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-content-primary)',
      margin: 0,
    }

    const contentStyle: CSSProperties = {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-regular)',
      color: 'var(--color-content-primary)',
      margin: 0,
    }

    return (
      <div style={containerStyle} className={className}>
        {badge && (
          <div style={badgeStyle}>
            <Icon name="lock-outline" size={16} color="var(--color-content-primary)" />
            {badgeLabel}
          </div>
        )}
        <div>
          <p style={titleStyle}>{title}</p>
          {content && <p style={{ ...contentStyle, marginTop: 'var(--spacing-02)' }}>{content}</p>}
        </div>
      </div>
    )
  }

  // Completed variant — row layout
  const completedContainerStyle: CSSProperties = {
    ...containerStyle,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 'var(--spacing-03)',
    padding: 'var(--spacing-04) var(--spacing-06)',
  }

  const completedTitleStyle: CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-content-primary)',
    margin: 0,
  }

  return (
    <div style={completedContainerStyle} className={className}>
      <Icon name="check-circle-outline" size={24} color="var(--color-brand)" />
      <p style={completedTitleStyle}>{title}</p>
    </div>
  )
}
