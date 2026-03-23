import { Link } from '../../components/Link/Link'
import type { ComponentConfig } from '../types'

export const LinkConfig: ComponentConfig = {
  name: 'Link',
  presets: [
    {
      label: 'Default',
      values: { label: 'Link label', size: 'lg', context: 'on-light', icon: 'none' },
    },
    {
      label: 'With arrow',
      values: { label: 'Ver mais', size: 'sm', context: 'on-light', icon: 'right' },
    },
    {
      label: 'Back link',
      values: { label: 'Voltar', size: 'sm', context: 'on-light', icon: 'left' },
    },
    {
      label: 'Dark',
      values: { label: 'Link label', size: 'lg', context: 'on-dark', icon: 'right' },
    },
  ],
  controls: {
    label: { type: 'text', label: 'Label', default: 'Link label' },
    size: { type: 'radio', label: 'Size', options: ['lg', 'sm'], default: 'lg' },
    context: { type: 'radio', label: 'Context', options: ['on-light', 'on-dark'], default: 'on-light' },
    icon: { type: 'radio', label: 'Icon', options: ['none', 'left', 'right'], default: 'none' },
  },
  render: (p) => (
    <Link
      label={p.label as string}
      size={p.size as 'lg' | 'sm'}
      context={p.context as 'on-light' | 'on-dark'}
      icon={p.icon as 'none' | 'left' | 'right'}
    />
  ),
}
