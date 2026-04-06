

## Redesign Power Hour Bullets as Icon Cards

Replace the plain checklist with a 2x2 grid of small cards, each with an icon and label.

### Layout
- 2-column grid on all screens (`grid grid-cols-2 gap-4`)
- Each card: rounded container with a semi-transparent white background, padding, centered content
- Small icon above the text (using emoji or Unicode symbols as lightweight icons)

### Card Content
| Icon | Label |
|------|-------|
| 🎯 | Interview prep |
| 🤝 | Negotiation |
| 💬 | Handling a tough conversation |
| 📅 | Time management |

### Technical Changes
- **File**: `src/pages/Index.tsx`, lines 122-138
- Replace the `inline-block text-left space-y-3` div with a `grid grid-cols-2 gap-4` div
- Each card: `bg-white/60 rounded-xl p-4 text-center` with a large icon span and a `text-sm font-medium` label below
- Keeps existing responsive padding and spacing

