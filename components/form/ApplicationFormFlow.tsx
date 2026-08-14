"use client";

import { type FormEvent, useState } from "react";
import { applicationFormQuestions, type ApplicationFormAnswers } from "@/config/application-form";

type Step = "intro" | "questions" | "saving" | "success";

export function ApplicationFormFlow() {
  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ApplicationFormAnswers>({});
  const [startedAt, setStartedAt] = useState<number>();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string>();

  const question = applicationFormQuestions[questionIndex];
  const answer = answers[question.id] ?? "";
  const progress = ((questionIndex + 1) / applicationFormQuestions.length) * 100;

  function advance(finalAnswers?: ApplicationFormAnswers) {
    if (questionIndex === applicationFormQuestions.length - 1) {
      void submit(finalAnswers ?? answers);
      return;
    }
    setQuestionIndex((index) => index + 1);
    setIsTransitioning(false);
  }

  function choose(option: string) {
    if (isTransitioning) return;
    const nextAnswers = { ...answers, [question.id]: option };
    setAnswers(nextAnswers);
    setIsTransitioning(true);
    window.setTimeout(() => advance(nextAnswers), 360);
  }

  function continueText(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!answer.trim()) return;
    setIsTransitioning(true);
    window.setTimeout(advance, 360);
  }

  async function submit(submittedAnswers: ApplicationFormAnswers) {
    setStep("saving");
    setError(undefined);
    const searchParams = new URLSearchParams(window.location.search);
    try {
      const response = await fetch("/api/formulario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: submittedAnswers,
          durationSeconds: Math.max(1, Math.round((Date.now() - (startedAt ?? Date.now())) / 1000)),
          utm: {
            source: searchParams.get("utm_source"),
            medium: searchParams.get("utm_medium"),
            campaign: searchParams.get("utm_campaign"),
          },
        }),
      });
      if (!response.ok) throw new Error();
      setStep("success");
    } catch {
      setError("Não foi possível enviar suas respostas. Tente novamente.");
      setStep("questions");
      setIsTransitioning(false);
    }
  }

  return (
    <main className="quiz-page min-h-screen px-5 py-6 text-[#f8eee5] sm:px-8 sm:py-10">
      <div className="quiz-surface mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-3xl flex-col rounded-[20px] border shadow-2xl shadow-black/30 sm:min-h-[calc(100vh-5rem)]">
        {step !== "intro" && (
          <header className="relative flex min-h-[5.25rem] items-center justify-center border-b border-[#c4946f]/25 px-6 py-4 sm:px-10">
            <a href="/" aria-label="Flávia RicaMente">
              <div className="h-11 w-11 overflow-hidden rounded-full border border-[#d8af7a]/60 shadow-xl shadow-black/20">
                <img src="/image/cim.jpeg" alt="CIM — Corpo, Investimentos e Mente" className="h-full w-full scale-150 object-cover" />
              </div>
            </a>
          </header>
        )}

        {step === "questions" && (
          <div className="px-6 pt-6 sm:px-10">
            <div className="mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-[#f8eee5]/55">
              <span>Sua jornada</span>
              <span>{questionIndex + 1} de {applicationFormQuestions.length}</span>
            </div>
            <div className="h-1 overflow-hidden bg-white/10"><div className="h-full bg-[#d8af7a] transition-all duration-300" style={{ width: `${progress}%` }} /></div>
          </div>
        )}

        <section className={`flex flex-1 items-center px-6 sm:px-10 ${step === "intro" ? "py-8 sm:py-10" : "py-12 sm:py-16"}`}>
          {step === "intro" && (
            <div className="mx-auto max-w-xl animate-[fadeIn_500ms_ease-out] text-center">
              <img src="/image/mfp.jpeg" alt="Método Flávia Prosperidade" className="mx-auto mb-5 w-44 object-contain sm:w-48" />
              <p className="mb-4 text-xs uppercase tracking-[0.28em] text-[#d8af7a]">Mentoria Flávia RicaMente</p>
              <h1 className="font-serif text-3xl leading-tight sm:text-4xl">Sua próxima fase começa com clareza.</h1>
              <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-[#f8eee5]/65 sm:text-base sm:leading-7">Responda com presença e sinceridade. Quero conhecer o seu momento e entender se faz sentido caminharmos juntas(os) nas próximas três semanas.</p>
              <button type="button" onClick={() => { setStartedAt(Date.now()); setStep("questions"); }} className="quiz-gold-button mt-9 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d]">Começar formulário</button>
              <p className="mt-5 text-xs tracking-[0.16em] text-[#d8af7a]/85">Leva apenas alguns minutos</p>
            </div>
          )}

          {step === "questions" && (
            <div key={question.id} className={`mx-auto w-full max-w-xl ${isTransitioning ? "animate-[fadeOut_360ms_ease-in_forwards]" : "animate-[slideIn_360ms_ease-out]"}`}>
              <p className="mb-4 text-xs uppercase tracking-[0.24em] text-[#d8af7a]">Pergunta {questionIndex + 1}</p>
              <h1 className="font-serif text-xl leading-snug sm:text-2xl">{question.title}</h1>
              {question.type === "single" ? (
                <div className="mt-9 grid gap-3" role="radiogroup" aria-label={question.title}>
                  {question.options?.map((option) => (
                    <button key={option} type="button" role="radio" aria-checked={answer === option} disabled={isTransitioning} onClick={() => choose(option)} className={`quiz-option flex w-full items-center gap-4 rounded-[18px] border p-5 text-left text-base leading-6 text-[#f8eee5]/85 transition focus:outline-none focus:ring-2 focus:ring-[#e6c18a] disabled:cursor-wait ${answer === option ? "quiz-option-selected" : ""}`}>
                      <span className={`h-4 w-4 shrink-0 rounded-full border ${answer === option ? "border-[5px] border-[#d8af7a]" : "border-[#e6c18a]/60"}`} />
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={continueText} className="mt-9">
                  {question.type === "paragraph" ? (
                    <textarea autoFocus required minLength={10} maxLength={2000} rows={7} value={answer} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} placeholder="Escreva sua resposta com sinceridade..." className="quiz-option w-full resize-y rounded-[18px] border p-5 text-base leading-7 text-[#f8eee5] outline-none placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" />
                  ) : (
                    <input autoFocus required maxLength={question.id === "age" ? 3 : 200} inputMode={question.id === "age" ? "numeric" : "text"} pattern={question.id === "age" ? "[0-9]{1,3}" : undefined} value={answer} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} placeholder={question.id === "age" ? "Digite sua idade" : "Digite sua resposta"} className="quiz-option w-full rounded-[18px] border px-5 py-4 text-base text-[#f8eee5] outline-none placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" />
                  )}
                  <button type="submit" disabled={!answer.trim() || isTransitioning} className="quiz-gold-button mt-7 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d] disabled:cursor-not-allowed disabled:opacity-40">Continuar</button>
                </form>
              )}
              {error && <p role="alert" className="mt-6 text-sm text-[#f4c7c7]">{error}</p>}
            </div>
          )}

          {step === "saving" && <div className="mx-auto text-center" aria-live="polite"><div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-[#d8af7a]" /><h1 className="mt-8 font-serif text-3xl">Enviando suas respostas...</h1></div>}
          {step === "success" && (
            <div className="mx-auto max-w-xl animate-[fadeIn_500ms_ease-out] text-center">
              <div className="mx-auto flex max-w-40 items-center gap-4 text-[#d8af7a]"><span className="h-px flex-1 bg-current/70" /><span>✦</span><span className="h-px flex-1 bg-current/70" /></div>
              <p className="mt-10 text-xs uppercase tracking-[0.28em] text-[#d8af7a]">Formulário recebido</p>
              <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">Obrigada por compartilhar seu momento.</h1>
              <p className="mx-auto mt-6 max-w-lg leading-7 text-[#f8eee5]/70">Suas respostas foram enviadas com sucesso e serão analisadas com carinho e atenção.</p>
              <a href="/" className="quiz-gold-button mt-9 inline-flex rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d]">Voltar ao início</a>
            </div>
          )}
        </section>
        <footer className="border-t border-[#c4946f]/20 px-6 py-4 text-center text-xs text-[#f8eee5]/45">Flávia RicaMente · Prosperidade com propósito</footer>
      </div>
    </main>
  );
}
