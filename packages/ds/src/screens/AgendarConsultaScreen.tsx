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

const filters = [
  { key: 'todos', label: 'Todos' },
  { key: 'clinico', label: 'Clínico Geral' },
  { key: 'cardio', label: 'Cardiologia' },
  { key: 'dermato', label: 'Dermatologia' },
  { key: 'orto', label: 'Ortopedia' },
  { key: 'neuro', label: 'Neurologia' },
]

const aliceDoctors = [
  {
    key: 'isabella',
    name: 'Dra. Isabella Moreira',
    specialty: 'Clínico Geral',
    availability: 'Disponível hoje',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=160&h=160&fit=crop&crop=face',
  },
  {
    key: 'carlos',
    name: 'Dr. Carlos Mendes',
    specialty: 'Cardiologia',
    availability: 'Próxima: Quinta, 10h',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=160&h=160&fit=crop&crop=face',
  },
  {
    key: 'ana',
    name: 'Dra. Ana Beatriz Costa',
    specialty: 'Dermatologia',
    availability: 'Disponível amanhã',
    imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=160&h=160&fit=crop&crop=face',
  },
  {
    key: 'pedro',
    name: 'Dr. Pedro Alvares',
    specialty: 'Ortopedia',
    availability: 'Disponível hoje',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=160&h=160&fit=crop&crop=face',
  },
]

const particularDoctors = [
  {
    key: 'joao',
    name: 'Dr. João Ferreira',
    specialty: 'Ortopedia',
    price: 'A partir de R$ 280',
  },
  {
    key: 'mariana',
    name: 'Dra. Mariana Lopes',
    specialty: 'Neurologia',
    price: 'A partir de R$ 350',
  },
  {
    key: 'paulo',
    name: 'Dr. Paulo Salave',
    specialty: 'Clínico Geral',
    price: 'A partir de R$ 180',
  },
]

export function AgendarConsultaScreen() {
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

      {/* Navigation bar */}
      <div
        className="flex items-center"
        style={{ padding: 'var(--spacing-04) var(--spacing-06)' }}
      >
        <Icon name="arrowLeft" size={24} color="var(--color-content-primary)" />
      </div>

      {/* Page title */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-05)' }}>
        <Slot id="pageTitle">
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
            Agendar consulta
          </h1>
        </Slot>
      </div>

      {/* Filters — horizontal scroll chips */}
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
        {filters.map((f, i) => (
          <div key={f.key} className="shrink-0">
            <Slot id={`filter-${f.key}`}>
              <Chip
                label={f.label}
                variant="text"
                size="small"
                state={i === 0 ? 'selected' : 'idle'}
              />
            </Slot>
          </div>
        ))}
      </div>

      {/* ─── Section: Agende pela Alice (primary) ─── */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-04)' }}>
        <div className="flex items-center" style={{ gap: 'var(--spacing-02)', marginBottom: 'var(--spacing-01)' }}>
          <Slot id="aliceSectionTitle">
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
              Agende pela Alice
            </h2>
          </Slot>
          <div
            style={{
              backgroundColor: 'var(--color-brand-subtle)',
              borderRadius: 'var(--radius-pill)',
              padding: '2px var(--spacing-02)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon name="success" size={12} color="var(--color-brand)" />
            <span
              style={{
                fontFamily: 'var(--font-family-label)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-brand)',
                lineHeight: 1,
              }}
            >
              Coberto pelo plano
            </span>
          </div>
        </div>
        <Slot id="aliceSectionSubtitle">
          <p
            style={{
              fontFamily: 'var(--font-family-label)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              margin: 0,
            }}
          >
            Consultas sem custo adicional, agendadas aqui mesmo.
          </p>
        </Slot>
      </div>

      {/* Alice doctor cards — carrossel horizontal com DoctorCard */}
      <div
        className="flex overflow-x-auto"
        style={{
          paddingLeft: 'var(--spacing-06)',
          paddingRight: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-04)',
          gap: 'var(--spacing-03)',
          scrollbarWidth: 'none',
        }}
      >
        {aliceDoctors.map((doc) => (
          <Slot key={doc.key} id={`alice-doctor-${doc.key}`}>
            <div className="shrink-0" style={{ position: 'relative' }}>
              <MissingTag label="DoctorCard — fora do DS" />
              <div
                style={{
                  width: 160,
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-stroke)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-surface)',
                }}
              >
                {/* Photo */}
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }}
                />
                {/* Info */}
                <div style={{ padding: 'var(--spacing-03)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-label)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: 'var(--color-brand)',
                    }}
                  >
                    {doc.specialty}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-content-primary)',
                      lineHeight: 'var(--line-height-title-sm)',
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
                    {doc.availability}
                  </span>
                  <button
                    style={{
                      marginTop: 'var(--spacing-02)',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-brand)',
                      letterSpacing: 'var(--letter-spacing-button)',
                    }}
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
          </Slot>
        ))}
      </div>

      {/* ─── Section divider ─── */}
      <div
        style={{
          height: 1,
          backgroundColor: 'var(--color-divider)',
          margin: '0 var(--spacing-06) 0',
        }}
      />

      {/* ─── Section: Consulta particular (secondary) ─── */}
      <div style={{ padding: 'var(--spacing-05) var(--spacing-06) var(--spacing-03)' }}>
        <Slot id="particularSectionTitle">
          <h2
            style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-secondary)',
              lineHeight: 'var(--line-height-title)',
              margin: 0,
              marginBottom: 'var(--spacing-01)',
            }}
          >
            Consulta particular
          </h2>
        </Slot>
        <Slot id="particularSectionSubtitle">
          <p
            style={{
              fontFamily: 'var(--font-family-label)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-tertiary)',
              margin: 0,
            }}
          >
            Agendamento diretamente com o médico, fora do plano.
          </p>
        </Slot>
      </div>

      {/* Particular doctors — ListItem */}
      <div>
        {particularDoctors.map((doc, i) => (
          <Slot key={doc.key} id={`particular-doctor-${doc.key}`}>
            <ListItem
              title={doc.name}
              description={`${doc.specialty} · ${doc.price}`}
              size="small"
              leftSide="icon"
              icon={<Icon name="user" size={20} color="var(--color-content-tertiary)" />}
              rightAsset="icon"
              divider={i < particularDoctors.length - 1}
            />
          </Slot>
        ))}
      </div>

      {/* Help card */}
      <div style={{ padding: 'var(--spacing-06)' }}>
        <Slot id="helpCard">
          <BaseCard
            size="small"
            filled={false}
            category="Dúvidas"
            showCategory
            title="Qual é a diferença entre os tipos de agendamento?"
            showTitle
            subtitle="Entenda como funciona cada modalidade e qual é a melhor pra você."
            showSubtitle
            leftAsset
            leftIcon={<Icon name="help" size={20} color="var(--color-content-primary)" />}
            rightAsset={false}
            action="link"
            linkLabel="Saiba mais"
            showSlot={false}
            width="100%"
          />
        </Slot>
      </div>

      {/* NavBar */}
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
