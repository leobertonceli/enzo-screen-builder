import { NavBar }  from '../components/NavBar/NavBar'
import { ListItem } from '../components/ListItem/ListItem'
import { Tag }      from '../components/Tag/Tag'
import { Link }     from '../components/Link/Link'
import { Icon }     from '../icons/Icon'

const lancamentos = [
  { id: 1, procedimento: 'Consulta — Clínica Geral',   data: '24 mar',  valor: 'R$ 45,00'  },
  { id: 2, procedimento: 'Exame de sangue — Hemograma', data: '20 mar',  valor: 'R$ 28,50'  },
  { id: 3, procedimento: 'Consulta — Cardiologia',      data: '17 mar',  valor: 'R$ 80,00'  },
  { id: 4, procedimento: 'Ultrassonografia abdominal',  data: '12 mar',  valor: 'R$ 120,00' },
  { id: 5, procedimento: 'Consulta — Dermatologia',     data: '07 mar',  valor: 'R$ 80,00'  },
  { id: 6, procedimento: 'Exame — Raio-X de tórax',     data: '03 mar',  valor: 'R$ 35,00'  },
]

export function ExtratoCoparticipacaoScreen() {
  return (
    <div style={{
      width: 375,
      minHeight: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" showTitle={false} rightIcons={0} onBack={() => {}} />

      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingBottom: 'var(--spacing-20)' }}
      >
        {/* Header: mês inline no título */}
        <div style={{ padding: '0 var(--spacing-06)', paddingTop: 'var(--spacing-04)' }}>
          <h1 style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            margin: 0,
            lineHeight: 'var(--line-height-title)',
          }}>
            Extrato de{' '}
            <span style={{ color: 'var(--color-brand)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Março 2026{' '}
              <span style={{ verticalAlign: 'middle', display: 'inline-flex' }}><Icon name="chevronArrowDown" size={18} /></span>
            </span>
          </h1>

          {/* Status tag */}
          <div style={{ marginTop: 'var(--spacing-03)' }}>
            <Tag variant="Blue" icon="No icon" label="Mês em andamento" />
          </div>

          {/* Total gasto */}
          <div style={{ marginTop: 'var(--spacing-06)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              margin: 0,
              lineHeight: 1.4,
            }}>
              Total gasto no mês
            </p>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-xxl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-content-primary)',
              margin: 0,
              marginTop: 'var(--spacing-01)',
              lineHeight: 'var(--line-height-title)',
            }}>
              R$ 388,50
            </p>
          </div>

          {/* Link meses anteriores */}
          <div style={{ marginTop: 'var(--spacing-04)' }}>
            <Link
              label="Ver meses anteriores"
              size="small"
              context="on-light"
              icon="right"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          backgroundColor: 'var(--color-divider)',
          margin: 'var(--spacing-06) 0 0',
        }} />

        {/* Seção: Lançamentos */}
        <div style={{ padding: '0 var(--spacing-06)', paddingTop: 'var(--spacing-06)' }}>
          <h2 style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            margin: 0,
            marginBottom: 'var(--spacing-04)',
          }}>
            Lançamentos
          </h2>
        </div>

        {/* Lista de lançamentos */}
        <div>
          {lancamentos.map((item, idx) => (
            <ListItem
              key={item.id}
              title={item.procedimento}
              description={item.data}
              size="small"
              leftSide="icon"
              icon={
                <Icon
                  name="paper"
                  size={20}
                  color="var(--color-content-primary)"
                />
              }
              rightAsset="text"
              rightText={item.valor}
              divider={idx < lancamentos.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
