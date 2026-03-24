import { BaseCard } from '../components/BaseCard'
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

const especialidades = [
  { key: 'clinico',    title: 'Clínico geral',    description: '128 médicos disponíveis', icon: 'stethoscope' },
  { key: 'cardio',     title: 'Cardiologia',       description: '42 médicos disponíveis',  icon: 'heart-pulse' },
  { key: 'dermato',    title: 'Dermatologia',      description: '37 médicos disponíveis',  icon: 'face-man-outline' },
  { key: 'orto',       title: 'Ortopedia',         description: '29 médicos disponíveis',  icon: 'bone' },
  { key: 'pedia',      title: 'Pediatria',         description: '54 médicos disponíveis',  icon: 'baby-face-outline' },
  { key: 'psico',      title: 'Psicologia',        description: '61 médicos disponíveis',  icon: 'head-cog-outline' },
]

export function RedeCredenciadaScreen() {
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

      {/* 1. Título da página */}
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
          Rede credenciada
        </h1>
      </div>

      {/* 2. Card grande com botão de ação */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-06)' }}>
        <Slot id="BaseCard-0">
          <BaseCard
            size="large"
            filled={false}
            category="Encontre perto de você"
            showCategory
            title="Clínicas e hospitais"
            showTitle
            subtitle="Veja todos os estabelecimentos credenciados no seu plano"
            showSubtitle
            leftAsset
            leftIcon={<Icon name="map-marker-outline" size={24} color="var(--color-content-primary)" />}
            rightAsset={false}
            action="button"
            buttonLabel="Ver no mapa"
            showSlot={false}
            width="100%"
          />
        </Slot>
      </div>

      {/* 3. Seção "Especialidades" */}
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
          Especialidades
        </h2>
      </div>

      {/* 6 itens de lista */}
      <div>
        {especialidades.map((item, i) => (
          <Slot key={item.key} id={`ListItem-${i}`}>
            <ListItem
              title={item.title}
              description={item.description}
              size="small"
              leftSide="icon"
              rightAsset="icon"
              icon={<Icon name={item.icon} size={20} color="var(--color-content-primary)" />}
              divider={i < especialidades.length - 1}
            />
          </Slot>
        ))}
      </div>

      {/* 4. Card pequeno com link de ajuda */}
      <div style={{ padding: 'var(--spacing-06)' }}>
        <Slot id="BaseCard-1">
          <BaseCard
            size="small"
            filled={false}
            category="Dúvidas"
            showCategory
            title="Como usar a rede credenciada?"
            showTitle
            subtitle="Entenda como funciona o atendimento no seu plano"
            showSubtitle
            leftAsset
            leftIcon={<Icon name="help-circle-outline" size={20} color="var(--color-content-primary)" />}
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
