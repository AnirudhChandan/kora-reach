"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

type Answer = "yes" | "no" | "unsure" | null;

const questions = [
  {
    question: "Do you have an active NDIS plan?",
    hint: "If you have received a letter from the NDIA confirming your plan, select Yes.",
  },
  {
    question: "Is your plan self-managed or plan-managed?",
    hint: "We work with self-managed and plan-managed participants. NDIA-managed participants may need a registered provider.",
  },
  {
    question: "Are you located in Victoria?",
    hint: "We currently serve participants across Victoria.",
  },
];

type ResultType = "eligible" | "maybe" | "not-eligible";

function getResult(answers: Answer[]): ResultType {
  const allYes = answers.every((a) => a === "yes");
  const anyNo = answers.some((a) => a === "no");

  if (allYes) return "eligible";
  if (anyNo) return "not-eligible";
  return "maybe";
}

const results: Record<
  ResultType,
  { icon: React.ReactNode; title: string; message: string; showCTA: boolean }
> = {
  eligible: {
    icon: <CheckCircle2 size={40} className="text-brand-green" />,
    title: "Great news — we can likely help you!",
    message:
      "Based on your answers, you appear to be a strong fit for Kora Reach services. Submit an enquiry and our team will confirm everything.",
    showCTA: true,
  },
  maybe: {
    icon: <HelpCircle size={40} className="text-brand-accent" />,
    title: "We may be able to help.",
    message:
      "Some of your answers need a quick conversation to confirm. Reach out and our intake team can review your situation — no obligation.",
    showCTA: true,
  },
  "not-eligible": {
    icon: <XCircle size={40} className="text-red-400" />,
    title: "We might not be the right fit — but we can point you in the right direction.",
    message:
      "Based on your answers, our services may not align with your current situation. Feel free to call us and we can suggest alternative providers.",
    showCTA: true,
  },
};

export default function EligibilityCheck() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: Answer) => {
    const updated = [...answers];
    updated[step] = answer;
    setAnswers(updated);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([null, null, null]);
    setShowResult(false);
  };

  const result = showResult ? results[getResult(answers)] : null;

  return (
    <section className="py-24">
      <div className="container-custom max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-sans font-semibold tracking-[0.2em] uppercase text-brand-dark/40 mb-4">
            Quick Check
          </p>
          <h2 className="mb-4">Can we support you?</h2>
          <p className="text-lg text-brand-dark/60 font-sans">
            Answer three quick questions to find out if Kora Reach is a fit.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] gradient-border shadow-elevated-lg p-8 md:p-12">
          {!showResult ? (
            <>
              <div className="flex items-center gap-2 mb-8">
                {questions.map((_, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-brand-lightGreen">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-[var(--ease-spring)]"
                      style={{
                        width: answers[i] !== null ? "100%" : i === step ? "30%" : "0%",
                        backgroundColor:
                          answers[i] !== null
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
                className="animate-in fade-in slide-in-from-right-4 duration-300"
              >
                <h3 className="text-2xl font-serif mb-3">
                  {questions[step].question}
                </h3>
                <p className="text-brand-dark/50 font-sans text-sm mb-8">
                  {questions[step].hint}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {(["yes", "no", "unsure"] as const).map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="group relative py-4 px-6 rounded-xl border-2 font-sans font-medium transition-all duration-300 ease-[var(--ease-spring)] text-center capitalize hitbox-expand"
                      style={{
                        borderColor:
                          answers[step] === option
                            ? "var(--color-brand-green)"
                            : "var(--color-brand-lightGreen)",
                        backgroundColor:
                          answers[step] === option
                            ? "var(--color-brand-lightGreen)"
                            : "transparent",
                        color:
                          answers[step] === option
                            ? "var(--color-brand-green)"
                            : "var(--color-brand-dark)",
                      }}
                    >
                      {option === "unsure" ? "Not sure" : option}
                    </button>
                  ))}
                </div>
              </div>

              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="mt-6 flex items-center gap-2 text-sm text-brand-dark/50 font-sans hover:text-brand-dark transition-colors"
                >
                  <ArrowLeft size={14} /> Previous question
                </button>
              )}
            </>
          ) : (
            result && (
              <div className="text-center animate-in fade-in zoom-in duration-400">
                <div className="mb-6 flex justify-center">{result.icon}</div>
                <h3 className="text-2xl font-serif mb-4">{result.title}</h3>
                <p className="text-brand-dark/60 font-sans leading-relaxed mb-8 max-w-md mx-auto">
                  {result.message}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  {result.showCTA && (
                    <Link
                      href="/contact"
                      className="btn-primary flex items-center gap-2 group"
                    >
                      Start an Enquiry
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  )}
                  <button
                    onClick={reset}
                    className="text-sm text-brand-dark/50 font-sans hover:text-brand-dark transition-colors px-4 py-2"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
