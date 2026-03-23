import { ChatInput } from '../components/ChatInput/ChatInput'
import { Chip } from '../components/Chip'
import { Icon } from '../icons/Icon'

/* ── Out-of-DS label ──────────────────────────────────────────── */
function MissingTag({ label }: { label: string }) {
  return (
    <div style={{
      position: 'absolute', top: 'var(--spacing-02)', right: 'var(--spacing-02)',
      backgroundColor: '#E53935', color: 'var(--color-gray-white)',
      fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)',
      fontWeight: 'var(--font-weight-medium)', padding: '2px 8px',
      borderRadius: 'var(--radius-pill)', zIndex: 10, lineHeight: '1.4',
      pointerEvents: 'none',
    }}>{label}</div>
  )
}

/* ── Quick-reply suggestions (vertical pills) ────────────────── */
const suggestions = [
  'Estou com sintomas',
  'Preciso de uma receita',
  'Tenho exames para analisar',
  'Agendar consulta',
  'Estou em uma emergência',
]

/* ── Screen ──────────────────────────────────────────────────── */
export function AliceAgoraScreen() {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 844,
      fontFamily: 'var(--font-family-base)',
      overflowX: 'hidden',
    }}>

      {/* Status bar */}
      <div style={{ position: 'relative' }}>
        <MissingTag label="StatusBar — fora do DS" />
        <div style={{ height: 44, backgroundColor: 'var(--color-surface)' }} />
      </div>

      {/* ── Top nav ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--spacing-06)',
        height: 52,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)' }}>
          <Icon name="arrow-left" size={20} color="var(--color-content-primary)" />
        </div>

        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--color-content-primary)',
        }}>Alice</span>

        <div style={{
          width: 36, height: 36,
          borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--color-surface-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
        }}>
          <Icon name="history" size={18} color="var(--color-content-secondary)" />
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none' }}>

        {/* ── Alice avatar + greeting — left-aligned ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          padding: 'var(--spacing-08) var(--spacing-06) var(--spacing-06)',
          gap: 'var(--spacing-04)',
        }}>
          {/* Minimal identity mark — circle outline with letter */}
          <div style={{ position: 'relative' }}>
            <MissingTag label="AliceAvatar — fora do DS" />
            <div style={{
              width: 40, height: 40,
              borderRadius: 'var(--radius-pill)',
              border: '1.5px solid var(--color-brand)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-md)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-brand)',
                lineHeight: 1,
              }}>A</span>
            </div>
          </div>

          {/* Greeting */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-primary)',
              lineHeight: 1.2,
              margin: 0,
            }}>
              Olá, <span style={{ color: 'var(--color-brand)' }}>André.</span>
            </h1>
            <p style={{
              fontFamily: 'var(--font-family-label)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              margin: 'var(--spacing-02) 0 0',
              lineHeight: 1.5,
            }}>
              Como posso ajudar você hoje?
            </p>
          </div>
        </div>

        {/* ── Quick-reply suggestions — vertical pills ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          gap: 'var(--spacing-02)',
          padding: '0 var(--spacing-06)',
        }}>
          {suggestions.map((s) => (
            <div key={s} className="shrink-0">
              <Chip
                label={s}
                variant="text"
                size="sm"
                state="idle"
              />
            </div>
          ))}
        </div>

        {/* ── Disclaimer ── */}
        <p style={{
          fontFamily: 'var(--font-family-label)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-tertiary)',
          textAlign: 'center',
          lineHeight: 1.5,
          padding: 'var(--spacing-08) var(--spacing-08) var(--spacing-04)',
          margin: 0,
        }}>
          Alice é uma assistente de IA de saúde.<br />
          Em emergências, ligue <strong>192</strong> (SAMU).
        </p>

      </div>

      {/* ── ChatInput — sticky bottom ── */}
      <div style={{
        padding: 'var(--spacing-03) var(--spacing-04) var(--spacing-05)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        <ChatInput
          state="idle"
          placeholder="Pergunte para a Alice..."
          showMic
          showPlus={false}
          width="100%"
        />
      </div>

      {/* Nav bar placeholder */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <MissingTag label="NavBar — fora do DS" />
        <div style={{
          height: 64,
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-divider)',
        }} />
      </div>

    </div>
  )
}
