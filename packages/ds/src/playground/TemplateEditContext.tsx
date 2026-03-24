import React, { createContext, useContext } from 'react'

export interface TemplateEditCtx {
  editMode: boolean
  selectedSlot: string | null
  selectSlot: (id: string | null, pos?: { x: number; y: number }) => void
  getOverride: (id: string) => React.ReactNode | null
}

export const TemplateEditContext = createContext<TemplateEditCtx>({
  editMode: false,
  selectedSlot: null,
  selectSlot: () => {},
  getOverride: () => null,
})

export function useTemplateEdit() {
  return useContext(TemplateEditContext)
}

/* Checks if a DOM element has at least one direct text node with content */
function hasDirectText(el: Element): boolean {
  return Array.from(el.childNodes).some(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim()
  )
}

export function Slot({ id, children }: { id: string; children: React.ReactNode }) {
  const { editMode, selectedSlot, selectSlot, getOverride } = useTemplateEdit()
  const override = getOverride(id)
  const content = override ?? children

  if (!editMode) return <>{content}</>

  const isSelected = selectedSlot === id

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    const target = e.target as HTMLElement
    const wrapper = e.currentTarget

    // If click landed on an inner element (not the slot wrapper itself)
    // and that element has direct text → edit the text inline
    if (target !== wrapper && hasDirectText(target)) {
      target.contentEditable = 'true'
      target.focus()
      // Move cursor to click position
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) sel.collapseToEnd()
      target.onblur = () => {
        target.contentEditable = 'inherit'
        target.onblur = null
        target.onkeydown = null
      }
      target.onkeydown = (ke: KeyboardEvent) => {
        if (ke.key === 'Escape') { ke.preventDefault(); target.blur() }
        if (ke.key === 'Enter')  { ke.preventDefault(); target.blur() }
      }
      return
    }

    // Otherwise → open component swap picker
    selectSlot(isSelected ? null : id, { x: e.clientX, y: e.clientY })
  }

  return (
    <div
      onClick={handleClick}
      style={{
        outline: isSelected
          ? '2px solid var(--color-brand)'
          : '1.5px dashed rgba(190,3,128,0.25)',
        borderRadius: 4,
        cursor: 'pointer',
        position: 'relative',
        transition: 'outline-color 0.15s',
      }}
    >
      {content}
    </div>
  )
}
