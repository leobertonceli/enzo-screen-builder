import { Shortcut } from '../../components/Shortcut/Shortcut'
import { Icon } from '../../icons/Icon'
import type { ComponentConfig } from '../types'

export const ShortcutConfig: ComponentConfig = {
  name: 'Shortcut',
  presets: [
    {
      label: 'Callout — Agendar',
      values: { type: 'callout', state: 'idle', title: 'Agendar consulta', subtitle: 'Próxima disponível', badge: true, badgeCount: 2, iconName: 'calendar-outline' },
    },
    {
      label: 'Callout — Exames',
      values: { type: 'callout', state: 'idle', title: 'Ver resultados', subtitle: 'Exames recentes', badge: false, badgeCount: 1, iconName: 'file-document-outline' },
    },
    {
      label: 'Support — Favoritos',
      values: { type: 'support', state: 'idle', title: 'Favoritos', badge: false, badgeCount: 1, iconName: 'heart-outline' },
    },
    {
      label: 'Support — Notificações',
      values: { type: 'support', state: 'idle', title: 'Notificações', badge: true, badgeCount: 3, iconName: 'bell-outline' },
    },
    {
      label: 'Support — Mensagens',
      values: { type: 'support', state: 'idle', title: 'Mensagens', badge: true, badgeCount: 5, iconName: 'message-outline' },
    },
  ],
  controls: {
    type:       { type: 'radio',       label: 'Type',        options: ['callout', 'support'], default: 'callout' },
    state:      { type: 'select',      label: 'State',       options: ['idle', 'pressed', 'disabled', 'loading'], default: 'idle' },
    title:      { type: 'text',        label: 'Title',       default: 'Título' },
    subtitle:   { type: 'text',        label: 'Subtitle',    default: 'Subtítulo', showWhen: { field: 'type', values: ['callout'] } },
    iconName:   { type: 'icon-picker', label: 'Icon',        default: 'checkbox-marked-outline' },
    badge:      { type: 'boolean',     label: 'Badge',       default: false },
    badgeCount: { type: 'text',        label: 'Badge count', default: '1', showWhen: { field: 'badge', values: ['true'] } },
  },
  render: (p) => {
    const iconName = p.iconName as string
    const type = p.type as 'callout' | 'support'
    const iconColor = (type === 'callout' && p.state !== 'disabled' && p.state !== 'loading')
      ? 'var(--color-gray-white)'
      : p.state === 'disabled'
      ? 'var(--color-gray-30)'
      : 'var(--color-content-primary)'

    return (
      <Shortcut
        type={type}
        state={p.state as any}
        title={p.title as string}
        subtitle={p.subtitle as string}
        badge={p.badge as boolean}
        badgeCount={Number(p.badgeCount) || 1}
        icon={iconName ? <Icon name={iconName} size={24} color={iconColor} /> : undefined}
      />
    )
  },
}
