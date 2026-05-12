import PageShell from "@/components/PageShell";
import CorporateEnquiryForm from "@/components/CorporateEnquiryForm";
import SEO from "@/components/SEO";
import butterflyGreen from "@/assets/butterfly-green.png";
import heroBg from "@/assets/hero-bg.png";

const sectionBg = {
  backgroundImage: `url("${heroBg}")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

interface WorkshopCardProps {
  number: string;
  title: string;
  duration: string;
  description?: string;
  objective?: string;
  outcomes?: string;
  covers: string[];
  pricing: { label: string; price: string }[];
  emoji: string;
}

const WorkshopCard = ({
  number,
  title,
  duration,
  description,
  objective,
  outcomes,
  covers,
  pricing,
  emoji,
}: WorkshopCardProps) => (
  <div className="bg-card rounded-2xl border border-border shadow-md p-6 md:p-8 flex flex-col h-full ">
    <div className="flex items-start gap-3 mb-3">
      <span className="text-3xl shrink-0">{emoji}</span>
      <div>
        <p className="text-xs text-primary font-bold uppercase tracking-widest">
          {number} · {duration}
        </p>
        <h3 className="text-lg md:text-xl font-bold text-foreground mt-1 leading-snug">
          {title}
        </h3>
      </div>
    </div>

    {description && (
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
    )}
    {objective && (
      <p className="text-sm text-foreground mb-2">
        <strong>Objective:</strong> {objective}
      </p>
    )}
    {outcomes && (
      <p className="text-sm text-muted-foreground italic mb-3">{outcomes}</p>
    )}

    <div className="mb-5 flex-1">
      <p className="text-foreground font-semibold text-sm mb-2">
        What it covers:
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {covers.map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-primary mt-0.5 shrink-0">✓</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* <div className="border-t border-border pt-4">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
        Cost
      </p>
      <div className="space-y-1">
        {pricing.map((p) => (
          <div key={p.label} className="flex justify-between text-sm gap-3">
            <span className="text-muted-foreground">{p.label}</span>
            <span className="font-semibold text-foreground">{p.price}</span>
          </div>
        ))}
      </div>
    </div> */}
  </div>
);

const Corporate = () => {
  return (
    <PageShell>
      <SEO
        title="Corporate Workshops & Team Coaching"
        description="Workshops and coaching programs for teams — build confidence, communication, and leadership skills across your organisation."
        path="/corporate"
      />
      {/* Hero */}
      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] mt-4 bg-[#F2D2D7]"
        style={sectionBg}
      >
        <div className="px-6 pt-12 pb-10 md:pt-16 md:pb-14 max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
            For Companies
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Are you a company who <em>ACTUALLY</em> wants to support your women?
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
            If yes, I'm here to help further our common mission.
          </p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            I have successfully led sessions for female employees, new moms, and
            expecting parents at companies such as{" "}
            <strong className="text-foreground">Flipkart</strong>,{" "}
            <strong className="text-foreground">Kantar</strong>, and{" "}
            <strong className="text-foreground">Swiggy</strong>.
          </p>
          {/* <div className="flex flex-wrap justify-center gap-3 mt-6">
            {["Flipkart", "Kantar", "Swiggy"].map((c) => (
              <span
                key={c}
                className="bg-card border border-border text-foreground font-semibold text-sm px-5 py-2 rounded-full shadow-sm"
              >
                {c}
              </span>
            ))}
          </div> */}
        </div>
      </section>

      <section className="bg-[#FFFAFA] mx-[15px] md:mx-[40px] lg:mx-[100px] my-8 md:my-16 rounded-2xl">
        {/* Section I: Working moms */}
        <section className="px-4 md:px-8 py-10 md:py-14 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              Section I
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Designed for working moms
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <WorkshopCard
              emoji="🤱"
              number="01"
              duration="75-min webinar"
              title="Preparing New Moms for Career Transition"
              description="50 minutes + Q&A"
              covers={[
                "Motherhood as a pivotal career transition and how to plan for it",
                "Getting clear on career expectations in this new phase",
                "Assessing your current role fit against those expectations",
                "Identifying gaps (flexibility, purpose, systems) and practical ways to bridge them",
                "Mindset shifts to support lasting growth and a reinvention of your professional identity",
                "For an audience of 50 or below",
              ]}
              pricing={[
                { label: "Virtual", price: "INR 25,000" },
                { label: "In-person (Mumbai)", price: "INR 34,000" },
                {
                  label: "In-person (outside Mumbai)",
                  price: "INR 34,000 + travel",
                },
              ]}
            />
            <WorkshopCard
              emoji="👥"
              number="02"
              duration="75-min workshop"
              title="How to Help New Moms Transition Successfully"
              objective="Equip managers with practical tools to support returning moms, protect retention, and accelerate performance."
              outcomes="Key outcomes: improved retention of returning moms, clearer promotion paths, and stronger team alignment."
              covers={[
                "Understanding the motherhood transition and its impact on performance",
                "Strategies to implement and communicate transition-support policies",
                "Milestone-based conversation templates to ensure alignment",
                "Sponsorship and visibility: how to advocate for and elevate returning moms",
                "For an audience of 50 or below",
              ]}
              pricing={[
                { label: "Virtual", price: "INR 25,000" },
                { label: "In-person (Mumbai)", price: "INR 34,000" },
                {
                  label: "In-person (outside Mumbai)",
                  price: "INR 34,000 + travel",
                },
              ]}
            />
          </div>
        </section>

        {/* Section II: Women in corporate */}
        <section className="px-4 md:px-8 pb-10 md:pb-14 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              Section II
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Designed for women in corporate
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <WorkshopCard
              emoji="✨"
              number="03"
              duration="75-min workshop"
              title="Visibility Workshop: Helping Your Women Learn to Shine to Facilitate Growth"
              covers={[
                "Why visibility matters for career growth",
                "A quick self-audit to map your current visibility and gaps",
                "Strategies to overcome fears and biases around visibility",
                "Hands-on practice: storytelling for impact, concise elevator pitches, confident meeting presence, and stakeholder mapping",
                "For an audience of 50 or below",
              ]}
              pricing={[
                { label: "Virtual", price: "INR 25,000" },
                { label: "In-person (Mumbai)", price: "INR 34,000" },
                {
                  label: "In-person (outside Mumbai)",
                  price: "INR 34,000 + travel",
                },
              ]}
            />
            <div className="bg-secondary/40 rounded-2xl border border-dashed border-border p-6 md:p-8 flex flex-col justify-center text-center">
              <span className="text-4xl mb-3">🚧</span>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                Coming Soon
              </p>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">
                12-Week Accountability Coaching Add-On
              </h3>
              <p className="text-sm text-muted-foreground">
                Translate workshop insights into real, measurable results with a
                structured, weekly coaching cadence, accountability systems, and
                a clear 90-day action plan.
              </p>
            </div>
          </div>
        </section>
      </section>

      {/* Custom enquiry */}
      <section
        className="relative z-10 mx-[15px] md:mx-[40px] lg:mx-[100px] mb-[25px] bg-[#F2D2D7]"
        style={sectionBg}
      >
        <div className="px-4 md:px-8 py-12 md:py-16 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                  Let's customise
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight mb-4">
                  Every organisation is different.
                </h2>
                <p className="text-muted-foreground mb-6">
                  Which makes their requirements unique too. Let's chat to
                  customise the package that works for you.
                </p>
                <div className="md:flex md:justify-center hidden md:block">
                  <img
                    src={butterflyGreen}
                    alt=""
                    aria-hidden="true"
                    className="w-28 md:w-48 lg:w-48"
                  />
                </div>
              </div>
              <div className="p-8 md:p-10 bg-primary-foreground border-l border-border">
                <CorporateEnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Corporate;
