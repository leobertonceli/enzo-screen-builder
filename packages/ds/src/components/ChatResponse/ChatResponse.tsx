import { Icon } from '../../icons/Icon'

export type ChatFileType = 'none' | 'media' | 'document'

export interface ChatResponseProps {
  loading?: boolean
  sender?: boolean
  title?: string
  showTitle?: boolean
  text?: string
  time?: string
  file?: ChatFileType
  suggestions?: string[]
  reaction?: boolean
  reply?: boolean
  replyText?: string
  className?: string
}

export function ChatResponse({
  loading = false,
  sender = true,
  title = 'Title',
  showTitle = true,
  text = 'Lorem ipsum is simply dummy text.',
  time = '17:44',
  file = 'none',
  suggestions,
  reaction = false,
  reply = false,
  replyText = '',
  className,
}: ChatResponseProps) {
  return (
    <>
      <style>{`
        @keyframes ds-brand-pulse {
          0%   { opacity: 0.5; }
          50%  { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>

      <div
        className={className}
        style={{
          width: 375,
          paddingTop: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-04)',
          paddingLeft: 'var(--spacing-06)',
          paddingRight: 'var(--spacing-12)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-02)',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        {/* Sender avatar */}
        {sender && (
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginBottom: 'var(--spacing-01)',
            }}
          >
            <Icon name="smart-toy" size={20} color="var(--color-gray-white)" />
          </div>
        )}

        {loading ? (
          /* Loading state */
          <div
            style={{
              fontSize: 'var(--font-size-sm)',
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-regular)' as any,
              background: 'linear-gradient(90deg, var(--color-brand) 0%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'ds-brand-pulse 1.5s ease-in-out infinite',
            }}
          >
            Gerando resposta...
          </div>
        ) : (
          /* Normal state */
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            {/* Reply block */}
            {reply && (
              <div
                style={{
                  backgroundColor: 'var(--color-black-05)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--spacing-03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-regular)' as any,
                    color: 'var(--color-content-tertiary)',
                  }}
                >
                  Você
                </span>
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-regular)' as any,
                    color: 'var(--color-content-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {replyText}
                </span>
              </div>
            )}

            {/* Text section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {showTitle && title && (
                <span
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-medium)' as any,
                    color: 'var(--color-content-primary)',
                  }}
                >
                  {title}
                </span>
              )}
              {text && (
                <span
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-regular)' as any,
                    color: 'var(--color-content-primary)',
                  }}
                >
                  {text}
                </span>
              )}
            </div>

            {/* Media placeholder */}
            {file === 'media' && (
              <div
                style={{
                  width: 156,
                  height: 196,
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="image-outline" size={32} color="var(--color-content-tertiary)" />
              </div>
            )}

            {/* Document card */}
            {file === 'document' && (
              <div
                style={{
                  width: 303,
                  height: 64,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-magenta-00)',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 'var(--spacing-03)',
                  padding: 'var(--spacing-02) var(--spacing-03)',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-gray-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name="file-document-outline" size={20} color="var(--color-content-primary)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      fontFamily: 'var(--font-family-base)',
                      fontWeight: 'var(--font-weight-regular)' as any,
                      color: 'var(--color-content-primary)',
                    }}
                  >
                    Nome do arquivo
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-base)',
                      fontWeight: 'var(--font-weight-regular)' as any,
                      color: 'var(--color-content-secondary)',
                    }}
                  >
                    Format • 00 itens
                  </span>
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions && suggestions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
                {suggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--color-stroke)',
                      paddingTop: 'var(--spacing-04)',
                      paddingBottom: 'var(--spacing-04)',
                      paddingLeft: 'var(--spacing-05)',
                      paddingRight: 'var(--spacing-05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--font-size-sm)',
                        fontFamily: 'var(--font-family-base)',
                        fontWeight: 'var(--font-weight-regular)' as any,
                        color: 'var(--color-content-primary)',
                        textAlign: 'center',
                      }}
                    >
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Time + reaction row */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {time && (
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-regular)' as any,
                    color: 'var(--color-content-tertiary)',
                  }}
                >
                  {time}
                </span>
              )}
              {reaction && (
                <div
                  style={{
                    height: 24,
                    minWidth: 32,
                    paddingLeft: 'var(--spacing-02)',
                    paddingRight: 'var(--spacing-02)',
                    borderRadius: 22,
                    backgroundColor: 'var(--color-surface-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontSize: 14 }}>👍</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
