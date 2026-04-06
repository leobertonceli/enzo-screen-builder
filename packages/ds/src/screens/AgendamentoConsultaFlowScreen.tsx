import { useState, useRef, type CSSProperties } from 'react'
import { NavBar }    from '../components/NavBar/NavBar'
import { Button }    from '../components/Button/Button'
import { Chip }      from '../components/Chip/Chip'
import { ListItem }  from '../components/ListItem/ListItem'
import { CardMFC }   from '../components/CardMFC/CardMFC'
import { TextField } from '../components/TextField/TextField'
import { Icon }      from '../icons/Icon'
import { ICON_SIZE } from '../icons/iconSize'
import mfcFabiana   from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago     from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela   from '../assets/mfc/mfc-3-manuela.jpg'

// ─── Motion constants ─────────────────────────────────────────────────────────

const EXIT_MS  = 280
const ENTER_MS = 500

const MOTION_STYLES = `
  @keyframes stepIn {
    from { opacity: 0; transform: translateY(64px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes stepInBack {
    from { opacity: 0; transform: translateY(-48px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes stepOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-10px); }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

let motionStylesInjected = false
function injectMotionStyles() {
  if (motionStylesInjected) return
  motionStylesInjected = true
  const el = document.createElement('style')
  el.textContent = MOTION_STYLES
  document.head.appendChild(el)
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Step      = 1 | 2 | 3 | 4
type Phase     = 'enter' | 'exit'
type Direction = 'forward' | 'back'

interface Doctor {
  name: string
  description: string
  rating: string
  distance: string
  modality: string
  imageUrl: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Specialty {
  label: string
  icon: string
}

const SPECIALTIES: Specialty[] = [
  { label: 'Clínico Geral',  icon: 'stethoscope' },
  { label: 'Cardiologia',    icon: 'heartFilled'  },
  { label: 'Dermatologia',   icon: 'day'          },
  { label: 'Ortopedia',      icon: 'bodyOutlined' },
  { label: 'Psicologia',     icon: 'mindfulness'  },
  { label: 'Ginecologia',    icon: 'baby'         },
]

const DOCTORS: Doctor[] = [
  {
    name: 'Dra. Ana Lima',
    description: 'Formada pela USP, com 8 anos de experiência.',
    rating: '4.9',
    distance: '1.2 km',
    modality: 'Online e presencial',
    imageUrl: mfcFabiana,
  },
  {
    name: 'Dr. Pedro Costa',
    description: 'Médico de família vinculado ao seu plano Alice.',
    rating: '4.7',
    distance: '3.0 km',
    modality: 'Presencial',
    imageUrl: mfcTiago,
  },
  {
    name: 'Dra. Mariana Souza',
    description: 'Médica com foco em atenção primária.',
    rating: '4.8',
    distance: '0.8 km',
    modality: 'Online',
    imageUrl: mfcManuela,
  },
]

const DATE_CHIPS = ['Hoje', 'Ter 22', 'Qua 23', 'Qui 24', 'Sex 25']
const TIME_CHIPS = ['08:00', '09:30', '10:00', '11:00', '14:00', '15:30', '16:00', '17:30']

const sectionLabel: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  color: 'var(--color-content-secondary)',
  margin: 0,
}

// ─── Root component ───────────────────────────────────────────────────────────

export function AgendamentoConsultaFlowScreen() {
  injectMotionStyles()

  const [displayedStep, setDisplayedStep] = useState<Step>(1)
  const [phase, setPhase]                 = useState<Phase>('enter')
  const [direction, setDirection]         = useState<Direction>('forward')

  // Step state
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedDoctor,    setSelectedDoctor]    = useState<Doctor | null>(null)
  const [selectedDate,      setSelectedDate]      = useState<string | null>(null)
  const [selectedTime,      setSelectedTime]      = useState<string | null>(null)
  const [searchQuery,       setSearchQuery]       = useState('')

  const pendingStep = useRef<Step | null>(null)

  function go(toStep: Step, dir: Direction) {
    if (phase === 'exit') return
    pendingStep.current = toStep
    setDirection(dir)
    setPhase('exit')
    setTimeout(() => {
      setDisplayedStep(pendingStep.current!)
      setPhase('enter')
    }, EXIT_MS)
  }

  function goForward(toStep: Step) { go(toStep, 'forward') }
  function goBack(toStep: Step)    { go(toStep, 'back')    }

  function resetFlow() {
    setSelectedSpecialty(null)
    setSelectedDoctor(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setSearchQuery('')
    go(1, 'back')
  }

  // Step wrapper animation
  const isExit = phase === 'exit'
  const stepAnimation = isExit
    ? `stepOut ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both`
    : direction === 'forward'
    ? `stepIn ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`
    : `stepInBack ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`

  const stepWrapperStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    animation: stepAnimation,
  }

  const filteredSpecialties = SPECIALTIES.filter(s =>
    s.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{
      width: 375,
      height: 812,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--color-surface)',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div key={`${displayedStep}-${phase}`} style={stepWrapperStyle}>
        {displayedStep === 1 && (
          <Step1Especialidade
            searchQuery={searchQuery}
            onSearchChange={(q) => { setSearchQuery(q) }}
            specialties={filteredSpecialties}
            onSelect={(specialty) => {
              setSelectedSpecialty(specialty)
              goForward(2)
            }}
          />
        )}
        {displayedStep === 2 && (
          <Step2Medico
            specialty={selectedSpecialty ?? ''}
            doctors={DOCTORS}
            onBack={() => goBack(1)}
            onSelect={(doctor) => {
              setSelectedDoctor(doctor)
              goForward(3)
            }}
          />
        )}
        {displayedStep === 3 && (
          <Step3DataHorario
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={(d) => { setSelectedDate(d); setSelectedTime(null) }}
            onTimeSelect={setSelectedTime}
            onBack={() => goBack(2)}
            onNext={() => goForward(4)}
          />
        )}
        {displayedStep === 4 && (
          <Step4Confirmacao
            doctor={selectedDoctor}
            specialty={selectedSpecialty ?? ''}
            date={selectedDate ?? ''}
            time={selectedTime ?? ''}
            onReset={resetFlow}
          />
        )}
      </div>
    </div>
  )
}

// ─── Step 1: Especialidade ────────────────────────────────────────────────────

function Step1Especialidade({
  searchQuery: _searchQuery,
  onSearchChange,
  specialties,
  onSelect,
}: {
  searchQuery: string
  onSearchChange: (q: string) => void
  specialties: Specialty[]
  onSelect: (label: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        showTitle={false}
        iconLeft={false}
        rightIcons={1}
        rightIcon1="close"
        rightIcon1Size={20}
        onRightIcon1={() => {}}
      />

      <div style={{ padding: '0 var(--spacing-06) var(--spacing-05)' }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
          color: 'var(--color-content-primary)',
          margin: '0 0 var(--spacing-05)',
          lineHeight: 'var(--line-height-title)',
        }}>
          Com quem quer consultar?
        </h1>
        <TextField
          label="Buscar especialidade"
          leftIcon="search"
          width="100%"
          onValueChange={onSearchChange}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {specialties.map((s, i) => (
          <ListItem
            key={s.label}
            title={s.label}
            size="large"
            leftSide="icon"
            icon={<Icon name={s.icon} size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
            rightAsset="icon"
            divider={i < specialties.length - 1}
            onClick={() => onSelect(s.label)}
          />
        ))}
        {specialties.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-03)',
            padding: 'var(--spacing-10) var(--spacing-06)',
          }}>
            <Icon name="search" size={ICON_SIZE.xl} color="var(--color-content-tertiary)" />
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-content-secondary)',
              textAlign: 'center',
              margin: 0,
            }}>
              Nenhuma especialidade encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Step 2: Médico ───────────────────────────────────────────────────────────

function Step2Medico({
  specialty,
  doctors,
  onBack,
  onSelect,
}: {
  specialty: string
  doctors: Doctor[]
  onBack: () => void
  onSelect: (doctor: Doctor) => void
}) {
  const [featured, familyDoctor, ...others] = doctors

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title={specialty}
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{
          padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
        }}>

          {/* Featured doctor — earliest availability */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <p style={sectionLabel}>Disponível mais cedo</p>
            <CardMFC
              style="highlighted"
              name={featured.name}
              bio={featured.description}
              rating={featured.rating}
              distance={featured.distance}
              modality={featured.modality}
              imageUrl={featured.imageUrl}
              width="100%"
              onLinkClick={() => onSelect(featured)}
            />
          </div>

          {/* Family doctor — plan-linked */}
          {familyDoctor && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
              <p style={sectionLabel}>Sua médica de família</p>
              <ListItem
                title={familyDoctor.name}
                description={`${familyDoctor.rating}/5 · ${familyDoctor.distance} · ${familyDoctor.modality}`}
                size="large"
                leftSide="image"
                imageSrc={familyDoctor.imageUrl}
                rightAsset="icon"
                divider={others.length > 0}
                onClick={() => onSelect(familyDoctor)}
              />
            </div>
          )}

          {/* Other doctors */}
          {others.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
              <p style={sectionLabel}>Outros médicos</p>
              {others.map((doc, i) => (
                <ListItem
                  key={doc.name}
                  title={doc.name}
                  description={`${doc.rating}/5 · ${doc.distance} · ${doc.modality}`}
                  size="large"
                  leftSide="image"
                  imageSrc={doc.imageUrl}
                  rightAsset="icon"
                  divider={i < others.length - 1}
                  onClick={() => onSelect(doc)}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Data e horário ───────────────────────────────────────────────────

function Step3DataHorario({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onBack,
  onNext,
}: {
  selectedDate: string | null
  selectedTime: string | null
  onDateSelect: (d: string) => void
  onTimeSelect: (t: string) => void
  onBack: () => void
  onNext: () => void
}) {
  const canProceed = !!selectedDate && !!selectedTime

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title="Escolha o horário"
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
        }}>

          {/* Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <p style={sectionLabel}>Data</p>
            <div
              style={{ display: 'flex', gap: 'var(--spacing-02)', overflowX: 'auto', scrollbarWidth: 'none' }}
              className="flex-nowrap"
            >
              {DATE_CHIPS.map((d) => (
                <div key={d} className="shrink-0">
                  <Chip
                    label={d}
                    variant="text"
                    size="small"
                    state={selectedDate === d ? 'selected' : 'idle'}
                    onClick={() => onDateSelect(d)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Horários disponíveis */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <p style={sectionLabel}>Horários disponíveis</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-02)' }}>
              {TIME_CHIPS.map((t, i) => (
                <div
                  key={t}
                  style={{
                    animation: `fadeInUp 400ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both`,
                  }}
                >
                  <Chip
                    label={t}
                    variant="text"
                    size="small"
                    state={selectedTime === t ? 'selected' : 'idle'}
                    onClick={() => onTimeSelect(t)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA — outside scroll (Rule K) */}
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
          state={canProceed ? 'enabled' : 'disabled'}
          className="w-full"
          onClick={onNext}
        />
      </div>
    </div>
  )
}

// ─── Step 4: Confirmação ──────────────────────────────────────────────────────

function Step4Confirmacao({
  doctor,
  specialty,
  date,
  time,
  onReset,
}: {
  doctor: Doctor | null
  specialty: string
  date: string
  time: string
  onReset: () => void
}) {
  const summaryRowLabel: CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--color-content-tertiary)',
    fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
    margin: 0,
    flexShrink: 0,
  }

  const summaryRowValue: CSSProperties = {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-content-primary)',
    fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
    margin: 0,
    textAlign: 'right' as CSSProperties['textAlign'],
    flex: 1,
  }

  const rows = [
    { label: 'Médico',      value: `${doctor?.name ?? 'Dra. Ana Lima'} — ${specialty}` },
    { label: 'Data',        value: date && time ? `${date === 'Hoje' ? 'Hoje' : `Terça, 22 de abril`} · ${time}` : 'Terça, 22 de abril · 09:30' },
    { label: 'Modalidade',  value: doctor?.modality ?? 'Online e presencial' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title="Consulta agendada"
        iconLeft={false}
        rightIcons={1}
        rightIcon1="close"
        rightIcon1Size={20}
        onRightIcon1={onReset}
      />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
        }}>

          {/* Title block — left-aligned */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-02)',
            animation: 'fadeInUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 100ms both',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-medium)' as CSSProperties['fontWeight'],
              color: 'var(--color-content-primary)',
              margin: 0,
              lineHeight: 'var(--line-height-title)',
            }}>
              Consulta agendada!
            </h1>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-content-secondary)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              Você receberá uma confirmação por e-mail
            </p>
          </div>

          {/* Appointment summary card */}
          <div style={{
            width: '100%',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-black-10)',
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--spacing-05)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-04)',
            animation: 'fadeInUp 500ms cubic-bezier(0.16, 1, 0.3, 1) 220ms both',
          }}>
            {rows.map((row, i) => (
              <div key={row.label}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 'var(--spacing-04)',
                }}>
                  <p style={summaryRowLabel}>{row.label}</p>
                  <p style={summaryRowValue}>{row.value}</p>
                </div>
                {i < rows.length - 1 && (
                  <div style={{
                    height: 1,
                    backgroundColor: 'var(--color-stroke)',
                    marginTop: 'var(--spacing-04)',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTAs — outside scroll (Rule K) */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-03)',
      }}>
        <Button
          label="Ver meus agendamentos"
          style="primary"
          size="large"
          className="w-full"
          onClick={() => { console.log('Ver meus agendamentos') }}
        />
        <Button
          label="Voltar ao início"
          style="tertiary"
          size="large"
          className="w-full"
          onClick={onReset}
        />
      </div>
    </div>
  )
}
