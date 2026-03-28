import type { CSSProperties, ReactNode } from 'react'
import { Button } from '../Button/Button'
import { Icon } from '../../icons/Icon'

export type CardSectionType = 'brand' | 'primary' | 'skeleton'
export type CardSectionSize = 'responsive' | 'large' | 'medium' | 'small' | 'xsmall'

export interface CardSectionProps {
  type?: CardSectionType
  size?: CardSectionSize
  title?: string
  description?: string
  icon?: ReactNode
  ctaLabel?: string
  onCta?: () => void
  className?: string
}

/* ── Skeleton placeholder ── */
function SkeletonPill({ height, width = '100%' }: { height: number | string; width?: string }) {
  return (
    <div
      style={{
        width,
        height: typeof height === 'number' ? height : height,
        backgroundColor: 'var(--color-gray-10)',
        borderRadius: 'var(--radius-pill)',
      }}
    />
  )
}

export function CardSection({
  type = 'brand',
  size = 'responsive',
  title = 'Título',
  description = 'Te ajudamos em emergências, queixas de saúde e gestão do seu plano',
  icon,
  ctaLabel = 'Saiba mais',
  onCta,
  className,
}: CardSectionProps) {
  const isSkeleton = type === 'skeleton'

  const bgColor =
    type === 'brand'
      ? 'var(--color-off-magenta-00)'
      : 'var(--color-surface)'

  const iconColor =
    type === 'brand' ? 'var(--color-brand)' : 'var(--color-content-primary)'

  const defaultIcon = (
    <Icon name="heart-outline" size={32} color={iconColor} />
  )

  const renderedIcon = icon ?? defaultIcon

  /* ── Card wrapper style ── */
  const baseCardStyle: CSSProperties = {
    width: 327,
    backgroundColor: bgColor,
    border: `${isSkeleton ? '1.5px' : '1.5px'} solid var(--color-black-05)`,
    borderRadius: 'var(--radius-xl)',
    display: 'flex',
    flexDirection: 'column',
  }

  /* ── Skeleton rendering ── */
  if (isSkeleton) {
    const skeletonPadding = size === 'xsmall' ? 'var(--spacing-04)' : 'var(--spacing-06)'

    if (size === 'xsmall') {
      return (
        <div
          className={className}
          style={{
            ...baseCardStyle,
            backgroundColor: 'var(--color-surface)',
            flexDirection: 'row',
            alignItems: 'center',
            padding: skeletonPadding,
            gap: 'var(--spacing-06)',
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
            <SkeletonPill height={24} />
            <SkeletonPill height={18} />
          </div>
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              backgroundColor: 'var(--color-gray-10)',
              borderRadius: 'var(--radius-md)',
            }}
          />
        </div>
      )
    }

    const showButton = size === 'responsive' || size === 'large'
    const showLink = size === 'medium' || size === 'small'
    const showDesc = size !== 'small'

    return (
      <div
        className={className}
        style={{
          ...baseCardStyle,
          backgroundColor: 'var(--color-surface)',
          padding: size === 'responsive' || size === 'large' ? 'var(--spacing-06)' : '24px 24px 16px',
          gap: 'var(--spacing-04)',
          height: size === 'responsive' ? 410 : undefined,
          justifyContent: size === 'responsive' ? 'space-between' : undefined,
        }}
      >
        {/* Icon placeholder */}
        <div
          style={{
            width: 32,
            height: 32,
            backgroundColor: 'var(--color-gray-10)',
            borderRadius: 'var(--radius-xs)',
          }}
        />
        {/* Title placeholder */}
        <SkeletonPill height={size === 'responsive' || size === 'large' ? 30 : 24} />
        {/* Description placeholder */}
        {showDesc && <SkeletonPill height={18} />}
        {/* CTA placeholder */}
        {showButton && <SkeletonPill height={48} />}
        {showLink && <SkeletonPill height={20} width="60%" />}
      </div>
    )
  }

  /* ── Responsive / Large ── */
  if (size === 'responsive' || size === 'large') {
    return (
      <div
        className={className}
        style={{
          ...baseCardStyle,
          padding: 'var(--spacing-06)',
          gap: size === 'large' ? 'var(--spacing-08)' : undefined,
          height: size === 'responsive' ? 410 : undefined,
          justifyContent: size === 'responsive' ? 'space-between' : undefined,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
          {renderedIcon}
          <span
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              lineHeight: 'var(--line-height-title)',
            }}
          >
            {title}
          </span>
        </div>
        {/* Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
          <span
            style={{
              fontFamily: 'var(--font-family-label)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              lineHeight: 'var(--line-height-para-lg)',
            }}
          >
            {description}
          </span>
          <Button
            label={ctaLabel}
            style="primary"
            size="medium"
            type="right-icon"
            iconElement={<Icon name="chevron-right" size={20} color="currentColor" />}
            onClick={onCta}
            className="w-full"
          />
        </div>
      </div>
    )
  }

  /* ── Medium ── */
  if (size === 'medium') {
    return (
      <div
        className={className}
        style={{
          ...baseCardStyle,
          padding: '24px 24px 16px',
          gap: 'var(--spacing-04)',
        }}
      >
        {renderedIcon}
        <span
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-family-label)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-secondary)',
            lineHeight: 'var(--line-height-para-lg)',
          }}
        >
          {description}
        </span>
        {/* Link CTA */}
        <button
          type="button"
          onClick={onCta}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-01)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--color-brand)',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {ctaLabel}
          <Icon name="chevron-right" size={16} color="currentColor" />
        </button>
      </div>
    )
  }

  /* ── Small ── */
  if (size === 'small') {
    return (
      <div
        className={className}
        style={{
          ...baseCardStyle,
          padding: '24px 24px 16px',
          gap: 'var(--spacing-04)',
        }}
      >
        {renderedIcon}
        <span
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
          }}
        >
          {title}
        </span>
        {/* Link CTA */}
        <button
          type="button"
          onClick={onCta}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-01)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: 'var(--color-brand)',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {ctaLabel}
          <Icon name="chevron-right" size={16} color="currentColor" />
        </button>
      </div>
    )
  }

  /* ── XSmall ── */
  return (
    <div
      className={className}
      style={{
        ...baseCardStyle,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 'var(--spacing-04)',
        gap: 'var(--spacing-06)',
      }}
    >
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', overflow: 'hidden' }}>
        <span
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
          }}
        >
          {title}
        </span>
        {description && (
          <span
            style={{
              fontFamily: 'var(--font-family-label)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              lineHeight: 'var(--line-height-label)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {description}
          </span>
        )}
      </div>
      {/* Icon box */}
      <div
        style={{
          width: 64,
          height: 64,
          flexShrink: 0,
          backgroundColor: 'var(--color-black-05)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {renderedIcon}
      </div>
    </div>
  )
}
