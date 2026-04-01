import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

export type TagVariant = 'Red' | 'Magenta' | 'Blue' | 'Green' | 'Orange' | 'Grey' | 'Disabled'
export type TagIconMode = 'Primary' | 'Semantic' | 'No icon'

export interface TagProps {
  variant?: TagVariant
  icon?: TagIconMode
  label?: string
}

interface VariantConfig {
  bg: string
  textColor: string
  iconName: string
  primaryIconColor: string
  semanticIconColor: string
}

const VARIANT_CONFIG: Record<TagVariant, VariantConfig> = {
  Red:      { bg: 'var(--color-red-00)',     textColor: 'var(--color-content-primary)', iconName: 'alert-circle-outline',  primaryIconColor: 'var(--color-content-primary)', semanticIconColor: 'var(--color-red-60)' },
  Magenta:  { bg: 'var(--color-magenta-00)', textColor: 'var(--color-content-primary)', iconName: 'heart-outline',         primaryIconColor: 'var(--color-content-primary)', semanticIconColor: 'var(--color-brand)' },
  Blue:     { bg: 'var(--color-blue-00)',    textColor: 'var(--color-content-primary)', iconName: 'information-outline',   primaryIconColor: 'var(--color-content-primary)', semanticIconColor: 'var(--color-blue-50)' },
  Green:    { bg: 'var(--color-green-00)',   textColor: 'var(--color-content-primary)', iconName: 'check-circle-outline',  primaryIconColor: 'var(--color-content-primary)', semanticIconColor: 'var(--color-green-90)' },
  Orange:   { bg: 'var(--color-orange-00)',  textColor: 'var(--color-content-primary)', iconName: 'alert',                 primaryIconColor: 'var(--color-content-primary)', semanticIconColor: 'var(--color-orange-80)' },
  Grey:     { bg: 'var(--color-gray-10)',    textColor: 'var(--color-gray-90)',         iconName: 'autorenew',             primaryIconColor: 'var(--color-gray-90)',         semanticIconColor: 'var(--color-gray-90)' },
  Disabled: { bg: 'var(--color-gray-10)',    textColor: 'var(--color-gray-40)',         iconName: 'block-helper',          primaryIconColor: 'var(--color-gray-40)',         semanticIconColor: 'var(--color-gray-40)' },
}

const labelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  fontSize: 'var(--font-size-xs)',
  lineHeight: 'var(--line-height-title)',
  margin: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}

export function Tag({ variant = 'Red', icon = 'Primary', label = 'Label' }: TagProps) {
  const cfg = VARIANT_CONFIG[variant]
  const hasIcon = icon !== 'No icon'
  const iconColor = icon === 'Semantic' ? cfg.semanticIconColor : cfg.primaryIconColor

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 'var(--radius-pill)',
      backgroundColor: cfg.bg,
      paddingTop: 'var(--spacing-01)',
      paddingBottom: 'var(--spacing-01)',
      paddingLeft: hasIcon ? 'var(--spacing-02)' : 'var(--spacing-03)',
      paddingRight: 'var(--spacing-03)',
      gap: hasIcon ? 'var(--spacing-01)' : undefined,
      flexShrink: 0,
    }}>
      {hasIcon && <Icon name={cfg.iconName} size={ICON_SIZE.sm} color={iconColor} />}
      <p style={{ ...labelStyle, color: cfg.textColor }}>
        {label}
      </p>
    </div>
  )
}
