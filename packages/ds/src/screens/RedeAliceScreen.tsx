import { ListItem } from '../components/ListItem'
import { BaseCard } from '../components/BaseCard'
import { Icon } from '../icons/Icon'
import { Slot } from '../playground/TemplateEditContext'

/* ── Asset URLs from Figma ── */
const doctorImage = 'https://www.figma.com/api/mcp/asset/27e3e5d6-bc49-414f-8522-3a43b9554682'
const logoAliceIA = 'https://www.figma.com/api/mcp/asset/670d1b20-b9b0-49b8-9a6c-8f72657fc3d0'
const avatarMeuPlano = 'https://www.figma.com/api/mcp/asset/c31ed3fc-bd55-46a5-b3e6-0678c53b9ff1'

/* ── Red tag for missing DS components ── */
function MissingTag({ label }: { label: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'var(--spacing-02)',
        right: 'var(--spacing-02)',
        backgroundColor: '#E53935',
        color: 'var(--color-gray-white)',
        fontSize: 'var(--font-size-xs)',
        fontFamily: 'var(--font-family-base)',
        fontWeight: 'var(--font-weight-medium)',
        padding: '2px 8px',
        borderRadius: 'var(--radius-pill)',
        zIndex: 10,
        lineHeight: '1.4',
      }}
    >
      {label}
    </div>
  )
}

/* ── List items data ── */
const menuItems = [
  { title: 'Meus favoritos', icon: 'star-outline' },
  { title: 'Prontos-Socorros', icon: 'alert-outline' },
  { title: 'Especialistas e Clínicas', icon: 'clipboard-text-outline' },
  { title: 'Laboratórios', icon: 'flask-outline' },
  { title: 'Maternindades', icon: 'baby-carriage' },
  { title: 'Interações hospitalares', icon: 'hospital-box-outline' },
]

/* ── NavBar tabs ── */
const navTabs = [
  { label: 'Alice Agora', icon: 'heart-outline', active: false },
  { label: 'Minha saúde', icon: 'pulse', active: false },
  { label: 'Rede Alice', icon: 'map-marker', active: true },
  { label: 'Meu plano', icon: 'account-circle', active: false, avatar: avatarMeuPlano },
]

export function RedeAliceScreen() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 375,
        minHeight: 812,
        backgroundColor: 'var(--color-surface)',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* ═══ STATUS BAR — não temos no DS ═══ */}
      <div style={{ position: 'relative', height: 44, width: '100%' }}>
        <MissingTag label="StatusBar — fora do DS" />
        <div
          className="flex items-center justify-between"
          style={{
            height: 44,
            padding: '0 var(--spacing-06)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
            }}
          >
            9:41
          </span>
        </div>
      </div>

      {/* ═══ HEADER — não temos no DS ═══ */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="PageTitle — fora do DS" />
        <div
          className="flex items-center justify-between"
          style={{
            padding: 'var(--spacing-08) var(--spacing-06) var(--spacing-04)',
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--spacing-01)' }}>
            <span
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-primary)',
                lineHeight: '1.16',
              }}
            >
              Rede Alice
            </span>
            <span
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-brand)',
                lineHeight: '1.16',
              }}
            >
              Diogo
            </span>
          </div>
          <Icon name="bell" size={24} color="var(--color-content-primary)" />
        </div>
      </div>

      {/* ═══ DOCTOR CARD — não temos no DS ═══ */}
      <div
        style={{
          position: 'relative',
          padding: '0 var(--spacing-06)',
          marginBottom: 'var(--spacing-04)',
        }}
      >
        <MissingTag label="CardMFC — fora do DS" />
        <div
          className="flex overflow-hidden"
          style={{
            border: '1px solid rgba(20,20,20,0.1)',
            borderRadius: 24,
            padding: 'var(--spacing-01)',
          }}
        >
          {/* Left content */}
          <div
            className="flex flex-col justify-between flex-1"
            style={{
              padding: 'var(--spacing-04) var(--spacing-04) var(--spacing-02)',
              minHeight: 168,
            }}
          >
            <div className="flex flex-col" style={{ gap: 'var(--spacing-01)' }}>
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'var(--color-content-secondary)',
                  lineHeight: '1.24',
                }}
              >
                Minha médica
              </span>
              <span
                style={{
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-content-primary)',
                  lineHeight: '1.24',
                }}
              >
                Isabella Moreira Hueb
              </span>
            </div>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--spacing-02) 0',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                fontFamily: 'var(--font-family-base)',
                color: 'var(--color-brand)',
                letterSpacing: 'var(--letter-spacing-button)',
                lineHeight: '1.24',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Agendar consulta
            </button>
          </div>
          {/* Right image */}
          <div
            style={{
              width: 116,
              borderRadius: 20,
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src={doctorImage}
              alt="Dra. Isabella Moreira Hueb"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      {/* ═══ LISTA — usa ListItem do DS ✅ ═══ */}
      <div className="flex flex-col" style={{ marginTop: 'var(--spacing-08)' }}>
        {menuItems.map((item, index) => (
          <Slot key={item.title} id={`ListItem-${index}`}>
            <ListItem
              title={item.title}
              size="small"
              leftSide="icon"
              rightAsset="icon"
              icon={<Icon name={item.icon} size={24} color="var(--color-content-primary)" />}
              divider={index < menuItems.length - 1}
            />
          </Slot>
        ))}
      </div>

      {/* ═══ CARD DE AJUDA — usa BaseCard do DS ✅ ═══ */}
      <div
        className="flex justify-center"
        style={{ padding: 'var(--spacing-06) var(--spacing-06) 0' }}
      >
        <Slot id="BaseCard-0">
          <BaseCard
            size="small"
            filled={false}
            showCategory={false}
            title="Precisa de ajuda com sua rede credenciada?"
            showTitle
            showSubtitle={false}
            leftAsset
            leftIcon={
              <img
                src={logoAliceIA}
                alt="Alice IA"
                style={{ width: 20, height: 20, borderRadius: 'var(--radius-sm)' }}
              />
            }
            rightAsset={false}
            action="link"
            linkLabel="Falar no Alice Agora"
            showSlot={false}
            width="100%"
          />
        </Slot>
      </div>

      {/* ═══ NAVBAR — não temos no DS ═══ */}
      <div
        style={{
          position: 'relative',
          marginTop: 'var(--spacing-08)',
          borderTop: '1px solid var(--color-divider)',
        }}
      >
        <MissingTag label="NavBar — fora do DS" />
        <div
          className="flex items-start justify-around"
          style={{
            padding: 'var(--spacing-02) var(--spacing-03) var(--spacing-08)',
            backgroundColor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {navTabs.map((tab) => (
            <div
              key={tab.label}
              className="flex flex-col items-center"
              style={{ gap: 'var(--spacing-01)', flex: 1, paddingTop: 'var(--spacing-02)' }}
            >
              {tab.avatar ? (
                <img
                  src={tab.avatar}
                  alt={tab.label}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 'var(--radius-pill)',
                    objectFit: 'cover',
                    opacity: tab.active ? 1 : 0.3,
                  }}
                />
              ) : (
                <Icon
                  name={tab.icon}
                  size={24}
                  color={tab.active ? 'var(--color-brand)' : 'rgba(20,20,20,0.3)'}
                />
              )}
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: tab.active ? 'var(--color-brand)' : 'rgba(20,20,20,0.3)',
                  lineHeight: '1.24',
                }}
              >
                {tab.label}
              </span>
              {tab.active && (
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--color-brand)',
                    marginTop: 2,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
