# Wonderland DS — Design Tokens

All visual properties MUST use these CSS custom properties. NEVER hardcode values.

## Colors

### Gray Palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-gray-white` | #FFFFFF | White backgrounds |
| `--color-gray-00` | #FAFAFA | Surface bg |
| `--color-gray-10` | #F4F4F4 | Subtle surface, dividers |
| `--color-gray-20` | #E0E0E0 | Strokes, borders |
| `--color-gray-30` | #C2C2C2 | Disabled text |
| `--color-gray-40` | #A3A3A3 | |
| `--color-gray-50` | #8F8F8F | Tertiary content |
| `--color-gray-60` | #6F6F6F | Secondary content |
| `--color-gray-70` | #585858 | |
| `--color-gray-80` | #3D3D3D | |
| `--color-gray-90` | #292929 | Dark surface hover |
| `--color-gray-100` | #141414 | Primary content, dark surface |

### Magenta (Brand)
| Token | Value |
|-------|-------|
| `--color-magenta-00` | #FFF0FA |
| `--color-magenta-10` | #FCC0E8 |
| `--color-magenta-60` | #BE0380 (brand primary) |
| `--color-magenta-70` | #960169 (brand pressed) |

### Semantic Aliases (USE THESE)
| Token | Maps to | Usage |
|-------|---------|-------|
| `--color-brand` | magenta-60 | Primary brand color |
| `--color-brand-pressed` | magenta-70 | Pressed brand |
| `--color-brand-subtle` | magenta-00 | Light brand bg |
| `--color-content-primary` | gray-100 | Main text |
| `--color-content-secondary` | gray-60 | Secondary text |
| `--color-content-tertiary` | gray-50 | Tertiary text |
| `--color-surface` | white | Card/component bg |
| `--color-surface-subtle` | gray-10 | Subtle bg |
| `--color-surface-bg` | gray-00 | Page bg |
| `--color-divider` | gray-10 | Divider lines |
| `--color-stroke` | gray-20 | Borders/strokes |
| `--color-dark-surface` | gray-100 | Dark bg |

## Typography

### Font Families
| Token | Font | Usage |
|-------|------|-------|
| `--font-family-base` | Haffer | UI: buttons, titles, headings, list items |
| `--font-family-label` | DM Sans | Content: paragraphs, labels, body text |

### Font Sizes
| Token | Size |
|-------|------|
| `--font-size-xs` | 12px |
| `--font-size-sm` | 14px |
| `--font-size-md` | 16px |
| `--font-size-lg` | 20px |
| `--font-size-xl` | 24px |
| `--font-size-xxl` | 32px |
| `--font-size-xxxl` | 48px |
| `--font-size-xxxxl` | 64px |

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `--font-weight-regular` | 400 | Body text, descriptions, labels, categories, subtitles |
| `--font-weight-medium` | 500 | Titles, headings, buttons, links — the heaviest weight used in the DS |
| `--font-weight-semibold` | 600 | Available but NOT used by any DS component — avoid unless Figma explicitly specifies it |

### Line Heights
| Token | Value | Usage |
|-------|-------|-------|
| `--line-height-heading` | 1 | Large headings |
| `--line-height-title` | 1.24 | Titles |
| `--line-height-title-sm` | 1.32 | Small titles |
| `--line-height-label` | 1.44 | Labels |
| `--line-height-para-lg` | 1.52 | Large paragraphs |
| `--line-height-para-md` | 1.64 | Medium paragraphs |

### Letter Spacing
| Token | Value |
|-------|-------|
| `--letter-spacing-none` | 0px |
| `--letter-spacing-button` | 0.5px |
| `--letter-spacing-para` | 0.2px |

## Spacing
| Token | Value |
|-------|-------|
| `--spacing-01` | 4px |
| `--spacing-02` | 8px |
| `--spacing-03` | 12px |
| `--spacing-04` | 16px |
| `--spacing-05` | 20px |
| `--spacing-06` | 24px |
| `--spacing-08` | 32px |

## Border Radius
| Token | Value |
|-------|-------|
| `--radius-none` | 0px |
| `--radius-sm` | 12px |
| `--radius-md` | 16px |
| `--radius-pill` | 1000px |

## Important Rules
1. Use `style={{ }}` for all token values (Tailwind v4 bug: `text-[var(--...)]` doesn't work)
2. NEVER hardcode colors like `#141414`, `white`, `#BE0380`
3. NEVER use Tailwind text-* / bg-* / font-* classes for styled text
4. Prefer semantic aliases over raw palette values
