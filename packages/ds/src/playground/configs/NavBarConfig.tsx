// @refresh reset
import React, { useState, useEffect } from 'react'
import { NavBar } from '../../components/NavBar/NavBar'
import type { NavBarSelected } from '../../components/NavBar/NavBar'
import type { ComponentConfig } from '../types'
import userPhoto from '../../assets/navbar-user-photo.png'

function resolvePhoto(p: Record<string, unknown>) {
  const url = p.userImageUrl as string
  return url || (p.meuPlanoMode === 'photo' ? userPhoto : undefined)
}

function InteractiveNavBar(p: Record<string, unknown>) {
  const [active, setActive] = useState(p.selected as NavBarSelected)
  useEffect(() => { setActive(p.selected as NavBarSelected) }, [p.selected])
  return (
    <NavBar
      selected={active}
      onTabSelect={setActive}
      tab1Label={p.tab1Label as string}
      tab2Label={p.tab2Label as string}
      tab3Label={p.tab3Label as string}
      tab4Label={p.tab4Label as string}
      tab1Icon={p.tab1Icon as string}
      tab2Icon={p.tab2Icon as string}
      tab3Icon={p.tab3Icon as string}
      meuPlanoMode={p.meuPlanoMode as any}
      userInitials={p.userInitials as string || undefined}
      userImageUrl={resolvePhoto(p)}
      width={375}
    />
  )
}

function SlotNavBar(p: Record<string, unknown>) {
  const [active, setActive] = useState(p.selected as NavBarSelected)
  useEffect(() => { setActive(p.selected as NavBarSelected) }, [p.selected])
  return (
    <NavBar
      selected={active}
      onTabSelect={setActive}
      tab1Label={p.tab1Label as string}
      tab2Label={p.tab2Label as string}
      tab3Label={p.tab3Label as string}
      tab4Label={p.tab4Label as string}
      tab1Icon={p.tab1Icon as string}
      tab2Icon={p.tab2Icon as string}
      tab3Icon={p.tab3Icon as string}
      meuPlanoMode={p.meuPlanoMode as any}
      userInitials={p.userInitials as string || undefined}
      userImageUrl={resolvePhoto(p)}
      width="100%"
    />
  )
}

export const NavBarConfig: ComponentConfig = {
  name: 'NavBar',
  presets: [
    { label: 'Alice Agora', values: { selected: 'Alice Agora', tab1Label: 'Alice Agora', tab2Label: 'Minha saúde', tab3Label: 'Rede Alice', tab4Label: 'Meu plano', tab1Icon: 'heart', tab2Icon: 'pulse', tab3Icon: 'map-marker', meuPlanoMode: 'initials', userInitials: 'LB', userImageUrl: '' } },
    { label: 'Minha saúde', values: { selected: 'Minha saúde', tab1Label: 'Alice Agora', tab2Label: 'Minha saúde', tab3Label: 'Rede Alice', tab4Label: 'Meu plano', tab1Icon: 'heart', tab2Icon: 'pulse', tab3Icon: 'map-marker', meuPlanoMode: 'initials', userInitials: 'LB', userImageUrl: '' } },
    { label: 'Rede Alice',  values: { selected: 'Rede Alice',  tab1Label: 'Alice Agora', tab2Label: 'Minha saúde', tab3Label: 'Rede Alice', tab4Label: 'Meu plano', tab1Icon: 'heart', tab2Icon: 'pulse', tab3Icon: 'map-marker', meuPlanoMode: 'initials', userInitials: 'LB', userImageUrl: '' } },
    { label: 'Meu plano — iniciais', values: { selected: 'Meu plano', tab1Label: 'Alice Agora', tab2Label: 'Minha saúde', tab3Label: 'Rede Alice', tab4Label: 'Meu plano', tab1Icon: 'heart', tab2Icon: 'pulse', tab3Icon: 'map-marker', meuPlanoMode: 'initials', userInitials: 'LB', userImageUrl: '' } },
    { label: 'Meu plano — foto',    values: { selected: 'Meu plano', tab1Label: 'Alice Agora', tab2Label: 'Minha saúde', tab3Label: 'Rede Alice', tab4Label: 'Meu plano', tab1Icon: 'heart', tab2Icon: 'pulse', tab3Icon: 'map-marker', meuPlanoMode: 'photo',    userInitials: '',   userImageUrl: '' } },
  ],
  controls: {
    selected:     { type: 'radio',       label: 'Active tab',  options: ['Alice Agora', 'Minha saúde', 'Rede Alice', 'Meu plano'], default: 'Alice Agora' },
    tab1Label:    { type: 'text',        label: 'Tab 1 label', default: 'Alice Agora' },
    tab1Icon:     { type: 'icon-picker', label: 'Tab 1 icon',  default: 'heart' },
    tab2Label:    { type: 'text',        label: 'Tab 2 label', default: 'Minha saúde' },
    tab2Icon:     { type: 'icon-picker', label: 'Tab 2 icon',  default: 'pulse' },
    tab3Label:    { type: 'text',        label: 'Tab 3 label', default: 'Rede Alice' },
    tab3Icon:     { type: 'icon-picker', label: 'Tab 3 icon',  default: 'map-marker' },
    tab4Label:    { type: 'text',        label: 'Tab 4 label', default: 'Meu plano' },
    meuPlanoMode: { type: 'radio',       label: 'Meu plano',   options: ['initials', 'photo'], default: 'initials', showWhen: { field: 'selected', values: ['Meu plano'] } },
    userInitials: { type: 'text',        label: 'Iniciais',    default: 'LB',         showWhen: { field: 'meuPlanoMode', values: ['initials'] } },
    userImageUrl: { type: 'text',        label: 'Photo URL',   default: '',           showWhen: { field: 'meuPlanoMode', values: ['photo'] } },
  },
  render: (p) => <InteractiveNavBar {...p} />,
  slotRender: (p) => <SlotNavBar {...p} />,
}
