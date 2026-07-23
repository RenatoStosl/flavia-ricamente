import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { getDatabase } from "@/lib/db";

type DashboardRow = { total: number | string; average_duration: number | string | null };
type LevelRow = { level: string; total: number | string };
type ResponseRow = { id: number | string; name: string; phone: string; level: string; created_at: string };

function formattedDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default async function AdminPage() {
  await requireAdmin();
  const sql = getDatabase();
  const [metricsRows, levelRows, responseRows] = await Promise.all([
    sql`SELECT COUNT(*) AS total, ROUND(AVG(duration_seconds)) AS average_duration FROM responses`,
    sql`SELECT level, COUNT(*) AS total FROM responses GROUP BY level ORDER BY total DESC, level ASC LIMIT 1`,
    sql`SELECT id, name, phone, level, created_at FROM responses ORDER BY created_at DESC LIMIT 150`,
  ]);

  const metrics = (metricsRows[0] ?? { total: 0, average_duration: null }) as DashboardRow;
  const leadingLevel = levelRows[0] as LevelRow | undefined;
  const responses = responseRows as ResponseRow[];
  const lastResponse = responses[0];

  return (
    <main className="quiz-page min-h-screen p-5 text-[#f8eee5] sm:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8af7a]">Flávia RicaMente</p><h1 className="mt-2 font-serif text-4xl">Diagnósticos recebidos</h1></div>
          <div className="flex gap-3"><a href="/api/admin/export" className="rounded-full border border-[#d8af7a]/50 px-5 py-3 text-sm font-medium text-[#f8eee5] transition hover:bg-white/10">Exportar CSV</a><form action="/api/admin/logout" method="post"><button className="rounded-full border border-white/20 px-5 py-3 text-sm text-[#f8eee5]/75 transition hover:bg-white/10">Sair</button></form></div>
        </header>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Total de respostas" value={String(metrics.total)} />
          <Metric label="Resultado predominante" value={leadingLevel?.level ?? "—"} detail={leadingLevel ? `${leadingLevel.total} respostas` : undefined} />
          <Metric label="Última resposta" value={lastResponse ? lastResponse.name : "—"} detail={lastResponse ? formattedDate(lastResponse.created_at) : undefined} />
          <Metric label="Tempo médio" value={metrics.average_duration ? `${metrics.average_duration}s` : "—"} />
        </section>
        <section className="quiz-surface mt-8 overflow-hidden rounded-[20px] border">
          <div className="border-b border-[#c4946f]/20 px-6 py-5"><h2 className="font-serif text-2xl">Respostas</h2></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-black/10 text-xs uppercase tracking-[0.12em] text-[#f8eee5]/55"><tr><th className="px-6 py-4">Nome</th><th className="px-6 py-4">WhatsApp</th><th className="px-6 py-4">Resultado</th><th className="px-6 py-4">Data</th></tr></thead><tbody>{responses.map((response) => <tr key={response.id} className="border-t border-[#c4946f]/15 text-[#f8eee5]/80 transition hover:bg-white/[0.03]"><td className="px-6 py-4 font-medium text-[#f8eee5]"><Link className="hover:text-[#d8af7a]" href={`/admin/responses/${response.id}`}>{response.name}</Link></td><td className="px-6 py-4">{response.phone}</td><td className="px-6 py-4">{response.level}</td><td className="px-6 py-4">{formattedDate(response.created_at)}</td></tr>)}</tbody></table></div>
          {responses.length === 0 && <p className="px-6 py-12 text-center text-[#f8eee5]/55">Nenhuma resposta registrada ainda.</p>}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return <div className="quiz-surface rounded-[18px] border p-5"><p className="text-xs uppercase tracking-[0.14em] text-[#f8eee5]/50">{label}</p><p className="mt-3 font-serif text-2xl text-[#f8eee5]">{value}</p>{detail && <p className="mt-1 text-sm text-[#f8eee5]/55">{detail}</p>}</div>;
}
