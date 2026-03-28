import { CardSection } from '../../components/CardSection/CardSection'
import { Icon } from '../../icons/Icon'
import type { ComponentConfig } from '../types'

export const CardSectionConfig: ComponentConfig = {
  name: 'CardSection',
  presets: [
    {
      label: 'Brand Responsive',
      values: {
        type: 'brand',
        size: 'responsive',
        title: 'Alice Agora',
        description: 'Te ajudamos em emergências, queixas de saúde e gestão do seu plano',
        ctaLabel: 'Falar com médico',
      },
    },
    {
      label: 'Primary Large',
      values: {
        type: 'primary',
        size: 'large',
        title: 'Rede credenciada',
        description: 'Encontre médicos e clínicas perto de você',
        ctaLabel: 'Ver rede',
      },
    },
    {
      label: 'Brand Medium',
      values: {
        type: 'brand',
        size: 'medium',
        title: 'Exames',
        description: 'Resultados e laudos disponíveis',
        ctaLabel: 'Saiba mais',
      },
    },
    {
      label: 'Primary Small',
      values: {
        type: 'primary',
        size: 'small',
        title: 'Favoritos',
        ctaLabel: 'Ver todos',
        description: '',
      },
    },
    {
      label: 'Brand XSmall',
      values: {
        type: 'brand',
        size: 'xsmall',
        title: 'Plano',
        description: 'Gestor do plano',
        ctaLabel: 'Saiba mais',
      },
    },
    {
      label: 'Skeleton',
      values: {
        type: 'skeleton',
        size: 'responsive',
        title: 'Título',
        description: 'Te ajudamos em emergências, queixas de saúde e gestão do seu plano',
        ctaLabel: 'Saiba mais',
      },
    },
  ],
  controls: {
    type: {
      type: 'radio',
      label: 'Type',
      options: ['brand', 'primary', 'skeleton'],
      default: 'brand',
    },
    size: {
      type: 'select',
      label: 'Size',
      options: ['responsive', 'large', 'medium', 'small', 'xsmall'],
      default: 'responsive',
    },
    title: {
      type: 'text',
      label: 'Title',
      default: 'Título',
    },
    description: {
      type: 'text',
      label: 'Description',
      default: 'Te ajudamos em emergências, queixas de saúde e gestão do seu plano',
      showWhen: { field: 'size', values: ['responsive', 'large', 'medium'] },
    },
    ctaLabel: {
      type: 'text',
      label: 'CTA Label',
      default: 'Saiba mais',
      showWhen: { field: 'type', values: ['brand', 'primary'] },
    },
  },
  render: (p) => {
    const type = p.type as 'brand' | 'primary' | 'skeleton'
    const size = p.size as 'responsive' | 'large' | 'medium' | 'small' | 'xsmall'
    const iconColor = type === 'brand' ? 'var(--color-brand)' : 'var(--color-content-primary)'

    return (
      <CardSection
        type={type}
        size={size}
        title={p.title as string}
        description={p.description as string}
        ctaLabel={p.ctaLabel as string}
        icon={<Icon name="heart-outline" size={32} color={iconColor} />}
      />
    )
  },
}
