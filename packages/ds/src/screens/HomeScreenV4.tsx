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

const exameItems = [
  { key: 'analises', title: 'Análises', description: 'Nenhuma análise feita', icon: 'flask-outline' },
  { key: 'resultados', title: 'Resultados', description: 'Nenhum resultado', icon: 'file-document-outline' },
  { key: 'anexar', title: 'Anexar arquivos de saúde', description: 'Carteira de vacinação, exames antigos...', icon: 'paperclip' },
]

export function HomeScreenV4() {
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

      {/* Header — page title + notification */}
      <div
        className="flex items-start justify-between"
        style={{ padding: 'var(--spacing-06)', paddingBottom: 'var(--spacing-04)' }}
      >
        <div>
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
            Minha saúde <span style={{ color: 'var(--color-brand)' }}>André</span>
          </h1>
        </div>
        <div style={{ position: 'relative' }}>
          <MissingTag label="NotificationBell — fora do DS" />
          <Icon name="bell-outline" size={24} color="var(--color-content-primary)" />
        </div>
      </div>

      {/* ── Hero card (magenta) — fora do DS ── */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-04)' }}>
        <div style={{ position: 'relative' }}>
          <MissingTag label="HeroCard — fora do DS" />
          <div
            style={{
              backgroundColor: 'var(--color-brand)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--spacing-05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'rgba(255,255,255,0.7)',
                  display: 'block',
                }}
              >
                Plano de ação
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-gray-white)',
                  display: 'block',
                  marginTop: 'var(--spacing-01)',
                }}
              >
                Sem tarefas pendentes
              </span>
            </div>
            <Icon name="chevron-right" size={20} color="var(--color-gray-white)" />
          </div>
        </div>
      </div>

      {/* ── Próxima consulta — BaseCard DS ── */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-03)' }}>
        <BaseCard
          size="sm"
          filled={false}
          category="Próxima consulta"
          showCategory
          title="Terça, 04 de Março — 16h"
          showTitle
          subtitle="Online com Isabella"
          showSubtitle
          leftAsset={false}
          rightAsset={false}
          action="link"
          linkLabel="Ver consulta"
          showSlot={false}
          width="100%"
        />
      </div>

      {/* ── Minha médica — BaseCard DS ── */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-06)' }}>
        <BaseCard
          size="sm"
          filled={false}
          category="Minha médica"
          showCategory
          title="Isabella Moreira Hueb"
          showTitle
          showSubtitle={false}
          leftAsset={false}
          rightAsset={false}
          action="link"
          linkLabel="Agendar consulta"
          showSlot={false}
          width="100%"
        />
      </div>

      {/* ── Score card — fora do DS ── */}
      <div style={{ padding: '0 var(--spacing-06)', paddingBottom: 'var(--spacing-06)' }}>
        <div style={{ position: 'relative' }}>
          <MissingTag label="ScoreCard — fora do DS" />
          <div
            style={{
              border: '1px solid var(--color-stroke)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-06)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-secondary)',
                display: 'block',
                marginBottom: 'var(--spacing-04)',
              }}
            >
              Score Magenta
            </span>
            <div className="flex items-center" style={{ gap: 'var(--spacing-04)' }}>
              {/* Score circle placeholder */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 'var(--radius-pill)',
                  border: '3px solid var(--color-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-family-base)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--color-content-primary)',
                  }}
                >
                  774
                </span>
              </div>
              {/* Bar indicators placeholder */}
              <div className="flex items-end" style={{ gap: 4, height: 40 }}>
                {[16, 28, 40, 32, 20, 36, 24].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: h,
                      borderRadius: 3,
                      backgroundColor: i < 5 ? 'var(--color-brand)' : 'var(--color-stroke)',
                    }}
                  />
                ))}
              </div>
            </div>
            <button
              type="button"
              style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-brand)',
                background: 'none',
                border: 'none',
                padding: 'var(--spacing-02) 0',
                marginTop: 'var(--spacing-03)',
                cursor: 'pointer',
              }}
            >
              Ver score completo
            </button>
          </div>
        </div>
      </div>

      {/* ── Section title — Exames ── */}
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
          Exames
        </h2>
      </div>

      {/* ── Exame list items — ListItem DS ── */}
      <div>
        {exameItems.map((item, i) => (
          <ListItem
            key={item.key}
            title={item.title}
            description={item.description}
            size="small"
            leftSide="icon"
            rightAsset="icon"
            icon={<Icon name={item.icon} size={20} color="var(--color-content-primary)" />}
            divider={i < exameItems.length - 1}
          />
        ))}
      </div>

      {/* ── Quick actions — Chips DS (horizontal) ── */}
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
          Acesso rápido
        </h2>
      </div>
      <div
        className="flex overflow-x-auto"
        style={{
          paddingLeft: 'var(--spacing-06)',
          paddingRight: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-08)',
          gap: 'var(--spacing-02)',
          scrollbarWidth: 'none',
        }}
      >
        {[
          { key: 'emergencia', label: 'Emergência', icon: 'alert-circle-outline' },
          { key: 'sintomas', label: 'Sintomas', icon: 'thermometer' },
          { key: 'rede', label: 'Rede credenciada', icon: 'map-marker-outline' },
          { key: 'autorizacoes', label: 'Autorizações', icon: 'file-check-outline' },
          { key: 'reembolsos', label: 'Reembolsos', icon: 'cash-refund' },
        ].map((item) => (
          <div key={item.key} className="shrink-0">
            <Chip
              label={item.label}
              variant="icon"
              size="sm"
              state="idle"
              iconElement={<Icon name={item.icon} size={16} color="var(--color-content-primary)" />}
            />
          </div>
        ))}
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
