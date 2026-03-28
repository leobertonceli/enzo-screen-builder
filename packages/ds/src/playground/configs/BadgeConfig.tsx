import { Badge } from '../../components/Badge/Badge'
import type { ComponentConfig } from '../types'

export const BadgeConfig: ComponentConfig = {
  name: 'Badge',
  controls: {
    type:   { type: 'radio',   label: 'Type',   options: ['counter', 'dot'],  default: 'counter' },
    size:   { type: 'radio',   label: 'Size',   options: ['sm', 'md'],        default: 'md' },
    stroke: { type: 'boolean', label: 'Stroke',                               default: false },
    count:  { type: 'text',    label: 'Count',                                default: '3', showWhen: { field: 'type', values: ['counter'] } },
  },
  render: (p) => (
    <Badge
      type={p.type as any}
      size={p.size as any}
      stroke={p.stroke as boolean}
      count={Number(p.count) || 1}
    />
  ),
}
