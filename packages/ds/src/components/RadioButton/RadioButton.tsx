import { Icon } from '../../icons/Icon'

export interface RadioButtonProps {
  selected?: boolean
  disabled?: boolean
  label?: string
  description?: string
  onChange?: () => void
  className?: string
}

export function RadioButton({ selected = false, disabled = false, label, description, onChange, className }: RadioButtonProps) {
  const contentColor = disabled ? 'var(--color-gray-30)' : 'var(--color-content-primary)'
  const iconColor = disabled ? 'var(--color-gray-30)' : selected ? 'var(--color-brand)' : 'var(--color-gray-40)'
  const iconName = selected ? 'radiobox-marked' : 'radiobox-blank'

  return (
    <div
      className={className}
      onClick={!disabled ? onChange : undefined}
      style={{ display: 'flex', gap: 'var(--spacing-04)', alignItems: 'flex-start', cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        <Icon name={iconName} size={24} color={iconColor} />
      </div>
      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', flex: 1 }}>
          {label && (
            <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-medium)', lineHeight: 'var(--line-height-title)', color: contentColor, margin: 0 }}>
              {label}
            </p>
          )}
          {description && (
            <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-regular)', lineHeight: 'var(--line-height-title)', color: contentColor, margin: 0 }}>
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
