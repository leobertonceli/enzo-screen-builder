import { ChatResponse } from '../../components/ChatResponse/ChatResponse'
import type { ComponentConfig } from '../types'

export const ChatResponseConfig: ComponentConfig = {
  name: 'ChatResponse',
  presets: [
    {
      label: 'Normal',
      values: {
        loading: false, sender: true, showTitle: true, title: 'Title',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        time: '17:44', file: 'none', suggestions: true, reaction: false, reply: false, replyText: '',
      },
    },
    {
      label: 'Loading',
      values: { loading: true, sender: true, showTitle: false, title: '', text: '', time: '', file: 'none', suggestions: false, reaction: false, reply: false, replyText: '' },
    },
    {
      label: 'With Media',
      values: {
        loading: false, sender: true, showTitle: true, title: 'Sua imagem',
        text: 'Aqui está a imagem que você solicitou.',
        time: '17:44', file: 'media', suggestions: false, reaction: false, reply: false, replyText: '',
      },
    },
    {
      label: 'With Document',
      values: {
        loading: false, sender: true, showTitle: false, title: '',
        text: 'Encontrei esse documento para você.',
        time: '17:44', file: 'document', suggestions: true, reaction: false, reply: false, replyText: '',
      },
    },
    {
      label: 'With Reply',
      values: {
        loading: false, sender: true, reply: true, replyText: 'Qual é o meu plano?',
        showTitle: true, title: 'Seu plano',
        text: 'Você possui o plano Alice Básico...',
        time: '17:44', file: 'none', suggestions: false, reaction: false,
      },
    },
  ],
  controls: {
    loading:     { type: 'boolean', label: 'Loading',      default: false },
    sender:      { type: 'boolean', label: 'Sender',       default: true },
    showTitle:   { type: 'boolean', label: 'Show title',   default: true },
    text:        { type: 'text',    label: 'Text',         default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
    title:       { type: 'text',    label: 'Title',        default: 'Title',  showWhen: { field: 'showTitle', values: ['true'] } },
    time:        { type: 'text',    label: 'Time',         default: '17:44',  showWhen: { field: 'loading',   values: ['false'] } },
    file:        { type: 'select',  label: 'File',         options: ['none', 'media', 'document'], default: 'none', showWhen: { field: 'loading', values: ['false'] } },
    suggestions: { type: 'boolean', label: 'Suggestions',  default: true,     showWhen: { field: 'loading',   values: ['false'] } },
    reaction:    { type: 'boolean', label: 'Reaction',     default: false,    showWhen: { field: 'loading',   values: ['false'] } },
    reply:       { type: 'boolean', label: 'Reply',        default: false,    showWhen: { field: 'loading',   values: ['false'] } },
    replyText:   { type: 'text',    label: 'Reply text',   default: 'Qual é o meu plano?', showWhen: { field: 'reply', values: ['true'] } },
  },
  render: (p) => {
    const suggestionsRaw = p.suggestions
    const suggestionsArr: string[] =
      suggestionsRaw === true
        ? ['Sugestão 1', 'Sugestão 2']
        : Array.isArray(suggestionsRaw)
        ? (suggestionsRaw as string[])
        : []

    return (
      <ChatResponse
        loading={p.loading as boolean}
        sender={p.sender as boolean}
        title={p.title as string}
        showTitle={p.showTitle as boolean}
        text={p.text as string}
        time={p.time as string}
        file={p.file as any}
        suggestions={suggestionsArr}
        reaction={p.reaction as boolean}
        reply={p.reply as boolean}
        replyText={p.replyText as string}
      />
    )
  },
}
