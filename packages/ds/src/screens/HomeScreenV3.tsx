import { BaseCard } from '../components/BaseCard'
import { Chip } from '../components/Chip'
import { ListItem } from '../components/ListItem'
import { Icon } from '../icons/Icon'

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

const quickActions = [
  { key: 'restaurantes', label: 'Restaurantes', icon: 'food' },
  { key: 'mercados', label: 'Mercados', icon: 'cart' },
  { key: 'farmacias', label: 'Farmácias', icon: 'pill' },
  { key: 'lojas', label: 'Lojas', icon: 'store' },
  { key: 'servicos', label: 'Serviços', icon: 'wrench' },
]

const menuItems = [
  { key: 'pedidos', title: 'Meus pedidos', description: 'Acompanhe seus pedidos recentes', icon: 'clipboard-text-outline' },
  { key: 'favoritos', title: 'Favoritos', description: 'Seus lugares salvos', icon: 'heart-outline' },
  { key: 'enderecos', title: 'Endereços', description: 'Gerencie seus endereços', icon: 'map-marker-outline' },
  { key: 'pagamentos', title: 'Pagamentos', description: 'Formas de pagamento', icon: 'credit-card-outline' },
]

export function HomeScreenV3() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        minHeight: '100vh',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* Status bar placeholder */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="StatusBar — fora do DS" />
        <div style={{ height: 44, backgroundColor: 'var(--color-surface)' }} />
      </div>

      {/* Header */}
      <div
        style={{
          padding: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-04)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
            margin: 0,
          }}
        >
          Olá, boas-vindas!
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-family-label)',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-content-secondary)',
            lineHeight: 'var(--line-height-para-md)',
            margin: 0,
            marginTop: 'var(--spacing-01)',
          }}
        >
          O que você procura hoje?
        </p>
      </div>

      {/* Quick actions — horizontal chips */}
      <div
        className="flex overflow-x-auto"
        style={{
          paddingLeft: 'var(--spacing-06)',
          paddingRight: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-06)',
          gap: 'var(--spacing-02)',
          scrollbarWidth: 'none',
        }}
      >
        {quickActions.map((item) => (
          <div key={item.key} className="shrink-0">
            <Chip
              label={item.label}
              variant="icon"
              size="sm"
              state="idle"
              iconElement={<Icon name={item.icon} size={20} color="var(--color-content-primary)" />}
            />
          </div>
        ))}
      </div>

      {/* Promo card — BaseCard outlined, stacked, no slot (image is fora do DS) */}
      <div
        style={{
          paddingLeft: 'var(--spacing-06)',
          paddingRight: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-06)',
        }}
      >
        <BaseCard
          size="lg"
          filled={false}
          category="Novidade"
          showCategory
          title="Frete grátis"
          showTitle
          subtitle="Aproveite frete grátis em pedidos acima de R$50"
          showSubtitle
          leftAsset
          leftIcon={<Icon name="truck-delivery-outline" size={24} color="var(--color-content-primary)" />}
          rightAsset={false}
          action="button"
          buttonLabel="Ver ofertas"
          showSlot={false}
          width="100%"
        />
      </div>

      {/* Section title */}
      <div style={{ paddingLeft: 'var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
            margin: 0,
          }}
        >
          Acesso rápido
        </h2>
      </div>

      {/* Menu list items */}
      <div>
        {menuItems.map((item, i) => (
          <ListItem
            key={item.key}
            title={item.title}
            description={item.description}
            size="small"
            leftSide="icon"
            rightAsset="icon"
            icon={<Icon name={item.icon} size={20} color="var(--color-content-primary)" />}
            divider={i < menuItems.length - 1}
          />
        ))}
      </div>

      {/* Help card */}
      <div
        style={{
          paddingLeft: 'var(--spacing-06)',
          paddingRight: 'var(--spacing-06)',
          paddingTop: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-08)',
        }}
      >
        <BaseCard
          size="sm"
          filled={false}
          category="Suporte"
          showCategory
          title="Precisa de ajuda?"
          showTitle
          subtitle="Fale com nosso atendimento"
          showSubtitle
          leftAsset
          leftIcon={<Icon name="help-circle-outline" size={20} color="var(--color-content-primary)" />}
          rightAsset={false}
          action="link"
          linkLabel="Falar com suporte"
          showSlot={false}
          width="100%"
        />
      </div>

      {/* Nav bar placeholder */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="NavBar — fora do DS" />
        <div
          style={{
            height: 64,
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-divider)',
          }}
        />
      </div>
    </div>
  )
}
