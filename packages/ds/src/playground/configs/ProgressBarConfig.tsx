import { ProgressBar } from '../../components/ProgressBar/ProgressBar'
import type { ComponentConfig } from '../types'

export const ProgressBarConfig: ComponentConfig = {
  name: 'ProgressBar',
  controls: {
    value:    { type: 'select',  label: 'Value',     options: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'], default: '50' },
    showIcon: { type: 'boolean', label: 'Show icon', default: true },
  },
  render: (p) => (
    <div style={{ width: 327 }}>
      <ProgressBar value={Number(p.value)} showIcon={p.showIcon as boolean} />
    </div>
  ),
}
