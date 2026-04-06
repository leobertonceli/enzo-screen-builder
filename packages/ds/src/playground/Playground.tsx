import React, { useEffect, useRef, useState } from 'react'
import { TemplateEditContext } from './TemplateEditContext'
import { Controls } from './Controls'
import { InspectOverlay } from './InspectOverlay'
import { TokensPage } from './TokensPage'
import { IconsPage } from './IconsPage'
import { ButtonConfig } from './configs/ButtonConfig'
import { ListItemConfig } from './configs/ListItemConfig'
import { ChipConfig } from './configs/ChipConfig'
import { BaseCardConfig } from './configs/BaseCardConfig'
import { ChatInputConfig } from './configs/ChatInputConfig'
import { LinkConfig } from './configs/LinkConfig'
import { CardMFCConfig } from './configs/CardMFCConfig'
import { ChatBubbleConfig } from './configs/ChatBubbleConfig'
import { ChatResponseConfig } from './configs/ChatResponseConfig'
import { TagConfig } from './configs/TagConfig'
import { BottomBarConfig } from './configs/BottomBarConfig'
import { TextFieldConfig } from './configs/TextFieldConfig'
import { CalloutConfig } from './configs/CalloutConfig'
import { ShortcutConfig } from './configs/ShortcutConfig'
import { BadgeConfig } from './configs/BadgeConfig'
import { CheckboxConfig } from './configs/CheckboxConfig'
import { AvatarConfig } from './configs/AvatarConfig'
import { TabsConfig } from './configs/TabsConfig'
import { NavBarConfig } from './configs/NavBarConfig'
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
import { AgendarConsultaScreen }         from '../screens/AgendarConsultaScreen'
import { AgendamentoFlowScreen }          from '../screens/AgendamentoFlowScreen'
import { EscolhaEspecialistaScreen }      from '../screens/EscolhaEspecialistaScreen'
import { AgendamentoConsultaFlowScreen } from '../screens/AgendamentoConsultaFlowScreen'
import { SolicitacaoExameFlowScreen }   from '../screens/SolicitacaoExameFlowScreen'
import { BuscaEspecialistasScreen }    from '../screens/BuscaEspecialistasScreen'
import { ExtratoCoparticipacaoScreen } from '../screens/ExtratoCoparticipacaoScreen'
import { ReembolsoFlowScreen }              from '../screens/ReembolsoFlowScreen'
import { CadastroDependenteFlowScreen }    from '../screens/CadastroDependenteFlowScreen'
import { RedeCredenciadaFlowScreen }       from '../screens/RedeCredenciadaFlowScreen'
import type { ComponentConfig } from './types'
import menuIconComponentes from '../assets/menu-icons/componentes.svg'
import menuIconTemplates from '../assets/menu-icons/templates.svg'
import menuIconIconography from '../assets/menu-icons/iconography.svg'

/* ── Component thumbnail imports ── */
import thumbButton from '../assets/thumbs/Button.png'
import thumbListItem from '../assets/thumbs/ListItem.png'
import thumbChip from '../assets/thumbs/Chip.png'
import thumbBaseCard from '../assets/thumbs/BaseCard.png'
import thumbShortcut from '../assets/thumbs/Shortcut.png'
import thumbChatInput from '../assets/thumbs/ChatInput.png'
import thumbCardMFC from '../assets/thumbs/CardMFC.png'
import thumbChatBubble from '../assets/thumbs/ChatBubble.png'
import thumbChatResponse from '../assets/thumbs/Chat response.png'
import thumbTag from '../assets/thumbs/Tag.png'
import thumbTextField from '../assets/thumbs/TextField.png'
import thumbCallout from '../assets/thumbs/Callout.png'
import thumbBadge from '../assets/thumbs/Badge.png'
import thumbCheckbox from '../assets/thumbs/Checkbox.png'
import thumbAvatar from '../assets/thumbs/Avatar.png'
import thumbTab from '../assets/thumbs/Tab.png'
import thumbNavBar from '../assets/thumbs/NavBar.png'
import thumbBottomBar from '../assets/thumbs/BottomBar.png'
import thumbLink from '../assets/thumbs/Link.png'

const THUMB_MAP: Record<string, string> = {
  Button: thumbButton,
  ListItem: thumbListItem,
  Chip: thumbChip,
  BaseCard: thumbBaseCard,
  Shortcut: thumbShortcut,
  ChatInput: thumbChatInput,
  CardMFC: thumbCardMFC,
  ChatBubble: thumbChatBubble,
  ChatResponse: thumbChatResponse,
  Tag: thumbTag,
  TextField: thumbTextField,
  Callout: thumbCallout,
  Badge: thumbBadge,
  Checkbox: thumbCheckbox,
  Avatar: thumbAvatar,
  Tabs: thumbTab,
  NavBar: thumbNavBar,
  BottomBar: thumbBottomBar,
  Link: thumbLink,
}

/* Distribute components across 3 columns */
function distributeColumns(items: ComponentConfig[], cols: number): ComponentConfig[][] {
  const columns: ComponentConfig[][] = Array.from({ length: cols }, () => [])
  items.forEach((item, i) => columns[i % cols].push(item))
  return columns
}

const components: ComponentConfig[] = [ButtonConfig, ListItemConfig, ChipConfig, BaseCardConfig, ShortcutConfig, ChatInputConfig, LinkConfig, CardMFCConfig, ChatBubbleConfig, ChatResponseConfig, TagConfig, BottomBarConfig, TextFieldConfig, CalloutConfig, BadgeConfig, CheckboxConfig, AvatarConfig, TabsConfig, NavBarConfig]


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
    /* Grid card hover */
    .grid-card:hover { background: rgba(255,255,255,0.09) !important; }
    /* Thumb images — exported @2x for retina */
    .grid-card img { zoom: 0.5; display: block; image-rendering: -webkit-optimize-contrast; }
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

/* ── Hook: scale phone proportionally to available viewport ── */
const PHONE_W = 375
const PHONE_H = 812
const CHROME_V = 188  // top (80) + bottom (108) playground chrome
const CHROME_H = 80   // left + right padding

function usePhoneScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const scaleH = (window.innerHeight - CHROME_V) / PHONE_H
      const scaleW = (window.innerWidth  - CHROME_H) / PHONE_W
      setScale(Math.min(1, scaleH, scaleW))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return scale
}

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

/* ── Parallax wrapper — listens to window scroll, applies translateY to each column ── */
function GridParallax({ children, colRefs, speeds }: { children: React.ReactNode; colRefs: React.RefObject<HTMLDivElement>[]; speeds: number[] }) {
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY
          colRefs.forEach((ref, i) => {
            if (ref.current) ref.current.style.transform = `translateY(${y * speeds[i]}px)`
          })
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <>{children}</>
}

/* ── Search placeholder per page ── */
const SEARCH_PLACEHOLDERS: Record<Page, string> = {
  components: 'busque por componente',
  templates: 'busque por template',
  icons: 'busque por ícone',
  colors: 'busque por token de cor',
  typography: 'busque por tipografia',
}

/* ── Shared nav group: Header pill + Search pill ── */
function NavGroup({ page, menuOpen, onToggleMenu, onNavigate, searchOpen, onSearchOpen, onSearchClose, searchQuery, onSearchChange, searchInputRef, placeholder }: {
  page: Page
  menuOpen: boolean
  onToggleMenu: () => void
  onNavigate: (p: Page) => void
  searchOpen: boolean
  onSearchOpen: () => void
  onSearchClose: () => void
  searchQuery: string
  onSearchChange: (q: string) => void
  searchInputRef: React.RefObject<HTMLInputElement | null>
  placeholder: string
}) {
  return (
    <div style={{ position: 'fixed', top: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 200, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <Header page={page} onNavigate={onNavigate} menuOpen={menuOpen} onToggleMenu={onToggleMenu} collapsed={searchOpen} inline onCollapsedClick={onSearchClose} />
      <div style={{
        height: 56,
        width: searchOpen ? 320 : 56,
        backgroundColor: 'rgba(20,20,20,0.7)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        transition: 'width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)',
      }}>
        <button
          onClick={searchOpen ? onSearchClose : onSearchOpen}
          style={{
            width: 56, height: 56, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', opacity: searchOpen ? 1 : 0.5,
            transition: 'opacity 0.2s',
            border: 'none', background: 'none', color: 'var(--color-gray-white)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <input
          ref={searchInputRef}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={e => { if (e.key === 'Escape') onSearchClose() }}
          style={{
            flex: 1, background: 'none', border: 'none',
            color: 'var(--color-gray-white)',
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 400,
            outline: 'none', paddingRight: 16,
            opacity: searchOpen ? 1 : 0,
            transition: 'opacity 0.2s',
          }}
        />
      </div>
    </div>
  )
}

/* ── Pill header (from Figma: float menu) ── */
function Header({ page, onNavigate, menuOpen, onToggleMenu, collapsed, inline, onCollapsedClick }: { page: Page; onNavigate: (p: Page) => void; menuOpen: boolean; onToggleMenu: () => void; collapsed?: boolean; inline?: boolean; onCollapsedClick?: () => void }) {
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
          ...(inline ? {} : { position: 'fixed' as const, top: 24, left: '50%', transform: 'translateX(-50%)' }),
          zIndex: 200,
          width: collapsed ? 56 : 371,
          borderRadius: 16,
          backgroundColor: 'rgba(20,20,20,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(22px)',
          WebkitBackdropFilter: 'blur(22px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column' as const,
          transition: menuOpen
            ? 'height 0.4s cubic-bezier(0.34, 1.12, 0.64, 1), width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)'
            : 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)',
          height: collapsed ? 56 : menuOpen ? 425 : 56,
        }}
      >
        {/* Top bar — always visible */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            height: 56,
            flexShrink: 0,
            padding: collapsed ? '0' : '0 12px 0 20px',
          }}
        >
          {/* Left — logo + label */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, flexShrink: 0 }}>
            <div
              style={{ position: 'relative', width: 20, height: 20, flexShrink: 0, cursor: collapsed ? 'pointer' : 'default' }}
              onClick={collapsed ? onCollapsedClick : undefined}
            >
              <div style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'var(--color-gray-white)', animation: 'wl-sq1 3.5s ease-in-out infinite' }} />
              <div style={{ position: 'absolute', width: 10, height: 10, backgroundColor: 'var(--color-gray-white)', animation: 'wl-sq2 3.5s ease-in-out infinite' }} />
            </div>
            {!collapsed && (
              <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-md)', whiteSpace: 'nowrap', lineHeight: 0 }}>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 'normal' }}>ScreenBuilder</span>
                <span style={{ color: 'var(--color-gray-white)', lineHeight: 'normal' }}> {PAGE_LABELS[page]}</span>
              </span>
            )}
          </div>

          {/* Right — hamburger / dash */}
          {!collapsed && (
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
          )}
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
  const [inspectMode, setInspectMode] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const templatePreviewRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 50)
  }, [searchOpen])
  const parallax = useMouseFollow()
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const col3Ref = useRef<HTMLDivElement>(null)

  const [valuesMap, setValuesMap] = useState<Record<string, Record<string, unknown>>>(
    () => Object.fromEntries(components.map((c) => [c.name, initValues(c)]))
  )

  /* preset index per component */
  const [_presetIndexMap, setPresetIndexMap] = useState<Record<string, number>>(
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
    setSearchQuery('')
    setSearchOpen(false)
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

  /* templates config */
  const templates = [
    { name: 'Cadastro de Dependente',  component: CadastroDependenteFlowScreen },
    { name: 'Reembolso Flow',          component: ReembolsoFlowScreen },
    { name: 'Extrato Coparticipação',  component: ExtratoCoparticipacaoScreen },
    { name: 'Busca de Especialistas', component: BuscaEspecialistasScreen },
    { name: 'Solicitação de Exame', component: SolicitacaoExameFlowScreen },
    { name: 'Rede Credenciada Flow', component: RedeCredenciadaFlowScreen },
    { name: 'Agendamento Consulta Flow', component: AgendamentoConsultaFlowScreen },
    { name: 'Escolha Especialista', component: EscolhaEspecialistaScreen },
    { name: 'Agendamento',          component: AgendamentoFlowScreen     },
    { name: 'Agendar Consulta', component: AgendarConsultaScreen   },
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
  const phoneScale = usePhoneScale()
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null)
  const [templateResetKey, setTemplateResetKey] = useState(0)
  const [slotOverrides, setSlotOverrides] = useState<Record<string, React.ReactNode>>({})
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [slotPickerPos, setSlotPickerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [expandedSlotComp, setExpandedSlotComp] = useState<string | null>(null)


/* ── Grid page (scrollable, 3-column parallax) ── */
  if (page === 'components' && active.kind === 'grid') {
    const q = searchQuery.toLowerCase()
    const filtered = q ? components.filter(c => c.name.toLowerCase().includes(q)) : components
    const [col1Items, col2Items, col3Items] = distributeColumns(filtered, 3)
    const speeds = [0, 0.25, 0.12]
    const colRefs = [col1Ref, col2Ref, col3Ref] as React.RefObject<HTMLDivElement>[]

    return (
      <GridParallax colRefs={colRefs} speeds={speeds}>
      <div
        className="min-h-screen"
        style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}
      >

        <NavGroup
          page={page}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((v) => !v)}
          onNavigate={navigateTo}
          searchOpen={searchOpen}
          onSearchOpen={() => setSearchOpen(true)}
          onSearchClose={() => { setSearchOpen(false); setSearchQuery('') }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchInputRef={searchInputRef}
          placeholder={SEARCH_PLACEHOLDERS[page]}
        />

        {/* 3-column grid with parallax — extra bottom padding compensates downward parallax shift */}
        <div style={{ display: 'flex', gap: 4, padding: '280px 4px 600px', alignItems: 'flex-start' }}>
          {[col1Items, col2Items, col3Items].map((colItems, ci) => (
            <div
              key={ci}
              ref={colRefs[ci]}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, willChange: 'transform' }}
            >
              {colItems.map(comp => {
                const index = components.indexOf(comp)
                const thumb = THUMB_MAP[comp.name]
                return (
                  <div
                    key={comp.name}
                    className="grid-card"
                    onClick={() => openComponent(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && openComponent(index)}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 18, overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex', flexDirection: 'column',
                      aspectRatio: '1', flexShrink: 0,
                      transition: 'background 0.25s ease',
                    }}
                  >
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, minHeight: 0, overflow: 'hidden' }}>
                      {thumb ? <img src={thumb} alt={comp.name} style={{ zoom: 0.5, imageRendering: '-webkit-optimize-contrast' as React.CSSProperties['imageRendering'] }} /> : (
                        <div style={{ pointerEvents: 'none' }}>{comp.render(valuesMap[comp.name])}</div>
                      )}
                    </div>
                    <div style={{
                      padding: 16,
                      fontSize: 'var(--font-size-xs)',
                      fontFamily: 'var(--font-family-base)',
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.3)',
                    }}>
                      {comp.name}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(255,255,255,0.25)',
            fontSize: 'var(--font-size-sm)',
            fontFamily: 'var(--font-family-base)',
            pointerEvents: 'none',
          }}>
            Nenhum componente encontrado
          </div>
        )}
      </div>
      </GridParallax>
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
              <Icon name="arrowLeft" size={20} color={cText} />
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
              <Icon name="update" size={20} color={cText} />
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
              <Icon name="arrowLeft" size={20} color={cText} />
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
              <Icon name="arrowRight" size={20} color={cText} />
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
            width: 48, height: 48, borderRadius: 'var(--radius-sm)',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
          }}
        >
          <Icon name="arrowLeft" size={20} color="var(--color-gray-white)" />
        </button>

        {/* Top-right action buttons — Editar, Exportar, Enviar para o Figma */}
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 100,
          display: 'flex', alignItems: 'center',
          gap: 'var(--spacing-02)',
        }}>
          {/* Editar */}
          <button
            onClick={() => setEditMode((v) => !v)}
            title="Editar template"
            style={{
              width: 48, height: 48,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: editMode ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background-color 0.2s',
            }}
          >
            <Icon name="edit" size={20} color="var(--color-gray-white)" />
          </button>

          {/* Exportar */}
          <button
            title="Exportar"
            onClick={async () => {
              const TemplateComponent = tmpl.component
              const screenFnName = TemplateComponent.name || tmpl.name.replace(/\s/g, '')

              try {
                const res = await fetch('/screen-builder/export-preview.html')
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                let html = await res.text()

                html = html.replace(
                  '<script defer>',
                  `<script>window.__DS_SCREEN__ = '${screenFnName}'</script>\n<script defer>`
                )
                html = html.replace(/<title>[^<]*<\/title>/, `<title>${screenFnName}</title>`)

                const blob = new Blob([html], { type: 'text/html' })
                const url  = URL.createObjectURL(blob)
                const a    = document.createElement('a')
                a.href     = url
                a.download = `${screenFnName}.html`
                a.click()
                setTimeout(() => URL.revokeObjectURL(url), 1000)
              } catch (err) {
                console.error('Exportar: /export-preview.html não encontrado — rode npm run build:export primeiro', err)
                alert('Arquivo de exportação não encontrado.\nRode: npm run build:export')
              }
            }}
            style={{
              width: 48, height: 48,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon name="shareiOS" size={20} color="var(--color-gray-white)" />
          </button>

          {/* Enviar para o Figma */}
          <button
            title="Enviar para o Figma"
            onClick={() => alert('Em breve: enviar para o Figma')}
            style={{
              width: 48, height: 48,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16667 4.58333C4.16667 3.80979 4.47396 3.06792 5.02094 2.52094C5.56792 1.97396 6.30979 1.66667 7.08333 1.66667H10V7.5H7.08333C6.30979 7.5 5.56792 7.19271 5.02094 6.64573C4.47396 6.09875 4.16667 5.35688 4.16667 4.58333Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 1.66667H12.9167C13.6902 1.66667 14.4321 1.97396 14.9791 2.52094C15.5261 3.06792 15.8333 3.80979 15.8333 4.58333C15.8333 5.35688 15.5261 6.09875 14.9791 6.64573C14.4321 7.19271 13.6902 7.5 12.9167 7.5H10V1.66667Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 10.4167C10 9.64312 10.3073 8.90125 10.8543 8.35427C11.4013 7.80729 12.1431 7.5 12.9167 7.5C13.6902 7.5 14.4321 7.80729 14.9791 8.35427C15.5261 8.90125 15.8333 9.64312 15.8333 10.4167C15.8333 11.1902 15.5261 11.9321 14.9791 12.4791C14.4321 13.026 13.6902 13.3333 12.9167 13.3333C12.1431 13.3333 11.4013 13.026 10.8543 12.4791C10.3073 11.9321 10 11.1902 10 10.4167Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.16667 16.25C4.16667 15.4765 4.47396 14.7346 5.02094 14.1876C5.56792 13.6406 6.30979 13.3333 7.08333 13.3333H10V16.25C10 17.0235 9.69271 17.7654 9.14573 18.3124C8.59875 18.8594 7.85688 19.1667 7.08333 19.1667C6.30979 19.1667 5.56792 18.8594 5.02094 18.3124C4.47396 17.7654 4.16667 17.0235 4.16667 16.25Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.16667 10.4167C4.16667 9.64312 4.47396 8.90125 5.02094 8.35427C5.56792 7.80729 6.30979 7.5 7.08333 7.5H10V13.3333H7.08333C6.30979 13.3333 5.56792 13.026 5.02094 12.4791C4.47396 11.9321 4.16667 11.1902 4.16667 10.4167Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Template — proportionally scaled to viewport */}
        <div className="flex-1 flex items-center justify-center" style={{ padding: '80px 40px' }}>
          {/* Outer shell: sized to scaled dimensions, acts as layout anchor */}
          <div style={{
            width:  PHONE_W * phoneScale,
            height: PHONE_H * phoneScale,
            flexShrink: 0,
            position: 'relative',
          }}>
            {/* Inner: rendered at native 375×812, then scaled from top-left */}
            <div
              ref={templatePreviewRef}
              className={`hide-scrollbar${editMode ? ' edit-mode-preview' : ''}`}
              style={{
                width: PHONE_W,
                height: PHONE_H,
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden auto',
                boxShadow: '0 16px 64px rgba(0,0,0,0.3)',
                cursor: inspectMode ? 'crosshair' : undefined,
                position: 'absolute',
                top: 0,
                left: 0,
                transformOrigin: 'top left',
                transform: `scale(${phoneScale})`,
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
              {TemplateComponent ? <TemplateComponent key={templateResetKey} /> : null}
            </TemplateEditContext.Provider>
            </div>
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
    const filteredTemplates = searchQuery
      ? templates.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : templates
    return (
      <div className="min-h-screen" style={{ fontFamily: 'var(--font-family-base)', backgroundColor: 'var(--color-gray-100)' }}>
        <NavGroup
          page={page}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((v) => !v)}
          onNavigate={(p) => { setActiveTemplate(null); navigateTo(p) }}
          searchOpen={searchOpen}
          onSearchOpen={() => setSearchOpen(true)}
          onSearchClose={() => { setSearchOpen(false); setSearchQuery('') }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchInputRef={searchInputRef}
          placeholder={SEARCH_PLACEHOLDERS[page]}
        />

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
          {filteredTemplates.length === 0 && (
            <div style={{
              position: 'fixed', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'rgba(255,255,255,0.25)',
              fontSize: 'var(--font-size-sm)',
              fontFamily: 'var(--font-family-base)',
              pointerEvents: 'none',
            }}>
              Nenhum template encontrado
            </div>
          )}
          {filteredTemplates.map((tmpl) => {
            const i = templates.indexOf(tmpl)
            const TemplateComponent = tmpl.component
            // Use offset indices so parallax depths differ from components
            const parallaxIdx = components.length + i
            return (
              <div
                key={tmpl.name}
                ref={parallax.setRef(parallaxIdx)}
                onClick={() => { setActiveTemplate(i); setTemplateResetKey(k => k + 1) }}
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
      <NavGroup
        page={page}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onNavigate={(p) => { setActiveTemplate(null); navigateTo(p) }}
        searchOpen={searchOpen}
        onSearchOpen={() => setSearchOpen(true)}
        onSearchClose={() => { setSearchOpen(false); setSearchQuery('') }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchInputRef={searchInputRef}
        placeholder={SEARCH_PLACEHOLDERS[page]}
      />

      <div style={{ paddingTop: 80 }} />

      <div
        className="flex-1 overflow-hidden"
        style={{ borderRadius: '20px 20px 0 0', backgroundColor: 'var(--color-surface)', margin: '0 8px' }}
      >
        {page === 'icons' && (
          <div className="h-full overflow-y-auto">
            <IconsPage searchQuery={searchQuery} />
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
