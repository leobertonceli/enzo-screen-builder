import { useState, useRef } from 'react'
import { NavBar }   from '../components/NavBar/NavBar'
import { Button }   from '../components/Button/Button'
import { ListItem } from '../components/ListItem/ListItem'
import { Chip }     from '../components/Chip/Chip'
import { Link }     from '../components/Link/Link'
import mfcFabiana  from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago    from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela  from '../assets/mfc/mfc-3-manuela.jpg'

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function MissingTag({ label }: { label: string }) {
  return (
    <div style={{
      position: 'absolute', top: 'var(--spacing-02)', right: 'var(--spacing-02)',
      backgroundColor: '#E53935', color: 'var(--color-gray-white)',
      fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)',
      fontWeight: 'var(--font-weight-medium)', padding: '2px 8px',
      borderRadius: 'var(--radius-pill)', zIndex: 10, lineHeight: '1.4',
    }}>{label}</div>
  )
}

// 24px Regular — page titles in flow screens (Rule C)
const titleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-content-primary)',
  margin: 0,
  lineHeight: '1.2',
}

// Small, regular, secondary — flow section labels (Rule E)
const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-content-secondary)',
  margin: 0,
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type Doctor = {
  id: string
  name: string
  specialty: string
  imageUrl: string
  nextSlot: string
  isMFC: boolean
}

// Sorted by date — first 3 go to carousel, rest to secondary list
const ALL_DOCTORS: Doctor[] = [
  { id: '1', name: 'Fabiana Moreira',  specialty: 'Médica de Família',  imageUrl: mfcFabiana, nextSlot: 'Seg, 16 Dez', isMFC: true  },
  { id: '2', name: 'Tiago Alves',      specialty: 'Cardiologista',      imageUrl: mfcTiago,   nextSlot: 'Ter, 17 Dez', isMFC: false },
  { id: '3', name: 'Manuela Costa',    specialty: 'Dermatologista',     imageUrl: mfcManuela, nextSlot: 'Qua, 18 Dez', isMFC: false },
  { id: '4', name: 'Ricardo Souza',    specialty: 'Neurologista',       imageUrl: mfcTiago,   nextSlot: 'Sex, 20 Dez', isMFC: false },
  { id: '5', name: 'Ana Paula Lima',   specialty: 'Psiquiatra',         imageUrl: mfcManuela, nextSlot: 'Seg, 23 Dez', isMFC: false },
  { id: '6', name: 'Carlos Mendes',    specialty: 'Ortopedista',        imageUrl: mfcTiago,   nextSlot: 'Ter, 24 Dez', isMFC: false },
  { id: '7', name: 'Beatriz Fonseca',  specialty: 'Endocrinologista',   imageUrl: mfcManuela, nextSlot: 'Qui, 26 Dez', isMFC: false },
  { id: '8', name: 'Pedro Henrique',   specialty: 'Reumatologista',     imageUrl: mfcTiago,   nextSlot: 'Seg, 6 Jan',  isMFC: false },
]
const CAROUSEL_DOCTORS = ALL_DOCTORS.slice(0, 3)
const MORE_DOCTORS      = ALL_DOCTORS.slice(3)

const DIAS     = ['Seg, 16', 'Ter, 17', 'Qua, 18', 'Qui, 19', 'Sex, 20', 'Seg, 23', 'Ter, 24', 'Qua, 25', 'Qui, 26']
const HORARIOS = ['8h', '8h40', '9h', '9h40', '10h', '14h', '14h40', '15h', '15h40']

// ---------------------------------------------------------------------------
// Carousel card — fora do DS (Rule M: date is the key info for this section)
// ---------------------------------------------------------------------------

function DoctorCarouselCard({ doctor, onSelect }: { doctor: Doctor; onSelect: () => void }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }} onClick={onSelect}>
      <div style={{
        width: 200,
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-stroke)',
        cursor: 'pointer',
        backgroundColor: 'var(--color-surface)',
        boxSizing: 'border-box',
        padding: 'var(--spacing-01)',  // 4px — image inset (CardMFC pattern)
      }}>

        {/* Photo — inset 4px, own border-radius */}
        <div style={{
          height: 136,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-gray-10)',
        }}>
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>

        {/* Text — space-between pushes date to bottom, identity floats top (CardMFC pattern) */}
        <div style={{
          padding: 'var(--spacing-04)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 120,
        }}>

          {/* Block 1: name (hero) + specialty (descriptor) — tight together */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-md)',
              fontWeight: 'var(--font-weight-medium)',
              lineHeight: 'var(--line-height-title)',
              color: 'var(--color-content-primary)',
              margin: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {doctor.name}
            </p>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              lineHeight: 'var(--line-height-title)',
              color: 'var(--color-content-secondary)',
              margin: 0,
            }}>
              {doctor.specialty}
            </p>
          </div>

          {/* Block 2: date — pinned to bottom, no icon, plain text */}
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            margin: 0,
          }}>
            {doctor.nextSlot}
          </p>

        </div>
      </div>
      <MissingTag label="DoctorCard — fora do DS" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 1 — Com quem quer consultar?
// ---------------------------------------------------------------------------

function StepMedico({ onSelect }: { onSelect: (d: Doctor) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" showTitle={false} rightIcons={0} onBack={() => {}} />

      <div className="flex-1 overflow-y-auto hide-scrollbar">

        {/* Title — intent-first (Rule M: step titles must reflect intent) */}
        <div style={{ padding: '0 var(--spacing-06)' }}>
          <h1 style={{ ...titleStyle, padding: 'var(--spacing-05) 0 var(--spacing-08)' }}>
            Com quem quer consultar?
          </h1>
        </div>

        {/* Section 1 — Carousel: "Médicos com datas próximas" */}
        <div style={{ marginBottom: 'var(--spacing-10)' }}>
          <p style={{ ...sectionLabel, padding: '0 var(--spacing-06)', marginBottom: 'var(--spacing-03)' }}>
            Médicos com datas próximas
          </p>
          {/* Carousel bleeds to right edge so 3rd card peeks */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-03)',
            paddingLeft: 'var(--spacing-06)',
            paddingRight: 'var(--spacing-06)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}>
            {CAROUSEL_DOCTORS.map(doc => (
              <DoctorCarouselCard key={doc.id} doctor={doc} onSelect={() => onSelect(doc)} />
            ))}
          </div>
        </div>

        {/* Section 2 — Secondary list with date on right (less visual weight) */}
        <div style={{ padding: '0 var(--spacing-06) var(--spacing-10)' }}>
          <p style={{ ...sectionLabel, marginBottom: 'var(--spacing-03)' }}>
            Mais especialistas
          </p>
          {MORE_DOCTORS.map((doc, i) => (
            <ListItem
              key={doc.id}
              title={doc.name}
              description={doc.specialty}
              size="small"
              leftSide="image"
              imageSrc={doc.imageUrl}
              rightAsset="text-icon"
              rightText={doc.nextSlot}
              fullWidth={false}
              divider={i < MORE_DOCTORS.length - 1}
              onClick={() => onSelect(doc)}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 2 — Quando?
// ---------------------------------------------------------------------------

function StepHorario({
  doctor,
  onBack,
  onClose: _onClose,
  onConfirm,
}: {
  doctor: Doctor
  onBack: () => void
  onClose: () => void
  onConfirm: (tipo: string, dia: string, horario: string) => void
}) {
  const [tipo,    setTipo]    = useState<string | null>(null)
  const [dia,     setDia]     = useState<string | null>(null)
  const [horario, setHorario] = useState<string | null>(null)
  const canConfirm = !!tipo && !!dia && !!horario

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Back only — one navigation action per step (Rule J) */}
      <NavBar type="page" showTitle={false} rightIcons={0} onBack={onBack} />

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div style={{ padding: '0 var(--spacing-06)', display: 'flex', flexDirection: 'column' }}>

          <h1 style={{ ...titleStyle, padding: 'var(--spacing-05) 0 var(--spacing-06)' }}>
            Quando?
          </h1>

          {/* Doctor context — simple card, image right, title + description (Rule D) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-04)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)',
            marginBottom: 'var(--spacing-08)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', minWidth: 0 }}>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                lineHeight: 'var(--line-height-title)',
                color: 'var(--color-content-primary)',
                margin: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {doctor.name}
              </p>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 'var(--line-height-title)',
                color: 'var(--color-content-secondary)',
                margin: 0,
              }}>
                {doctor.specialty}
              </p>
            </div>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              flexShrink: 0,
              marginLeft: 'var(--spacing-04)',
              backgroundColor: 'var(--color-gray-10)',
            }}>
              <img src={doctor.imageUrl} alt={doctor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
            </div>
          </div>

          {/* Tipo de atendimento */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', marginBottom: 'var(--spacing-06)' }}>
            <p style={sectionLabel}>Tipo de atendimento</p>
            <div style={{ display: 'flex', gap: 'var(--spacing-02)' }}>
              {['Online', 'Presencial'].map(t => (
                <Chip key={t} label={t} size="small"
                  state={tipo === t ? 'selected' : 'idle'}
                  onClick={() => setTipo(t)} />
              ))}
            </div>
          </div>

          {/* Dia — 3-column grid (matches Figma scheduling reference exactly) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', marginBottom: 'var(--spacing-06)' }}>
            <p style={sectionLabel}>Dia</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-02)' }}>
              {DIAS.map(d => (
                <Chip key={d} label={d} size="small"
                  state={dia === d ? 'selected' : 'idle'}
                  onClick={() => setDia(d)} />
              ))}
            </div>
          </div>

          {/* Horário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', marginBottom: 'var(--spacing-06)' }}>
            <p style={sectionLabel}>Horário</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-02)' }}>
              {HORARIOS.map(h => (
                <Chip key={h} label={h} size="small"
                  state={horario === h ? 'selected' : 'idle'}
                  onClick={() => setHorario(h)} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* CTA — outside scroll, always visible (Rule K) */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        <Button
          label="Confirmar horário"
          style="primary"
          size="large"
          state={canConfirm ? 'enabled' : 'disabled'}
          className="w-full"
          onClick={() => canConfirm && onConfirm(tipo!, dia!, horario!)}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Step 3 — Confirmação
// ---------------------------------------------------------------------------

function StepConfirmacao({
  doctor, tipo, dia, horario, onClose,
}: {
  doctor: Doctor; tipo: string; dia: string; horario: string; onClose: () => void
}) {
  const DETAILS = [
    { label: 'Tipo de atendimento', value: tipo },
    { label: 'Médico',              value: doctor.name },
    { label: 'Especialidade',       value: doctor.specialty },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Back only — confirmation step, one nav action (Rule J) */}
      <NavBar type="page" showTitle={false} rightIcons={0} onBack={onClose} />

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div style={{ padding: '0 var(--spacing-06) var(--spacing-10)' }}>

          {/* Celebration title */}
          <h1 style={{ ...titleStyle, padding: 'var(--spacing-05) 0 var(--spacing-02)' }}>
            Excelente escolha,{' '}
            <br />
            <span style={{ color: 'var(--color-brand)' }}>Leonardo.</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-family-label)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-secondary)',
            margin: '0 0 var(--spacing-08)',
            lineHeight: '1.5',
          }}>
            {doctor.name} vai estar ao seu lado em cada etapa da sua jornada aqui na Alice.
          </p>

          {/* Confirmation card — photo absolute top-right (Figma ref 1807-2070) */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)',
            overflow: 'hidden',
          }}>

            {/* Photo — absolute top-right corner */}
            <div style={{
              position: 'absolute',
              top: 'var(--spacing-04)',
              right: 'var(--spacing-04)',
              width: 52,
              height: 52,
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              backgroundColor: 'var(--color-gray-10)',
              flexShrink: 0,
            }}>
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>

            {/* Card header — label + large date/time (right side reserved for photo) */}
            <div style={{
              padding: 'var(--spacing-04)',
              paddingRight: 'calc(52px + var(--spacing-06) + var(--spacing-04))',
              paddingBottom: 'var(--spacing-04)',
              borderBottom: '1px solid var(--color-divider)',
            }}>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-brand)',
                margin: '0 0 var(--spacing-01)',
                lineHeight: 'var(--line-height-title)',
              }}>
                Primeira consulta
              </p>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-content-primary)',
                margin: 0,
                lineHeight: 'var(--line-height-title)',
              }}>
                {dia} às {horario}
              </p>
            </div>

            {/* Details list — one row per appointment attribute */}
            {DETAILS.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--spacing-01)',
                  padding: 'var(--spacing-03) var(--spacing-04)',
                  borderBottom: i < DETAILS.length - 1 ? '1px solid var(--color-divider)' : undefined,
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'var(--color-content-secondary)',
                  margin: 0,
                  lineHeight: 'var(--line-height-title)',
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-content-primary)',
                  margin: 0,
                  lineHeight: 'var(--line-height-title)',
                }}>
                  {item.value}
                </p>
              </div>
            ))}

            {/* Reagendar link */}
            <div style={{ padding: 'var(--spacing-03) var(--spacing-04) var(--spacing-04)' }}>
              <Link label="Reagendar" size="small" context="on-light" icon="none" />
            </div>

          </div>

        </div>
      </div>

      {/* CTA — always indicate the next step, even if it's just closing (Rule Q) */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        <Button
          label="Ok, obrigado"
          style="primary"
          size="large"
          state="enabled"
          className="w-full"
          onClick={onClose}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// CSS keyframes — exit fades out first, enter fades in after ("barriga")
// ---------------------------------------------------------------------------

const EXIT_MS  = 260
const ENTER_MS = 680

const STEP_STYLES = `@keyframes stepOut{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-10px)}}@keyframes stepIn{0%{opacity:0;transform:translateY(64px)}100%{opacity:1;transform:translateY(0)}}@keyframes stepInBack{0%{opacity:0;transform:translateY(-48px)}100%{opacity:1;transform:translateY(0)}}`

// ---------------------------------------------------------------------------
// Root orchestrator
// ---------------------------------------------------------------------------

export function AgendamentoFlowScreen() {
  const [displayedStep, setDisplayedStep] = useState<1 | 2 | 3>(1)
  const [phase,         setPhase]         = useState<'enter' | 'exit'>('enter')
  const [direction,     setDirection]     = useState<'forward' | 'back'>('forward')
  const [doctor,        setDoctor]        = useState<Doctor | null>(null)
  const [tipo,          setTipo]          = useState('')
  const [dia,           setDia]           = useState('')
  const [horario,       setHorario]       = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = (to: 1 | 2 | 3, dir: 'forward' | 'back') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setDirection(dir)
    setPhase('exit')                        // 1. current screen fades out
    timerRef.current = setTimeout(() => {
      if (to === 1) { setDoctor(null); setTipo(''); setDia(''); setHorario('') }
      setDisplayedStep(to)
      setPhase('enter')                     // 2. new screen fades in
    }, EXIT_MS)
  }

  // animation per phase/direction
  const anim = phase === 'exit'
    ? `stepOut ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both`
    : direction === 'forward'
      ? `stepIn ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`
      : `stepInBack ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`

  return (
    <>
      <style>{STEP_STYLES}</style>
      <div style={{
        width: 375,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--color-surface)',
        fontFamily: 'var(--font-family-base)',
      }}>
        {/* key changes only on step swap — triggers enter animation remount */}
        <div
          key={`${displayedStep}-${phase}`}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', animation: anim }}
        >
          {displayedStep === 1 && (
            <StepMedico onSelect={d => { setDoctor(d); go(2, 'forward') }} />
          )}
          {displayedStep === 2 && doctor && (
            <StepHorario
              doctor={doctor}
              onBack={() => go(1, 'back')}
              onClose={() => go(1, 'back')}
              onConfirm={(t, d, h) => { setTipo(t); setDia(d); setHorario(h); go(3, 'forward') }}
            />
          )}
          {displayedStep === 3 && doctor && (
            <StepConfirmacao
              doctor={doctor}
              tipo={tipo}
              dia={dia}
              horario={horario}
              onClose={() => go(1, 'back')}
            />
          )}
        </div>
      </div>
    </>
  )
}
