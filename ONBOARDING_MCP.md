# Wonderland DS — Como usar o Design System pelo Claude

Este guia é para designers e PMs que querem prototipar fluxos usando os componentes do Wonderland DS diretamente no Claude, sem precisar abrir código ou configurar ambiente de desenvolvimento.

---

## O que você vai conseguir fazer

Você descreve uma tela pro Claude e ele gera um protótipo funcional usando os componentes reais do DS — com os tokens certos, as props certas, e as regras de design já aplicadas.

**Exemplo:**
> "Cria uma tela de cadastro de dependente com campo de nome, data de nascimento e botão de confirmar"

O Claude consulta automaticamente os componentes disponíveis, os tokens de cor/espaçamento/tipografia, e gera o código pronto.

---

## Pré-requisitos

- [ ] [Claude Desktop](https://claude.ai/download) instalado
- [ ] [Node.js](https://nodejs.org) instalado (versão 18 ou superior)

---

## Instalação (5 minutos)

### 1. Configurar o acesso ao pacote

Abra o terminal e rode os dois comandos abaixo:

```bash
echo '@leobertonceli:registry=https://npm.pkg.github.com' >> ~/.npmrc
echo '//npm.pkg.github.com/:_authToken=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' >> ~/.npmrc
```

Isso configura o npm para buscar o pacote do DS no lugar certo.

### 2. Configurar o Claude Desktop

Abra o arquivo de configuração do Claude Desktop. No Mac, ele fica em:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

> Dica: no Finder, use `Cmd + Shift + G` e cole o caminho acima.

Adicione o bloco abaixo dentro do arquivo:

```json
{
  "mcpServers": {
    "wonderland-ds": {
      "command": "npx",
      "args": ["-y", "@leobertonceli/wonderland-ds-mcp"]
    }
  }
}
```

Se o arquivo já tiver conteúdo, adicione só a parte `"wonderland-ds": { ... }` dentro de `"mcpServers"`.

### 3. Reinicie o Claude Desktop

Feche e abra o Claude Desktop novamente.

---

## Como saber se funcionou

No Claude Desktop, clique no ícone de ferramentas (🔧). As ferramentas `list_components`, `get_component` e `get_tokens` devem aparecer na lista.

---

## Como usar

Basta conversar normalmente. O Claude vai consultar o DS automaticamente quando precisar.

**Algumas formas de começar:**

- *"Quais componentes estão disponíveis no DS?"*
- *"Cria uma tela de perfil com avatar, nome do usuário e lista de configurações"*
- *"Faz um fluxo de onboarding com 3 etapas"*
- *"Usa os tokens do DS para montar uma tela de confirmação de agendamento"*

---

## O que o DS tem disponível

**19 componentes:** Avatar, Badge, BottomBar, Button, Callout, Chip, ChatBubble, ChatInput, Checkbox, Icon, Link, ListItem, NavBar, Shortcut, Tabs, Tag, TextField, CardMFC, BaseCard

**Tokens de design:** cores, espaçamento, tipografia, border radius — tudo mapeado como variáveis CSS prontas para uso.

---

## Dúvidas

Fala com o Leo.
