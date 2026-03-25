import React, { useEffect, useRef, useState } from 'react'
import { TemplateEditContext } from './TemplateEditContext'
import { Controls } from './Controls'
import { InspectOverlay } from './InspectOverlay'
import { TokensPage } from './TokensPage'
import type { TokensTab } from './TokensPage'
import { IconsPage } from './IconsPage'
import { ButtonConfig } from './configs/ButtonConfig'
import { ListItemConfig } from './configs/ListItemConfig'
import { ChipConfig } from './configs/ChipConfig'
import { BaseCardConfig } from './configs/BaseCardConfig'
import { ChatInputConfig } from './configs/ChatInputConfig'
import { LinkConfig } from './configs/LinkConfig'
import { CardMFCConfig } from './configs/CardMFCConfig'
import { ChatBubbleConfig } from './configs/ChatBubbleConfig'
import { TagConfig } from './configs/TagConfig'
import { NavBarConfig } from './configs/NavBarConfig'
import { TextFieldConfig } from './configs/TextFieldConfig'
import { CalloutConfig } from './configs/CalloutConfig'
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
import { AliceAgoraScreen } from '../screens/AliceAgoraScreen'
import { AgendarConsultaScreen } from '../screens/AgendarConsultaScreen'
import type { ComponentConfig } from './types'
import menuIconComponentes from '../assets/menu-icons/componentes.svg'
import menuIconTemplates from '../assets/menu-icons/templates.svg'
import menuIconIconography from '../assets/menu-icons/iconography.svg'

const components: ComponentConfig[] = [ButtonConfig, ListItemConfig, ChipConfig, BaseCardConfig, ChatInputConfig, LinkConfig, CardMFCConfig, ChatBubbleConfig, TagConfig, NavBarConfig, TextFieldConfig, CalloutConfig]

/* ── Category labels for filter pills ── */
const CATEGORIES = ['All', 'Buttons', 'Cards', 'Text Field', 'Lists'] as const
type Category = (typeof CATEGORIES)[number]

/* map component → category for filtering */
function getCategory(c: ComponentConfig): string {
  if (c.name === 'Button') return 'Buttons'
  if (c.name === 'ListItem') return 'Lists'
  if (c.name === 'Chip') return 'Buttons'
  if (c.name === 'BaseCard') return 'Cards'
  if (c.name === 'CardMFC') return 'Cards'
  if (c.name === 'ChatBubble') return 'Chat'
  if (c.name === 'Tag') return 'Badges'
  if (c.name === 'NavBar') return 'Navigation'
  if (c.name === 'TextField') return 'Text Field'
  if (c.name === 'Callout') return 'Feedback'
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

const PAGE_LABELS: Record<Page, string> = {
  components: 'Components',
  icons: 'Icons',
  colors: 'Colors',
  typography: 'Typography',
  templates: 'Templates',
}

const MENU_ITEMS: { page: Page; label: string; icon: string; type: 'img' | 'text' }[] = [
  { page: 'components', label: 'Componentes', icon: menuIconComponentes, type: 'img' },
  { page: 'templates', label: 'Templates', icon: menuIconTemplates, type: 'img' },
  { page: 'icons', label: 'Iconography', icon: menuIconIconography, type: 'img' },
  { page: 'colors', label: 'Color', icon: '#', type: 'text' },
  { page: 'typography', label: 'Typography', icon: 'A', type: 'text' },
]

/* Component border-radius map — container matches component */
const COMPONENT_RADIUS: Record<string, number> = {
  Button: 16,
  Chip: 200,
  BaseCard: 24,
  ListItem: 16,
  ChatInput: 20,
  Link: 200,
  CardMFC: 24,
  ChatBubble: 24,
  Tag: 200,
  NavBar: 0,
  TextField: 12,
  Callout: 20,
}

/* Components that don't have their own background — need white container in preview */
const NEEDS_PREVIEW_BG = new Set(['Chip', 'ChatInput'])

/* ── Logo animation keyframes ── */
let logoKeyframesInjected = false
function injectLogoKeyframes() {
  if (logoKeyframesInjected) return
  logoKeyframesInjected = true
  const style = document.createElement('style')
  style.textContent = `
    @keyframes wl-sq1 {
      0%, 100% { transform: translate(10px, 0px); }
      25%      { transform: translate(10px, 10px); }
      50%      { transform: translate(0px, 10px); }
      75%      { transform: translate(0px, 0px); }
    }
    @keyframes wl-sq2 {
      0%, 100% { transform: translate(0px, 10px); }
      25%      { transform: translate(0px, 0px); }
      50%      { transform: translate(10px, 0px); }
      75%      { transform: translate(10px, 10px); }
    }
    /* Hover: show component name */
    div:has(> .playground-card):hover .playground-card-name {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    /* Hide scrollbar */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `
  document.head.appendChild(style)
}

/* ── Edit mode CSS — injected once when editMode turns on ── */
let editModeStyleEl: HTMLStyleElement | null = null
function injectEditModeStyles() {
  if (editModeStyleEl) return
  editModeStyleEl = document.createElement('style')
  editModeStyleEl.textContent = `
    .edit-mode-preview span:hover,
    .edit-mode-preview p:hover,
    .edit-mode-preview h1:hover,
    .edit-mode-preview h2:hover,
    .edit-mode-preview h3:hover,
    .edit-mode-preview button:hover,
    .edit-mode-preview li:hover,
    .edit-mode-preview div:hover {
      outline: 1.5px dashed var(--color-brand) !important;
      outline-offset: 2px;
      cursor: text !important;
    }
    .edit-mode-preview [contenteditable="true"] {
      outline: 1.5px solid var(--color-brand) !important;
      outline-offset: 2px;
      cursor: text !important;
    }
  `
  document.head.appendChild(editModeStyleEl)
}

/* Check if an element has direct text content (not only child elements) */
function hasDirectText(el: Element): boolean {
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) return true
  }
  return false
}

/* Tags we allow to be made contentEditable */
const EDITABLE_TAGS = new Set(['SPAN', 'P', 'H1', 'H2', 'H3', 'BUTTON', 'LI'])

/* ── Mouse-follow hook — elements gently drift toward cursor direction ── */
function useMouseFollow() {
  const mouse = useRef({ x: 0, y: 0 })
  const smooth = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const items = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    let running = true
    const animate = () => {
      if (!running) return
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.06
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.06

      const { x, y } = smooth.current
      items.current.forEach((el, i) => {
        if (!el) return
        const depth = ((i % 5) + 1) * 0.3
        const tx = x * depth * 10
        const ty = y * depth * 8
        el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`
      })
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    return () => {
      running = false
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  const setRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) items.current[index] = el
  }

  return { setRef }
}

/* ── Pill header (from Figma: float menu) ── */
function Header({ page, onNavigate, menuOpen, onToggleMenu }: { page: Page; onNavigate: (p: Page) => void; menuOpen: boolean; onToggleMenu: () => void }) {
  injectLogoKeyframes()
  return (
    <>
      {/* Backdrop — closes menu on click outside */}
      {menuOpen && (
        <div onClick={onToggleMenu} style={{ position: 'fixed', inset: 0, zIndex: 199 }} />
      )}

      {/* Pill — expands to show menu */}
      <div
        style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 200,
          width: 371,
          borderRadius: 16,
          backgroundColor: 'rgba(20,20,20,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column' as const,
          transition: menuOpen
            ? 'height 0.4s cubic-bezier(0.34, 1.12, 0.64, 1)'
            : 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          height: menuOpen ? 425 : 56,
        }}
      >
        {/* Top bar — always visible */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            flexShrink: 0,
            padding: '0 12px 0 20px',
          }}
        >
          {/* Left — logo + label */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, flexShrink: 0 }}>
            <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
              <div style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'var(--color-gray-white)', animation: 'wl-sq1 3.5s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'var(--color-gray-white)', animation: 'wl-sq2 3.5s ease-in-out infinite' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-md)', whiteSpace: 'nowrap', lineHeight: 0 }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 'normal' }}>ScreenBuilder</span>
              <span style={{ color: 'var(--color-gray-white)', lineHeight: 'normal' }}> {PAGE_LABELS[page]}</span>
            </span>
          </div>

          {/* Right — hamburger / dash */}
          <button
            onClick={onToggleMenu}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: 'transparent',
              cursor: 'pointer',
              flexShrink: 0,
              gap: 0,
              position: 'relative',
            }}
          >
            {/* Line 1 — moves to center when open */}
            <div style={{
              width: 14, height: 1.5, backgroundColor: 'var(--color-gray-white)', borderRadius: 1,
              position: 'absolute',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: menuOpen ? 'translateY(0)' : 'translateY(-2.75px)',
            }} />
            {/* Line 2 — fades out when open */}
            <div style={{
              width: 14, height: 1.5, backgroundColor: 'var(--color-gray-white)', borderRadius: 1,
              position: 'absolute',
              transition: 'opacity 0.2s, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: menuOpen ? 'translateY(0)' : 'translateY(2.75px)',
              opacity: menuOpen ? 0 : 1,
            }} />
          </button>
        </div>

        {/* Menu list — below top bar, cascade animation */}
        <div
          style={{
            padding: '24px 20px 20px',
            pointerEvents: menuOpen ? 'auto' : 'none',
          }}
        >
          {MENU_ITEMS.map((item, i) => {
            const isActive = page === item.page
            return (
              <button
                key={item.page}
                onClick={() => { onNavigate(item.page); onToggleMenu() }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '8px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
                  transition: `opacity 0.3s ${0.08 + i * 0.05}s, transform 0.3s ${0.08 + i * 0.05}s`,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-md)',
                  color: isActive ? 'var(--color-gray-white)' : 'rgba(255,255,255,0.3)',
                  lineHeight: 'normal',
                }}>
                  {item.label}
                </span>
                {/* Icon 48×48 */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}>
                  {item.type === 'img' ? (
                    <img src={item.icon} alt="" style={{ width: 48, height: 48 }} />
                  ) : (
                    <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-md)', color: 'var(--color-gray-white)', fontWeight: 'var(--font-weight-medium)' }}>
                      {item.icon}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export function Playground() {
  const [page, setPage] = useState<Page>('components')
  const [active, setActive] = useState<ActiveView>({ kind: 'grid' })
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [inspectMode, setInspectMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const templatePreviewRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const parallax = useMouseFollow()

  const [valuesMap, setValuesMap] = useState<Record<string, Record<string, unknown>>>(
    () => Object.fromEntries(components.map((c) => [c.name, initValues(c)]))
  )

  /* preset index per component */
  const [presetIndexMap, setPresetIndexMap] = useState<Record<string, number>>(
    () => Object.fromEntries(components.map((c) => [c.name, -1]))
  )

  /* Inject edit-mode styles once when editMode is first enabled */
  useEffect(() => {
    if (editMode) injectEditModeStyles()
  }, [editMode])

  /* Edit mode — click handler on preview wrapper */
  function handleEditClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!editMode) return
    const target = e.target as Element
    // Walk up to find first editable candidate
    let el: Element | null = target
    while (el && el !== e.currentTarget) {
      const tag = el.tagName
      if (
        (EDITABLE_TAGS.has(tag) && hasDirectText(el)) ||
        (tag === 'DIV' && hasDirectText(el))
      ) {
        const htmlEl = el as HTMLElement
        htmlEl.contentEditable = 'true'
        htmlEl.focus()
        htmlEl.onblur = () => { htmlEl.contentEditable = 'inherit'; htmlEl.onblur = null; htmlEl.onkeydown = null }
        htmlEl.onkeydown = (ke: KeyboardEvent) => {
          if (ke.key === 'Enter' || ke.key === 'Escape') {
            ke.preventDefault()
            htmlEl.blur()
          }
        }
        e.stopPropagation()
        return
      }
      el = el.parentElement
    }
  }

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
    setEditMode(false)
    setSlotOverrides({})
    setSelectedSlot(null)
    window.scrollTo(0, 0)
  }

  function openComponent(index: number) {
    setActive({ kind: 'component', index })
    setInspectMode(false)
    setEditMode(false)
    window.scrollTo(0, 0)
  }

  function backToGrid() {
    setActive({ kind: 'grid' })
    setInspectMode(false)
    setEditMode(false)
    setSlotOverrides({})
    setSelectedSlot(null)
    window.scrollTo(0, 0)
  }

  /* filter components by category */
  const filteredComponents =
    activeCategory === 'All'
      ? components
      : components.filter((c) => getCategory(c) === activeCategory)

  /* templates config */
  const templates = [
    { name: 'Agendar Consulta', component: AgendarConsultaScreen },
    { name: 'Alice Agora', component: AliceAgoraScreen },
    { name: 'Teste — AI Content', component: EspecialistasScreen },
    { name: 'Rede Credenciada', component: RedeCredenciadaScreen },
    { name: 'Especialistas v2', component: EspecialistasScreenV2 },
    { name: 'Home (v4)', component: HomeScreenV4 },
    { name: 'Home (v3)', component: HomeScreenV3 },
    { name: 'Home (v2)', component: HomeScreenV2 },
    { name: 'Rede Alice', component: RedeAliceScreen },
    { name: 'Filters', component: FiltersScreen },
    { name: 'Home (v1)', component: HomeScreen },
    { name: 'Settings', component: SettingsScreen },
  ]
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null)
  const [slotOverrides, setSlotOverrides] = useState<Record<string, React.ReactNode>>({})
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slotPickerPos, setSlotPickerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [expandedSlotComp, setExpandedSlotComp] = useState<string | null>(null)


/* ── Grid page (scrollable) ── */
  if (page === 'components' && active.kind === 'grid') {
    return (
      <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>

        {/* Pill header */}
        <Header page={page} onNavigate={navigateTo} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />

        {/* Component grid — flex row, centered vertically, wrap */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            columnGap: 160,
            rowGap: 80,
            padding: '200px 64px 64px',
          }}
        >
          {components.map((comp, i) => {
            const index = components.indexOf(comp)
            const radius = COMPONENT_RADIUS[comp.name] ?? 16
            return (
              <div
                key={comp.name}
                ref={parallax.setRef(i)}
                style={{ willChange: 'transform' }}
              >
                <div
                  onClick={() => openComponent(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openComponent(index)}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)',
                  }}
                >
                  <div
                    className="playground-card"
                    style={{
                      backgroundColor: NEEDS_PREVIEW_BG.has(comp.name) ? 'var(--color-surface)' : 'transparent',
                      borderRadius: radius,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ pointerEvents: 'none' }}>
                      {comp.render(valuesMap[comp.name])}
                    </div>
                  </div>
                  <span
                    className="playground-card-name"
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-base)',
                      color: 'rgba(255,255,255,0.4)',
                      opacity: 0,
                      transform: 'translateY(4px)',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                  >
                    {comp.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /* ── Component detail view ── */
  if (page === 'components' && active.kind === 'component' && activeComponent) {
    const compIndex = active.index
    const hasPrev = compIndex > 0
    const hasNext = compIndex < components.length - 1
    const isDark = values.context === 'on-dark' || values.application === 'on-dark'

    /* Adaptive colors for dark container */
    const cBg        = isDark ? 'var(--color-gray-100)' : 'var(--color-surface)'
    const cText      = isDark ? 'var(--color-gray-white)' : 'var(--color-content-primary)'
    const cTextSub   = isDark ? 'var(--color-gray-60)' : 'var(--color-content-tertiary)'
    const cStroke    = isDark ? 'rgba(255,255,255,0.08)' : 'var(--color-stroke)'
    const cBtnBg     = isDark ? 'transparent' : 'var(--color-surface)'
    const cBtnHover  = isDark ? 'rgba(255,255,255,0.06)' : 'var(--color-surface-bg)'

    return (
      <div className="flex h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)', padding: 8, gap: 8 }}>

        {/* Left — Content area */}
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: cBg, borderRadius: 20, position: 'relative', transition: 'background-color 0.25s ease' }}
        >

          {/* Top bar: ← Component Name | Edit | Gerar conteúdo | ↺ */}
          <div className="flex items-center shrink-0" style={{ padding: '20px 20px 0' }}>
            {/* Back arrow */}
            <button
              onClick={backToGrid}
              className="flex items-center justify-center shrink-0"
              style={{ width: 32, height: 32, borderRadius: 8, cursor: 'pointer' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = cBtnHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon name="arrow-left" size={20} color={cText} />
            </button>

            {/* Component name */}
            <span className="ml-3" style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-family-base)', fontWeight: 'var(--font-weight-regular)', color: cText }}>{activeComponent.name}</span>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Gerar conteúdo pill */}
            {activeComponent.presets && activeComponent.presets.length > 0 && (
              <button
                onClick={() => cyclePreset(activeComponent)}
                className="flex items-center gap-2 ml-2"
                style={{
                  height: 32, padding: '0 16px', borderRadius: 'var(--radius-pill)',
                  border: `1px solid ${cStroke}`,
                  backgroundColor: cBtnBg,
                  fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)',
                  color: cText, cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = cBtnHover)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cBtnBg)}
              >
                <span>Gerar conteúdo</span>
              </button>
            )}

            {/* Reset button */}
            <button
              onClick={() => {
                setPresetIndexMap((prev) => ({ ...prev, [activeComponent.name]: -1 }))
                setValuesMap((prev) => ({ ...prev, [activeComponent.name]: initValues(activeComponent) }))
              }}
              className="flex items-center justify-center ml-2"
              style={{
                width: 32, height: 32, borderRadius: 'var(--radius-pill)',
                border: `1px solid ${cStroke}`,
                backgroundColor: cBtnBg, cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = cBtnHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cBtnBg)}
            >
              <Icon name="restore" size={20} color={cText} />
            </button>
          </div>

          {/* Separator line */}
          <div style={{ height: 1, backgroundColor: cStroke, margin: '12px 0 0', transition: 'background-color 0.25s ease' }} />

          {/* Preview area */}
          <div className="flex-1 flex items-center justify-center overflow-auto">
            <div
              ref={previewRef}
              className="overflow-visible"
              style={{ cursor: inspectMode ? 'crosshair' : undefined }}
            >
              {activeComponent.render(values, handleChange)}
            </div>
          </div>

          {/* Bottom — nav arrows, bottom right */}
          <div className="flex items-center shrink-0" style={{ padding: '16px 20px 20px', justifyContent: 'flex-end', gap: 4 }}>
            <button
              onClick={() => hasPrev && openComponent(compIndex - 1)}
              className="flex items-center justify-center"
              style={{
                width: 32, height: 32, borderRadius: 'var(--radius-pill)',
                border: `1px solid ${cStroke}`,
                opacity: hasPrev ? 1 : 0.3,
                cursor: hasPrev ? 'pointer' : 'default',
                backgroundColor: 'transparent',
              }}
            >
              <Icon name="arrow-left" size={20} color={cText} />
            </button>
            <button
              onClick={() => hasNext && openComponent(compIndex + 1)}
              className="flex items-center justify-center"
              style={{
                width: 32, height: 32, borderRadius: 'var(--radius-pill)',
                border: `1px solid ${cStroke}`,
                opacity: hasNext ? 1 : 0.3,
                cursor: hasNext ? 'pointer' : 'default',
                backgroundColor: 'transparent',
              }}
            >
              <Icon name="arrow-right" size={20} color={cText} />
            </button>
          </div>
        </div>

        {/* Right — Controls panel */}
        <aside
          className="overflow-y-auto shrink-0 flex flex-col"
          style={{ width: 431, padding: 32, gap: 40, backgroundColor: 'var(--color-surface)', borderRadius: 20 }}
        >
          <Controls controls={activeComponent.controls} values={values} onChange={handleChange} />
        </aside>

        <InspectOverlay active={inspectMode} containerRef={previewRef} />
      </div>
    )
  }

  /* ── Templates page — detail view (dark bg, centered, back button only) ── */
  if (page === 'templates' && activeTemplate !== null) {
    const tmpl = templates[activeTemplate]
    const TemplateComponent = tmpl?.component ?? null

    return (
      <div className="flex flex-col h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)', position: 'relative' }}>

        {/* Back button — top-left */}
        <button
          onClick={() => { setActiveTemplate(null); setEditMode(false); setSlotOverrides({}); setSelectedSlot(null) }}
          className="flex items-center justify-center"
          style={{
            position: 'fixed', top: 24, left: 24, zIndex: 100,
            width: 40, height: 40, borderRadius: 'var(--radius-pill)',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <Icon name="arrow-left" size={20} color="var(--color-gray-white)" />
        </button>

        {/* Edit button — top-left, beside back button */}
        <button
          onClick={() => setEditMode((v) => !v)}
          className="flex items-center justify-center"
          style={{
            position: 'fixed', top: 24, left: 72, zIndex: 100,
            width: 40, height: 40, borderRadius: 'var(--radius-pill)',
            backgroundColor: editMode ? 'var(--color-gray-white)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transition: 'background-color 0.15s',
          }}
          title={editMode ? 'Exit edit mode' : 'Edit text'}
        >
          <Icon name="pencil" size={18} color={editMode ? 'var(--color-gray-100)' : 'var(--color-gray-white)'} />
        </button>

        {/* Template — centered zoom view with 812px max height and scroll */}
        <div className="flex-1 flex items-center justify-center overflow-auto" style={{ padding: 40 }}>
          <div
            ref={templatePreviewRef}
            className={`hide-scrollbar${editMode ? ' edit-mode-preview' : ''}`}
            style={{
              width: 390,
              height: 812,
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden auto',
              boxShadow: '0 16px 64px rgba(0,0,0,0.3)',
              cursor: inspectMode ? 'crosshair' : undefined,
              position: 'relative',
            }}
            onClick={handleEditClick}
          >
            <TemplateEditContext.Provider value={{
              editMode,
              selectedSlot,
              selectSlot: (id, pos) => {
                setSelectedSlot(id)
                if (pos) setSlotPickerPos(pos)
              },
              getOverride: (id) => slotOverrides[id] ?? null,
            }}>
              {TemplateComponent ? <TemplateComponent /> : null}
            </TemplateEditContext.Provider>
          </div>
        </div>

        {/* Slot picker backdrop — closes popup when clicking outside */}
        {selectedSlot !== null && (
          <div
            onClick={() => { setSelectedSlot(null); setExpandedSlotComp(null) }}
            style={{ position: 'fixed', inset: 0, zIndex: 299 }}
          />
        )}

        {/* Slot component picker — floating popup near click */}
        {selectedSlot !== null && (
          <div
            style={{
              position: 'fixed',
              left: Math.min(slotPickerPos.x + 8, window.innerWidth - 224),
              top: Math.min(slotPickerPos.y + 8, window.innerHeight - 320),
              zIndex: 300,
              backgroundColor: 'rgba(20,20,20,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: 'var(--spacing-02)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 200,
              boxShadow: 'var(--shadow-04)',
            }}
          >
            {/* Header — slot name */}
            <div style={{ padding: '6px 12px 4px' }}>
              <span style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 'var(--font-size-xs)',
                fontFamily: 'var(--font-family-label)',
              }}>
                {selectedSlot}
              </span>
            </div>

            {/* Component rows */}
            {components.map((comp) => {
              const hasPresets = comp.presets && comp.presets.length > 0
              const isExpanded = expandedSlotComp === comp.name

              const rowStyle: React.CSSProperties = {
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-family-label)',
                color: 'var(--color-gray-white)',
                border: 'none',
                transition: 'background-color 0.12s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }

              return (
                <div key={comp.name}>
                  <button
                    onClick={() => {
                      if (hasPresets) {
                        setExpandedSlotComp(isExpanded ? null : comp.name)
                      } else {
                        setSlotOverrides((prev) => ({ ...prev, [selectedSlot!]: (comp.slotRender ?? comp.render)(initValues(comp)) }))
                        setSelectedSlot(null)
                        setExpandedSlotComp(null)
                      }
                    }}
                    style={rowStyle}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                  >
                    <span>{comp.name}</span>
                    {hasPresets && (
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 10, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>▶</span>
                    )}
                  </button>

                  {/* Preset sub-rows */}
                  {isExpanded && comp.presets!.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        const vals = { ...initValues(comp), ...preset.values }
                        setSlotOverrides((prev) => ({ ...prev, [selectedSlot!]: (comp.slotRender ?? comp.render)(vals) }))
                        setSelectedSlot(null)
                        setExpandedSlotComp(null)
                      }}
                      style={{
                        ...rowStyle,
                        paddingLeft: 24,
                        fontSize: 'var(--font-size-xs)',
                        color: 'rgba(255,255,255,0.6)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )
            })}

            {/* Divider before reset */}
            <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', margin: '2px 0' }} />

            {/* Reset row */}
            <button
              onClick={() => {
                setSlotOverrides((prev) => { const n = { ...prev }; delete n[selectedSlot!]; return n })
                setSelectedSlot(null)
                setExpandedSlotComp(null)
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontFamily: 'var(--font-family-label)',
                color: 'rgba(255,255,255,0.4)',
                border: 'none',
                transition: 'background-color 0.12s',
              }}
            >
              ↩ Reset
            </button>
          </div>
        )}

        <InspectOverlay active={inspectMode} containerRef={templatePreviewRef} />
      </div>
    )
  }

  /* ── Templates grid page ── */
  if (page === 'templates' && activeTemplate === null) {
    return (
      <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>
        <Header page={page} onNavigate={(p) => { setActiveTemplate(null); navigateTo(p) }} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 80,
            padding: '200px 64px 64px',
          }}
        >
          {/* ── Templates ── */}
          {templates.map((tmpl, i) => {
            const TemplateComponent = tmpl.component
            // Use offset indices so parallax depths differ from components
            const parallaxIdx = components.length + i
            return (
              <div
                key={tmpl.name}
                ref={parallax.setRef(parallaxIdx)}
                onClick={() => setActiveTemplate(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveTemplate(i)}
                style={{
                  cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  willChange: 'transform',
                }}
              >
                <div
                  className="playground-card"
                  style={{
                    width: 200,
                    height: Math.round(812 * 0.512),
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                    transition: 'transform 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <div className="hide-scrollbar" style={{ pointerEvents: 'none', transform: 'scale(0.512)', transformOrigin: 'top left', width: 390, height: 812, overflow: 'hidden' }}>
                    <TemplateComponent />
                  </div>
                </div>
                <span
                  className="playground-card-name"
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontFamily: 'var(--font-family-base)',
                    color: 'rgba(255,255,255,0.4)',
                    opacity: 0,
                    transform: 'translateY(4px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}
                >
                  {tmpl.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /* ── Colors / Typography / Icons pages ── */
  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>
      <Header page={page} onNavigate={(p) => { setActiveTemplate(null); navigateTo(p) }} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />

      <div style={{ paddingTop: 80 }} />

      <div
        className="flex-1 overflow-hidden"
        style={{ borderRadius: '20px 20px 0 0', backgroundColor: 'var(--color-surface)', margin: '0 8px' }}
      >
        {page === 'icons' && (
          <div className="h-full overflow-y-auto">
            <IconsPage />
          </div>
        )}
        {(page === 'colors' || page === 'typography') && (
          <div className="h-full flex flex-col overflow-hidden">
            <TokensPage initialTab={page === 'typography' ? 'typography' : 'colors'} />
          </div>
        )}
      </div>
    </div>
  )
}
