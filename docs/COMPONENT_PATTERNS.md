# Component Patterns & Best Practices

FinSync Design System component architecture and guidelines.

## Component Contract

Every component follows this explicit contract:

```
variant  → Visual intent (primary, secondary, ghost, destructive)
size     → Scale (sm, md, lg)
state    → Interaction state (default, hover, focus, disabled, loading)
children → Content rendering
style    → CSS class overrides (merged last)
```

## Base Components

### Button
- **Variants**: `primary` | `secondary` | `ghost` | `destructive`
- **Sizes**: `sm` (8px), `md` (10px), `lg` (12px)
- **States**: default, hover, focus, disabled, loading
- **Usage**: Actions, form submission, navigation
- **Don't use**: Text-only interactions (use links instead)

```tsx
import { Button } from '@/components'

<Button variant="primary" size="md">
  Save
</Button>
```

### Input
- **Types**: text (default), password, email, number, tel
- **States**: default, focus, disabled, error
- **Accessibility**: Always pair with `<label>`
- **Usage**: Form fields, search, text entry
- **Don't use**: For dropdowns (use `<select>`) or multi-line (use `<textarea>`)

```tsx
import { Input } from '@/components'

<div>
  <label htmlFor="email">Email</label>
  <Input id="email" type="email" placeholder="your@email.com" />
</div>
```

### Card
- **Composition**: `Card` + `CardHeader` + `CardContent` + `CardFooter`
- **Elevation**: Subtle shadow, raised background
- **Usage**: Content containers, dashboards, data display
- **Pattern**: Render `children` with token-based padding

```tsx
import { Card, CardHeader, CardContent, Button } from '@/components'

<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Badge
- **Variants**: `default` | `success` | `error` | `warning` | `info`
- **Usage**: Status labels, category tags, small indicators
- **Don't use**: For interactive buttons (use `Button` instead)

```tsx
import { Badge } from '@/components'

<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
```

### Avatar
- **Display modes**: image (`src`), initials, fallback text
- **Sizes**: Fixed 40px (customizable via className)
- **Usage**: User profiles, team members, author attribution
- **Pattern**: Prefer initials over image URLs for performance

```tsx
import { Avatar } from '@/components'

<Avatar initials="JD" />
<Avatar fallback="John Doe" />
<Avatar src="https://..." alt="John" />
```

### Checkbox
- **Pattern**: `<Checkbox label="Accept terms" />`
- **Accessibility**: Built-in label support
- **Usage**: Multi-select, agreement forms
- **States**: checked, unchecked, disabled, focus

```tsx
import { Checkbox } from '@/components'

<Checkbox id="terms" label="I accept the terms" />
```

### Radio
- **Pattern**: Group with same `name` attribute
- **Usage**: Exclusive selection, single choice
- **Accessibility**: Built-in label support

```tsx
import { Radio } from '@/components'

<div className="flex gap-md flex-col">
  <Radio name="plan" value="basic" label="Basic" />
  <Radio name="plan" value="pro" label="Pro" />
</div>
```

### Switch
- **Usage**: Boolean toggles, feature flags
- **Accessibility**: ARIA-compliant via Radix UI
- **Pattern**: Use with label for clarity

```tsx
import { Switch } from '@/components'

<div className="flex items-center gap-md">
  <Switch id="notifications" />
  <label htmlFor="notifications">Enable notifications</label>
</div>
```

### Typography
- **Components**: `Display`, `H1`, `H2`, `H3`, `Body`, `Small`, `Muted`
- **Principle**: Never set `fontSize` directly; use typography components
- **Usage**: Consistent text hierarchy, semantic HTML

```tsx
import { H1, Body, Muted } from '@/components'

<H1>Main Title</H1>
<Body>Body text here</Body>
<Muted>Secondary text in gray</Muted>
```

### Spinner
- **Variants**: `primary` | `white` | `muted`
- **Sizes**: `sm` | `md` | `lg`
- **Usage**: Loading states, async operations
- **Pattern**: Pair with text ("Loading...") for clarity

```tsx
import { Spinner, Body } from '@/components'

<div className="flex gap-md items-center">
  <Spinner size="md" />
  <Body>Processing your request...</Body>
</div>
```

## Design Token Usage

All components use CSS variables from the token system:

```css
--semantic-light-color-action-primary
--semantic-light-color-surface-raised
--primitives-spacing-md
--primitives-radius-md
--primitives-shadow-md
```

Access directly in components:
```tsx
backgroundColor: 'var(--semantic-light-color-action-primary)'
```

Or via Tailwind (when CSS variables are bound):
```tsx
className="bg-action-primary"
```

## Composition Patterns

### Simple Component (no composition)
```tsx
<Avatar initials="JD" />
<Badge variant="success">Active</Badge>
```

### Composite Component (Header + Content + Footer)
```tsx
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

### Form Field Pattern (Label + Input + Helper)
```tsx
<div className="flex flex-col gap-md">
  <label htmlFor="email">Email</label>
  <Input id="email" type="email" />
  <p className="text-sm text-red-500">Error message (if any)</p>
</div>
```

## When to Extract a New Component

Promote to `src/components/` when:
1. ✅ Used in 2+ screens/components
2. ✅ Has a nameable role ("Button", "Card", not "the thing on the dashboard")
3. ✅ Props are smaller than implementation

Do NOT extract for:
- ❌ Single-use layouts (keep in screen/page folder)
- ❌ Wrapper around a single Radix UI primitive (use Radix directly)
- ❌ Visual tweaks that could be a className override

## Accessibility

Every component includes:
- ✅ ARIA attributes (roles, labels, states)
- ✅ Keyboard navigation (Tab, Enter, Space, Arrow keys)
- ✅ Focus management (visible focus ring)
- ✅ Color contrast (WCAG AA minimum)
- ✅ Semantic HTML (`<button>`, `<input>`, `<label>`)

Test with:
- Keyboard only (no mouse)
- Screen reader (VoiceOver, NVDA, JAWS)
- Color contrast checker
- Browser DevTools accessibility tree

## Testing Components

### Storybook
```bash
npm run storybook
```

Browse stories at [http://localhost:6006](http://localhost:6006) to:
- View all variants and states
- Test accessibility (a11y tab)
- Check dark mode (themes tab)
- Read documentation (docs tab)

### Unit Tests (Vitest)
```bash
npm run test
```

Test pattern:
```tsx
it('renders button with correct variant', () => {
  render(<Button variant="primary">Click</Button>)
  expect(screen.getByText('Click')).toHaveClass('primary')
})
```

### Visual Tests (Playwright)
```bash
npm run test:e2e
```

Capture visual snapshots and detect unintended regressions.

## Common Mistakes

1. ❌ **Hardcoding colors**: Use CSS variables or token classes
2. ❌ **Inconsistent spacing**: Use `gap-md`, `p-lg` classes (not arbitrary `px-5`)
3. ❌ **Missing labels**: Every form input needs a `<label>`
4. ❌ **Too many variants**: Start with 3-4; add only when a screen needs it
5. ❌ **Mixing styled-components + Tailwind**: Pick one pattern
6. ❌ **Component props explosion**: Accept `children`, not `title`, `subtitle`, `footer`, etc.

---

**Learn More**
- [Expo Design System](https://expo.dev/blog) - Component patterns
- [Radix UI](https://www.radix-ui.com) - Primitives and accessibility
- [Tailwind CSS](https://tailwindcss.com) - Utility classes
- [shadcn/ui](https://ui.shadcn.com) - Component examples
