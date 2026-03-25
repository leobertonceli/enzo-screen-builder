import { ChatInput } from '../../components/ChatInput/ChatInput'
import type { ChatInputAttachedItem } from '../../components/ChatInput/ChatInput'
import type { ComponentConfig } from '../types'

const IMG = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240&h=240&fit=crop&q=80'
const IMG2 = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=240&h=240&fit=crop&q=80'

function buildItems(count: number, types: Record<string, string>): ChatInputAttachedItem[] {
  const images = [IMG, IMG2, IMG, IMG2]
  const items: ChatInputAttachedItem[] = []
  for (let i = 0; i < count; i++) {
    const type = (types[`itemType${i + 1}`] as 'image' | 'video' | 'document') || 'image'
    items.push({
      id: String(i + 1),
      type,
      preview: type !== 'document' ? images[i % images.length] : undefined,
      label: type === 'video' ? '30s' : type === 'document' ? 'FaturaDezembro' : undefined,
    })
  }
  return items
}

export const ChatInputConfig: ComponentConfig = {
  name: 'ChatInput',
  presets: [
    {
      label: 'Idle — vazio',
      values: { state: 'idle', value: '', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Focus — cursor piscando',
      values: { state: 'focus', value: '', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Typing — com texto',
      values: { state: 'typing', value: 'Estou com dor de cabeça', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Typing — 1 imagem',
      values: { state: 'typing', value: 'Segue a foto', itemsCount: '1', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Typing — 2 itens',
      values: { state: 'typing', value: 'Meus exames', itemsCount: '2', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'video', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Typing — 3 itens',
      values: { state: 'typing', value: 'Aqui os arquivos', itemsCount: '3', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'video', itemType3: 'document', itemType4: 'image' },
    },
    {
      label: 'Typing — reply',
      values: { state: 'typing', value: 'Sim, confirmo', itemsCount: '0', reply: true, replyName: 'Clara Boris', replyMessage: 'Olá, como vai você?', showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Recording audio',
      values: { state: 'recording', value: '', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Transcribing audio',
      values: { state: 'transcribing', value: '', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Loading',
      values: { state: 'loading', value: '', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
    {
      label: 'Disabled',
      values: { state: 'disabled', value: '', itemsCount: '0', reply: false, showMic: true, showPlus: true, itemType1: 'image', itemType2: 'image', itemType3: 'image', itemType4: 'image' },
    },
  ],
  controls: {
    state:        { type: 'select',  label: 'State',          options: ['idle', 'focus', 'typing', 'recording', 'transcribing', 'loading', 'disabled'], default: 'idle' },
    value:        { type: 'text',    label: 'Text value',     default: '', showWhen: { field: 'state', values: ['typing'] } },
    itemsCount:   { type: 'radio',   label: 'Items',          options: ['0', '1', '2', '3', '4+'], default: '0', showWhen: { field: 'state', values: ['idle', 'focus', 'typing', 'loading'] } },
    itemType1:    { type: 'select',  label: 'Item 1 type',    options: ['image', 'video', 'document'], default: 'image', showWhen: { field: 'itemsCount', values: ['1', '2', '3', '4+'] } },
    itemType2:    { type: 'select',  label: 'Item 2 type',    options: ['image', 'video', 'document'], default: 'image', showWhen: { field: 'itemsCount', values: ['2', '3', '4+'] } },
    itemType3:    { type: 'select',  label: 'Item 3 type',    options: ['image', 'video', 'document'], default: 'image', showWhen: { field: 'itemsCount', values: ['3', '4+'] } },
    itemType4:    { type: 'select',  label: 'Item 4 type',    options: ['image', 'video', 'document'], default: 'image', showWhen: { field: 'itemsCount', values: ['4+'] } },
    reply:        { type: 'boolean', label: 'Reply',          default: false, showWhen: { field: 'state', values: ['idle', 'focus', 'typing', 'loading'] } },
    replyName:    { type: 'text',    label: 'Reply name',     default: 'Clara Boris', showWhen: { field: 'reply', values: ['true'] } },
    replyMessage: { type: 'text',    label: 'Reply message',  default: 'Olá, como vai você?', showWhen: { field: 'reply', values: ['true'] } },
    showMic:      { type: 'boolean', label: 'Mic button',     default: false },
    showPlus:     { type: 'boolean', label: 'Plus button',    default: false, showWhen: { field: 'state', values: ['idle', 'focus', 'typing', 'loading', 'transcribing'] } },
  },
  render: (p) => {
    const countStr = p.itemsCount as string
    const count = countStr === '4+' ? 4 : Number(countStr) || 0
    const items = buildItems(count, p as Record<string, string>)

    return (
      <ChatInput
        state={p.state as any}
        value={p.value as string}
        items={items}
        reply={p.reply as boolean}
        replyName={p.replyName as string}
        replyMessage={p.replyMessage as string}
        showMic={p.showMic as boolean}
        showPlus={p.showPlus as boolean}
      />
    )
  },
}
