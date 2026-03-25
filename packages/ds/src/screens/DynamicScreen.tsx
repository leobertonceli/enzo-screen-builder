import { BaseCard } from '../components/BaseCard'
import { Chip } from '../components/Chip'
import { ListItem } from '../components/ListItem'
import { Icon } from '../icons/Icon'
import type { GeneratedTemplate } from '../services/ai'

function MissingTag({ label }: { label: string }) {
  return (
    <div style={{
      position: 'absolute', top: 'var(--spacing-02)', right: 'var(--spacing-02)',
      backgroundColor: '#E53935', color: 'var(--color-gray-white)',
      fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)',
      fontWeight: 'var(--font-weight-medium)', padding: '2px 8px',
      borderRadius: 'var(--radius-pill)', zIndex: 10, lineHeight: '1.4',
    }}>{label}</div>
  )
}

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
      {/* Status bar */}
      <div style={{ height: 44, backgroundColor: 'var(--color-surface)', flexShrink: 0 }} />

      {/* Nav bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-04) var(--spacing-06)',
        flexShrink: 0,
      }}>
        <Icon name="arrow-left" size={24} color="var(--color-content-primary)" />
      </div>

      {/* Page title */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-04)' }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-primary)',
          margin: 0,
        }}>
          {template.pageTitle}
        </h1>
      </div>

      {/* Body */}
      <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingBottom: 'var(--spacing-06)' }}>
        {layout === 'search' && <SearchLayout template={template} />}
        {(layout === 'list' || layout === 'settings') && <ListLayout template={template} />}
        {layout === 'home' && <HomeLayout template={template} />}
      </div>

      {/* Nav bar bottom placeholder */}
      <div style={{ height: 64, flexShrink: 0, borderTop: '1px solid var(--color-divider)' }} />
    </div>
  )
}

// ─── Search layout ────────────────────────────────────────────────────────────

function SearchLayout({ template }: { template: GeneratedTemplate }) {
  const { searchPlaceholder, filters = [], cards = [], helpCard } = template

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-05)' }}>

      {/* SearchBar — fora do DS */}
      <div style={{ position: 'relative', padding: '0 var(--spacing-06)' }}>
        <MissingTag label="SearchBar — fora do DS" />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--spacing-03)',
          padding: 'var(--spacing-04)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-stroke)',
          backgroundColor: 'var(--color-surface)',
        }}>
          <Icon name="magnify" size={20} color="var(--color-content-tertiary)" />
          <span style={{
            fontFamily: 'var(--font-family-label)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-tertiary)',
          }}>
            {searchPlaceholder ?? 'Buscar...'}
          </span>
        </div>
      </div>

      {/* Filters — Chip (DS) */}
      {filters.length > 0 && (
        <div
          className="flex overflow-x-auto"
          style={{
            paddingLeft: 'var(--spacing-06)',
            paddingRight: 'var(--spacing-06)',
            gap: 'var(--spacing-02)',
            scrollbarWidth: 'none',
          }}
        >
          {filters.map((f, i) => (
            <div key={f.key} className="shrink-0">
              <Chip
                label={f.label}
                variant="text"
                size="small"
                state={i === 0 ? 'selected' : 'idle'}
              />
            </div>
          ))}
        </div>
      )}

      {/* Result cards — BaseCard (DS) */}
      {cards.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', padding: '0 var(--spacing-06)' }}>
          {cards.map((card) => (
            <BaseCard
              key={card.key}
              size="small"
              filled={false}
              category={card.category ?? card.status}
              showCategory={!!(card.category ?? card.status)}
              title={card.title}
              showTitle
              subtitle={card.subtitle ?? card.description}
              showSubtitle={!!(card.subtitle ?? card.description)}
              leftAsset={false}
              rightAsset={false}
              action={card.linkLabel ? 'link' : 'none'}
              linkLabel={card.linkLabel ?? ''}
              showSlot={false}
              width="100%"
            />
          ))}
        </div>
      )}

      {/* Help card — BaseCard (DS) */}
      {helpCard && (
        <div style={{ padding: '0 var(--spacing-06)' }}>
          <HelpCardBlock helpCard={helpCard} />
        </div>
      )}
    </div>
  )
}

// ─── List / Settings layout ───────────────────────────────────────────────────

function ListLayout({ template }: { template: GeneratedTemplate }) {
  const { sections = [], helpCard } = template

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)' }}>
      {sections.map((section, si) => (
        <div key={si}>
          {/* Section title */}
          {section.title && (
            <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
              <h2 style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-md)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-content-primary)',
                margin: 0,
              }}>
                {section.title}
              </h2>
            </div>
          )}

          {/* ListItems — DS */}
          <div>
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

      {/* Help card — BaseCard (DS) */}
      {helpCard && (
        <div style={{ padding: '0 var(--spacing-06)' }}>
          <HelpCardBlock helpCard={helpCard} />
        </div>
      )}
    </div>
  )
}

// ─── Home layout ──────────────────────────────────────────────────────────────

function HomeLayout({ template }: { template: GeneratedTemplate }) {
  const { greeting, userName, quickActions = [], sections = [], helpCard } = template

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-08)' }}>

      {/* Greeting */}
      {(greeting || userName) && (
        <div style={{ padding: '0 var(--spacing-06)' }}>
          <h1 style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            margin: 0,
          }}>
            {greeting} <span style={{ color: 'var(--color-brand)' }}>{userName}.</span>
          </h1>
        </div>
      )}

      {/* Quick actions — ListItem (DS) */}
      {quickActions.length > 0 && (
        <div>
          <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
            <h2 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: 0,
            }}>
              Acesso rápido
            </h2>
          </div>
          <div>
            {quickActions.map((action, i) => (
              <ListItem
                key={action.key}
                title={action.label}
                size="small"
                leftSide="icon"
                icon={<Icon name={action.icon || 'star-outline'} size={20} color="var(--color-content-primary)" />}
                rightAsset="icon"
                rightIconElement={<Icon name="chevron-right" size={20} color="var(--color-content-tertiary)" />}
                divider={i < quickActions.length - 1}
                fullWidth
              />
            ))}
          </div>
        </div>
      )}

      {/* Extra sections (if any) — same as ListLayout */}
      {sections.map((section, si) => (
        <div key={si}>
          {section.title && (
            <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
              <h2 style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-md)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-content-primary)',
                margin: 0,
              }}>
                {section.title}
              </h2>
            </div>
          )}
          <div>
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

      {/* Help card — BaseCard (DS) */}
      {helpCard && (
        <div style={{ padding: '0 var(--spacing-06)' }}>
          <HelpCardBlock helpCard={helpCard} />
        </div>
      )}
    </div>
  )
}

// ─── Shared ───────────────────────────────────────────────────────────────────

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
      width="100%"
    />
  )
}
