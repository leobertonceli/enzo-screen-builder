import { NavBar }   from '../components/NavBar/NavBar'
import { Chip }     from '../components/Chip/Chip'
import { BaseCard } from '../components/BaseCard/BaseCard'
import { Button }   from '../components/Button/Button'
import { Icon }     from '../icons/Icon'
import mfcFabiana  from '../assets/mfc/mfc-1-fabiana.jpg'

const TIPOS = ['Online', 'Presencial']

const DIAS = [
  { label: 'Seg 16', active: false },
  { label: 'Ter 17', active: true  },
  { label: 'Qua 18', active: false },
  { label: 'Qui 19', active: false },
  { label: 'Sex 20', active: false },
  { label: 'Seg 23', active: false },
  { label: 'Ter 24', active: false },
  { label: 'Qua 25', active: false },
]

const HORARIOS = ['8h', '9h30', '11h', '14h', '16h30']

export function AgendamentoHorarioScreen() {
  return (
    <div style={{
      width: 375,
      minHeight: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" title="Quando?" rightIcons={0} />

      {/* Subtitle — Dezembro 2024 */}
      <div style={{
        padding: 'var(--spacing-02) var(--spacing-06) 0',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-01)',
      }}>
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)',
          color: 'var(--color-content-secondary)',
        }}>
          Dezembro 2024
        </span>
        <Icon name="chevron-down" size={16} color="var(--color-content-secondary)" />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 100 }}>
        <div style={{
          padding: 'var(--spacing-05) var(--spacing-06) 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
        }}>

          {/* Médico selecionado */}
          <BaseCard
            size="small"
            filled={false}
            showCategory={true}
            category="Médico selecionado"
            showTitle={true}
            title="Fabiana Moreira"
            showSubtitle={true}
            subtitle="Clínico geral"
            leftAsset={true}
            leftImage={mfcFabiana}
            rightAsset={false}
            showSlot={false}
            action="none"
            width="100%"
          />

          {/* Tipo de atendimento */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <h2 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: 0,
            }}>
              Tipo de atendimento
            </h2>
            <div style={{ display: 'flex', gap: 'var(--spacing-02)' }}>
              {TIPOS.map((tipo, i) => (
                <Chip
                  key={tipo}
                  label={tipo}
                  size="small"
                  state={i === 0 ? 'selected' : 'idle'}
                />
              ))}
            </div>
          </div>

          {/* Dia */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <h2 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: 0,
            }}>
              Dia
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-02)',
            }}>
              {DIAS.map((dia) => (
                <Chip
                  key={dia.label}
                  label={dia.label}
                  size="small"
                  state={dia.active ? 'selected' : 'idle'}
                />
              ))}
            </div>
          </div>

          {/* Horário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <h2 style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: 0,
            }}>
              Horário
            </h2>
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-02)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}>
              {HORARIOS.map((h, i) => (
                <div key={h} className="shrink-0">
                  <Chip
                    label={h}
                    size="small"
                    state={i === 1 ? 'selected' : 'idle'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resumo da seleção */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-02)',
            padding: 'var(--spacing-04)',
            backgroundColor: 'var(--color-magenta-00)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-magenta-10)',
          }}>
            <Icon name="calendar-check-outline" size={20} color="var(--color-brand)" />
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-primary)',
            }}>
              Ter, 17 de dezembro · Online · 9h30
            </span>
          </div>

        </div>
      </div>

      {/* CTA fixo no rodapé */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-stroke)',
        padding: 'var(--spacing-04) var(--spacing-06)',
        paddingBottom: 'var(--spacing-06)',
      }}>
        <Button
          label="Confirmar horário"
          style="primary"
          size="large"
          state="enabled"
          type="text"
          className="w-full"
        />
      </div>
    </div>
  )
}
