import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

export type CheckboxState = 'unselected' | 'selected' | 'indeterminate'

export interface CheckboxProps {
  state?: CheckboxState
  disabled?: boolean
  onChange?: () => void
  className?: string
}

export function Checkbox({ state = 'unselected', disabled = false, onChange, className }: CheckboxProps) {
  const isSelected = state === 'selected'
  const isIndeterminate = state === 'indeterminate'
  const isChecked = isSelected || isIndeterminate

  const bgColor = isChecked
    ? (disabled ? 'var(--color-gray-20)' : 'var(--color-brand)')
    : 'transparent'

  const borderColor = isChecked
    ? 'transparent'
    : (disabled ? 'var(--color-gray-20)' : 'var(--color-gray-40)')

  return (
    <div
      className={className}
      onClick={!disabled ? onChange : undefined}
      style={{
        width: 24,
        height: 24,
        borderRadius: 'var(--radius-xxs)',
        backgroundColor: bgColor,
        border: `2px solid ${borderColor}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        flexShrink: 0,
        transition: 'background-color 0.1s, border-color 0.1s',
        boxSizing: 'border-box',
      }}
    >
      {isSelected && <Icon name="checkOutlined" size={ICON_SIZE.sm} color="var(--color-gray-white)" />}
      {isIndeterminate && (
        <div style={{ width: 12, height: 2, backgroundColor: 'var(--color-gray-white)', borderRadius: 1 }} />
      )}
    </div>
  )
}
