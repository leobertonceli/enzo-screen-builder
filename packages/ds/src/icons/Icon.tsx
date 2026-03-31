// All DS icons loaded eagerly as raw SVG strings
const iconModules = import.meta.glob('./svg/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export interface IconProps {
  /** DS icon name in camelCase, e.g. "heartOutlined", "close", "search" */
  name: string
  /** px size (width & height). Default 24 */
  size?: number
  /** CSS color override. Default "currentColor" */
  color?: string
  className?: string
}

function sizeKey(size: number): string {
  if (size <= 12) return 'sm'
  if (size <= 16) return 'md'
  if (size <= 24) return 'lg'
  return 'xlg'
}

const SIZE_PRIORITY = ['lg', 'md', 'xlg', 'sm']

function getRawSvg(name: string, size: number): string | null {
  const preferred = sizeKey(size)
  const key = `./svg/${name}/Size=${preferred}.svg`
  if (iconModules[key]) return iconModules[key]

  // Fallback: try other sizes
  for (const s of SIZE_PRIORITY) {
    const fallback = `./svg/${name}/Size=${s}.svg`
    if (iconModules[fallback]) return iconModules[fallback]
  }
  return null
}

function processSvg(raw: string): string {
  return raw
    .replace(/fill="#141414"/g, 'fill="currentColor"')
    .replace(/fill="#6F6F6F"/g, 'fill="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/stroke="#141414"/g, 'stroke="currentColor"')
    // Remove hardcoded dimensions so CSS controls the size
    .replace(/\s*width="\d+"/g, '')
    .replace(/\s*height="\d+"/g, '')
}

export function Icon({ name, size = 24, color, className }: IconProps) {
  const raw = getRawSvg(name, size)

  if (!raw) {
    // Icon not found — render a transparent placeholder to avoid layout shifts
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
      />
    )
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        flexShrink: 0,
        color: color ?? 'currentColor',
      }}
      dangerouslySetInnerHTML={{ __html: processSvg(raw) }}
    />
  )
}
