import React, { useState, useEffect, useMemo } from 'react'
import { NavBar }   from '../components/NavBar/NavBar'
import { Button }   from '../components/Button/Button'
import { Chip }     from '../components/Chip/Chip'
import { ListItem } from '../components/ListItem/ListItem'
import { Callout }  from '../components/Callout/Callout'
import { Icon }     from '../icons/Icon'

// ─── Missing DS element ──────────────────────────────────────────────────────
function MissingTag({ label }: { label: string }) {
  return (
    <div style={{
      position: 'absolute', top: 'var(--spacing-02)', right: 'var(--spacing-02)',
      backgroundColor: '#E53935', color: 'var(--color-gray-white)',
      fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-family-base)',
      fontWeight: 'var(--font-weight-medium)', padding: '2px 8px',
      borderRadius: 'var(--radius-pill)', zIndex: 10,
    }}>{label}</div>
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────
type FlowStep     = 'exame' | 'laboratorio' | 'revisao' | 'protocolo'
type ViewState    = 'loading' | 'loaded' | 'empty' | 'error'
type RevisaoState = 'loaded' | 'sending' | 'error'
type ExameFilter  = 'Todos' | 'Sangue' | 'Imagem' | 'Cardiologia'
type LabFilter    = 'Todos' | 'Próximos' | 'Zona Sul' | 'Zona Norte'
type LabZona      = 'Próximos' | 'Zona Sul' | 'Zona Norte'

interface Exame {
  id: string
  nome: string
  categoria: 'Sangue' | 'Imagem' | 'Cardiologia'
  cobertura: number
  resultadoEm: string
  precisaJejum: boolean
  instrucaoJejum?: string
  coparticipacao?: string
}

interface Laboratorio {
  id: string
  nome: string
  endereco: string
  bairro: string
  distancia: string
  horario: string
  disponivel: boolean
  zonas: LabZona[]
}

// ─── Data ────────────────────────────────────────────────────────────────────
const EXAMES: Exame[] = [
  { id: '1', nome: 'Hemograma completo',         categoria: 'Sangue',      cobertura: 100, resultadoEm: '1 dia',   precisaJejum: false },
  { id: '2', nome: 'Glicemia em jejum',           categoria: 'Sangue',      cobertura: 100, resultadoEm: '1 dia',   precisaJejum: true,  instrucaoJejum: 'Jejum de 8 horas antes da coleta.' },
  { id: '3', nome: 'Colesterol total e frações',  categoria: 'Sangue',      cobertura: 100, resultadoEm: '2 dias',  precisaJejum: true,  instrucaoJejum: 'Jejum de 12 horas antes da coleta.' },
  { id: '4', nome: 'Vitamina D (25-OH)',           categoria: 'Sangue',      cobertura: 70,  resultadoEm: '3 dias',  precisaJejum: false, coparticipacao: 'R$ 34,00' },
  { id: '5', nome: 'TSH ultrassensível',           categoria: 'Sangue',      cobertura: 100, resultadoEm: '2 dias',  precisaJejum: false },
  { id: '6', nome: 'Eletrocardiograma',            categoria: 'Cardiologia', cobertura: 100, resultadoEm: 'na hora', precisaJejum: false },
  { id: '7', nome: 'Raio-X de tórax',              categoria: 'Imagem',      cobertura: 100, resultadoEm: '1 dia',   precisaJejum: false },
]

const LABORATORIOS: Laboratorio[] = [
  { id: '1', nome: 'Fleury',            endereco: 'Rua Oscar Freire, 1.482',                    bairro: 'Pinheiros',           distancia: '1,2 km', horario: 'Aberto até 18h', disponivel: true,  zonas: ['Próximos', 'Zona Sul'] },
  { id: '2', nome: 'DASA Diagnósticos', endereco: 'Av. Brigadeiro Faria Lima, 2.277',           bairro: 'Itaim Bibi',          distancia: '2,8 km', horario: 'Aberto até 20h', disponivel: true,  zonas: ['Próximos', 'Zona Sul'] },
  { id: '3', nome: 'Einstein Lab',      endereco: 'Av. Albert Einstein, 627',                    bairro: 'Morumbi',             distancia: '6,1 km', horario: 'Aberto até 17h', disponivel: false, zonas: ['Zona Sul'] },
  { id: '4', nome: 'Lavoisier',         endereco: 'Rua Dr. Alceu de Campos Rodrigues, 247',     bairro: 'Vila Nova Conceição', distancia: '3,5 km', horario: 'Aberto até 19h', disponivel: true,  zonas: ['Próximos', 'Zona Sul'] },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getExameIcon(categoria: Exame['categoria']): string {
  switch (categoria) {
    case 'Sangue':      return 'microscope'
    case 'Cardiologia': return 'heart-pulse'
    case 'Imagem':      return 'image-outline'
  }
}

// ─── Passo 1: Qual exame você precisa? ───────────────────────────────────────
interface StepExameProps {
  onNext: (exame: Exame) => void
}

function StepExame({ onNext }: StepExameProps) {
  const [viewState, setViewState]           = useState<ViewState>('loading')
  const [filter, setFilter]                 = useState<ExameFilter>('Todos')
  const [selectedExameId, setSelectedExameId] = useState<string | null>(null)

  useEffect(() => {
    if (viewState !== 'loading') return
    const t = setTimeout(() => setViewState('loaded'), 1500)
    return () => clearTimeout(t)
  }, [viewState])

  const filtered = useMemo(() => {
    if (filter === 'Todos') return EXAMES
    return EXAMES.filter(e => e.categoria === filter)
  }, [filter])

  const selectedExame = selectedExameId ? EXAMES.find(e => e.id === selectedExameId) ?? null : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" showTitle={false} rightIcons={0} />
      <div style={{ padding: 'var(--spacing-06) var(--spacing-06) var(--spacing-04)', flexShrink: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-primary)',
          margin: 0,
          lineHeight: 'var(--line-height-title)',
        }}>Qual exame você precisa?</h1>
      </div>

      {/* Loading */}
      {viewState === 'loading' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          gap: 'var(--spacing-02)', padding: '0 var(--spacing-06)' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              height: 62,
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--color-surface-subtle)',
            }} />
          ))}
        </div>
      )}

      {/* Loaded */}
      {viewState === 'loaded' && (
        <>
          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 'var(--spacing-02)', overflowX: 'auto',
            scrollbarWidth: 'none', padding: 'var(--spacing-04) var(--spacing-06)',
            borderBottom: '1px solid var(--color-divider)', flexShrink: 0 }}
            className="flex-nowrap">
            {(['Todos', 'Sangue', 'Imagem', 'Cardiologia'] as ExameFilter[]).map(f => (
              <div key={f} className="shrink-0">
                <Chip label={f} variant="text" size="small"
                  state={filter === f ? 'selected' : 'idle'}
                  onClick={() => setFilter(f)} />
              </div>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: 'var(--spacing-12) var(--spacing-06)', gap: 'var(--spacing-04)' }}>
                <Icon name="magnify-close" size={32} color="var(--color-content-tertiary)" />
                <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-content-secondary)', textAlign: 'center', margin: 0 }}>
                  Nenhum exame encontrado nesta categoria
                </p>
                <Button label="Ver todos os exames" style="secondary" size="medium"
                  onClick={() => setFilter('Todos')} />
              </div>
            ) : (
              <div style={{ padding: 'var(--spacing-04) var(--spacing-06)',
                display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)',
                paddingBottom: 'var(--spacing-08)' }}>
                {filtered.map(exame => (
                  <div key={exame.id}>
                    {/* Selection wrapper — brand border on selected */}
                    <div
                      style={{
                        borderRadius: 'var(--radius-xs)',
                        border: `1px solid ${selectedExameId === exame.id ? 'var(--color-brand)' : 'var(--color-stroke)'}`,
                        backgroundColor: selectedExameId === exame.id ? 'var(--color-magenta-00)' : 'var(--color-surface)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedExameId(exame.id)}
                    >
                      <ListItem
                        title={exame.nome}
                        description={`Resultado em ${exame.resultadoEm} · ${exame.cobertura < 100 ? `${exame.cobertura}% de cobertura` : 'Cobertura 100%'}`}
                        size="small"
                        leftSide="icon"
                        icon={<Icon name={getExameIcon(exame.categoria)} size={20} color="var(--color-content-primary)" />}
                        rightAsset="none"
                        divider={false}
                      />
                    </div>
                    {/* Callout cobertura parcial — progressive disclosure após seleção */}
                    {selectedExameId === exame.id && exame.cobertura < 100 && (
                      <div style={{ marginTop: 'var(--spacing-02)' }}>
                        <Callout
                          status="Information"
                          title="Cobertura parcial"
                          description={`Este exame tem cobertura de ${exame.cobertura}%. Coparticipação estimada: ${exame.coparticipacao}.`}
                          width="100%"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA — fora do scroll (Rule K) */}
          <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
            borderTop: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)', flexShrink: 0 }}>
            <Button
              label={selectedExame ? `Solicitar ${selectedExame.nome.toLowerCase()}` : 'Escolha um exame'}
              style="primary" size="large"
              state={selectedExameId ? 'enabled' : 'disabled'}
              className="w-full"
              onClick={() => { if (selectedExame) onNext(selectedExame) }}
            />
          </div>
        </>
      )}

      {/* Error */}
      {viewState === 'error' && (
        <div style={{ padding: 'var(--spacing-06)', display: 'flex', flexDirection: 'column',
          gap: 'var(--spacing-04)' }}>
          <Callout status="Alert" title="Não foi possível carregar os exames"
            description="Verifique sua conexão e tente novamente." width="100%" />
          <Button label="Tentar novamente" style="secondary" size="medium"
            onClick={() => setViewState('loading')} />
        </div>
      )}
    </div>
  )
}

// ─── Passo 2: Onde quer fazer? ────────────────────────────────────────────────
interface StepLaboratorioProps {
  exame: Exame
  onNext: (lab: Laboratorio) => void
  onBack: () => void
}

function StepLaboratorio({ exame, onNext, onBack }: StepLaboratorioProps) {
  const [viewState, setViewState]         = useState<ViewState>('loading')
  const [filter, setFilter]               = useState<LabFilter>('Todos')
  const [selectedLabId, setSelectedLabId] = useState<string | null>(null)

  useEffect(() => {
    if (viewState !== 'loading') return
    const t = setTimeout(() => setViewState('loaded'), 1200)
    return () => clearTimeout(t)
  }, [viewState])

  const filtered = useMemo(() => {
    if (filter === 'Todos') return LABORATORIOS
    return LABORATORIOS.filter(lab => lab.zonas.includes(filter as LabZona))
  }, [filter])

  const selectedLab = selectedLabId ? LABORATORIOS.find(l => l.id === selectedLabId) ?? null : null
  const hasUnavailable = filtered.some(lab => !lab.disponivel)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" showTitle={false} rightIcons={0} onBack={onBack} />
      <div style={{ padding: 'var(--spacing-06) var(--spacing-06) var(--spacing-04)', flexShrink: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-primary)',
          margin: 0,
          lineHeight: 'var(--line-height-title)',
        }}>Onde quer fazer?</h1>
      </div>

      {/* Loading */}
      {viewState === 'loading' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
          gap: 'var(--spacing-02)', padding: '0 var(--spacing-06)' }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              height: 62,
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--color-surface-subtle)',
            }} />
          ))}
        </div>
      )}

      {/* Loaded */}
      {viewState === 'loaded' && (
        <>
          {/* Contexto do passo anterior */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-02)',
            padding: 'var(--spacing-03) var(--spacing-06)',
            borderBottom: '1px solid var(--color-divider)', flexShrink: 0 }}>
            <Icon name={getExameIcon(exame.categoria)} size={14} color="var(--color-content-tertiary)" />
            <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-xs)',
              color: 'var(--color-content-secondary)', margin: 0 }}>
              {exame.nome}
            </p>
          </div>

          {/* Filter chips */}
          <div style={{ display: 'flex', gap: 'var(--spacing-02)', overflowX: 'auto',
            scrollbarWidth: 'none', padding: 'var(--spacing-04) var(--spacing-06)',
            borderBottom: '1px solid var(--color-divider)', flexShrink: 0 }}
            className="flex-nowrap">
            {(['Todos', 'Próximos', 'Zona Sul', 'Zona Norte'] as LabFilter[]).map(f => (
              <div key={f} className="shrink-0">
                <Chip label={f} variant="text" size="small"
                  state={filter === f ? 'selected' : 'idle'}
                  onClick={() => setFilter(f)} />
              </div>
            ))}
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: 'var(--spacing-12) var(--spacing-06)', gap: 'var(--spacing-04)' }}>
                <Icon name="map-marker-off-outline" size={32} color="var(--color-content-tertiary)" />
                <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-content-secondary)', textAlign: 'center', margin: 0 }}>
                  Nenhum laboratório nesta região
                </p>
                <Button label="Ver todos os laboratórios" style="secondary" size="medium"
                  onClick={() => setFilter('Todos')} />
              </div>
            ) : (
              <div style={{ padding: 'var(--spacing-04) var(--spacing-06)',
                display: 'flex', flexDirection: 'column', gap: 'var(--spacing-02)',
                paddingBottom: 'var(--spacing-08)' }}>
                {/* Aviso sobre lab indisponível */}
                {hasUnavailable && (
                  <Callout status="Warning" title="Laboratório indisponível na região"
                    description="O Einstein Lab não está disponível para este exame no seu plano."
                    width="100%" />
                )}
                {filtered.map(lab => (
                  <div
                    key={lab.id}
                    style={{ opacity: lab.disponivel ? 1 : 0.4, pointerEvents: lab.disponivel ? 'auto' : 'none' }}
                  >
                    <div
                      style={{
                        borderRadius: 'var(--radius-xs)',
                        border: `1px solid ${selectedLabId === lab.id ? 'var(--color-brand)' : 'var(--color-stroke)'}`,
                        backgroundColor: selectedLabId === lab.id ? 'var(--color-magenta-00)' : 'var(--color-surface)',
                        overflow: 'hidden',
                        cursor: lab.disponivel ? 'pointer' : 'default',
                      }}
                      onClick={() => { if (lab.disponivel) setSelectedLabId(lab.id) }}
                    >
                      <ListItem
                        title={lab.nome}
                        description={`${lab.distancia} · ${lab.horario}`}
                        size="small"
                        leftSide="icon"
                        icon={<Icon name="map-marker-outline" size={20} color="var(--color-content-primary)" />}
                        rightAsset="none"
                        divider={false}
                      />
                      {/* Endereço completo — progressive disclosure após seleção */}
                      {selectedLabId === lab.id && (
                        <div style={{
                          display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-02)',
                          padding: 'var(--spacing-02) var(--spacing-04) var(--spacing-03)',
                          borderTop: '1px solid var(--color-divider)',
                          backgroundColor: 'var(--color-surface-bg)',
                        }}>
                          <Icon name="map-marker" size={14} color="var(--color-content-tertiary)"
                            style={{ marginTop: 2, flexShrink: 0 }} />
                          <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-content-secondary)', margin: 0, lineHeight: 1.5 }}>
                            {lab.endereco}, {lab.bairro}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA — fora do scroll (Rule K) */}
          <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
            borderTop: '1px solid var(--color-stroke)',
            backgroundColor: 'var(--color-surface)', flexShrink: 0 }}>
            <Button
              label={selectedLab ? `Ir com ${selectedLab.nome}` : 'Escolha um laboratório'}
              style="primary" size="large"
              state={selectedLabId ? 'enabled' : 'disabled'}
              className="w-full"
              onClick={() => { if (selectedLab) onNext(selectedLab) }}
            />
          </div>
        </>
      )}

      {/* Error */}
      {viewState === 'error' && (
        <div style={{ padding: 'var(--spacing-06)', display: 'flex', flexDirection: 'column',
          gap: 'var(--spacing-04)' }}>
          <Callout status="Alert" title="Não foi possível carregar os laboratórios"
            description="Verifique sua conexão e tente novamente." width="100%" />
          <Button label="Tentar novamente" style="secondary" size="medium"
            onClick={() => setViewState('loading')} />
        </div>
      )}
    </div>
  )
}

// ─── Passo 3: Revise sua solicitação ─────────────────────────────────────────
interface StepRevisaoProps {
  exame: Exame
  lab: Laboratorio
  onSuccess: () => void
  onBack: () => void
}

function StepRevisao({ exame, lab, onSuccess, onBack }: StepRevisaoProps) {
  const [state, setState] = useState<RevisaoState>('loaded')

  function enviar() {
    setState('sending')
    setTimeout(() => {
      if (Math.random() < 0.8) {
        onSuccess()
      } else {
        setState('error')
      }
    }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" showTitle={false} rightIcons={0}
        onBack={state === 'sending' ? () => {} : onBack} />
      <div style={{ padding: 'var(--spacing-06) var(--spacing-06) var(--spacing-04)', flexShrink: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-primary)',
          margin: 0,
          lineHeight: 'var(--line-height-title)',
        }}>Revise sua solicitação</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div style={{ padding: 'var(--spacing-06)', display: 'flex', flexDirection: 'column',
          gap: 'var(--spacing-06)', paddingBottom: 'var(--spacing-08)' }}>

          {/* Callout de erro */}
          {state === 'error' && (
            <Callout status="Alert" title="Não foi possível enviar"
              description="Ocorreu um erro ao enviar sua solicitação. Tente novamente."
              width="100%" />
          )}

          {/* Exame */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)', color: 'var(--color-content-primary)',
              margin: '0 0 var(--spacing-04)' }}>
              Exame
            </h2>
            <ListItem
              title={exame.nome}
              description={`Resultado em ${exame.resultadoEm}${exame.cobertura < 100 ? ` · Coparticipação ${exame.coparticipacao}` : ' · Cobertura 100%'}`}
              size="small"
              leftSide="icon"
              icon={<Icon name={getExameIcon(exame.categoria)} size={20} color="var(--color-content-primary)" />}
              rightAsset="none"
              divider={false}
            />
          </div>

          {/* Laboratório */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)', color: 'var(--color-content-primary)',
              margin: '0 0 var(--spacing-04)' }}>
              Laboratório
            </h2>
            <ListItem
              title={lab.nome}
              description={lab.bairro}
              size="small"
              leftSide="icon"
              icon={<Icon name="map-marker-outline" size={20} color="var(--color-content-primary)" />}
              rightAsset="none"
              divider={true}
            />
            <ListItem
              title={lab.endereco}
              description={lab.distancia}
              size="small"
              leftSide="icon"
              icon={<Icon name="road-variant" size={20} color="var(--color-content-primary)" />}
              rightAsset="none"
              divider={false}
            />
          </div>

          {/* Prazo */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)', color: 'var(--color-content-primary)',
              margin: '0 0 var(--spacing-04)' }}>
              Prazo de autorização
            </h2>
            <ListItem
              title="2 dias úteis"
              description="Você receberá uma notificação quando a autorização for aprovada"
              size="small"
              leftSide="icon"
              icon={<Icon name="clock-outline" size={20} color="var(--color-content-primary)" />}
              rightAsset="none"
              divider={false}
            />
          </div>

          {/* Callout de preparo — só aparece quando o exame precisa de jejum */}
          {exame.precisaJejum && (
            <Callout
              status="Information"
              title="Preparo necessário"
              description={exame.instrucaoJejum ?? 'Siga as orientações de preparo indicadas.'}
              width="100%"
            />
          )}
        </div>
      </div>

      {/* CTA — fora do scroll (Rule K) */}
      <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0 }}>
        <Button
          label={state === 'error' ? 'Tentar novamente' : 'Enviar solicitação'}
          style="primary" size="large"
          state={state === 'sending' ? 'loading' : 'enabled'}
          className="w-full"
          onClick={() => { if (state !== 'sending') enviar() }}
        />
      </div>
    </div>
  )
}

// ─── Passo 4: Protocolo gerado ────────────────────────────────────────────────
interface StepProtocoloProps {
  exame: Exame
  lab: Laboratorio
  onHome: () => void
}

function StepProtocolo({ exame, lab, onHome }: StepProtocoloProps) {
  const [protocolo] = useState(() => `ALI-2025-${Math.floor(Math.random() * 900000 + 100000)}`)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <NavBar type="page" showTitle={false} rightIcons={0} />
      <div style={{ padding: 'var(--spacing-06) var(--spacing-06) var(--spacing-04)', flexShrink: 0 }}>
        <h1 style={{
          fontFamily: 'var(--font-family-base)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: 'var(--font-weight-regular)',
          color: 'var(--color-content-primary)',
          margin: 0,
          lineHeight: 'var(--line-height-title)',
        }}>Solicitação enviada</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div style={{ padding: 'var(--spacing-06)', display: 'flex', flexDirection: 'column',
          gap: 'var(--spacing-08)', paddingBottom: 'var(--spacing-08)' }}>

          {/* Sucesso visual — fora do DS */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 'var(--spacing-05)', paddingTop: 'var(--spacing-08)' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                backgroundColor: 'var(--color-brand)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name="check-bold" size={40} color="var(--color-gray-white)" />
              </div>
              <MissingTag label="SuccessIcon — fora do DS" />
            </div>

            {/* Número do protocolo */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 'var(--spacing-01)' }}>
              <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-regular)', color: 'var(--color-content-secondary)',
                margin: 0 }}>
                Número do protocolo
              </p>
              <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-content-primary)',
                margin: 0 }}>
                {protocolo}
              </p>
            </div>

            <p style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              color: 'var(--color-content-secondary)', textAlign: 'center', margin: 0,
              lineHeight: 'var(--line-height-title-sm)' }}>
              Você receberá uma notificação em até 2 dias úteis quando a autorização for aprovada.
            </p>
          </div>

          {/* Resumo */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)', color: 'var(--color-content-primary)',
              margin: '0 0 var(--spacing-04)' }}>
              Resumo
            </h2>
            <ListItem
              title={exame.nome}
              description={exame.categoria}
              size="small"
              leftSide="icon"
              icon={<Icon name={getExameIcon(exame.categoria)} size={20} color="var(--color-content-primary)" />}
              rightAsset="none"
              divider={true}
            />
            <ListItem
              title={lab.nome}
              description={`${lab.bairro} · ${lab.distancia}`}
              size="small"
              leftSide="icon"
              icon={<Icon name="map-marker-outline" size={20} color="var(--color-content-primary)" />}
              rightAsset="none"
              divider={false}
            />
          </div>
        </div>
      </div>

      {/* CTAs de saída — Rule Q (dois CTAs no sucesso) */}
      <div style={{ padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)', flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: 'var(--spacing-03)' }}>
        <Button label="Acompanhar autorização" style="primary" size="large" className="w-full" />
        <Button label="Voltar para início" style="tertiary" size="large" className="w-full"
          onClick={onHome} />
      </div>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function SolicitacaoExameFlowScreen() {
  const [step, setStep]                   = useState<FlowStep>('exame')
  const [selectedExame, setSelectedExame] = useState<Exame | null>(null)
  const [selectedLab, setSelectedLab]     = useState<Laboratorio | null>(null)

  return (
    <div style={{
      width: 375, height: '100%',
      backgroundColor: 'var(--color-surface)',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
      overflow: 'hidden',
    }}>
      {step === 'exame' && (
        <StepExame
          onNext={(exame) => { setSelectedExame(exame); setStep('laboratorio') }}
        />
      )}
      {step === 'laboratorio' && selectedExame && (
        <StepLaboratorio
          exame={selectedExame}
          onNext={(lab) => { setSelectedLab(lab); setStep('revisao') }}
          onBack={() => setStep('exame')}
        />
      )}
      {step === 'revisao' && selectedExame && selectedLab && (
        <StepRevisao
          exame={selectedExame}
          lab={selectedLab}
          onSuccess={() => setStep('protocolo')}
          onBack={() => setStep('laboratorio')}
        />
      )}
      {step === 'protocolo' && selectedExame && selectedLab && (
        <StepProtocolo
          exame={selectedExame}
          lab={selectedLab}
          onHome={() => { setStep('exame'); setSelectedExame(null); setSelectedLab(null) }}
        />
      )}
    </div>
  )
}
