import { Snackbar } from '../../components/Snackbar/Snackbar'
import type { ComponentConfig } from '../types'

export const SnackbarConfig: ComponentConfig = {
  name: 'Snackbar',
  controls: {
    variant:    { type: 'radio',   label: 'Variant',      options: ['neutral', 'success', 'warning', 'error'], default: 'neutral' },
    text:       { type: 'text',    label: 'Text',         default: 'Snackbar label' },
    action:     { type: 'boolean', label: 'Action',       default: false },
    actionText: { type: 'text',    label: 'Action text',  default: 'Action', showWhen: { field: 'action', values: ['true'] } },
  },
  render: (p) => (
    <div style={{ width: 327 }}>
      <Snackbar
        variant={p.variant as any}
        text={p.text as string}
        action={p.action as boolean}
        actionText={p.actionText as string}
      />
    </div>
  ),
}
