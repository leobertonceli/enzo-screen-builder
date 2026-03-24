import { TextField } from '../../components/TextField/TextField'
import type { ComponentConfig } from '../types'

export const TextFieldConfig: ComponentConfig = {
  name: 'TextField',
  presets: [
    { label: 'Idle',         values: { variant: 'Idle',   hasError: false, label: 'Label', value: '',            helperText: 'Helper text', counter: '20/40', leftIcon: 'magnify', rightIcon: 'close' } },
    { label: 'Focus',        values: { variant: 'Focus',  hasError: false, label: 'Label', value: '',            helperText: 'Helper text', counter: '20/40', leftIcon: 'magnify', rightIcon: 'close' } },
    { label: 'Filled',       values: { variant: 'Filled', hasError: false, label: 'Label', value: 'Value text',  helperText: 'Helper text', counter: '20/40', leftIcon: 'magnify', rightIcon: 'close' } },
    { label: 'Error (idle)', values: { variant: 'Idle',   hasError: true,  label: 'Label', value: '',            helperText: 'Helper text', counter: '20/40', leftIcon: 'alert-circle-outline', rightIcon: 'alert-circle-outline' } },
    { label: 'Error (filled)', values: { variant: 'Filled', hasError: true, label: 'Label', value: 'Value text', helperText: 'Helper text', counter: '20/40', leftIcon: 'alert-circle-outline', rightIcon: 'alert-circle-outline' } },
    { label: 'Disable',      values: { variant: 'Disable', hasError: false, label: 'Label', value: 'Placeholder text', helperText: 'Helper text', counter: '20/40', leftIcon: 'magnify', rightIcon: 'close' } },
  ],
  controls: {
    variant:    { type: 'radio',       label: 'Variant',     options: ['Idle', 'Focus', 'Filled', 'Disable'], default: 'Idle' },
    hasError:   { type: 'boolean',     label: 'Error',       default: false, showWhen: { field: 'variant', values: ['Idle', 'Focus', 'Filled'] } },
    label:      { type: 'text',        label: 'Label',       default: 'Label' },
    value:      { type: 'text',        label: 'Value',       default: '', showWhen: { field: 'variant', values: ['Focus', 'Filled', 'Disable'] } },
    helperText: { type: 'text',        label: 'Helper text', default: 'Helper text' },
    counter:    { type: 'text',        label: 'Counter',     default: '20/40' },
    leftIcon:   { type: 'icon-picker', label: 'Left icon',   default: 'magnify' },
    rightIcon:  { type: 'icon-picker', label: 'Right icon',  default: 'close' },
  },
  render: (p, onChange) => (
    <TextField
      variant={p.variant as any}
      hasError={p.hasError as boolean}
      label={p.label as string}
      value={p.value as string}
      helperText={p.helperText as string}
      counter={p.counter as string}
      leftIcon={p.leftIcon as string || undefined}
      rightIcon={p.rightIcon as string || undefined}
      width={327}
      onChange={onChange}
    />
  ),
  slotRender: (p) => (
    <TextField
      variant={p.variant as any}
      hasError={p.hasError as boolean}
      label={p.label as string}
      value={p.value as string}
      helperText={p.helperText as string}
      counter={p.counter as string}
      leftIcon={p.leftIcon as string || undefined}
      rightIcon={p.rightIcon as string || undefined}
      width="100%"
    />
  ),
}
