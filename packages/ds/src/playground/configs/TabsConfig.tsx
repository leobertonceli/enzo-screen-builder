import { Tabs } from '../../components/Tabs/Tabs'
import type { ComponentConfig } from '../types'

export const TabsConfig: ComponentConfig = {
  name: 'Tabs',
  controls: {
    style: {
      type: 'radio',
      label: 'Style',
      options: ['texts', 'filter'],
      default: 'texts',
    },
    activeIndex: {
      type: 'select',
      label: 'Active tab',
      options: ['0', '1', '2'],
      default: '0',
    },
    showBadge: {
      type: 'boolean',
      label: 'Badge',
      default: true,
    },
  },
  presets: [
    { label: 'Texts — badge',     values: { style: 'texts',  activeIndex: '0', showBadge: true  } },
    { label: 'Texts — sem badge', values: { style: 'texts',  activeIndex: '0', showBadge: false } },
    { label: 'Filter — active',   values: { style: 'filter', activeIndex: '0', showBadge: true  } },
    { label: 'Filter — inactive', values: { style: 'filter', activeIndex: '0', showBadge: false } },
  ],
  render: (p) => {
    const items = p.showBadge
      ? [{ label: 'Label', badge: 1 }, { label: 'Label', badge: 1 }, { label: 'Label', badge: 3 }]
      : [{ label: 'Label' }, { label: 'Label' }, { label: 'Label' }]
    return (
      <div style={{ width: 327 }}>
        <Tabs
          style={p.style as any}
          items={items}
          activeIndex={Number(p.activeIndex)}
        />
      </div>
    )
  },
}
