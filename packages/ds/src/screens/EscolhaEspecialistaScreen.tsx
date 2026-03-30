import { useState, useEffect } from 'react'
import { NavBar }   from '../components/NavBar/NavBar'
import { ListItem } from '../components/ListItem/ListItem'
import { Chip }     from '../components/Chip/Chip'
import { Callout }  from '../components/Callout/Callout'
import { Button }   from '../components/Button/Button'
import { Icon }     from '../icons/Icon'
import mfcFabiana   from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago     from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela   from '../assets/mfc/mfc-3-manuela.jpg'

// ─── Types ────────────────────────────────────────────────────────────────────

type ScreenState = 'loading' | 'loaded' | 'empty' | 'error'
type Modality    = 'Online' | 'Presencial' | 'Online e presencial'
type ModalFilter = 'Todos' | 'Online' | 'Presencial'

type Specialist = {
  id: string
  name: string
  specialty: string
  modality: Modality
  nextSlot: string
  imageUrl: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPECIALISTS: Specialist[] = [
  { id: '1', name: 'Beatriz Santos',  specialty: 'Dermatologista',        modality: 'Online',             nextSlot: 'Seg, 23 Dez', imageUrl: mfcManuela },
  { id: '2', name: 'Ricardo Alves',   specialty: 'Dermatologia Estética', modality: 'Presencial',         nextSlot: 'Ter, 24 Dez', imageUrl: mfcTiago   },
  { id: '3', name: 'Mariana Costa',   specialty: 'Dermatologista',        modality: 'Online e presencial',nextSlot: 'Qua, 25 Dez', imageUrl: mfcFabiana },
  { id: '4', name: 'Fernanda Lima',   specialty: 'Dermatologista',        modality: 'Presencial',         nextSlot: 'Sex, 27 Dez', imageUrl: mfcManuela },
  { id: '5', name: 'Carlos Mendes',   specialty: 'Dermatologia Clínica',  modality: 'Online',             nextSlot: 'Seg, 6 Jan',  imageUrl: mfcTiago   },
]

const MODAL_FILTERS: ModalFilter[] = ['Todos', 'Online', 'Presencial']

// ─── Helpers ──────────────────────────────────────────────────────────────────

function applyFilter(list: Specialist[], f: ModalFilter): Specialist[] {
  if (f === 'Todos')      return list
  if (f === 'Online')     return list.filter(s => s.modality !== 'Presencial')
  if (f === 'Presencial') return list.filter(s => s.modality !== 'Online')
  return list
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
        <div style={{ height: 16, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '55%' }} />
        <div style={{ height: 14, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '35%' }} />
      </div>
      <div style={{ width: 40, height: 14, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)' }} />
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyView({ onClear }: { onClear: () => void }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 'var(--spacing-10) var(--spacing-06)',
      gap: 'var(--spacing-04)',
      textAlign: 'center',
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
          Não há dermatologistas disponíveis com o filtro selecionado.
        </p>
      </div>
      <Button
        label="Ver todos os especialistas"
        style="secondary"
        size="medium"
        onClick={onClear}
      />
    </div>
  )
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function EscolhaEspecialistaScreen() {
  const [viewState, setViewState]   = useState<ScreenState>('loading')
  const [filter,    setFilter]      = useState<ModalFilter>('Todos')
  const [selected,  setSelected]    = useState<string | null>(null)

  // Simulate async load on mount
  useEffect(() => {
    if (viewState !== 'loading') return
    const t = setTimeout(() => setViewState('loaded'), 1500)
    return () => clearTimeout(t)
  }, [viewState])

  const visible = applyFilter(SPECIALISTS, filter)
  const isEmpty  = viewState === 'loaded' && visible.length === 0

  return (
    <div style={{
      width: 375, height: 812,
      backgroundColor: 'var(--color-surface)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
    }}>

      {/* Navigation */}
      <NavBar type="page" showTitle={false} rightIcons={0} onBack={() => {}} />

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
        {(['loading', 'loaded', 'empty', 'error'] as ScreenState[]).map(s => (
          <div key={s} style={{ flexShrink: 0 }}>
            <Chip
              label={s}
              size="small"
              state={viewState === s ? 'selected' : 'idle'}
              onClick={() => {
                setViewState(s)
                if (s === 'loading') setTimeout(() => setViewState('loaded'), 1500)
              }}
            />
          </div>
        ))}
      </div>

      {/* Loading */}
      {viewState === 'loading' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Title skeleton */}
          <div style={{ padding: 'var(--spacing-06) var(--spacing-06) var(--spacing-05)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
            <div style={{ height: 18, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '50%' }} />
            <div style={{ height: 14, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '70%' }} />
          </div>
          {/* Filter skeleton */}
          <div style={{ padding: '0 var(--spacing-06) var(--spacing-05)', display: 'flex', gap: 'var(--spacing-02)' }}>
            {[56, 72, 64].map((w, i) => (
              <div key={i} style={{ width: w, height: 32, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-surface-subtle)' }} />
            ))}
          </div>
          {/* Row skeletons */}
          {[0, 1, 2, 3].map(i => <SkeletonRow key={i} />)}
        </div>
      )}

      {/* Error */}
      {viewState === 'error' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--spacing-06)', gap: 'var(--spacing-06)' }}>
          <h1 style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            margin: 0,
          }}>
            Com quem quer consultar?
          </h1>
          <Callout
            status="Alert"
            title="Não foi possível carregar"
            description="Tivemos um problema ao buscar os especialistas. Verifique sua conexão e tente novamente."
            showLink
            linkLabel="Tentar novamente"
            width="100%"
            onChange={(key) => {
              if (key === 'link') {
                setViewState('loading')
              }
            }}
          />
        </div>
      )}

      {/* Loaded + Empty */}
      {(viewState === 'loaded' || isEmpty) && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ padding: 'var(--spacing-06) var(--spacing-06) var(--spacing-05)' }}>
            <h1 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-primary)',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Com quem quer consultar?
            </h1>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              margin: 'var(--spacing-01) 0 0',
            }}>
              {isEmpty
                ? 'Nenhum especialista com esse filtro'
                : `${visible.length} dermatologistas disponíveis`}
            </p>
          </div>

          {/* Modality filter */}
          <div style={{
            display: 'flex', gap: 'var(--spacing-02)',
            padding: '0 var(--spacing-06) var(--spacing-05)',
            overflowX: 'auto', scrollbarWidth: 'none',
          }}>
            {MODAL_FILTERS.map(f => (
              <div key={f} style={{ flexShrink: 0 }}>
                <Chip
                  label={f}
                  size="small"
                  state={filter === f ? 'selected' : 'idle'}
                  onClick={() => setFilter(f)}
                />
              </div>
            ))}
          </div>

          {/* Empty state */}
          {isEmpty ? (
            <EmptyView onClear={() => setFilter('Todos')} />
          ) : (
            /* Specialist list */
            <div className="flex-1 overflow-y-auto hide-scrollbar">
              {visible.map((s, i) => (
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
                  divider={i < visible.length - 1}
                  onClick={() => setSelected(s.id)}
                  state={selected === s.id ? 'pressed' : 'default'}
                />
              ))}
            </div>
          )}

          {/* CTA — outside scroll, always visible */}
          <div style={{
            padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
            borderTop: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)',
            flexShrink: 0,
          }}>
            <Button
              label="Confirmar especialista"
              style="primary"
              size="large"
              state={selected ? 'enabled' : 'disabled'}
              className="w-full"
            />
          </div>

        </div>
      )}

    </div>
  )
}
