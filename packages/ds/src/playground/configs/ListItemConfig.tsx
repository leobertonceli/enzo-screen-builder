import { ListItem } from '../../components/ListItem'
import { Icon } from '../../icons/Icon'
import { placeholders } from '../../assets/placeholders'
import type { ComponentConfig } from '../types'

export const ListItemConfig: ComponentConfig = {
  name: 'ListItem',
  presets: [
    {
      label: 'Meus pedidos',
      values: { title: 'Meus pedidos', description: 'Acompanhe seus pedidos recentes', size: 'small', state: 'default', leftSide: 'icon', leftIcon: 'clipboard-text-outline', imageSrc: placeholders.person, fullWidth: true, rightAsset: 'icon', rightIcon: 'chevron-right', rightText: 'Text', divider: true },
    },
    {
      label: 'Médica com foto',
      values: { title: 'Isabella Moreira Hueb', description: 'Clínica Geral • Disponível hoje', size: 'large', state: 'default', leftSide: 'image', leftIcon: 'heart-outline', imageSrc: placeholders.person, fullWidth: true, rightAsset: 'icon', rightIcon: 'chevron-right', rightText: 'Text', divider: true },
    },
    {
      label: 'Favoritos',
      values: { title: 'Favoritos', description: 'Seus lugares salvos', size: 'small', state: 'default', leftSide: 'icon', leftIcon: 'heart-outline', fullWidth: true, rightAsset: 'icon', rightIcon: 'chevron-right', rightText: 'Text', divider: true },
    },
    {
      label: 'Endereço com texto',
      values: { title: 'Endereços', description: 'Gerencie seus endereços de entrega', size: 'large', state: 'default', leftSide: 'icon', leftIcon: 'map-marker-outline', fullWidth: true, rightAsset: 'text', rightIcon: 'chevron-right', rightText: '3 salvos', divider: false },
    },
    {
      label: 'Pagamentos',
      values: { title: 'Pagamentos', description: 'Formas de pagamento', size: 'small', state: 'default', leftSide: 'icon', leftIcon: 'credit-card-outline', fullWidth: true, rightAsset: 'icon', rightIcon: 'chevron-right', rightText: 'Text', divider: true },
    },
    {
      label: 'Resultado de exame',
      values: { title: 'Resultados', description: 'Nenhum resultado disponível', size: 'small', state: 'default', leftSide: 'icon', leftIcon: 'file-document-outline', fullWidth: true, rightAsset: 'icon', rightIcon: 'chevron-right', rightText: 'Text', divider: false },
    },
    {
      label: 'Configuração com status',
      values: { title: 'Notificações', description: 'Alertas e lembretes', size: 'large', state: 'default', leftSide: 'icon', leftIcon: 'bell-outline', fullWidth: true, rightAsset: 'text-icon', rightIcon: 'chevron-right', rightText: 'Ativo', divider: true },
    },
    {
      label: 'Item sem ícone',
      values: { title: 'Termos de uso', description: 'Leia os termos e condições', size: 'small', state: 'default', leftSide: 'none', leftIcon: 'heart-outline', fullWidth: true, rightAsset: 'icon', rightIcon: 'chevron-right', rightText: 'Text', divider: false },
    },
  ],
  controls: {
    title:       { type: 'text',        label: 'Title',       default: 'Title' },
    description: { type: 'text',        label: 'Description', default: 'Description that can go up to two lines of text' },
    size:        { type: 'radio',       label: 'Size',        options: ['small', 'large'], default: 'small' },
    state:       { type: 'select',      label: 'State',       options: ['default', 'pressed', 'loading'], default: 'default' },
    leftSide:    { type: 'radio',       label: 'Left side',   options: ['none', 'icon', 'image'], default: 'none' },
    leftIcon:    { type: 'icon-picker', label: 'Left icon',   default: 'heart-outline', showWhen: { field: 'leftSide', values: ['icon'] } },
    fullWidth:   { type: 'boolean',     label: 'Full width',  default: true },
    rightAsset:  { type: 'radio',       label: 'Right asset', options: ['none', 'icon', 'text', 'text-icon'], default: 'icon' },
    rightIcon:   { type: 'icon-picker', label: 'Right icon',  default: 'chevron-right', showWhen: { field: 'rightAsset', values: ['icon', 'text-icon'] } },
    rightText:   { type: 'text',        label: 'Right text',  default: 'Text', showWhen: { field: 'rightAsset', values: ['text', 'text-icon'] } },
    divider:     { type: 'boolean',     label: 'Divider',     default: false },
  },
  render: (p, onChange) => {
    const leftIconName = p.leftIcon as string
    const leftIconEl = leftIconName ? <Icon name={leftIconName} size={20} color="var(--color-content-primary)" /> : undefined

    const rightIconName = p.rightIcon as string
    const rightIconEl = rightIconName ? <Icon name={rightIconName} size={20} color="var(--color-content-primary)" /> : undefined

    return (
      <div style={{ width: (p.fullWidth as boolean) ? 375 : 327 }}>
        <ListItem
          title={p.title as string}
          description={p.description as string || undefined}
          size={p.size as any}
          state={p.state as any}
          leftSide={p.leftSide as any}
          fullWidth={p.fullWidth as boolean}
          rightAsset={p.rightAsset as any}
          rightText={p.rightText as string}
          divider={p.divider as boolean}
          icon={leftIconEl}
          imageSrc={p.leftSide === 'image' ? placeholders.person : undefined}
          rightIconElement={rightIconEl}
          onChange={onChange}
        />
      </div>
    )
  },
}
