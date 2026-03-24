import { CardMFC } from '../../components/CardMFC/CardMFC'
import { mfc1, mfc2, mfc3 } from '../../assets/mfc'
import type { ComponentConfig } from '../types'

export const CardMFCConfig: ComponentConfig = {
  name: 'CardMFC',
  presets: [
    {
      label: 'Highlighted — Fabiana',
      values: { style: 'highlighted', name: 'Fabiana Dubinevics', bio: 'Formada pela Faculdade de Medicina da Santa Casa de São Paulo, em 2018.', rating: '4.7', distance: '2.4 km', modality: 'Online e presencial', linkLabel: '', photo: 'Fabiana' },
    },
    {
      label: 'Highlighted — Tiago',
      values: { style: 'highlighted', name: 'Tiago Ariel', bio: 'Especialista em medicina de família e comunidade.', rating: '4.9', distance: '1.2 km', modality: 'Presencial', linkLabel: '', photo: 'Tiago' },
    },
    {
      label: 'Highlighted — Manuela',
      values: { style: 'highlighted', name: 'Manuela Guedes', bio: 'Médica de família com foco em saúde preventiva e bem-estar.', rating: '4.8', distance: '3.0 km', modality: 'Online e presencial', linkLabel: '', photo: 'Manuela' },
    },
    {
      label: 'Compact',
      values: { style: 'compact', name: 'Fabiana Dubinevics', label: 'Minha médica', linkLabel: '', photo: 'Fabiana' },
    },
  ],
  controls: {
    style:    { type: 'radio',   label: 'Style',    options: ['highlighted', 'compact'], default: 'highlighted' },
    name:     { type: 'text',    label: 'Name',     default: 'Fabiana Dubinevics' },
    bio:      { type: 'text',    label: 'Bio',      default: 'Formada pela Faculdade de Medicina da Santa Casa de São Paulo, em 2018.', showWhen: { field: 'style', values: ['highlighted'] } },
    label:    { type: 'text',    label: 'Label',    default: 'Minha médica', showWhen: { field: 'style', values: ['compact'] } },
    rating:   { type: 'text',    label: 'Rating',   default: '4.7', showWhen: { field: 'style', values: ['highlighted'] } },
    distance: { type: 'text',    label: 'Distance', default: '2.4 km', showWhen: { field: 'style', values: ['highlighted'] } },
    modality: { type: 'text',    label: 'Modality', default: 'Online e presencial', showWhen: { field: 'style', values: ['highlighted'] } },
    linkLabel: { type: 'text',   label: 'Link label', default: '' },
    photo:    { type: 'radio',   label: 'Foto',      options: ['Fabiana', 'Tiago', 'Manuela'], default: 'Fabiana' },
  },
  render: (p) => {
    const photoMap: Record<string, string> = { Fabiana: mfc1, Tiago: mfc2, Manuela: mfc3 }
    const insetMap: Record<string, { top: string; right: string; bottom: string; left: string }> = {
      Fabiana: { top: '-8.19%', right: '-4.7%',  bottom: '-8.19%', left: '-16.3%' },
      Tiago:   { top: '-1.9%',  right: '-4.08%', bottom: '0%',     left: '-3.13%' },
      Manuela: { top: '-8%',    right: '-5%',     bottom: '-8%',    left: '-5%'    },
    }
    const photo = p.photo as string
    return (
      <CardMFC
        style={p.style as any}
        name={p.name as string}
        bio={p.bio as string}
        label={p.label as string}
        rating={p.rating as string}
        distance={p.distance as string}
        modality={p.modality as string}
        linkLabel={p.linkLabel as string}
        imageUrl={photoMap[photo] ?? mfc1}
        imageInset={insetMap[photo]}
        width={p.style === 'compact' ? 327 : 319}
      />
    )
  },
  slotRender: (p) => {
    const photoMap: Record<string, string> = { Fabiana: mfc1, Tiago: mfc2, Manuela: mfc3 }
    const insetMap: Record<string, { top: string; right: string; bottom: string; left: string }> = {
      Fabiana: { top: '-8.19%', right: '-4.7%',  bottom: '-8.19%', left: '-16.3%' },
      Tiago:   { top: '-1.9%',  right: '-4.08%', bottom: '0%',     left: '-3.13%' },
      Manuela: { top: '-8%',    right: '-5%',     bottom: '-8%',    left: '-5%'    },
    }
    const photo = p.photo as string
    return (
      <CardMFC
        style={p.style as any}
        name={p.name as string}
        bio={p.bio as string}
        label={p.label as string}
        rating={p.rating as string}
        distance={p.distance as string}
        modality={p.modality as string}
        linkLabel={p.linkLabel as string}
        imageUrl={photoMap[photo] ?? mfc1}
        imageInset={insetMap[photo]}
        width="100%"
      />
    )
  },
}
