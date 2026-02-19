import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "I have found tremendous value right from the first one hour that I spent with you. You helped me unlock a sense of clarity that I did not think I was capable of. I walked away from the session with clarity in my mind about my goal and an execution plan as well, detailed with steps. You also helped me brainstorm on possible derailers and make a plan accordingly. You were brilliant, and I look forward to working with you more on specific goals. Can't wait to create massively from the space of clarity",
    name: "Kakoli Das",
  },
  {
    quote:
      "I have had two sessions so far with Krusha, and it has really made me start thinking about my planning in detail. The little tips that she gives really help, which I otherwise have overlooked",
    name: "Pooja Sagi",
  },
  {
    quote:
      "I reached out to Krusha when I struggled to navigate my way through difficult choices and decisions in my career. Although I was skeptical of coaching when I first started, it turned out to be the fx that I needed. It gave me a structure to process my thoughts and fleshed out the core of my challenges to find interesting insights. Krusha was patient and helped me navigate challenging waters to move closer to realizing my journey of a new job and more.",
    name: "Tushara",
  },
  {
    quote:
      "Krusha helped me see life’s components, not as disjointed from each other but (quite literally) as parts of the same pie. She is a patient and interested listener who understands the subtle art of asking the right questions — perhaps the topmost skill I would want in my life coach. We were able to slice life into areas in a way that made sense for me and figure out a few things that needed to change for me to be able to prioritise what I wanted, figure out when I wanted it, and how I could go about making my goals a reality.",
    name: "Garima Behal",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section
      className="py-14 px-6 mx-[25px] my-[25px] bg-[#9cd7d8]"
      style={{ backgroundColor: "#9BD7D8" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 tracking-tight">
          {testimonials[current].name}
        </h2>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed italic">
          "{testimonials[current].quote}"
        </p>

        {/* <p className="mt-5 text-sm font-semibold text-foreground/90">
          — {testimonials[current].name}, {testimonials[current].role}
        </p> */}

        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-1.5 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 text-foreground/60" />
          </button>

          <div className="flex gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === current ? "bg-foreground/70" : "bg-foreground/20"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-1.5 rounded-full hover:bg-white/30 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 text-foreground/60" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
