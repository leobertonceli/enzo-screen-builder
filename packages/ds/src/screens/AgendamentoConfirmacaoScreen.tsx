import { NavBar }  from '../components/NavBar/NavBar'
import { BaseCard } from '../components/BaseCard/BaseCard'
import { Callout }  from '../components/Callout/Callout'
import { Button }   from '../components/Button/Button'
import { Icon }     from '../icons/Icon'

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

const DETAILS = [
  { icon: 'account-outline',        label: 'Médica',     value: 'Fabiana Moreira'       },
  { icon: 'stethoscope',            label: 'Especialidade', value: 'Clínico geral'       },
  { icon: 'calendar-outline',       label: 'Data',        value: 'Terça, 17 de dezembro' },
  { icon: 'clock-outline',          label: 'Horário',     value: '9h30'                 },
  { icon: 'video-outline',          label: 'Modalidade',  value: 'Online'               },
  { icon: 'timer-outline',          label: 'Duração',     value: '40 min'               },
]

export function AgendamentoConfirmacaoScreen() {
  return (
    <div style={{
      width: 375,
      minHeight: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" title="Confirmado!" rightIcons={0} />

      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 'var(--spacing-08)' }}>
        <div style={{
          padding: 'var(--spacing-06) var(--spacing-06) 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
        }}>

          {/* Check icon + heading */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-04)',
            paddingTop: 'var(--spacing-04)',
            paddingBottom: 'var(--spacing-02)',
          }}>
            {/* Brand check circle */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-magenta-00)',
              border: '2px solid var(--color-magenta-10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon name="check-circle-outline" size={40} color="var(--color-brand)" />
            </div>

            {/* Heading */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-02)',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-primary)',
                margin: 0,
                textAlign: 'center',
                lineHeight: '1.2',
              }}>
                Sua consulta está agendada
              </h1>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-secondary)',
                margin: 0,
                textAlign: 'center',
              }}>
                Tudo pronto para a sua consulta online
              </p>
            </div>
          </div>

          {/* Card de detalhes — fora do DS */}
          <div style={{ position: 'relative' }}>
            <BaseCard
              size="small"
              filled={false}
              showCategory={true}
              category="Detalhes da consulta"
              showTitle={false}
              showSubtitle={false}
              leftAsset={false}
              rightAsset={false}
              showSlot={false}
              action="none"
              width="100%"
            />
            {/* Overlay de detalhes sobre o BaseCard — fora do DS */}
            <div style={{
              position: 'relative',
              marginTop: 'calc(-1 * var(--spacing-05))',
              padding: '0 var(--spacing-05) var(--spacing-05)',
            }}>
              <MissingTag label="DetailList — fora do DS" />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-03)',
                paddingTop: 'var(--spacing-02)',
              }}>
                {DETAILS.map((d) => (
                  <div key={d.label} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-03)',
                  }}>
                    <Icon name={d.icon} size={18} color="var(--color-content-secondary)" />
                    <span style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-regular)',
                      color: 'var(--color-content-secondary)',
                      width: 96,
                      flexShrink: 0,
                    }}>
                      {d.label}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-family-base)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-content-primary)',
                    }}>
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Callout lembrete */}
          <Callout
            status="Highlight"
            highlightIcon="bell-outline"
            title="Lembrete automático"
            description="Você receberá uma notificação 1h antes da sua consulta."
            showLink={false}
            showClose={false}
            width="100%"
          />

          {/* Botões de ação */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-03)',
            paddingBottom: 'var(--spacing-04)',
          }}>
            <Button
              label="Ver minha agenda"
              style="primary"
              size="large"
              state="enabled"
              type="text"
              className="w-full"
            />
            <Button
              label="Voltar ao início"
              style="tertiary"
              size="large"
              state="enabled"
              type="text"
              className="w-full"
            />
          </div>

        </div>
      </div>
    </div>
  )
}
