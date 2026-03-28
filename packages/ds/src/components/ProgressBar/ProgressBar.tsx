import { Icon } from '../../icons/Icon'

export interface ProgressBarProps {
  value?: number  // 0-100
  showIcon?: boolean
  className?: string
}

export function ProgressBar({ value = 0, showIcon = true, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const isComplete = clamped === 100
  const iconRight = showIcon ? 28 : 0

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: 24, display: 'flex', alignItems: 'center' }}>
      {/* Track */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: iconRight,
        height: 4,
        backgroundColor: 'var(--color-surface-subtle)',
        borderRadius: 'var(--radius-pill)',
      }} />

      {/* Progress fill */}
      {clamped > 0 && (
        <div style={{
          position: 'absolute',
          left: 0,
          width: `calc(${clamped / 100} * (100% - ${iconRight}px))`,
          height: 4,
          backgroundColor: 'var(--color-brand)',
          borderRadius: 'var(--radius-pill)',
          transition: 'width 0.3s ease',
        }} />
      )}

      {/* Heart icon */}
      {showIcon && (
        <div style={{ position: 'absolute', right: 0 }}>
          <Icon
            name={isComplete ? 'heart' : 'heart-outline'}
            size={24}
            color={isComplete ? 'var(--color-brand)' : 'var(--color-content-secondary)'}
          />
        </div>
      )}
    </div>
  )
}
