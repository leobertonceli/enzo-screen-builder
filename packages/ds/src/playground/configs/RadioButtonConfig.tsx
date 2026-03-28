import { RadioButton } from '../../components/RadioButton/RadioButton'
import type { ComponentConfig } from '../types'

export const RadioButtonConfig: ComponentConfig = {
  name: 'RadioButton',
  controls: {
    selected:    { type: 'boolean', label: 'Selected',    default: true },
    disabled:    { type: 'boolean', label: 'Disabled',    default: false },
    label:       { type: 'text',    label: 'Label',       default: 'Confirmar identidade' },
    description: { type: 'text',    label: 'Description', default: 'Sua identidade será confirmada se você acessar dados sensíveis.' },
  },
  render: (p) => (
    <div style={{ width: 327 }}>
      <RadioButton
        selected={p.selected as boolean}
        disabled={p.disabled as boolean}
        label={p.label as string}
        description={p.description as string}
      />
    </div>
  ),
}
