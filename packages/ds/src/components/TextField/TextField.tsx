import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type TextFieldVariant = 'Idle' | 'Focus' | 'Filled' | 'Disable'

export interface TextFieldProps {
  variant?: TextFieldVariant
  hasError?: boolean
  label?: string
  value?: string
  helperText?: string
  counter?: string
  leftIcon?: string
  rightIcon?: string
  width?: string | number
  onChange?: (key: string, val: unknown) => void
}

let caretKeyframesInjected = false
function injectCaretKeyframes() {
  if (caretKeyframesInjected) return
  caretKeyframesInjected = true
  const style = document.createElement('style')
  style.textContent = `@keyframes tf-blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`
  document.head.appendChild(style)
}

const font: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  lineHeight: 'var(--line-height-title)',
  letterSpacing: 0,
  margin: 0,
}

function editableProps(
  enabled: boolean,
  onBlurVal: (text: string) => void,
): React.HTMLAttributes<HTMLElement> {
  if (!enabled) return {}
  return {
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: (e) => onBlurVal((e.currentTarget as HTMLElement).textContent ?? ''),
    onKeyDown: (e) => {
      if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() }
    },
    style: { outline: 'none', cursor: 'text', minWidth: 4 },
  }
}

export function TextField({
  variant = 'Idle',
  hasError = false,
  label = 'Label',
  value = '',
  helperText,
  counter,
  leftIcon,
  rightIcon,
  width = 327,
  onChange,
}: TextFieldProps) {
  injectCaretKeyframes()

  const isDisable = variant === 'Disable'
  const isError = hasError && !isDisable
  const isFocus = variant === 'Focus'
  const isFloating = variant === 'Focus' || variant === 'Filled'
  const editable = !!onChange

  // ── Colors ──
  const borderColor = isError
    ? 'var(--color-red-50)'
    : isFocus
    ? 'var(--color-content-primary)'
    : 'var(--color-stroke)'

  const bg = isDisable ? 'var(--color-gray-10)' : 'var(--color-gray-white)'

  const labelFloatingColor = isError
    ? 'var(--color-red-60)'
    : isDisable
    ? 'var(--color-gray-30)'
    : 'var(--color-gray-70)'

  const labelPlaceholderColor = isDisable ? 'var(--color-gray-30)' : 'var(--color-gray-40)'

  const valueColor = isDisable ? 'var(--color-gray-30)' : 'var(--color-content-primary)'

  const helperColor = isError
    ? 'var(--color-red-60)'
    : isDisable
    ? 'var(--color-gray-30)'
    : 'var(--color-content-secondary)'

  const iconColor = isError
    ? 'var(--color-red-60)'
    : isDisable
    ? 'var(--color-gray-30)'
    : isFloating || isFocus
    ? 'var(--color-content-primary)'
    : 'var(--color-gray-40)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)', width, boxSizing: 'border-box' }}>

      {/* ── Input box ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-03)',
        height: 68,
        paddingLeft: 'var(--spacing-05)',
        paddingRight: 'var(--spacing-05)',
        paddingTop: 'var(--spacing-04)',
        paddingBottom: 'var(--spacing-04)',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${borderColor}`,
        backgroundColor: bg,
        boxSizing: 'border-box',
        cursor: isDisable ? 'not-allowed' : 'text',
      }}>
        {leftIcon && (
          <div style={{ flexShrink: 0 }}>
            <Icon name={leftIcon} size={24} color={iconColor} />
          </div>
        )}

        {/* Text content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: '1 0 0', minWidth: 0 }}>

          {/* Floating label */}
          {isFloating && (
            <p
              {...editableProps(editable, (t) => onChange?.('label', t))}
              style={{
                ...font,
                fontSize: 'var(--font-size-xs)',
                color: labelFloatingColor,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                ...(editable ? { outline: 'none', cursor: 'text', minWidth: 4 } : {}),
              }}
            >
              {label}
            </p>
          )}

          {/* Value / caret row */}
          {isFloating ? (
            isFocus ? (
              /* Focus: only the blinking caret, left-aligned */
              <span style={{
                ...font,
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-brand)',
                animation: 'tf-blink 1s step-start infinite',
              }}>|</span>
            ) : (
              /* Filled: editable value */
              <p
                {...editableProps(editable, (t) => onChange?.('value', t))}
                style={{
                  ...font,
                  fontSize: 'var(--font-size-sm)',
                  color: valueColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  ...(editable ? { outline: 'none', cursor: 'text', minWidth: 4 } : {}),
                }}
              >
                {value}
              </p>
            )
          ) : (
            /* Placeholder label (Idle / Disable) */
            <p
              {...editableProps(editable, (t) => onChange?.('label', t))}
              style={{
                ...font,
                fontSize: 'var(--font-size-sm)',
                color: labelPlaceholderColor,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                ...(editable ? { outline: 'none', cursor: 'text', minWidth: 4 } : {}),
              }}
            >
              {label}
            </p>
          )}
        </div>

        {rightIcon && (
          <div style={{ flexShrink: 0 }}>
            <Icon name={rightIcon} size={24} color={iconColor} />
          </div>
        )}
      </div>

      {/* ── Helper row ── */}
      {(helperText || counter) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-05)',
          paddingLeft: 'var(--spacing-02)',
          paddingRight: 'var(--spacing-02)',
        }}>
          {helperText && (
            <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: helperColor, flex: '1 0 0', whiteSpace: 'normal' }}>
              {helperText}
            </p>
          )}
          {counter && (
            <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: helperColor, flexShrink: 0, textAlign: 'right' }}>
              {counter}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
