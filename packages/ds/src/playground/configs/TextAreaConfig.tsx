import { TextArea } from '../../components/TextArea/TextArea'
import type { ComponentConfig } from '../types'

export const TextAreaConfig: ComponentConfig = {
  name: 'TextArea',
  presets: [
    { label: 'Idle — empty',     values: { state: 'idle-empty',     helper: true,  helperText: 'Helper text' } },
    { label: 'Idle — populated', values: { state: 'idle-populated', helper: true,  helperText: 'Helper text' } },
    { label: 'Focus',            values: { state: 'focus',          helper: true,  helperText: 'Helper text' } },
    { label: 'Error',            values: { state: 'error',          helper: true,  helperText: 'Error message' } },
    { label: 'Disabled',         values: { state: 'disabled',       helper: false, helperText: 'Helper text' } },
  ],
  controls: {
    state:      { type: 'select',  label: 'State',       options: ['idle-empty', 'idle-populated', 'focus', 'error', 'disabled'], default: 'idle-empty' },
    helper:     { type: 'boolean', label: 'Helper text', default: true },
    helperText: { type: 'text',    label: 'Helper text', default: 'Helper text', showWhen: { field: 'helper', values: ['true'] } },
  },
  render: (p) => (
    <TextArea
      state={p.state as any}
      helper={p.helper as boolean}
      helperText={p.helperText as string}
    />
  ),
  slotRender: (p) => (
    <TextArea
      state={p.state as any}
      helper={p.helper as boolean}
      helperText={p.helperText as string}
    />
  ),
}
