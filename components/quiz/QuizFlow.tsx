"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { questions, scoredQuestionCount } from "@/config/questions";
import { texts } from "@/config/texts";
import type { QuizAnswers, QuizQuestion } from "@/config/types";
import { calculateScore, getQuizResult } from "@/lib/quiz";

type QuizStep = "intro" | "lead" | "attention" | "reflection" | "questions" | "processing" | "result" | "manual-offer";

type LeadData = {
  name: string;
  phone: string;
};

const transitionDurationMs = 360;
const processingDurationMs = 1400;

function formatText(template: string, values: Record<string, string | number>): string {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

export function QuizFlow() {
  const [step, setStep] = useState<QuizStep>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lead, setLead] = useState<LeadData>({ name: "", phone: "" });
  const [startedAt, setStartedAt] = useState<number>();
  const [isSaving, setIsSaving] = useState(false);
  const [leadError, setLeadError] = useState<string>();

  const currentQuestion: QuizQuestion = questions[questionIndex];
  const result = useMemo(() => getQuizResult(answers), [answers]);
  const score = useMemo(() => calculateScore(answers).score, [answers]);
  const isTransitionQuestion = currentQuestion?.id.startsWith("transition-");
  const isFinalQuestion = currentQuestion?.selectionMode === "multiple";
  const answeredScoredQuestions = questions
    .slice(0, questionIndex + 1)
    .filter((question) => question.id.startsWith("statement-")).length;
  const progress = step === "questions" ? (answeredScoredQuestions / scoredQuestionCount) * 100 : step === "intro" || step === "attention" ? 0 : 100;
  const selectedMultipleOptions = Array.isArray(answers[currentQuestion?.id]) ? answers[currentQuestion.id] : [];

  useEffect(() => {
    if (step !== "processing") return;

    const timeout = window.setTimeout(() => setStep("result"), processingDurationMs);
    return () => window.clearTimeout(timeout);
  }, [step]);

  function advanceQuestion() {
    const isLastQuestion = questionIndex === questions.length - 1;

    if (isLastQuestion) {
      setStep("lead");
      return;
    }

    const firstFinalQuestionIndex = questions.findIndex(
      (question) => "selectionMode" in question && question.selectionMode === "multiple",
    );
    if (questionIndex === firstFinalQuestionIndex - 1) {
      setStep("reflection");
      setIsTransitioning(false);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedOptionId(undefined);
    setIsTransitioning(false);
  }

  function selectAnswer(optionId: string) {
    if (isTransitioning) return;

    if (currentQuestion.selectionMode === "multiple") {
      setAnswers((currentAnswers) => {
        const currentSelection = currentAnswers[currentQuestion.id];
        const selected: string[] = Array.isArray(currentSelection) ? currentSelection : [];
        const nextSelected = selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId];

        return { ...currentAnswers, [currentQuestion.id]: nextSelected };
      });
      return;
    }

    setSelectedOptionId(optionId);
    setAnswers((currentAnswers) => ({ ...currentAnswers, [currentQuestion.id]: optionId }));
    setIsTransitioning(true);
    window.setTimeout(advanceQuestion, transitionDurationMs);
  }

  function continueMultipleQuestion() {
    if (selectedMultipleOptions.length === 0) return;
    setIsTransitioning(true);
    window.setTimeout(advanceQuestion, transitionDurationMs);
  }

  function restartQuiz() {
    setStep("intro");
    setQuestionIndex(0);
    setAnswers({});
    setSelectedOptionId(undefined);
    setIsTransitioning(false);
    setStartedAt(undefined);
    setLeadError(undefined);
  }

  function continueToFinalQuestions() {
    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedOptionId(undefined);
    setStep("questions");
  }

  function isValidPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    return digits.length === 10 || digits.length === 11;
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : "";
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving) return;

    setIsSaving(true);
    setLeadError(undefined);

    const searchParams = new URLSearchParams(window.location.search);
    const durationSeconds = Math.max(1, Math.round((Date.now() - (startedAt ?? Date.now())) / 1000));

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead,
          answers,
          durationSeconds,
          utm: {
            source: searchParams.get("utm_source"),
            medium: searchParams.get("utm_medium"),
            campaign: searchParams.get("utm_campaign"),
          },
        }),
      });

      if (!response.ok) throw new Error("Unable to save response.");
      setStep("processing");
    } catch {
      setLeadError(texts.errors.saveResponse);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="quiz-page min-h-screen px-5 py-6 text-[#f8eee5] sm:px-8 sm:py-10">
      <div className="quiz-surface mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-3xl flex-col rounded-[20px] border shadow-2xl shadow-black/30 sm:min-h-[calc(100vh-5rem)]">
        <header className="flex items-center justify-between border-b border-[#c4946f]/25 px-6 py-5 sm:px-10">
          <a href="/" aria-label={texts.brand}>
            <img src={texts.assets.cim.src} alt={texts.assets.cim.alt} className="h-11 w-11 rounded-full border border-[#d8af7a]/50 object-cover" />
          </a>
          {step !== "intro" && step !== "attention" && step !== "reflection" && step !== "manual-offer" && (
            <span className="text-xs font-normal uppercase tracking-[0.2em] text-[#f8eee5]/55">{texts.progress.label}</span>
          )}
        </header>

        {step === "questions" && !isTransitionQuestion && !isFinalQuestion && (
          <div className="px-6 pt-6 sm:px-10">
            <div className="mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-[#f8eee5]/55">
              <span>{texts.progress.label}</span>
              <span>{formatText(texts.progress.questionLabel, { current: answeredScoredQuestions, total: scoredQuestionCount })}</span>
            </div>
            <div className="h-1 overflow-hidden bg-white/10" aria-hidden="true">
              <div className="h-full bg-[#d8af7a] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <section className={`flex flex-1 items-center px-6 sm:px-10 ${step === "intro" ? "py-8 sm:py-10" : "py-12 sm:py-16"}`}>
          {step === "intro" && (
            <div className="mx-auto max-w-2xl animate-[fadeIn_500ms_ease-out] text-center">
              <div className="mx-auto mb-5 aspect-square w-24 overflow-hidden rounded-full border border-[#d8af7a]/60 shadow-xl shadow-black/20 sm:w-28">
                <img src={texts.assets.mfp.src} alt={texts.assets.mfp.alt} className="h-full w-full scale-[1.35] object-cover" />
              </div>
              <p className="mb-4 text-[0.68rem] font-normal uppercase tracking-[0.24em] text-[#d8af7a] sm:text-xs sm:tracking-[0.28em]">{texts.intro.eyebrow}</p>
              <h1 className="font-serif text-3xl leading-tight sm:text-[2.1rem]">{texts.intro.title}</h1>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#f8eee5]/65 sm:text-base sm:leading-7">{texts.intro.description}</p>
              <button type="button" onClick={() => setStep("attention")} className="quiz-gold-button mt-7 rounded-full px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d] transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] focus:ring-offset-2 focus:ring-offset-[#452338]">
                {texts.intro.startLabel}
              </button>
              <p className="mt-3 text-sm text-[#f8eee5]/45">{texts.intro.duration}</p>
            </div>
          )}

          {step === "lead" && (
            <form
              className="mx-auto w-full max-w-lg animate-[fadeIn_500ms_ease-out]"
              onSubmit={submitLead}
            >
              <p className="mb-5 text-center text-xs font-normal uppercase tracking-[0.28em] text-[#d8af7a]">{texts.intro.eyebrow}</p>
              <h1 className="text-center font-serif text-3xl leading-tight sm:text-4xl">{texts.lead.title}</h1>
              <p className="mx-auto mt-5 max-w-md text-center leading-7 text-[#f8eee5]/65">{texts.lead.description}</p>
              <div className="mt-9 grid gap-4">
                <label className="grid gap-2 text-sm text-[#f8eee5]/80">
                  {texts.lead.nameLabel}
                  <input required minLength={2} maxLength={160} autoComplete="name" placeholder={texts.lead.namePlaceholder} value={lead.name} onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))} className="quiz-option rounded-[14px] border px-4 py-3.5 text-base text-[#f8eee5] outline-none transition placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" />
                </label>
                <label className="grid gap-2 text-sm text-[#f8eee5]/80">
                  {texts.lead.phoneLabel}
                  <input required type="tel" maxLength={15} autoComplete="tel" inputMode="numeric" placeholder={texts.lead.phonePlaceholder} value={lead.phone} onChange={(event) => { const value = formatPhone(event.target.value); event.currentTarget.setCustomValidity(value === "" || isValidPhone(value) ? "" : texts.lead.phoneError); setLead((current) => ({ ...current, phone: value })); }} onInvalid={(event) => event.currentTarget.setCustomValidity(texts.lead.phoneError)} className="quiz-option rounded-[14px] border px-4 py-3.5 text-base text-[#f8eee5] outline-none transition placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" />
                </label>
              </div>
              {leadError && <p className="mt-5 text-center text-sm text-[#f4c7c7]" role="alert">{leadError}</p>}
              <button type="submit" disabled={isSaving} className="quiz-gold-button mt-8 w-full rounded-full px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d] transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] focus:ring-offset-2 focus:ring-offset-[#452338] disabled:cursor-wait disabled:opacity-70">{isSaving ? texts.saving.label : texts.lead.submitLabel}</button>
              <p className="mt-4 text-center text-xs leading-5 text-[#f8eee5]/45">{texts.lead.privacy}</p>
            </form>
          )}

          {step === "attention" && (
            <div className="mx-auto max-w-xl animate-[fadeIn_500ms_ease-out] text-center">
              <p className="mb-5 text-xs font-normal uppercase tracking-[0.28em] text-[#d8af7a]">{texts.attention.eyebrow}</p>
              <h1 className="font-serif text-3xl leading-tight sm:text-4xl">{texts.attention.title}</h1>
              <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-[#f8eee5]/65 sm:text-base sm:leading-7">{texts.attention.description}</p>
              <button type="button" onClick={() => { setStartedAt(Date.now()); setStep("questions"); }} className="quiz-gold-button mt-10 rounded-full px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d] transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] focus:ring-offset-2 focus:ring-offset-[#452338]">
                {texts.attention.continueLabel}
              </button>
            </div>
          )}

          {step === "reflection" && (
            <div className="mx-auto max-w-2xl animate-[fadeIn_500ms_ease-out] text-center">
              <div className="mx-auto flex max-w-40 items-center gap-4 text-[#d8af7a]" aria-hidden="true"><span className="h-px flex-1 bg-current/70" /><span>✦</span><span className="h-px flex-1 bg-current/70" /></div>
              <h1 className="mt-12 font-serif text-2xl leading-snug sm:text-4xl">{texts.reflection.title}</h1>
              <p className="mt-8 text-sm font-normal uppercase tracking-[0.28em] text-[#d8af7a]">{texts.reflection.remainingLabel}</p>
              <button type="button" onClick={continueToFinalQuestions} className="quiz-gold-button mt-12 rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.16em] text-[#28101d] transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] focus:ring-offset-2 focus:ring-offset-[#452338]">{texts.reflection.continueLabel}</button>
            </div>
          )}

          {step === "questions" && (
            <div key={currentQuestion.id} className={`mx-auto w-full max-w-xl ${isTransitioning ? "animate-[fadeOut_360ms_ease-in_forwards]" : "animate-[slideIn_360ms_ease-out]"}`}>
              <h1 className="font-serif text-xl leading-snug sm:text-2xl">{currentQuestion.title}</h1>
              {currentQuestion.description && <p className="mt-4 text-[#f8eee5]/60">{currentQuestion.description}</p>}
              <div className="mt-9 grid gap-3" role="list">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentQuestion.selectionMode === "multiple" ? selectedMultipleOptions.includes(option.id) : selectedOptionId === option.id;
                  return (
                    <button key={option.id} type="button" onClick={() => selectAnswer(option.id)} disabled={isTransitioning} role={currentQuestion.selectionMode === "multiple" ? "checkbox" : undefined} aria-checked={currentQuestion.selectionMode === "multiple" ? isSelected : undefined} aria-label={`${texts.questions.optionLabel}: ${option.label}`} className={`quiz-option flex w-full items-center gap-4 rounded-[18px] border p-5 text-left text-base leading-6 text-[#f8eee5]/85 transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] disabled:cursor-wait ${isSelected ? "quiz-option-selected text-[#f8eee5]" : ""}`}>
                      {currentQuestion.selectionMode === "multiple" && (
                        <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${isSelected ? "border-[#e6c18a] bg-[#d8af7a] text-[#351827]" : "border-[#e6c18a]/60"}`}>
                          {isSelected && "✓"}
                        </span>
                      )}
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {currentQuestion.selectionMode === "multiple" && (
                <button type="button" onClick={continueMultipleQuestion} disabled={selectedMultipleOptions.length === 0 || isTransitioning} className="quiz-gold-button mt-7 rounded-full px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d] transition disabled:cursor-not-allowed disabled:opacity-40">
                  {texts.questions.multipleContinueLabel}
                </button>
              )}
            </div>
          )}

          {step === "processing" && (
            <div className="mx-auto max-w-lg animate-[fadeIn_500ms_ease-out] text-center" aria-live="polite">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-[#d8af7a]" />
              <h1 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl">{texts.processing.title}</h1>
              <p className="mt-5 text-lg leading-7 text-[#f8eee5]/65">{texts.processing.description}</p>
            </div>
          )}

          {step === "result" && result && (
            <div className="mx-auto max-w-2xl animate-[fadeIn_500ms_ease-out] text-center">
              <img src={texts.assets.cim.src} alt={texts.assets.cim.alt} className="mx-auto mb-7 w-28 rounded-full border border-[#d8af7a]/65 shadow-xl shadow-black/20" />
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#d8af7a]">{formatText(texts.result.personalizedTitle, { name: lead.name.trim().split(/\s+/)[0] || lead.name })}</p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-[#d8af7a] sm:text-5xl">{result.title}</h1>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#f8eee5]/70">{score} pontos · {result.level}</p>
              <div className="mx-auto mt-6 flex max-w-40 items-center gap-4 text-[#d8af7a]" aria-hidden="true"><span className="h-px flex-1 bg-current/70" /><span>✦</span><span className="h-px flex-1 bg-current/70" /></div>
              <div className="mt-10 space-y-5 text-left">
                {result.sections.map((section) => (
                  <section key={section.title} className="rounded-[16px] border border-[#c4946f]/25 bg-black/10 p-5 sm:p-6">
                    <h2 className="font-serif text-2xl text-[#d8af7a]">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 leading-7 text-[#f8eee5]/85">{paragraph}</p>)}
                    {section.bullets && <ul className="mt-5 space-y-3 text-[#f8eee5]/90">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 leading-6"><span className="text-[#d8af7a]">✦</span><span>{bullet}</span></li>)}</ul>}
                  </section>
                ))}
              </div>
              <p className="mt-8 rounded-[16px] border border-[#d8af7a]/45 bg-[#2b1020]/50 p-6 text-left text-base leading-7 text-[#f8eee5]">{texts.result.finalMessage}</p>
              <button type="button" onClick={() => setStep("manual-offer")} className="quiz-gold-button mt-9 inline-flex rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.1em] text-[#28101d] transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] focus:ring-offset-2 focus:ring-offset-[#452338]">{result.ctaLabel}</button>
              <button type="button" onClick={restartQuiz} className="mt-5 block w-full text-sm text-[#f8eee5]/55 underline-offset-4 transition hover:text-[#e6c18a] hover:underline focus:outline-none focus:underline">{texts.result.restartLabel}</button>
            </div>
          )}

          {step === "manual-offer" && (
            <div className="mx-auto max-w-2xl animate-[fadeIn_500ms_ease-out] text-center">
              <img src={texts.assets.cim.src} alt={texts.assets.cim.alt} className="mx-auto w-32 rounded-full border border-[#d8af7a]/65 shadow-xl shadow-black/20" />
              <div className="mx-auto mt-9 flex max-w-40 items-center gap-4 text-[#d8af7a]" aria-hidden="true"><span className="h-px flex-1 bg-current/70" /><span>✦</span><span className="h-px flex-1 bg-current/70" /></div>
              <h1 className="mt-10 font-serif text-4xl leading-tight text-[#d8af7a] sm:text-5xl">{texts.manualOffer.title}</h1>
              <p className="mt-8 text-lg leading-8 text-[#f8eee5]/90">{texts.manualOffer.description}</p>
              <p className="mt-9 rounded-[18px] border border-[#d8af7a]/45 bg-black/10 p-6 text-left text-lg leading-7 text-[#f8eee5]">{texts.manualOffer.highlight}</p>
              <p className="mt-10 text-xs font-medium uppercase tracking-[0.28em] text-[#d8af7a]">{texts.manualOffer.label}</p>
              <p className="mt-3 font-serif text-5xl text-[#f8eee5]">{texts.manualOffer.price}</p>
              <p className="mt-6 text-base italic leading-7 text-[#d8af7a]">{formatText(texts.manualOffer.personalization, { name: lead.name.trim().split(/\s+/)[0] || lead.name })}</p>
              {texts.manualOffer.ctaUrl ? <a href={texts.manualOffer.ctaUrl} target="_blank" rel="noreferrer" className="quiz-gold-button mt-9 inline-flex rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#28101d]">{texts.manualOffer.ctaLabel}</a> : <button type="button" disabled className="quiz-gold-button mt-9 inline-flex cursor-not-allowed rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#28101d] opacity-60">{texts.manualOffer.unavailableLabel}</button>}
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-[#f8eee5]/45">{texts.manualOffer.footer}</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
