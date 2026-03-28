import type { CSSProperties } from 'react'

export type TextAreaState = 'idle-empty' | 'idle-populated' | 'focus' | 'error' | 'disabled'

export interface TextAreaProps {
  state?: TextAreaState
  helper?: boolean
  helperText?: string
  placeholder?: string
  value?: string
  maxLength?: number
  onChange?: (value: string) => void
  className?: string
}

let caretKeyframesInjected = false
function injectCaretKeyframes() {
  if (caretKeyframesInjected) return
  caretKeyframesInjected = true
  const style = document.createElement('style')
  style.textContent = `@keyframes ta-blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`
  document.head.appendChild(style)
}

const font: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  fontSize: 'var(--font-size-sm)',
  margin: 0,
  lineHeight: 1.5,
}

export function TextArea({
  state = 'idle-empty',
  helper = true,
  helperText = 'Helper text',
  placeholder = 'Placeholder',
  value = 'Text value',
  maxLength = 200,
}: TextAreaProps) {
  injectCaretKeyframes()

  const isDisabled = state === 'disabled'
  const isFocus = state === 'focus'
  const isError = state === 'error'
  const isPopulated = state === 'idle-populated'

  // Border color by state
  const borderColor = isError
    ? 'var(--color-error)'
    : isFocus
    ? 'var(--color-content-primary)'
    : 'var(--color-stroke)'

  // Background by state
  const bg = isDisabled ? 'var(--color-surface-subtle)' : 'var(--color-surface)'

  // Text color for main content
  const textColor = isError
    ? 'var(--color-error)'
    : isDisabled
    ? 'var(--color-content-disabled)'
    : isPopulated
    ? 'var(--color-content-primary)'
    : 'var(--color-content-placeholder)'

  // Helper / counter color
  const helperColor = isError ? 'var(--color-error)' : 'var(--color-content-secondary)'

  // Char count display
  const charCount = isPopulated ? value.length : 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)', width: 327, boxSizing: 'border-box' }}>

      {/* TextArea box */}
      <div style={{
        minHeight: 120,
        padding: 'var(--spacing-06)',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${borderColor}`,
        backgroundColor: bg,
        boxSizing: 'border-box',
        cursor: isDisabled ? 'not-allowed' : 'text',
        display: 'flex',
        alignItems: 'flex-start',
      }}>
        {isFocus ? (
          /* Focus state: blinking caret + placeholder */
          <p style={{ ...font, color: 'var(--color-content-placeholder)' }}>
            <span style={{
              color: 'var(--color-brand)',
              animation: 'ta-blink 1s step-start infinite',
              marginRight: 1,
            }}>|</span>
            {placeholder}
          </p>
        ) : isPopulated ? (
          /* Populated: show value text */
          <p style={{ ...font, color: textColor }}>{value}</p>
        ) : isDisabled ? (
          /* Disabled: show disabled placeholder */
          <p style={{ ...font, color: textColor }}>{placeholder}</p>
        ) : isError ? (
          /* Error: show value in error color */
          <p style={{ ...font, color: textColor }}>{value}</p>
        ) : (
          /* idle-empty: placeholder */
          <p style={{ ...font, color: textColor }}>{placeholder}</p>
        )}
      </div>

      {/* Helper row */}
      {helper && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-05)',
          paddingLeft: 'var(--spacing-02)',
          paddingRight: 'var(--spacing-02)',
        }}>
          <p style={{
            ...font,
            fontSize: 'var(--font-size-xs)',
            color: helperColor,
            flex: '1 0 0',
            whiteSpace: 'normal',
          }}>
            {helperText}
          </p>
          <p style={{
            ...font,
            fontSize: 'var(--font-size-xs)',
            color: helperColor,
            flexShrink: 0,
            textAlign: 'right',
          }}>
            {charCount}/{maxLength}
          </p>
        </div>
      )}
    </div>
  )
}
