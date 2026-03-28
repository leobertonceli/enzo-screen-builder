import { ActionCard } from '../../components/ActionCard/ActionCard'
import type { ComponentConfig } from '../types'

export const ActionCardConfig: ComponentConfig = {
  name: 'ActionCard',
  presets: [
    {
      label: 'Active',
      values: {
        status: 'active',
        title: 'Agende sua consulta',
        content: 'Consulte um médico na hora que precisar',
        badge: true,
        badgeLabel: 'Recomendado',
        showButton: true,
        buttonLabel: 'Agendar agora',
      },
    },
    {
      label: 'Disabled',
      values: {
        status: 'disabled',
        title: 'Exames pendentes',
        content: 'Seus resultados ainda não chegaram',
        badge: true,
        badgeLabel: 'Pendente',
        showButton: false,
        buttonLabel: '',
      },
    },
    {
      label: 'Incomplete',
      values: {
        status: 'incomplete',
        title: 'Perfil incompleto',
        content: 'Complete seu perfil para continuar',
        badge: true,
        badgeLabel: 'Em andamento',
        showButton: false,
        buttonLabel: '',
      },
    },
    {
      label: 'Completed',
      values: {
        status: 'completed',
        title: 'Consulta realizada',
        content: '',
        badge: false,
        badgeLabel: '',
        showButton: false,
        buttonLabel: '',
      },
    },
  ],
  controls: {
    status: {
      type: 'radio',
      label: 'Status',
      options: ['active', 'disabled', 'incomplete', 'completed'],
      default: 'active',
    },
    title: {
      type: 'text',
      label: 'Title',
      default: 'Card title',
    },
    content: {
      type: 'text',
      label: 'Content',
      default: 'Card content',
      showWhen: { field: 'status', values: ['active', 'disabled', 'incomplete'] },
    },
    badge: {
      type: 'boolean',
      label: 'Badge',
      default: true,
      showWhen: { field: 'status', values: ['active', 'disabled', 'incomplete'] },
    },
    badgeLabel: {
      type: 'text',
      label: 'Badge label',
      default: 'Badge',
      showWhen: { field: 'badge', values: ['true'] },
    },
    showButton: {
      type: 'boolean',
      label: 'Show button',
      default: true,
      showWhen: { field: 'status', values: ['active'] },
    },
    buttonLabel: {
      type: 'text',
      label: 'Button label',
      default: 'Action',
      showWhen: { field: 'status', values: ['active'] },
    },
  },
  render: (p) => (
    <ActionCard
      status={p.status as any}
      title={p.title as string}
      content={p.content as string | undefined}
      badge={p.badge as boolean}
      badgeLabel={p.badgeLabel as string}
      showButton={p.showButton as boolean}
      buttonLabel={p.buttonLabel as string}
    />
  ),
}
