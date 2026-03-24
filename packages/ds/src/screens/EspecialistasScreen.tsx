import { BaseCard } from '../components/BaseCard'
import { Chip } from '../components/Chip'
import { ListItem } from '../components/ListItem'
import { Icon } from '../icons/Icon'
import { Slot } from '../playground/TemplateEditContext'

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

export interface EspecialistasContent {
  pageTitle: string
  searchPlaceholder: string
  specialties: { key: string; label: string }[]
  doctors: {
    key: string
    name: string
    specialty: string
    rating: string
    availability: string
    imageUrl: string
  }[]
  recentSection: string
  recentDoctors: {
    key: string
    title: string
    description: string
  }[]
  helpCard: {
    category: string
    title: string
    subtitle: string
    linkLabel: string
  }
}

export const defaultEspecialistasContent: EspecialistasContent = {
  pageTitle: 'Especialistas',
  searchPlaceholder: 'Buscar médico ou especialidade',
  specialties: [
    { key: 'todos', label: 'Todos' },
    { key: 'clinico', label: 'Clínico geral' },
    { key: 'dermato', label: 'Dermatologia' },
    { key: 'cardio', label: 'Cardiologia' },
    { key: 'orto', label: 'Ortopedia' },
    { key: 'neuro', label: 'Neurologia' },
  ],
  doctors: [
    {
      key: 'isabella',
      name: 'Dra. Isabella Moreira',
      specialty: 'Clínico geral',
      rating: '4.9',
      availability: 'Disponível hoje',
      imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face',
    },
    {
      key: 'carlos',
      name: 'Dr. Carlos Mendes',
      specialty: 'Cardiologia',
      rating: '4.8',
      availability: 'Próxima: Quinta, 10h',
      imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face',
    },
    {
      key: 'ana',
      name: 'Dra. Ana Beatriz Costa',
      specialty: 'Dermatologia',
      rating: '5.0',
      availability: 'Disponível amanhã',
      imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=80&h=80&fit=crop&crop=face',
    },
  ],
  recentSection: 'Consultas recentes',
  recentDoctors: [
    { key: 'rec-isabella', title: 'Dra. Isabella Moreira', description: 'Clínico geral · Última consulta: 04/03' },
    { key: 'rec-pedro', title: 'Dr. Pedro Alvares', description: 'Ortopedia · Última consulta: 12/02' },
  ],
  helpCard: {
    category: 'Dúvidas',
    title: 'Como funciona o agendamento?',
    subtitle: 'Tire suas dúvidas sobre consultas online e presenciais',
    linkLabel: 'Saiba mais',
  },
}

export function EspecialistasScreen({ content }: { content?: EspecialistasContent }) {
  const c = content ?? defaultEspecialistasContent

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        minHeight: '100vh',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* Status bar */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="StatusBar — fora do DS" />
        <div style={{ height: 44, backgroundColor: 'var(--color-surface)' }} />
      </div>

      {/* Navigation bar (back) */}
      <div
        className="flex items-center"
        style={{ padding: 'var(--spacing-04) var(--spacing-06)' }}
      >
        <Icon name="arrow-left" size={24} color="var(--color-content-primary)" />
      </div>

      {/* Page title */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-04)' }}>
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
          {c.pageTitle}
        </h1>
      </div>

      {/* Search bar — fora do DS */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-04)' }}>
        <div style={{ position: 'relative' }}>
          <MissingTag label="SearchBar — fora do DS" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-03)',
              padding: 'var(--spacing-04)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-stroke)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <Icon name="magnify" size={20} color="var(--color-content-tertiary)" />
            <span
              style={{
                fontFamily: 'var(--font-family-label)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-tertiary)',
              }}
            >
              {c.searchPlaceholder}
            </span>
          </div>
        </div>
      </div>

      {/* Specialty chips — horizontal scroll */}
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
        {c.specialties.map((item, i) => (
          <div key={item.key} className="shrink-0">
            <Slot id={`Chip-${i}`}>
              <Chip
                label={item.label}
                variant="text"
                size="small"
                state={i === 0 ? 'selected' : 'idle'}
              />
            </Slot>
          </div>
        ))}
      </div>

      {/* Doctor cards — fora do DS */}
      <div
        className="flex flex-col"
        style={{ padding: '0 var(--spacing-06)', gap: 'var(--spacing-03)' }}
      >
        {c.doctors.map((doc) => (
          <div key={doc.key} style={{ position: 'relative' }}>
            <MissingTag label="DoctorCard — fora do DS" />
            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-04)',
                padding: 'var(--spacing-05)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-stroke)',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1" style={{ gap: 2 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-content-primary)',
                  }}
                >
                  {doc.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-family-label)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: 'var(--color-content-secondary)',
                  }}
                >
                  {doc.specialty} · ⭐ {doc.rating}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-family-label)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: 'var(--color-brand)',
                    marginTop: 'var(--spacing-01)',
                  }}
                >
                  {doc.availability}
                </span>
              </div>

              {/* Chevron */}
              <div className="flex items-center">
                <Icon name="chevron-right" size={20} color="var(--color-content-tertiary)" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section — recent */}
      <div style={{ paddingLeft: 'var(--spacing-06)', paddingTop: 'var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-md)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
            margin: 0,
          }}
        >
          {c.recentSection}
        </h2>
      </div>

      {/* Recent doctors — ListItem DS */}
      <div>
        {c.recentDoctors.map((item, i) => (
          <Slot key={item.key} id={`ListItem-${i}`}>
            <ListItem
              title={item.title}
              description={item.description}
              size="small"
              leftSide="icon"
              rightAsset="icon"
              icon={<Icon name="account-outline" size={20} color="var(--color-content-primary)" />}
              divider={i < c.recentDoctors.length - 1}
            />
          </Slot>
        ))}
      </div>

      {/* Help card — BaseCard DS */}
      <div style={{ padding: 'var(--spacing-06)' }}>
        <Slot id="BaseCard-0">
          <BaseCard
            size="small"
            filled={false}
            category={c.helpCard.category}
            showCategory
            title={c.helpCard.title}
            showTitle
            subtitle={c.helpCard.subtitle}
            showSubtitle
            leftAsset
            leftIcon={<Icon name="help-circle-outline" size={20} color="var(--color-content-primary)" />}
            rightAsset={false}
            action="link"
            linkLabel={c.helpCard.linkLabel}
            showSlot={false}
            width="100%"
          />
        </Slot>
      </div>

      {/* Nav bar */}
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
