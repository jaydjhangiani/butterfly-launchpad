import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

type Choice = "A" | "B" | "C";
type Path = "pivot" | "launch" | "ascent";

interface QuizQuestion {
  number: number;
  title: string;
  prompt: string;
  options: { letter: Choice; text: string }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    number: 1,
    title: "The Gut Check",
    prompt:
      "When you think about your career right now, what's the feeling that shows up most often?",
    options: [
      {
        letter: "A",
        text: "Dread, numbness, or a quiet sense of \"this just isn't me anymore.\" I'm not just unhappy — something feels fundamentally wrong.",
      },
      {
        letter: "B",
        text: "Restlessness and excitement mixed together. I have an idea — or the beginning of one — but I'm not sure if it's real or if I'm the right person to pursue it.",
      },
      {
        letter: "C",
        text: "Frustration. I know I'm capable of more. I'm doing the work, but I'm not getting the recognition, the title, or the money that reflects it.",
      },
    ],
  },
  {
    number: 2,
    title: "The Energy Audit",
    prompt:
      "Think about your average workday. Which of these sounds most like you?",
    options: [
      {
        letter: "A",
        text: "I'm going through the motions. There are very few moments — if any — where I feel genuinely engaged or energised by what I do.",
      },
      {
        letter: "B",
        text: "My energy is all over the place. Some days I feel lit up by the possibility of what I could build. Other days I spiral into doubt about whether I'm capable of pulling it off.",
      },
      {
        letter: "C",
        text: "I bring my best to my work, consistently. But I leave exhausted in a way that feels unfair — like I'm giving far more than I'm receiving back.",
      },
    ],
  },
  {
    number: 3,
    title: "The Identity Question",
    prompt:
      "If someone asked you 'what do you want to do next with your career?' — what happens inside you?",
    options: [
      {
        letter: "A",
        text: "A blank. Or panic. Or both. The honest answer is: I have no idea, and that terrifies me — or has slowly stopped terrifying me, which is even scarier.",
      },
      {
        letter: "B",
        text: "I light up — then immediately talk myself out of it. I have a vision, but I'm not sure it's realistic. I'm not sure I'm realistic.",
      },
      {
        letter: "C",
        text: "I know exactly what I want. A promotion. A raise. A seat at the table I've already earned. I just don't know how to make it happen — or why it hasn't happened yet.",
      },
    ],
  },
  {
    number: 4,
    title: "The Support Scan",
    prompt:
      "When it comes to your career right now, what kind of support do you feel you most need?",
    options: [
      {
        letter: "A",
        text: "Someone to help me figure out who I even am professionally — what I'm good at, what I actually want, and what a career that fits me could look like.",
      },
      {
        letter: "B",
        text: "Someone to help me take my idea from a feeling to a plan. To validate that it's real, and then walk with me as I build it step by step.",
      },
      {
        letter: "C",
        text: "Someone to help me position myself, speak up, and be seen — so that the work I'm already doing finally translates into the growth I deserve.",
      },
    ],
  },
  {
    number: 5,
    title: "The Butterfly Wing",
    prompt:
      "Complete this sentence honestly: 'My career would feel completely different if I could just...'",
    options: [
      {
        letter: "A",
        text: "...figure out what I actually want. I'm tired of chasing things that look good on paper but leave me empty inside.",
      },
      {
        letter: "B",
        text: "...stop second-guessing myself and actually start. The idea is there. The fear is louder.",
      },
      {
        letter: "C",
        text: "...get what I've already earned. I'm not asking for the moon. I'm asking to be paid and recognised for the value I already bring.",
      },
    ],
  },
  {
    number: 6,
    title: "The Clock Check",
    prompt:
      "When you imagine finally making this change, what's your honest relationship with time?",
    options: [
      {
        letter: "A",
        text: "I needed this yesterday. I've been tolerating this situation for too long and something in me has started to go quiet — in a way that scares me.",
      },
      {
        letter: "B",
        text: "I'm ready to move, but I want to move right. I'd rather take 6–12 months and do this properly than rush into another version of the wrong thing.",
      },
      {
        letter: "C",
        text: "I'm playing the long game. I've been building steadily and I'm not going anywhere — I just want to make sure the next move lands.",
      },
    ],
  },
];

const RESULTS: Record<
  Path,
  {
    emoji: string;
    name: string;
    headline: string;
    tagline: string;
    validation: string[];
    naming: string[];
    transitionTitle: string;
    transitionIntro: string;
    stages: { title: string; body: string }[];
    excitement: string[];
    finalCta: string;
  }
> = {
  pivot: {
    emoji: "🌱",
    name: "Pivot",
    headline: "You're a Pivot Woman.",
    tagline: "And that's not starting over. That's finally starting right.",
    validation: [
      'You\'ve been doing the "responsible" thing for a while now. Showing up. Delivering. Keeping it professional even when something inside you has been quietly — sometimes loudly — asking for more.',
      "But lately, the gap between who you are at work and who you actually are has started to feel less like a gap and more like a wall.",
      "You chose mostly A's because some part of you already knows: this isn't a bad week. This isn't burnout you can fix with a holiday. This is misalignment — and the most honest, courageous thing you can do right now is admit that and decide to do something about it.",
    ],
    naming: [
      "You may not know exactly what you want yet — and that's okay. Knowing what you don't want is the beginning of everything.",
      "You're not lazy, directionless, or dramatic. You're a woman who has outgrown a version of herself — and you're looking for the next one.",
      "The discomfort you feel isn't a sign you're failing. It's a signal. And signals are the start of every great pivot.",
    ],
    transitionTitle: "Your next step is The Pivot Roadmap.",
    transitionIntro:
      "This is a three-stage journey designed specifically for women who are starting from clarity about what isn't working — and building forward to clarity about what will.",
    stages: [
      {
        title: "Stage 1 — Know Yourself",
        body: "Excavate your values, strengths, and energy patterns so your next move is rooted in you — not expectation.",
      },
      {
        title: "Stage 2 — Know Your Options",
        body: "Explore what's actually possible, on your terms.",
      },
      {
        title: "Stage 3 — Know Your Move",
        body: "Build and execute a transition plan with confidence.",
      },
    ],
    excitement: [
      "The career that is actually seeking you out — the one that fits who you really are — is closer than it feels right now.",
    ],
    finalCta: "Your Clarity Compass Roadmap is ready. Let's begin.",
  },
  launch: {
    emoji: "🚀",
    name: "Launch",
    headline: "You're a Launch Woman.",
    tagline: "The idea is real. You are ready. It's time to build.",
    validation: [
      "You have a vision. Maybe it's been living in your notes app for six months. Maybe you've told one person about it — whispered it, really — and immediately wondered if you sounded naive.",
      "You chose mostly B's because you're standing at the edge of something that feels both terrifying and inevitable. You can see what you want to build. You just can't always see yourself building it.",
      "That's not a lack of readiness. That's a lack of a roadmap. And that's exactly what we're about to change.",
    ],
    naming: [
      "The idea you keep coming back to? It's not a fantasy. It's a signal. The fact that it won't leave you alone is the most important data point you have.",
      "Your self-doubt is not evidence that you're wrong for this. It's evidence that this matters to you — deeply.",
      "You don't need more time to think. You need a structured way to move from feeling to building — without burning everything down first.",
    ],
    transitionTitle: "Your next step is The Launch Roadmap.",
    transitionIntro:
      "This is a three-stage journey designed specifically for women who have the vision and need the scaffolding to make it real — without losing themselves in the process.",
    stages: [
      {
        title: "Stage 1 — Validate the Vision",
        body: "Get clear on whether your idea is right for you and right for the world.",
      },
      {
        title: "Stage 2 — Build the Foundation",
        body: "Turn your idea into a plan with real steps, real timelines, and real confidence.",
      },
      {
        title: "Stage 3 — Launch with Intention",
        body: "Go live — on your terms, at your pace, without apology.",
      },
    ],
    excitement: [
      "Every business, project, and movement that exists today was once just an idea someone almost talked themselves out of.",
      "You didn't talk yourself out of it. You're here.",
    ],
    finalCta: "Your Clarity Compass Roadmap is ready. Let's build it.",
  },
  ascent: {
    emoji: "👑",
    name: "Ascent",
    headline: "You're an Ascent Woman.",
    tagline:
      "You've done the work. Now it's time to make sure the world knows it.",
    validation: [
      "You are good at what you do. Genuinely, demonstrably good. The results are there. The effort is there. The loyalty, the extra hours, the ideas that quietly became company wins — all of it is there.",
      "And yet. The title hasn't changed. The salary hasn't reflected it. The room still doesn't always turn when you walk in — even though it should.",
      "You chose mostly C's because you're done waiting for someone to notice. You're ready to stop playing small in a career you've already outgrown — and start claiming the space, the recognition, and the reward you've earned.",
    ],
    naming: [
      "You don't have a skills problem. You have a visibility and positioning problem. And those are very solvable.",
      "The frustration you feel is not entitlement. It's the entirely reasonable response of a woman who has been consistently undervalued.",
      "You're not starting from scratch. You're starting from proof — and that is the most powerful place to negotiate from.",
    ],
    transitionTitle: "Your next step is The Ascent Roadmap.",
    transitionIntro:
      "This is a three-stage journey designed specifically for women who are done being overlooked and ready to rise — strategically, confidently, and permanently.",
    stages: [
      {
        title: "Stage 1 — Identity & Positioning",
        body: "Get radically clear on your value, your narrative, and what you're asking for — and why you deserve it.",
      },
      {
        title: "Stage 2 — Visibility & Influence",
        body: "Build the internal and external presence that makes the right people take notice.",
      },
      {
        title: "Stage 3 — Negotiation & Capture",
        body: "Ask for what you've earned — and actually get it.",
      },
    ],
    excitement: [
      'The most dangerous thing you can do right now is wait one more quarter, one more review cycle, one more "let me just prove myself a little more."',
      "You've already proved it. It's time to get paid for it.",
    ],
    finalCta: "Your Clarity Compass Roadmap is ready. Let's ascend.",
  },
};

const POINTS: Record<Choice, number> = { A: 1, B: 2, C: 3 };

function computeResult(answers: Choice[]): {
  path: Path;
  total: number;
  counts: Record<Choice, number>;
  isClose: boolean;
} {
  const counts = { A: 0, B: 0, C: 0 } as Record<Choice, number>;
  let total = 0;
  answers.forEach((a) => {
    counts[a] += 1;
    total += POINTS[a];
  });

  let path: Path;
  if (total <= 10) path = "pivot";
  else if (total <= 14) path = "launch";
  else path = "ascent";

  // Tiebreaker: if A==B or B==C, defer to Q1+Q3
  if (counts.A === counts.B && counts.A > 0) {
    const gut = answers[0];
    const identity = answers[2];
    const tiebreaker = [gut, identity];
    const aCount = tiebreaker.filter((x) => x === "A").length;
    path = aCount >= 1 ? "pivot" : "launch";
  } else if (counts.B === counts.C && counts.B > 0) {
    const gut = answers[0];
    const identity = answers[2];
    const tiebreaker = [gut, identity];
    const bCount = tiebreaker.filter((x) => x === "B").length;
    path = bCount >= 1 ? "launch" : "ascent";
  }

  // "isClose" = within 1-2 points of the next path boundary
  const isClose = (total >= 9 && total <= 12) || (total >= 13 && total <= 16);

  return { path, total, counts, isClose };
}

interface OwnYourNextQuizProps {
  onPurchaseClick: () => void;
  /** When true, the intro CTA links to the dedicated /quiz page instead of starting inline. */
  linkToQuizPage?: boolean;
}

const OwnYourNextQuiz = ({
  onPurchaseClick,
  linkToQuizPage = false,
}: OwnYourNextQuizProps) => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<ReturnType<typeof computeResult> | null>(null);
  const [gateForm, setGateForm] = useState({ name: "", email: "" });
  const [submittingGate, setSubmittingGate] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [interestEmail, setInterestEmail] = useState("");

  const handleSelect = (choice: Choice) => {
    const next = [...answers, choice];
    setAnswers(next);

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      const result = computeResult(next);
      setQuizResult(result);
      track("quiz_completed", { path: result.path, total: result.total });
      setShowEmailGate(true);
    }
  };

  const handleEmailGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateForm.email.trim() || submittingGate || !quizResult) return;

    setSubmittingGate(true);
    try {
      await fetch("/.netlify/functions/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: gateForm.email.trim(),
          name: gateForm.name.trim() || null,
          path: quizResult.path,
          total: quizResult.total,
        }),
      });
      track("quiz_lead_captured", { path: quizResult.path, total: quizResult.total });
    } catch {
      // non-blocking — still reveal result
    } finally {
      setSubmittingGate(false);
      setShowEmailGate(false);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setShowEmailGate(false);
    setShowResult(false);
    setQuizResult(null);
    setGateForm({ name: "", email: "" });
    setInterestOpen(false);
    setInterestEmail("");
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(interestEmail.trim())) return;

    toast.success("Thanks for your interest!", {
      description: "We'll reach out as soon as OwnYourNext is ready.",
      duration: 6000,
    });

    setInterestEmail("");
    setInterestOpen(false);
  };

  // ---- INTRO ----
  if (!started) {
    return (
      <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10 text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
          Free Quiz
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          The Clarity Compass Quiz
        </h3>
        <p className="text-foreground italic mb-6">
          Find Your Path. Start Your Journey.
        </p>
        <p className="text-muted-foreground text-base md:text-lg mb-4 max-w-xl mx-auto">
          6 questions. 3 minutes. A personalised roadmap built around where you
          actually are — not where you think you should be.
        </p>
        <p className="text-sm text-muted-foreground italic mb-8 max-w-xl mx-auto">
          For each question, choose the answer that feels most true right now —
          not the answer you wish were true, and not the "right" answer. There
          are no wrong paths here. The more honest you are, the more useful your
          results will be.
        </p>
        {linkToQuizPage ? (
          <Button asChild size="lg" className="font-semibold rounded-full px-8">
            <Link to="/quiz" onClick={() => track("quiz_started")}>Start the Quiz</Link>
          </Button>
        ) : (
          <Button
            onClick={() => { setStarted(true); track("quiz_started"); }}
            size="lg"
            className="font-semibold rounded-full px-8"
          >
            Start the Quiz
          </Button>
        )}
      </div>
    );
  }

  // ---- EMAIL GATE ----
  if (showEmailGate && quizResult) {
    const pathNames: Record<string, string> = { pivot: "Pivot", launch: "Launch", ascent: "Ascent" };
    const pathEmojis: Record<string, string> = { pivot: "🌱", launch: "🚀", ascent: "👑" };

    return (
      <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10 max-w-3xl mx-auto text-center">
        <div className="text-5xl mb-4">{pathEmojis[quizResult.path]}</div>
        <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
          Your result is ready
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          You're a {pathNames[quizResult.path]} Woman.
        </h3>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
          Enter your details to reveal your personalised roadmap — we'll also send it to your inbox.
        </p>

        <form onSubmit={handleEmailGateSubmit} className="space-y-4 max-w-sm mx-auto text-left">
          <div>
            <Label htmlFor="gate-name">
              Name <span className="text-muted-foreground text-xs font-normal">(optional)</span>
            </Label>
            <Input
              id="gate-name"
              value={gateForm.name}
              onChange={(e) => setGateForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Your name"
              disabled={submittingGate}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="gate-email">Email</Label>
            <Input
              id="gate-email"
              type="email"
              value={gateForm.email}
              onChange={(e) => setGateForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com"
              required
              disabled={submittingGate}
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={!gateForm.email.trim() || submittingGate}
          >
            {submittingGate ? "Saving…" : "Reveal my result →"}
          </Button>
        </form>
      </div>
    );
  }

  // ---- RESULT ----
  if (showResult) {
    const { path, total, counts, isClose } = quizResult!;
    const result = RESULTS[path];

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10">
          <div className="text-center mb-8">
            <div className="text-6xl mb-3">{result.emoji}</div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              Your Result
            </p>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {result.headline}
            </h3>
            <p className="text-lg text-foreground italic">{result.tagline}</p>
            <div className="inline-flex items-center gap-3 bg-secondary rounded-full px-4 py-2 mt-4 text-sm text-muted-foreground">
              <span>
                Score: <strong className="text-foreground">{total}</strong>
              </span>
              <span>·</span>
              <span>
                A: {counts.A} · B: {counts.B} · C: {counts.C}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {result.validation.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="bg-secondary/40 rounded-xl p-5 mb-8">
            <p className="text-foreground font-semibold mb-3">
              Here's what's true about you right now:
            </p>
            <ul className="space-y-2">
              {result.naming.map((n, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-muted-foreground text-sm"
                >
                  <span className="text-primary mt-0.5 shrink-0">✓</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-bold text-foreground mb-2">
              {result.transitionTitle}
            </h4>
            <p className="text-muted-foreground mb-4">
              {result.transitionIntro}
            </p>
            <div className="space-y-3">
              {result.stages.map((s, i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-4"
                >
                  <p className="font-semibold text-foreground text-sm">
                    {s.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {isClose && (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-8">
              <p className="text-sm text-foreground font-semibold mb-1">
                💡 Felt torn between two answers?
              </p>
              <p className="text-sm text-muted-foreground">
                You're not confused — you're complex. Your score sits close to
                the next path, which is common for women in transition. Begin
                with your highest-scoring path; the roadmap is built to be
                revisited.
              </p>
            </div>
          )}

          <div className="space-y-3 mb-2">
            {result.excitement.map((e, i) => (
              <p key={i} className="text-foreground italic text-center">
                {e}
              </p>
            ))}
          </div>
          <p className="text-foreground font-bold text-center text-lg mt-4">
            {result.finalCta}
          </p>
        </div>

        {/* CTA card */}
        <div className="bg-card rounded-2xl shadow-md border border-border p-6 md:p-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            👇 Ready to get your personalised OwnYourNext roadmap?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              onClick={() => setInterestOpen(true)}
              className="font-semibold rounded-full"
            >
              Get OwnYourNext
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="font-semibold rounded-full text-sm whitespace-normal"
            >
              <Link to="/private-coaching">
                Prefer a hand-held approach? See Private Coaching
              </Link>
            </Button>
          </div>
          <button
            onClick={handleRestart}
            className="text-xs text-muted-foreground hover:text-foreground underline mt-2"
          >
            Retake the quiz
          </button>
        </div>

        <Dialog open={interestOpen} onOpenChange={setInterestOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Get OwnYourNext</DialogTitle>
              <DialogDescription>
                Thank you for your interest. Drop your email so we can reach out
                when it's ready!
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInterestSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="oyn-interest-email">Email</Label>
                <Input
                  id="oyn-interest-email"
                  type="email"
                  value={interestEmail}
                  onChange={(e) => setInterestEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full font-semibold">
                Notify me
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ---- QUESTION ----
  const q = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;

  return (
    <div className="bg-card rounded-2xl shadow-lg border border-border p-6 md:p-10 max-w-3xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-widest text-primary">
            Question {q.number} of {QUESTIONS.length}
          </span>
          <span>{q.title}</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-snug">
        {q.prompt}
      </h3>

      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.letter}
            onClick={() => handleSelect(opt.letter)}
            className="w-full text-left bg-secondary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary border border-border rounded-xl p-4 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <span className="bg-primary text-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary font-bold text-sm rounded-full h-7 w-7 flex items-center justify-center shrink-0 transition-colors">
                {opt.letter}
              </span>
              <span className="text-sm text-foreground group-hover:text-primary-foreground leading-relaxed">
                {opt.text}
              </span>
            </div>
          </button>
        ))}
      </div>

      {current > 0 && (
        <button
          onClick={() => {
            setAnswers(answers.slice(0, -1));
            setCurrent(current - 1);
          }}
          className="text-xs text-muted-foreground hover:text-foreground underline mt-6"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default OwnYourNextQuiz;
