import { BaseCard } from '../components/BaseCard'
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

const consultas = [
  { key: 'isabella', title: 'Dra. Isabella Moreira', description: 'Clínico geral · Última consulta: 04/03', icon: 'account-outline' },
  { key: 'pedro', title: 'Dr. Pedro Alvares', description: 'Ortopedia · Última consulta: 12/02', icon: 'account-outline' },
]

export function EspecialistasScreenV2() {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        minHeight: '100vh',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* StatusBar */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="StatusBar — fora do DS" />
        <div style={{ height: 44, backgroundColor: 'var(--color-surface)' }} />
      </div>

      {/* NavBar com back arrow */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="NavBar — fora do DS" />
        <div
          className="flex items-center"
          style={{ padding: 'var(--spacing-04) var(--spacing-06)' }}
        >
          <Icon name="arrow-left" size={24} color="var(--color-content-primary)" />
        </div>
      </div>

      {/* Título */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-06)' }}>
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
          Especialistas
        </h1>
      </div>

      {/* Card — destaque/promo */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-06)' }}>
        <BaseCard
          size="lg"
          filled={false}
          category="Disponível hoje"
          showCategory
          title="Agende sua consulta"
          showTitle
          subtitle="Encontre o especialista ideal para você"
          showSubtitle
          leftAsset
          leftIcon={<Icon name="stethoscope" size={24} color="var(--color-content-primary)" />}
          rightAsset={false}
          action="button"
          buttonLabel="Buscar especialista"
          showSlot={false}
          width="100%"
        />
      </div>

      {/* Título de seção */}
      <div style={{ paddingLeft: 'var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
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
          Consultas recentes
        </h2>
      </div>

      {/* 2 ListItems */}
      <div>
        {consultas.map((item, i) => (
          <ListItem
            key={item.key}
            title={item.title}
            description={item.description}
            size="small"
            leftSide="icon"
            rightAsset="icon"
            icon={<Icon name={item.icon} size={20} color="var(--color-content-primary)" />}
            divider={i < consultas.length - 1}
          />
        ))}
      </div>

      {/* Mais um card — suporte */}
      <div style={{ padding: 'var(--spacing-06)' }}>
        <BaseCard
          size="sm"
          filled={false}
          category="Dúvidas"
          showCategory
          title="Como agendar uma consulta?"
          showTitle
          subtitle="Tire suas dúvidas sobre consultas online e presenciais"
          showSubtitle
          leftAsset
          leftIcon={<Icon name="help-circle-outline" size={20} color="var(--color-content-primary)" />}
          rightAsset={false}
          action="link"
          linkLabel="Saiba mais"
          showSlot={false}
          width="100%"
        />
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
