import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'
import personPhoto from '../../assets/placeholders/person.jpg'

export type AvatarSize = 'large' | 'medium' | 'small' | 'xsmall'
export type AvatarType = 'image' | 'placeholder'
export type AvatarStatus = 'idle' | 'active'

export interface AvatarProps {
  size?: AvatarSize
  type?: AvatarType
  status?: AvatarStatus
  src?: string
  className?: string
}

const SIZE_MAP: Record<AvatarSize, { dim: number; borderRadius: string; iconSize: number }> = {
  large:  { dim: 80, borderRadius: 'var(--radius-xl)', iconSize: 32 },
  medium: { dim: 64, borderRadius: 'var(--radius-md)', iconSize: 32 },
  small:  { dim: 48, borderRadius: 'var(--radius-sm)', iconSize: 24 },
  xsmall: { dim: 32, borderRadius: 'var(--radius-xs)', iconSize: 20 },
}

export function Avatar({
  size = 'large',
  type = 'placeholder',
  status = 'idle',
  src,
  className,
}: AvatarProps) {
  const { dim, borderRadius, iconSize } = SIZE_MAP[size]
  const isActive = status === 'active'

  /* Active ring uses box-shadow so it renders OUTSIDE the element
     and doesn't interfere with content or overflow:hidden */
  const outerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim,
    height: dim,
    borderRadius,
    overflow: 'hidden',
    flexShrink: 0,
    boxSizing: 'border-box',
    position: 'relative',
    ...(isActive && {
      boxShadow: '0 0 0 2px var(--color-gray-white), 0 0 0 4px var(--color-brand)',
    }),
  }

  if (type === 'placeholder') {
    return (
      <div className={className} style={outerStyle}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius,
          backgroundColor: 'var(--color-gray-10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <Icon
            name="user"
            size={iconSize}
            color="var(--color-content-secondary)"
          />
        </div>
      </div>
    )
  }

  /* type === 'image' */
  return (
    <div className={className} style={outerStyle}>
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius,
        overflow: 'hidden',
      }}>
        <img
          src={src ?? personPhoto}
          alt="avatar"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    </div>
  )
}
