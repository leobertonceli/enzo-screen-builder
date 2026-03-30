import { useState, useMemo, useEffect } from 'react'
import { NavBar }   from '../components/NavBar/NavBar'
import { ListItem } from '../components/ListItem/ListItem'
import { Chip }     from '../components/Chip/Chip'
import { Button }   from '../components/Button/Button'
import { Icon }     from '../icons/Icon'
import mfcFabiana   from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago     from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela   from '../assets/mfc/mfc-3-manuela.jpg'

// ─── Types ────────────────────────────────────────────────────────────────────

type SearchState  = 'empty' | 'loading' | 'results' | 'no-results'
type ModalFilter  = 'Todos' | 'Online' | 'Presencial'
type Modality     = 'Online' | 'Presencial' | 'Online e presencial'

type Specialist = {
  id: string
  name: string
  specialty: string
  modality: Modality
  nextSlot: string
  imageUrl: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const ALL_SPECIALISTS: Specialist[] = [
  { id: '1', name: 'Dra. Isabella Moreira',  specialty: 'Clínico geral',    modality: 'Online e presencial', nextSlot: 'Hoje, 14h',   imageUrl: mfcFabiana },
  { id: '2', name: 'Dr. Carlos Mendes',       specialty: 'Cardiologia',      modality: 'Online',              nextSlot: 'Amanhã, 9h',  imageUrl: mfcTiago   },
  { id: '3', name: 'Dra. Ana Beatriz Costa',  specialty: 'Dermatologia',     modality: 'Online e presencial', nextSlot: 'Qui, 10h',    imageUrl: mfcManuela },
  { id: '4', name: 'Dr. Pedro Alvares',       specialty: 'Ortopedia',        modality: 'Presencial',          nextSlot: 'Sex, 15h',    imageUrl: mfcTiago   },
  { id: '5', name: 'Dra. Beatriz Santos',     specialty: 'Dermatologia',     modality: 'Online',              nextSlot: 'Seg, 11h',    imageUrl: mfcManuela },
  { id: '6', name: 'Dr. Ricardo Alves',       specialty: 'Neurologia',       modality: 'Presencial',          nextSlot: 'Ter, 16h',    imageUrl: mfcTiago   },
  { id: '7', name: 'Dra. Mariana Costa',      specialty: 'Clínico geral',    modality: 'Online',              nextSlot: 'Qua, 8h',     imageUrl: mfcFabiana },
  { id: '8', name: 'Dr. Fernando Lima',       specialty: 'Gastroenterologia',modality: 'Online e presencial', nextSlot: 'Qui, 14h',    imageUrl: mfcTiago   },
]

const RECENT_SPECIALISTS: Specialist[] = [
  { id: '1', name: 'Dra. Isabella Moreira', specialty: 'Clínico geral · Última consulta: 04/03',    modality: 'Online e presencial', nextSlot: '', imageUrl: mfcFabiana },
  { id: '4', name: 'Dr. Pedro Alvares',      specialty: 'Ortopedia · Última consulta: 12/02',        modality: 'Presencial',          nextSlot: '', imageUrl: mfcTiago   },
]

const SPECIALTIES = [
  { icon: 'stethoscope',          label: 'Clínico geral'    },
  { icon: 'heart-pulse',          label: 'Cardiologia'      },
  { icon: 'brain',                label: 'Neurologia'       },
  { icon: 'bone',                 label: 'Ortopedia'        },
  { icon: 'eye-outline',          label: 'Oftalmologia'     },
  { icon: 'weather-sunny',        label: 'Dermatologia'     },
  { icon: 'lungs',                label: 'Pneumologia'      },
  { icon: 'stomach',              label: 'Gastroenterologia'},
]

const MODAL_FILTERS: ModalFilter[] = ['Todos', 'Online', 'Presencial']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function filterByModality(list: Specialist[], f: ModalFilter): Specialist[] {
  if (f === 'Todos')      return list
  if (f === 'Online')     return list.filter(s => s.modality !== 'Presencial')
  if (f === 'Presencial') return list.filter(s => s.modality !== 'Online')
  return list
}

function filterByQuery(list: Specialist[], query: string): Specialist[] {
  const q = query.toLowerCase()
  return list.filter(s =>
    s.name.toLowerCase().includes(q) || s.specialty.toLowerCase().includes(q)
  )
}

// ─── Specialty card ───────────────────────────────────────────────────────────

function SpecialtyCard({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-02)',
        padding: 'var(--spacing-04) var(--spacing-03)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)',
        cursor: 'pointer',
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{
        width: 40, height: 40,
        borderRadius: 'var(--radius-xs)',
        backgroundColor: 'var(--color-brand-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={20} color="var(--color-brand)" />
      </div>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-content-primary)',
        textAlign: 'center',
        lineHeight: 'var(--line-height-title-sm)',
      }}>
        {label}
      </span>
    </button>
  )
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      gap: 'var(--spacing-03)',
      padding: 'var(--spacing-05) var(--spacing-06)',
      borderBottom: '1px solid var(--color-divider)',
    }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-surface-subtle)', flexShrink: 0 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 14, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '60%' }} />
        <div style={{ height: 12, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '40%' }} />
      </div>
      <div style={{ width: 52, height: 12, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)' }} />
    </div>
  )
}

// ─── Section title ────────────────────────────────────────────────────────────

function SectionTitle({ label }: { label: string }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-sm)',
      fontWeight: 'var(--font-weight-medium)',
      color: 'var(--color-content-primary)',
      margin: 0,
    }}>
      {label}
    </h2>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function BuscaEspecialistasScreen() {
  const [searchState,  setSearchState]  = useState<SearchState>('empty')
  const [query,        setQuery]        = useState('')
  const [modalFilter,  setModalFilter]  = useState<ModalFilter>('Todos')
  const [selected,     setSelected]     = useState<string | null>(null)

  // Simulate async search when state = loading
  useEffect(() => {
    if (searchState !== 'loading') return
    const t = setTimeout(() => {
      const results = filterByQuery(ALL_SPECIALISTS, query)
      setSearchState(results.length > 0 ? 'results' : 'no-results')
    }, 900)
    return () => clearTimeout(t)
  }, [searchState, query])

  const filteredResults = useMemo(() => {
    if (searchState !== 'results') return []
    return filterByModality(filterByQuery(ALL_SPECIALISTS, query), modalFilter)
  }, [searchState, query, modalFilter])

  function handleSpecialtyClick(label: string) {
    setQuery(label)
    setModalFilter('Todos')
    setSearchState('loading')
    setSelected(null)
  }

  function handleClearSearch() {
    setQuery('')
    setModalFilter('Todos')
    setSearchState('empty')
    setSelected(null)
  }

  return (
    <div style={{
      width: 375, height: 812,
      backgroundColor: 'var(--color-surface)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
    }}>

      {/* Navigation */}
      <NavBar type="page" title="Buscar especialista" rightIcons={0} onBack={() => {}} />

      {/* Demo state switcher */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 'var(--spacing-02)',
        padding: 'var(--spacing-02) var(--spacing-06)',
        backgroundColor: 'var(--color-surface-subtle)',
        borderBottom: '1px solid var(--color-stroke)',
        overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-content-tertiary)',
          margin: 0, flexShrink: 0,
          fontWeight: 'var(--font-weight-regular)',
        }}>
          Estado:
        </p>
        {(['empty', 'loading', 'results', 'no-results'] as SearchState[]).map(s => (
          <div key={s} style={{ flexShrink: 0 }}>
            <Chip
              label={s}
              size="small"
              state={searchState === s ? 'selected' : 'idle'}
              onClick={() => {
                setSearchState(s)
                setSelected(null)
                if (s !== 'empty') setQuery('dermatologia')
                else setQuery('')
                setModalFilter('Todos')
              }}
            />
          </div>
        ))}
      </div>

      {/* Search input */}
      <div style={{ padding: 'var(--spacing-04) var(--spacing-06) 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 'var(--spacing-02)',
          height: 48,
          paddingLeft: 'var(--spacing-04)',
          paddingRight: 'var(--spacing-02)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-stroke)',
          backgroundColor: 'var(--color-surface)',
        }}>
          <Icon name="magnify" size={20} color="var(--color-content-secondary)" />
          <span style={{
            flex: 1,
            fontFamily: 'var(--font-family-label)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-regular)',
            color: query ? 'var(--color-content-primary)' : 'var(--color-content-tertiary)',
          }}>
            {query || 'Buscar médico ou especialidade'}
          </span>
          {query && (
            <button
              onClick={handleClearSearch}
              style={{
                border: 'none', background: 'none',
                cursor: 'pointer', padding: 'var(--spacing-02)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icon name="close-circle" size={18} color="var(--color-content-tertiary)" />
            </button>
          )}
        </div>
      </div>

      {/* ── LOADING ── */}
      {searchState === 'loading' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: 'var(--spacing-04)' }}>
          {/* Filter skeleton */}
          <div style={{ padding: 'var(--spacing-02) var(--spacing-06) var(--spacing-04)', display: 'flex', gap: 'var(--spacing-02)' }}>
            {[56, 72, 88].map((w, i) => (
              <div key={i} style={{ width: w, height: 32, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-surface-subtle)' }} />
            ))}
          </div>
          {[0, 1, 2, 3, 4].map(i => <SkeletonRow key={i} />)}
        </div>
      )}

      {/* ── EMPTY (default, no query) ── */}
      {searchState === 'empty' && (
        <div className="flex-1 overflow-y-auto hide-scrollbar" style={{ paddingTop: 'var(--spacing-06)' }}>

          {/* Specialties section */}
          <div style={{ paddingLeft: 'var(--spacing-06)', paddingRight: 'var(--spacing-06)', marginBottom: 'var(--spacing-04)' }}>
            <SectionTitle label="Especialidades" />
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 'var(--spacing-02)',
            padding: '0 var(--spacing-06)',
          }}>
            {SPECIALTIES.map(s => (
              <SpecialtyCard
                key={s.label}
                icon={s.icon}
                label={s.label}
                onClick={() => handleSpecialtyClick(s.label)}
              />
            ))}
          </div>

          {/* Recent section */}
          <div style={{
            paddingLeft: 'var(--spacing-06)',
            paddingRight: 'var(--spacing-06)',
            marginTop: 'var(--spacing-08)',
            marginBottom: 'var(--spacing-04)',
          }}>
            <SectionTitle label="Vistos recentemente" />
          </div>
          {RECENT_SPECIALISTS.map((s, i) => (
            <ListItem
              key={s.id}
              title={s.name}
              description={s.specialty}
              size="small"
              leftSide="image"
              imageSrc={s.imageUrl}
              rightAsset="icon"
              fullWidth
              divider={i < RECENT_SPECIALISTS.length - 1}
              onClick={() => handleSpecialtyClick(s.name)}
            />
          ))}

          <div style={{ height: 'var(--spacing-10)' }} />
        </div>
      )}

      {/* ── RESULTS ── */}
      {searchState === 'results' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Modality filter + count */}
          <div style={{ padding: 'var(--spacing-04) var(--spacing-06) 0' }}>
            <div style={{
              display: 'flex', gap: 'var(--spacing-02)',
              overflowX: 'auto', scrollbarWidth: 'none',
              paddingBottom: 'var(--spacing-03)',
            }}>
              {MODAL_FILTERS.map(f => (
                <div key={f} style={{ flexShrink: 0 }}>
                  <Chip
                    label={f}
                    size="small"
                    state={modalFilter === f ? 'selected' : 'idle'}
                    onClick={() => setModalFilter(f)}
                  />
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-tertiary)',
              margin: '0 0 var(--spacing-02)',
            }}>
              {filteredResults.length === 0
                ? 'Nenhum resultado com esse filtro'
                : `${filteredResults.length} especialista${filteredResults.length > 1 ? 's' : ''} encontrado${filteredResults.length > 1 ? 's' : ''}`}
            </p>
          </div>

          {/* List or inline empty */}
          {filteredResults.length === 0 ? (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: 'var(--spacing-08) var(--spacing-06)',
              gap: 'var(--spacing-03)', textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-content-primary)',
                margin: 0,
              }}>
                Nenhum resultado para este filtro
              </p>
              <Button
                label="Ver todos"
                style="secondary"
                size="medium"
                onClick={() => setModalFilter('Todos')}
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {filteredResults.map((s, i) => (
                <ListItem
                  key={s.id}
                  title={s.name}
                  description={`${s.specialty} · ${s.modality}`}
                  size="small"
                  leftSide="image"
                  imageSrc={s.imageUrl}
                  rightAsset="text-icon"
                  rightText={s.nextSlot}
                  fullWidth
                  divider={i < filteredResults.length - 1}
                  onClick={() => setSelected(s.id)}
                  state={selected === s.id ? 'pressed' : 'default'}
                />
              ))}
            </div>
          )}

          {/* CTA — fora do scroll */}
          {filteredResults.length > 0 && (
            <div style={{
              padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
              borderTop: '1px solid var(--color-stroke)',
              backgroundColor: 'var(--color-surface)',
              flexShrink: 0,
            }}>
              <Button
                label="Ver perfil do especialista"
                style="primary"
                size="large"
                state={selected ? 'enabled' : 'disabled'}
                className="w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* ── NO RESULTS ── */}
      {searchState === 'no-results' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 'var(--spacing-10) var(--spacing-06)',
          gap: 'var(--spacing-04)', textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: 'var(--radius-pill)',
            backgroundColor: 'var(--color-surface-subtle)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="doctor" size={32} color="var(--color-content-secondary)" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: 0,
            }}>
              Nenhum especialista encontrado
            </p>
            <p style={{
              fontFamily: 'var(--font-family-label)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              Não encontramos resultados para{' '}
              <span style={{ fontWeight: 'var(--font-weight-medium)' as React.CSSProperties['fontWeight'], color: 'var(--color-content-primary)' }}>
                "{query}"
              </span>
              . Tente buscar por outra especialidade ou nome do médico.
            </p>
          </div>
          <Button
            label="Limpar busca"
            style="secondary"
            size="medium"
            onClick={handleClearSearch}
          />
        </div>
      )}

    </div>
  )
}
