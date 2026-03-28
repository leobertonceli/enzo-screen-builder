# Wonderland DS — Catálogo de Componentes

Inventário completo dos 30 componentes disponíveis. Para cada um: import path, props principais e exemplo de uso.

---

## Button
**Path:** `src/components/Button/Button.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `label` | string | `'Button label'` | qualquer texto |
| `style` | ButtonStyle | `'primary'` | `'primary'` `'secondary'` `'tertiary'` |
| `size` | ButtonSize | `'large'` | `'small'`(40px) `'medium'`(48px) `'large'`(56px) |
| `state` | ButtonState | `'enabled'` | `'enabled'` `'pressed'` `'disabled'` `'loading'` |
| `type` | ButtonType | `'text'` | `'text'` `'left-icon'` `'right-icon'` `'only-icon'` |
| `darkMode` | boolean | `false` | inverte cores para fundo escuro |
| `iconElement` | ReactNode | — | ícone customizado (default: chevrons/plus) |
| `className` | string | — | classes de layout (ex: `w-full`) |
| `onClick` | function | — | |

```tsx
// CTA principal full-width
<Button label="Falar no Alice Agora" style="primary" size="large" className="w-full" />

// Botão secundário médio
<Button label="Cancelar" style="secondary" size="medium" />

// Desabilitado
<Button label="Salvar" style="primary" size="large" state="disabled" />
```

---

## ListItem
**Path:** `src/components/ListItem/ListItem.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `title` | string | `'Title'` | |
| `description` | string | — | linha secundária abaixo do título |
| `size` | ListItemSize | `'large'` | `'large'`(md font) `'small'`(sm font) |
| `leftSide` | ListItemLeftSide | `'none'` | `'none'` `'icon'` `'image'` |
| `icon` | ReactNode | — | ícone customizado (leftSide="icon") |
| `imageSrc` | string | — | URL da imagem (leftSide="image") |
| `rightAsset` | ListItemRightAsset | `'icon'` | `'none'` `'icon'` `'text'` `'text-icon'` |
| `rightText` | string | `'Text'` | texto à direita (rightAsset="text") |
| `rightIconElement` | ReactNode | — | ícone customizado à direita |
| `divider` | boolean | `true` | **false no último item do grupo** |
| `fullWidth` | boolean | `true` | |
| `onClick` | function | — | |

```tsx
// Com ícone e chevron (padrão)
<ListItem
  title="Prontos-Socorros"
  size="small"
  leftSide="icon"
  icon={<Icon name="hospital-building" size={20} color="var(--color-content-primary)" />}
  rightAsset="icon"
  divider={true}
/>

// Último item do grupo — sem divider
<ListItem title="Sair" size="small" leftSide="icon"
  icon={<Icon name="logout" size={20} color="var(--color-content-primary)" />}
  rightAsset="icon" divider={false} />

// Com texto à direita
<ListItem title="Outubro" description="Em aberto"
  rightAsset="text-icon" rightText="R$ 890,00" divider={true} />
```

---

## Chip
**Path:** `src/components/Chip/Chip.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `label` | string | `'Suggestion'` | |
| `variant` | ChipVariant | `'text'` | `'text'` `'icon'` `'image'` |
| `size` | ChipSize | `'small'` | `'small'` `'medium'` `'large'` |
| `state` | ChipState | `'idle'` | `'idle'` `'pressed'` `'selected'` `'disabled'` |
| `showCounter` | boolean | `false` | mostra contador à direita |
| `counter` | string | `'000'` | |
| `affordanceIcon` | boolean | `false` | ícone X de fechar |
| `iconElement` | ReactNode | — | ícone (variant="icon") |
| `imageUrl` | string | — | imagem circular (variant="image") |
| `onClick` | function | — | |

```tsx
// Quick-reply chip (chat)
<Chip label="Estou em uma emergência" variant="text" size="small" state="idle" />

// Chip selecionado (filtro/seleção)
<Chip label="Online" variant="text" size="small" state="selected" />

// Chip com ícone
<Chip label="Filtrar" variant="icon" size="small" state="idle"
  iconElement={<Icon name="filter-variant" size={16} color="var(--color-content-primary)" />} />
```

---

## BaseCard
**Path:** `src/components/BaseCard/BaseCard.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `size` | CardSize | `'large'` | `'small'` `'large'` |
| `filled` | boolean | `false` | false=outlined(white), true=filled(gray-00) |
| `showCategory` | boolean | `true` | |
| `category` | string | `'Category'` | pequeno label em brand acima do título |
| `showTitle` | boolean | `true` | |
| `title` | string | `'Title'` | |
| `showSubtitle` | boolean | `true` | |
| `subtitle` | string | `'Subtitle'` | |
| `leftAsset` | boolean | `true` | mostra ícone/imagem esquerda |
| `leftIcon` | ReactNode | — | ícone customizado esquerdo |
| `leftImage` | string | — | URL de imagem esquerda |
| `rightAsset` | boolean | `true` | mostra ícone/imagem direita (absolute top-right) |
| `rightIcon` | ReactNode | — | |
| `rightImage` | string | — | |
| `action` | CardAction | `'none'` | `'none'` `'button'` `'2buttons'` `'link'` `'2links'` |
| `linkLabel` | string | `'Link label'` | |
| `buttonLabel` | string | `'Button label'` | |
| `showSlot` | boolean | `true` | slot de conteúdo customizado (full-width) |
| `slot` | ReactNode | — | conteúdo do slot |
| `width` | number\|string | `327` | |
| `onClick` | function | — | |

```tsx
// Card de ajuda (outlined, sem assets, com link)
<BaseCard
  size="small"
  filled={false}
  showCategory={false}
  title="Precisa de ajuda com sua rede credenciada?"
  showSubtitle={false}
  leftAsset={true}
  leftIcon={<Icon name="heart-outline" size={20} color="var(--color-brand)" />}
  rightAsset={false}
  showSlot={false}
  action="link"
  linkLabel="Falar no Alice Agora"
  width="100%"
/>

// Card de consulta (outlined, com categoria e link)
<BaseCard
  size="small"
  filled={false}
  showCategory={true}
  category="Próxima consulta"
  title="Ter, 04 de Março — 16h"
  showSubtitle={true}
  subtitle="Online com Isabella"
  leftAsset={false}
  rightAsset={false}
  showSlot={false}
  action="link"
  linkLabel="Ver consulta"
  width="100%"
/>
```

---

## NavBar
**Path:** `src/components/NavBar/NavBar.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `selected` | NavBarSelected | `'Alice Agora'` | `'Alice Agora'` `'Minha saúde'` `'Rede Alice'` `'Meu plano'` |
| `tab1Label` | string | `'Alice Agora'` | |
| `tab2Label` | string | `'Minha saúde'` | |
| `tab3Label` | string | `'Rede Alice'` | |
| `tab4Label` | string | `'Meu plano'` | |
| `tab1Icon` | string | `'heart'` | nome de ícone MDI |
| `tab2Icon` | string | `'pulse'` | |
| `tab3Icon` | string | `'map-marker'` | |
| `meuPlanoMode` | MeuPlanoMode | `'initials'` | `'photo'` `'initials'` |
| `userInitials` | string | — | iniciais do usuário (meuPlanoMode="initials") |
| `userImageUrl` | string | — | foto do usuário (meuPlanoMode="photo") |
| `width` | number\|string | `375` | |
| `onTabSelect` | function | — | |

```tsx
<NavBar
  selected="Minha saúde"
  meuPlanoMode="photo"
  userImageUrl={personPhoto}
  width={375}
/>
```

---

## CardMFC
**Path:** `src/components/CardMFC/CardMFC.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `style` | CardMFCStyle | `'highlighted'` | `'highlighted'`(tall card) `'compact'`(row com foto) |
| `name` | string | `'Isabella Moreira Hueb'` | |
| `label` | string | `'Minha médica'` | pequeno label acima do nome |
| `bio` | string | — | usado apenas em highlighted |
| `rating` | string | `'4.7'` | pill badge |
| `distance` | string | `'2.4 km'` | pill badge |
| `modality` | string | `'Online e presencial'` | pill badge |
| `imageUrl` | string | — | foto do médico |
| `imageInset` | object | — | ajuste do crop da foto |
| `linkLabel` | string | — | texto do link (default: 'Agendar consulta' ou 'Ver detalhes') |
| `width` | number\|string | `'100%'` | |
| `onLinkClick` | function | — | |

```tsx
// Compact — card com foto lateral (Minha saúde, Rede Alice)
<CardMFC
  style="compact"
  name="Isabella Moreira Hueb"
  label="Minha médica"
  imageUrl={mfcFabiana}
  linkLabel="Agendar consulta"
  width="100%"
/>

// Highlighted — card full com foto de fundo (perfil do médico)
<CardMFC
  style="highlighted"
  name="Daniela Barbour Lima"
  bio="Formada pela USP, com residência em Medicina de Família."
  rating="4.7"
  modality="Online e presencial"
  imageUrl={mfcManuela}
  linkLabel="Ver detalhes"
  width="100%"
/>
```

---

## Shortcut
**Path:** `src/components/Shortcut/Shortcut.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `type` | ShortcutType | `'callout'` | `'callout'`(full-width brand) `'support'`(half-width gray) |
| `state` | ShortcutState | `'idle'` | `'idle'` `'pressed'` `'disabled'` `'loading'` |
| `title` | string | `'Título'` | linha principal |
| `subtitle` | string | `'Subtítulo'` | label pequeno acima do título (callout only) |
| `badge` | boolean | `false` | mostra badge de contagem |
| `badgeCount` | number | `1` | |
| `icon` | ReactNode | — | ícone no topo |
| `onClick` | function | — | |

```tsx
// Callout — action card com tarefas (brand)
<Shortcut
  type="callout"
  state="idle"
  subtitle="Plano de ação"
  title="7 tarefas pendentes"
  icon={<Icon name="snowflake" size={24} color="var(--color-gray-white)" />}
/>

// Callout — sem tarefas (gray)
<Shortcut
  type="callout"
  state="disabled"
  subtitle="Plano de ação"
  title="Nenhuma tarefa pendente"
/>

// Support — shortcut card (2 por linha)
<Shortcut
  type="support"
  title="Meu médico"
  icon={<Icon name="stethoscope" size={24} color="var(--color-content-primary)" />}
/>
```

---

## AppBar
**Path:** `src/components/AppBar/AppBar.tsx`

Inclui StatusBar internamente (44px). Sempre use no topo da tela.

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `type` | AppBarType | `'home'` | `'home'` `'section'` `'brand'` `'search'` `'ia'` |
| `title` | string | `'Alice Agora'` | título centrado (section/brand) ou placeholder de busca |
| `subtitle` | string | — | subtítulo abaixo do título (section only) |
| `userName` | string | `'Leonardo'` | nome no greeting (home only) |
| `showRightIcons` | boolean | `true` | ícones utilitários à direita |
| `showProgressBar` | boolean | `false` | barra de progresso abaixo (brand/ia) |
| `onBack` | function | — | |
| `onAction1` | function | — | |
| `onAction2` | function | — | |

| Tipo | Layout | Uso |
|---|---|---|
| `home` | Avatar placeholder + greeting + ícones | Alice Agora landing |
| `section` | Chevron esquerdo + título centrado + ícones | Coparticipação, detalhe |
| `brand` | Menu + "alice" centrado + ícones | Marca/global |
| `search` | Chevron + campo de busca + ícones | Busca |
| `ia` | Chevron + círculo brand centrado + ícones | Chat IA |

```tsx
// Tela de detalhe com título centrado
<AppBar type="section" title="Coparticipação" />

// Tela de chat IA
<AppBar type="ia" showRightIcons={true} />
```

---

## Avatar
**Path:** `src/components/Avatar/Avatar.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `size` | AvatarSize | `'large'` | `'large'`(80px) `'medium'`(64px) `'small'`(48px) `'xsmall'`(32px) |
| `type` | AvatarType | `'placeholder'` | `'image'` `'placeholder'` |
| `status` | AvatarStatus | `'idle'` | `'idle'` `'active'`(brand ring) |
| `src` | string | — | URL da imagem (fallback: person.jpg) |

```tsx
// Avatar com foto, ativo
<Avatar size="medium" type="image" status="active" src={personPhoto} />

// Avatar placeholder
<Avatar size="small" type="placeholder" status="idle" />
```

---

## Tabs
**Path:** `src/components/Tabs/Tabs.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `style` | TabsStyle | `'texts'` | `'texts'`(underline) `'filter'`(pill) |
| `items` | TabItem[] | 3 labels padrão | `{ label: string, badge?: number }[]` |
| `activeIndex` | number | `0` | índice do tab ativo |
| `onChange` | function | — | `(index: number) => void` |

```tsx
<Tabs
  style="texts"
  items={[
    { label: 'Empresa' },
    { label: 'Especialista' },
    { label: 'Agendamento' },
  ]}
  activeIndex={activeTab}
  onChange={setActiveTab}
/>
```

---

## Tag
**Path:** `src/components/Tag/Tag.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `variant` | TagVariant | `'Red'` | `'Red'` `'Magenta'` `'Blue'` `'Green'` `'Orange'` `'Grey'` `'Disabled'` |
| `icon` | TagIconMode | `'Primary'` | `'Primary'` `'Semantic'` `'No icon'` |
| `label` | string | `'Label'` | |

```tsx
// Status fechado (verde)
<Tag variant="Green" icon="No icon" label="Setembro · Fechado" />

// Status em aberto (cinza)
<Tag variant="Grey" icon="No icon" label="Em aberto" />
```

---

## Link
**Path:** `src/components/Link/Link.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `label` | string | `'Link label'` | |
| `size` | LinkSize | `'large'` | `'small'`(14px) `'large'`(16px) |
| `context` | LinkContext | `'on-light'` | `'on-light'`(brand color) `'on-dark'`(branco) |
| `icon` | LinkIcon | `'none'` | `'none'` `'left'` `'right'` |
| `onClick` | function | — | |

```tsx
// Link dentro de card (padrão)
<Link label="Ver consulta" size="small" context="on-light" icon="none" />

// Link em fundo escuro
<Link label="Ver detalhes" size="small" context="on-dark" icon="none" />
```

---

## ChatInput
**Path:** `src/components/ChatInput/ChatInput.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `state` | ChatInputState | `'idle'` | `'idle'` `'focus'` `'typing'` `'recording'` `'transcribing'` `'loading'` `'disabled'` |
| `placeholder` | string | `'Descreva o que você precisa'` | |
| `value` | string | `''` | |
| `showMic` | boolean | `true` | |
| `showPlus` | boolean | `true` | false para chat simples |
| `reply` | boolean | `false` | mostra banner de reply |
| `replyName` | string | `'Clara Boris'` | |
| `replyMessage` | string | — | |
| `items` | ChatInputAttachedItem[] | `[]` | arquivos anexados |
| `width` | number\|string | `327` | |
| `onSend` | function | — | |
| `onMic` | function | — | |
| `onAdd` | function | — | |

```tsx
// Chat simples (Alice Agora)
<ChatInput
  state="idle"
  placeholder="Descreva o que você precisa"
  showPlus={false}
  showMic={true}
  width="100%"
/>
```

---

## ChatResponse
**Path:** `src/components/ChatResponse/ChatResponse.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `loading` | boolean | `false` | estado de carregamento com animação |
| `sender` | boolean | `true` | mostra avatar círculo brand da IA |
| `title` | string | `'Title'` | |
| `showTitle` | boolean | `true` | |
| `text` | string | — | corpo da mensagem |
| `time` | string | `'17:44'` | |
| `file` | ChatFileType | `'none'` | `'none'` `'media'` `'document'` |
| `suggestions` | string[] | — | chips de sugestão abaixo da mensagem |
| `reaction` | boolean | `false` | botão de reação |
| `reply` | boolean | `false` | bloco de resposta citada |
| `replyText` | string | — | |

```tsx
<ChatResponse
  sender={true}
  showTitle={false}
  text="Entendido! Vou verificar os especialistas disponíveis na sua região."
  time="17:44"
  suggestions={['Cardiologista', 'Clínico geral']}
/>
```

---

## ChatBubble
**Path:** `src/components/ChatBubble/ChatBubble.tsx`

Bolha de mensagem do usuário (lado direito do chat).

```tsx
<ChatBubble text="Preciso de um cardiologista" time="17:43" />
```

---

## BillBoard
**Path:** `src/components/BillBoard/BillBoard.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `type` | BillBoardType | `'action'` | `'action'`(200px brand) `'event'`(96px outlined) `'skeleton'` |
| `title` | string | `'Agendar consulta'` | |
| `address` | string | `'Rua Augusta, 1847'` | localização / subtítulo |
| `day` | string | `'24'` | dia (event only) |
| `month` | string | `'MAR'` | mês abreviado (event only) |
| `tag` | boolean | `true` | pill badge no topo (action only) |
| `tagLabel` | string | `'Hoje'` | |
| `onClick` | function | — | |

```tsx
// Card de ação brand
<BillBoard type="action" title="Agendar consulta" address="Online" tag={true} tagLabel="Hoje" />

// Card de evento compacto
<BillBoard type="event" title="Consulta com Isabella" address="Online" day="04" month="NOV" />
```

---

## CardSection
**Path:** `src/components/CardSection/CardSection.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `type` | CardSectionType | `'brand'` | `'brand'`(off-magenta-00) `'primary'`(white) `'skeleton'` |
| `size` | CardSectionSize | `'responsive'` | `'responsive'`(410px) `'large'` `'medium'` `'small'` `'xsmall'` |
| `title` | string | `'Título'` | |
| `description` | string | — | |
| `icon` | ReactNode | — | ícone no topo |
| `ctaLabel` | string | `'Saiba mais'` | |
| `onCta` | function | — | |

```tsx
// Alice Agora landing card
<CardSection
  type="brand"
  size="medium"
  title="Diogo, como podemos te ajudar hoje?"
  description="Te ajudamos em emergências, queixas de saúde e gestão do seu plano"
  icon={<Icon name="heart-outline" size={32} color="var(--color-brand)" />}
  ctaLabel="Falar no Alice Agora"
/>
```

---

## ActionCard
**Path:** `src/components/ActionCard/ActionCard.tsx`

| Prop | Tipo | Default | Valores |
|---|---|---|---|
| `status` | ActionCardStatus | `'active'` | `'active'`(brand) `'disabled'`(gray) `'incomplete'` `'completed'` |
| `title` | string | `'Card title'` | |
| `content` | string | — | linha secundária |
| `badge` | boolean | `true` | mostra badge label no topo |
| `badgeLabel` | string | `'Badge'` | |
| `showButton` | boolean | `true` | botão de ação (active only) |
| `buttonLabel` | string | `'Action'` | |
| `onClick` | function | — | |

```tsx
// Com tarefas (brand)
<ActionCard
  status="active"
  badge={true}
  badgeLabel="Plano de ação"
  title="Complete seu perfil de saúde"
  showButton={true}
  buttonLabel="Ver tarefas"
/>

// Sem tarefas (gray)
<ActionCard
  status="disabled"
  badge={true}
  badgeLabel="Plano de ação"
  title="Nenhuma tarefa pendente"
  showButton={false}
/>
```

---

## NotificationCard
**Path:** `src/components/NotificationCard/NotificationCard.tsx`

Card de notificação com ícone, título e mensagem.

```tsx
<NotificationCard />
```

---

## Loader
**Path:** `src/components/Loader/Loader.tsx`

Indicador de carregamento.

```tsx
<Loader />
```

---

## TextField
**Path:** `src/components/TextField/TextField.tsx`

Campo de texto com label, placeholder, estados.

```tsx
<TextField label="Nome completo" placeholder="Digite seu nome" />
```

---

## TextArea
**Path:** `src/components/TextArea/TextArea.tsx`

Campo de texto multilinha.

```tsx
<TextArea label="Descreva seus sintomas" placeholder="..." />
```

---

## RadioButton
**Path:** `src/components/RadioButton/RadioButton.tsx`

```tsx
<RadioButton label="Online" checked={true} />
```

---

## Checkbox
**Path:** `src/components/Checkbox/Checkbox.tsx`

```tsx
<Checkbox label="Aceito os termos de uso" checked={false} />
```

---

## Divider
**Path:** `src/components/Divider/Divider.tsx`

Separador horizontal.

```tsx
<Divider />
```

---

## Badge
**Path:** `src/components/Badge/Badge.tsx`

Contador de notificação.

```tsx
<Badge count={3} />
```

---

## ProgressBar
**Path:** `src/components/ProgressBar/ProgressBar.tsx`

```tsx
<ProgressBar value={0.4} /> // 40%
```

---

## Tooltip
**Path:** `src/components/Tooltip/Tooltip.tsx`

```tsx
<Tooltip label="Informação adicional" />
```

---

## Snackbar
**Path:** `src/components/Snackbar/Snackbar.tsx`

Mensagem de feedback temporária.

```tsx
<Snackbar message="Consulta agendada com sucesso!" />
```

---

## Callout
**Path:** `src/components/Callout/Callout.tsx`

Banner de alerta/informação inline.

```tsx
<Callout message="Seu plano cobre este procedimento." />
```

---

## Icon
**Path:** `src/icons/Icon.tsx`

Ícones Material Design via `@iconify/react`.

| Prop | Tipo | Default |
|---|---|---|
| `name` | string | obrigatório |
| `size` | number | `24` |
| `color` | string | `'currentColor'` |

```tsx
<Icon name="heart-outline" size={24} color="var(--color-content-primary)" />
<Icon name="chevron-right" size={20} color="var(--color-brand)" />
<Icon name="map-marker" size={24} color="var(--color-brand)" />
```

Ícones mais usados nas telas Alice:
- `heart` / `heart-outline` — Alice Agora
- `pulse` — Minha saúde
- `map-marker` — Rede Alice
- `account` / `account-circle-outline` — avatar/perfil
- `bell-outline` — notificações
- `chevron-right` / `chevron-left` — navegação
- `stethoscope` — médico
- `clipboard-text-outline` — exames/resultados
- `hospital-building` — prontos-socorros
- `check-circle-outline` — concluído
- `snowflake` — plano de ação (decorativo)
- `folder-outline` — conversas arquivadas

---

## Assets disponíveis

```
src/assets/mfc/mfc-1-fabiana.jpg   — foto médica (Isabella/Fabiana)
src/assets/mfc/mfc-2-tiago.jpg     — foto médico (Tiago/Alan)
src/assets/mfc/mfc-3-manuela.jpg   — foto médica (Daniela/Manuela)
src/assets/placeholders/person.jpg — foto placeholder genérica
src/assets/hero.png                — imagem hero genérica
src/assets/navbar-user-photo.png   — foto do usuário no NavBar
```

---

## Como adicionar uma tela no Playground

O Playground lê a lista de componentes em `src/playground/Playground.tsx`. Para adicionar uma tela, crie o arquivo em `src/screens/<NomeDaTela>.tsx` e depois adicione uma entrada no arquivo de rotas/lista do Playground se houver suporte a templates.

> **Nota:** Telas ficam em `src/screens/` e são arquivos React standalone — não precisam de config de playground para serem acessíveis diretamente.
