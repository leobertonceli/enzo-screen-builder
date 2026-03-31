import { useState } from 'react'
import { NavBar }    from '../components/NavBar/NavBar'
import { Button }    from '../components/Button/Button'
import { TextField } from '../components/TextField/TextField'
import { ListItem }  from '../components/ListItem/ListItem'
import { Callout }   from '../components/Callout/Callout'
import { Icon }      from '../icons/Icon'

// ─── Types ────────────────────────────────────────────────────────────────────

type FlowStep = 'dados-pessoais' | 'endereco' | 'confirmacao' | 'sucesso'
type Parentesco = 'Cônjuge' | 'Filho(a)' | 'Pai/Mãe' | 'Outro'

const PARENTESCOS: { label: Parentesco; icon: string }[] = [
  { label: 'Cônjuge',  icon: 'heart-outline' },
  { label: 'Filho(a)', icon: 'baby-face-outline' },
  { label: 'Pai/Mãe',  icon: 'account-supervisor-outline' },
  { label: 'Outro',    icon: 'account-outline' },
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
  canContinue,
  ctaLabel,
  onCta,
  children,
}: {
  title: string
  onBack?: () => void
  canContinue: boolean
  ctaLabel: string
  onCta: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{
      width: 375,
      height: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
    }}>
      <NavBar
        type="page"
        title={title}
        rightIcons={0}
        onBack={onBack}
        iconLeft={!!onBack}
      />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-06)',
        }}>
          {children}
          {/* Bottom breathing room */}
          <div style={{ height: 'var(--spacing-04)' }} />
        </div>
      </div>

      {/* CTA — always visible at bottom */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
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
  const [step, setStep] = useState<FlowStep>('dados-pessoais')

  const [dados, setDados] = useState<DadosPessoais>({
    nome: '', cpf: '', dataNascimento: '', parentesco: null,
  })

  const [endereco, setEndereco] = useState<Endereco>({
    cep: '', rua: '', numero: '', complemento: '',
  })

  if (step === 'dados-pessoais') return (
    <StepDadosPessoais
      dados={dados}
      onChange={(k, v) => setDados(prev => ({ ...prev, [k]: v }))}
      onNext={() => setStep('endereco')}
    />
  )

  if (step === 'endereco') return (
    <StepEndereco
      endereco={endereco}
      onChange={(k, v) => setEndereco(prev => ({ ...prev, [k]: v }))}
      onBack={() => setStep('dados-pessoais')}
      onNext={() => setStep('confirmacao')}
    />
  )

  if (step === 'confirmacao') return (
    <StepConfirmacao
      dados={dados}
      endereco={endereco}
      onBack={() => setStep('endereco')}
      onConfirm={() => setStep('sucesso')}
    />
  )

  return <StepSucesso nome={dados.nome} />
}

// ─── Step 1: Dados pessoais ───────────────────────────────────────────────────

function StepDadosPessoais({
  dados,
  onChange,
  onNext,
}: {
  dados: DadosPessoais
  onChange: (key: keyof DadosPessoais, value: string | Parentesco) => void
  onNext: () => void
}) {
  const canContinue = !!dados.nome && !!dados.cpf && !!dados.dataNascimento && !!dados.parentesco

  return (
    <FlowShell
      title="Dados pessoais"
      canContinue={canContinue}
      ctaLabel="Continuar"
      onCta={onNext}
    >
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
          leftIcon="calendar-outline"
          width="100%"
        />
      </div>

      {/* Parentesco */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
        <SectionTitle label="Parentesco" />
        <div>
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
                  ? <Icon name="check-circle" size={20} color="var(--color-brand)" />
                  : <Icon name="circle-outline" size={20} color="var(--color-stroke)" />
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
          rightIcon="magnify"
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
      width: 375, height: '100vh',
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
          <Icon name="check" size={36} color="var(--color-brand)" />
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
          <Icon name="card-account-details-outline" size={24} color="var(--color-content-secondary)" />
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
