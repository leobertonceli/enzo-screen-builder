import { NavBar }    from '../components/NavBar/NavBar'
import { Chip }      from '../components/Chip/Chip'
import { CardMFC }   from '../components/CardMFC/CardMFC'
import { TextField } from '../components/TextField/TextField'
import { Icon }      from '../icons/Icon'
import mfcFabiana   from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago     from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela   from '../assets/mfc/mfc-3-manuela.jpg'

const FILTERS = ['Todos', 'Clínico geral', 'Cardiologista', 'Dermatologista']

const DOCTORS = [
  { name: 'Fabiana Moreira', label: 'Clínico geral',    img: mfcFabiana },
  { name: 'Tiago Costa',     label: 'Cardiologista',    img: mfcTiago   },
  { name: 'Manuela Dias',    label: 'Dermatologista',   img: mfcManuela  },
]

export function AgendamentoMedicoScreen() {
  return (
    <div style={{
      width: 375,
      minHeight: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" title="Escolha seu médico" rightIcons={0} />

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 'var(--spacing-08)' }}>
        <div style={{
          padding: 'var(--spacing-05) var(--spacing-06) 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-05)',
        }}>

          {/* Campo de busca */}
          <TextField
            variant="Idle"
            label="Buscar especialidade ou nome"
            leftIcon="search"
            width="100%"
          />

          {/* Filtros de especialidade */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-02)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}>
            {FILTERS.map((f, i) => (
              <div key={f} className="shrink-0">
                <Chip
                  label={f}
                  size="small"
                  state={i === 0 ? 'selected' : 'idle'}
                />
              </div>
            ))}
          </div>

          {/* Contador de resultados */}
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-tertiary)',
            margin: 0,
          }}>
            3 médicos disponíveis
          </p>

          {/* Lista de médicos */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-03)',
          }}>
            {DOCTORS.map((doc) => (
              <CardMFC
                key={doc.name}
                style="compact"
                name={doc.name}
                label={doc.label}
                imageUrl={doc.img}
                linkLabel="Selecionar"
                width="100%"
              />
            ))}
          </div>

          {/* Link de ajuda */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-01)',
            paddingTop: 'var(--spacing-02)',
          }}>
            <Icon name="info" size={16} color="var(--color-content-tertiary)" />
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-tertiary)',
            }}>
              Não encontrou quem procura?{' '}
              <span style={{ color: 'var(--color-brand)', fontWeight: 'var(--font-weight-medium)', cursor: 'pointer' }}>
                Fale com a Alice
              </span>
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
