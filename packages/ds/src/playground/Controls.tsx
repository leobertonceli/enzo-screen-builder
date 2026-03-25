import { useState, useMemo, useRef, useEffect } from 'react'
import { Icon } from '../icons/Icon'
import { ICONS } from '../icons/iconCatalog'
import type { ControlDef } from './types'

interface ControlsProps {
  controls: Record<string, ControlDef>
  values: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}

/* ── Dropdown arrow icon (Material Design arrow_drop_down) ── */
function DropdownArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-gray-40)" className="shrink-0">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  )
}

/* ── Mini icon picker dropdown ──────────────────────────────────── */
function IconPickerControl({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = useMemo(() => {
    if (!search.trim()) return ICONS.slice(0, 50)
    const q = search.toLowerCase()
    return ICONS.filter((i) => i.name.toLowerCase().includes(q)).slice(0, 50)
  }, [search])

  const selectedIcon = ICONS.find((i) => i.filename === value)

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full transition-colors"
        style={{
          height: 48,
          border: '1px solid var(--color-stroke)',
          borderRadius: 'var(--radius-sm)',
          paddingLeft: 'var(--spacing-04)',
          paddingRight: 'var(--spacing-03)',
          backgroundColor: 'var(--color-surface)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-content-secondary)',
        }}
      >
        {value ? (
          <>
            <Icon name={value} size={16} color="var(--color-content-primary)" />
            <span className="truncate flex-1 text-left" style={{ color: 'var(--color-content-primary)' }}>{selectedIcon?.name ?? value}</span>
          </>
        ) : (
          <span className="flex-1 text-left" style={{ color: 'var(--color-content-secondary)' }}>Icon</span>
        )}
        <DropdownArrow />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 overflow-hidden"
          style={{
            maxHeight: 280,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}>
          <div style={{ padding: 'var(--spacing-02)', borderBottom: '1px solid var(--color-divider)' }}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
              style={{
                padding: 'var(--spacing-02) var(--spacing-03)',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-base)',
                backgroundColor: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-xs)',
                color: 'var(--color-content-primary)',
                border: 'none',
              }}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: 230 }}>
            {filtered.map((ic) => (
              <button
                key={ic.filename}
                onClick={() => { onChange(ic.filename); setOpen(false); setSearch('') }}
                className="flex items-center gap-2 w-full transition-colors"
                style={{
                  padding: 'var(--spacing-02) var(--spacing-03)',
                  fontSize: 'var(--font-size-xs)',
                  fontFamily: 'var(--font-family-base)',
                  color: value === ic.filename ? 'var(--color-content-primary)' : 'var(--color-content-secondary)',
                  backgroundColor: value === ic.filename ? 'var(--color-surface-subtle)' : 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = value === ic.filename ? 'var(--color-surface-subtle)' : 'transparent')}
              >
                <Icon name={ic.filename} size={16} color={value === ic.filename ? 'var(--color-content-primary)' : 'var(--color-content-secondary)'} />
                <span className="truncate">{ic.name}</span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-40)', marginLeft: 'auto', fontFamily: 'var(--font-family-base)' }}>{ic.category}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p style={{ padding: '16px 12px', fontSize: 'var(--font-size-xs)', color: 'var(--color-gray-40)', textAlign: 'center' }}>No icons found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function Controls({ controls, values, onChange }: ControlsProps) {
  const entries = Object.entries(controls)

  /* Check if a control should be visible based on showWhen condition */
  const isVisible = (def: ControlDef) => {
    if (!def.showWhen) return true
    const currentValue = String(values[def.showWhen.field])
    return def.showWhen.values.includes(currentValue)
  }

  /* Find leading consecutive text inputs (without showWhen) to group together */
  let leadingTextCount = 0
  for (const [, def] of entries) {
    if (def.type === 'text' && !def.showWhen) leadingTextCount++
    else break
  }

  /* Separate toggles to put at the end */
  const toggleEntries = entries.filter(([, def]) => def.type === 'boolean')
  /* Find controls that are direct children of toggles (showWhen points to a boolean field) */
  const directToggleChildKeys = new Set(
    entries
      .filter(([, def]) => def.showWhen && controls[def.showWhen.field]?.type === 'boolean')
      .map(([key]) => key)
  )
  /* Also include grandchildren: controls whose showWhen points to a direct toggle child */
  const toggleChildKeys = new Set([
    ...directToggleChildKeys,
    ...entries
      .filter(([, def]) => def.showWhen && directToggleChildKeys.has(def.showWhen.field))
      .map(([key]) => key),
  ])
  const nonToggleEntries = entries.filter(([key, def]) => def.type !== 'boolean' && !toggleChildKeys.has(key))

  return (
    <div className="flex flex-col" style={{ gap: 40 }}>
      {/* Leading text inputs grouped with gap 8 */}
      {leadingTextCount > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--spacing-02)' }}>
          {nonToggleEntries.slice(0, leadingTextCount).map(([key, def]) => (
            <input
              key={key}
              className="w-full outline-none transition-colors"
              placeholder={def.label}
              value={values[key] as string}
              onChange={(e) => onChange(key, e.target.value)}
              style={{
                height: 48,
                border: '1px solid var(--color-stroke)',
                borderRadius: 'var(--radius-sm)',
                paddingLeft: 'var(--spacing-04)',
                paddingRight: 'var(--spacing-04)',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-base)',
                color: 'var(--color-content-primary)',
                backgroundColor: 'var(--color-surface)',
              }}
            />
          ))}
        </div>
      )}

      {/* Remaining controls in original order */}
      {nonToggleEntries.slice(leadingTextCount).map(([key, def]) => {
        /* Skip hidden controls */
        if (!isVisible(def)) return null

        /* Inline text input (not leading) — conditional ones like rightText */
        if (def.type === 'text') {
          return (
            <input
              key={key}
              className="w-full outline-none transition-colors"
              placeholder={def.label}
              value={values[key] as string}
              onChange={(e) => onChange(key, e.target.value)}
              style={{
                height: 48,
                border: '1px solid var(--color-stroke)',
                borderRadius: 'var(--radius-sm)',
                paddingLeft: 'var(--spacing-04)',
                paddingRight: 'var(--spacing-04)',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-base)',
                color: 'var(--color-content-primary)',
                backgroundColor: 'var(--color-surface)',
                marginTop: -32,
              }}
            />
          )
        }

        /* Select dropdown */
        if (def.type === 'select') {
          return (
            <div key={key} className="flex flex-col" style={{ gap: 'var(--spacing-03)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>{def.label}</span>
              <div style={{ position: 'relative' }}>
                <select
                  className="w-full outline-none appearance-none transition-colors"
                  value={values[key] as string}
                  onChange={(e) => onChange(key, e.target.value)}
                  style={{
                    height: 48,
                    border: '1px solid var(--color-stroke)',
                    borderRadius: 'var(--radius-sm)',
                    paddingLeft: 'var(--spacing-04)',
                    paddingRight: 40,
                    fontSize: 'var(--font-size-xs)',
                    fontFamily: 'var(--font-family-base)',
                    color: 'var(--color-content-secondary)',
                    backgroundColor: 'var(--color-surface)',
                    cursor: 'pointer',
                  }}
                >
                  {def.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div style={{ position: 'absolute', right: 'var(--spacing-03)', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <DropdownArrow />
                </div>
              </div>
            </div>
          )
        }

        /* Radio pills */
        if (def.type === 'radio') {
          return (
            <div key={key} className="flex flex-col" style={{ gap: 'var(--spacing-03)' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>{def.label}</span>
              <div className="flex flex-wrap" style={{ gap: 'var(--spacing-01)' }}>
                {def.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onChange(key, opt)}
                    className="transition-colors"
                    style={{
                      height: 32,
                      paddingLeft: 'var(--spacing-04)',
                      paddingRight: 'var(--spacing-04)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-base)',
                      ...(values[key] === opt
                        ? { backgroundColor: 'var(--color-content-primary)', color: 'var(--color-gray-white)', border: 'none' }
                        : { backgroundColor: 'transparent', color: 'var(--color-content-primary)', border: '1px solid var(--color-stroke)' }
                      ),
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )
        }

        /* Icon picker */
        if (def.type === 'icon-picker') {
          return (
            <div key={key}>
              <IconPickerControl
                value={values[key] as string}
                onChange={(v) => onChange(key, v)}
              />
            </div>
          )
        }

        return null
      })}

      {/* Toggles grouped together at the bottom with gap 16 */}
      {toggleEntries.length > 0 && (
        <div className="flex flex-col" style={{ gap: 'var(--spacing-04)' }}>
          {toggleEntries.filter(([, def]) => isVisible(def)).map(([key, def]) => {
            /* Find child controls that depend on this toggle via showWhen */
            const childControls = entries.filter(
              ([, d]) => d.type !== 'boolean' && d.showWhen?.field === key && isVisible(d)
            )

            return (
              <div key={key} className="flex flex-col" style={{ gap: 'var(--spacing-03)' }}>
                <div className="flex items-center" style={{ gap: 'var(--spacing-02)' }}>
                  <span className="flex-1" style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>{def.label}</span>
                  <button
                    onClick={() => onChange(key, !values[key])}
                    className="flex items-center overflow-hidden shrink-0 transition-colors"
                    style={{
                      width: 40,
                      height: 24,
                      borderRadius: 'var(--radius-pill)',
                      padding: 'var(--spacing-01)',
                      backgroundColor: values[key] ? 'var(--color-content-primary)' : 'var(--color-gray-20)',
                      justifyContent: values[key] ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <div style={{ width: 16, height: 16, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-gray-white)' }} />
                  </button>
                </div>

                {/* Render child controls (radio, icon-picker, text) below this toggle */}
                {childControls.map(([childKey, childDef]) => {
                  if (childDef.type === 'radio') {
                    /* radio child + its own grandchildren (icon-picker / text) */
                    const grandChildren = entries.filter(
                      ([, d]) => d.showWhen?.field === childKey && isVisible(d)
                    )
                    return (
                      <div key={childKey} className="flex flex-col" style={{ gap: 'var(--spacing-03)' }}>
                        <div className="flex flex-wrap" style={{ gap: 'var(--spacing-01)' }}>
                          {childDef.options.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => onChange(childKey, opt)}
                              className="transition-colors"
                              style={{
                                height: 32,
                                paddingLeft: 'var(--spacing-04)',
                                paddingRight: 'var(--spacing-04)',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: 'var(--font-size-xs)',
                                fontFamily: 'var(--font-family-base)',
                                ...(values[childKey] === opt
                                  ? { backgroundColor: 'var(--color-content-primary)', color: 'var(--color-gray-white)', border: 'none' }
                                  : { backgroundColor: 'transparent', color: 'var(--color-content-primary)', border: '1px solid var(--color-stroke)' }
                                ),
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        {grandChildren.map(([gcKey, gcDef]) => {
                          if (gcDef.type === 'icon-picker') {
                            return <IconPickerControl key={gcKey} value={values[gcKey] as string} onChange={(v) => onChange(gcKey, v)} />
                          }
                          if (gcDef.type === 'text') {
                            return (
                              <input
                                key={gcKey}
                                className="w-full outline-none transition-colors"
                                placeholder={gcDef.label}
                                value={values[gcKey] as string}
                                onChange={(e) => onChange(gcKey, e.target.value)}
                                style={{
                                  height: 48,
                                  border: '1px solid var(--color-stroke)',
                                  borderRadius: 'var(--radius-sm)',
                                  paddingLeft: 'var(--spacing-04)',
                                  paddingRight: 'var(--spacing-04)',
                                  fontSize: 'var(--font-size-xs)',
                                  fontFamily: 'var(--font-family-base)',
                                  color: 'var(--color-content-primary)',
                                  backgroundColor: 'var(--color-surface)',
                                }}
                              />
                            )
                          }
                          return null
                        })}
                      </div>
                    )
                  }
                  if (childDef.type === 'icon-picker') {
                    return (
                      <IconPickerControl
                        key={childKey}
                        value={values[childKey] as string}
                        onChange={(v) => onChange(childKey, v)}
                      />
                    )
                  }
                  if (childDef.type === 'text') {
                    return (
                      <input
                        key={childKey}
                        className="w-full outline-none transition-colors"
                        placeholder={childDef.label}
                        value={values[childKey] as string}
                        onChange={(e) => onChange(childKey, e.target.value)}
                        style={{
                          height: 48,
                          border: '1px solid var(--color-stroke)',
                          borderRadius: 'var(--radius-sm)',
                          paddingLeft: 'var(--spacing-04)',
                          paddingRight: 'var(--spacing-04)',
                          fontSize: 'var(--font-size-xs)',
                          fontFamily: 'var(--font-family-base)',
                          color: 'var(--color-content-primary)',
                          backgroundColor: 'var(--color-surface)',
                        }}
                      />
                    )
                  }
                  return null
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
