"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IMaskInput } from "react-imask";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/components/Toast";

const formSchema = z
  .object({
    role: z.enum(
      ["Participant", "Family Member", "Support Coordinator", "Other"],
      {
        error: "Please select your role",
      },
    ),
    fullName: z.string().min(2, "Name is required"),
    participantName: z.string().optional(),
    phone: z.string().min(10, "Valid 10-digit phone is required"),
    email: z.string().email("Valid email is required"),
    supportType: z.string().min(2, "Please select support type"),
    suburb: z.string().min(2, "Suburb is required"),
    planManagement: z.enum(
      ["Self-Managed", "Plan-Managed", "NDIA-Managed", "Unsure"],
      {
        error: "Please select plan management type",
      },
    ),
    message: z.string().min(10, "Please provide brief details"),
  })
  .superRefine((data, ctx) => {
    if (
      data.role !== "Participant" &&
      (!data.participantName || data.participantName.length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Participant name is required",
        path: ["participantName"],
      });
    }
  });

type FormData = z.infer<typeof formSchema>;

function FormField({
  label,
  error,
  accent,
  children,
}: {
  label: string;
  error?: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className={`block text-sm font-medium mb-2 transition-colors ${accent ? "text-brand-accent" : ""}`}
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-red-500 text-sm mt-1 block animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </span>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense>
      <ContactForm />
    </Suspense>
  );
}

function ContactForm() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { role: "Participant" },
  });

  useEffect(() => {
    const region = searchParams.get("region");
    if (region) {
      setValue("suburb", region);
    }
  }, [searchParams, setValue]);

  const selectedRole = watch("role");

  const goToStep = async (target: number) => {
    if (target > step) {
      let fieldsToValidate: (keyof FormData)[] = [];
      if (step === 1)
        fieldsToValidate = [
          "role",
          "fullName",
          "participantName",
          "phone",
          "email",
        ];
      if (step === 2) fieldsToValidate = ["supportType", "suburb"];

      const isStepValid = await trigger(fieldsToValidate);
      if (!isStepValid) return;
    }
    setDirection(target > step ? "forward" : "back");
    setStep(target);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmittedData(data);
        setIsSuccess(true);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast("Submission error. Please try again or call us.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideClass =
    direction === "forward"
      ? "animate-in slide-in-from-right-6 fade-in duration-400"
      : "animate-in slide-in-from-left-6 fade-in duration-400";

  return (
    <>
      <section className="bg-brand-lightGreen py-24 gradient-mesh">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl mb-6">Let&apos;s Get Started.</h1>
          <p className="text-xl text-brand-dark/80 max-w-2xl font-sans">
            Complete our guided intake process below. We will review your
            details and reach out within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24 bg-brand-warmNeutral">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-elevated-lg border border-brand-lightGreen relative">
            {isSuccess && submittedData ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div
                  className="h-24 w-24 bg-brand-lightGreen rounded-full flex items-center justify-center mb-8"
                  style={{
                    animation:
                      "successPop 0.6s var(--ease-spring) forwards",
                  }}
                >
                  <CheckCircle2 className="text-brand-green" size={48} />
                </div>
                <h2 className="text-4xl mb-4">
                  Request Received, {submittedData.fullName.split(" ")[0]}!
                </h2>
                <p className="text-lg font-sans text-brand-dark/70 leading-relaxed max-w-lg">
                  Our intake team is reviewing your request for{" "}
                  <strong className="text-brand-dark">
                    {submittedData.supportType}
                  </strong>{" "}
                  in{" "}
                  <strong className="text-brand-dark">
                    {submittedData.suburb}
                  </strong>
                  . We will call you on {submittedData.phone} within 1-2
                  business days.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-12">
                  <div className="flex justify-between mb-3 text-sm font-sans font-medium text-brand-dark/60">
                    {["Details", "Support", "Finish"].map((label, i) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          if (i + 1 < step) goToStep(i + 1);
                        }}
                        className={`transition-colors duration-300 ${
                          step >= i + 1
                            ? "text-brand-green font-semibold"
                            : ""
                        } ${i + 1 < step ? "cursor-pointer hover:underline" : "cursor-default"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="h-2 bg-brand-lightGreen rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-green rounded-full transition-all duration-700 ease-[var(--ease-spring)]"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  className="font-sans"
                >
                  {step === 1 && (
                    <div className={`space-y-6 ${slideClass}`} key="step1">
                      <h3 className="text-2xl font-serif mb-8">
                        Who is filling out this form?
                      </h3>

                      <FormField label="I am a... *" error={errors.role?.message}>
                        <select
                          {...register("role")}
                          className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                        >
                          <option value="Participant">
                            Participant (Looking for support for myself)
                          </option>
                          <option value="Family Member">
                            Family Member / Carer
                          </option>
                          <option value="Support Coordinator">
                            Support Coordinator
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </FormField>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          label="Your Full Name *"
                          error={errors.fullName?.message}
                        >
                          <input
                            {...register("fullName")}
                            className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                            placeholder="Jane Doe"
                          />
                        </FormField>

                        {selectedRole !== "Participant" && (
                          <div className="animate-in fade-in zoom-in duration-300">
                            <FormField
                              label="Participant's Name *"
                              error={errors.participantName?.message}
                              accent
                            >
                              <input
                                {...register("participantName")}
                                className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                                placeholder="Name of person needing support"
                              />
                            </FormField>
                          </div>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          label="Your Phone *"
                          error={errors.phone?.message}
                        >
                          <IMaskInput
                            mask="0000 000 000"
                            placeholder="0400 000 000"
                            unmask={true}
                            onAccept={(value) =>
                              setValue("phone", value, {
                                shouldValidate: true,
                              })
                            }
                            className="w-full p-4 rounded-xl border border-gray-200 input-focus font-mono"
                          />
                        </FormField>

                        <FormField
                          label="Your Email *"
                          error={errors.email?.message}
                        >
                          <input
                            type="email"
                            {...register("email")}
                            className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                            placeholder="jane@example.com"
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className={`space-y-6 ${slideClass}`} key="step2">
                      <h3 className="text-2xl font-serif mb-8">
                        What are you looking for?
                      </h3>

                      <FormField
                        label="Primary Support Needed *"
                        error={errors.supportType?.message}
                      >
                        <select
                          {...register("supportType")}
                          className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                        >
                          <option value="">Select support type...</option>
                          <option value="Community Participation">
                            Community Participation
                          </option>
                          <option value="Daily Living Support">
                            Daily Living Support
                          </option>
                          <option value="Capacity Building">
                            Capacity Building
                          </option>
                          <option value="Transport Support">
                            Transport Support
                          </option>
                          <option value="Multiple / Unsure">
                            Multiple / Unsure
                          </option>
                        </select>
                      </FormField>

                      <FormField
                        label="Participant's Suburb (Melbourne) *"
                        error={errors.suburb?.message}
                      >
                        <input
                          {...register("suburb")}
                          list="melbourne-suburbs"
                          className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                          placeholder="Start typing a suburb..."
                          autoComplete="off"
                        />
                        <datalist id="melbourne-suburbs">
                          <option value="Richmond, 3121" />
                          <option value="Brunswick, 3056" />
                          <option value="St Kilda, 3182" />
                          <option value="Fitzroy, 3065" />
                          <option value="South Yarra, 3141" />
                          <option value="Footscray, 3011" />
                          <option value="Preston, 3072" />
                          <option value="Coburg, 3058" />
                          <option value="Frankston, 3199" />
                          <option value="Dandenong, 3175" />
                        </datalist>
                      </FormField>
                    </div>
                  )}

                  {step === 3 && (
                    <div className={`space-y-6 ${slideClass}`} key="step3">
                      <h3 className="text-2xl font-serif mb-8">
                        Final Details
                      </h3>

                      <FormField
                        label="How is the plan managed? *"
                        error={errors.planManagement?.message}
                      >
                        <select
                          {...register("planManagement")}
                          className="w-full p-4 rounded-xl border border-gray-200 input-focus"
                        >
                          <option value="">Select funding type...</option>
                          <option value="Self-Managed">Self-Managed</option>
                          <option value="Plan-Managed">Plan-Managed</option>
                          <option value="NDIA-Managed">NDIA-Managed</option>
                          <option value="Unsure">I am unsure</option>
                        </select>
                      </FormField>

                      <FormField
                        label="Brief overview of goals or needs *"
                        error={errors.message?.message}
                      >
                        <textarea
                          {...register("message")}
                          rows={4}
                          className="w-full p-4 rounded-xl border border-gray-200 input-focus resize-none"
                          placeholder="Please share a little about what you are hoping to achieve..."
                        />
                      </FormField>
                    </div>
                  )}

                  <div className="mt-10 flex gap-4 pt-6 border-t border-brand-lightGreen">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => goToStep(step - 1)}
                        className="px-6 py-4 rounded-xl font-medium text-brand-dark bg-brand-lightGreen hover:bg-gray-200 transition-all flex items-center gap-2 hitbox-expand"
                      >
                        <ArrowLeft size={18} /> Back
                      </button>
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={() => goToStep(step + 1)}
                        className="flex-1 bg-brand-green text-white py-4 rounded-xl font-medium hover:bg-brand-green/90 transition-all flex items-center justify-center gap-2 shadow-elevated hitbox-expand"
                      >
                        Continue <ArrowRight size={18} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-brand-accent text-white py-4 rounded-xl font-medium hover:bg-brand-accent/90 transition-all shadow-elevated flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hitbox-expand"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />{" "}
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Submit Enquiry
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
