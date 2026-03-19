import { Icon as IconifyIcon } from '@iconify/react'

export interface IconProps {
  /** Material Design icon name in kebab-case, e.g. "chevron-right", "home", "search" */
  name: string
  /** px size (width & height). Default 24 */
  size?: number
  /** CSS color override. Default "currentColor" */
  color?: string
  className?: string
}

/**
 * Icon component powered by Material Design Icons via Iconify.
 * Uses the `mdi:` prefix automatically — just pass the icon name.
 *
 * Browse all icons: https://icon-sets.iconify.design/mdi/
 *
 * @example
 * <Icon name="home" size={24} />
 * <Icon name="chevron-right" size={20} color="#BE0380" />
 */
export function Icon({ name, size = 24, color, className }: IconProps) {
  return (
    <IconifyIcon
      icon={`mdi:${name}`}
      width={size}
      height={size}
      color={color}
      className={className}
      style={{ display: 'inline-flex' }}
    />
  )
}
