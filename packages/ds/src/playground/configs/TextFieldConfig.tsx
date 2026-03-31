// @refresh reset
import { useState, useEffect, useRef } from 'react'
import { TextField } from '../../components/TextField/TextField'
import type { ComponentConfig } from '../types'

/* Interactive wrapper — real input, syncs both ways with controls */
function InteractiveTextField({
  p,
  onChange,
}: {
  p: Record<string, unknown>
  onChange: (key: string, val: unknown) => void
}) {
  const isDisable = p.variant === 'Disable'

  // Internal value — seeded from prop when variant/value changes externally
  const [value, setValue] = useState(
    p.variant === 'Filled' || p.variant === 'Disable' ? (p.value as string) || 'Value text' : '',
  )

  // Tracks whether the last variant change came from inside the component (typing/focus)
  // so we can skip the value-sync useEffect for those cases
  const internalChangeRef = useRef(false)

  // When controls change variant externally → sync value state
  useEffect(() => {
    if (internalChangeRef.current) {
      internalChangeRef.current = false
      return
    }
    if (p.variant === 'Filled' || p.variant === 'Disable') {
      setValue((p.value as string) || 'Value text')
    } else if (p.variant === 'Idle') {
      setValue('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.variant, p.value])

  // Focus the real input when variant is set to 'Focus' via the radio control
  useEffect(() => {
    if (internalChangeRef.current) return
    if (p.variant === 'Focus' && !isDisable) {
      setTimeout(() => {
        const el = document.querySelector(`[data-tf-id="${p.label}"]`) as HTMLInputElement | null
        el?.focus()
      }, 50)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.variant, p.label])

  return (
    <TextField
      label={p.label as string}
      value={value}
      hasError={p.hasError as boolean}
      helperText={p.showHelperText ? (p.helperText as string) : undefined}
      counter={p.showCounter ? (p.counter as string) : undefined}
      leftIcon={p.showLeftIcon ? (p.leftIcon as string) || undefined : undefined}
      rightIcon={p.showRightIcon ? (p.rightIcon as string) || undefined : undefined}
      width={327}
      // Disable variant is passed statically — TextField handles it
      variant={isDisable ? 'Disable' : undefined}
      onValueChange={isDisable ? undefined : (v) => {
        setValue(v)
        internalChangeRef.current = true
        onChange('variant', v ? 'Filled' : 'Idle')
        onChange('value', v)
      }}
      onFocusChange={isDisable ? undefined : (focused) => {
        internalChangeRef.current = true
        if (focused) {
          onChange('variant', 'Focus')
        } else {
          onChange('variant', value ? 'Filled' : 'Idle')
        }
      }}
    />
  )
}

export const TextFieldConfig: ComponentConfig = {
  name: 'TextField',
  presets: [
    { label: 'Idle',           values: { variant: 'Idle',    hasError: false, label: 'Label', value: '',           showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify',              showRightIcon: true,  rightIcon: 'close' } },
    { label: 'Focus',          values: { variant: 'Focus',   hasError: false, label: 'Label', value: '',           showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify',              showRightIcon: true,  rightIcon: 'close' } },
    { label: 'Filled',         values: { variant: 'Filled',  hasError: false, label: 'Label', value: 'Value text', showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify',              showRightIcon: true,  rightIcon: 'close' } },
    { label: 'Error (idle)',   values: { variant: 'Idle',    hasError: true,  label: 'Label', value: '',           showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'alert-circle-outline', showRightIcon: true,  rightIcon: 'alert-circle-outline' } },
    { label: 'Error (filled)', values: { variant: 'Filled',  hasError: true,  label: 'Label', value: 'Value text', showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'alert-circle-outline', showRightIcon: true,  rightIcon: 'alert-circle-outline' } },
    { label: 'Disable',        values: { variant: 'Disable', hasError: false, label: 'Label', value: 'Value text', showHelperText: true,  helperText: 'Helper text', showCounter: true,  counter: '20/40', showLeftIcon: true,  leftIcon: 'magnify',              showRightIcon: true,  rightIcon: 'close' } },
  ],
  controls: {
    variant:        { type: 'radio',       label: 'Variant',     options: ['Idle', 'Focus', 'Filled', 'Disable'], default: 'Idle' },
    hasError:       { type: 'boolean',     label: 'Error',       default: false, showWhen: { field: 'variant', values: ['Idle', 'Focus', 'Filled'] } },
    label:          { type: 'text',        label: 'Label',       default: 'Label' },
    value:          { type: 'text',        label: 'Value',       default: '', showWhen: { field: 'variant', values: ['Filled', 'Disable'] } },
    showHelperText: { type: 'boolean',     label: 'HelperText',  default: false },
    helperText:     { type: 'text',        label: 'Helper text', default: 'Helper text', showWhen: { field: 'showHelperText', values: ['true'] } },
    showCounter:    { type: 'boolean',     label: 'Counter',     default: false },
    counter:        { type: 'text',        label: 'Counter',     default: '20/40', showWhen: { field: 'showCounter', values: ['true'] } },
    showLeftIcon:   { type: 'boolean',     label: 'LeftIcon',    default: false },
    leftIcon:       { type: 'icon-picker', label: 'Left icon',   default: 'magnify', showWhen: { field: 'showLeftIcon', values: ['true'] } },
    showRightIcon:  { type: 'boolean',     label: 'RightIcon',   default: false },
    rightIcon:      { type: 'icon-picker', label: 'Right icon',  default: 'close', showWhen: { field: 'showRightIcon', values: ['true'] } },
  },
  render: (p, onChange) => <InteractiveTextField p={p} onChange={onChange} />,
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
