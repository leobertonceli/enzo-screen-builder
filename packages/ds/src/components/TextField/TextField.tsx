import { type CSSProperties, useState, useEffect } from 'react'
import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

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
  /** Playground inline-editing callback — do not use in screens */
  onChange?: (key: string, val: unknown) => void
  /** Interactive mode: real input, self-managed focus/filled state */
  onValueChange?: (value: string) => void
  /** Called when the field gains focus (interactive mode only) */
  onFocusChange?: (focused: boolean) => void
}

let tfKeyframesInjected = false
function injectTFKeyframes() {
  if (tfKeyframesInjected) return
  tfKeyframesInjected = true
  const style = document.createElement('style')
  style.textContent = `
    @keyframes tf-blink        { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
    @keyframes tf-label-float  { from { opacity: 0; transform: translateY(6px);  } to { opacity: 1; transform: translateY(0); } }
    @keyframes tf-placeholder  { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes tf-value-in     { from { opacity: 0; } to { opacity: 1; } }
  `
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
  variant: variantProp = 'Idle',
  hasError = false,
  label = 'Label',
  value: valueProp = '',
  helperText,
  counter,
  leftIcon,
  rightIcon,
  width = 327,
  onChange,
  onValueChange,
  onFocusChange,
}: TextFieldProps) {
  injectTFKeyframes()

  // ── Interactive mode state ──
  const [internalValue, setInternalValue] = useState(valueProp)
  const [focused, setFocused] = useState(false)

  // Sync internalValue when parent changes value prop (e.g. controls switching to Filled)
  // Only when not focused so we don't override the user's typing
  useEffect(() => {
    if (!focused) {
      setInternalValue(valueProp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueProp])

  const isInteractive = !!onValueChange
  const currentValue = isInteractive ? internalValue : valueProp

  // Derive variant automatically in interactive mode
  const variant: TextFieldVariant = isInteractive
    ? variantProp === 'Disable'
      ? 'Disable'
      : focused
      ? 'Focus'
      : currentValue
      ? 'Filled'
      : 'Idle'
    : variantProp

  const isDisable = variant === 'Disable'
  const isError = hasError && !isDisable
  const isFocus = variant === 'Focus'
  const isFloating = variant === 'Focus' || variant === 'Filled'
  const editable = !!onChange && !isInteractive

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
      <div
        style={{
          position: 'relative',
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
          transition: 'border-color 0.4s ease',
          backgroundColor: bg,
          boxSizing: 'border-box',
          cursor: isDisable ? 'not-allowed' : 'text',
        }}
        onClick={() => {
          if (isInteractive && !isDisable) {
            const input = (document.activeElement as HTMLElement)
            if (input?.tagName !== 'INPUT') {
              const container = document.querySelector(`[data-tf-id="${label}"]`) as HTMLInputElement
              container?.focus()
            }
          }
        }}
      >
        {leftIcon && (
          <div style={{ flexShrink: 0, zIndex: 1, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.4s ease' }}>
            <Icon name={leftIcon} size={ICON_SIZE.md} color={iconColor} />
          </div>
        )}

        {/* Text content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: '1 0 0', minWidth: 0, zIndex: 1, pointerEvents: isInteractive ? 'none' : undefined }}>
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
                animation: 'tf-label-float 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
                ...(editable ? { outline: 'none', cursor: 'text', minWidth: 4 } : {}),
              }}
            >
              {label}
            </p>
          )}

          {/* Value / caret row */}
          {isFloating ? (
            isFocus ? (
              /* Focus: real cursor is in the <input> overlay.
                 Show currentValue in the span so typed text is visible.
                 Empty = &nbsp; (transparent) to keep layout height for label. */
              isInteractive ? (
                <span style={{
                  ...font,
                  fontSize: 'var(--font-size-sm)',
                  color: currentValue ? valueColor : 'transparent',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  animation: 'tf-value-in 350ms ease-out both',
                }}>{currentValue || '\u00A0'}</span>
              ) : (
                <span style={{
                  ...font,
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-brand)',
                  animation: 'tf-blink 1s step-start infinite',
                }}>|</span>
              )
            ) : (
              /* Filled: value text */
              <p
                {...editableProps(editable, (t) => onChange?.('value', t))}
                style={{
                  ...font,
                  fontSize: 'var(--font-size-sm)',
                  color: valueColor,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  animation: 'tf-value-in 350ms ease-out both',
                  ...(editable ? { outline: 'none', cursor: 'text', minWidth: 4 } : {}),
                }}
              >
                {currentValue}
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
                animation: 'tf-placeholder 380ms cubic-bezier(0.16, 1, 0.3, 1) both',
                ...(editable ? { outline: 'none', cursor: 'text', minWidth: 4 } : {}),
              }}
            >
              {label}
            </p>
          )}
        </div>

        {rightIcon && (
          <div style={{ flexShrink: 0, zIndex: 1, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.4s ease' }}>
            <Icon name={rightIcon} size={ICON_SIZE.md} color={iconColor} />
          </div>
        )}

        {/* ── Real <input> for interactive mode ── */}
        {isInteractive && (
          <input
            data-tf-id={label}
            value={currentValue}
            disabled={isDisable}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(e) => {
              const v = e.target.value
              setInternalValue(v)
              onValueChange(v)
            }}
            onFocus={() => { setFocused(true); onFocusChange?.(true) }}
            onBlur={() => { setFocused(false); onFocusChange?.(false) }}
            style={{
              // Position the input so its TOP edge is exactly at the value row
              // instead of relying on paddingTop (which causes cursor baseline misalignment)
              position: 'absolute',
              top: isFloating ? 33 : 25,  // aligns with value row center
              left: 0,
              right: 0,
              height: 17,                  // matches the 14px text at line-height 1.24 ≈ 17px
              color: 'transparent',
              caretColor: 'var(--color-brand)',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              appearance: 'none',
              WebkitAppearance: 'none',
              WebkitBoxShadow: '0 0 0px 1000px transparent inset',
              cursor: isDisable ? 'not-allowed' : 'text',
              zIndex: 2,
              fontSize: 'var(--font-size-sm)',
              fontFamily: 'var(--font-family-base)',
              lineHeight: 'var(--line-height-title)',
              padding: 0,
              paddingLeft: leftIcon ? 48 : 20,
              paddingRight: rightIcon ? 48 : 20,
              margin: 0,
              boxSizing: 'border-box',
            }}
          />
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
