import { Icon } from '../../icons/Icon'

export type BillBoardType = 'action' | 'event' | 'skeleton'
export type BillBoardStatus = 'idle' | 'pressed'

export interface BillBoardProps {
  type?: BillBoardType
  status?: BillBoardStatus
  title?: string
  address?: string
  day?: string
  month?: string
  tag?: boolean
  tagLabel?: string
  onClick?: () => void
  className?: string
}

export function BillBoard({
  type = 'action',
  status = 'idle',
  title = 'Agendar consulta',
  address = 'Rua Augusta, 1847',
  day = '24',
  month = 'MAR',
  tag = true,
  tagLabel = 'Hoje',
  onClick,
  className,
}: BillBoardProps) {

  /* ── Action ──────────────────────────────────────────────────── */
  if (type === 'action') {
    const bg = status === 'pressed' ? 'var(--color-brand-pressed)' : 'var(--color-brand)'

    return (
      <div
        onClick={onClick}
        className={className}
        style={{
          width: 327,
          height: 200,
          borderRadius: 'var(--radius-xl)',
          backgroundColor: bg,
          padding: 'var(--spacing-05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : undefined,
          flexShrink: 0,
        }}
      >
        {/* Top row: tag pill + decorative icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Tag pill */}
          {tag ? (
            <div style={{
              backgroundColor: 'var(--color-white-20)',
              borderRadius: 'var(--radius-pill)',
              padding: '4px 8px',
              display: 'inline-flex',
              alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-gray-white)',
                lineHeight: 1,
              }}>
                {tagLabel}
              </span>
            </div>
          ) : (
            <div />
          )}

          {/* Decorative calendar icon cluster */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="check-circle-outline" size={20} color="var(--color-white-40)" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="check-circle-outline" size={16} color="var(--color-white-20)" />
            </div>
          </div>
        </div>

        {/* Bottom: title + address */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-gray-white)',
            margin: 0,
            lineHeight: 'var(--line-height-title)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="map-marker-outline" size={16} color="var(--color-white-70)" />
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-white-70)',
              margin: 0,
              lineHeight: 'var(--line-height-title)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {address}
            </p>
          </div>
        </div>
      </div>
    )
  }

  /* ── Event ───────────────────────────────────────────────────── */
  if (type === 'event') {
    return (
      <div
        onClick={onClick}
        className={className}
        style={{
          width: 327,
          height: 96,
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-surface)',
          border: '1.5px solid var(--color-black-10)',
          padding: 'var(--spacing-04)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 'var(--spacing-04)',
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : undefined,
          flexShrink: 0,
        }}
      >
        {/* Date box */}
        <div style={{
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-off-magenta-00)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}>
          <span style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 1,
          }}>
            {day}
          </span>
          <span style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-tertiary)',
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-button)',
          }}>
            {month}
          </span>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minWidth: 0,
        }}>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            margin: 0,
            lineHeight: 'var(--line-height-title)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            <Icon name="map-marker-outline" size={16} color="var(--color-content-tertiary)" />
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-tertiary)',
              margin: 0,
              lineHeight: 'var(--line-height-title)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {address}
            </p>
          </div>
        </div>

        {/* Chevron */}
        <Icon name="chevron-right" size={16} color="var(--color-content-tertiary)" />
      </div>
    )
  }

  /* ── Skeleton ────────────────────────────────────────────────── */
  return (
    <div
      className={className}
      style={{
        width: 327,
        height: 200,
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--color-surface-subtle)',
        padding: 'var(--spacing-05)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Top: short skeleton block */}
      <div style={{
        width: 80,
        height: 20,
        borderRadius: 'var(--radius-pill)',
        backgroundColor: 'var(--color-black-10)',
      }} />

      {/* Bottom: two skeleton lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          width: '100%',
          height: 16,
          borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--color-black-10)',
        }} />
        <div style={{
          width: '60%',
          height: 12,
          borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--color-black-10)',
        }} />
      </div>
    </div>
  )
}
