import { useState, useRef, type CSSProperties } from 'react'
import { NavBar }   from '../components/NavBar/NavBar'
import { Button }   from '../components/Button/Button'
import { Chip }     from '../components/Chip/Chip'
import { ListItem } from '../components/ListItem/ListItem'
import { CardMFC }  from '../components/CardMFC/CardMFC'
import { BaseCard } from '../components/BaseCard/BaseCard'
import { Callout }  from '../components/Callout/Callout'
import { TextField } from '../components/TextField/TextField'
import { Icon }     from '../icons/Icon'
import { ICON_SIZE } from '../icons/iconSize'
import mfcFabiana  from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago    from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela  from '../assets/mfc/mfc-3-manuela.jpg'

// ─── Motion ──────────────────────────────────────────────────────────────────

const EXIT_MS  = 280
const ENTER_MS = 500

const MOTION_STYLES = `
  @keyframes rcIn {
    from { opacity: 0; transform: translateY(64px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rcInBack {
    from { opacity: 0; transform: translateY(-48px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes rcOut {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-10px); }
  }
  @keyframes rcFadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

let injected = false
function injectMotion() {
  if (injected) return
  injected = true
  const el = document.createElement('style')
  el.textContent = MOTION_STYLES
  document.head.appendChild(el)
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen    = 'entry' | 'specialty' | 'specialists' | 'exam-search' | 'labs' | 'ps' | 'ps-detail'
type Phase     = 'enter' | 'exit'
type Direction = 'forward' | 'back'

interface Specialist {
  name: string
  bio: string
  rating: string
  distance: string
  availability: string
  modality: string
  imageUrl: string
}

interface Lab {
  name: string
  address: string
  distance: string
  turnaround: string
  hours: string
  phone: string
}

interface EmergencyUnit {
  name: string
  type: string
  address: string
  distance: string
  waitTime: string
  phone: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SPECIALTIES = [
  { label: 'Clínico Geral',  icon: 'stethoscope'  },
  { label: 'Cardiologia',    icon: 'heartFilled'  },
  { label: 'Dermatologia',   icon: 'bandaid'      },
  { label: 'Ortopedia',      icon: 'bodyOutlined' },
  { label: 'Psicologia',     icon: 'mindfulness'  },
  { label: 'Ginecologia',    icon: 'baby'         },
  { label: 'Neurologia',     icon: 'pulse'        },
  { label: 'Oftalmologia',   icon: 'eyeShow'      },
]

const COMMON_EXAMS = [
  'Hemograma completo',
  'Glicemia em jejum',
  'Colesterol total',
  'TSH',
  'Vitamina D',
  'Raio-X',
  'Ultrassonografia',
  'Eletrocardiograma',
]

// Family doctor — plan-linked, shown separately at the top
const FAMILY_DOCTOR: Specialist = {
  name: 'Dra. Ana Lima',
  bio: 'Sua médica de família · Plano Alice',
  rating: '4.9',
  distance: '1.2 km',
  availability: 'Amanhã às 09h00',
  modality: 'Online e presencial',
  imageUrl: mfcFabiana,
}

// Available soon — sorted by earliest slot
const SPECIALISTS: Specialist[] = [
  {
    name: 'Dr. Ricardo Alves',
    bio: 'CRM 12345 · Clínico Geral',
    rating: '4.9',
    distance: '0.8 km',
    availability: 'Hoje às 14h30',
    modality: 'Presencial',
    imageUrl: mfcTiago,
  },
  {
    name: 'Dra. Fernanda Ramos',
    bio: 'CRM 67890 · Clínico Geral',
    rating: '4.7',
    distance: '2.1 km',
    availability: 'Hoje às 16h00',
    modality: 'Online',
    imageUrl: mfcManuela,
  },
  {
    name: 'Dr. Gustavo Mendes',
    bio: 'CRM 54321 · Clínico Geral',
    rating: '4.8',
    distance: '3.4 km',
    availability: 'Amanhã às 08h00',
    modality: 'Presencial',
    imageUrl: mfcFabiana,
  },
  {
    name: 'Dra. Patrícia Souza',
    bio: 'CRM 11223 · Clínico Geral',
    rating: '4.6',
    distance: '1.8 km',
    availability: 'Amanhã às 10h30',
    modality: 'Online',
    imageUrl: mfcTiago,
  },
  {
    name: 'Dr. Henrique Lima',
    bio: 'CRM 33445 · Clínico Geral',
    rating: '4.5',
    distance: '4.2 km',
    availability: 'Amanhã às 15h00',
    modality: 'Presencial',
    imageUrl: mfcManuela,
  },
]

const LABS: Lab[] = [
  {
    name: 'Fleury Medicina e Saúde',
    address: 'R. Cincinato Braga, 282 · Bela Vista',
    distance: '0.6 km',
    turnaround: 'Resultado em 24h',
    hours: 'Aberto hoje até 18h',
    phone: '(11) 3179-0180',
  },
  {
    name: 'Delboni Auriemo',
    address: 'Av. Paulista, 1374 · Bela Vista',
    distance: '1.2 km',
    turnaround: 'Resultado em 24h',
    hours: 'Aberto hoje até 20h',
    phone: '(11) 3017-3700',
  },
  {
    name: 'Hermes Pardini',
    address: 'R. da Consolação, 540 · Consolação',
    distance: '2.0 km',
    turnaround: 'Resultado em 48h',
    hours: 'Aberto hoje até 17h',
    phone: '(11) 3031-5900',
  },
]

const EMERGENCY_UNITS: EmergencyUnit[] = [
  {
    name: 'UPA Bela Vista',
    type: 'UPA 24h',
    address: 'R. Vergueiro, 1421 · Bela Vista',
    distance: '0.9 km',
    waitTime: '~20 min',
    phone: '(11) 3392-0200',
  },
  {
    name: 'Hospital Sírio-Libanês',
    type: 'Pronto-socorro · Cobertura Alice',
    address: 'R. Dona Adma Jafet, 91 · Bela Vista',
    distance: '1.4 km',
    waitTime: '~35 min',
    phone: '(11) 3155-0200',
  },
  {
    name: 'Hospital das Clínicas',
    type: 'Pronto-socorro',
    address: 'Av. Dr. Enéas Carvalho Aguiar, 255',
    distance: '2.3 km',
    waitTime: '~45 min',
    phone: '(11) 2661-0000',
  },
]

// ─── Shared styles ────────────────────────────────────────────────────────────

const sectionLabel: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-sm)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  color: 'var(--color-content-secondary)',
  margin: 0,
}

const sectionReason: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  color: 'var(--color-content-tertiary)',
  margin: 0,
}

const pageTitle: CSSProperties = {
  fontFamily: 'var(--font-family-base)',
  fontSize: 'var(--font-size-xl)',
  fontWeight: 'var(--font-weight-regular)' as CSSProperties['fontWeight'],
  color: 'var(--color-content-primary)',
  margin: '0 0 var(--spacing-05)',
  lineHeight: 'var(--line-height-title)',
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function RedeCredenciadaFlowScreen() {
  injectMotion()

  const [screen,    setScreen]    = useState<Screen>('entry')
  const [phase,     setPhase]     = useState<Phase>('enter')
  const [direction, setDirection] = useState<Direction>('forward')

  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null)
  const [selectedExam,      setSelectedExam]      = useState<string | null>(null)
  const [selectedER,        setSelectedER]        = useState<EmergencyUnit | null>(null)
  const [examSearch,        setExamSearch]        = useState('')

  const pendingScreen = useRef<Screen | null>(null)

  function navigate(to: Screen, dir: Direction) {
    if (phase === 'exit') return
    pendingScreen.current = to
    setDirection(dir)
    setPhase('exit')
    setTimeout(() => {
      setScreen(pendingScreen.current!)
      setPhase('enter')
    }, EXIT_MS)
  }

  function goTo(to: Screen) { navigate(to, 'forward') }
  function goBack(to: Screen) { navigate(to, 'back') }

  const isExit = phase === 'exit'
  const stepAnimation = isExit
    ? `rcOut ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both`
    : direction === 'forward'
    ? `rcIn ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`
    : `rcInBack ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`

  const wrapStyle: CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    animation: stepAnimation,
  }

  const filteredExams = COMMON_EXAMS.filter(e =>
    e.toLowerCase().includes(examSearch.toLowerCase())
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
      <div key={`${screen}-${phase}`} style={wrapStyle}>

        {screen === 'entry' && (
          <ScreenEntry onSelect={(path) => {
            if (path === 'specialist') goTo('specialty')
            else if (path === 'lab') goTo('exam-search')
            else goTo('ps')
          }} />
        )}

        {screen === 'specialty' && (
          <ScreenSpecialty
            familyDoctor={FAMILY_DOCTOR}
            specialties={SPECIALTIES}
            onBack={() => goBack('entry')}
            onSelect={(s) => { setSelectedSpecialty(s); goTo('specialists') }}
            onSelectFamilyDoctor={() => { /* goes to Agendamento in production */ }}
          />
        )}

        {screen === 'specialists' && (
          <ScreenSpecialists
            specialty={selectedSpecialty ?? ''}
            specialists={SPECIALISTS}
            onBack={() => goBack('specialty')}
            onSelect={() => { /* goes to Agendamento in production */ }}
          />
        )}

        {screen === 'exam-search' && (
          <ScreenExamSearch
            search={examSearch}
            onSearchChange={setExamSearch}
            exams={filteredExams}
            onBack={() => { setExamSearch(''); goBack('entry') }}
            onSelect={(e) => { setSelectedExam(e); goTo('labs') }}
          />
        )}

        {screen === 'labs' && (
          <ScreenLabs
            exam={selectedExam ?? ''}
            labs={LABS}
            onBack={() => goBack('exam-search')}
          />
        )}

        {screen === 'ps' && (
          <ScreenPS
            units={EMERGENCY_UNITS}
            onBack={() => goBack('entry')}
            onSelect={(unit) => { setSelectedER(unit); goTo('ps-detail') }}
          />
        )}

        {screen === 'ps-detail' && selectedER && (
          <ScreenPSDetail
            unit={selectedER}
            onBack={() => goBack('ps')}
          />
        )}

      </div>
    </div>
  )
}

// ─── Screen: Entry ────────────────────────────────────────────────────────────

function ScreenEntry({ onSelect }: { onSelect: (path: 'specialist' | 'lab' | 'ps') => void }) {
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

      {/* Title anchored to top */}
      <div style={{ padding: '0 var(--spacing-06) var(--spacing-05)', flex: 1 }}>
        <h1 style={pageTitle}>O que você precisa?</h1>
      </div>

      {/* Actions anchored to bottom — closer to the thumb */}
      <div style={{ paddingBottom: 'var(--spacing-06)' }}>
        <ListItem
          title="Consulta com especialista"
          description="Encontre o médico certo para o que você sente"
          size="large"
          leftSide="icon"
          icon={<Icon name="stethoscope" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
          rightAsset="icon"
          divider={true}
          onClick={() => onSelect('specialist')}
        />
        <ListItem
          title="Exames e laboratórios"
          description="Hemograma, imagem, coleta e mais"
          size="large"
          leftSide="icon"
          icon={<Icon name="lab" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
          rightAsset="icon"
          divider={true}
          onClick={() => onSelect('lab')}
        />
        <ListItem
          title="Pronto-socorro"
          description="Atendimento sem agendamento, quando não pode esperar"
          size="large"
          leftSide="icon"
          icon={<Icon name="hospital" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
          rightAsset="icon"
          divider={false}
          onClick={() => onSelect('ps')}
        />
      </div>
    </div>
  )
}

// ─── Screen: Escolha de especialidade ────────────────────────────────────────

function ScreenSpecialty({
  familyDoctor,
  specialties,
  onBack,
  onSelect,
  onSelectFamilyDoctor,
}: {
  familyDoctor: Specialist
  specialties: { label: string; icon: string }[]
  onBack: () => void
  onSelect: (label: string) => void
  onSelectFamilyDoctor: (s: Specialist) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        showTitle={false}
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ padding: '0 var(--spacing-06) var(--spacing-05)' }}>
        <h1 style={pageTitle}>Qual especialidade?</h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Family doctor — shown before specialties, no redundant label */}
        <div style={{ padding: '0 var(--spacing-06) var(--spacing-05)' }}>
          <CardMFC
            style="compact"
            name={familyDoctor.name}
            label="Meu médico de família"
            rating={familyDoctor.rating}
            distance={familyDoctor.distance}
            modality={familyDoctor.modality}
            imageUrl={familyDoctor.imageUrl}
            width="100%"
            linkLabel="Agendar consulta"
            onLinkClick={() => onSelectFamilyDoctor(familyDoctor)}
          />
        </div>

        {/* Specialties list */}
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

      </div>
    </div>
  )
}

// ─── Screen: Especialistas ────────────────────────────────────────────────────

type SortMode = 'earliest' | 'nearest' | 'top-rated'

function parseAvailabilityMinutes(a: string): number {
  const dayOffset = a.startsWith('Amanhã') ? 1 : 0
  const match = a.match(/(\d+)h(\d+)/)
  const h = match ? parseInt(match[1]) : 0
  const m = match ? parseInt(match[2]) : 0
  return dayOffset * 24 * 60 + h * 60 + m
}

function sortSpecialists(list: Specialist[], mode: SortMode): Specialist[] {
  const copy = [...list]
  if (mode === 'earliest')    copy.sort((a, b) => parseAvailabilityMinutes(a.availability) - parseAvailabilityMinutes(b.availability))
  else if (mode === 'nearest') copy.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
  else                         copy.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
  return copy
}

const SORT_LABELS: Record<SortMode, string> = {
  earliest:   'Mais cedo',
  nearest:    'Mais próximo',
  'top-rated':'Melhor avaliado',
}

function getFeaturedLabel(s: Specialist, mode: SortMode): string {
  if (mode === 'earliest')    return s.availability
  if (mode === 'nearest')     return `${s.distance} de você`
  return `${s.rating}/5 · Mais bem avaliado`
}

function ScreenSpecialists({
  specialty,
  specialists,
  onBack,
  onSelect,
}: {
  specialty: string
  specialists: Specialist[]
  onBack: () => void
  onSelect: (s: Specialist) => void
}) {
  const [sortMode, setSortMode] = useState<SortMode>('earliest')
  const [nameSearch, setNameSearch] = useState('')

  const isSearching = nameSearch.trim().length > 0
  const sorted   = sortSpecialists(specialists, sortMode)
  const featured = sorted[0]
  const rest     = sorted.slice(1)
  const filtered = isSearching
    ? specialists.filter(s => s.name.toLowerCase().includes(nameSearch.toLowerCase()))
    : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title={specialty}
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      {/* Sort chips — primary navigation, not a filter */}
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-02)',
        padding: 'var(--spacing-01) var(--spacing-06) var(--spacing-04)',
        overflowX: 'auto',
        flexShrink: 0,
      }}>
        {(Object.keys(SORT_LABELS) as SortMode[]).map((mode) => (
          <Chip
            key={mode}
            label={SORT_LABELS[mode]}
            variant="text"
            size="small"
            state={sortMode === mode ? 'selected' : 'idle'}
            onClick={() => setSortMode(mode)}
          />
        ))}
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {isSearching ? (
          /* ── Search results: flat list ── */
          <>
            {filtered.length > 0 ? filtered.map((s, i) => (
              <ListItem
                key={s.name}
                title={s.name}
                description={`${s.availability} · ${s.distance} · ${s.modality}`}
                size="large"
                leftSide="image"
                imageSrc={s.imageUrl}
                rightAsset="text-icon"
                rightText={`${s.rating}/5`}
                divider={i < filtered.length - 1}
                onClick={() => onSelect(s)}
              />
            )) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--spacing-03)',
                padding: 'var(--spacing-10) var(--spacing-06)',
              }}>
                <Icon name="search" size={ICON_SIZE.xl} color="var(--color-content-tertiary)" />
                <p style={{ ...sectionLabel, textAlign: 'center' }}>Nenhum resultado encontrado</p>
              </div>
            )}
          </>
        ) : (
          /* ── Default: featured card + compact list ── */
          <>
            {/* Featured — animated on sort change */}
            <div
              key={featured.name}
              style={{
                padding: '0 var(--spacing-06) var(--spacing-05)',
                animation: 'rcFadeUp 350ms cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              <CardMFC
                style="highlighted"
                name={featured.name}
                bio={featured.bio}
                label={getFeaturedLabel(featured, sortMode)}
                rating={featured.rating}
                distance={featured.distance}
                modality={featured.modality}
                imageUrl={featured.imageUrl}
                width="100%"
                linkLabel="Ver disponibilidade"
                onLinkClick={() => onSelect(featured)}
              />
            </div>

            {/* Compact list of remaining specialists */}
            {rest.map((s, i) => (
              <ListItem
                key={s.name}
                title={s.name}
                description={`${s.availability} · ${s.distance} · ${s.modality}`}
                size="large"
                leftSide="image"
                imageSrc={s.imageUrl}
                rightAsset="text-icon"
                rightText={`${s.rating}/5`}
                divider={i < rest.length - 1}
                onClick={() => onSelect(s)}
              />
            ))}
          </>
        )}
      </div>

      {/* Search — secondary action, for referrals / known names */}
      <div style={{
        padding: 'var(--spacing-03) var(--spacing-06) var(--spacing-05)',
        borderTop: '1px solid var(--color-divider)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        <TextField
          label="Tenho indicação — buscar por nome ou CRM"
          leftIcon="search"
          width="100%"
          onValueChange={setNameSearch}
        />
      </div>
    </div>
  )
}

// ─── Screen: Busca de exame ───────────────────────────────────────────────────

function ScreenExamSearch({
  search,
  onSearchChange,
  exams,
  onBack,
  onSelect,
}: {
  search: string
  onSearchChange: (s: string) => void
  exams: string[]
  onBack: () => void
  onSelect: (exam: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        showTitle={false}
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ padding: '0 var(--spacing-06) var(--spacing-05)' }}>
        <h1 style={pageTitle}>Qual exame você precisa?</h1>
        <TextField
          label="Buscar exame ou procedimento"
          leftIcon="search"
          width="100%"
          onValueChange={onSearchChange}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{
          padding: '0 var(--spacing-06) var(--spacing-06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-03)',
        }}>
          {!search && (
            <p style={sectionLabel}>Mais solicitados</p>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-02)' }}>
            {exams.map((exam, i) => (
              <div
                key={exam}
                style={{ animation: `rcFadeUp 400ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 40}ms both` }}
              >
                <Chip
                  label={exam}
                  variant="text"
                  size="small"
                  state="idle"
                  onClick={() => onSelect(exam)}
                />
              </div>
            ))}
          </div>
          {exams.length === 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-03)',
              padding: 'var(--spacing-10) 0',
            }}>
              <Icon name="search" size={ICON_SIZE.xl} color="var(--color-content-tertiary)" />
              <p style={{ ...sectionLabel, textAlign: 'center' }}>Nenhum exame encontrado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Laboratórios ─────────────────────────────────────────────────────

function ScreenLabs({
  exam,
  labs,
  onBack,
}: {
  exam: string
  labs: Lab[]
  onBack: () => void
}) {
  const [featured, ...rest] = labs

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title={exam}
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Padded content — Callout + featured BaseCard */}
        <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-03)' }}>
          <Callout
            status="Information"
            title="Cobertura Alice"
            description="Todos os laboratórios abaixo têm cobertura 100%. Sem custo adicional para você."
            showLink={false}
            showClose={false}
            width="100%"
          />

          <div style={{ marginTop: 'var(--spacing-05)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)', marginBottom: 'var(--spacing-03)' }}>
              <p style={sectionLabel}>Mais conveniente</p>
              <p style={sectionReason}>Mais próximo de você · {featured.turnaround.toLowerCase()}</p>
            </div>
            <BaseCard
              size="small"
              filled={false}
              showCategory={true}
              category={`${featured.distance} · ${featured.turnaround}`}
              title={featured.name}
              subtitle={`${featured.address} · ${featured.hours}`}
              leftAsset={true}
              leftIcon={<Icon name="lab" size={20} color="var(--color-content-primary)" />}
              rightAsset={false}
              showSlot={false}
              action="2links"
              linkLabel="Ver endereço"
              linkLabel2="Como agendar"
              width="100%"
            />
          </div>
        </div>

        {/* Other labs — section label padded, ListItems full-width */}
        <div style={{ marginTop: 'var(--spacing-04)' }}>
          <p style={{ ...sectionLabel, padding: '0 var(--spacing-06)', marginBottom: 'var(--spacing-02)' }}>
            Outros laboratórios
          </p>
          {rest.map((lab, i) => (
            <ListItem
              key={lab.name}
              title={lab.name}
              description={`${lab.distance} · ${lab.turnaround} · ${lab.hours}`}
              size="large"
              leftSide="icon"
              icon={<Icon name="lab" size={ICON_SIZE.lg} color="var(--color-content-secondary)" />}
              rightAsset="icon"
              divider={i < rest.length - 1}
              onClick={() => {}}
            />
          ))}
        </div>

      </div>
    </div>
  )
}

// ─── Screen: Pronto-socorro (lista) ───────────────────────────────────────────

function ScreenPS({
  units,
  onBack,
  onSelect,
}: {
  units: EmergencyUnit[]
  onBack: () => void
  onSelect: (unit: EmergencyUnit) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title="Pronto-socorro"
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-03)' }}>
          {/* Safety-first — differentiate urgent care from life-threatening */}
          <Callout
            status="Alert"
            title="Emergência grave?"
            description="Em caso de risco de vida — desmaio, dor no peito, dificuldade para respirar — ligue 192 (SAMU) imediatamente."
            showLink={false}
            showClose={false}
            width="100%"
          />
        </div>

        <div style={{ marginTop: 'var(--spacing-02)' }}>
          {units.map((unit, i) => (
            <ListItem
              key={unit.name}
              title={unit.name}
              description={`${unit.type} · ${unit.distance} · Espera ${unit.waitTime}`}
              size="large"
              leftSide="icon"
              icon={<Icon name="hospital" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
              rightAsset="icon"
              divider={i < units.length - 1}
              onClick={() => onSelect(unit)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen: Pronto-socorro (detalhe) ─────────────────────────────────────────

function ScreenPSDetail({
  unit,
  onBack,
}: {
  unit: EmergencyUnit
  onBack: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar
        type="page"
        title={unit.name}
        iconLeft={true}
        rightIcons={0}
        onBack={onBack}
      />

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <ListItem
          title="Endereço"
          description={unit.address}
          size="large"
          leftSide="icon"
          icon={<Icon name="localPin" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
          rightAsset="none"
          divider={true}
        />
        <ListItem
          title="Tempo de espera estimado"
          description={unit.waitTime}
          size="large"
          leftSide="icon"
          icon={<Icon name="clock" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
          rightAsset="none"
          divider={true}
        />
        <ListItem
          title="Telefone"
          description={unit.phone}
          size="large"
          leftSide="icon"
          icon={<Icon name="phone" size={ICON_SIZE.lg} color="var(--color-content-primary)" />}
          rightAsset="none"
          divider={false}
        />
      </div>

      {/* CTAs */}
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
          label="Como chegar"
          style="primary"
          size="large"
          className="w-full"
          onClick={() => console.log('open maps:', unit.address)}
        />
        <Button
          label={`Ligar — ${unit.phone}`}
          style="tertiary"
          size="large"
          className="w-full"
          onClick={() => console.log('call:', unit.phone)}
        />
      </div>
    </div>
  )
}
