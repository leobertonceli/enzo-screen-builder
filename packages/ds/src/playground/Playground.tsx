import { useCallback, useEffect, useRef, useState } from 'react'
import { Controls } from './Controls'
import { InspectOverlay } from './InspectOverlay'
import { TokensPage } from './TokensPage'
import { IconsPage } from './IconsPage'
import { ButtonConfig } from './configs/ButtonConfig'
import { ListItemConfig } from './configs/ListItemConfig'
import { ChipConfig } from './configs/ChipConfig'
import { BaseCardConfig } from './configs/BaseCardConfig'
import { Icon } from '../icons/Icon'
import { SettingsScreen } from '../screens/SettingsScreen'
import { HomeScreen } from '../screens/HomeScreen'
import { HomeScreenV2 } from '../screens/HomeScreenV2'
import { HomeScreenV3 } from '../screens/HomeScreenV3'
import { HomeScreenV4 } from '../screens/HomeScreenV4'
import { FiltersScreen } from '../screens/FiltersScreen'
import { RedeAliceScreen } from '../screens/RedeAliceScreen'
import { EspecialistasScreen } from '../screens/EspecialistasScreen'
import { EspecialistasScreenV2 } from '../screens/EspecialistasScreenV2'
import { RedeCredenciadaScreen } from '../screens/RedeCredenciadaScreen'
import type { ComponentConfig } from './types'
import { generateComponentContent } from '../services/ai'

const components: ComponentConfig[] = [ButtonConfig, ListItemConfig, ChipConfig, BaseCardConfig]

/* ── Category labels for filter pills ── */
const CATEGORIES = ['All', 'Buttons', 'Cards', 'Text Field', 'Lists'] as const
type Category = (typeof CATEGORIES)[number]

/* map component → category for filtering */
function getCategory(c: ComponentConfig): string {
  if (c.name === 'Button') return 'Buttons'
  if (c.name === 'ListItem') return 'Lists'
  if (c.name === 'Chip') return 'Buttons'
  if (c.name === 'BaseCard') return 'Cards'
  return 'Other'
}

function initValues(config: ComponentConfig) {
  return Object.fromEntries(
    Object.entries(config.controls).map(([key, def]) => [key, def.default])
  )
}

type Page = 'components' | 'icons' | 'colors' | 'typography' | 'templates'
type ActiveView =
  | { kind: 'grid' }
  | { kind: 'component'; index: number }

/* ── Shared header component ── */
function Header({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  return (
    <header
      className="flex items-center px-6"
      style={{ height: 68, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Logo */}
      <div className="flex items-end gap-[15px] shrink-0">
        <div className="relative" style={{ width: 20, height: 20 }}>
          <div className="absolute" style={{ width: 10, height: 10, top: 0, left: 10, backgroundColor: 'var(--color-gray-white)' }} />
          <div className="absolute" style={{ width: 10, height: 10, top: 10, left: 0, backgroundColor: 'var(--color-gray-white)' }} />
        </div>
        <span className="leading-none whitespace-nowrap" style={{ fontSize: 'var(--font-size-md)', fontFamily: 'var(--font-family-base)' }}>
          <span style={{ color: 'var(--color-gray-white)', fontWeight: 'var(--font-weight-medium)' }}>Wonderland </span>
          <span style={{ color: 'var(--color-gray-70)' }}>Design System</span>
        </span>
      </div>

      {/* Search — centered */}
      <div className="flex-1 flex justify-center px-8">
        <div className="flex items-center gap-2" style={{ maxWidth: 360, width: '100%' }}>
          <Icon name="magnify" size={16} color="var(--color-gray-60)" />
          <input
            type="text"
            placeholder="Search a component, template or token"
            className="flex-1 bg-transparent border-none outline-none"
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-gray-white)',
              fontFamily: 'var(--font-family-base)',
            }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex items-center gap-10 shrink-0">
        {(['icons', 'colors', 'typography', 'components', 'templates'] as Page[]).map((p) => (
          <button
            key={p}
            onClick={() => onNavigate(p)}
            className="capitalize transition-colors whitespace-nowrap"
            style={{
              fontSize: 'var(--font-size-xs)',
              fontFamily: 'var(--font-family-base)',
              color: page === p ? 'var(--color-gray-white)' : 'var(--color-gray-70)',
            }}
          >
            {p}
          </button>
        ))}
      </nav>
    </header>
  )
}

export function Playground() {
  const [page, setPage] = useState<Page>('components')
  const [active, setActive] = useState<ActiveView>({ kind: 'grid' })
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [inspectMode, setInspectMode] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const templatePreviewRef = useRef<HTMLDivElement>(null)

  /* scroll state for grid page */
  const [scrollProgress, setScrollProgress] = useState(0) /* 0 → 1 */
  const [showHeader, setShowHeader] = useState(false)
  const lastScrollY = useRef(0)

  const SCROLL_RANGE = 200 /* px over which the transition happens */

  const handleScroll = useCallback(() => {
    const y = window.scrollY

    /* progress 0→1 over SCROLL_RANGE */
    setScrollProgress(Math.min(1, y / SCROLL_RANGE))

    /* show header on scroll up */
    if (y < lastScrollY.current && y > 50) {
      setShowHeader(true)
    } else if (y > lastScrollY.current) {
      setShowHeader(false)
    }
    if (y < 10) setShowHeader(false)

    lastScrollY.current = y
  }, [])

  useEffect(() => {
    if (page === 'components' && active.kind === 'grid') {
      window.addEventListener('scroll', handleScroll, { passive: true })
      /* reset on mount */
      setScrollProgress(0)
      setShowHeader(false)
      lastScrollY.current = 0
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [page, active.kind, handleScroll])

  const [valuesMap, setValuesMap] = useState<Record<string, Record<string, unknown>>>(
    () => Object.fromEntries(components.map((c) => [c.name, initValues(c)]))
  )

  /* preset index per component */
  const [presetIndexMap, setPresetIndexMap] = useState<Record<string, number>>(
    () => Object.fromEntries(components.map((c) => [c.name, -1]))
  )

  function cyclePreset(comp: ComponentConfig) {
    if (!comp.presets || comp.presets.length === 0) return
    setPresetIndexMap((prev) => {
      const next = (prev[comp.name] + 1) % comp.presets!.length
      // apply preset values
      setValuesMap((vm) => ({
        ...vm,
        [comp.name]: { ...vm[comp.name], ...comp.presets![next].values },
      }))
      return { ...prev, [comp.name]: next }
    })
  }

  const activeComponent = active.kind === 'component' ? components[active.index] : null
  const values = activeComponent ? valuesMap[activeComponent.name] : {}

  function handleChange(key: string, value: unknown) {
    if (!activeComponent) return
    setValuesMap((prev) => ({
      ...prev,
      [activeComponent.name]: { ...prev[activeComponent.name], [key]: value },
    }))
  }

  function navigateTo(p: Page) {
    setPage(p)
    setActive({ kind: 'grid' })
    setInspectMode(false)
    window.scrollTo(0, 0)
  }

  function openComponent(index: number) {
    setActive({ kind: 'component', index })
    setInspectMode(false)
    window.scrollTo(0, 0)
  }

  function backToGrid() {
    setActive({ kind: 'grid' })
    setInspectMode(false)
    window.scrollTo(0, 0)
  }

  /* filter components by category */
  const filteredComponents =
    activeCategory === 'All'
      ? components
      : components.filter((c) => getCategory(c) === activeCategory)

  /* templates config */
  const templates = [
    { name: 'Rede Alice', component: RedeAliceScreen },
    { name: 'Settings', component: SettingsScreen },
    { name: 'Home (v1)', component: HomeScreen },
    { name: 'Home (v2)', component: HomeScreenV2 },
    { name: 'Home (v3)', component: HomeScreenV3 },
    { name: 'Home (v4)', component: HomeScreenV4 },
    { name: 'Especialistas', component: EspecialistasScreen },
    { name: 'Especialistas v2', component: EspecialistasScreenV2 },
    { name: 'Rede Credenciada', component: RedeCredenciadaScreen },
    { name: 'Filters', component: FiltersScreen },
  ]
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null)

  /* page title */
  const pageTitle =
    page === 'icons' ? 'Icons' : page === 'colors' ? 'Colors' : page === 'typography' ? 'Typography' : page === 'templates' ? 'Templates' : 'Components'

  /* ── Grid page (scrollable) ── */
  if (page === 'components' && active.kind === 'grid') {
    return (
      <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>

        {/* Sticky header — appears on scroll up */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 100,
            backgroundColor: 'var(--color-gray-100)',
            transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.3s ease',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            boxSizing: 'border-box',
          }}
        >
          <Header page={page} onNavigate={navigateTo} />
        </div>

        {/* Static header (scrolls away) */}
        <Header page={page} onNavigate={navigateTo} />

        {/* Title */}
        <div className="px-6" style={{ paddingTop: 148, paddingBottom: 16 }}>
          <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-gray-white)', fontFamily: 'var(--font-family-base)' }}>{pageTitle}</h1>
        </div>

        {/* White content area — margin & radius shrink smoothly with scroll */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: `${20 * (1 - scrollProgress)}px ${20 * (1 - scrollProgress)}px 0 0`,
            marginLeft: 8 * (1 - scrollProgress),
            marginRight: 8 * (1 - scrollProgress),
          }}
        >
          {/* Category filter pills */}
          <div className="flex items-center justify-center gap-1 p-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="h-8 px-4 rounded-full transition-colors"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontFamily: 'var(--font-family-base)',
                  ...(activeCategory === cat
                    ? { backgroundColor: 'var(--color-content-primary)', color: 'var(--color-gray-white)' }
                    : { border: '1px solid var(--color-stroke)', color: 'var(--color-content-primary)', backgroundColor: 'transparent' }),
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Component grid */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              borderTop: '1px solid var(--color-stroke)',
              overflow: 'hidden',
            }}
          >
            {(() => {
              const upcoming: { name: string; category: string }[] = [
                { name: 'Card', category: 'Cards' },
                { name: 'Text Field', category: 'Text Field' },
                { name: 'Checkbox', category: 'Buttons' },
                { name: 'Radio', category: 'Buttons' },
                { name: 'Toggle', category: 'Buttons' },
                { name: 'Input', category: 'Text Field' },
                { name: 'Modal', category: 'Cards' },
                { name: 'Toast', category: 'Cards' },
                { name: 'Tabs', category: 'Lists' },
                { name: 'Badge', category: 'Buttons' },
              ]
              const filteredUpcoming = activeCategory === 'All'
                ? upcoming
                : upcoming.filter((u) => u.category === activeCategory)
              const allItems = [
                ...filteredComponents.map((comp) => ({ name: comp.name, index: components.indexOf(comp), real: true as const })),
                ...filteredUpcoming.map((u) => ({ name: u.name, index: -1, real: false as const })),
              ]

              return allItems.map((item, i) => (
                <div
                  key={item.name}
                  onClick={() => item.real && openComponent(item.index)}
                  role="button"
                  tabIndex={item.real ? 0 : undefined}
                  onKeyDown={(e) => e.key === 'Enter' && item.real && openComponent(item.index)}
                  className="text-left transition-colors flex flex-col group"
                  style={{
                    height: 367,
                    borderRight: (i + 1) % 4 !== 0 ? '1px solid var(--color-stroke)' : undefined,
                    borderBottom: '1px solid var(--color-stroke)',
                    cursor: item.real ? 'pointer' : 'default',
                    padding: 16,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => item.real && (e.currentTarget.style.backgroundColor = 'var(--color-surface-bg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-base)',
                      color: item.real ? 'var(--color-gray-90)' : 'var(--color-gray-30)',
                    }}
                  >
                    {item.name}
                  </span>
                  {!item.real && (
                    <span className="ml-2" style={{ fontSize: 10, color: 'var(--color-gray-20)', fontFamily: 'var(--font-family-base)' }}>
                      soon
                    </span>
                  )}
                  {/* Preview thumbnail */}
                  {item.real && (
                    <div className="flex-1 flex items-center justify-center pointer-events-none overflow-hidden">
                      <div style={{ transform: 'scale(0.6)', transformOrigin: 'center center' }}>
                        {components[item.index].render(valuesMap[components[item.index].name])}
                      </div>
                    </div>
                  )}
                </div>
              ))
            })()}
          </div>
        </div>
      </div>
    )
  }

  /* ── Component detail view ── */
  if (page === 'components' && active.kind === 'component' && activeComponent) {
    const compIndex = active.index
    const hasPrev = compIndex > 0
    const hasNext = compIndex < components.length - 1

    return (
      <div className="flex flex-col h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>
        <Header page={page} onNavigate={navigateTo} />

        {/* Prev/Next arrows (dark area, top right) */}
        <div className="flex items-center gap-1 absolute" style={{ top: 76 + 68 + 8, right: 24, zIndex: 10 }}>
          {/* Actually position relative to header */}
        </div>

        {/* White content area */}
        <div
          className="flex-1 overflow-hidden flex"
          style={{ borderRadius: 20, backgroundColor: 'var(--color-surface)', margin: '8px 8px 0 8px', position: 'relative' }}
        >
          {/* Left side — back button + component name + preview + inspect */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ position: 'relative' }}>
            {/* Top bar: back + component label + name */}
            <div className="flex items-center shrink-0" style={{ padding: 20 }}>
              {/* Back arrow */}
              <button
                onClick={backToGrid}
                className="flex items-center justify-center shrink-0 transition-colors"
                style={{ width: 32, height: 32, borderRadius: 8 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="var(--color-content-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* "Component" label */}
              <span className="ml-6" style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-tertiary)' }}>Component</span>

              {/* Component name (centered in left area) */}
              <span className="ml-8" style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>{activeComponent.name}</span>
            </div>

            {/* Preview area */}
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <div ref={previewRef} className="overflow-visible" style={{ cursor: inspectMode ? 'crosshair' : undefined }}>
                {activeComponent.render(values)}
              </div>
            </div>

            {/* Bottom bar — Inspect toggle + Generate content (centered) + spacer */}
            <div className="flex items-center shrink-0" style={{ padding: '20px 28px' }}>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>Inspect</span>
                <button
                  onClick={() => setInspectMode((v) => !v)}
                  className="flex items-center overflow-hidden shrink-0 transition-colors"
                  style={{
                    width: 40,
                    height: 24,
                    borderRadius: 200,
                    padding: 4,
                    backgroundColor: inspectMode ? 'var(--color-content-primary)' : 'var(--color-gray-20)',
                    justifyContent: inspectMode ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{ width: 16, height: 16, borderRadius: 200, backgroundColor: 'var(--color-gray-white)' }} />
                </button>
              </div>

              {/* Generate content + AI + reset buttons — centered */}
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2">
                  {/* Preset cycle button */}
                  {activeComponent.presets && activeComponent.presets.length > 0 && (
                    <button
                      onClick={() => cyclePreset(activeComponent)}
                      className="flex items-center gap-2 transition-colors"
                      style={{
                        height: 32,
                        padding: '0 12px',
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid var(--color-stroke)',
                        backgroundColor: 'var(--color-surface)',
                        cursor: 'pointer',
                        fontSize: 'var(--font-size-xs)',
                        fontFamily: 'var(--font-family-base)',
                        color: 'var(--color-content-primary)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-bg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                    >
                      <Icon name="auto-fix" size={14} color="var(--color-content-primary)" />
                      <span>Gerar conteúdo</span>
                      {presetIndexMap[activeComponent.name] >= 0 && (
                        <span style={{ color: 'var(--color-content-tertiary)' }}>
                          {presetIndexMap[activeComponent.name] + 1}/{activeComponent.presets.length}
                        </span>
                      )}
                    </button>
                  )}

                  {/* AI generate button */}
                  <button
                    onClick={async () => {
                      if (aiLoading) return
                      setAiLoading(true)
                      try {
                        const controlKeys = Object.keys(activeComponent.controls)
                        const aiValues = await generateComponentContent(activeComponent.name, controlKeys)
                        setValuesMap((prev) => ({
                          ...prev,
                          [activeComponent.name]: { ...prev[activeComponent.name], ...aiValues },
                        }))
                      } catch (err) {
                        console.error('AI generation failed:', err)
                      } finally {
                        setAiLoading(false)
                      }
                    }}
                    className="flex items-center gap-2 transition-colors"
                    style={{
                      height: 32,
                      padding: '0 12px',
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--color-brand)',
                      backgroundColor: aiLoading ? 'var(--color-surface-bg)' : 'var(--color-surface)',
                      cursor: aiLoading ? 'wait' : 'pointer',
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-base)',
                      color: 'var(--color-brand)',
                      opacity: aiLoading ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => { if (!aiLoading) e.currentTarget.style.backgroundColor = 'var(--color-surface-bg)' }}
                    onMouseLeave={(e) => { if (!aiLoading) e.currentTarget.style.backgroundColor = 'var(--color-surface)' }}
                  >
                    <Icon name="creation" size={14} color="var(--color-brand)" />
                    <span>{aiLoading ? 'Gerando...' : 'AI'}</span>
                  </button>

                  {/* Reset button */}
                  {(presetIndexMap[activeComponent.name] >= 0 || true) && (
                    <button
                      onClick={() => {
                        setPresetIndexMap((prev) => ({ ...prev, [activeComponent.name]: -1 }))
                        setValuesMap((prev) => ({ ...prev, [activeComponent.name]: initValues(activeComponent) }))
                      }}
                      className="flex items-center justify-center transition-colors"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid var(--color-stroke)',
                        backgroundColor: 'var(--color-surface)',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-bg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface)')}
                    >
                      <Icon name="refresh" size={14} color="var(--color-content-primary)" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side — controls */}
          <aside
            className="overflow-y-auto shrink-0 flex flex-col"
            style={{ width: 368, padding: 28, gap: 40, borderLeft: '1px solid rgba(20,20,20,0.05)' }}
          >
            <Controls controls={activeComponent.controls} values={values} onChange={handleChange} />
          </aside>
        </div>

        {/* Prev/Next arrows in dark area */}
        <div className="absolute flex items-center gap-1" style={{ right: 24, top: 76 + 8 }}>
          <button
            onClick={() => hasPrev && openComponent(compIndex - 1)}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: hasPrev ? 1 : 0.3,
              cursor: hasPrev ? 'pointer' : 'default',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="var(--color-gray-white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => hasNext && openComponent(compIndex + 1)}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: hasNext ? 1 : 0.3,
              cursor: hasNext ? 'pointer' : 'default',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="var(--color-gray-white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <InspectOverlay active={inspectMode} containerRef={previewRef} />
      </div>
    )
  }

  /* ── Templates page — detail view ── */
  if (page === 'templates' && activeTemplate !== null) {
    const tmpl = templates[activeTemplate]
    const TemplateComponent = tmpl.component

    return (
      <div className="flex flex-col h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>
        <Header page={page} onNavigate={(p) => { setActiveTemplate(null); navigateTo(p) }} />

        <div
          className="flex-1 overflow-hidden flex"
          style={{ borderRadius: 20, backgroundColor: 'var(--color-surface)', margin: '8px 8px 0 8px', position: 'relative' }}
        >
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top bar — same as components */}
            <div className="flex items-center shrink-0" style={{ padding: 20 }}>
              <button
                onClick={() => setActiveTemplate(null)}
                className="flex items-center justify-center shrink-0 transition-colors"
                style={{ width: 32, height: 32, borderRadius: 8 }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="var(--color-content-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className="ml-6" style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-tertiary)' }}>Template</span>
              <span className="ml-8" style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>{tmpl.name}</span>
            </div>

            {/* Preview area */}
            <div className="flex-1 flex items-start justify-center overflow-auto" style={{ padding: 'var(--spacing-06)' }}>
              <div
                ref={templatePreviewRef}
                style={{
                  width: 390,
                  minHeight: 600,
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-stroke)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  cursor: inspectMode ? 'crosshair' : undefined,
                  position: 'relative',
                }}
              >
                <TemplateComponent />
              </div>
            </div>

            {/* Inspect toggle — bottom left, same as components */}
            <div className="flex items-center gap-2 shrink-0" style={{ padding: '20px 28px' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)', color: 'var(--color-content-primary)' }}>Inspect</span>
              <button
                onClick={() => setInspectMode((v) => !v)}
                className="flex items-center overflow-hidden shrink-0 transition-colors"
                style={{
                  width: 40,
                  height: 24,
                  borderRadius: 200,
                  padding: 4,
                  backgroundColor: inspectMode ? 'var(--color-content-primary)' : 'var(--color-gray-20)',
                  justifyContent: inspectMode ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{ width: 16, height: 16, borderRadius: 200, backgroundColor: 'var(--color-gray-white)' }} />
              </button>
            </div>
          </div>

          <InspectOverlay active={inspectMode} containerRef={templatePreviewRef} />
        </div>
      </div>
    )
  }

  /* ── Colors / Typography / Templates grid pages ── */
  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>
      <Header page={page} onNavigate={(p) => { setActiveTemplate(null); navigateTo(p) }} />

      <div className="px-6" style={{ paddingTop: 148, paddingBottom: 16 }}>
        <h1 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-gray-white)', fontFamily: 'var(--font-family-base)' }}>{pageTitle}</h1>
      </div>

      <div
        className="flex-1 overflow-hidden"
        style={{ borderRadius: '20px 20px 0 0', backgroundColor: 'var(--color-surface)', margin: '0 8px' }}
      >
        {page === 'icons' && (
          <div className="h-full overflow-y-auto">
            <IconsPage />
          </div>
        )}
        {page === 'colors' && (
          <div className="h-full overflow-y-auto">
            <TokensPage />
          </div>
        )}
        {page === 'typography' && (
          <div className="h-full overflow-y-auto p-10">
            <p style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)', color: 'var(--color-gray-70)' }}>Typography tokens — em breve</p>
          </div>
        )}
        {page === 'templates' && (
          <div className="h-full overflow-y-auto">
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                borderTop: '1px solid var(--color-stroke)',
              }}
            >
              {templates.map((tmpl, i) => {
                const TemplateComponent = tmpl.component
                return (
                  <div
                    key={tmpl.name}
                    onClick={() => setActiveTemplate(i)}
                    className="text-left transition-colors flex flex-col"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setActiveTemplate(i)}
                    style={{
                      height: 500,
                      borderRight: i < templates.length - 1 ? '1px solid var(--color-stroke)' : undefined,
                      borderBottom: '1px solid var(--color-stroke)',
                      cursor: 'pointer',
                      padding: 'var(--spacing-04)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-surface-bg)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span
                      style={{
                        fontSize: 'var(--font-size-xs)',
                        fontFamily: 'var(--font-family-base)',
                        color: 'var(--color-gray-90)',
                      }}
                    >
                      {tmpl.name}
                    </span>
                    <div className="flex-1 flex items-center justify-center pointer-events-none overflow-hidden">
                      <div style={{ transform: 'scale(0.45)', transformOrigin: 'center center', width: 390 }}>
                        <TemplateComponent />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
