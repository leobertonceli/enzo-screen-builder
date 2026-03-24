import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../../icons/Icon'

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
}

const ChevronRight = () => (
  <Icon name="chevron-right" size={24} color="var(--color-content-primary)" />
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
}: ListItemProps) {
  const isLoading = state === 'loading'
  const isPressed = state === 'pressed'
  const isLarge = size === 'large'

  const rootWidth = fullWidth ? 'w-full min-w-[375px]' : 'w-full min-w-[327px]'
  const rootPadding = fullWidth
    ? isLarge
      ? 'px-6 py-6'
      : 'px-6 py-5'
    : isLarge
    ? 'py-6'
    : 'py-5'

  const rootHeight = isLoading ? (isLarge ? 'h-[89px]' : 'h-[74px]') : ''
  const rootBg = isPressed ? 'var(--color-surface-subtle)' : 'var(--color-surface)'
  const hasDescription = description !== undefined
  const rootAlign = isLoading && leftSide === 'icon' ? 'items-start' : 'items-center'

  return (
    <div
      onClick={onClick}
      className={cn(
        'flex relative',
        rootWidth,
        rootPadding,
        rootHeight,
        rootAlign,
        isLarge ? 'gap-4' : leftSide === 'none' ? 'gap-0' : 'gap-3',
        onClick && 'cursor-pointer select-none',
        className,
      )}
      style={{
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
                isLarge ? 'size-10 rounded-xl' : 'size-8 rounded-lg',
                hasDescription && 'self-start',
              )}
              style={{ backgroundColor: 'var(--color-brand)' }}
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
                <Icon name="circle" size={24} color="var(--color-content-primary)" />
              )}
            </div>
          )}

          {/* Content */}
          <div className={cn('flex flex-1 flex-col gap-1 min-w-0 justify-center', isLarge ? 'min-h-[41px]' : 'min-h-[35px]')}>
            <p
              className="truncate font-normal"
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: isLarge ? 'var(--font-size-md)' : 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-title)',
                color: 'var(--color-content-primary)',
              }}
            >
              {title}
            </p>
            {description !== undefined && (
              <p
                className="font-normal line-clamp-2"
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: isLarge ? 'var(--font-size-md)' : 'var(--font-size-sm)',
                  lineHeight: 'var(--line-height-title)',
                  color: 'var(--color-content-secondary)',
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
                  className="font-normal text-right whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-title)',
                    color: 'var(--color-content-primary)',
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
