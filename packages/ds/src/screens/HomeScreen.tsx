import { BaseCard } from '../components/BaseCard'
import { Icon } from '../icons/Icon'

const categories = [
  {
    key: 'restaurantes',
    category: 'Alimentação',
    title: 'Restaurantes',
    subtitle: 'Peça comida dos seus restaurantes favoritos',
    icon: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    buttonLabel: 'Explorar',
  },
  {
    key: 'mercados',
    category: 'Compras',
    title: 'Mercados',
    subtitle: 'Faça suas compras de supermercado',
    icon: 'cart',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop',
    buttonLabel: 'Explorar',
  },
  {
    key: 'farmacias',
    category: 'Saúde',
    title: 'Farmácias',
    subtitle: 'Medicamentos e produtos de saúde',
    icon: 'pill',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=200&fit=crop',
    buttonLabel: 'Explorar',
  },
  {
    key: 'lojas',
    category: 'Compras',
    title: 'Lojas',
    subtitle: 'Encontre produtos de diversas lojas',
    icon: 'store',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
    buttonLabel: 'Explorar',
  },
]

export function HomeScreen() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-bg)',
        minHeight: '100vh',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--spacing-06)',
          borderBottom: '1px solid var(--color-divider)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-medium)',
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

      {/* Category Grid */}
      <div
        style={{
          padding: 'var(--spacing-06)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
            margin: 0,
            marginBottom: 'var(--spacing-05)',
          }}
        >
          Categorias
        </h2>

        <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-04)' }}>
          {categories.map((cat) => (
            <BaseCard
              key={cat.key}
              size="sm"
              filled
              category={cat.category}
              showCategory
              title={cat.title}
              showTitle
              subtitle={cat.subtitle}
              showSubtitle
              leftAsset
              leftIcon={<Icon name={cat.icon} size={20} color="var(--color-brand)" />}
              rightAsset={false}
              action="button"
              buttonLabel={cat.buttonLabel}
              showSlot
              slot={
                <div
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              }
              width="100%"
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
