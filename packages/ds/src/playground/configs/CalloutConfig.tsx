import { Callout } from '../../components/Callout/Callout'
import type { ComponentConfig } from '../types'

export const CalloutConfig: ComponentConfig = {
  name: 'Callout',
  presets: [
    { label: 'Alert',       values: { status: 'Alert',       title: 'Título', description: 'Dê preferência para descrições de até 2 linhas.', showLink: false, linkLabel: 'Link label', showClose: false, highlightIcon: 'asterisk' } },
    { label: 'Information', values: { status: 'Information', title: 'Título', description: 'Dê preferência para descrições de até 2 linhas.', showLink: false, linkLabel: 'Link label', showClose: false, highlightIcon: 'asterisk' } },
    { label: 'Warning',     values: { status: 'Warning',     title: 'Título', description: 'Dê preferência para descrições de até 2 linhas.', showLink: false, linkLabel: 'Link label', showClose: false, highlightIcon: 'asterisk' } },
    { label: 'Highlight',   values: { status: 'Highlight',   title: 'Título', description: 'Dê preferência para descrições de até 2 linhas.', showLink: false, linkLabel: 'Link label', showClose: false, highlightIcon: 'asterisk' } },
  ],
  controls: {
    status:        { type: 'radio',       label: 'Status',      options: ['Alert', 'Information', 'Warning', 'Highlight'], default: 'Alert' },
    title:         { type: 'text',        label: 'Title',       default: 'Título' },
    description:   { type: 'text',        label: 'Description', default: 'Dê preferência para descrições de até 2 linhas.' },
    highlightIcon: { type: 'icon-picker', label: 'Icon',        default: 'asterisk', showWhen: { field: 'status', values: ['Highlight'] } },
    showLink:      { type: 'boolean',     label: 'Link',        default: false },
    linkLabel:     { type: 'text',        label: 'Link label',  default: 'Link label', showWhen: { field: 'showLink', values: ['true'] } },
    showClose:     { type: 'boolean',     label: 'Close',       default: false },
  },
  render: (p, onChange) => (
    <Callout
      status={p.status as any}
      title={p.title as string}
      description={p.description as string}
      showLink={p.showLink as boolean}
      linkLabel={p.linkLabel as string}
      showClose={p.showClose as boolean}
      highlightIcon={p.highlightIcon as string || undefined}
      width={327}
      onChange={onChange}
    />
  ),
  slotRender: (p) => (
    <Callout
      status={p.status as any}
      title={p.title as string}
      description={p.description as string}
      showLink={p.showLink as boolean}
      linkLabel={p.linkLabel as string}
      showClose={p.showClose as boolean}
      highlightIcon={p.highlightIcon as string || undefined}
      width="100%"
    />
  ),
}
