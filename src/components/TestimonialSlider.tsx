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
      "I reached out to Krusha when I struggled to navigate my way through difficult choices and decisions in my career. Although I was skeptical of coaching when I first started, it turned out to be the fx that I needed. It gave me a structure to process my thoughts and fleshed out the core of my challenges to find interesting insights. Krusha was patient and helped me navigate challenging waters to move closer to realizing my journey of a new job and more.",
    name: "Tushara",
  },
  {
    quote:
      "Krusha helped me see life’s components, not as disjointed from each other but (quite literally) as parts of the same pie. She is a patient and interested listener who understands the subtle art of asking the right questions — perhaps the topmost skill I would want in my life coach. We were able to slice life into areas in a way that made sense for me and figure out a few things that needed to change for me to be able to prioritise what I wanted, figure out when I wanted it, and how I could go about making my goals a reality.",
    name: "Garima Behal",
  },
  {
    quote:
      "I am at a stage in my professional and personal life where I am trying to answer the ‘what next?’ question. Krusha has been a great help sorting all the jumbled thoughts out and help me come up with a solid plan. She asks the right questions, has a knack of organising your thoughts; putting them in a manageable and achievable plan and she is super easy to talk to !",
    name: "Charu Chaturvedi",
  },
  {
    quote:
      "With just a few sessions, I've made more progress with Krusha's sessions than I was making on my own for months. She asks the right questions and knows exactly which buttons to push. She helps you acquire the right mindset you need to take actionable steps for your goals. She is empathetic and firm. Her sessions are helping me gain the confidence I need to progress in my career and life.",
    name: "Tavleen",
  },
  {
    quote:
      "Let me begin by saying that you are a rockstar! You are an incredible person and I am glad the universe made me stumble on your LinkedIn post when I was in great need of a coach. Through the sessions I was able to uncover more about my beliefs and how it shaped my actions and thought process. I challenged them and got the strength to steer through the tough phase of my life managing career aspirations being a first time mom. I also got to reorient my energies and focus deeply on my priorities in the process. I have a greater purpose and a greater understanding of the strengths that are unique to me.  I am thankful to you for creating a positive impact in lives of moms and i feel motivated to contribute my bit to this larger purpose!",
    name: "Stuttee Arora",
  },
  {
    quote:
      " Krusha is a fantastic listener. She gently probes you so that you can navigate an ambiguous path and find clarity. I have had very insightful moments and am definitely taking those ahead in my journey.  I sincerely felt her approach is quite impactful and attacks your core beliefs which are not serving you. It nudges you to alter your perspectives so that you start believing in your own ability to reach your highest potential.  I will definitely recommend her if you are stuck and are ready to unleash the most powerful side of yours!!!",
    name: "Udita Tiwarri",
  },
  {
    quote:
      "Working with Krusha has been a profoundly enriching experience. She holds space for my words and allows me to express my thoughts freely and comfortably with no judgment. She structures sessions without boundaries that are too tight, yet covers all important discussion points within the session time. Beyond establishing clarity and the path for next steps, the session also always ends with defined and doable action items. Overall, the coaching sessions are very impactful and empowering. I feel that I am finally able to take some of my own power back and step into fulfil my potential at the workplace. Thanks Krusha!",
    name: "Linnie",
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
      className="py-14 px-6 mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 bg-[#9cd7d8]"
      style={{ backgroundColor: "#9BD7D8" }}
    >
      <div className="max-w-3xl md:my-2 mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-semibold text-foreground mb-8 tracking-tight">
          {testimonials[current].name}
        </h2>

        <p className="text-base md:text-2xl text-foreground/80 leading-relaxed italic">
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
