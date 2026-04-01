import React, { useState, useEffect, useMemo } from 'react'
import { NavBar }   from '../components/NavBar/NavBar'
import { Button }   from '../components/Button/Button'
import { Chip }     from '../components/Chip/Chip'
import { ListItem } from '../components/ListItem/ListItem'
import { Callout }  from '../components/Callout/Callout'
import { CardMFC }  from '../components/CardMFC/CardMFC'
import { BaseCard } from '../components/BaseCard/BaseCard'
import { Icon }     from '../icons/Icon'
import mfcFabiana  from '../assets/mfc/mfc-1-fabiana.jpg'
import mfcTiago    from '../assets/mfc/mfc-2-tiago.jpg'
import mfcManuela  from '../assets/mfc/mfc-3-manuela.jpg'

// ─── Types ──────────────────────────────────────────────────────────────────

type FlowStep         = 'especialista' | 'data-hora' | 'confirmacao' | 'sucesso'
type EspecialistaState = 'loading' | 'loaded' | 'empty' | 'error'
type DataHoraState    = 'loading' | 'loaded' | 'empty' | 'error' | 'conflict'
type ConfirmacaoState = 'loaded' | 'confirming' | 'conflict'
type ModalFilter      = 'Todos' | 'Online' | 'Presencial'

interface Specialist {
  id: string
  name: string
  specialty: string
  modality: 'Online' | 'Presencial' | 'Online e presencial'
  nextSlot: string
  imageUrl: string
}

// ─── Data ────────────────────────────────────────────────────────────────────

const SPECIALISTS: Specialist[] = [
  { id: '1', name: 'Beatriz Santos',  specialty: 'Dermatologista',        modality: 'Online',              nextSlot: 'Seg, 23 Dez', imageUrl: mfcFabiana },
  { id: '2', name: 'Ricardo Alves',   specialty: 'Dermatologia Estética', modality: 'Presencial',          nextSlot: 'Ter, 24 Dez', imageUrl: mfcTiago   },
  { id: '3', name: 'Manuela Costa',   specialty: 'Dermatologista',        modality: 'Online e presencial', nextSlot: 'Qua, 25 Dez', imageUrl: mfcManuela },
]

const DATES = ['Seg, 23', 'Ter, 24', 'Qua, 25', 'Sex, 27', 'Seg, 30', 'Ter, 31']

const TIMES_BY_DATE: Record<string, string[]> = {
  'Seg, 23': ['09:00', '10:30', '14:00', '15:30', '16:00'],
  'Ter, 24': ['08:30', '11:00', '14:30'],
  'Qua, 25': ['09:30', '10:00', '16:30'],
  'Sex, 27': ['08:00', '09:00', '11:30', '15:00'],
  'Seg, 30': ['10:00', '14:00', '16:00'],
  'Ter, 31': ['09:00', '10:30'],
}

// ─── Missing component tag ───────────────────────────────────────────────────

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

// ─── Flow controller ─────────────────────────────────────────────────────────

export function AgendamentoConsultaFlowScreen() {
  const [step, setStep] = useState<FlowStep>('especialista')

  // Step 1
  const [espState, setEspState]       = useState<EspecialistaState>('loading')
  const [filter, setFilter]           = useState<ModalFilter>('Todos')
  const [specialist, setSpecialist]   = useState<Specialist | null>(null)

  // Step 2
  const [dhState, setDhState]         = useState<DataHoraState>('loading')
  const [modality, setModality]       = useState<'Online' | 'Presencial'>('Online')
  const [date, setDate]               = useState<string | null>(null)
  const [time, setTime]               = useState<string | null>(null)

  // Step 3
  const [confState, setConfState]     = useState<ConfirmacaoState>('loaded')

  // Step 1: auto-transition loading → loaded
  useEffect(() => {
    if (espState !== 'loading') return
    const t = setTimeout(() => setEspState('loaded'), 1500)
    return () => clearTimeout(t)
  }, [espState])

  // Step 2: auto-transition loading → loaded (only when on that step)
  useEffect(() => {
    if (step !== 'data-hora' || dhState !== 'loading') return
    const t = setTimeout(() => setDhState('loaded'), 1200)
    return () => clearTimeout(t)
  }, [step, dhState])

  // Reset time when date changes
  useEffect(() => { setTime(null) }, [date])

  // Set default modality based on specialist's offering
  useEffect(() => {
    if (!specialist) return
    setModality(specialist.modality === 'Presencial' ? 'Presencial' : 'Online')
  }, [specialist])

  // Derived
  const filtered = useMemo(() => {
    if (filter === 'Todos') return SPECIALISTS
    if (filter === 'Online') return SPECIALISTS.filter(s => s.modality !== 'Presencial')
    return SPECIALISTS.filter(s => s.modality !== 'Online')
  }, [filter])

  const availableTimes = date ? (TIMES_BY_DATE[date] ?? []) : []

  const specialistModalities = useMemo((): ('Online' | 'Presencial')[] => {
    if (!specialist) return ['Online', 'Presencial']
    if (specialist.modality === 'Online') return ['Online']
    if (specialist.modality === 'Presencial') return ['Presencial']
    return ['Online', 'Presencial']
  }, [specialist])

  // Navigation handlers
  function goToDataHora() {
    setStep('data-hora')
    setDhState('loading')
    setDate(null)
    setTime(null)
  }

  function goToConfirmacao() {
    setStep('confirmacao')
    setConfState('loaded')
  }

  function confirmBooking() {
    setConfState('confirming')
    // Simulate API call: ~20% chance of conflict to demonstrate that state
    setTimeout(() => {
      if (Math.random() < 0.2) {
        setConfState('conflict')
      } else {
        setStep('sucesso')
      }
    }, 2000)
  }

  function retryFromConflict() {
    setStep('data-hora')
    setDhState('loaded')
    setTime(null)
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
      {step === 'especialista' && (
        <StepEspecialista
          state={espState}
          filter={filter}
          onFilterChange={setFilter}
          filtered={filtered}
          selected={specialist}
          onSelect={setSpecialist}
          onNext={goToDataHora}
          onRetry={() => setEspState('loading')}
        />
      )}

      {step === 'data-hora' && (
        <StepDataHora
          state={dhState}
          specialist={specialist!}
          modalities={specialistModalities}
          modalityChoice={modality}
          onModalityChange={setModality}
          dates={DATES}
          selectedDate={date}
          onDateSelect={setDate}
          availableTimes={availableTimes}
          selectedTime={time}
          onTimeSelect={setTime}
          onBack={() => setStep('especialista')}
          onNext={goToConfirmacao}
          onRetry={() => setDhState('loading')}
        />
      )}

      {step === 'confirmacao' && (
        <StepConfirmacao
          state={confState}
          specialist={specialist!}
          date={date!}
          time={time!}
          modality={modality}
          onBack={() => setStep('data-hora')}
          onConfirm={confirmBooking}
          onChangeTime={retryFromConflict}
        />
      )}

      {step === 'sucesso' && (
        <StepSucesso
          specialist={specialist!}
          date={date!}
          time={time!}
          modality={modality}
        />
      )}
    </div>
  )
}

// ─── Step 1: Escolha de especialista ────────────────────────────────────────

function StepEspecialista({
  state, filter, onFilterChange, filtered, selected, onSelect, onNext, onRetry,
}: {
  state: EspecialistaState
  filter: ModalFilter
  onFilterChange: (f: ModalFilter) => void
  filtered: Specialist[]
  selected: Specialist | null
  onSelect: (s: Specialist) => void
  onNext: () => void
  onRetry: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" title="Com quem quer consultar?" rightIcons={0} onBack={() => {}} />

      {/* Loading */}
      {state === 'loading' && (
        <div style={{
          flex: 1, padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-04)',
        }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-03)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'var(--color-surface-subtle)', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)' }}>
                <div style={{ height: 16, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '60%' }} />
                <div style={{ height: 14, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {state === 'error' && (
        <div style={{ flex: 1, padding: 'var(--spacing-06)' }}>
          <Callout
            status="Alert"
            title="Não foi possível carregar os especialistas"
            description="Verifique sua conexão e tente novamente."
            showLink={true}
            linkLabel="Tentar novamente"
            onLinkClick={onRetry}
            width="100%"
          />
        </div>
      )}

      {/* Loaded */}
      {state === 'loaded' && (
        <>
          {/* Filter chips */}
          <div
            style={{
              display: 'flex', gap: 'var(--spacing-02)', overflowX: 'auto',
              scrollbarWidth: 'none', padding: 'var(--spacing-04) var(--spacing-06)',
              borderBottom: '1px solid var(--color-divider)', flexShrink: 0,
            }}
            className="flex-nowrap"
          >
            {(['Todos', 'Online', 'Presencial'] as ModalFilter[]).map(f => (
              <div key={f} className="shrink-0">
                <Chip
                  label={f} variant="text" size="small"
                  state={filter === f ? 'selected' : 'idle'}
                  onClick={() => onFilterChange(f)}
                />
              </div>
            ))}
          </div>

          {/* Empty (filtered) */}
          {filtered.length === 0 ? (
            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 'var(--spacing-04)', padding: 'var(--spacing-06)',
            }}>
              <Icon name="stethoscope" size={32} color="var(--color-content-tertiary)" />
              <p style={{
                fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
                color: 'var(--color-content-secondary)', textAlign: 'center', margin: 0,
              }}>
                Nenhum especialista disponível para essa modalidade
              </p>
              <Button
                label="Ver todos os especialistas" style="secondary" size="medium"
                onClick={() => onFilterChange('Todos')}
              />
            </div>
          ) : (
            /* Specialist list */
            <div className="flex-1 overflow-y-auto">
              {filtered.map((s, i) => (
                <ListItem
                  key={s.id}
                  title={s.name}
                  description={`${s.specialty} · ${s.modality}`}
                  size="small"
                  leftSide="image"
                  imageSrc={s.imageUrl}
                  rightAsset="text-icon"
                  rightText={s.nextSlot}
                  divider={i < filtered.length - 1}
                  state={selected?.id === s.id ? 'pressed' : 'default'}
                  onClick={() => onSelect(s)}
                />
              ))}
            </div>
          )}

          {/* CTA — outside scroll per Rule K */}
          <div style={{
            padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
            borderTop: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)',
            flexShrink: 0,
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

// ─── Step 2: Data e horário ──────────────────────────────────────────────────

function StepDataHora({
  state, specialist, modalities, modalityChoice, onModalityChange,
  dates, selectedDate, onDateSelect, availableTimes, selectedTime, onTimeSelect,
  onBack, onNext, onRetry,
}: {
  state: DataHoraState
  specialist: Specialist
  modalities: ('Online' | 'Presencial')[]
  modalityChoice: 'Online' | 'Presencial'
  onModalityChange: (m: 'Online' | 'Presencial') => void
  dates: string[]
  selectedDate: string | null
  onDateSelect: (d: string) => void
  availableTimes: string[]
  selectedTime: string | null
  onTimeSelect: (t: string) => void
  onBack: () => void
  onNext: () => void
  onRetry: () => void
}) {
  const canProceed = !!selectedDate && !!selectedTime

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" title="Quando quer consultar?" rightIcons={0} onBack={onBack} />

      {/* Loading */}
      {state === 'loading' && (
        <div style={{
          flex: 1, padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
        }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
              <div style={{ height: 14, borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--color-surface-subtle)', width: '30%' }} />
              <div style={{ display: 'flex', gap: 'var(--spacing-02)' }}>
                {[...Array(4)].map((_, j) => (
                  <div key={j} style={{ width: 56, height: 36, borderRadius: 'var(--radius-pill)', backgroundColor: 'var(--color-surface-subtle)' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {state === 'error' && (
        <div style={{ flex: 1, padding: 'var(--spacing-06)' }}>
          <Callout
            status="Alert"
            title="Não foi possível carregar as disponibilidades"
            description="Verifique sua conexão e tente novamente."
            showLink={true} linkLabel="Tentar novamente"
            onLinkClick={onRetry}
            width="100%"
          />
        </div>
      )}

      {/* Empty — no slots available at all */}
      {state === 'empty' && (
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 'var(--spacing-04)', padding: 'var(--spacing-06)',
        }}>
          <Icon name="calendar" size={32} color="var(--color-content-tertiary)" />
          <p style={{
            fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
            color: 'var(--color-content-secondary)', textAlign: 'center', margin: 0,
          }}>
            {specialist.name} não tem disponibilidade para o período exibido
          </p>
          <Button
            label="Escolher outro especialista" style="secondary" size="medium"
            onClick={onBack}
          />
        </div>
      )}

      {/* Loaded / Conflict */}
      {(state === 'loaded' || state === 'conflict') && (
        <>
          <div className="flex-1 overflow-y-auto">
            <div style={{
              padding: 'var(--spacing-06)',
              display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
            }}>

              {/* Conflict warning — slot taken */}
              {state === 'conflict' && (
                <Callout
                  status="Alert"
                  title="Horário indisponível"
                  description="Este horário acabou de ser reservado. Escolha outro para continuar."
                  width="100%"
                />
              )}

              {/* Tipo de atendimento — only shows when specialist offers both */}
              {modalities.length > 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
                  <p style={{
                    fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: 'var(--color-content-secondary)', margin: 0,
                  }}>
                    Tipo de atendimento
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-02)' }}>
                    {modalities.map(m => (
                      <Chip
                        key={m} label={m} variant="text" size="small"
                        state={modalityChoice === m ? 'selected' : 'idle'}
                        onClick={() => onModalityChange(m)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Dia */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
                <p style={{
                  fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-regular)',
                  color: 'var(--color-content-secondary)', margin: 0,
                }}>
                  Dia
                </p>
                <div
                  style={{ display: 'flex', gap: 'var(--spacing-02)', overflowX: 'auto', scrollbarWidth: 'none' }}
                  className="flex-nowrap"
                >
                  {dates.map(d => (
                    <div key={d} className="shrink-0">
                      <Chip
                        label={d} variant="text" size="small"
                        state={selectedDate === d ? 'selected' : 'idle'}
                        onClick={() => onDateSelect(d)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Horário — progressive: only appears after date is selected */}
              {selectedDate && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
                  <p style={{
                    fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-regular)',
                    color: 'var(--color-content-secondary)', margin: 0,
                  }}>
                    Horário
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-02)', flexWrap: 'wrap' }}>
                    {availableTimes.map(t => (
                      <Chip
                        key={t} label={t} variant="text" size="small"
                        state={selectedTime === t ? 'selected' : 'idle'}
                        onClick={() => onTimeSelect(t)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA — outside scroll per Rule K */}
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

// ─── Step 3: Confirmação ─────────────────────────────────────────────────────

function StepConfirmacao({
  state, specialist, date, time, modality, onBack, onConfirm, onChangeTime,
}: {
  state: ConfirmacaoState
  specialist: Specialist
  date: string
  time: string
  modality: 'Online' | 'Presencial'
  onBack: () => void
  onConfirm: () => void
  onChangeTime: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" title="Confirmar agendamento" rightIcons={0} onBack={onBack} />

      <div className="flex-1 overflow-y-auto">
        <div style={{
          padding: 'var(--spacing-06)',
          display: 'flex', flexDirection: 'column', gap: 'var(--spacing-06)',
        }}>

          {/* Conflict — slot taken during confirmation */}
          {state === 'conflict' && (
            <Callout
              status="Alert"
              title="Horário reservado"
              description="Este horário foi escolhido por outra pessoa enquanto você revisava. Escolha um novo horário para continuar."
              showLink={true} linkLabel="Escolher outro horário"
              onLinkClick={onChangeTime}
              width="100%"
            />
          )}

          {/* Especialista */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)', margin: 0,
            }}>
              Especialista
            </p>
            <CardMFC
              style="compact"
              name={specialist.name}
              label={specialist.specialty}
              modality={specialist.modality}
              imageUrl={specialist.imageUrl}
              width="100%"
            />
          </div>

          {/* Data e horário */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
            <p style={{
              fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-regular)',
              color: 'var(--color-content-secondary)', margin: 0,
            }}>
              Data e horário
            </p>
            <BaseCard
              size="small"
              filled={false}
              showCategory={true}
              category="Primeira consulta"
              showTitle={true}
              title={`${date} Dez · ${time}`}
              showSubtitle={true}
              subtitle={modality}
              leftAsset={false}
              rightAsset={false}
              action={state === 'conflict' ? 'none' : 'link'}
              linkLabel="Alterar"
              onClick={onChangeTime}
              width="100%"
            />
          </div>
        </div>
      </div>

      {/* CTA — outside scroll per Rule K */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0,
      }}>
        <Button
          label="Confirmar agendamento"
          style="primary" size="large"
          state={
            state === 'confirming' ? 'loading' :
            state === 'conflict'   ? 'disabled' :
            'enabled'
          }
          className="w-full"
          onClick={onConfirm}
        />
      </div>
    </div>
  )
}

// ─── Step 4: Sucesso ─────────────────────────────────────────────────────────

function StepSucesso({
  specialist, date, time, modality,
}: {
  specialist: Specialist
  date: string
  time: string
  modality: 'Online' | 'Presencial'
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
                <Icon name="checkOutlined" size={36} color="var(--color-gray-white)" />
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
                Agendamento{' '}
                <span style={{ color: 'var(--color-brand)' }}>confirmado!</span>
              </h1>
              <p style={{
                fontFamily: 'var(--font-family-label)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-content-secondary)',
                textAlign: 'center', margin: 0, lineHeight: 1.5,
              }}>
                Você vai receber uma confirmação por e-mail e uma notificação no app.
              </p>
            </div>
          </div>

          {/* Doctor */}
          <CardMFC
            style="compact"
            name={specialist.name}
            label={specialist.specialty}
            modality={specialist.modality}
            imageUrl={specialist.imageUrl}
            width="100%"
          />

          {/* Appointment summary */}
          <BaseCard
            size="small"
            filled={true}
            showCategory={true}
            category="Primeira consulta"
            showTitle={true}
            title={`${date} Dez · ${time}`}
            showSubtitle={true}
            subtitle={modality}
            leftAsset={false}
            rightAsset={false}
            action="none"
            width="100%"
          />
        </div>
      </div>

      {/* CTAs — outside scroll, two actions per Rule Q */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)',
      }}>
        <Button
          label="Ver meus agendamentos"
          style="primary" size="large" state="enabled"
          className="w-full" onClick={() => {}}
        />
        <Button
          label="Ir para o início"
          style="tertiary" size="large" state="enabled"
          className="w-full" onClick={() => {}}
        />
      </div>
    </div>
  )
}
