import { useState } from 'react'
import { NavBar }    from '../components/NavBar/NavBar'
import { Button }    from '../components/Button/Button'
import { TextField } from '../components/TextField/TextField'
import { ListItem }  from '../components/ListItem/ListItem'
import { Callout }   from '../components/Callout/Callout'
import { Icon }      from '../icons/Icon'

// ─── Motion ───────────────────────────────────────────────────────────────────

const FLOW_STYLES = `
  @keyframes stepOut {
    from { opacity: 1; transform: translateY(0);     }
    to   { opacity: 0; transform: translateY(-10px); }
  }
  @keyframes stepIn {
    from { opacity: 0; transform: translateY(64px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes stepInBack {
    from { opacity: 0; transform: translateY(-48px); }
    to   { opacity: 1; transform: translateY(0);     }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`

type Direction = 'forward' | 'back'
type Phase     = 'enter' | 'exit'

const EXIT_MS  = 280
const ENTER_MS = 500

// ─── Types ────────────────────────────────────────────────────────────────────

type FlowStep   = 'dados-pessoais' | 'endereco' | 'confirmacao' | 'sucesso'
type Parentesco = 'Cônjuge' | 'Filho(a)' | 'Pai/Mãe' | 'Outro'

const PARENTESCOS: { label: Parentesco; icon: string }[] = [
  { label: 'Cônjuge',  icon: 'heartOutlined' },
  { label: 'Filho(a)', icon: 'baby' },
  { label: 'Pai/Mãe',  icon: 'family' },
  { label: 'Outro',    icon: 'user' },
]

interface DadosPessoais {
  nome: string
  cpf: string
  dataNascimento: string
  parentesco: Parentesco | null
}

interface Endereco {
  cep: string
  rua: string
  numero: string
  complemento: string
}

// ─── Shared layout shell ──────────────────────────────────────────────────────

function FlowShell({
  title,
  onBack,
  onClose,
  canContinue,
  ctaLabel,
  onCta,
  children,
}: {
  title: string
  onBack?: () => void
  onClose?: () => void
  canContinue: boolean
  ctaLabel: string
  onCta: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{
      width: 375,
      height: '100%',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      <NavBar
        type="page"
        title={title}
        rightIcons={onClose ? 1 : 0}
        rightIcon1="close"
        rightIcon1Size={20}
        onRightIcon1={onClose}
        onBack={onBack}
        iconLeft={!!onBack}
      />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{
          padding: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-08)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
          boxSizing: 'border-box',
        }}>
          {children}
        </div>
      </div>

      {/* CTA — always anchored at bottom */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        <Button
          label={ctaLabel}
          style="primary"
          size="large"
          state={canContinue ? 'enabled' : 'disabled'}
          className="w-full"
          onClick={onCta}
        />
      </div>
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

// ─── Flow controller ──────────────────────────────────────────────────────────

export function CadastroDependenteFlowScreen() {
  const [displayedStep, setDisplayedStep] = useState<FlowStep>('dados-pessoais')
  const [direction,     setDirection]     = useState<Direction>('forward')
  const [phase,         setPhase]         = useState<Phase>('enter')

  const [dados, setDados] = useState<DadosPessoais>({
    nome: '', cpf: '', dataNascimento: '', parentesco: null,
  })
  const [endereco, setEndereco] = useState<Endereco>({
    cep: '', rua: '', numero: '', complemento: '',
  })

  function go(to: FlowStep, dir: Direction) {
    setDirection(dir)
    setPhase('exit')
    setTimeout(() => {
      setDisplayedStep(to)
      setPhase('enter')
    }, EXIT_MS)
  }

  function handleClose() {
    setDados({ nome: '', cpf: '', dataNascimento: '', parentesco: null })
    setEndereco({ cep: '', rua: '', numero: '', complemento: '' })
    go('dados-pessoais', 'back')
  }

  const anim = phase === 'exit'
    ? `stepOut ${EXIT_MS}ms cubic-bezier(0.4, 0, 1, 1) both`
    : displayedStep === 'sucesso'
    ? `fadeIn 300ms ease-out both`
    : direction === 'forward'
    ? `stepIn ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`
    : `stepInBack ${ENTER_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`

  return (
    <>
      <style>{FLOW_STYLES}</style>
      <div style={{ position: 'relative', width: 375, height: 812, overflow: 'hidden' }}>
        <div
          key={`${displayedStep}-${phase}`}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', animation: anim }}
        >
          {displayedStep === 'dados-pessoais' && (
            <StepDadosPessoais
              dados={dados}
              onChange={(k, v) => setDados(prev => ({ ...prev, [k]: v }))}
              onClose={handleClose}
              onNext={() => go('endereco', 'forward')}
            />
          )}
          {displayedStep === 'endereco' && (
            <StepEndereco
              endereco={endereco}
              onChange={(k, v) => setEndereco(prev => ({ ...prev, [k]: v }))}
              onBack={() => go('dados-pessoais', 'back')}
              onNext={() => go('confirmacao', 'forward')}
            />
          )}
          {displayedStep === 'confirmacao' && (
            <StepConfirmacao
              dados={dados}
              endereco={endereco}
              onBack={() => go('endereco', 'back')}
              onConfirm={() => go('sucesso', 'forward')}
            />
          )}
          {displayedStep === 'sucesso' && (
            <StepSucesso nome={dados.nome} />
          )}
        </div>
      </div>
    </>
  )
}

// ─── Step 1: Dados pessoais ───────────────────────────────────────────────────

function StepDadosPessoais({
  dados,
  onChange,
  onClose,
  onNext,
}: {
  dados: DadosPessoais
  onChange: (key: keyof DadosPessoais, value: string | Parentesco) => void
  onClose?: () => void
  onNext: () => void
}) {
  const canContinue = !!dados.nome && !!dados.cpf && !!dados.dataNascimento && !!dados.parentesco

  return (
    <FlowShell
      title="Cadastrar dependente"
      onClose={onClose}
      canContinue={canContinue}
      ctaLabel="Continuar"
      onCta={onNext}
    >
      {/* Page heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-primary)',
          margin: 0,
          lineHeight: 'var(--line-height-title)',
        }}>
          Dados pessoais
        </h1>
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-secondary)',
          margin: 0,
          lineHeight: 'var(--line-height-title-sm)',
        }}>
          Preencha os dados do dependente para adicioná-lo ao plano.
        </p>
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
        <TextField
          label="Nome completo"
          value={dados.nome}
          onValueChange={(v) => onChange('nome', v)}
          width="100%"
        />
        <TextField
          label="CPF"
          value={dados.cpf}
          onValueChange={(v) => onChange('cpf', v)}
          width="100%"
        />
        <TextField
          label="Data de nascimento"
          value={dados.dataNascimento}
          onValueChange={(v) => onChange('dataNascimento', v)}
          leftIcon="calendar"
          width="100%"
        />
      </div>

      {/* Parentesco */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)', marginTop: 'var(--spacing-10)' }}>
        <SectionTitle label="Parentesco" />
        <div style={{ margin: '0 calc(-1 * var(--spacing-06))', overflow: 'hidden' }}>
          {PARENTESCOS.map((p, i) => (
            <ListItem
              key={p.label}
              title={p.label}
              size="small"
              leftSide="icon"
              icon={<Icon name={p.icon} size={20} color="var(--color-content-primary)" />}
              rightAsset="icon"
              rightIconElement={
                dados.parentesco === p.label
                  ? <Icon name="checkFilled" size={20} color="var(--color-brand)" />
                  : <div style={{ width: 20, height: 20, borderRadius: 'var(--radius-pill)', border: '1.5px solid var(--color-stroke)', flexShrink: 0 }} />
              }
              divider={i < PARENTESCOS.length - 1}
              fullWidth
              onClick={() => onChange('parentesco', p.label)}
            />
          ))}
        </div>
      </div>
    </FlowShell>
  )
}

// ─── Step 2: Endereço ─────────────────────────────────────────────────────────

function StepEndereco({
  endereco,
  onChange,
  onBack,
  onNext,
}: {
  endereco: Endereco
  onChange: (key: keyof Endereco, value: string) => void
  onBack: () => void
  onNext: () => void
}) {
  const canContinue = !!endereco.cep && !!endereco.rua && !!endereco.numero

  return (
    <FlowShell
      title="Endereço"
      onBack={onBack}
      canContinue={canContinue}
      ctaLabel="Continuar"
      onCta={onNext}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)' }}>
        <TextField
          label="CEP"
          value={endereco.cep}
          onValueChange={(v) => onChange('cep', v)}
          rightIcon="search"
          width="100%"
        />
        <TextField
          label="Rua"
          value={endereco.rua}
          onValueChange={(v) => onChange('rua', v)}
          width="100%"
        />
        <div style={{ display: 'flex', gap: 'var(--spacing-03)' }}>
          <TextField
            label="Número"
            value={endereco.numero}
            onValueChange={(v) => onChange('numero', v)}
            width="40%"
          />
          <TextField
            label="Complemento"
            value={endereco.complemento}
            onValueChange={(v) => onChange('complemento', v)}
            width="60%"
          />
        </div>
      </div>

      <Callout
        status="Information"
        title="Endereço usado para envio do cartão"
        description="O cartão do dependente será enviado para este endereço em até 10 dias úteis."
        width="100%"
      />
    </FlowShell>
  )
}

// ─── Step 3: Confirmação ──────────────────────────────────────────────────────

function StepConfirmacao({
  dados,
  endereco,
  onBack,
  onConfirm,
}: {
  dados: DadosPessoais
  endereco: Endereco
  onBack: () => void
  onConfirm: () => void
}) {
  const enderecoFormatado = [endereco.rua, endereco.numero, endereco.complemento].filter(Boolean).join(', ')

  return (
    <FlowShell
      title="Confirmar cadastro"
      onBack={onBack}
      canContinue
      ctaLabel="Confirmar cadastro"
      onCta={onConfirm}
    >
      {/* Dados pessoais */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
        <SectionTitle label="Dados pessoais" />
        <div style={{ borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-stroke)', overflow: 'hidden' }}>
          <ListItem title="Nome"        description={dados.nome}               size="small" leftSide="none" rightAsset="none" divider fullWidth />
          <ListItem title="CPF"         description={dados.cpf}                size="small" leftSide="none" rightAsset="none" divider fullWidth />
          <ListItem title="Nascimento"  description={dados.dataNascimento}     size="small" leftSide="none" rightAsset="none" divider fullWidth />
          <ListItem title="Parentesco"  description={dados.parentesco ?? '—'}  size="small" leftSide="none" rightAsset="none" divider={false} fullWidth />
        </div>
      </div>

      {/* Endereço */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
        <SectionTitle label="Endereço" />
        <div style={{ borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-stroke)', overflow: 'hidden' }}>
          <ListItem title="CEP"      description={endereco.cep}        size="small" leftSide="none" rightAsset="none" divider fullWidth />
          <ListItem title="Endereço" description={enderecoFormatado}   size="small" leftSide="none" rightAsset="none" divider={false} fullWidth />
        </div>
      </div>

      <Callout
        status="Warning"
        title="Confira com atenção"
        description="Após a confirmação, alterações nos dados precisarão ser feitas pelo suporte."
        width="100%"
      />
    </FlowShell>
  )
}

// ─── Step 4: Sucesso ──────────────────────────────────────────────────────────

function StepSucesso({ nome }: { nome: string }) {
  const primeiroNome = nome.split(' ')[0] || 'Dependente'

  return (
    <div style={{
      width: 375, height: '100%',
      backgroundColor: 'var(--color-surface)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" showTitle={false} rightIcons={0} iconLeft={false} />

      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'var(--spacing-06)',
        gap: 'var(--spacing-06)',
        textAlign: 'center',
      }}>
        <div style={{
          width: 72, height: 72,
          borderRadius: 'var(--radius-pill)',
          backgroundColor: 'var(--color-brand-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="checkOutlined" size={36} color="var(--color-brand)" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
          <h1 style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-primary)',
            margin: 0, lineHeight: 'var(--line-height-title)',
          }}>
            {primeiroNome} foi{' '}
            <span style={{ color: 'var(--color-brand)' }}>cadastrado!</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-regular)',
            color: 'var(--color-content-secondary)',
            margin: 0, lineHeight: 'var(--line-height-title-sm)',
          }}>
            O dependente já pode usar os serviços do plano. O cartão chega em até 10 dias úteis.
          </p>
        </div>

        <div style={{
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--color-stroke)',
          padding: 'var(--spacing-04)',
          width: '100%',
          display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)',
        }}>
          <Icon name="idCard" size={24} color="var(--color-content-secondary)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
            <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-xs)', color: 'var(--color-content-secondary)' }}>
              Cartão em produção
            </span>
            <span style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-content-primary)' }}>
              Entrega prevista em 10 dias úteis
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)', flexShrink: 0 }}>
        <Button label="Ir para Meu plano" style="primary" size="large" state="enabled" className="w-full" />
      </div>
    </div>
  )
}
