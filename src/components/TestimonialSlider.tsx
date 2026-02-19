import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Working with Butterfly Effect Coaching completely transformed how I approach my career decisions. I finally have clarity on what I truly want.",
    name: "Priya S.",
    role: "Marketing Director",
  },
  {
    quote: "The coaching sessions gave me the confidence and tools to make a major career shift. I couldn't have done it without this guidance.",
    name: "Arjun M.",
    role: "Tech Lead",
  },
  {
    quote: "I was stuck in a rut for years. After just a few sessions, I had a concrete action plan and the accountability to follow through.",
    name: "Sarah K.",
    role: "Entrepreneur",
  },
  {
    quote: "The personalized approach made all the difference. No cookie-cutter advice — just real, actionable insights tailored to my goals.",
    name: "Rahul D.",
    role: "Product Manager",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section
      className="py-14 px-6"
      style={{ backgroundColor: "#9BD7D8" }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 tracking-tight">
          Words from clients
        </h2>

        <p className="text-base md:text-lg text-foreground/80 leading-relaxed italic">
          "{testimonials[current].quote}"
        </p>

        <p className="mt-5 text-sm font-semibold text-foreground/90">
          — {testimonials[current].name}, {testimonials[current].role}
        </p>

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
