import { Tag } from '../../components/Tag/Tag'
import type { ComponentConfig } from '../types'

export const TagConfig: ComponentConfig = {
  name: 'Tag',
  presets: [
    { label: 'Red',      values: { variant: 'Red',      icon: 'Primary',  label: 'Label' } },
    { label: 'Magenta',  values: { variant: 'Magenta',  icon: 'Primary',  label: 'Label' } },
    { label: 'Blue',     values: { variant: 'Blue',     icon: 'Primary',  label: 'Label' } },
    { label: 'Green',    values: { variant: 'Green',    icon: 'Primary',  label: 'Label' } },
    { label: 'Orange',   values: { variant: 'Orange',   icon: 'Primary',  label: 'Label' } },
    { label: 'Grey',     values: { variant: 'Grey',     icon: 'Primary',  label: 'Label' } },
    { label: 'Disabled', values: { variant: 'Disabled', icon: 'Semantic', label: 'Label' } },
  ],
  controls: {
    variant: { type: 'select', label: 'Variant', options: ['Red', 'Magenta', 'Blue', 'Green', 'Orange', 'Grey', 'Disabled'], default: 'Red' },
    icon:    { type: 'radio',  label: 'Icon',    options: ['Primary', 'Semantic', 'No icon'], default: 'Primary' },
    label:   { type: 'text',   label: 'Label',   default: 'Label' },
  },
  render: (p) => (
    <Tag
      variant={p.variant as any}
      icon={p.icon as any}
      label={p.label as string}
    />
  ),
}
