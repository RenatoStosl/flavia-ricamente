"use client";

import { type FormEvent, useState } from "react";
import { applicationFormQuestions, type ApplicationFormAnswers } from "@/config/application-form";

type Step = "intro" | "identification" | "questions" | "saving" | "success";

export function ApplicationFormFlow() {
  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ApplicationFormAnswers>({});
  const [startedAt, setStartedAt] = useState<number>();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState<string>();
  const [lead, setLead] = useState({ fullName: "", email: "" });

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

  function continueIdentification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStartedAt(Date.now());
    setStep("questions");
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
          lead,
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
      <div className={`quiz-surface mx-auto flex min-h-[calc(100vh-3rem)] w-full flex-col overflow-hidden rounded-[20px] border shadow-2xl shadow-black/30 transition-[max-width] duration-500 sm:min-h-[calc(100vh-5rem)] ${step === "intro" ? "max-w-5xl" : "max-w-3xl"}`}>
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

        <section className={`flex flex-1 items-center ${step === "intro" ? "p-0" : "px-6 py-12 sm:px-10 sm:py-16"}`}>
          {step === "intro" && (
            <div className="grid w-full animate-[fadeIn_500ms_ease-out] lg:min-h-[640px] lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative aspect-[3/4] overflow-hidden sm:aspect-[4/3] lg:order-2 lg:aspect-auto lg:min-h-full">
                <img src="/image/flv-dubai.jpeg" alt="Flávia em Dubai, com o Burj Khalifa ao fundo" className="absolute inset-0 h-full w-full scale-[1.4] object-cover object-[68%_center] lg:scale-[1.25] lg:object-[62%_center]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#351827] via-transparent to-black/5 lg:bg-gradient-to-r lg:from-[#351827]/75 lg:via-transparent lg:to-transparent" aria-hidden="true" />
              </div>

              <div className="flex flex-col justify-center px-6 py-9 text-center sm:px-10 sm:py-12 lg:order-1 lg:px-12 lg:py-14 lg:text-left">
                <img src="/image/cim.jpeg" alt="CIM — Corpo, Investimentos e Mente" className="mx-auto mb-5 w-40 object-contain sm:w-44 lg:mx-0" />
                <p className="mb-4 text-xs tracking-[0.28em] text-[#d8af7a]">Mentoria Flávia RicaMente</p>
                <h1 className="font-serif text-3xl leading-tight sm:text-4xl">Você tem a oportunidade de mudar a sua vida através do Método “Prospere C.iM.”</h1>
                <p className="mt-5 text-sm leading-6 text-[#f8eee5]/65 sm:text-base sm:leading-7">Mas são poucas vagas. Eu vou SELECIONAR a turma que seguirá comigo durante 3 semanas, em um acompanhamento muito próximo, te guiando no seu dia a dia.</p>
                <p className="mt-4 text-sm leading-6 text-[#f8eee5]/65 sm:text-base sm:leading-7">Para saber quem vai receber todo meu conhecimento e com quem vou caminhar junto, preciso das suas melhores respostas.</p>
                <div>
                  <button type="button" onClick={() => setStep("identification")} className="quiz-gold-button mt-8 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d]">Começar formulário</button>
                  <p className="mt-5 text-xs tracking-[0.16em] text-[#d8af7a]/85">Leva apenas alguns minutos</p>
                </div>
              </div>
            </div>
          )}

          {step === "identification" && (
            <form onSubmit={continueIdentification} className="mx-auto w-full max-w-lg animate-[fadeIn_500ms_ease-out]">
              <p className="mb-5 text-center text-xs uppercase tracking-[0.28em] text-[#d8af7a]">Antes de começar</p>
              <h1 className="text-center font-serif text-3xl leading-tight sm:text-4xl">Como podemos te identificar?</h1>
              <p className="mx-auto mt-5 max-w-md text-center leading-7 text-[#f8eee5]/65">Preencha seus dados para iniciar o formulário da mentoria.</p>
              <div className="mt-9 grid gap-4">
                <label className="grid gap-2 text-sm text-[#f8eee5]/80">Nome completo<input autoFocus required minLength={3} maxLength={160} pattern=".*\S+\s+\S+.*" title="Digite seu nome e sobrenome" autoComplete="name" value={lead.fullName} onChange={(event) => setLead((current) => ({ ...current, fullName: event.target.value }))} placeholder="Digite seu nome completo" className="quiz-option rounded-[14px] border px-4 py-3.5 text-base text-[#f8eee5] outline-none placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" /></label>
                <label className="grid gap-2 text-sm text-[#f8eee5]/80">E-mail<input required type="email" maxLength={254} autoComplete="email" value={lead.email} onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))} placeholder="voce@exemplo.com" className="quiz-option rounded-[14px] border px-4 py-3.5 text-base text-[#f8eee5] outline-none placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" /></label>
              </div>
              <p className="mt-7 text-center text-xs leading-5 text-[#f8eee5]/55">Ao continuar, você declara estar ciente de que seus dados e respostas serão utilizados exclusivamente para analisar sua candidatura à Mentoria Prospere C.iM. e realizar contatos relacionados a este processo.</p>
              <button type="submit" className="quiz-gold-button mt-4 w-full rounded-full px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d]">Continuar</button>
            </form>
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
                    <textarea autoFocus required minLength={10} maxLength={2000} rows={7} value={answer} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} placeholder="Escreva sua resposta com sinceridade..." title="Escreva pelo menos 10 caracteres" className="quiz-option w-full resize-y rounded-[18px] border p-5 text-base leading-7 text-[#f8eee5] outline-none placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" />
                  ) : (
                    <input autoFocus required type={question.id === "age" ? "number" : "text"} min={question.id === "age" ? 18 : undefined} max={question.id === "age" ? 120 : undefined} minLength={question.id === "profession" ? 2 : undefined} maxLength={question.id === "age" ? undefined : 200} inputMode={question.id === "age" ? "numeric" : "text"} value={answer} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} placeholder={question.id === "age" ? "Digite sua idade" : "Digite sua resposta"} title={question.id === "age" ? "Informe uma idade entre 18 e 120 anos" : "Digite pelo menos 2 caracteres"} className="quiz-option w-full rounded-[18px] border px-5 py-4 text-base text-[#f8eee5] outline-none placeholder:text-[#f8eee5]/35 focus:border-[#d8af7a] focus:ring-2 focus:ring-[#d8af7a]/30" />
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
              <a href="/formulario" className="quiz-gold-button mt-9 inline-flex rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.12em] text-[#28101d]">Voltar ao início</a>
            </div>
          )}
        </section>
        <footer className="border-t border-[#c4946f]/20 px-6 py-4 text-center text-xs text-[#f8eee5]/45">Flávia RicaMente · Prosperidade com propósito</footer>
      </div>
    </main>
  );
}
