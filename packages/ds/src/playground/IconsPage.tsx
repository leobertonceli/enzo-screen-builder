import { useState, useMemo } from 'react'
import { Icon } from '../icons/Icon'
import { ICONS, ICON_CATEGORIES } from '../icons/iconCatalog'
import type { IconCategory } from '../icons/iconCatalog'

export function IconsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<IconCategory | 'All'>('All')
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = ICONS
    if (activeCategory !== 'All') {
      result = result.filter((i) => i.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter((i) => i.name.toLowerCase().includes(q))
    }
    return result
  }, [search, activeCategory])

  // Group by category for display
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const ic of filtered) {
      const cat = ic.category
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(ic)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  function handleCopy(filename: string) {
    navigator.clipboard.writeText(`<Icon name="${filename}" />`).catch(() => {})
    setCopiedIcon(filename)
    setTimeout(() => setCopiedIcon(null), 1500)
  }

  return (
    <div className="flex-1 overflow-y-auto p-6" style={{ fontFamily: 'var(--font-family-base)' }}>
      {/* Header: search + filters */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Search */}
        <div className="relative max-w-[400px]">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3A3A3]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar ícone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-white border border-[#E5E5E5] rounded-xl outline-none focus:border-[#BE0380] transition-colors"
            style={{ fontFamily: 'var(--font-family-base)', color: '#141414' }}
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-3 py-1.5 text-[12px] rounded-lg font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-[#BE0380] text-white'
                : 'bg-[#F4F4F4] text-[#6F6F6F] hover:bg-[#EBEBEB]'
            }`}
          >
            All ({ICONS.length})
          </button>
          {ICON_CATEGORIES.map((cat) => {
            const count = ICONS.filter((i) => i.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-[12px] rounded-lg font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#BE0380] text-white'
                    : 'bg-[#F4F4F4] text-[#6F6F6F] hover:bg-[#EBEBEB]'
                }`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-[12px] text-[#A3A3A3] mb-4">
        {filtered.length} ícone{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Icon grid, grouped by category */}
      {grouped.map(([category, icons]) => (
        <div key={category} className="mb-8">
          <h3
            className="text-[14px] font-semibold mb-3 pb-2 border-b border-[#F0F0F0]"
            style={{ color: '#141414' }}
          >
            {category}
          </h3>
          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))' }}>
            {icons.map((ic) => (
              <button
                key={ic.filename}
                onClick={() => handleCopy(ic.filename)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-transparent hover:border-[#E5E5E5] hover:bg-white transition-all group cursor-pointer"
                title={`Click to copy: <Icon name="${ic.filename}" />`}
              >
                <div className="relative">
                  <Icon name={ic.filename} size={24} color="#141414" />
                  {copiedIcon === ic.filename && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#141414] text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">
                      Copiado!
                    </div>
                  )}
                </div>
                <span
                  className="text-[10px] text-center leading-tight max-w-full truncate"
                  style={{ color: '#6F6F6F' }}
                  title={ic.name}
                >
                  {ic.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-[#A3A3A3]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <p className="mt-3 text-[14px]">Nenhum ícone encontrado</p>
          <p className="text-[12px]">Tente outro termo de busca</p>
        </div>
      )}
    </div>
  )
}
