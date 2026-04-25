import { useState, useEffect } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const wins = [
  {
    profile: "Sales professional",
    date: "February 2025",
    quote:
      "My director is sick and he asked if one of us want to take it up and I did. It was a great experience presenting to a larger room!",
    badge: "Stepped up to present to a larger room",
  },
  {
    profile: "Job seeker",
    date: "March 2025",
    quote:
      "I cleared the first round and I had a good conversation with the hiring manager. I feel really positive about this one.",
    badge: "Cleared first interview round",
  },
  {
    profile: "Early-career professional",
    date: "July 2025",
    quote:
      "I have accepted my offer letter today! Also, visited the doctor and got multivitamins. Feeling great about this new chapter.",
    badge: "Accepted a new job offer",
  },
  {
    profile: "Freelancer",
    date: "July 2025",
    quote:
      "Hey, closed a $600 client. For 3 months. Can't believe it actually happened!",
    badge: "Closed first paying client",
  },
  {
    profile: "Mid-career professional",
    date: "September 2025",
    quote:
      "Interview went very well. I feel better today — I haven't lost the plot. Things are finally clicking into place.",
    badge: "Rebuilt interview confidence",
  },
];

const WinsCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(2);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 mx-[12px] md:mx-[25px] my-[25px] bg-gradient-to-br from-[#9cd7d8] to-[#6dbfc1] relative overflow-hidden rounded-xl">
      {/* Decorative background circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-52 h-52 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="text-xs uppercase tracking-widest font-semibold mb-2 text-center text-white/80">
          What People Say
        </p>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-8 md:mb-10">
          Macro wins from micro sessions


        </h2>

        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: false,
            slidesToScroll: 1,
            startIndex: 2,
            containScroll: false,
          }}
          className="w-full py-6"
        >
          <CarouselContent>
            {wins.map((win, i) => {
              const isActive = i === selectedIndex;
              return (
                <CarouselItem
                  key={i}
                  className="basis-[82%] sm:basis-[68%] md:basis-[45%] lg:basis-[35%]"
                >
                  <div
                    className={`bg-white rounded-[20px] transition-all duration-500 p-6 md:p-8 h-full flex flex-col relative ${
                      isActive
                        ? "scale-110 shadow-sm z-10"
                        : "scale-90 opacity-60 z-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9cd7d8] to-[#5aafb1] flex items-center justify-center shrink-0">
                        <span className="text-white text-xs font-bold">
                          {win.profile[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">
                          {win.profile}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {win.date}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-foreground/75 pt-5 md:pt-8 italic leading-relaxed flex-1 mb-4 md:mb-5">
                      {win.quote}
                    </p>

                    <div className="mt-2 md:mt-3">
                      <span className="text-xs font-medium text-[#4a9ea0] bg-[#9cd7d8]/20 px-3 py-1 rounded-full inline-block">
                        {win.badge}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {selectedIndex > 0 && (
            <CarouselPrevious className="bg-white/90 text-[#5aafb1] border-white hover:bg-white hover:text-[#5aafb1] -left-2 md:-left-6 hidden md:flex" />
          )}
          {selectedIndex < wins.length - 1 && (
            <CarouselNext className="bg-white/90 text-[#5aafb1] border-white hover:bg-white hover:text-[#5aafb1] -right-2 md:-right-6 hidden md:flex" />
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default WinsCarousel;