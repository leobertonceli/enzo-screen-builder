import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type ChatBubbleVariant = 'text' | 'reply' | 'document' | 'media'

export interface ChatBubbleProps {
  variant?: ChatBubbleVariant
  text?: string
  time?: string
  /** Reply variant — author name */
  replyAuthor?: string
  /** Reply variant — quoted text */
  replyText?: string
  /** Document variant — file name */
  fileName?: string
  /** Document variant — file format label */
  fileFormat?: string
  /** Media variant — array of image URLs (length determines grid layout: 1, 2, 3, 4, 4+) */
  images?: string[]
  reaction?: boolean
  reactionEmoji?: string
  width?: string | number
}

/* ─── Shared text styles ─── */
const font: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  lineHeight: 'var(--line-height-title)',
  margin: 0,
}

/* ─── Sub-components ─── */

function MessageRow({ text, time }: { text: string; time: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)',
      alignItems: 'flex-end',
      paddingLeft: 'var(--spacing-03)', paddingRight: 'var(--spacing-03)',
      width: '100%', boxSizing: 'border-box',
    }}>
      <p style={{ ...font, fontSize: 'var(--font-size-sm)', color: 'var(--color-content-primary)', width: '100%' }}>{text}</p>
      <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: 'var(--color-content-tertiary)', textAlign: 'right', whiteSpace: 'nowrap' }}>{time}</p>
    </div>
  )
}

function MediaCell({ src, style }: { src?: string; style?: CSSProperties }) {
  return (
    <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-gray-20)', position: 'relative', ...style }}>
      {src && <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />}
    </div>
  )
}

function MediaGrid({ images }: { images: string[] }) {
  const total = images.length
  const showExtra = total > 4
  const extra = total - 4

  if (total <= 1) {
    return <MediaCell src={images[0]} style={{ width: 220, height: 220, flexShrink: 0 }} />
  }

  if (total === 2) {
    return (
      <div style={{ display: 'flex', gap: 4, flexShrink: 0, height: 108 }}>
        <MediaCell src={images[0]} style={{ flex: '1 0 0', height: '100%' }} />
        <MediaCell src={images[1]} style={{ flex: '1 0 0', height: '100%' }} />
      </div>
    )
  }

  if (total === 3) {
    return (
      <div style={{ display: 'flex', gap: 4, flexShrink: 0, width: 220, height: 220 }}>
        <MediaCell src={images[0]} style={{ flex: '1 0 0', height: '100%' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 0 0' }}>
          <MediaCell src={images[1]} style={{ flex: '1 0 0', width: '100%' }} />
          <MediaCell src={images[2]} style={{ flex: '1 0 0', width: '100%' }} />
        </div>
      </div>
    )
  }

  // 4 or 4+
  return (
    <div style={{ display: 'flex', gap: 4, flexShrink: 0, width: 220, height: 220 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 0 0' }}>
        <MediaCell src={images[0]} style={{ flex: '1 0 0', width: '100%' }} />
        <MediaCell src={images[1]} style={{ flex: '1 0 0', width: '100%' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 0 0' }}>
        <MediaCell src={images[2]} style={{ flex: '1 0 0', width: '100%' }} />
        {/* Last cell — may have "+N" overlay */}
        <div style={{ flex: '1 0 0', width: '100%', overflow: 'hidden', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-gray-20)', position: 'relative' }}>
          {images[3] && <img src={images[3]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />}
          {showExtra && (
            <>
              <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', backgroundColor: 'var(--color-black-20)' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...font, fontSize: 'var(--font-size-md)', color: 'var(--color-gray-white)' }}>
                +{extra}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main component ─── */

export function ChatBubble({
  variant = 'text',
  text = 'Lorem ipsum is simply text of the printing and typesetting.',
  time = '09:41',
  replyAuthor = 'Alice',
  replyText = 'Lorem ipsum is simply text of the printing and typesetting.',
  fileName = 'Nome do arquivo',
  fileFormat = 'PDF',
  images = [],
  reaction = false,
  reactionEmoji = '❤️',
  width = '100%',
}: ChatBubbleProps) {
  const isText = variant === 'text'
  const isReply = variant === 'reply'
  const isDoc = variant === 'document'
  const isMedia = variant === 'media'

  const bubbleStyle: CSSProperties = {
    borderTopLeftRadius: 'var(--radius-xl)',
    borderTopRightRadius: 'var(--radius-xl)',
    borderBottomLeftRadius: 'var(--radius-xl)',
    borderBottomRightRadius: 'var(--radius-xs)',
    backgroundColor: 'var(--color-gray-10)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: 283,
    flexShrink: 0,
    position: 'relative',
    ...(isText
      ? { padding: 'var(--spacing-04)', gap: 'var(--spacing-01)' }
      : {
          paddingTop: 'var(--spacing-01)',
          paddingBottom: 'var(--spacing-04)',
          paddingLeft: 'var(--spacing-01)',
          paddingRight: 'var(--spacing-01)',
          gap: 'var(--spacing-03)',
        }),
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      paddingLeft: 80,
      paddingRight: 'var(--spacing-03)',
      paddingTop: 'var(--spacing-04)',
      paddingBottom: 'var(--spacing-04)',
      position: 'relative',
      width,
      boxSizing: 'border-box',
    }}>
      <div style={bubbleStyle}>

        {/* ── Text ── */}
        {isText && (
          <>
            <p style={{ ...font, fontSize: 'var(--font-size-sm)', color: 'var(--color-content-primary)', maxWidth: 251 }}>{text}</p>
            <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: 'var(--color-content-tertiary)', textAlign: 'right' }}>{time}</p>
          </>
        )}

        {/* ── Reply ── */}
        {isReply && (
          <>
            <div style={{ backgroundColor: 'var(--color-black-05)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-03)', width: '100%', flexShrink: 0, boxSizing: 'border-box' }}>
              <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: 'var(--color-content-secondary)', marginBottom: 2 }}>{replyAuthor}</p>
              <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: 'var(--color-content-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{replyText}</p>
            </div>
            <MessageRow text={text} time={time} />
          </>
        )}

        {/* ── Document ── */}
        {isDoc && (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 'var(--spacing-03)',
              height: 48,
              paddingLeft: 'var(--spacing-01)', paddingRight: 'var(--spacing-04)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-black-05)',
              flexShrink: 0, width: '100%', boxSizing: 'border-box',
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-gray-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="file-document-outline" size={20} color="var(--color-content-primary)" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: 'var(--color-content-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fileName}</p>
                <p style={{ ...font, fontSize: 'var(--font-size-xs)', color: 'var(--color-content-tertiary)' }}>{fileFormat}</p>
              </div>
            </div>
            <MessageRow text={text} time={time} />
          </>
        )}

        {/* ── Media ── */}
        {isMedia && (
          <>
            <MediaGrid images={images} />
            <MessageRow text={text} time={time} />
          </>
        )}

      </div>

      {/* ── Reaction badge ── */}
      {reaction && (
        <div style={{
          position: 'absolute', bottom: 'var(--spacing-01)', right: 24,
          backgroundColor: 'var(--color-gray-10)',
          border: '1.5px solid var(--color-gray-white)',
          borderRadius: 22, height: 24, width: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14,
        }}>
          {reactionEmoji}
        </div>
      )}
    </div>
  )
}
