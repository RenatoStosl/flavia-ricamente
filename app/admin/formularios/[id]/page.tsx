import Link from "next/link";
import { notFound } from "next/navigation";
import { applicationFormQuestions } from "@/config/application-form";
import { requireAdmin } from "@/lib/admin";
import { getDatabase } from "@/lib/db";

type ApplicationDetail = {
  id: number;
  answers: Record<string, string>;
  duration_seconds: number;
  created_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
};

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(value));
}

export default async function FormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const applicationId = Number(id);
  if (!Number.isSafeInteger(applicationId)) notFound();
  const sql = getDatabase();
  const rows = await sql`SELECT * FROM mentorship_applications WHERE id = ${applicationId} LIMIT 1`;
  const application = rows[0] as ApplicationDetail | undefined;
  if (!application) notFound();

  return (
    <main className="quiz-page min-h-screen p-5 text-[#f8eee5] sm:p-10">
      <article className="quiz-surface mx-auto max-w-4xl rounded-[20px] border p-6 sm:p-10">
        <Link href="/admin/formularios" className="text-sm text-[#d8af7a] hover:underline">← Voltar para formulários</Link>
        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#d8af7a]">Aplicação para a mentoria</p>
        <h1 className="mt-2 font-serif text-4xl">Formulário #{application.id}</h1>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
          <Data label="Data (Brasília)" value={formattedDate(application.created_at)} />
          <Data label="Duração" value={`${application.duration_seconds}s`} />
          <Data label="UTM source" value={application.utm_source ?? "—"} />
          <Data label="UTM medium" value={application.utm_medium ?? "—"} />
          <Data label="UTM campaign" value={application.utm_campaign ?? "—"} />
        </dl>
        <section className="mt-10 border-t border-[#c4946f]/20 pt-8">
          <h2 className="font-serif text-2xl">Respostas do formulário</h2>
          <div className="mt-6 grid gap-4">
            {applicationFormQuestions.map((question, index) => (
              <div key={question.id} className="rounded-[14px] border border-[#c4946f]/20 bg-black/10 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-[#d8af7a]">Pergunta {index + 1}</p>
                <h3 className="mt-2 font-medium leading-6 text-[#f8eee5]/75">{question.title}</h3>
                <p className="mt-4 whitespace-pre-wrap leading-7 text-[#f8eee5]">{application.answers[question.id] ?? "—"}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}

function Data({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs uppercase tracking-[0.14em] text-[#f8eee5]/50">{label}</dt><dd className="mt-2">{value}</dd></div>;
}
