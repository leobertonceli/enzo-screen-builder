import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Icon } from '../../icons/Icon'

export type BottomBarSelected = 'Alice Agora' | 'Minha saúde' | 'Rede Alice' | 'Meu plano'
export type MeuPlanoMode = 'photo' | 'initials'

export interface BottomBarProps {
  selected?: BottomBarSelected
  onTabSelect?: (tab: BottomBarSelected) => void
  tab1Label?: string
  tab2Label?: string
  tab3Label?: string
  tab4Label?: string
  tab1Icon?: string
  tab2Icon?: string
  tab3Icon?: string
  meuPlanoMode?: MeuPlanoMode
  userInitials?: string
  userImageUrl?: string
  width?: string | number
}

const ACTIVE_COLOR = 'var(--color-brand)'
const INACTIVE_COLOR = 'var(--color-black-30)'
const TAB_ORDER: BottomBarSelected[] = ['Alice Agora', 'Minha saúde', 'Rede Alice', 'Meu plano']

const SPRING = 'cubic-bezier(0.34, 1.4, 0.64, 1)'

const labelStyle: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  fontSize: 'var(--font-size-xs)',
  lineHeight: 'var(--line-height-title)',
  textAlign: 'center',
  margin: 0,
  whiteSpace: 'nowrap',
  transition: 'color 0.3s ease',
}

interface TabItemProps {
  label: string
  active: boolean
  icon: React.ReactNode
  onClick?: () => void
}

function TabItem({ label, active, icon, onClick }: TabItemProps) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        minWidth: 0,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-01)' }}>
        {icon}
        <p style={{ ...labelStyle, color: active ? ACTIVE_COLOR : INACTIVE_COLOR }}>
          {label}
        </p>
      </div>
      {/* Dot placeholder — keeps layout height consistent */}
      <div style={{ width: 4, height: 4, flexShrink: 0 }} />
    </div>
  )
}

export function BottomBar({
  selected = 'Alice Agora',
  onTabSelect,
  tab1Label = 'Alice Agora',
  tab2Label = 'Minha saúde',
  tab3Label = 'Rede Alice',
  tab4Label = 'Meu plano',
  tab1Icon = 'heart',
  tab2Icon = 'pulse',
  tab3Icon = 'map-marker',
  meuPlanoMode = 'initials',
  userInitials,
  userImageUrl,
  width = 375,
}: BottomBarProps) {
  const [activeTab, setActiveTab] = useState<BottomBarSelected>(selected)

  // Sync when controlled prop changes
  useEffect(() => { setActiveTab(selected) }, [selected])

  function handleTabSelect(tab: BottomBarSelected) {
    setActiveTab(tab)
    onTabSelect?.(tab)
  }

  const isAlice    = activeTab === 'Alice Agora'
  const isSaude    = activeTab === 'Minha saúde'
  const isRede     = activeTab === 'Rede Alice'
  const isMeuPlano = activeTab === 'Meu plano'

  const activeIndex = TAB_ORDER.indexOf(activeTab)

  const avatarBg = isMeuPlano && meuPlanoMode === 'initials'
    ? ACTIVE_COLOR
    : 'var(--color-black-10)'

  const meuPlanoAvatar = (
    <div style={{
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden',
      flexShrink: 0,
      position: 'relative',
      backgroundColor: avatarBg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 0.2s ease',
    }}>
      {meuPlanoMode === 'photo' && userImageUrl ? (
        <img
          src={userImageUrl}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      ) : meuPlanoMode === 'initials' && userInitials ? (
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
          fontSize: 'var(--font-size-xs)',
          lineHeight: 1,
          color: 'var(--color-gray-white)',
          margin: 0,
          textAlign: 'center',
        }}>
          {userInitials}
        </p>
      ) : (
        <Icon name="account" size={16} color={isMeuPlano ? 'var(--color-gray-white)' : INACTIVE_COLOR} />
      )}
    </div>
  )

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      gap: 'var(--spacing-03)',
      alignItems: 'flex-start',
      paddingTop: 'var(--spacing-02)',
      paddingBottom: 32,
      paddingLeft: 'var(--spacing-03)',
      paddingRight: 'var(--spacing-03)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      backgroundColor: 'var(--color-gray-white)',
      width,
      boxSizing: 'border-box',
    }}>
      <TabItem
        label={tab1Label}
        active={isAlice}
        onClick={() => handleTabSelect('Alice Agora')}
        icon={<Icon name={tab1Icon} size={24} color={isAlice ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />
      <TabItem
        label={tab2Label}
        active={isSaude}
        onClick={() => handleTabSelect('Minha saúde')}
        icon={<Icon name={tab2Icon} size={24} color={isSaude ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />
      <TabItem
        label={tab3Label}
        active={isRede}
        onClick={() => handleTabSelect('Rede Alice')}
        icon={<Icon name={tab3Icon} size={24} color={isRede ? ACTIVE_COLOR : INACTIVE_COLOR} />}
      />
      <TabItem
        label={tab4Label}
        active={isMeuPlano}
        onClick={() => handleTabSelect('Meu plano')}
        icon={meuPlanoAvatar}
      />

      {/* Sliding active dot */}
      <div style={{
        position: 'absolute',
        bottom: 32,
        left: `calc(${activeIndex} * 25% + 12.5%)`,
        transform: 'translateX(-50%)',
        width: 4,
        height: 4,
        borderRadius: 'var(--radius-pill)',
        backgroundColor: ACTIVE_COLOR,
        transition: `left 0.35s ${SPRING}`,
        pointerEvents: 'none',
      }} />
    </div>
  )
}
