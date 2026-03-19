import { useState } from 'react'
import { Chip } from '../components/Chip'
import { ListItem } from '../components/ListItem'
import { Icon } from '../icons/Icon'

const categories = [
  { id: 'all', label: 'Todos', icon: 'view-grid' },
  { id: 'food', label: 'Alimentacao', icon: 'food-apple' },
  { id: 'transport', label: 'Transporte', icon: 'car' },
  { id: 'health', label: 'Saude', icon: 'heart-pulse' },
  { id: 'entertainment', label: 'Lazer', icon: 'gamepad-variant' },
  { id: 'education', label: 'Educacao', icon: 'school' },
]

const results = [
  {
    id: '1',
    title: 'Supermercado Central',
    description: 'Compras do mes',
    icon: 'cart',
    category: 'food',
    rightText: 'R$ 450,00',
  },
  {
    id: '2',
    title: 'Uber',
    description: 'Corrida para o escritorio',
    icon: 'car',
    category: 'transport',
    rightText: 'R$ 32,50',
  },
  {
    id: '3',
    title: 'Farmacia Popular',
    description: 'Medicamentos',
    icon: 'pill',
    category: 'health',
    rightText: 'R$ 89,90',
  },
  {
    id: '4',
    title: 'Cinema IMAX',
    description: 'Ingressos fim de semana',
    icon: 'movie-open',
    category: 'entertainment',
    rightText: 'R$ 65,00',
  },
  {
    id: '5',
    title: 'Curso de React',
    description: 'Mensalidade plataforma online',
    icon: 'laptop',
    category: 'education',
    rightText: 'R$ 49,90',
  },
  {
    id: '6',
    title: 'Padaria Boa Massa',
    description: 'Cafe da manha',
    icon: 'bread-slice',
    category: 'food',
    rightText: 'R$ 18,00',
  },
  {
    id: '7',
    title: 'Metro',
    description: 'Recarga do cartao',
    icon: 'train',
    category: 'transport',
    rightText: 'R$ 100,00',
  },
  {
    id: '8',
    title: 'Academia FitLife',
    description: 'Mensalidade',
    icon: 'dumbbell',
    category: 'health',
    rightText: 'R$ 120,00',
  },
]

export function FiltersScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredResults =
    selectedCategory === 'all'
      ? results
      : results.filter((r) => r.category === selectedCategory)

  const totalItems = filteredResults.length

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        backgroundColor: 'var(--color-surface-bg)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-04)',
          backgroundColor: 'var(--color-surface)',
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
          Filtros
        </h1>
        <Icon name="magnify" size={24} color="var(--color-content-primary)" />
      </div>

      {/* Category Chips */}
      <div
        className="flex overflow-x-auto"
        style={{
          padding: 'var(--spacing-04) var(--spacing-06)',
          gap: 'var(--spacing-02)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            label={cat.label}
            variant="icon"
            size="md"
            state={selectedCategory === cat.id ? 'selected' : 'idle'}
            iconElement={<Icon name={cat.icon} size={20} />}
            onClick={() => setSelectedCategory(cat.id)}
          />
        ))}
      </div>

      {/* Results count */}
      <div
        className="flex items-center"
        style={{
          padding: 'var(--spacing-04) var(--spacing-06)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-family-label)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-secondary)',
            letterSpacing: 'var(--letter-spacing-para)',
            lineHeight: 'var(--line-height-label)',
          }}
        >
          {totalItems} {totalItems === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      {/* Results List */}
      <div
        className="flex flex-col flex-1"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        }}
      >
        {filteredResults.map((item, index) => (
          <ListItem
            key={item.id}
            title={item.title}
            description={item.description}
            size="large"
            leftSide="icon"
            icon={
              <Icon
                name={item.icon}
                size={24}
                color="var(--color-content-primary)"
              />
            }
            rightAsset="text"
            rightText={item.rightText}
            divider={index < filteredResults.length - 1}
          />
        ))}

        {filteredResults.length === 0 && (
          <div
            className="flex flex-col items-center justify-center"
            style={{
              padding: 'var(--spacing-08)',
              gap: 'var(--spacing-03)',
            }}
          >
            <Icon
              name="filter-off"
              size={48}
              color="var(--color-content-tertiary)"
            />
            <span
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-md)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-content-tertiary)',
                lineHeight: 'var(--line-height-label)',
              }}
            >
              Nenhum resultado encontrado
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
