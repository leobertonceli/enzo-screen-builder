import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'

export type TabsStyle = 'texts' | 'filter'

export interface TabItem {
  label: string
  badge?: number
}

export interface TabsProps {
  style?: TabsStyle
  items?: TabItem[]
  activeIndex?: number
  onChange?: (index: number) => void
  className?: string
}

const DEFAULT_ITEMS: TabItem[] = [
  { label: 'Label', badge: 1 },
  { label: 'Label', badge: 1 },
  { label: 'Label' },
]

/* Small inline counter badge — active = brand, inactive = gray */
function TabBadge({ count, isActive }: { count: number; isActive: boolean }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 16,
      height: 16,
      padding: '2px 4px',
      borderRadius: 'var(--radius-pill)',
      backgroundColor: isActive ? 'var(--color-brand)' : 'var(--color-gray-20)',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        lineHeight: 1,
        color: isActive ? 'var(--color-gray-white)' : 'var(--color-content-tertiary)',
        whiteSpace: 'nowrap',
      }}>
        {count}
      </span>
    </div>
  )
}

export function Tabs({
  style = 'texts',
  items = DEFAULT_ITEMS,
  activeIndex = 0,
  onChange,
  className,
}: TabsProps) {

  /* ── Text tabs ── */
  if (style === 'texts') {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: 48,
          backgroundColor: 'var(--color-gray-white)',
          borderBottom: '1px solid var(--color-stroke)',
        }}
      >
        {items.map((item, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={i}
              onClick={() => onChange?.(i)}
              style={{
                flex: 1,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-02)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                color: isActive ? 'var(--color-content-primary)' : 'var(--color-content-tertiary)',
                transition: 'color 0.3s ease',
                padding: '0 var(--spacing-04)',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
              {item.badge !== undefined && (
                <TabBadge count={item.badge} isActive={isActive} />
              )}
            </button>
          )
        })}

        {/* Sliding active indicator */}
        <div style={{
          position: 'absolute',
          bottom: -1,
          left: `${(activeIndex / items.length) * 100}%`,
          width: `${100 / items.length}%`,
          height: 2,
          backgroundColor: 'var(--color-brand)',
          transition: 'left 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
          borderRadius: 'var(--radius-pill)',
          zIndex: 1,
        }} />
      </div>
    )
  }

  /* ── Filter tabs ── */
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 'var(--spacing-02)',
      }}
    >
      {items.map((item, i) => {
        const isActive = i === activeIndex
        return (
          <button
            key={i}
            onClick={() => onChange?.(i)}
            style={{
              display: 'inline-flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 'var(--spacing-03)',
              paddingTop: 'var(--spacing-02)',
              paddingBottom: 'var(--spacing-02)',
              paddingLeft: 'var(--spacing-04)',
              paddingRight: 'var(--spacing-04)',
              borderRadius: 'var(--radius-pill)',
              border: isActive
                ? '1px solid var(--color-magenta-10)'
                : '1px solid var(--color-gray-10)',
              background: isActive ? 'var(--color-brand-subtle)' : 'var(--color-gray-10)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.3s ease, border-color 0.3s ease',
            }}
          >
            <Icon
              name="sorting"
              size={ICON_SIZE.sm}
              color={isActive ? 'var(--color-brand)' : 'var(--color-content-primary)'}
            />
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: isActive ? 'var(--color-brand)' : 'var(--color-content-primary)',
              transition: 'color 0.3s ease',
              whiteSpace: 'nowrap',
            }}>
              {item.label}
            </span>
            {item.badge !== undefined && (
              <TabBadge count={item.badge} isActive={isActive} />
            )}
          </button>
        )
      })}
    </div>
  )
}
