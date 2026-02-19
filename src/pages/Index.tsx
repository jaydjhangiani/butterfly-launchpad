import ButterflyDecor from "@/components/ButterflyDecor";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import logo from "@/assets/logo.png";
import accBadge from "@/assets/acc-badge.png";
import butterflyGreen from "@/assets/butterfly-green.png";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-primary-foreground">
      {/* Header / Navbar */}
      <nav className="relative z-10 px-6 py-4 max-w-5xl mx-auto rounded-b-xl items-center justify-between pb-0 pr-0 pl-0 pt-0 flex flex-row bg-primary-foreground shadow-none">
        <img src={logo} alt="Butterfly Effect Coach" className="h-20 md:h-24" />
        <img src={accBadge} alt="ICF Associate Certified Coach" className="h-12 md:h-14" />
      </nav>

      {/* Hero + Form section with background */}
      <div
        className="relative z-10 px-[15px] py-[15px] bg-inherit pt-0 pl-0 pr-0 pb-0 mx-[25px] my-[50px] ml-[25px] mt-[20px]"
        style={{
          backgroundImage: "url(\"/lovable-uploads/c0608300-b10b-4964-8008-2a3e109dd5c8.jpg\")",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>

        {/* Hero Section */}
        <header className="px-6 pt-8 pb-10 md:pt-14 md:pb-14 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Ready to test the waters?
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            1-on-1 coaching with me will help you{" "}
            <strong className="text-foreground">find clarity</strong> on{" "}
            <strong className="text-foreground">what you want</strong> (in your
            career and in life), and then get further clear on{" "}
            <strong className="text-foreground">how to get there</strong> with a
            concrete action plan and tools to{" "}
            <strong className="text-foreground">stay accountable</strong> to that
            plan.
          </p>
        </header>

        {/* Lead Capture Section */}
        <main className="px-6 pb-16 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left: Persuasive text + butterfly */}
              <div className="p-8 md:p-10 flex flex-col justify-center relative py-[20px] pt-[32px]">
                <img src={butterflyGreen} alt="Butterfly" className="w-32 h-32 mx-auto mb-6 hidden md:block" />
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-sm">Coaching believes no one size fits all.</p>
                  <p className="text-sm">We each have goals and plans that are unique to us.</p>
                  <p className="text-sm">Hence, no one coaching package fits all either.</p>
                  <p className="text-foreground font-semibold text-sm">
                    Let's have a 10-minute chat to understand what you need and
                    find you the package that will work for you!
                  </p>
                  <p className="text-sm">
                    Need another push into the beautiful waters?{" "}
                    <strong className="text-primary">Read the testimonials belo

                    </strong>
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="p-8 md:p-10 bg-primary-foreground px-[32px] py-[20px] pb-[32px] pt-[10px]">
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6 text-center text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Butterfly Effect Coaching</p>
        <p>© {new Date().getFullYear()} Butterfly Effect. All rights reserved.</p>
      </footer>
    </div>);

};

export default Index;