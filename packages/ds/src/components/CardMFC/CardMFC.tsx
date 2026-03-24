import type { CSSProperties } from 'react'
import { Link } from '../Link/Link'

export type CardMFCStyle = 'highlighted' | 'compact'

export interface CardMFCImageInset {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

export interface CardMFCProps {
  style?: CardMFCStyle
  name?: string
  bio?: string
  label?: string
  rating?: string
  distance?: string
  modality?: string
  imageUrl?: string
  /** Fine-tune how the photo is cropped inside the card (inset values relative to the container). Defaults to the Figma standard crop. */
  imageInset?: CardMFCImageInset
  /** Card width. Defaults to '100%' to fill the container. Pass a number (e.g. 319) to use a fixed Figma size. */
  width?: string | number
  linkLabel?: string
  onLinkClick?: () => void
  className?: string
}

const pillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  height: 24,
  paddingLeft: 'var(--spacing-03)',
  paddingRight: 'var(--spacing-03)',
  borderRadius: 'var(--radius-pill)',
  backgroundColor: 'var(--color-black-20)',
  flexShrink: 0,
}

const pillTextStyle: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  fontSize: 'var(--font-size-xs)',
  lineHeight: 'var(--line-height-title)',
  color: 'var(--color-gray-white)',
  whiteSpace: 'nowrap',
}

export function CardMFC({
  style = 'highlighted',
  name = 'Isabella Moreira Hueb',
  bio = 'Formada pela Faculdade de Medicina da Santa Casa de São Paulo, em 2018.',
  label = 'Minha médica',
  rating = '4.7',
  distance = '2.4 km',
  modality = 'Online e presencial',
  imageUrl,
  imageInset,
  width = '100%',
  linkLabel,
  onLinkClick,
  className,
}: CardMFCProps) {
  const inset = {
    top: imageInset?.top ?? '-8.19%',
    right: imageInset?.right ?? '-4.7%',
    bottom: imageInset?.bottom ?? '-8.19%',
    left: imageInset?.left ?? '-16.3%',
  }
  const isHighlighted = style === 'highlighted'
  const defaultLinkLabel = isHighlighted ? 'Ver detalhes' : 'Agendar consulta'

  if (isHighlighted) {
    return (
      <div
        className={className}
        style={{
          position: 'relative',
          width,
          height: 464,
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          flexShrink: 0,
          backgroundColor: 'var(--color-gray-30)',
        }}
      >
        {/* Photo — inner div extends beyond container to match Figma crop */}
        {imageUrl && (
          <div style={{
            position: 'absolute',
            top: inset.top,
            right: inset.right,
            bottom: inset.bottom,
            left: inset.left,
          }}>
            <img
              src={imageUrl}
              alt={name}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            />
          </div>
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(20,20,20,0) 30%, rgba(20,20,20,0.75) 100%)',
          }}
        />

        {/* Backdrop blur layer — fades in from 40% height */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            maskImage: 'linear-gradient(to bottom, transparent 40%, black 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 40%, black 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 'var(--spacing-06)',
            paddingBottom: 'var(--spacing-05)',
            paddingLeft: 'var(--spacing-06)',
            paddingRight: 'var(--spacing-06)',
          }}
        >
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', width: '100%' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
              fontSize: 'var(--font-size-md)',
              lineHeight: 'var(--line-height-title)',
              color: 'var(--color-gray-white)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {name}
            </p>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-title)',
              color: 'var(--color-white-60)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {bio}
            </p>
          </div>

          {/* Pills */}
          <div style={{ display: 'flex', gap: 'var(--spacing-01)', paddingTop: 'var(--spacing-04)', flexWrap: 'wrap' }}>
            {rating && (
              <div style={pillStyle}>
                <span style={pillTextStyle}>
                  {rating}
                  <span style={{ color: 'var(--color-white-60)' }}>/5</span>
                </span>
              </div>
            )}
            {distance && (
              <div style={pillStyle}>
                <span style={pillTextStyle}>{distance}</span>
              </div>
            )}
            {modality && (
              <div style={pillStyle}>
                <span style={pillTextStyle}>{modality}</span>
              </div>
            )}
          </div>

          {/* Link */}
          <div style={{ paddingTop: 'var(--spacing-06)' }}>
            <Link
              label={linkLabel || defaultLinkLabel}
              size="small"
              context="on-dark"
              icon="none"
              onClick={onLinkClick}
            />
          </div>
        </div>
      </div>
    )
  }

  // Compact
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width,
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-black-10)',
        padding: 'var(--spacing-01)',
        overflow: 'hidden',
        flexShrink: 0,
        boxSizing: 'border-box',
        backgroundColor: 'var(--color-gray-white)',
      }}
    >
      {/* Left */}
      <div style={{
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 168,
        paddingTop: 'var(--spacing-04)',
        paddingBottom: 'var(--spacing-02)',
        paddingLeft: 'var(--spacing-04)',
        paddingRight: 'var(--spacing-10)',
        minWidth: 0,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
            fontSize: 'var(--font-size-xs)',
            lineHeight: 'var(--line-height-title)',
            color: 'var(--color-content-secondary)',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {label}
          </p>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
            fontSize: 'var(--font-size-md)',
            lineHeight: 'var(--line-height-title)',
            color: 'var(--color-content-primary)',
            margin: 0,
          }}>
            {name}
          </p>
        </div>
        <div style={{ alignSelf: 'flex-start' }}>
          <Link
            label={linkLabel || defaultLinkLabel}
            size="small"
            context="on-light"
            icon="none"
            onClick={onLinkClick}
          />
        </div>
      </div>

      {/* Right: image */}
      <div style={{
        width: 116,
        alignSelf: 'stretch',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: 'var(--color-gray-20)',
      }}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
    </div>
  )
}
