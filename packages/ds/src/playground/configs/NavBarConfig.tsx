import { NavBar } from '../../components/NavBar/NavBar'
import type { ComponentConfig } from '../types'

export const NavBarConfig: ComponentConfig = {
  name: 'NavBar',
  presets: [
    {
      label: 'Page — só título',
      values: { type: 'page', iconLeft: true, showTitle: true, title: 'Agendar consulta', showDescription: false, description: '', rightIcons: 0 },
    },
    {
      label: 'Page — título + desc',
      values: { type: 'page', iconLeft: true, showTitle: true, title: 'Dra. Isabella Moreira', showDescription: true, description: 'Clínica médica', rightIcons: 1 },
    },
    {
      label: 'Page — 2 ícones',
      values: { type: 'page', iconLeft: true, showTitle: true, title: 'Meu plano', showDescription: false, description: '', rightIcons: 2 },
    },
    {
      label: 'Page — sem iconLeft',
      values: { type: 'page', iconLeft: false, showTitle: true, title: 'Agendar consulta', showDescription: false, description: '', rightIcons: 0 },
    },
    {
      label: 'Modal — título + desc',
      values: { type: 'modal', showTitle: true, title: 'Filtros', showDescription: true, description: '3 filtros ativos', rightIcons: 1 },
    },
    {
      label: 'Modal — só título',
      values: { type: 'modal', showTitle: true, title: 'Selecionar data', showDescription: false, description: '', rightIcons: 0 },
    },
  ],
  controls: {
    type: {
      type: 'radio',
      label: 'Type',
      options: ['page', 'modal'],
      default: 'page',
    },
    iconLeft: {
      type: 'boolean',
      label: 'Icon left',
      default: true,
      showWhen: { field: 'type', values: ['page'] },
    },
    showTitle: {
      type: 'boolean',
      label: 'Title',
      default: true,
    },
    title: {
      type: 'text',
      label: 'Title text',
      default: 'Agendar consulta',
      showWhen: { field: 'showTitle', values: ['true'] },
    },
    showDescription: {
      type: 'boolean',
      label: 'Description',
      default: false,
      showWhen: { field: 'showTitle', values: ['true'] },
    },
    description: {
      type: 'text',
      label: 'Description text',
      default: 'Clínica médica',
      showWhen: { field: 'showDescription', values: ['true'] },
    },
    rightIcons: {
      type: 'radio',
      label: 'Right icons',
      options: ['0', '1', '2'],
      default: '0',
    },
  },
  render: (p, onChange) => (
    <NavBar
      type={p.type as any}
      iconLeft={p.iconLeft as boolean}
      showTitle={p.showTitle as boolean}
      title={p.title as string}
      showDescription={p.showDescription as boolean}
      description={p.description as string}
      rightIcons={Number(p.rightIcons) as 0 | 1 | 2}
      onChange={onChange}
    />
  ),
}
