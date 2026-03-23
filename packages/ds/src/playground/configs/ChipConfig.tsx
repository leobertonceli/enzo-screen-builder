import { Chip } from '../../components/Chip/Chip'
import { Icon } from '../../icons/Icon'
import type { ComponentConfig } from '../types'

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'

export const ChipConfig: ComponentConfig = {
  name: 'Chip',
  presets: [
    {
      label: 'Filtro de categoria',
      values: { label: 'Restaurantes', variant: 'text', size: 'sm', state: 'idle', showCounter: false, counter: '12', affordanceIcon: false, affordanceIconName: 'close', iconName: 'star' },
    },
    {
      label: 'Categoria selecionada',
      values: { label: 'Todos', variant: 'text', size: 'sm', state: 'selected', showCounter: false, counter: '12', affordanceIcon: false, affordanceIconName: 'close', iconName: 'star' },
    },
    {
      label: 'Ação com ícone',
      values: { label: 'Emergência', variant: 'icon', size: 'sm', state: 'idle', showCounter: false, counter: '12', affordanceIcon: false, affordanceIconName: 'close', iconName: 'alert-circle-outline' },
    },
    {
      label: 'Filtro com contador',
      values: { label: 'Cardiologia', variant: 'text', size: 'md', state: 'idle', showCounter: true, counter: '5', affordanceIcon: false, affordanceIconName: 'close', iconName: 'star' },
    },
    {
      label: 'Tag removível',
      values: { label: 'Favorito', variant: 'icon', size: 'sm', state: 'selected', showCounter: false, counter: '12', affordanceIcon: true, affordanceIconName: 'close', iconName: 'heart' },
    },
    {
      label: 'Especialidade médica',
      values: { label: 'Dermatologia', variant: 'text', size: 'sm', state: 'idle', showCounter: false, counter: '12', affordanceIcon: false, affordanceIconName: 'close', iconName: 'star' },
    },
  ],
  controls: {
    label:              { type: 'text',        label: 'Label',           default: 'Suggestion' },
    variant:            { type: 'radio',       label: 'Variant',         options: ['text', 'icon', 'image'], default: 'text' },
    iconName:           { type: 'icon-picker', label: 'Icon',            default: 'star', showWhen: { field: 'variant', values: ['icon'] } },
    size:               { type: 'radio',       label: 'Size',            options: ['sm', 'md', 'lg'], default: 'sm' },
    state:              { type: 'select',      label: 'State',           options: ['idle', 'pressed', 'selected', 'disabled'], default: 'idle' },
    showCounter:        { type: 'boolean',     label: 'Counter',         default: false },
    counter:            { type: 'text',        label: 'Counter value',   default: '12', showWhen: { field: 'showCounter', values: ['true'] } },
    affordanceIcon:     { type: 'boolean',     label: 'Affordance icon', default: false },
    affordanceIconName: { type: 'icon-picker', label: 'Close icon',      default: 'close', showWhen: { field: 'affordanceIcon', values: ['true'] } },
  },
  render: (p) => {
    const size = p.size as string
    const iconSize = size === 'lg' ? 24 : size === 'md' ? 20 : 16
    const closeSize = size === 'sm' ? 12 : 16

    const iconName = p.iconName as string
    const iconEl = iconName ? <Icon name={iconName} size={iconSize} color="var(--color-content-primary)" /> : undefined

    const affIconName = p.affordanceIconName as string
    const affIconEl = affIconName ? <Icon name={affIconName} size={closeSize} color="var(--color-content-primary)" /> : undefined

    return (
      <Chip
          label={p.label as string}
          variant={p.variant as any}
          size={p.size as any}
          state={p.state as any}
          counter={p.counter as string}
          showCounter={p.showCounter as boolean}
          affordanceIcon={p.affordanceIcon as boolean}
          affordanceIconElement={affIconEl}
          iconElement={iconEl}
          imageUrl={p.variant === 'image' ? PLACEHOLDER_IMAGE : undefined}
        />
    )
  },
}
