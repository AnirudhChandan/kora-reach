"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, RotateCcw } from "lucide-react";

type Choice = {
  label: string;
  tags: string[];
};

type Question = {
  question: string;
  subtitle: string;
  choices: Choice[];
  multiSelect?: boolean;
};

const questions: Question[] = [
  {
    question: "What matters most to you right now?",
    subtitle: "Pick the one that resonates most.",
    choices: [
      { label: "Getting out of the house more", tags: ["community"] },
      { label: "Help with day-to-day tasks at home", tags: ["daily"] },
      { label: "Learning new skills and gaining independence", tags: ["capacity"] },
      { label: "Getting to appointments and activities safely", tags: ["transport"] },
    ],
  },
  {
    question: "What does a good week look like for you?",
    subtitle: "Think about what you'd love your week to include.",
    choices: [
      { label: "Joining clubs, events, or meeting friends", tags: ["community"] },
      { label: "A clean home, prepared meals, and a solid routine", tags: ["daily"] },
      { label: "Progressing toward a personal goal", tags: ["capacity"] },
      { label: "Never missing an appointment or outing", tags: ["transport"] },
    ],
  },
  {
    question: "What kind of support worker vibe works for you?",
    subtitle: "Everyone's different — there's no wrong answer.",
    choices: [
      { label: "Someone social and active — let's go places!", tags: ["community", "transport"] },
      { label: "Someone calm and respectful in my space", tags: ["daily"] },
      { label: "Someone who coaches and motivates me", tags: ["capacity"] },
      { label: "Someone reliable and always on time", tags: ["transport", "daily"] },
    ],
  },
  {
    question: "Which of these would make the biggest difference?",
    subtitle: "Select all that apply.",
    multiSelect: true,
    choices: [
      { label: "Feeling more connected to my community", tags: ["community"] },
      { label: "Having consistent help with personal care", tags: ["daily"] },
      { label: "Building confidence to do things on my own", tags: ["capacity"] },
      { label: "Reliable transport when I need it", tags: ["transport"] },
    ],
  },
];

type ServiceInfo = {
  id: string;
  title: string;
  description: string;
  href: string;
  color: string;
};

const services: Record<string, ServiceInfo> = {
  community: {
    id: "community",
    title: "Community Participation",
    description: "Get out, get active, and connect with your local Melbourne community with a support worker by your side.",
    href: "/services/community-participation",
    color: "from-blue-500/10 to-teal-500/10",
  },
  daily: {
    id: "daily",
    title: "Daily Living Support",
    description: "Respectful, reliable help with personal care, meals, and household routines in your own home.",
    href: "/services/daily-living",
    color: "from-indigo-500/10 to-blue-500/10",
  },
  capacity: {
    id: "capacity",
    title: "Capacity Building",
    description: "Skill development and mentoring to help you gain confidence and live more independently over time.",
    href: "/services/capacity-building",
    color: "from-teal-500/10 to-emerald-500/10",
  },
  transport: {
    id: "transport",
    title: "Transport Support",
    description: "Safe, reliable door-to-door transport so you never miss an appointment, event, or opportunity.",
    href: "/services/transport-support",
    color: "from-sky-500/10 to-indigo-500/10",
  },
};

function getRecommendations(selections: string[][]): ServiceInfo[] {
  const tagCounts: Record<string, number> = {};

  for (const stepSelections of selections) {
    for (const sel of stepSelections) {
      const choice = questions
        .flatMap((q) => q.choices)
        .find((c) => c.label === sel);
      if (choice) {
        for (const tag of choice.tags) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
      }
    }
  }

  const sorted = Object.entries(tagCounts)
    .sort(([, a], [, b]) => b - a);

  if (sorted.length === 0) return [services.community];

  const topScore = sorted[0][1];
  const primary = sorted.filter(([, score]) => score === topScore).map(([tag]) => tag);
  const secondary = sorted.filter(([, score]) => score < topScore && score > 0).map(([tag]) => tag);

  const results = [
    ...primary.map((tag) => services[tag]),
    ...secondary.slice(0, 1).map((tag) => services[tag]),
  ].filter(Boolean);

  return results.length > 0 ? results : [services.community];
}

export default function ServiceQuiz() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<string[][]>(
    questions.map(() => [])
  );
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  const currentQ = questions[step];
  const currentSelections = selections[step];

  const toggleSelection = (label: string) => {
    const updated = [...selections];
    if (currentQ.multiSelect) {
      const idx = updated[step].indexOf(label);
      if (idx >= 0) {
        updated[step] = updated[step].filter((l) => l !== label);
      } else {
        updated[step] = [...updated[step], label];
      }
    } else {
      updated[step] = [label];
    }
    setSelections(updated);
  };

  const canProceed = currentSelections.length > 0;

  const next = () => {
    if (!canProceed) return;
    setDirection("forward");
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 150);
    } else {
      setTimeout(() => setShowResults(true), 200);
    }
  };

  const back = () => {
    if (showResults) {
      setShowResults(false);
      return;
    }
    if (step > 0) {
      setDirection("back");
      setStep(step - 1);
    }
  };

  const reset = () => {
    setStep(0);
    setSelections(questions.map(() => []));
    setShowResults(false);
    setDirection("forward");
  };

  const recommendations = showResults ? getRecommendations(selections) : [];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-brand-dark/40 mb-4">
            Service Finder
          </p>
          <h2 className="mb-4">What support suits you best?</h2>
          <p className="text-lg text-brand-dark/60 font-sans">
            Answer a few quick questions and we will recommend the right services for your goals.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] gradient-border shadow-elevated-lg p-8 md:p-12">
          {!showResults ? (
            <>
              <div className="flex items-center gap-2 mb-8">
                {questions.map((_, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-brand-lightGreen">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-[var(--ease-spring)]"
                      style={{
                        width: i < step ? "100%" : i === step ? "50%" : "0%",
                        backgroundColor:
                          i < step
                            ? "var(--color-brand-green)"
                            : i === step
                              ? "var(--color-brand-accent)"
                              : "transparent",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div
                key={step}
                className={`animate-in fade-in duration-300 ${
                  direction === "forward" ? "slide-in-from-right-4" : "slide-in-from-left-4"
                }`}
              >
                <p className="text-xs font-sans font-semibold tracking-wider uppercase text-brand-accent mb-3">
                  Question {step + 1} of {questions.length}
                </p>
                <h3 className="text-2xl font-serif mb-2">{currentQ.question}</h3>
                <p className="text-brand-dark/50 font-sans text-sm mb-8">
                  {currentQ.subtitle}
                </p>

                <div className="space-y-3">
                  {currentQ.choices.map((choice) => {
                    const selected = currentSelections.includes(choice.label);
                    return (
                      <button
                        key={choice.label}
                        onClick={() => toggleSelection(choice.label)}
                        className="w-full text-left py-4 px-6 rounded-xl border-2 font-sans transition-all duration-300 ease-[var(--ease-spring)]"
                        style={{
                          borderColor: selected
                            ? "var(--color-brand-green)"
                            : "var(--color-brand-lightGreen)",
                          backgroundColor: selected
                            ? "var(--color-brand-lightGreen)"
                            : "transparent",
                          color: selected
                            ? "var(--color-brand-green)"
                            : "var(--color-brand-dark)",
                        }}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className="w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-300"
                            style={{
                              borderColor: selected
                                ? "var(--color-brand-green)"
                                : "rgba(26, 26, 26, 0.3)",
                              backgroundColor: selected
                                ? "var(--color-brand-green)"
                                : "transparent",
                            }}
                          >
                            {selected && (
                              <span className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </span>
                          {choice.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={back}
                  className={`flex items-center gap-2 text-sm font-sans transition-colors ${
                    step === 0
                      ? "text-brand-dark/20 cursor-not-allowed"
                      : "text-brand-dark/50 hover:text-brand-dark"
                  }`}
                  disabled={step === 0}
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={next}
                  disabled={!canProceed}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-sans font-medium text-sm transition-all duration-300 ease-[var(--ease-spring)]"
                  style={{
                    backgroundColor: canProceed
                      ? "var(--color-brand-green)"
                      : "var(--color-brand-lightGreen)",
                    color: canProceed ? "#ffffff" : "var(--color-brand-dark)",
                    opacity: canProceed ? 1 : 0.5,
                  }}
                >
                  {step === questions.length - 1 ? "See My Results" : "Next"}
                  <ArrowRight size={14} />
                </button>
              </div>
            </>
          ) : (
            <div className="animate-in fade-in zoom-in-95 duration-400">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-accent/10 mb-4">
                  <Sparkles size={28} className="text-brand-accent" />
                </div>
                <h3 className="text-2xl font-serif mb-2">
                  {recommendations.length === 1
                    ? "We recommend this service for you"
                    : `Here are your top ${recommendations.length} matches`}
                </h3>
                <p className="text-brand-dark/50 font-sans text-sm">
                  Based on your answers, these services align best with your goals.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {recommendations.map((service, i) => (
                  <Link
                    key={service.id}
                    href={service.href}
                    className="block group"
                  >
                    <div
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ease-[var(--ease-spring)] hover:-translate-y-1 bg-gradient-to-br ${service.color}`}
                      style={{
                        borderColor:
                          i === 0
                            ? "var(--color-brand-green)"
                            : "var(--color-brand-lightGreen)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          {i === 0 && (
                            <span className="inline-block text-xs font-sans font-semibold tracking-wider uppercase text-brand-accent mb-2">
                              Best Match
                            </span>
                          )}
                          <h4 className="text-lg font-serif mb-1 group-hover:text-brand-green transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-brand-dark/60 font-sans text-sm leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                        <ArrowRight
                          size={18}
                          className="text-brand-green shrink-0 mt-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/contact"
                  className="btn-primary flex items-center gap-2 group"
                >
                  Enquire About These Services
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-sm text-brand-dark/50 font-sans hover:text-brand-dark transition-colors px-4 py-2"
                >
                  <RotateCcw size={14} /> Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
