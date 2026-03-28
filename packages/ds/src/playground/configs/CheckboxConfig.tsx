import { Checkbox } from '../../components/Checkbox/Checkbox'
import type { ComponentConfig } from '../types'

export const CheckboxConfig: ComponentConfig = {
  name: 'Checkbox',
  controls: {
    state:    { type: 'radio',   label: 'State',    options: ['unselected', 'selected', 'indeterminate'], default: 'unselected' },
    disabled: { type: 'boolean', label: 'Disabled',                                                       default: false },
  },
  render: (p) => (
    <Checkbox state={p.state as any} disabled={p.disabled as boolean} />
  ),
}
