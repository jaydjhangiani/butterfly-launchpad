import { User } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
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
    quote: "Hey, closed a $600 client. For 3 months. Can't believe it actually happened!",
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
  return (
    <section className="py-14 px-6 mx-[25px] my-[25px]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#2a9d8f] font-semibold mb-2 text-center">
          What People Say
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
          Wins from the people<br />I've had the privilege of mentoring
        </h2>

        <Carousel
          opts={{
            align: "center",
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[
            Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {wins.map((win, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-[80%] md:basis-[45%] lg:basis-[35%]"
              >
                <div className="bg-white rounded-xl shadow-md border-t-4 border-green-500 p-6 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{win.profile}</p>
                      <p className="text-xs text-muted-foreground">{win.date}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/80 italic leading-relaxed flex-1">
                    "{win.quote}"
                  </p>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    <span className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                      {win.badge}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-6" />
          <CarouselNext className="-right-4 md:-right-6" />
        </Carousel>
      </div>
    </section>
  );
};

export default WinsCarousel;
