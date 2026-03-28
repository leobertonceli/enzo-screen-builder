import { Icon } from '../../icons/Icon'

export type SnackbarVariant = 'neutral' | 'success' | 'warning' | 'error'

export interface SnackbarProps {
  variant?: SnackbarVariant
  text?: string
  action?: boolean
  actionText?: string
  onAction?: () => void
  className?: string
}

const variantConfig = {
  neutral: { color: '#8F8F8F', iconName: null },
  success: { color: '#00B518', iconName: 'check-circle' },
  warning: { color: '#FBC800', iconName: 'alert-circle' },
  error:   { color: '#F54775', iconName: 'alert-circle' },
} as const

export function Snackbar({ variant = 'neutral', text = 'Snackbar label', action = false, actionText = 'Action', onAction, className }: SnackbarProps) {
  const { color, iconName } = variantConfig[variant]

  return (
    <div className={className} style={{ width: '100%' }}>
      <div style={{
        position: 'relative',
        backgroundColor: 'var(--color-dark-surface)',
        borderRadius: 'var(--radius-xs)',
        padding: 'var(--spacing-04)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-03)',
        overflow: 'hidden',
        paddingBottom: 'calc(var(--spacing-04) + 4px)',
      }}>
        {iconName && (
          <div style={{ flexShrink: 0 }}>
            <Icon name={iconName} size={24} color={color} />
          </div>
        )}

        <p style={{
          flex: 1,
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-md)',
          fontWeight: 'var(--font-weight-regular)',
          lineHeight: 'var(--line-height-title)',
          color: 'var(--color-gray-white)',
          margin: 0,
        }}>{text}</p>

        {action && (
          <button onClick={onAction} style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-medium)',
            letterSpacing: 'var(--letter-spacing-button)',
            color: 'var(--color-gray-white)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            whiteSpace: 'nowrap',
            lineHeight: 'var(--line-height-title)',
          }}>{actionText}</button>
        )}

        {/* Timer bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: color }} />
      </div>
    </div>
  )
}
