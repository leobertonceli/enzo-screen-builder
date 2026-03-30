import React, { useState, useEffect } from 'react'
import { NavBar }    from '../components/NavBar/NavBar'
import { Button }    from '../components/Button/Button'
import { Chip }      from '../components/Chip/Chip'
import { ListItem }  from '../components/ListItem/ListItem'
import { Callout }   from '../components/Callout/Callout'
import { TextField } from '../components/TextField/TextField'
import { Icon }      from '../icons/Icon'

// ─── Types ───────────────────────────────────────────────────────────────────

type FlowStep     = 'tipo' | 'dados-despesa' | 'dados-bancarios' | 'confirmacao' | 'sucesso'
type ViewState    = 'loading' | 'loaded'
type TipoDespesa  = 'Consulta médica' | 'Exame' | 'Medicamento' | 'Outros'

const TIPOS: { label: TipoDespesa; icon: string }[] = [
  { label: 'Consulta médica', icon: 'stethoscope' },
  { label: 'Exame',           icon: 'microscope' },
  { label: 'Medicamento',     icon: 'pill' },
  { label: 'Outros',          icon: 'dots-horizontal' },
]

// ─── Missing component tag ────────────────────────────────────────────────────

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

// ─── Flow controller ──────────────────────────────────────────────────────────

export function ReembolsoFlowScreen() {
  const [step, setStep] = useState<FlowStep>('tipo')

  // Step 1
  const [tipoState, setTipoState]     = useState<ViewState>('loading')
  const [tipoDespesa, setTipoDespesa] = useState<TipoDespesa | null>(null)

  // Step 2
  const [prestador, setPrestador]             = useState('')
  const [dataAtendimento, setDataAtendimento] = useState('')
  const [valorPago, setValorPago]             = useState('')
  const [temNotaFiscal, setTemNotaFiscal]     = useState<'Sim' | 'Não' | null>(null)

  // Step 3
  const [bancosState, setBancosState] = useState<ViewState>('loading')
  const [banco, setBanco]             = useState('')
  const [agencia, setAgencia]         = useState('')
  const [conta, setConta]             = useState('')

  // Step 4
  const [confirmacaoState, setConfirmacaoState] = useState<'loaded' | 'sending'>('loaded')

  // Step 5 — protocol number generated once on mount
  const [protocolo] = useState(
    () => `ALI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
  )

  // Auto-transition step 1: loading → loaded
  useEffect(() => {
    if (tipoState !== 'loading') return
    const t = setTimeout(() => setTipoState('loaded'), 1200)
    return () => clearTimeout(t)
  }, [tipoState])

  // Auto-transition step 3: loading → loaded (only when on that step)
  useEffect(() => {
    if (step !== 'dados-bancarios' || bancosState !== 'loading') return
    const t = setTimeout(() => setBancosState('loaded'), 1000)
    return () => clearTimeout(t)
  }, [step, bancosState])

  // Navigation handlers
  function goToDadosDespesa() { setStep('dados-despesa') }

  function goToDadosBancarios() {
    setStep('dados-bancarios')
    setBancosState('loading')
  }

  function goToConfirmacao() {
    setStep('confirmacao')
    setConfirmacaoState('loaded')
  }

  function submitReembolso() {
    setConfirmacaoState('sending')
    setTimeout(() => setStep('sucesso'), 2000)
  }

  return (
    <div style={{
      width: 375,
      height: 812,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--color-surface)',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
    }}>
      {step === 'tipo' && (
        <StepTipoDespesa
          state={tipoState}
          selected={tipoDespesa}
          onSelect={setTipoDespesa}
          onNext={goToDadosDespesa}
          onClose={() => {}}
        />
      )}

      {step === 'dados-despesa' && (
        <StepDadosDespesa
          prestador={prestador}
          onPrestadorChange={setPrestador}
          dataAtendimento={dataAtendimento}
          onDataChange={setDataAtendimento}
          valorPago={valorPago}
          onValorChange={setValorPago}
          temNotaFiscal={temNotaFiscal}
          onNotaFiscalChange={setTemNotaFiscal}
          onBack={() => setStep('tipo')}
          onNext={goToDadosBancarios}
        />
      )}

      {step === 'dados-bancarios' && (
        <StepDadosBancarios
          state={bancosState}
          banco={banco}
          onBancoChange={setBanco}
          agencia={agencia}
          onAgenciaChange={setAgencia}
          conta={conta}
          onContaChange={setConta}
          onBack={() => setStep('dados-despesa')}
          onNext={goToConfirmacao}
        />
      )}

      {step === 'confirmacao' && (
        <StepConfirmacao
          state={confirmacaoState}
          tipoDespesa={tipoDespesa!}
          prestador={prestador}
          dataAtendimento={dataAtendimento}
          valorPago={valorPago}
          temNotaFiscal={temNotaFiscal!}
          banco={banco}
          agencia={agencia}
          conta={conta}
          onBack={() => setStep('dados-bancarios')}
          onConfirm={submitReembolso}
        />
      )}

      {step === 'sucesso' && (
        <StepSucesso
          tipoDespesa={tipoDespesa!}
          valorPago={valorPago}
          protocolo={protocolo}
        />
      )}
    </div>
  )
}

// ─── Step 1: Tipo de despesa ──────────────────────────────────────────────────

function StepTipoDespesa({
  state, selected, onSelect, onNext, onClose,
}: {
  state: ViewState
  selected: TipoDespesa | null
  onSelect: (t: TipoDespesa) => void
  onNext: () => void
  onClose: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Step 1 has no previous step — back = abandon flow */}
      <NavBar type="page" title="Qual tipo de despesa?" rightIcons={0} onBack={onClose} />

      {/* Loading skeleton */}
      {state === 'loading' && (
        <div style={{
          flex: 1, padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)',
        }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              height: 68, borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-subtle)',
            }} />
          ))}
        </div>
      )}

      {/* Loaded */}
      {state === 'loaded' && (
        <>
          <div className="flex-1 overflow-y-auto">
            <div style={{ padding: 'var(--spacing-04) var(--spacing-06) 0', marginBottom: 'var(--spacing-02)' }}>
              <p style={{
                fontFamily: 'var(--font-family-label)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-content-secondary)',
                margin: 0, lineHeight: 1.5,
              }}>
                Selecione a categoria que melhor descreve sua despesa.
              </p>
            </div>

            {TIPOS.map((t, i) => (
              <ListItem
                key={t.label}
                title={t.label}
                size="small"
                leftSide="icon"
                icon={<Icon name={t.icon} size={20} color="var(--color-content-primary)" />}
                rightAsset={selected === t.label ? 'icon' : 'none'}
                rightIconElement={
                  selected === t.label
                    ? <Icon name="check" size={20} color="var(--color-brand)" />
                    : undefined
                }
                divider={i < TIPOS.length - 1}
                state={selected === t.label ? 'pressed' : 'default'}
                onClick={() => onSelect(t.label)}
              />
            ))}
          </div>

          {/* CTA — outside scroll, Rule K */}
          <div style={{
            padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
            borderTop: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)', flexShrink: 0,
          }}>
            <Button
              label="Próximo"
              style="primary" size="large"
              state={selected ? 'enabled' : 'disabled'}
              className="w-full"
              onClick={onNext}
            />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Step 2: Dados da despesa ─────────────────────────────────────────────────

function StepDadosDespesa({
  prestador, onPrestadorChange,
  dataAtendimento, onDataChange,
  valorPago, onValorChange,
  temNotaFiscal, onNotaFiscalChange,
  onBack, onNext,
}: {
  prestador: string
  onPrestadorChange: (v: string) => void
  dataAtendimento: string
  onDataChange: (v: string) => void
  valorPago: string
  onValorChange: (v: string) => void
  temNotaFiscal: 'Sim' | 'Não' | null
  onNotaFiscalChange: (v: 'Sim' | 'Não') => void
  onBack: () => void
  onNext: () => void
}) {
  const canProceed = !!prestador && !!dataAtendimento && !!valorPago && !!temNotaFiscal

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" title="Dados da despesa" rightIcons={0} onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
        }}>

          {/* Nome do prestador */}
          <TextField
            label="Nome do prestador"
            value={prestador}
            width="100%"
            onValueChange={onPrestadorChange}
          />

          {/* Data do atendimento */}
          <TextField
            label="Data do atendimento"
            value={dataAtendimento}
            helperText="DD/MM/AAAA"
            leftIcon="calendar-outline"
            width="100%"
            onValueChange={onDataChange}
          />

          {/* Valor pago */}
          <TextField
            label="Valor pago"
            value={valorPago}
            helperText="Ex: R$ 150,00"
            leftIcon="currency-brl"
            width="100%"
            onValueChange={onValorChange}
          />

          {/* Nota fiscal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)',
              margin: 0,
            }}>
              Possui nota fiscal ou recibo?
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-02)' }}>
              {(['Sim', 'Não'] as const).map(opt => (
                <Chip
                  key={opt}
                  label={opt}
                  variant="text"
                  size="small"
                  state={temNotaFiscal === opt ? 'selected' : 'idle'}
                  onClick={() => onNotaFiscalChange(opt)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA — outside scroll, Rule K */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0,
      }}>
        <Button
          label="Próximo"
          style="primary" size="large"
          state={canProceed ? 'enabled' : 'disabled'}
          className="w-full"
          onClick={onNext}
        />
      </div>
    </div>
  )
}

// ─── Step 3: Dados bancários ──────────────────────────────────────────────────

function StepDadosBancarios({
  state,
  banco, onBancoChange,
  agencia, onAgenciaChange,
  conta, onContaChange,
  onBack, onNext,
}: {
  state: ViewState
  banco: string
  onBancoChange: (v: string) => void
  agencia: string
  onAgenciaChange: (v: string) => void
  conta: string
  onContaChange: (v: string) => void
  onBack: () => void
  onNext: () => void
}) {
  const canProceed = !!banco && !!agencia && !!conta

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" title="Dados bancários" rightIcons={0} onBack={onBack} />

      {/* Loading skeleton */}
      {state === 'loading' && (
        <div style={{
          flex: 1, padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
        }}>
          <div style={{ height: 80, borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface-subtle)' }} />
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ height: 56, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-subtle)' }} />
          ))}
        </div>
      )}

      {/* Loaded */}
      {state === 'loaded' && (
        <>
          <div className="flex-1 overflow-y-auto">
            <div style={{
              padding: 'var(--spacing-06)',
              display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
            }}>

              {/* Informational callout */}
              <Callout
                status="Information"
                title="Prazo de reembolso"
                description="O valor será creditado em até 30 dias úteis após a aprovação da solicitação."
                width="100%"
              />

              {/* Banco */}
              <TextField
                label="Banco"
                value={banco}
                helperText="Nome ou código do banco"
                leftIcon="bank-outline"
                width="100%"
                onValueChange={onBancoChange}
              />

              {/* Agência e conta lado a lado */}
              <div style={{ display: 'flex', gap: 'var(--spacing-03)' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    label="Agência"
                    value={agencia}
                    width="100%"
                    onValueChange={onAgenciaChange}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    label="Conta"
                    value={conta}
                    width="100%"
                    onValueChange={onContaChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA — outside scroll, Rule K */}
          <div style={{
            padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
            borderTop: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)', flexShrink: 0,
          }}>
            <Button
              label="Próximo"
              style="primary" size="large"
              state={canProceed ? 'enabled' : 'disabled'}
              className="w-full"
              onClick={onNext}
            />
          </div>
        </>
      )}
    </div>
  )
}

// ─── Step 4: Confirmação ──────────────────────────────────────────────────────

function StepConfirmacao({
  state,
  tipoDespesa, prestador, dataAtendimento, valorPago, temNotaFiscal,
  banco, agencia, conta,
  onBack, onConfirm,
}: {
  state: 'loaded' | 'sending'
  tipoDespesa: TipoDespesa
  prestador: string
  dataAtendimento: string
  valorPago: string
  temNotaFiscal: 'Sim' | 'Não'
  banco: string
  agencia: string
  conta: string
  onBack: () => void
  onConfirm: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" title="Revise e confirme" rightIcons={0} onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
        }}>

          {/* Seção: Despesa */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: '0 0 var(--spacing-02)',
            }}>
              Despesa
            </p>
            <ListItem
              title="Tipo"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={tipoDespesa}
              divider={true}
            />
            <ListItem
              title="Prestador"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={prestador}
              divider={true}
            />
            <ListItem
              title="Data"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={dataAtendimento}
              divider={true}
            />
            <ListItem
              title="Valor"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={valorPago}
              divider={true}
            />
            <ListItem
              title="Nota fiscal"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={temNotaFiscal}
              divider={false}
            />
          </div>

          {/* Seção: Dados bancários */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-01)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-content-primary)',
              margin: '0 0 var(--spacing-02)',
            }}>
              Dados bancários
            </p>
            <ListItem
              title="Banco"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={banco}
              divider={true}
            />
            <ListItem
              title="Agência"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={agencia}
              divider={true}
            />
            <ListItem
              title="Conta"
              size="small"
              leftSide="none"
              rightAsset="text"
              rightText={conta}
              divider={false}
            />
          </div>
        </div>
      </div>

      {/* CTA — outside scroll, Rule K */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0,
      }}>
        <Button
          label="Enviar solicitação"
          style="primary" size="large"
          state={state === 'sending' ? 'loading' : 'enabled'}
          className="w-full"
          onClick={onConfirm}
        />
      </div>
    </div>
  )
}

// ─── Step 5: Sucesso ──────────────────────────────────────────────────────────

function StepSucesso({
  tipoDespesa, valorPago, protocolo,
}: {
  tipoDespesa: TipoDespesa
  valorPago: string
  protocolo: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* No back on success — flow completed */}
      <NavBar type="page" showTitle={false} rightIcons={0} />

      <div className="flex-1 overflow-y-auto">
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
        }}>

          {/* Success illustration — fora do DS */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 'var(--spacing-04)',
            marginTop: 'var(--spacing-08)',
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                backgroundColor: 'var(--color-brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="check" size={36} color="var(--color-gray-white)" />
              </div>
              <MissingTag label="SuccessIcon — fora do DS" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)', alignItems: 'center' }}>
              <h1 style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-primary)',
                lineHeight: 'var(--line-height-title)',
                margin: 0, textAlign: 'center',
              }}>
                Solicitação{' '}
                <span style={{ color: 'var(--color-brand)' }}>enviada!</span>
              </h1>
              <p style={{
                fontFamily: 'var(--font-family-label)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-content-secondary)',
                textAlign: 'center', margin: 0, lineHeight: 1.5,
              }}>
                Você receberá uma confirmação por e-mail. Acompanhe o status pelo app.
              </p>
            </div>
          </div>

          {/* Protocol card — fora do DS */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-stroke)',
              backgroundColor: 'var(--color-surface-bg)',
              padding: 'var(--spacing-05)',
              display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)',
              alignItems: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-content-secondary)',
                margin: 0,
              }}>
                Número do protocolo
              </p>
              <p style={{
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-content-primary)',
                margin: 0, letterSpacing: 1,
              }}>
                {protocolo}
              </p>
              <p style={{
                fontFamily: 'var(--font-family-label)',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-content-tertiary)',
                margin: 0,
              }}>
                {tipoDespesa}{valorPago ? ` · ${valorPago}` : ''}
              </p>
            </div>
            <MissingTag label="ProtocolCard — fora do DS" />
          </div>
        </div>
      </div>

      {/* CTA — outside scroll, Rule K */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0,
      }}>
        <Button
          label="Ir para o início"
          style="primary" size="large" state="enabled"
          className="w-full" onClick={() => {}}
        />
      </div>
    </div>
  )
}
