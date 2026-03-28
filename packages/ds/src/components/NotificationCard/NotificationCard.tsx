import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type NotificationStatus = 'unread' | 'read'
export type NotificationAction = 'none' | 'link' | 'button'

export interface NotificationCardProps {
  status?: NotificationStatus
  action?: NotificationAction
  message?: string
  time?: string
  linkLabel?: string
  buttonLabel?: string
  onLink?: () => void
  onButton?: () => void
  className?: string
}

export function NotificationCard({
  status = 'unread',
  action = 'none',
  message = 'O mundo ideal é buscar um texto que tenha no máximo 3 linhas.',
  time = '59min',
  linkLabel = 'Ver mais',
  buttonLabel = 'Confirmar',
  onLink,
  onButton,
  className,
}: NotificationCardProps) {
  const isUnread = status === 'unread'

  const rootStyle: CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--color-surface)',
    padding: 'var(--spacing-06)',
    display: 'flex',
    flexDirection: 'column',
    gap: action !== 'none' ? 'var(--spacing-03)' : undefined,
  }

  /* ── Avatar ── */
  const avatarStyle: CSSProperties = {
    width: 48,
    height: 48,
    flexShrink: 0,
    backgroundColor: 'var(--color-surface-subtle)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  /* ── Content row ── */
  const contentRowStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  }

  /* ── Message style ── */
  const messageStyle: CSSProperties = {
    flex: 1,
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-content-primary)',
    lineHeight: 'var(--line-height-para-lg)',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as CSSProperties['WebkitBoxOrient'],
  }

  /* ── Status column ── */
  const statusColStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-end',
    flexShrink: 0,
  }

  const dotStyle: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'var(--color-brand)',
  }

  const timeStyle: CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-regular)',
    color: 'var(--color-content-tertiary)',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  }

  /* ── Action area offset (pl-60 = avatar 48px + gap 12px) ── */
  const actionAreaStyle: CSSProperties = {
    paddingLeft: 60,
  }

  /* ── Divider ── */
  const dividerStyle: CSSProperties = {
    width: '100%',
    height: 1,
    backgroundColor: 'var(--color-stroke)',
    marginTop: action !== 'none' ? 'var(--spacing-03)' : 0,
  }

  return (
    <div className={className} style={rootStyle}>
      {/* Content row */}
      <div style={contentRowStyle}>
        {/* Avatar */}
        <div style={avatarStyle}>
          <Icon name="account-outline" size={24} color="var(--color-content-secondary)" />
        </div>

        {/* Message */}
        <span style={messageStyle}>{message}</span>

        {/* Status column */}
        <div style={statusColStyle}>
          {isUnread && <div style={dotStyle} />}
          <span style={timeStyle}>{time}</span>
        </div>
      </div>

      {/* Action area */}
      {action === 'link' && (
        <div style={actionAreaStyle}>
          <button
            type="button"
            onClick={onLink}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--spacing-01)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: 'var(--color-brand)',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {linkLabel}
            <Icon name="chevron-right" size={16} color="currentColor" />
          </button>
        </div>
      )}

      {action === 'button' && (
        <div style={actionAreaStyle}>
          <button
            type="button"
            onClick={onButton}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 12,
              paddingBottom: 12,
              paddingLeft: 'var(--spacing-04)',
              paddingRight: 'var(--spacing-04)',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'var(--color-brand)',
              color: 'var(--color-gray-white)',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
            }}
          >
            {buttonLabel}
          </button>
        </div>
      )}

      {/* Divider */}
      <div style={dividerStyle} />
    </div>
  )
}
