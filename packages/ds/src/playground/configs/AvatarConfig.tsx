import { Avatar } from '../../components/Avatar/Avatar'
import type { ComponentConfig } from '../types'

export const AvatarConfig: ComponentConfig = {
  name: 'Avatar',
  controls: {
    size:   { type: 'radio',  label: 'Size',   options: ['large', 'medium', 'small', 'xsmall'], default: 'large' },
    type:   { type: 'radio',  label: 'Type',   options: ['image', 'placeholder'],               default: 'image' },
    status: { type: 'radio',  label: 'Status', options: ['idle', 'active'],                     default: 'idle' },
  },
  presets: [
    { label: 'Large — Image',       values: { size: 'large',  type: 'image',       status: 'idle'   } },
    { label: 'Large — Active',      values: { size: 'large',  type: 'image',       status: 'active' } },
    { label: 'Medium — Placeholder',values: { size: 'medium', type: 'placeholder', status: 'idle'   } },
    { label: 'XSmall — Image',      values: { size: 'xsmall', type: 'image',       status: 'idle'   } },
  ],
  render: (p) => (
    <Avatar
      size={p.size as any}
      type={p.type as any}
      status={p.status as any}
    />
  ),
}
