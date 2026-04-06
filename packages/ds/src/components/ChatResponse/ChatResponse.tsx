import { type CSSProperties } from 'react'
import { Chip } from '../Chip/Chip'
import { Avatar } from '../Avatar/Avatar'
import { Icon } from '../../icons/Icon'
import { ICON_SIZE } from '../../icons/iconSize'
import chatMediaPlaceholder from '../../assets/chat-media-placeholder.png'

// ─── Motion ───────────────────────────────────────────────────────────────────

const MOTION_STYLES = `
  @keyframes crSpinA {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes crSpinB {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes crSpinASlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes crSpinBSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(-360deg); }
  }
  @keyframes crShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`

let crStylesInjected = false
function injectStyles() {
  if (crStylesInjected) return
  crStylesInjected = true
  const el = document.createElement('style')
  el.textContent = MOTION_STYLES
  document.head.appendChild(el)
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChatResponseSender  = 'ai' | 'agent'
export type ChatResponseFile    = 'none' | 'media' | 'document'

export interface ChatResponseProps {
  /** Who is sending: the Alice AI or a human agent */
  sender?: ChatResponseSender
  /** Agent display name — shown next to the avatar (agent only) */
  agentName?: string
  /** Agent occupation/role shown below the name (agent only) */
  agentOccupation?: string
  /** Agent photo URL for the avatar (agent only) */
  agentPhotoUrl?: string
  /** Loading / thinking state */
  loading?: boolean
  /** Shows a quoted reply from the user */
  reply?: boolean
  replyText?: string
  /** Shows a bold title above the message body */
  showTitle?: boolean
  title?: string
  text?: string
  /** Attached file type */
  file?: ChatResponseFile
  /** URL for the media image (file="media") */
  mediaUrl?: string
  /** File name for document card (file="document") */
  documentName?: string
  /** Format label for document card */
  documentFormat?: string
  /** Item count for document card */
  documentCount?: string
  /** Suggestion chips shown below the message */
  suggestions?: string[]
  /** Reaction emoji pill */
  showReaction?: boolean
  timestamp?: string
  onSuggestionClick?: (s: string) => void
}

// ─── Shared font style ────────────────────────────────────────────────────────

const font: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  lineHeight: 'var(--line-height-title)',
  letterSpacing: 0,
  margin: 0,
}

// ─── Alice AI icon ────────────────────────────────────────────────────────────

function AliceAIIcon({ loading }: { loading: boolean }) {
  const animA: CSSProperties = {
    position: 'absolute', inset: 0,
    animation: loading
      ? 'crSpinA 2.5s linear infinite'
      : 'crSpinASlow 9s linear infinite',
  }
  const animB: CSSProperties = {
    position: 'absolute', inset: 0,
    animation: loading
      ? 'crSpinB 3.8s linear infinite'
      : 'crSpinBSlow 13s linear infinite',
  }

  return (
    <div style={{ width: 32, height: 32, flexShrink: 0, position: 'relative' }}>
      {/* Ring A — clockwise */}
      <div style={animA}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.8138 27.2267C8.81379 27.2267 3.13379 22.16 3.13379 15.9333C3.13379 9.70667 8.81379 4.65333 15.8138 4.65333C19.1205 4.65333 22.5338 6 25.1605 8.36C27.8138 10.7333 29.3338 13.8133 29.3338 16.8267C29.3338 19.84 27.8271 22.5333 25.0805 24.48C22.6005 26.24 19.2271 27.24 15.8138 27.24V27.2267ZM15.8138 6.6C9.89379 6.6 5.08046 10.7867 5.08046 15.9467C5.08046 21.1067 9.89379 25.2933 15.8138 25.2933C18.8271 25.2933 21.7871 24.4133 23.9471 22.8933C25.5205 21.7867 27.3871 19.8267 27.3871 16.8267C27.3871 14.3733 26.1071 11.8267 23.8671 9.81333C21.5871 7.77333 18.6538 6.6 15.8138 6.6Z" fill="url(#cr_g0a)"/>
          <path d="M15.8138 27.2267C8.81379 27.2267 3.13379 22.16 3.13379 15.9333C3.13379 9.70667 8.81379 4.65333 15.8138 4.65333C19.1205 4.65333 22.5338 6 25.1605 8.36C27.8138 10.7333 29.3338 13.8133 29.3338 16.8267C29.3338 19.84 27.8271 22.5333 25.0805 24.48C22.6005 26.24 19.2271 27.24 15.8138 27.24V27.2267ZM15.8138 6.6C9.89379 6.6 5.08046 10.7867 5.08046 15.9467C5.08046 21.1067 9.89379 25.2933 15.8138 25.2933C18.8271 25.2933 21.7871 24.4133 23.9471 22.8933C25.5205 21.7867 27.3871 19.8267 27.3871 16.8267C27.3871 14.3733 26.1071 11.8267 23.8671 9.81333C21.5871 7.77333 18.6538 6.6 15.8138 6.6Z" fill="url(#cr_g1a)"/>
          <defs>
            <linearGradient id="cr_g0a" x1="4.45379" y1="7.6" x2="41.8938" y2="35.2533" gradientUnits="userSpaceOnUse">
              <stop stopColor="#BE0380"/><stop offset="1" stopColor="#FF00BC"/>
            </linearGradient>
            <linearGradient id="cr_g1a" x1="7.04046" y1="12.1733" x2="26.7071" y2="20.72" gradientUnits="userSpaceOnUse">
              <stop offset="0.01" stopColor="#FFF0FA" stopOpacity="0.33"/>
              <stop offset="1" stopColor="white" stopOpacity="0.15"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Ring B — counter-clockwise */}
      <div style={animB}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.4 28.48C11.32 28.48 7.26671 26.8933 4.84004 23.84C2.81337 21.3067 2.17337 18.0267 3.05337 14.6133C3.85337 11.48 5.9067 8.4 8.69337 6.18667C14.36 1.66667 22.4267 2.34667 26.6934 7.69333C28.76 10.2933 29.64 13.5867 29.16 16.9733C28.68 20.3467 26.9067 23.4 24.1734 25.5867C21.72 27.5467 18.56 28.4933 15.4134 28.4933L15.4 28.48ZM5.85337 23.04C7.68004 25.3333 10.6934 26.8133 14.1067 27.1333C17.5467 27.44 20.92 26.5067 23.3467 24.5733C25.8267 22.6 27.4267 19.8267 27.8667 16.7867C28.2934 13.76 27.52 10.8133 25.68 8.50667C21.8534 3.72 14.6 3.13333 9.49337 7.2C6.93337 9.25333 5.04004 12.0667 4.3067 14.9333C3.53337 17.9467 4.09337 20.8267 5.85337 23.04Z" fill="url(#cr_g2)"/>
          <g opacity="0.3">
            <path d="M15.4 28.48C11.32 28.48 7.26671 26.8933 4.84004 23.84C2.81337 21.3067 2.17337 18.0267 3.05337 14.6133C3.85337 11.48 5.9067 8.4 8.69337 6.18667C14.36 1.66667 22.4267 2.34667 26.6934 7.69333C28.76 10.2933 29.64 13.5867 29.16 16.9733C28.68 20.3467 26.9067 23.4 24.1734 25.5867C21.72 27.5467 18.56 28.4933 15.4134 28.4933L15.4 28.48ZM5.85337 23.04C7.68004 25.3333 10.6934 26.8133 14.1067 27.1333C17.5467 27.44 20.92 26.5067 23.3467 24.5733C25.8267 22.6 27.4267 19.8267 27.8667 16.7867C28.2934 13.76 27.52 10.8133 25.68 8.50667C21.8534 3.72 14.6 3.13333 9.49337 7.2C6.93337 9.25333 5.04004 12.0667 4.3067 14.9333C3.53337 17.9467 4.09337 20.8267 5.85337 23.04Z" fill="white"/>
          </g>
          <path d="M18.2134 29.1067C17.84 29.1067 17.4534 29.0933 17.0534 29.0533C13.88 28.76 10.52 27.24 7.85337 24.8933C2.44004 20.12 1.56004 12.2267 5.90671 7.29333C10.2534 2.36 18.1867 2.24 23.6 7.01333C29 11.7733 29.96 20.96 25.5867 25.9333C23.76 28 21.1734 29.1067 18.2 29.1067H18.2134ZM14.56 4.49333C11.5467 4.49333 8.66671 5.65333 6.64004 7.94667C2.65338 12.4667 3.49338 19.7467 8.50671 24.16C11.0267 26.3733 14.1734 27.8 17.1467 28.08C17.5067 28.1067 17.8534 28.1333 18.2 28.1333C20.8934 28.1333 23.2267 27.1467 24.8534 25.28C26.76 23.12 27.64 19.92 27.28 16.4933C26.92 13.04 25.3334 9.85333 22.9467 7.74667C20.48 5.57333 17.4534 4.49333 14.5467 4.49333H14.56Z" fill="url(#cr_g3)"/>
          <g opacity="0.2">
            <path d="M18.2134 29.1067C17.84 29.1067 17.4534 29.0933 17.0534 29.0533C13.88 28.76 10.52 27.24 7.85337 24.8933C2.44004 20.12 1.56004 12.2267 5.90671 7.29333C10.2534 2.36 18.1867 2.24 23.6 7.01333C29 11.7733 29.96 20.96 25.5867 25.9333C23.76 28 21.1734 29.1067 18.2 29.1067H18.2134ZM14.56 4.49333C11.5467 4.49333 8.66671 5.65333 6.64004 7.94667C2.65338 12.4667 3.49338 19.7467 8.50671 24.16C11.0267 26.3733 14.1734 27.8 17.1467 28.08C17.5067 28.1067 17.8534 28.1333 18.2 28.1333C20.8934 28.1333 23.2267 27.1467 24.8534 25.28C26.76 23.12 27.64 19.92 27.28 16.4933C26.92 13.04 25.3334 9.85333 22.9467 7.74667C20.48 5.57333 17.4534 4.49333 14.5467 4.49333H14.56Z" fill="url(#cr_g4)"/>
          </g>
          <defs>
            <linearGradient id="cr_g2" x1="23.4134" y1="25.3467" x2="8.74671" y2="6.97333" gradientUnits="userSpaceOnUse">
              <stop offset="0.46" stopColor="#FF43C1"/>
              <stop offset="1" stopColor="#5B0043"/>
            </linearGradient>
            <linearGradient id="cr_g3" x1="20.56" y1="2.18667" x2="11.1734" y2="30.1733" gradientUnits="userSpaceOnUse">
              <stop offset="0.46" stopColor="#FF74D1"/>
              <stop offset="1" stopColor="#5B0043"/>
            </linearGradient>
            <linearGradient id="cr_g4" x1="11.2134" y1="6.66667" x2="21.2667" y2="27.56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF0FA" stopOpacity="0.33"/>
              <stop offset="1" stopColor="white" stopOpacity="0.53"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

// ─── Agent avatar + name ──────────────────────────────────────────────────────

function AgentSender({ name, occupation, photoUrl }: { name: string; occupation?: string; photoUrl?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)', flexShrink: 0 }}>
      <Avatar
        size="xsmall"
        type={photoUrl ? 'image' : 'placeholder'}
        src={photoUrl}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{
          ...font,
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
          color: 'var(--color-content-primary)',
        }}>{name}</span>
        {occupation && (
          <span style={{
            ...font,
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-content-tertiary)',
          }}>{occupation}</span>
        )}
      </div>
    </div>
  )
}

// ─── Reply bubble ─────────────────────────────────────────────────────────────

function ReplyBubble({ text }: { text: string }) {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--color-black-05)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--spacing-03)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      boxSizing: 'border-box',
    }}>
      <span style={{
        ...font,
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-content-tertiary)',
      }}>Você</span>
      <span style={{
        ...font,
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-content-primary)',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
      }}>{text}</span>
    </div>
  )
}

// ─── Document card ────────────────────────────────────────────────────────────

function DocumentCard({ name, format, count }: { name: string; format: string; count: string }) {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--spacing-03)',
      alignItems: 'center',
      height: 'var(--spacing-16)', // 64px
      borderRadius: 'var(--radius-sm)',
      backgroundColor: 'var(--color-brand-subtle)',
      paddingLeft: 'var(--spacing-02)',
      paddingRight: 'var(--spacing-06)',
      paddingTop: 'var(--spacing-02)',
      paddingBottom: 'var(--spacing-02)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* File icon in white square */}
      <div style={{
        width: 48,
        height: 48,
        flexShrink: 0,
        backgroundColor: 'var(--color-gray-white)',
        borderRadius: 'var(--radius-xs)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon name="paper" size={ICON_SIZE.md} color="var(--color-content-primary)" />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          ...font,
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-content-primary)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>{name}</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{
            ...font,
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-content-tertiary)',
            whiteSpace: 'nowrap',
          }}>{format}</span>
          <div style={{
            width: 3,
            height: 3,
            borderRadius: '50%',
            backgroundColor: 'var(--color-content-tertiary)',
            flexShrink: 0,
          }} />
          <span style={{
            ...font,
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-content-tertiary)',
            whiteSpace: 'nowrap',
          }}>{count} itens</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ChatResponse({
  sender           = 'ai',
  agentName        = 'Renata',
  agentOccupation,
  agentPhotoUrl,
  loading          = false,
  reply        = false,
  replyText    = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  showTitle    = false,
  title        = 'Título',
  text         = 'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
  file         = 'none',
  mediaUrl,
  documentName   = 'Nome do arquivo',
  documentFormat = 'PDF',
  documentCount  = '3',
  suggestions    = ['Suggestion 1', 'Suggestion 2'],
  showReaction   = false,
  timestamp      = '17:44',
  onSuggestionClick,
}: ChatResponseProps) {
  injectStyles()

  const SenderIcon = () =>
    sender === 'ai'
      ? <AliceAIIcon loading={loading} />
      : <AgentSender name={agentName} occupation={agentOccupation} photoUrl={agentPhotoUrl} />

  // ── Loading state ──────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-03)',
        paddingLeft: 'var(--spacing-06)',
        paddingRight: 'var(--spacing-12)',
        paddingTop: 'var(--spacing-06)',
        paddingBottom: 'var(--spacing-04)',
        boxSizing: 'border-box',
      }}>
        <SenderIcon />
        <p style={{
          ...font,
          fontSize: 'var(--font-size-sm)',
          lineHeight: '1.52',
          whiteSpace: 'nowrap',
          background: 'linear-gradient(90deg, var(--color-brand) 0%, transparent 40%, var(--color-brand) 80%)',
          backgroundSize: '300% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'crShimmer 4s ease-in-out infinite',
        }}>
          Digitando...
        </p>
      </div>
    )
  }

  // ── Normal state ───────────────────────────────────────────────────
  const showSuggestions = suggestions.length > 0

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-02)',
      paddingLeft: 'var(--spacing-06)',
      paddingRight: 'var(--spacing-12)',
      paddingTop: 'var(--spacing-06)',
      paddingBottom: 'var(--spacing-04)',
      boxSizing: 'border-box',
    }}>

      {/* Top — sender + optional reply + text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', width: '100%' }}>
        <SenderIcon />

        {reply && <ReplyBubble text={replyText} />}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          {showTitle && (
            <p style={{
              ...font,
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
              color: 'var(--color-content-primary)',
            }}>{title}</p>
          )}
          <p style={{
            ...font,
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-content-primary)',
          }}>{text}</p>
        </div>
      </div>

      {/* Bottom — file + suggestions + footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)', width: '100%' }}>

        {/* Media */}
        {file === 'media' && (
          <div style={{ paddingTop: 'var(--spacing-02)' }}>
            <div style={{
              width: 156,
              height: 196,
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-surface-bg)',
              flexShrink: 0,
            }}>
              <img
                src={mediaUrl ?? chatMediaPlaceholder}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
              />
            </div>
          </div>
        )}

        {/* Document */}
        {file === 'document' && (
          <div style={{ paddingTop: 'var(--spacing-02)', width: '100%' }}>
            <DocumentCard name={documentName} format={documentFormat} count={documentCount} />
          </div>
        )}

        {/* Suggestion chips */}
        {showSuggestions && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'var(--spacing-01)',
            paddingTop: 'var(--spacing-02)',
          }}>
            {suggestions.map((s) => (
              <Chip
                key={s}
                label={s}
                variant="text"
                size="medium"
                state="idle"
                onClick={() => onSuggestionClick?.(s)}
              />
            ))}
          </div>
        )}

        {/* Footer — timestamp + optional reaction */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 20,
        }}>
          <span style={{
            ...font,
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-content-tertiary)',
            flex: 1,
          }}>{timestamp}</span>

          {showReaction && (
            <div style={{
              height: 24,
              paddingLeft: 6,
              paddingRight: 6,
              borderRadius: 22,
              backgroundColor: 'var(--color-surface-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              gap: 3,
            }}>
              <span style={{ fontSize: 12, lineHeight: 1 }}>❤️</span>
              <span style={{
                ...font,
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-content-secondary)',
              }}>1</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
