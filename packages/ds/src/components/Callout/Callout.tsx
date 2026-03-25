import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type CalloutStatus = 'Alert' | 'Information' | 'Warning' | 'Highlight'

export interface CalloutProps {
  status?: CalloutStatus
  title?: string
  description?: string
  showLink?: boolean
  linkLabel?: string
  showClose?: boolean
  highlightIcon?: string
  width?: string | number
  onChange?: (key: string, val: unknown) => void
}

const STATUS_CONFIG: Record<CalloutStatus, { bg: string; icon: string }> = {
  Alert:       { bg: 'var(--color-red-00)',     icon: 'alarm-light' },
  Information: { bg: 'var(--color-blue-00)',    icon: 'information-outline' },
  Warning:     { bg: 'var(--color-orange-00)',  icon: 'alert-outline' },
  Highlight:   { bg: 'var(--color-magenta-00)', icon: 'asterisk' },
}

const font: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  margin: 0,
  lineHeight: 'var(--line-height-title)',
  letterSpacing: 0,
}

function editable(enabled: boolean, onBlur: (t: string) => void): React.HTMLAttributes<HTMLElement> {
  if (!enabled) return {}
  return {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e) => onBlur((e.currentTarget as HTMLElement).textContent ?? ''),
    onKeyDown: (e) => { if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() } },
  }
}

export function Callout({
  status = 'Alert',
  title = 'Título',
  description = 'Dê preferência para descrições de até 2 linhas.',
  showLink = false,
  linkLabel = 'Link label',
  showClose = false,
  highlightIcon = 'asterisk',
  width = 327,
  onChange,
}: CalloutProps) {
  const { bg, icon } = STATUS_CONFIG[status]
  const activeIcon = status === 'Highlight' ? (highlightIcon || 'asterisk') : icon
  const isEditable = !!onChange

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-01)',
      width,
      borderRadius: 'var(--radius-lg)',
      backgroundColor: bg,
      paddingTop: 'var(--spacing-04)',
      paddingBottom: showLink ? 'var(--spacing-02)' : 'var(--spacing-04)',
      paddingLeft: 'var(--spacing-04)',
      paddingRight: 'var(--spacing-04)',
      boxSizing: 'border-box',
    }}>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>

        {/* Header: icon + title + optional close */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-06)', height: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)', flex: '1 0 0', minWidth: 0 }}>
            <div style={{ flexShrink: 0 }}>
              <Icon name={activeIcon} size={24} color="var(--color-content-primary)" />
            </div>
            <p
              {...editable(isEditable, (t) => onChange?.('title', t))}
              style={{
                ...font,
                fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-content-primary)',
                flex: '1 0 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                outline: 'none',
              }}
            >
              {title}
            </p>
          </div>
          {showClose && (
            <div style={{ flexShrink: 0, cursor: 'pointer' }}>
              <Icon name="close" size={16} color="var(--color-content-primary)" />
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ paddingLeft: 'var(--spacing-08)' }}>
          <p
            {...editable(isEditable, (t) => onChange?.('description', t))}
            style={{
              ...font,
              fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-content-secondary)',
              whiteSpace: 'pre-wrap',
              outline: 'none',
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Link */}
      {showLink && (
        <div style={{ paddingLeft: 'var(--spacing-08)' }}>
          <p
            {...editable(isEditable, (t) => onChange?.('linkLabel', t))}
            style={{
              ...font,
              fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
              fontSize: 'var(--font-size-sm)',
              letterSpacing: '0.5px',
              color: 'var(--color-brand)',
              paddingTop: 'var(--spacing-02)',
              paddingBottom: 'var(--spacing-02)',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {linkLabel}
          </p>
        </div>
      )}
    </div>
  )
}
