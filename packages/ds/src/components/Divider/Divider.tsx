export type DividerVariant = 'full-width' | 'inset' | 'text'

export interface DividerProps {
  variant?: DividerVariant
  label?: string
  className?: string
}

export function Divider({ variant = 'full-width', label = 'Ter, 27/09/2021', className }: DividerProps) {
  const line = {
    height: 1,
    backgroundColor: 'var(--color-stroke)',
    flexShrink: 0 as const,
  }

  if (variant === 'full-width') {
    return <div className={className} style={{ ...line, width: '100%' }} />
  }

  if (variant === 'inset') {
    return (
      <div className={className} style={{ padding: '0 var(--spacing-06)', width: '100%' }}>
        <div style={{ ...line }} />
      </div>
    )
  }

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)', padding: '0 var(--spacing-06)', width: '100%' }}>
      <div style={{ ...line, flex: 1 }} />
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-regular)',
        lineHeight: 'var(--line-height-title)',
        color: 'var(--color-content-tertiary)',
        whiteSpace: 'nowrap',
        margin: 0,
      }}>{label}</span>
      <div style={{ ...line, flex: 1 }} />
    </div>
  )
}
