import { Button } from '../../components/Button'
import { Icon } from '../../icons/Icon'
import type { ComponentConfig } from '../types'

export const ButtonConfig: ComponentConfig = {
  name: 'Button',
  presets: [
    {
      label: 'CTA primário',
      values: { label: 'Começar agora', darkMode: false, style: 'primary', size: 'large', btnType: 'text', state: 'enabled', iconName: 'chevronArrowRight' },
    },
    {
      label: 'Ação secundária',
      values: { label: 'Cancelar', darkMode: false, style: 'secondary', size: 'medium', btnType: 'text', state: 'enabled', iconName: 'chevronArrowRight' },
    },
    {
      label: 'Link com ícone',
      values: { label: 'Ver mais', darkMode: false, style: 'tertiary', size: 'small', btnType: 'right-icon', state: 'enabled', iconName: 'chevronArrowRight' },
    },
    {
      label: 'Favoritar (ícone)',
      values: { label: '', darkMode: false, style: 'secondary', size: 'medium', btnType: 'only-icon', state: 'enabled', iconName: 'heartOutlined' },
    },
    {
      label: 'Agendar consulta',
      values: { label: 'Agendar consulta', darkMode: false, style: 'primary', size: 'large', btnType: 'left-icon', state: 'enabled', iconName: 'calendarAdd' },
    },
    {
      label: 'Dark mode primário',
      values: { label: 'Entrar', darkMode: true, style: 'primary', size: 'large', btnType: 'text', state: 'enabled', iconName: 'chevronArrowRight' },
    },
    {
      label: 'Carregando',
      values: { label: 'Enviando...', darkMode: false, style: 'primary', size: 'large', btnType: 'text', state: 'loading', iconName: 'chevronArrowRight' },
    },
  ],
  controls: {
    label:    { type: 'text',        label: 'Label',     default: 'Button label' },
    darkMode: { type: 'boolean',     label: 'Dark mode',  default: false },
    style:    { type: 'radio',       label: 'Style',     options: ['primary', 'secondary', 'tertiary'], default: 'primary' },
    size:     { type: 'radio',       label: 'Size',      options: ['small', 'medium', 'large'], default: 'small' },
    btnType:  { type: 'radio',       label: 'Type',      options: ['text', 'left-icon', 'right-icon', 'only-icon'], default: 'text' },
    state:    { type: 'select',      label: 'State',     options: ['enabled', 'pressed', 'disabled', 'loading'], default: 'enabled' },
    iconName: { type: 'icon-picker', label: 'Icon',      default: 'chevronArrowRight', showWhen: { field: 'btnType', values: ['left-icon', 'right-icon', 'only-icon'] } },
  },
  render: (p) => {
    const iconName = p.iconName as string
    const iconSize = p.size === 'small' ? 16 : 20
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
