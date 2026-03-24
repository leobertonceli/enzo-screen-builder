import { ChatBubble } from '../../components/ChatBubble/ChatBubble'
import type { ComponentConfig } from '../types'
import mediaPlaceholder from '../../assets/chat-media-placeholder.png'

function buildImages(countStr: string): string[] {
  const n = countStr === '4+' ? 6 : parseInt(countStr, 10)
  return Array(n).fill(mediaPlaceholder)
}

function renderBubble(p: Record<string, unknown>, width: string | number) {
  const images = p.variant === 'media' ? buildImages(p.imageCount as string || '1') : []
  return (
    <ChatBubble
      variant={p.variant as any}
      text={p.text as string}
      time={p.time as string}
      replyAuthor={p.replyAuthor as string}
      replyText={p.replyText as string}
      fileName={p.fileName as string}
      fileFormat={p.fileFormat as string}
      images={images}
      reaction={p.reaction as boolean}
      width={width}
    />
  )
}

export const ChatBubbleConfig: ComponentConfig = {
  name: 'ChatBubble',
  presets: [
    { label: 'Text', values: { variant: 'text', text: 'Lorem ipsum is simply text of the printing and typesetting.', time: '09:41', reaction: false } },
    { label: 'Reply', values: { variant: 'reply', text: 'Tá bom!', time: '09:43', replyAuthor: 'Alice', replyText: 'Lorem ipsum is simply text of the printing and typesetting.', reaction: false } },
    { label: 'Document', values: { variant: 'document', text: 'Segue o arquivo', time: '09:45', fileName: 'Resultado_exame.pdf', fileFormat: 'PDF', reaction: false } },
    { label: 'Media 1', values: { variant: 'media', text: 'Olha isso!', time: '09:47', imageCount: '1', reaction: false } },
    { label: 'Media 4+', values: { variant: 'media', text: 'Fotos da consulta', time: '09:50', imageCount: '4+', reaction: false } },
  ],
  controls: {
    variant:     { type: 'radio',   label: 'Variant',      options: ['text', 'reply', 'document', 'media'], default: 'text' },
    text:        { type: 'text',    label: 'Message',      default: 'Lorem ipsum is simply text of the printing and typesetting.' },
    time:        { type: 'text',    label: 'Time',         default: '09:41' },
    replyAuthor: { type: 'text',    label: 'Reply author', default: 'Alice',      showWhen: { field: 'variant', values: ['reply'] } },
    replyText:   { type: 'text',    label: 'Reply text',   default: 'Lorem ipsum is simply text of the printing and typesetting.', showWhen: { field: 'variant', values: ['reply'] } },
    fileName:    { type: 'text',    label: 'File name',    default: 'Resultado_exame.pdf', showWhen: { field: 'variant', values: ['document'] } },
    fileFormat:  { type: 'text',    label: 'Format',       default: 'PDF',        showWhen: { field: 'variant', values: ['document'] } },
    imageCount:  { type: 'radio',   label: 'Images',       options: ['1', '2', '3', '4', '4+'], default: '1', showWhen: { field: 'variant', values: ['media'] } },
    reaction:    { type: 'boolean', label: 'Reaction',     default: false },
  },
  render: (p) => renderBubble(p, 375),
  slotRender: (p) => renderBubble(p, '100%'),
}
