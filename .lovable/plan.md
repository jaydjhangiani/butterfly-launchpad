

## Add "Wins" Testimonial Carousel Section

Insert a new section between the Power Hour section (line 165) and the Own Your Next section (line 167), featuring a horizontally scrollable card carousel.

### Content
5 cards based on the uploaded screenshot:

| Profile | Date | Quote | Win Badge |
|---------|------|-------|-----------|
| Sales professional | February 2025 | "My director is sick and he asked if one of us want to take it up and I did..." | Stepped up to present to a larger room |
| Job seeker | March 2025 | "I cleared the first round and I had a good conversation with the hiring manager..." | Cleared first interview round |
| Early-career professional | July 2025 | "I have accepted my offer letter today! Also, visited the doctor and got multivitamins." | Accepted a new job offer |
| Freelancer | July 2025 | "Hey, closed a $600 client. For 3 months." | Closed first paying client |
| Mid-career professional | September 2025 | "Interview went very well. I feel better today — I haven't lost the plot..." | Rebuilt interview confidence |

### Design
- **Section header**: "WHAT PEOPLE SAY" (small uppercase label) + "Wins from the people I've had the privilege of mentoring" (large heading)
- **Cards**: White background (`bg-white`), green top border (`border-t-4 border-green-500`), rounded corners, subtle shadow
- Each card: avatar icon, profile type + date, italic quote, green dot + win badge pill
- **Carousel**: Uses Embla via the existing `Carousel` component from `src/components/ui/carousel.tsx`
- Shows 2-3 cards depending on screen width using Embla's `slidesToScroll: 1` with partial slides visible (the active slide centered at full size, adjacent ones peeking ~25%)
- Auto-scroll enabled using `embla-carousel-autoplay` plugin
- `mx-[25px]` margins, consistent with other sections

### Technical Changes
1. **Install**: `embla-carousel-autoplay` package
2. **New component**: `src/components/WinsCarousel.tsx` — contains card data and carousel layout using the existing `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` components
3. **File**: `src/pages/Index.tsx` — import and insert `<WinsCarousel />` between line 165 and line 167

### Carousel Behavior
- Each `CarouselItem` uses `basis-[80%] md:basis-[40%] lg:basis-[33%]` so 1.25–3 cards show depending on viewport
- `align: "center"` in Embla options to keep current card centered
- `loop: true` for infinite scrolling
- Autoplay with 4-second delay, pause on hover

