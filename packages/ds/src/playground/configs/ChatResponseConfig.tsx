import { ChatResponse } from '../../components/ChatResponse/ChatResponse'
import { placeholders } from '../../assets/placeholders'
import type { ComponentConfig } from '../types'

export const ChatResponseConfig: ComponentConfig = {
  name: 'ChatResponse',
  presets: [
    {
      label: 'IA simples',
      values: { sender: 'ai', loading: false, reply: false, showTitle: false, title: 'Título', text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', file: 'none', suggestion1: 'Marcar consulta', suggestion2: 'Ver meus exames', showReaction: false, timestamp: '17:44' },
    },
    {
      label: 'IA com título e sugestões',
      values: { sender: 'ai', loading: false, reply: false, showTitle: true, title: 'Como posso te ajudar?', text: 'Encontrei algumas opções para você. Escolha o que faz mais sentido agora:', file: 'none', suggestion1: 'Agendar consulta', suggestion2: 'Ver rede credenciada', showReaction: false, timestamp: '09:31' },
    },
    {
      label: 'IA com reply',
      values: { sender: 'ai', loading: false, reply: true, showTitle: false, title: 'Título', text: 'Entendido! Veja o que encontrei para você com base na sua solicitação.', file: 'none', suggestion1: 'Sim, confirmar', suggestion2: 'Quero mudar', showReaction: false, timestamp: '14:22' },
    },
    {
      label: 'IA com imagem',
      values: { sender: 'ai', loading: false, reply: false, showTitle: false, title: 'Título', text: 'Aqui está a imagem que você pediu.', file: 'media', suggestion1: '', suggestion2: '', showReaction: false, timestamp: '11:05' },
    },
    {
      label: 'IA com documento',
      values: { sender: 'ai', loading: false, reply: false, showTitle: false, title: 'Título', text: 'Segue o documento com o resumo da sua consulta.', file: 'document', suggestion1: 'Baixar PDF', suggestion2: 'Compartilhar', showReaction: false, timestamp: '15:48' },
    },
    {
      label: 'IA digitando',
      values: { sender: 'ai', loading: true, reply: false, showTitle: false, title: 'Título', text: '', file: 'none', suggestion1: '', suggestion2: '', showReaction: false, timestamp: '17:44' },
    },
    {
      label: 'Agente humano',
      values: { sender: 'agent', loading: false, reply: false, showTitle: false, title: 'Título', text: 'Olá! Sou a Renata, sua médica de família. Como posso te ajudar hoje?', file: 'none', suggestion1: '', suggestion2: '', showReaction: false, timestamp: '10:15', agentName: 'Renata', agentOccupation: 'Clínica Geral', agentPhotoUrl: '' },
    },
    {
      label: 'Agente digitando',
      values: { sender: 'agent', loading: true, reply: false, showTitle: false, title: 'Título', text: '', file: 'none', suggestion1: '', suggestion2: '', showReaction: false, timestamp: '10:15', agentName: 'Renata', agentOccupation: 'Clínica Geral', agentPhotoUrl: '' },
    },
  ],
  controls: {
    sender:         { type: 'radio',   label: 'Sender',       options: ['ai', 'agent'], default: 'ai' },
    agentName:       { type: 'text',    label: 'Agent name',   default: 'Renata',       showWhen: { field: 'sender', values: ['agent'] } },
    agentOccupation: { type: 'text',    label: 'Occupation',   default: 'Clínica Geral', showWhen: { field: 'sender', values: ['agent'] } },
    agentPhotoUrl:   { type: 'text',    label: 'Photo URL',    default: '',              showWhen: { field: 'sender', values: ['agent'] } },
    loading:        { type: 'boolean', label: 'Loading',      default: false },
    reply:          { type: 'boolean', label: 'Reply',        default: false, showWhen: { field: 'loading', values: ['false'] } },
    showTitle:      { type: 'boolean', label: 'Title',        default: false, showWhen: { field: 'loading', values: ['false'] } },
    title:          { type: 'text',    label: 'Title text',   default: 'Título', showWhen: { field: 'showTitle', values: ['true'] } },
    text:           { type: 'text',    label: 'Message',      default: 'Lorem ipsum is simply dummy text of the printing and typesetting industry.', showWhen: { field: 'loading', values: ['false'] } },
    file:           { type: 'radio',   label: 'File',         options: ['none', 'media', 'document'], default: 'none', showWhen: { field: 'loading', values: ['false'] } },
    documentName:   { type: 'text',    label: 'Doc name',     default: 'Nome do arquivo', showWhen: { field: 'file', values: ['document'] } },
    documentFormat: { type: 'text',    label: 'Doc format',   default: 'PDF',             showWhen: { field: 'file', values: ['document'] } },
    documentCount:  { type: 'text',    label: 'Doc count',    default: '3',               showWhen: { field: 'file', values: ['document'] } },
    suggestion1:    { type: 'text',    label: 'Suggestion 1', default: 'Suggestion 1', showWhen: { field: 'loading', values: ['false'] } },
    suggestion2:    { type: 'text',    label: 'Suggestion 2', default: 'Suggestion 2', showWhen: { field: 'loading', values: ['false'] } },
    showReaction:   { type: 'boolean', label: 'Reaction',     default: false, showWhen: { field: 'loading', values: ['false'] } },
    timestamp:      { type: 'text',    label: 'Timestamp',    default: '17:44' },
  },
  render: (p) => {
    const suggestions = [p.suggestion1 as string, p.suggestion2 as string].filter(Boolean)

    return (
      <ChatResponse
        sender={p.sender as 'ai' | 'agent'}
        agentName={p.agentName as string}
        agentOccupation={(p.agentOccupation as string) || undefined}
        agentPhotoUrl={(p.agentPhotoUrl as string) || placeholders.person}
        loading={p.loading as boolean}
        reply={p.reply as boolean}
        replyText="Eu queria entender mais sobre os meus resultados de exame de sangue."
        showTitle={p.showTitle as boolean}
        title={p.title as string}
        text={p.text as string}
        file={p.file as 'none' | 'media' | 'document'}
        documentName={p.documentName as string}
        documentFormat={p.documentFormat as string}
        documentCount={p.documentCount as string}
        suggestions={suggestions}
        showReaction={p.showReaction as boolean}
        timestamp={p.timestamp as string}
      />
    )
  },
}
