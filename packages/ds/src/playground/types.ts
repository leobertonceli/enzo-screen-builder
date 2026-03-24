export type ControlDef =
  | { type: 'text'; label: string; default: string; showWhen?: { field: string; values: string[] } }
  | { type: 'boolean'; label: string; default: boolean; showWhen?: { field: string; values: string[] } }
  | { type: 'select'; label: string; options: string[]; default: string; showWhen?: { field: string; values: string[] } }
  | { type: 'radio'; label: string; options: string[]; default: string; showWhen?: { field: string; values: string[] } }
  | { type: 'icon-picker'; label: string; default: string; showWhen?: { field: string; values: string[] } }

export interface ComponentPreset {
  label: string
  values: Record<string, unknown>
}

export interface ComponentConfig {
  name: string
  controls: Record<string, ControlDef>
  render: (props: Record<string, unknown>) => React.ReactNode
  /** Optional render used when dropping into a template slot. Falls back to render if not provided. */
  slotRender?: (props: Record<string, unknown>) => React.ReactNode
  presets?: ComponentPreset[]
}
