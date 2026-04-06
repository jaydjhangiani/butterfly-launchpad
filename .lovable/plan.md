

## Add Corporate Section Before Footer

A clean white card section between the "Own Your Next" section and the footer, designed to stand out from the background-image sections above.

### Design
- White card (`bg-white`) with rounded corners, subtle shadow, centered within the page with `mx-[25px]` margins to match other sections
- No background image — intentionally different to signal a distinct audience (companies vs individuals)
- Two-column layout on desktop: left side has the headline and body text, right side shows company logos (Flipkart, Kantar, Swiggy) as social proof badges
- On mobile: stacks vertically

### Content Structure
1. **Small label**: "For Companies" (uppercase, teal, tracking-widest)
2. **Headline**: "Are you a company who ACTUALLY wants to support your women?"
3. **Body**: "If yes, I'm here to help further our common mission..." and the customization paragraph
4. **Company logos row**: Flipkart, Kantar, Swiggy shown as text badges in rounded pills (since we don't have logo assets)
5. **CTA button**: "Let's Talk →" in primary style

### Technical Changes
- **File**: `src/pages/Index.tsx` — insert one new `<section>` between the Own Your Next section (line 328) and the footer (line 330)
- Simple, clean markup — no background image, just a white elevated card

