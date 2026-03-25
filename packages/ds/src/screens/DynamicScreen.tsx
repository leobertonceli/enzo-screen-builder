import { BaseCard } from '../components/BaseCard'
import { Chip } from '../components/Chip'
import { ListItem } from '../components/ListItem'
import { Icon } from '../icons/Icon'
import type { GeneratedTemplate } from '../services/ai'

interface Props {
  template: GeneratedTemplate
}

export function DynamicScreen({ template }: Props) {
  const { layout } = template

  return (
    <div style={{
      width: 390,
      minHeight: 812,
      backgroundColor: 'var(--color-surface)',
      fontFamily: 'var(--font-family-base)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Status bar placeholder */}
      <div style={{ height: 44, backgroundColor: 'var(--color-surface)', flexShrink: 0 }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 var(--spacing-05)',
        height: 56,
        gap: 'var(--spacing-04)',
        flexShrink: 0,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--color-gray-10)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="arrow-left" size={20} color="var(--color-content-primary)" />
        </div>
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-md)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-content-primary)',
          flex: 1,
        }}>
          {template.pageTitle}
        </span>
      </div>

      {/* Body */}
      <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-04) var(--spacing-05)' }}>
        {layout === 'search' && <SearchLayout template={template} />}
        {(layout === 'list' || layout === 'settings') && <ListLayout template={template} />}
        {layout === 'home' && <HomeLayout template={template} />}
      </div>
    </div>
  )
}

// ─── Search layout ────────────────────────────────────────────────────────────

function SearchLayout({ template }: { template: GeneratedTemplate }) {
  const { searchPlaceholder, filters = [], cards = [], helpCard } = template

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-05)' }}>
      {/* Search bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--spacing-03)',
        backgroundColor: 'var(--color-gray-05)',
        borderRadius: 'var(--radius-xs)',
        padding: '10px var(--spacing-04)',
        border: '1px solid var(--color-border-subtle)',
      }}>
        <Icon name="magnify" size={20} color="var(--color-content-secondary)" />
        <span style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-label)', color: 'var(--color-content-tertiary)' }}>
          {searchPlaceholder ?? 'Buscar...'}
        </span>
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--spacing-02)', flexWrap: 'wrap' }}>
          {filters.map((f, i) => (
            <Chip key={f.key} label={f.label} selected={i === 0} size="small" />
          ))}
        </div>
      )}

      {/* Cards */}
      {cards.map((card) => (
        <div key={card.key} style={{
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-border-subtle)',
          overflow: 'hidden',
        }}>
          {card.imageUrl && (
            <img
              src={card.imageUrl}
              alt=""
              style={{ width: '100%', height: 80, objectFit: 'cover', display: 'block' }}
            />
          )}
          <div style={{ padding: 'var(--spacing-04)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 'var(--font-size-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-content-primary)', fontFamily: 'var(--font-family-base)' }}>
                {card.title}
              </span>
              {card.status && (
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-brand)', fontFamily: 'var(--font-family-label)', fontWeight: 'var(--font-weight-medium)' }}>
                  {card.status}
                </span>
              )}
            </div>
            {card.subtitle && (
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-content-secondary)', fontFamily: 'var(--font-family-label)' }}>
                {card.subtitle}
              </span>
            )}
            {card.description && (
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-content-tertiary)', fontFamily: 'var(--font-family-label)' }}>
                {card.description}
              </span>
            )}
          </div>
        </div>
      ))}

      {helpCard && <HelpCardBlock helpCard={helpCard} />}
    </div>
  )
}

// ─── List / Settings layout ───────────────────────────────────────────────────

function ListLayout({ template }: { template: GeneratedTemplate }) {
  const { sections = [], helpCard } = template

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-05)' }}>
      {sections.map((section, si) => (
        <div key={si} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
          {section.title && (
            <span style={{
              fontSize: 'var(--font-size-xs)',
              fontFamily: 'var(--font-family-label)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: 'var(--spacing-02) 0',
            }}>
              {section.title}
            </span>
          )}
          <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border-subtle)' }}>
            {section.items.map((item, ii) => (
              <ListItem
                key={item.key}
                title={item.title}
                description={item.description}
                size="small"
                leftSide={item.icon ? 'icon' : 'none'}
                icon={item.icon ? <Icon name={item.icon} size={20} color="var(--color-content-primary)" /> : undefined}
                rightAsset="icon"
                rightIconElement={<Icon name="chevron-right" size={20} color="var(--color-content-tertiary)" />}
                divider={ii < section.items.length - 1}
                fullWidth
              />
            ))}
          </div>
        </div>
      ))}

      {helpCard && <HelpCardBlock helpCard={helpCard} />}
    </div>
  )
}

// ─── Home layout ──────────────────────────────────────────────────────────────

function HomeLayout({ template }: { template: GeneratedTemplate }) {
  const { greeting, userName, quickActions = [], helpCard } = template

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)' }}>
      {/* Greeting */}
      {(greeting || userName) && (
        <div>
          <p style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-content-primary)', margin: 0, fontFamily: 'var(--font-family-base)' }}>
            {greeting} <span style={{ color: 'var(--color-brand)' }}>{userName}.</span>
          </p>
        </div>
      )}

      {/* Quick actions grid */}
      {quickActions.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-03)' }}>
          {quickActions.map((action) => (
            <div key={action.key} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-02)',
              padding: 'var(--spacing-04) var(--spacing-03)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-gray-05)',
              border: '1px solid var(--color-border-subtle)',
              cursor: 'pointer',
            }}>
              <div style={{
                width: 40, height: 40,
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--color-brand-subtle, rgba(190,3,128,0.08))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={action.icon || 'star-outline'} size={22} color="var(--color-brand)" />
              </div>
              <span style={{
                fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-label)',
                color: 'var(--color-content-primary)', textAlign: 'center', lineHeight: 1.3,
                fontWeight: 'var(--font-weight-medium)',
              }}>
                {action.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {helpCard && <HelpCardBlock helpCard={helpCard} />}
    </div>
  )
}

// ─── Shared blocks ────────────────────────────────────────────────────────────

function HelpCardBlock({ helpCard }: { helpCard: NonNullable<GeneratedTemplate['helpCard']> }) {
  return (
    <BaseCard
      size="small"
      filled={false}
      category={helpCard.category}
      showCategory
      title={helpCard.title}
      showTitle
      subtitle={helpCard.subtitle}
      showSubtitle
      action="link"
      linkLabel={helpCard.linkLabel}
      leftAsset={false}
      rightAsset={false}
      showSlot={false}
    />
  )
}
