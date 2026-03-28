import { Tooltip } from '../../components/Tooltip/Tooltip'
import type { ComponentConfig } from '../types'

export const TooltipConfig: ComponentConfig = {
  name: 'Tooltip',
  controls: {
    label:       { type: 'text',    label: 'Label',       default: 'Lorem Ipsum' },
    position:    { type: 'select',  label: 'Position',    options: ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left'], default: 'top-left' },
    darkVariant: { type: 'boolean', label: 'Dark variant', default: false },
  },
  render: (p) => (
    <div style={{ padding: 'var(--spacing-06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip
        label={p.label as string}
        position={p.position as any}
        darkVariant={p.darkVariant as boolean}
      />
    </div>
  ),
}
