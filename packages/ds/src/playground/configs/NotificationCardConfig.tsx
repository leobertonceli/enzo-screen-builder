import { NotificationCard } from '../../components/NotificationCard/NotificationCard'
import type { ComponentConfig } from '../types'

export const NotificationCardConfig: ComponentConfig = {
  name: 'NotificationCard',
  presets: [
    {
      label: 'Unread / None',
      values: {
        status: 'unread',
        action: 'none',
        message: 'Seu exame de sangue está disponível para download.',
        time: '5min',
        linkLabel: 'Ver mais',
        buttonLabel: 'Confirmar',
      },
    },
    {
      label: 'Unread / Link',
      values: {
        status: 'unread',
        action: 'link',
        message: 'Sua consulta foi confirmada para amanhã às 14h.',
        time: '1h',
        linkLabel: 'Ver consulta',
        buttonLabel: 'Confirmar',
      },
    },
    {
      label: 'Unread / Button',
      values: {
        status: 'unread',
        action: 'button',
        message: 'Você tem uma nova mensagem do seu médico.',
        time: '30min',
        linkLabel: 'Ver mais',
        buttonLabel: 'Responder',
      },
    },
    {
      label: 'Read / None',
      values: {
        status: 'read',
        action: 'none',
        message: 'Resultado do exame disponível.',
        time: '2d',
        linkLabel: 'Ver mais',
        buttonLabel: 'Confirmar',
      },
    },
  ],
  controls: {
    status: {
      type: 'radio',
      label: 'Status',
      options: ['unread', 'read'],
      default: 'unread',
    },
    action: {
      type: 'radio',
      label: 'Action',
      options: ['none', 'link', 'button'],
      default: 'none',
    },
    message: {
      type: 'text',
      label: 'Message',
      default: 'O mundo ideal é buscar um texto que tenha no máximo 3 linhas.',
    },
    time: {
      type: 'text',
      label: 'Time',
      default: '59min',
    },
    linkLabel: {
      type: 'text',
      label: 'Link Label',
      default: 'Ver mais',
      showWhen: { field: 'action', values: ['link'] },
    },
    buttonLabel: {
      type: 'text',
      label: 'Button Label',
      default: 'Confirmar',
      showWhen: { field: 'action', values: ['button'] },
    },
  },
  render: (p) => (
    <NotificationCard
      status={p.status as 'unread' | 'read'}
      action={p.action as 'none' | 'link' | 'button'}
      message={p.message as string}
      time={p.time as string}
      linkLabel={p.linkLabel as string}
      buttonLabel={p.buttonLabel as string}
    />
  ),
}
