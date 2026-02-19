import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
      className="py-16 px-6"
      style={{ backgroundColor: "#9BD7D8" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
          What My Clients Say
        </h2>

        <div className="relative">
          <Quote className="w-10 h-10 mx-auto mb-4 text-foreground/30" />

          <blockquote className="text-lg md:text-xl text-foreground/90 leading-relaxed italic min-h-[100px] flex items-center justify-center">
            "{testimonials[current].quote}"
          </blockquote>

          <p className="mt-6 font-semibold text-foreground">
            {testimonials[current].name}
          </p>
          <p className="text-sm text-foreground/60">
            {testimonials[current].role}
          </p>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === current ? "bg-foreground" : "bg-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
