import { Button } from '../../components/Button'
import { Icon } from '../../icons/Icon'
import type { ComponentConfig } from '../types'

export const ButtonConfig: ComponentConfig = {
  name: 'Button',
  presets: [
    {
      label: 'CTA primário',
      values: { label: 'Começar agora', darkMode: false, style: 'primary', size: 'lg', btnType: 'text', state: 'enabled', iconName: 'chevron-right' },
    },
    {
      label: 'Ação secundária',
      values: { label: 'Cancelar', darkMode: false, style: 'secondary', size: 'md', btnType: 'text', state: 'enabled', iconName: 'chevron-right' },
    },
    {
      label: 'Link com ícone',
      values: { label: 'Ver mais', darkMode: false, style: 'tertiary', size: 'sm', btnType: 'right-icon', state: 'enabled', iconName: 'chevron-right' },
    },
    {
      label: 'Favoritar (ícone)',
      values: { label: '', darkMode: false, style: 'secondary', size: 'md', btnType: 'only-icon', state: 'enabled', iconName: 'heart-outline' },
    },
    {
      label: 'Agendar consulta',
      values: { label: 'Agendar consulta', darkMode: false, style: 'primary', size: 'lg', btnType: 'left-icon', state: 'enabled', iconName: 'calendar-check-outline' },
    },
    {
      label: 'Dark mode primário',
      values: { label: 'Entrar', darkMode: true, style: 'primary', size: 'lg', btnType: 'text', state: 'enabled', iconName: 'chevron-right' },
    },
    {
      label: 'Carregando',
      values: { label: 'Enviando...', darkMode: false, style: 'primary', size: 'lg', btnType: 'text', state: 'loading', iconName: 'chevron-right' },
    },
  ],
  controls: {
    label:    { type: 'text',        label: 'Label',     default: 'Button label' },
    darkMode: { type: 'boolean',     label: 'Dark mode',  default: false },
    style:    { type: 'radio',       label: 'Style',     options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
    size:     { type: 'radio',       label: 'Size',      options: ['lg', 'md', 'sm'], default: 'lg' },
    btnType:  { type: 'radio',       label: 'Type',      options: ['text', 'left-icon', 'right-icon', 'only-icon'], default: 'text' },
    state:    { type: 'select',      label: 'State',     options: ['enabled', 'pressed', 'disabled', 'loading'], default: 'enabled' },
    iconName: { type: 'icon-picker', label: 'Icon',      default: 'chevron-right', showWhen: { field: 'btnType', values: ['left-icon', 'right-icon', 'only-icon'] } },
  },
  render: (p) => {
    const iconName = p.iconName as string
    const iconSize = p.size === 'sm' ? 16 : 20
    const iconEl = iconName ? <Icon name={iconName} size={iconSize} /> : undefined

    return (
      <Button
        label={p.label as string}
        darkMode={p.darkMode as boolean}
        style={p.style as any}
        size={p.size as any}
        type={p.btnType as any}
        state={p.state as any}
        iconElement={iconEl}
      />
    )
  },
}
