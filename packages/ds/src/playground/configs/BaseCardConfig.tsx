import { BaseCard } from '../../components/BaseCard/BaseCard'
import { Icon } from '../../icons/Icon'
import { placeholders } from '../../assets/placeholders'
import type { ComponentConfig } from '../types'

export const BaseCardConfig: ComponentConfig = {
  name: 'BaseCard',
  presets: [
    {
      label: 'Promoção com botão',
      values: { category: 'Novidade', title: 'Frete grátis', subtitle: 'Aproveite frete grátis em pedidos acima de R$50', size: 'large', filled: false, action: 'button', buttonLabel: 'Ver ofertas', showCategory: true, showTitle: true, showSubtitle: true, leftAsset: true, rightAsset: false, showSlot: false, leftIconName: 'truck-delivery-outline', rightIconName: 'link-variant' },
    },
    {
      label: 'Suporte com link',
      values: { category: 'Suporte', title: 'Precisa de ajuda?', subtitle: 'Fale com nosso atendimento', size: 'small', filled: false, action: 'link', linkLabel: 'Falar com suporte', showCategory: true, showTitle: true, showSubtitle: true, leftAsset: true, rightAsset: false, showSlot: false, leftIconName: 'help-circle-outline', rightIconName: 'link-variant' },
    },
    {
      label: 'Consulta agendada',
      values: { category: 'Próxima consulta', title: 'Terça, 04 de Março — 16h', subtitle: 'Online com Isabella', size: 'small', filled: false, action: 'link', linkLabel: 'Ver consulta', showCategory: true, showTitle: true, showSubtitle: true, leftAsset: false, rightAsset: false, showSlot: false, leftIconName: 'link-variant', rightIconName: 'link-variant' },
    },
    {
      label: 'Card com slot e 2 botões',
      values: { category: 'Destaque', title: 'Conheça nossos planos', subtitle: 'Planos a partir de R$99/mês com cobertura completa', size: 'large', filled: false, action: '2buttons', buttonLabel: 'Ver planos', buttonLabel2: 'Comparar', showCategory: true, showTitle: true, showSubtitle: true, leftAsset: true, rightAsset: true, showSlot: true, leftIconName: 'shield-check-outline', rightIconName: 'chevron-right' },
    },
    {
      label: 'Card filled mínimo',
      values: { category: 'Dica', title: 'Beba mais água', subtitle: 'Você bebeu apenas 3 copos hoje', size: 'small', filled: true, action: 'none', showCategory: true, showTitle: true, showSubtitle: true, leftAsset: true, rightAsset: false, showSlot: false, leftIconName: 'water-outline', rightIconName: 'link-variant' },
    },
    {
      label: 'Médica com link',
      values: { category: 'Minha médica', title: 'Isabella Moreira Hueb', subtitle: '', size: 'small', filled: false, action: 'link', linkLabel: 'Agendar consulta', showCategory: true, showTitle: true, showSubtitle: false, leftAsset: false, rightAsset: false, showSlot: false, leftIconName: 'link-variant', rightIconName: 'link-variant' },
    },
    {
      label: 'FAQ com 2 links',
      values: { category: 'Dúvidas', title: 'Como funciona o agendamento?', subtitle: 'Tire suas dúvidas sobre consultas online e presenciais', size: 'small', filled: false, action: '2links', linkLabel: 'Saiba mais', linkLabel2: 'Fale conosco', showCategory: true, showTitle: true, showSubtitle: true, leftAsset: true, rightAsset: false, showSlot: false, leftIconName: 'frequently-asked-questions', rightIconName: 'link-variant' },
    },
  ],
  controls: {
    category:      { type: 'text',        label: 'Category',       default: 'Category' },
    title:         { type: 'text',        label: 'Title',          default: 'Title' },
    subtitle:      { type: 'text',        label: 'Subtitle',       default: 'Subtitle' },
    size:          { type: 'radio',       label: 'Size',           options: ['small', 'large'], default: 'small' },
    filled:        { type: 'boolean',     label: 'Filled',         default: false },
    action:        { type: 'radio',       label: 'Action',         options: ['none', 'button', '2buttons', 'link', '2links'], default: 'none' },
    buttonLabel:   { type: 'text',        label: 'Button label',   default: 'Button label', showWhen: { field: 'action', values: ['button', '2buttons'] } },
    buttonLabel2:  { type: 'text',        label: 'Button 2 label', default: 'Button label', showWhen: { field: 'action', values: ['2buttons'] } },
    linkLabel:     { type: 'text',        label: 'Link label',     default: 'Link label', showWhen: { field: 'action', values: ['link', '2links'] } },
    linkLabel2:    { type: 'text',        label: 'Link 2 label',   default: 'Link label', showWhen: { field: 'action', values: ['2links'] } },
    showCategory:  { type: 'boolean',     label: 'Category',       default: true },
    showTitle:     { type: 'boolean',     label: 'Title',          default: true },
    showSubtitle:  { type: 'boolean',     label: 'Subtitle',       default: true },
    leftAsset:     { type: 'boolean',     label: 'Left asset',     default: true },
    rightAsset:    { type: 'boolean',     label: 'Right asset',    default: true },
    showSlot:      { type: 'boolean',     label: 'Slot',           default: false },
    leftAssetType: { type: 'radio',       label: 'Left type',  options: ['icon', 'image'], default: 'icon', showWhen: { field: 'leftAsset', values: ['true'] } },
    leftIconName:  { type: 'icon-picker', label: 'Left icon',  default: 'link-variant', showWhen: { field: 'leftAssetType', values: ['icon'] } },
    rightAssetType:{ type: 'radio',       label: 'Right type', options: ['icon', 'image'], default: 'icon', showWhen: { field: 'rightAsset', values: ['true'] } },
    rightIconName: { type: 'icon-picker', label: 'Right icon', default: 'link-variant', showWhen: { field: 'rightAssetType', values: ['icon'] } },
  },
  render: (p) => {
    const size = p.size as string
    const assetSize = size === 'large' ? 24 : 20
    const leftAssetType = p.leftAssetType as string
    const rightAssetType = p.rightAssetType as string

    const leftIcon = leftAssetType !== 'image' && p.leftIconName
      ? <Icon name={p.leftIconName as string} size={assetSize} color="var(--color-content-primary)" />
      : undefined

    const rightIcon = rightAssetType !== 'image' && p.rightIconName
      ? <Icon name={p.rightIconName as string} size={assetSize} color="var(--color-content-primary)" />
      : undefined

    return (
      <BaseCard
          size={p.size as any}
          filled={p.filled as boolean}
          category={p.category as string}
          showCategory={p.showCategory as boolean}
          title={p.title as string}
          showTitle={p.showTitle as boolean}
          subtitle={p.subtitle as string}
          showSubtitle={p.showSubtitle as boolean}
          leftAsset={p.leftAsset as boolean}
          rightAsset={p.rightAsset as boolean}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          leftImage={leftAssetType === 'image' ? placeholders.person : undefined}
          rightImage={rightAssetType === 'image' ? placeholders.person : undefined}
          action={p.action as any}
          showSlot={p.showSlot as boolean}
          buttonLabel={p.buttonLabel as string}
          buttonLabel2={p.buttonLabel2 as string}
          linkLabel={p.linkLabel as string}
          linkLabel2={p.linkLabel2 as string}
        />
    )
  },
}
