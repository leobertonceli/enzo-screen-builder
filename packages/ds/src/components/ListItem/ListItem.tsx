import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

export type ListItemSize = 'large' | 'small'
export type ListItemState = 'default' | 'pressed' | 'loading'
export type ListItemLeftSide = 'none' | 'icon' | 'image'
export type ListItemRightAsset = 'none' | 'icon' | 'text' | 'text-icon'

export interface ListItemProps {
  title?: string
  description?: string
  size?: ListItemSize
  state?: ListItemState
  leftSide?: ListItemLeftSide
  fullWidth?: boolean
  rightAsset?: ListItemRightAsset
  rightText?: string
  /** Slot para ícone customizado (leftSide="icon") */
  icon?: ReactNode
  /** Slot para right asset customizado */
  rightElement?: ReactNode
  /** Slot para ícone do right side (rightAsset="icon" ou "text-icon") */
  rightIconElement?: ReactNode
  /** URL da imagem (leftSide="image") */
  imageSrc?: string
  imageAlt?: string
  divider?: boolean
  onClick?: () => void
  className?: string
  onChange?: (key: string, val: unknown) => void
}

const ChevronRight = () => (
  <Icon name="chevronArrowRight" size={ICON_SIZE.lg} color="var(--color-content-primary)" />
)

export function ListItem({
  title = 'Title',
  description,
  size = 'large',
  state = 'default',
  leftSide = 'none',
  fullWidth = true,
  rightAsset = 'icon',
  rightText = 'Text',
  icon,
  rightIconElement,
  imageSrc,
  imageAlt = '',
  divider = true,
  onClick,
  className,
  onChange,
}: ListItemProps) {
  const isLoading = state === 'loading'
  const isPressed = state === 'pressed'
  const isLarge = size === 'large'

  const rootBg = isPressed ? 'var(--color-surface-subtle)' : 'var(--color-surface)'
  const hasDescription = description !== undefined

  // Inline styles for values that Tailwind v4 may not generate from dynamic class names
  const paddingInline = fullWidth ? 'var(--spacing-06)' : undefined
  const paddingBlock = isLarge ? 'var(--spacing-06)' : 'var(--spacing-05)'
  const minWidth = fullWidth ? 375 : 327
  const height = isLoading ? (isLarge ? 89 : 74) : undefined
  const alignItems = isLoading && leftSide === 'icon' ? 'flex-start' : 'center'
  const gap = isLarge ? 'var(--spacing-04)' : leftSide === 'none' ? '0' : 'var(--spacing-03)'

  return (
    <div
      onClick={onClick}
      className={cn('flex relative w-full', onClick && 'cursor-pointer select-none', className)}
      style={{
        paddingInline,
        paddingBlock,
        minWidth,
        height,
        alignItems,
        gap,
        backgroundColor: rootBg,
        borderBottom: divider ? '1px solid var(--color-divider)' : undefined,
      }}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <>
          {leftSide !== 'none' && (
            <div
              className={cn(
                'shrink-0',
                leftSide === 'image'
                  ? isLarge ? 'size-10 rounded-full' : 'size-8 rounded-3xl'
                  : isLarge ? 'size-5 rounded-full' : 'size-4 rounded-3xl',
              )}
              style={{ backgroundColor: 'var(--color-surface-subtle)' }}
            />
          )}
          <div className="flex flex-1 flex-col gap-1 min-w-0">
            <div
              className={cn('rounded-full w-[120px]', isLarge ? 'h-5' : 'h-4')}
              style={{ backgroundColor: 'var(--color-surface-subtle)' }}
            />
            {description !== undefined && (
              <div
                className={cn('rounded-full w-full', isLarge ? 'h-5' : 'h-4')}
                style={{ backgroundColor: 'var(--color-surface-subtle)' }}
              />
            )}
          </div>
        </>
      )}

      {/* Default / Pressed */}
      {!isLoading && (
        <>
          {/* Left: Image */}
          {leftSide === 'image' && (
            <div
              className={cn(
                'shrink-0 overflow-hidden',
                isLarge ? 'size-10' : 'size-8',
                hasDescription && 'self-start',
              )}
              style={{ borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-brand)' }}
            >
              {imageSrc ? (
                <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
              ) : (
                <div className="size-full" style={{ backgroundColor: 'var(--color-brand)' }} />
              )}
            </div>
          )}

          {/* Left: Icon */}
          {leftSide === 'icon' && (
            <div className={cn('shrink-0 size-6 flex items-center justify-center', hasDescription && 'self-start')}>
              {icon ?? (
                <Icon name="circleFill" size={ICON_SIZE.lg} color="var(--color-content-primary)" />
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn('flex flex-1 flex-col gap-1 min-w-0 justify-center', isLarge ? 'min-h-[41px]' : 'min-h-[35px]')}>
            <p
              className={onChange ? 'font-normal' : 'truncate font-normal'}
              contentEditable={!!onChange || undefined}
              suppressContentEditableWarning
              onBlur={onChange ? (e) => onChange('title', (e.currentTarget as HTMLElement).textContent ?? '') : undefined}
              onKeyDown={onChange ? (e) => { if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() } } : undefined}
              onClick={onChange ? (e) => e.stopPropagation() : undefined}
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: isLarge ? 'var(--font-size-md)' : 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-title)',
                color: 'var(--color-content-primary)',
                outline: 'none',
              }}
            >
              {title}
            </p>
            {description !== undefined && (
              <p
                className={onChange ? 'font-normal' : 'font-normal line-clamp-2'}
                contentEditable={!!onChange || undefined}
                suppressContentEditableWarning
                onBlur={onChange ? (e) => onChange('description', (e.currentTarget as HTMLElement).textContent ?? '') : undefined}
                onKeyDown={onChange ? (e) => { if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() } } : undefined}
                onClick={onChange ? (e) => e.stopPropagation() : undefined}
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: isLarge ? 'var(--font-size-md)' : 'var(--font-size-sm)',
                  lineHeight: 'var(--line-height-title)',
                  color: 'var(--color-content-secondary)',
                  outline: 'none',
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Right asset */}
          {rightAsset !== 'none' && (
            <div className={cn(
              'shrink-0',
              rightAsset === 'icon'      && 'flex items-center justify-center size-6',
              rightAsset === 'text'      && 'flex h-6 items-center justify-center',
              rightAsset === 'text-icon' && 'flex items-center gap-1',
            )}>
              {(rightAsset === 'text' || rightAsset === 'text-icon') && (
                <span
                  className={onChange ? 'font-normal text-right' : 'font-normal text-right whitespace-nowrap'}
                  contentEditable={!!onChange || undefined}
                  suppressContentEditableWarning
                  onBlur={onChange ? (e) => onChange('rightText', (e.currentTarget as HTMLElement).textContent ?? '') : undefined}
                  onKeyDown={onChange ? (e) => { if (e.key === 'Enter') { e.preventDefault(); (e.currentTarget as HTMLElement).blur() } } : undefined}
                  onClick={onChange ? (e) => e.stopPropagation() : undefined}
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-title)',
                    color: 'var(--color-content-primary)',
                    outline: 'none',
                  }}
                >
                  {rightText}
                </span>
              )}
              {(rightAsset === 'icon' || rightAsset === 'text-icon') && (
                rightIconElement ?? <ChevronRight />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
