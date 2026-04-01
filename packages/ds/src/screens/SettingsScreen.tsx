import { ListItem } from '../components/ListItem'
import { Icon } from '../icons/Icon'
import { Slot } from '../playground/TemplateEditContext'

const settingsOptions = [
  { title: 'Conta', icon: 'account-circle', description: 'Gerencie sua conta e dados pessoais' },
  { title: 'Notificacoes', icon: 'bell', description: 'Configure alertas e lembretes' },
  { title: 'Privacidade', icon: 'shield-lock', description: 'Controle sua privacidade e seguranca' },
  { title: 'Ajuda', icon: 'help-circle', description: 'Suporte e perguntas frequentes' },
]

export function SettingsScreen() {
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{
        backgroundColor: 'var(--color-surface-bg)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center"
        style={{
          padding: 'var(--spacing-06)',
          paddingBottom: 'var(--spacing-04)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-medium)',
            color: 'var(--color-content-primary)',
            lineHeight: 'var(--line-height-title)',
            letterSpacing: 'var(--letter-spacing-none)',
            margin: 0,
          }}
        >
          Configuracoes
        </h1>
      </div>

      {/* Settings list */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {settingsOptions.map((option, index) => (
          <Slot key={option.title} id={`ListItem-${index}`}>
            <ListItem
              title={option.title}
              description={option.description}
              size="large"
              leftSide="icon"
              rightAsset="icon"
              icon={
                <Icon
                  name={option.icon}
                  size={24}
                  color="var(--color-content-primary)"
                />
              }
              rightIconElement={
                <Icon
                  name="chevronArrowRight"
                  size={24}
                  color="var(--color-content-secondary)"
                />
              }
              divider={index < settingsOptions.length - 1}
            />
          </Slot>
        ))}
      </div>
    </div>
  )
}
