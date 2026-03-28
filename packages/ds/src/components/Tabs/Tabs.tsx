import { Icon } from '../../icons/Icon'

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
        fontSize: 'var(--font-size-xxxs)',
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
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: 48,
          backgroundColor: 'var(--color-gray-white)',
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
                borderBottom: isActive
                  ? '2px solid var(--color-brand)'
                  : '1px solid var(--color-stroke)',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                color: isActive ? 'var(--color-content-primary)' : 'var(--color-content-tertiary)',
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
            }}
          >
            <Icon
              name="arrow-up-down"
              size={16}
              color={isActive ? 'var(--color-brand)' : 'var(--color-content-primary)'}
            />
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: isActive ? 'var(--color-brand)' : 'var(--color-content-primary)',
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
