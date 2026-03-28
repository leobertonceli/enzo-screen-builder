import { Loader } from '../../components/Loader/Loader'
import type { ComponentConfig } from '../types'

export const LoaderConfig: ComponentConfig = {
  name: 'Loader',
  presets: [
    { label: 'Spinner Light SM',  values: { variant: 'spinner',  size: 'sm',  theme: 'light', skeletonShape: 'square' } },
    { label: 'Spinner Light LG',  values: { variant: 'spinner',  size: 'lg',  theme: 'light', skeletonShape: 'square' } },
    { label: 'Spinner Dark',      values: { variant: 'spinner',  size: 'xlg', theme: 'dark',  skeletonShape: 'square' } },
    { label: 'Skeleton Square',   values: { variant: 'skeleton', size: 'md',  theme: 'light', skeletonShape: 'square' } },
    { label: 'Skeleton Text',     values: { variant: 'skeleton', size: 'md',  theme: 'light', skeletonShape: 'text'   } },
    { label: 'Linear',            values: { variant: 'linear',   size: 'md',  theme: 'light', skeletonShape: 'square' } },
  ],
  controls: {
    variant:       { type: 'radio',  label: 'Variant',        options: ['spinner', 'skeleton', 'linear'],        default: 'spinner' },
    size:          { type: 'radio',  label: 'Size',           options: ['sm', 'md', 'lg', 'xlg'],                default: 'md',     showWhen: { field: 'variant', values: ['spinner'] } },
    theme:         { type: 'radio',  label: 'Theme',          options: ['light', 'dark', 'brand'],               default: 'light' },
    skeletonShape: { type: 'radio',  label: 'Skeleton shape', options: ['square', 'oval', 'text', 'title'],      default: 'square', showWhen: { field: 'variant', values: ['skeleton'] } },
  },
  render: (p) => (
    <Loader
      variant={p.variant as any}
      size={p.size as any}
      theme={p.theme as any}
      skeletonShape={p.skeletonShape as any}
    />
  ),
}
