
## Website refresh plan based on `Website_changes.docx`

### 1) Home page: simplify the hero and reduce clutter
- Replace the current text-heavy hero + embedded full lead form on `src/pages/Index.tsx` with a cleaner split layout:
  - Left: your photo
  - Right: revised hero copy:
    - “Procrastination ends here:”
    - “I help women create a career with confidence, clarity, and alignment.”
    - supporting leadership/executive coaching line
  - Add one prominent CTA: “Book your discovery call”
- Change the CTA flow so the user sees a lightweight form in a dialog/drawer first, then is taken to Calendly.
- Remove the full always-visible lead form from the homepage so the page feels less crowded.

### 2) Home page: keep the 3-path teaser section, but use it as the main navigation block
- Keep the “Three ways we can work together” section on `src/pages/Index.tsx`.
- Update copy to match the doc exactly:
  - Private coaching: measurable 1-on-1 results
  - DIY coaching: grow / pivot / launch clarity
  - Corporate: tailored workshops for company priorities
- Keep each card linking to its dedicated page.

### 3) Private Coaching page: keep structure, remove visible pricing, tighten copy
- Update `src/pages/PrivateCoaching.tsx` and `src/components/ProgramCard.tsx`:
  - Keep the 3 existing program sections/cards
  - Remove visible INR/USD pricing from the cards
  - Change CTA text from “Buy Now” to “Join Now”
- Apply copy edits:
  - Working Moms: remove “partner, and professional”
  - Female Solopreneurs: change “solo business” to “business”
- Keep the testimonials and Power Hour structure.

### 4) Private Coaching page: simplify retainer section
- Replace the current 4-card retainer pricing grid in `src/pages/PrivateCoaching.tsx` with one cleaner CTA block:
  - remove “Already on your path?”
  - use the new personal-trainer-style supporting copy
  - show “Sessions are twice a month”
  - one “Start now” button
- On click, open a dialog with a dropdown for Monthly / Quarterly / Half-year / Annual and show the selected cost there.
- After selection, continue into the same pre-payment/contact flow.

### 5) Private Coaching page: keep Power Hour, but hide price
- Keep the current Power Hour layout and scenario tiles.
- Remove visible price text from the page.
- Keep the “Book My Power Hour” CTA.
- Change its flow to go directly into pre-payment/contact capture, then onward to Razorpay + Calendly later when that phase is implemented.

### 6) DIY Coaching page: position as coming soon, keep quiz live
- Update `src/pages/DiyCoaching.tsx`:
  - remove the visible product price from the hero
  - add a clear note that OwnYourNext is under construction / coming soon
  - keep a polished “start with the free quiz” entry point
- Keep the quiz interactive and the result experience already built in `src/components/OwnYourNextQuiz.tsx`.

### 7) DIY Coaching page: adjust post-quiz CTA behavior
- On the quiz result screen in `src/components/OwnYourNextQuiz.tsx`:
  - primary CTA becomes “Get OwnYourNext”
  - clicking it opens a simple interest capture modal:
    - “Thank you for your interest. Drop your email so we can reach out when it’s ready!”
  - keep the hand-held private coaching option as the secondary CTA
  - keep retake below
- Do not add the later personalization step yet.

### 8) Corporate page: refine copy and workshop details
- Update `src/pages/Corporate.tsx`:
  - change “curated sessions” to “led sessions”
  - keep the offers/workshop cards structure
- Adjust workshop details:
  - manager workshop duration becomes 75 minutes
  - manager workshop cost matches the other two
  - add a final bullet to all three workshop cards: “For an audience of 50 or below”

### 9) Corporate enquiry: move the reassurance copy into the success state only
- Keep the custom enquiry section layout.
- Remove the “expect a call and email within 24 hours” reassurance from the on-page static text.
- Keep that exact message only in the success toast after form submission in `src/components/CorporateEnquiryForm.tsx`.

### 10) Wins/testimonial sections
- Keep the repeated testimonial/wins structure where already intended.
- While implementing these content changes, also clean up the current `src/components/WinsCarousel.tsx` behavior:
  - prevent awkward first-card edge states
  - avoid loop/autoplay combinations that create visual jumps on mobile
  - prefer calmer mobile behavior over aggressive looping

## Files likely to change
- `src/pages/Index.tsx`
- `src/pages/PrivateCoaching.tsx`
- `src/pages/DiyCoaching.tsx`
- `src/pages/Corporate.tsx`
- `src/components/LeadCaptureForm.tsx`
- `src/components/PrePaymentDialog.tsx`
- `src/components/ProgramCard.tsx`
- `src/components/OwnYourNextQuiz.tsx`
- `src/components/WinsCarousel.tsx`

## Technical implementation notes
- Reuse the existing dialog components instead of adding a new form system.
- The homepage CTA should trigger a modal flow rather than render the full form inline.
- Since payment is deferred, all “join/start/book” flows should stop at interest capture / pre-payment details for now.
- Calendly and Razorpay should be left as clear extension points, not partially mocked on-page.
- For the retainer selector, replace the current pricing-card pattern with a select-driven dialog so the section is visually lighter and easier on mobile.

## Outcome
After this round, the site will feel cleaner and more premium:
- a less cluttered homepage
- clearer conversion paths
- dedicated service pages with lighter pricing presentation
- a quiz-led DIY page that feels active but honestly marked as coming soon
- a more polished corporate enquiry experience
