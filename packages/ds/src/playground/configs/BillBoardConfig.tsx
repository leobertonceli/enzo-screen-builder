import { BillBoard } from '../../components/BillBoard/BillBoard'
import type { ComponentConfig } from '../types'

export const BillBoardConfig: ComponentConfig = {
  name: 'BillBoard',
  presets: [
    {
      label: 'Action Idle',
      values: { type: 'action', status: 'idle', title: 'Agendar consulta', address: 'Rua Augusta, 1847', tag: true, tagLabel: 'Hoje' },
    },
    {
      label: 'Action Pressed',
      values: { type: 'action', status: 'pressed', title: 'Agendar consulta', address: 'Rua Augusta, 1847', tag: true, tagLabel: 'Hoje' },
    },
    {
      label: 'Event',
      values: { type: 'event', title: 'Consulta com Dr. João', address: 'Clínica Alice — Paulista', day: '24', month: 'MAR' },
    },
    {
      label: 'Skeleton',
      values: { type: 'skeleton' },
    },
  ],
  controls: {
    type:      { type: 'radio',   label: 'Type',    options: ['action', 'event', 'skeleton'], default: 'action' },
    status:    { type: 'radio',   label: 'Status',  options: ['idle', 'pressed'],              default: 'idle',    showWhen: { field: 'type', values: ['action'] } },
    title:     { type: 'text',    label: 'Title',   default: 'Agendar consulta',               showWhen: { field: 'type', values: ['action', 'event'] } },
    address:   { type: 'text',    label: 'Address', default: 'Rua Augusta, 1847',              showWhen: { field: 'type', values: ['action', 'event'] } },
    day:       { type: 'text',    label: 'Day',     default: '24',                             showWhen: { field: 'type', values: ['event'] } },
    month:     { type: 'text',    label: 'Month',   default: 'MAR',                            showWhen: { field: 'type', values: ['event'] } },
    tag:       { type: 'boolean', label: 'Tag',     default: true,                             showWhen: { field: 'type', values: ['action'] } },
    tagLabel:  { type: 'text',    label: 'Tag label', default: 'Hoje',                         showWhen: { field: 'tag', values: ['true'] } },
  },
  render: (p) => (
    <BillBoard
      type={p.type as any}
      status={p.status as any}
      title={p.title as string}
      address={p.address as string}
      day={p.day as string}
      month={p.month as string}
      tag={p.tag as boolean}
      tagLabel={p.tagLabel as string}
    />
  ),
}
