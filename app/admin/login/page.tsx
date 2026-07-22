type LoginPageProps = { searchParams: Promise<{ error?: string }> };

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="quiz-page flex min-h-screen items-center justify-center p-6 text-[#f8eee5]">
      <form action="/api/admin/login" method="post" className="quiz-surface w-full max-w-md rounded-[20px] border p-8 shadow-2xl shadow-black/30">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8af7a]">Flávia RicaMente</p>
        <h1 className="mt-4 font-serif text-4xl">Acesso administrativo</h1>
        <div className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-[#f8eee5]/80">Usuário<input required name="username" autoComplete="username" className="quiz-option rounded-[14px] border px-4 py-3 text-[#f8eee5] outline-none focus:border-[#d8af7a]" /></label>
          <label className="grid gap-2 text-sm text-[#f8eee5]/80">Senha<input required type="password" name="password" autoComplete="current-password" className="quiz-option rounded-[14px] border px-4 py-3 text-[#f8eee5] outline-none focus:border-[#d8af7a]" /></label>
        </div>
        {error && <p className="mt-5 text-sm text-[#f4c7c7]">Usuário ou senha inválidos.</p>}
        <button className="quiz-gold-button mt-8 w-full rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-[#28101d]">Entrar</button>
      </form>
    </main>
  );
}
