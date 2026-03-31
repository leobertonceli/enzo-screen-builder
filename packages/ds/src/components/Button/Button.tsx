import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../icons/Icon'

export type ButtonStyle = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonState = 'enabled' | 'pressed' | 'disabled' | 'loading'
export type ButtonType = 'text' | 'left-icon' | 'right-icon' | 'only-icon'

export interface ButtonProps {
  label?: string
  style?: ButtonStyle
  size?: ButtonSize
  state?: ButtonState
  type?: ButtonType
  darkMode?: boolean
  iconElement?: ReactNode
  onClick?: () => void
  className?: string
  htmlType?: 'button' | 'submit' | 'reset'
}

const ChevronLeft = () => <Icon name="chevronArrowLeft" size={20} color="currentColor" />
const ChevronRight = () => <Icon name="chevronArrowRight" size={20} color="currentColor" />
const PlusIcon = () => <Icon name="add" size={20} color="currentColor" />

const Spinner = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-spin">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
    <path d="M10 2A8 8 0 0 1 18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

/* ── Color matrix: darkMode × style × state ─────────────────────── */
type ColorEntry = { bg: string; color: string; border?: string }

const colorMap: Record<'light' | 'dark', Record<ButtonStyle, Record<'enabled' | 'pressed' | 'disabled', ColorEntry>>> = {
  light: {
    primary: {
      enabled:  { bg: 'var(--color-brand)', color: 'var(--color-gray-white)' },
      pressed:  { bg: 'var(--color-brand-pressed)', color: 'var(--color-gray-white)' },
      disabled: { bg: 'var(--color-black-05)', color: 'var(--color-black-20)' },
    },
    secondary: {
      enabled:  { bg: 'transparent', color: 'var(--color-brand)', border: 'var(--color-black-15)' },
      pressed:  { bg: 'transparent', color: 'var(--color-brand-pressed)', border: 'var(--color-black-20)' },
      disabled: { bg: 'transparent', color: 'var(--color-black-20)', border: 'var(--color-black-15)' },
    },
    tertiary: {
      enabled:  { bg: 'transparent', color: 'var(--color-brand)' },
      pressed:  { bg: 'transparent', color: 'var(--color-brand-pressed)' },
      disabled: { bg: 'transparent', color: 'var(--color-black-20)' },
    },
  },
  dark: {
    primary: {
      enabled:  { bg: 'var(--color-gray-white)', color: 'var(--color-content-primary)' },
      pressed:  { bg: 'var(--color-gray-20)', color: 'var(--color-content-primary)' },
      disabled: { bg: 'var(--color-white-05)', color: 'var(--color-white-20)' },
    },
    secondary: {
      enabled:  { bg: 'transparent', color: 'var(--color-gray-white)', border: 'var(--color-white-20)' },
      pressed:  { bg: 'transparent', color: 'var(--color-gray-20)', border: 'var(--color-white-30)' },
      disabled: { bg: 'transparent', color: 'var(--color-white-20)', border: 'var(--color-white-10)' },
    },
    tertiary: {
      enabled:  { bg: 'transparent', color: 'var(--color-gray-white)' },
      pressed:  { bg: 'transparent', color: 'var(--color-gray-20)' },
      disabled: { bg: 'transparent', color: 'var(--color-white-20)' },
    },
  },
}

/* ── Size map ────────────────────────────────────────────────────── */
const sizeMap = {
  small: {
    button: 'h-[40px] px-4 py-3 min-w-[80px]',
    icon:   'h-[40px] w-[40px]',
    radius: 'var(--radius-sm)',
    style:  { fontFamily: 'var(--font-family-base)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)', lineHeight: '1.16', letterSpacing: 'var(--letter-spacing-none)' } satisfies CSSProperties,
  },
  medium: {
    button: 'h-[48px] px-5 py-4 min-w-[96px]',
    icon:   'h-[48px] w-[48px]',
    radius: 'var(--radius-sm)',
    style:  { fontFamily: 'var(--font-family-base)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-sm)', lineHeight: '1.16', letterSpacing: 'var(--letter-spacing-none)' } satisfies CSSProperties,
  },
  large: {
    button: 'h-[56px] px-6 py-4 min-w-[112px]',
    icon:   'h-[56px] w-[56px]',
    radius: 'var(--radius-md)',
    style:  { fontFamily: 'var(--font-family-base)', fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-title)', letterSpacing: 'var(--letter-spacing-none)' } satisfies CSSProperties,
  },
}

export function Button({
  label = 'Button label',
  style = 'primary',
  size = 'large',
  state = 'enabled',
  type = 'text',
  darkMode = false,
  iconElement,
  onClick,
  className,
  htmlType = 'button',
}: ButtonProps) {
  const isDisabled = state === 'disabled'
  const isLoading  = state === 'loading'
  const isOnlyIcon = type === 'only-icon'

  const effectiveState = isLoading ? 'enabled' : state === 'pressed' ? 'pressed' : state === 'disabled' ? 'disabled' : 'enabled'
  const mode = darkMode ? 'dark' : 'light'
  const colors = colorMap[mode][style][effectiveState]

  const inlineStyle: CSSProperties = {
    backgroundColor: colors.bg,
    color: colors.color,
    borderRadius: sizeMap[size].radius,
    ...(colors.border ? { border: `1px solid ${colors.border}` } : {}),
    ...sizeMap[size].style,
  }

  const sizeClasses = isOnlyIcon ? sizeMap[size].icon : sizeMap[size].button

  const iconLeft  = iconElement ?? <ChevronLeft />
  const iconRight = iconElement ?? <ChevronRight />
  const soloIcon  = iconElement ?? <PlusIcon />

  return (
    <button
      type={htmlType}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-colors',
        'focus-visible:outline-none',
        sizeClasses,
        isDisabled && 'cursor-not-allowed',
        isLoading  && 'cursor-wait',
        className,
      )}
      style={inlineStyle}
    >
      {isLoading ? (
        <Spinner />
      ) : isOnlyIcon ? (
        soloIcon
      ) : (
        <>
          {type === 'left-icon'  && iconLeft}
          {label}
          {type === 'right-icon' && iconRight}
        </>
      )}
    </button>
  )
}
