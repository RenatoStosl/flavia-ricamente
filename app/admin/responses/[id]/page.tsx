import Link from "next/link";
import { notFound } from "next/navigation";
import { questions } from "@/config/questions";
import { requireAdmin } from "@/lib/admin";
import { getDatabase } from "@/lib/db";

type ResponseDetail = { id: number; name: string; phone: string; score: number; level: string; answers: Record<string, string | string[]>; duration_seconds: number; created_at: string; utm_source: string | null; utm_medium: string | null; utm_campaign: string | null };

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function answerLabels(question: (typeof questions)[number], answer: string | string[]) {
  const answerIds = Array.isArray(answer) ? answer : [answer];

  return answerIds.map(
    (answerId) => question.options.find((option) => option.id === answerId)?.label ?? answerId,
  );
}

export default async function ResponseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const responseId = Number(id);
  if (!Number.isSafeInteger(responseId)) notFound();
  const sql = getDatabase();
  const rows = await sql`SELECT * FROM responses WHERE id = ${responseId} LIMIT 1`;
  const response = rows[0] as ResponseDetail | undefined;
  if (!response) notFound();

  const answeredQuestions = questions.filter((question) => response.answers[question.id] !== undefined);

  return <main className="quiz-page min-h-screen p-5 text-[#f8eee5] sm:p-10"><article className="quiz-surface mx-auto max-w-4xl rounded-[20px] border p-6 sm:p-10"><Link href="/admin" className="text-sm text-[#d8af7a] hover:underline">← Voltar para respostas</Link><p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#d8af7a]">{response.level}</p><h1 className="mt-2 font-serif text-4xl">{response.name}</h1><dl className="mt-8 grid gap-5 sm:grid-cols-2"><Data label="WhatsApp" value={response.phone} /><Data label="Pontuação" value={String(response.score)} /><Data label="Duração" value={`${response.duration_seconds}s`} /><Data label="Data (Brasília)" value={formattedDate(response.created_at)} /><Data label="UTM source" value={response.utm_source ?? "—"} /><Data label="UTM medium" value={response.utm_medium ?? "—"} /><Data label="UTM campaign" value={response.utm_campaign ?? "—"} /></dl><section className="mt-10 border-t border-[#c4946f]/20 pt-8"><h2 className="font-serif text-2xl">Respostas do diagnóstico</h2><ol className="mt-5 space-y-3">{answeredQuestions.map((question, index) => <li key={question.id} className="rounded-[14px] bg-black/20 p-5"><p className="text-sm leading-6 text-[#f8eee5]/70"><span className="mr-2 text-[#d8af7a]">{index + 1}.</span>{question.title}</p><div className="mt-3 flex flex-wrap gap-2">{answerLabels(question, response.answers[question.id]).map((label) => <span key={label} className="rounded-full border border-[#d8af7a]/35 bg-[#d8af7a]/10 px-3 py-1 text-sm font-medium text-[#f8eee5]">{label}</span>)}</div></li>)}</ol></section></article></main>;
}

function Data({ label, value }: { label: string; value: string }) { return <div><dt className="text-xs uppercase tracking-[0.14em] text-[#f8eee5]/50">{label}</dt><dd className="mt-2 text-[#f8eee5]">{value}</dd></div>; }
