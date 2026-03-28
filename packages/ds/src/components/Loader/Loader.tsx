export type LoaderVariant = 'spinner' | 'skeleton' | 'linear'
export type LoaderSize = 'sm' | 'md' | 'lg' | 'xlg'
export type LoaderTheme = 'light' | 'dark' | 'brand'
export type SkeletonShape = 'square' | 'oval' | 'text' | 'title'

export interface LoaderProps {
  variant?: LoaderVariant
  size?: LoaderSize
  theme?: LoaderTheme
  skeletonShape?: SkeletonShape
  className?: string
}

const SPINNER_SIZES: Record<LoaderSize, number> = {
  sm: 12,
  md: 16,
  lg: 24,
  xlg: 32,
}

function getSpinnerColors(theme: LoaderTheme): { spinColor: string; trackColor: string } {
  if (theme === 'light') {
    return {
      spinColor: 'var(--color-brand)',
      trackColor: 'var(--color-surface-subtle)',
    }
  }
  if (theme === 'dark') {
    return {
      spinColor: 'var(--color-gray-white)',
      trackColor: 'var(--color-gray-70)',
    }
  }
  // brand
  return {
    spinColor: 'var(--color-gray-white)',
    trackColor: 'rgba(255,255,255,0.2)',
  }
}

function getSkeletonColor(theme: LoaderTheme): string {
  if (theme === 'light') return 'var(--color-surface-subtle)'
  if (theme === 'dark') return 'var(--color-gray-80)'
  return 'var(--color-brand-pressed)'
}

function getLinearColors(theme: LoaderTheme): { track: string; fill: string } {
  if (theme === 'light') {
    return { track: 'var(--color-magenta-00)', fill: 'var(--color-brand)' }
  }
  if (theme === 'dark') {
    return { track: 'var(--color-gray-70)', fill: 'var(--color-gray-white)' }
  }
  return { track: 'var(--color-brand-pressed)', fill: 'var(--color-gray-white)' }
}

export function Loader({
  variant = 'spinner',
  size = 'md',
  theme = 'light',
  skeletonShape = 'square',
  className,
}: LoaderProps) {
  return (
    <>
      <style>{`
        @keyframes ds-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ds-slide {
          0%   { left: 5px; }
          100% { left: calc(100% - 51px); }
        }
      `}</style>

      {variant === 'spinner' && (() => {
        const px = SPINNER_SIZES[size]
        const { spinColor, trackColor } = getSpinnerColors(theme)
        return (
          <div
            className={className}
            style={{
              width: px,
              height: px,
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: spinColor,
              backgroundColor: 'transparent',
              boxShadow: `0 0 0 2px ${trackColor} inset`,
              animation: 'ds-spin 1s linear infinite',
              flexShrink: 0,
            }}
          />
        )
      })()}

      {variant === 'skeleton' && (() => {
        const bg = getSkeletonColor(theme)
        const shapeStyles: Record<SkeletonShape, React.CSSProperties> = {
          square: { width: 56, height: 56, borderRadius: 'var(--radius-md)' },
          oval:   { width: 56, height: 56, borderRadius: '50%' },
          text:   { width: 240, height: 16, borderRadius: 'var(--radius-pill)' },
          title:  { width: 240, height: 40, borderRadius: 'var(--radius-pill)' },
        }
        return (
          <div
            className={className}
            style={{
              backgroundColor: bg,
              ...shapeStyles[skeletonShape],
            }}
          />
        )
      })()}

      {variant === 'linear' && (() => {
        const { track, fill } = getLinearColors(theme)
        return (
          <div
            className={className}
            style={{
              width: 311,
              height: 4,
              borderRadius: 4,
              backgroundColor: track,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 5,
                width: 46,
                height: '100%',
                borderRadius: 4,
                backgroundColor: fill,
                animation: 'ds-slide 1.5s ease-in-out infinite alternate',
              }}
            />
          </div>
        )
      })()}
    </>
  )
}
