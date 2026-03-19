# Wonderland DS — Component API Reference

## Icon

```tsx
import { Icon } from '../icons/Icon'

<Icon name="home" size={24} color="var(--color-content-primary)" />
```

| Prop | Type | Default | Notes |
|------|------|---------|-------|
| name | string | — | Material Design icon name in kebab-case (e.g. "chevron-right", "home", "search"). Browse: https://icon-sets.iconify.design/mdi/ |
| size | number | 24 | px width & height |
| color | string | "currentColor" | CSS color value — use tokens |
| className | string | — | |

---

## Button

```tsx
import { Button } from '../components/Button'

<Button label="Click me" style="primary" size="lg" state="enabled" type="text" />
<Button label="Back" style="secondary" size="md" type="left-icon" iconElement={<Icon name="arrow-left" size={20} />} />
<Button style="tertiary" size="sm" type="only-icon" iconElement={<Icon name="plus" size={20} />} />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | "Button label" | Text inside button |
| style | ButtonStyle | "primary" | "primary", "secondary", "tertiary" |
| size | ButtonSize | "lg" | "lg" (56px, radius-md), "md" (48px, radius-sm), "sm" (40px, radius-sm) |
| state | ButtonState | "enabled" | "enabled", "pressed", "disabled", "loading" |
| type | ButtonType | "text" | "text", "left-icon", "right-icon", "only-icon" |
| darkMode | boolean | false | Use on dark backgrounds |
| iconElement | ReactNode | — | Custom icon element (defaults to chevron/plus) |
| onClick | () => void | — | |
| className | string | — | Can use "w-full", "flex-1" etc. |
| htmlType | string | "button" | "button", "submit", "reset" |

### Color behavior
- **primary**: magenta bg (light) / white bg (dark)
- **secondary**: transparent + border
- **tertiary**: transparent, no border
- **disabled**: faded colors, not clickable
- **loading**: spinner, not clickable

---

## ListItem

```tsx
import { ListItem } from '../components/ListItem'

<ListItem title="Settings" description="Manage your preferences" size="large" leftSide="icon" rightAsset="icon" icon={<Icon name="cog" size={24} />} />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| title | string | "Title" | |
| description | string | undefined | If undefined, no description row |
| size | ListItemSize | "large" | "large", "small" |
| state | ListItemState | "default" | "default", "pressed", "loading" |
| leftSide | ListItemLeftSide | "none" | "none", "icon", "image" |
| fullWidth | boolean | true | true = px-6, false = no horizontal padding |
| rightAsset | ListItemRightAsset | "icon" | "none", "icon", "text", "text-icon" |
| rightText | string | "Text" | Shown when rightAsset includes text |
| icon | ReactNode | — | Custom left icon element |
| rightIconElement | ReactNode | — | Custom right icon (default: chevron-right) |
| imageSrc | string | — | Image URL for leftSide="image" |
| imageAlt | string | "" | |
| divider | boolean | true | Bottom border |
| onClick | () => void | — | |
| className | string | — | |

### Sizing
- **large**: 16px font, 40px image, 24px icon area
- **small**: 14px font, 32px image, smaller spacing

---

## Chip

```tsx
import { Chip } from '../components/Chip'

<Chip label="Filter" variant="text" size="md" state="idle" />
<Chip label="Category" variant="icon" size="md" state="selected" iconElement={<Icon name="tag" size={20} />} />
<Chip label="User" variant="image" size="lg" imageUrl="https://..." affordanceIcon />
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| label | string | "Suggestion" | |
| variant | ChipVariant | "text" | "text", "icon", "image" |
| size | ChipSize | "sm" | "sm" (14px), "md" (14px), "lg" (16px) |
| state | ChipState | "idle" | "idle" (stroke border), "pressed" (dark border), "selected" (magenta bg), "disabled" |
| counter | string | "000" | Counter text |
| showCounter | boolean | false | Show counter next to label |
| affordanceIcon | boolean | false | Show close/action icon on right |
| affordanceIconElement | ReactNode | — | Custom affordance icon (default: X) |
| iconElement | ReactNode | — | Icon for variant="icon" |
| imageUrl | string | — | Image for variant="image" |
| onClick | () => void | — | |
| className | string | — | |

### Shape
- Always pill-shaped (border-radius: var(--radius-pill))
- Asymmetric padding when icon/image variant

---

## BaseCard

```tsx
import { BaseCard } from '../components/BaseCard'

<BaseCard
  size="lg"
  filled
  category="News"
  title="Article Title"
  subtitle="Short description"
  leftAsset
  leftIcon={<Icon name="newspaper" size={24} />}
  action="button"
  buttonLabel="Read more"
  showSlot={false}
/>
```

| Prop | Type | Default | Options |
|------|------|---------|---------|
| size | CardSize | "lg" | "lg" (24px padding, 20px title), "sm" (20px padding, 16px title) |
| filled | boolean | false | true = #F3F2F0 bg, false = outlined with border |
| category | string | "Category" | Magenta colored category text |
| showCategory | boolean | true | |
| title | string | "Title" | |
| showTitle | boolean | true | |
| subtitle | string | "Subtitle" | Secondary colored |
| showSubtitle | boolean | true | |
| leftAsset | boolean | true | Show left icon area |
| rightAsset | boolean | true | Show right icon (absolute top-right) |
| leftIcon | ReactNode | — | Custom left icon |
| rightIcon | ReactNode | — | Custom right icon |
| action | CardAction | "none" | "none", "button", "2buttons", "link", "2links" |
| slot | ReactNode | — | Custom slot content (images, charts, etc.) |
| showSlot | boolean | true | Show slot area |
| buttonLabel | string | "Button label" | |
| buttonLabel2 | string | "Button label" | For "2buttons" |
| linkLabel | string | "Link label" | |
| linkLabel2 | string | "Link label" | For "2links" |
| width | number/string | 327 | Card width |
| onClick | () => void | — | |
| className | string | — | |

### Actions
- **button**: Full-width Button (uses DS Button component, md for lg card, sm for sm card)
- **2buttons**: Two flex-1 Buttons side by side
- **link**: Magenta text link
- **2links**: Two links with vertical divider
