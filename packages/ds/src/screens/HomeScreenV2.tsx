import { BaseCard } from '../components/BaseCard'
import { Button } from '../components/Button'
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

const categories = [
  {
    key: 'restaurantes',
    category: 'Alimentação',
    title: 'Restaurantes',
    subtitle: 'Peça comida dos seus restaurantes favoritos',
    icon: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop',
    buttonLabel: 'Ver restaurantes',
  },
  {
    key: 'mercados',
    category: 'Compras',
    title: 'Mercados',
    subtitle: 'Faça suas compras de supermercado',
    icon: 'cart',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop',
    buttonLabel: 'Ver mercados',
  },
  {
    key: 'farmacias',
    category: 'Saúde',
    title: 'Farmácias',
    subtitle: 'Medicamentos e produtos de saúde',
    icon: 'pill',
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=200&fit=crop',
    buttonLabel: 'Ver farmácias',
  },
  {
    key: 'lojas',
    category: 'Compras',
    title: 'Lojas',
    subtitle: 'Encontre produtos de diversas lojas',
    icon: 'store',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
    buttonLabel: 'Ver lojas',
  },
]

export function HomeScreenV2() {
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

      {/* Category Cards — stacked vertically */}
      <div
        className="flex flex-col"
        style={{
          padding: 'var(--spacing-06)',
          gap: 'var(--spacing-04)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
            margin: 0,
          }}
        >
          Categorias
        </h2>

        {categories.map((cat) => (
          <BaseCard
            key={cat.key}
            size="large"
            filled={false}
            category={cat.category}
            showCategory
            title={cat.title}
            showTitle
            subtitle={cat.subtitle}
            showSubtitle
            leftAsset
            leftIcon={<Icon name={cat.icon} size={24} color="var(--color-brand)" />}
            rightAsset={false}
            action="button"
            buttonLabel={cat.buttonLabel}
            showSlot
            slot={
              <div style={{ position: 'relative' }}>
                <MissingTag label="Image — fora do DS" />
                <div
                  style={{
                    width: '100%',
                    height: '140px',
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
              </div>
            }
            width="100%"
            className="w-full"
          />
        ))}
      </div>
    </div>
  )
}
