import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

/* ── Types ───────────────────────────────────────────────────────── */
export type ChatInputState =
  | 'idle'
  | 'focus'
  | 'typing'
  | 'recording'
  | 'transcribing'
  | 'loading'
  | 'disabled'

export interface ChatInputAttachedItem {
  id: string
  preview?: string
  type?: 'image' | 'document' | 'video'
  state?: 'idle' | 'loading'
  label?: string       // filename for document, duration for video
}

export interface ChatInputProps {
  state?: ChatInputState
  items?: ChatInputAttachedItem[]
  reply?: boolean
  replyName?: string
  replyMessage?: string
  placeholder?: string
  value?: string
  showMic?: boolean
  showPlus?: boolean
  onChange?: (value: string) => void
  onSend?: () => void
  onMic?: () => void
  onAdd?: () => void
  onRemoveItem?: (id: string) => void
  onDismissReply?: () => void
  width?: number | string
}

/* ── CSS keyframes (injected once) ───────────────────────────────── */
const STYLE_ID = 'chatinput-keyframes'
function injectKeyframes() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `@keyframes ci-spin{to{transform:rotate(360deg)}}@keyframes ci-blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes ci-bar{0%,100%{transform:scaleY(0.35)}50%{transform:scaleY(1)}}`
  document.head.appendChild(style)
}

/* ── Send Button ─────────────────────────────────────────────────── */
function SendButton({ active, loading }: { active: boolean; loading: boolean }) {
  injectKeyframes()
  return (
    <div
      style={{
        width: 32, height: 32,
        borderRadius: 'var(--radius-pill)',
        backgroundColor: active ? 'var(--color-brand)' : 'var(--color-black-05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: active ? 'pointer' : 'default',
        flexShrink: 0,
        transition: 'background-color 0.15s',
      }}
    >
      {loading ? (
        <div style={{
          width: 20, height: 20,
          border: '2px solid var(--color-black-10)',
          borderTopColor: 'var(--color-brand)',
          borderRadius: '50%',
          animation: 'ci-spin 0.8s linear infinite',
        }} />
      ) : (
        <Icon
          name="arrow-up"
          size={20}
          color={active ? 'var(--color-gray-white)' : 'rgba(20,20,20,0.3)'}
        />
      )}
    </div>
  )
}

/* ── Mic Button ──────────────────────────────────────────────────── */
function MicButton({ active = false, disabled = false }: { active?: boolean; disabled?: boolean }) {
  return (
    <div style={{
      width: 32, height: 32,
      borderRadius: 'var(--radius-pill)',
      backgroundColor: active ? 'var(--color-black-10)' : 'transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'default' : 'pointer',
      flexShrink: 0,
      opacity: disabled ? 0.3 : 1,
    }}>
      <Icon name={active ? 'stop' : 'microphone'} size={20} color="var(--color-content-primary)" />
    </div>
  )
}

/* ── Plus Button ─────────────────────────────────────────────────── */
function PlusButton({ disabled = false }: { disabled?: boolean }) {
  return (
    <div style={{
      width: 32, height: 32,
      borderRadius: 'var(--radius-pill)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'default' : 'pointer',
      flexShrink: 0,
      opacity: disabled ? 0.3 : 1,
    }}>
      <Icon name="plus" size={20} color="var(--color-content-primary)" />
    </div>
  )
}

/* ── Attached Item — Image / Video / Document with idle/loading states ── */
function AttachedItem({ item, onRemove }: { item: ChatInputAttachedItem; onRemove?: () => void }) {
  injectKeyframes()
  const itemType = item.type || 'image'
  const isLoading = item.state === 'loading'
  const isDocument = itemType === 'document'
  const isVideo = itemType === 'video'
  const isImage = itemType === 'image'

  // Close button bg depends on type
  const closeBg = isDocument
    ? 'var(--color-black-05)'
    : isVideo
      ? 'var(--color-black-10)'
      : 'var(--color-black-20)'

  return (
    <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
      <div style={{
        width: 96, height: 96,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        backgroundColor: isDocument ? 'var(--color-gray-white)' : 'var(--color-surface-subtle)',
        position: 'relative',
      }}>
        {/* Image / Video thumbnail */}
        {(isImage || isVideo) && item.preview && (
          <img
            src={item.preview}
            alt=""
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              borderRadius: 'var(--radius-lg)',
              filter: isLoading ? 'blur(8px)' : undefined,
            }}
          />
        )}

        {/* Video dark overlay */}
        {isVideo && !isLoading && (
          <div style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-lg)',
          }} />
        )}

        {/* Video duration label */}
        {isVideo && !isLoading && (
          <span style={{
            position: 'absolute', left: 12, bottom: 8,
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-gray-white)',
            lineHeight: 'var(--line-height-title)',
          }}>{item.label || '30s'}</span>
        )}

        {/* Document layout */}
        {isDocument && (
          <>
            <span style={{
              position: 'absolute', left: 12, top: 12,
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-tertiary)',
              lineHeight: 'var(--line-height-title)',
            }}>PDF</span>
            <span style={{
              position: 'absolute', left: 12, bottom: 8, width: 72,
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              lineHeight: 'var(--line-height-title)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{item.label || 'Documento'}</span>
          </>
        )}

        {/* Loading spinner overlay */}
        {isLoading && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 32, height: 32,
              border: '2px solid var(--color-white-20)',
              borderTopColor: 'var(--color-gray-white)',
              borderRadius: '50%',
              animation: 'ci-spin 0.8s linear infinite',
            }} />
          </div>
        )}
      </div>

      {/* Close / delete button */}
      {!isLoading && (
        <button type="button" onClick={onRemove} style={{
          position: 'absolute', top: 4, right: 4,
          width: 32, height: 32,
          borderRadius: 'var(--radius-pill)',
          backgroundColor: closeBg,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer', padding: 0,
        }}>
          <Icon name="close" size={16} color={isDocument ? 'var(--color-content-primary)' : 'var(--color-gray-white)'} />
        </button>
      )}
    </div>
  )
}

/* ── Reply Banner — Figma: bg chip with name (tertiary) + message (primary) ── */
function ReplyBanner({
  name,
  message,
  onDismiss,
}: {
  name: string
  message: string
  onDismiss?: () => void
}) {
  return (
    <div style={{ padding: 4, width: '100%', boxSizing: 'border-box' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        height: 48,
        backgroundColor: 'var(--color-black-05)',
        borderRadius: 20,
        paddingLeft: 12, paddingRight: 8, paddingTop: 4, paddingBottom: 4,
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          flex: 1, minWidth: 0,
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-regular)',
          lineHeight: 'var(--line-height-title)',
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-content-tertiary)',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{name}</span>
          <span style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-content-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>{message}</span>
        </div>
        <div
          onClick={onDismiss}
          style={{
            width: 32, height: 32,
            borderRadius: 'var(--radius-pill)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <Icon name="close" size={20} color="var(--color-content-primary)" />
        </div>
      </div>
    </div>
  )
}

/* ── Animated Sound Wave (recording) — all bars animate, smooth ─── */
function AnimatedSoundWave() {
  injectKeyframes()
  const containerRef = useRef<HTMLDivElement>(null)
  const barWidth = 2
  const barGap = 2
  const maxBars = 80

  // Seed random heights once so they don't change on re-render
  const heights = useRef(
    Array.from({ length: maxBars }, () => 4 + Math.random() * 18)
  ).current
  const durations = useRef(
    Array.from({ length: maxBars }, () => 0.6 + Math.random() * 0.6)
  ).current
  const delays = useRef(
    Array.from({ length: maxBars }, (_, i) => (i * 0.04) % 1.5)
  ).current

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex', alignItems: 'center', gap: barGap,
        height: 24, width: '100%', boxSizing: 'border-box',
        overflow: 'hidden', flexWrap: 'nowrap',
      }}
    >
      {Array.from({ length: maxBars }, (_, i) => (
        <div
          key={i}
          style={{
            width: barWidth,
            minWidth: barWidth,
            height: heights[i],
            borderRadius: 2,
            backgroundColor: 'var(--color-content-primary)',
            flexShrink: 0,
            transformOrigin: 'center',
            animation: `ci-bar ${durations[i]}s ease-in-out ${delays[i]}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Text content shared styles ───────────────────────────────────── */
const TEXT_MIN_HEIGHT = 20

const textBase: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-regular)',
  lineHeight: 'var(--line-height-title)',
  minHeight: TEXT_MIN_HEIGHT,
  display: 'block',
}

/* ── Main Component ──────────────────────────────────────────────── */
export function ChatInput({
  state = 'idle',
  items = [],
  reply = false,
  replyName = 'Clara Boris',
  replyMessage = 'Olá, como vai você?',
  placeholder = 'Descreva o que você precisa',
  value = '',
  showMic = true,
  showPlus = true,
  onChange,
  onSend,
  onMic,
  onAdd,
  onRemoveItem,
  onDismissReply,
  width = 327,
}: ChatInputProps) {
  const isDisabled = state === 'disabled'
  const isRecording = state === 'recording'
  const isTranscribing = state === 'transcribing'
  const isLoading = state === 'loading'
  const isTyping = state === 'typing'
  const isFocus = state === 'focus'

  const hasText = value.trim().length > 0
  const sendActive = (isTyping && hasText) || isRecording

  return (
    <div style={{
      width,
      backgroundColor: 'var(--color-black-05)',
      borderRadius: 24,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
      opacity: isDisabled ? 0.4 : 1,
      boxSizing: 'border-box',
    }}>

      {/* Reply banner */}
      {reply && (
        <ReplyBanner
          name={replyName}
          message={replyMessage}
          onDismiss={onDismissReply}
        />
      )}

      {/* Attached items */}
      {items.length > 0 && (
        <div style={{
          display: 'flex', gap: 'var(--spacing-02)', padding: 'var(--spacing-01)',
          overflowX: 'auto', scrollbarWidth: 'none',
        }}>
          {items.map((item) => (
            <div key={item.id} style={{ flexShrink: 0 }}>
              <AttachedItem item={item} onRemove={() => onRemoveItem?.(item.id)} />
            </div>
          ))}
        </div>
      )}

      {/* ── Content area — same height for all states ── */}
      {isRecording ? (
        <div style={{
          padding: 'var(--spacing-04) var(--spacing-05)',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
        }}>
          <AnimatedSoundWave />
        </div>
      ) : (
        <div style={{
          padding: 'var(--spacing-04) var(--spacing-05)',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
        }}>

          {/* IDLE — placeholder text in tertiary */}
          {state === 'idle' && (
            <span style={{
              ...textBase,
              color: 'var(--color-content-tertiary)',
            }}>{placeholder}</span>
          )}

          {/* FOCUS — just blinking cursor, no text */}
          {isFocus && (
            <span style={{
              ...textBase,
              color: 'var(--color-brand)',
              animation: 'ci-blink 1s step-end infinite',
            }}>|</span>
          )}

          {/* TYPING — text in primary + cursor in brand */}
          {isTyping && (
            <span style={{
              ...textBase,
              maxHeight: 136,
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}>
              <span style={{ color: 'var(--color-content-primary)' }}>{value || placeholder}</span>
              <span style={{
                color: 'var(--color-brand)',
                animation: 'ci-blink 1s step-end infinite',
              }}>|</span>
            </span>
          )}

          {/* LOADING — text in disabled color */}
          {isLoading && (
            <span style={{
              ...textBase,
              color: '#C2C2C2',
            }}>{placeholder}</span>
          )}

          {/* TRANSCRIBING — secondary */}
          {isTranscribing && (
            <span style={{
              ...textBase,
              color: 'var(--color-content-secondary)',
            }}>Transcrevendo áudio...</span>
          )}

          {/* DISABLED — placeholder in tertiary */}
          {isDisabled && (
            <span style={{
              ...textBase,
              color: 'var(--color-content-tertiary)',
            }}>{placeholder}</span>
          )}
        </div>
      )}

      {/* ── Bottom bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--spacing-03) var(--spacing-03)',
        width: '100%', boxSizing: 'border-box',
      }}>
        {/* Left: Plus (normal) or Stop (recording) */}
        {isRecording ? (
          <div onClick={onMic}><MicButton active /></div>
        ) : showPlus ? (
          <div onClick={!isDisabled && !isLoading ? onAdd : undefined}>
            <PlusButton disabled={isDisabled || isLoading} />
          </div>
        ) : (
          <div style={{ width: 32 }} />
        )}

        {/* Right: Mic + Send */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)' }}>
          {showMic && !isRecording && (
            <div onClick={!isDisabled && !isLoading ? onMic : undefined}>
              <MicButton disabled={isDisabled || isLoading} />
            </div>
          )}
          <div onClick={sendActive ? onSend : undefined}>
            <SendButton active={sendActive} loading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  )
}
