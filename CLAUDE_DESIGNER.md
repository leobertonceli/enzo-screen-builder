# Wonderland Design System — Guia para Prototipagem

Você tem acesso ao **Wonderland DS da Alice Health** via MCP. Use isso para criar protótipos de telas rapidamente.

---

## Antes de criar qualquer tela

**Obrigatório:** chame as ferramentas do DS antes de escrever qualquer código:

1. `list_components` — veja o que existe
2. `get_component` — para cada componente que vai usar, veja as props exatas
3. `get_tokens` — tokens de cor, espaçamento e tipografia

**Nunca invente um componente se o DS já tem um que resolve.**

---

## Regras de uso

### Componentes
- Sempre use os componentes do DS — `Button`, `TextField`, `ListItem`, `Chip`, `NavBar`, etc.
- Nunca crie inputs, botões ou cards do zero com HTML/CSS puro
- Consulte `get_component` antes de usar qualquer componente para garantir as props certas

### Tokens
- **Cores:** sempre `var(--color-brand)`, `var(--color-content-primary)`, etc. — nunca `#BE0380` ou `#141414`
- **Espaçamento:** sempre `var(--spacing-04)`, `var(--spacing-06)`, etc. — nunca `16px`, `24px`
- **Tipografia:** sempre `var(--font-size-sm)`, `var(--font-weight-semibold)`, etc.
- **Border radius:** sempre `var(--radius-sm)`, `var(--radius-md)`, etc.
- Use `style={{ }}` inline para aplicar tokens — não use Tailwind para valores visuais

### Estrutura de tela
- Largura padrão: `375px` (mobile)
- Fundo: `var(--color-surface)`
- `fontFamily: 'var(--font-family-base)'` em todo texto que você escrever diretamente
- Telas com scroll: conteúdo em `div` com `flex-1 overflow-y-auto`, CTA **fora** do scroll

### NavBar e navegação
- Telas de fluxo (com botão voltar): use `<NavBar type="page" />`
- Modais (com botão fechar): use `<NavBar type="modal" />`
- Telas hub (home, tabs): use `<BottomBar />` — nunca NavBar
- Título da página vai em `<h1>` abaixo da NavBar, não na prop `title` da NavBar

### Ícones
- Use `<Icon name="..." />` — nomes em camelCase: `heartOutlined`, `chevronArrowRight`, `add`, `user`, `bell`, `localPin`
- Nunca use SVG inline para ícones padrão

---

## Template de tela

```tsx
export function MinhaTelaScreen() {
  return (
    <div style={{
      width: 375,
      minHeight: '100vh',
      backgroundColor: 'var(--color-surface)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-family-base)',
    }}>
      <NavBar type="page" showTitle={true} title="Título" />

      <div className="flex-1 overflow-y-auto" style={{ padding: 'var(--spacing-06)' }}>
        {/* conteúdo com scroll aqui */}
      </div>

      {/* CTA fixo fora do scroll */}
      <div style={{
        padding: 'var(--spacing-04) var(--spacing-06) var(--spacing-06)',
        borderTop: '1px solid var(--color-stroke)',
        backgroundColor: 'var(--color-surface)',
        flexShrink: 0,
      }}>
        <Button label="Confirmar" style="primary" size="large" className="w-full" />
      </div>
    </div>
  )
}
```

---

## Exemplos de prompt

- *"Cria uma tela de cadastro com nome, e-mail e botão de confirmar"*
- *"Faz um fluxo de agendamento de consulta com 3 etapas"*
- *"Monta uma tela de perfil com avatar, nome e lista de configurações"*
- *"Cria uma tela de resultado de busca com filtros em chips e lista de médicos"*
