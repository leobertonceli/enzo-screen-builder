import { AppBar } from '../../components/AppBar/AppBar'
import type { ComponentConfig } from '../types'

export const AppBarConfig: ComponentConfig = {
  name: 'AppBar',
  presets: [
    {
      label: 'Home',
      values: { type: 'home', userName: 'Leonardo', showRightIcons: true, showProgressBar: false },
    },
    {
      label: 'Section',
      values: { type: 'section', title: 'Alice Agora', subtitle: 'subtítulo', showRightIcons: true, showProgressBar: false },
    },
    {
      label: 'Brand',
      values: { type: 'brand', title: 'alice', showRightIcons: true, showProgressBar: false },
    },
    {
      label: 'Search',
      values: { type: 'search', title: 'Alice Agora', showRightIcons: true, showProgressBar: false },
    },
    {
      label: 'IA',
      values: { type: 'ia', title: 'Alice Agora', showRightIcons: true, showProgressBar: false },
    },
  ],
  controls: {
    type: {
      type: 'select',
      label: 'Type',
      options: ['home', 'section', 'brand', 'search', 'ia'],
      default: 'home',
    },
    title: {
      type: 'text',
      label: 'Title',
      default: 'Alice Agora',
      showWhen: { field: 'type', values: ['section', 'brand', 'search', 'ia'] },
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle',
      default: 'subtítulo',
      showWhen: { field: 'type', values: ['section'] },
    },
    userName: {
      type: 'text',
      label: 'User name',
      default: 'Leonardo',
      showWhen: { field: 'type', values: ['home'] },
    },
    showRightIcons: {
      type: 'boolean',
      label: 'Right icons',
      default: true,
    },
    showProgressBar: {
      type: 'boolean',
      label: 'Progress bar',
      default: false,
      showWhen: { field: 'type', values: ['section', 'brand', 'ia'] },
    },
  },
  render: (p) => (
    <AppBar
      type={p.type as any}
      title={p.title as string}
      subtitle={p.subtitle as string | undefined}
      userName={p.userName as string}
      showRightIcons={p.showRightIcons as boolean}
      showProgressBar={p.showProgressBar as boolean}
    />
  ),
}
