import { TextField } from '../../components/TextField/TextField'
import type { ComponentConfig } from '../types'

export const TextFieldConfig: ComponentConfig = {
  name: 'TextField',
  presets: [
    { label: 'Idle',           values: { variant: 'Idle',   hasError: false, label: 'Label', value: '',           showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify', showRightIcon: true,  rightIcon: 'close' } },
    { label: 'Focus',          values: { variant: 'Focus',  hasError: false, label: 'Label', value: '',           showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify', showRightIcon: true,  rightIcon: 'close' } },
    { label: 'Filled',         values: { variant: 'Filled', hasError: false, label: 'Label', value: 'Value text', showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify', showRightIcon: true,  rightIcon: 'close' } },
    { label: 'Error (idle)',   values: { variant: 'Idle',   hasError: true,  label: 'Label', value: '',           showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'alert-circle-outline', showRightIcon: true,  rightIcon: 'alert-circle-outline' } },
    { label: 'Error (filled)', values: { variant: 'Filled', hasError: true,  label: 'Label', value: 'Value text', showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'alert-circle-outline', showRightIcon: true,  rightIcon: 'alert-circle-outline' } },
    { label: 'Disable',        values: { variant: 'Disable', hasError: false, label: 'Label', value: 'Value text', showHelperText: true, helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify', showRightIcon: true,  rightIcon: 'close' } },
  ],
  controls: {
    variant:       { type: 'radio',       label: 'Variant',     options: ['Idle', 'Focus', 'Filled', 'Disable'], default: 'Idle' },
    hasError:      { type: 'boolean',     label: 'Error',       default: false, showWhen: { field: 'variant', values: ['Idle', 'Focus', 'Filled'] } },
    label:         { type: 'text',        label: 'Label',       default: 'Label' },
    value:         { type: 'text',        label: 'Value',       default: '', showWhen: { field: 'variant', values: ['Filled', 'Disable'] } },
    showHelperText: { type: 'boolean',    label: 'HelperText',  default: false },
    helperText:    { type: 'text',        label: 'Helper text', default: 'Helper text', showWhen: { field: 'showHelperText', values: ['true'] } },
    showCounter:   { type: 'boolean',     label: 'Counter',     default: false },
    counter:       { type: 'text',        label: 'Counter',     default: '20/40', showWhen: { field: 'showCounter', values: ['true'] } },
    showLeftIcon:  { type: 'boolean',     label: 'LeftIcon',    default: false },
    leftIcon:      { type: 'icon-picker', label: 'Left icon',   default: 'magnify', showWhen: { field: 'showLeftIcon', values: ['true'] } },
    showRightIcon: { type: 'boolean',     label: 'RightIcon',   default: false },
    rightIcon:     { type: 'icon-picker', label: 'Right icon',  default: 'close', showWhen: { field: 'showRightIcon', values: ['true'] } },
  },
  render: (p, onChange) => (
    <TextField
      variant={p.variant as any}
      hasError={p.hasError as boolean}
      label={p.label as string}
      value={p.value as string}
      helperText={p.showHelperText ? p.helperText as string : undefined}
      counter={p.showCounter ? p.counter as string : undefined}
      leftIcon={p.showLeftIcon ? p.leftIcon as string || undefined : undefined}
      rightIcon={p.showRightIcon ? p.rightIcon as string || undefined : undefined}
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
      helperText={p.showHelperText ? p.helperText as string : undefined}
      counter={p.showCounter ? p.counter as string : undefined}
      leftIcon={p.showLeftIcon ? p.leftIcon as string || undefined : undefined}
      rightIcon={p.showRightIcon ? p.rightIcon as string || undefined : undefined}
      width="100%"
    />
  ),
}
