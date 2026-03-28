import { Divider } from '../../components/Divider/Divider'
import type { ComponentConfig } from '../types'

export const DividerConfig: ComponentConfig = {
  name: 'Divider',
  controls: {
    variant: { type: 'radio', label: 'Variant', options: ['full-width', 'inset', 'text'], default: 'full-width' },
    label:   { type: 'text',  label: 'Label',   default: 'Ter, 27/09/2021', showWhen: { field: 'variant', values: ['text'] } },
  },
  render: (p) => (
    <div style={{ width: 327 }}>
      <Divider variant={p.variant as any} label={p.label as string} />
    </div>
  ),
}
