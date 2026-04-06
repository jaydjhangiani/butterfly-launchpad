

## Add "Power Hour" Section

Add a new section between `<TestimonialSlider />` and the footer in `src/pages/Index.tsx`.

### Design
- Pink background (`bg-[#f8e8e8]` or similar brand pink)
- Centered content card or container, no butterfly image
- Checkmark list matching the style used in the form section

### Content
- **Headline**: "Didn't think 60 minutes could make a significant difference in your life? Think again."
- **Subtext**: "It's similar to what they say about how if you think 60 seconds is too less, try a plank."
- **Intro**: "If you're not ready for deep work right now, but need a quick fix for scenarios such as:"
- **Checklist** (with ✓ icons):
  - Interview prep
  - Negotiation
  - Handling a tough client/employer conversation
  - Time management – fixing your calendar
- **Closing**: "You can now book a stand-alone hour with me, to gain back more control over said situation."

### Technical Change
- **File**: `src/pages/Index.tsx` — one new `<section>` element inserted before the footer
- Responsive padding, max-width container, consistent typography with existing sections

