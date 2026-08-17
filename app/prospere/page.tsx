import type { Metadata } from "next";
import "./prospere.css";

export const metadata: Metadata = {
  title: "Prospere C.i.M. | Flávia RicaMente",
  description: "Corpo, Investimentos e Mentalidade: uma mentoria para prosperar por inteiro.",
};

const applicationUrl = "/formulario";

function ArrowIcon() {
  return (
    <span className="prospere-arrow" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CTA({ children = "Quero me candidatar" }: { children?: React.ReactNode }) {
  return (
    <a className="prospere-cta" href={applicationUrl}>
      <span>{children}</span>
      <ArrowIcon />
    </a>
  );
}

const receiveItems = [
  ["01", "3 semanas de mentoria guiada", "Uma imersão prática nos três pilares do Prospere C.i.M."],
  ["02", "Encontros e acompanhamento ao vivo", "Direção durante a semana para você não caminhar sozinho entre uma aula e outra."],
  ["03", "Aplicação prática do método", "Você não apenas aprende. Você executa e integra à sua vida."],
  ["04", "Direcionamento financeiro", "Aulas de investimentos alinhadas à necessidade e ao momento de cada participante."],
  ["05", "Ferramentas de transformação", "Práticas para trabalhar padrões, crenças, pensamentos e comportamentos."],
  ["06", "4ª semana de acompanhamento", "Um período dedicado à consolidação e integração do que foi vivido."],
  ["07", "Comunidade vitalícia", "Você segue conectado, acompanhado e em movimento mesmo depois da mentoria."],
];

const audience = [
  "Vive preocupado com dinheiro, mesmo quando consegue ganhar",
  "Sente medo do amanhã e pensa sempre na falta",
  "Começa muitas coisas, mas tem dificuldade de sustentar",
  "Sabe o que deveria fazer, mas não consegue colocar em prática",
  "Vive sob pressão, com a mente acelerada e sem tempo para si",
  "Quer cuidar melhor do corpo, mas sempre deixa para depois",
  "Quer organizar a vida financeira e investir, mas não sabe por onde começar",
  "Sente que existe um potencial dentro de si que ainda não está sendo vivido",
];

export default function ProsperePage() {
  return (
    <main className="prospere-page">
      <nav className="prospere-nav" aria-label="Navegação principal">
        <a className="prospere-brand" href="/" aria-label="Flávia RicaMente — início">
          <img src="/image/cim.jpeg" alt="Flávia RicaMente" />
        </a>
      </nav>

      <section className="prospere-hero">
        <div className="prospere-orb prospere-orb-one" />
        <div className="prospere-orb prospere-orb-two" />
        <div className="prospere-hero-copy">
          <p className="prospere-kicker">Corpo <i /> Investimentos <i /> Mentalidade</p>
          <h1>Você,<br /><em>prosperando</em><br />por inteiro.</h1>
          <p className="prospere-lead">Três semanas para transformar conhecimento em prática — e prática em uma nova forma de viver.</p>
          <CTA>Quero ter liberdade</CTA>
          <div className="prospere-proof">
            <span>Mentoria ao vivo</span><span>Aplicação prática</span><span>Comunidade vitalícia</span>
          </div>
        </div>
        <figure className="prospere-hero-photo">
          <img src="/image/cim/flavia-dubai-balanco.jpeg" alt="Flávia em Dubai, com o Burj Khalifa ao fundo" />
          <figcaption><span>Liberdade para viver</span><small>Dubai, EAU</small></figcaption>
        </figure>
      </section>

      <section className="prospere-tension prospere-section">
        <p className="prospere-kicker">Você sabe que pode viver diferente</p>
        <h2>Então, por que continua voltando para o <em>mesmo lugar?</em></h2>
        <div className="prospere-tension-grid">
          <p>Você começa. Se anima. Decide mudar. Cuida do corpo, organiza a vida financeira, tenta ter uma rotina melhor.</p>
          <p>Até que o ritmo aperta e você se vê repetindo os mesmos padrões. A ansiedade volta. O medo do amanhã aparece. O dinheiro vira preocupação e a mente, barulho.</p>
          <p>Talvez você já saiba muita coisa. O que falta não é mais informação, mas transformar conhecimento em prática — e prática em uma nova forma de viver.</p>
        </div>
        <blockquote>Você merece viver com mais <em>liberdade.</em></blockquote>
      </section>

      <section className="prospere-method-intro">
        <div className="prospere-method-copy">
          <p className="prospere-kicker">O método é o autogoverno</p>
          <h2>Prospere com autonomia, constância e direção.</h2>
          <p>O Prospere C.i.M. é uma mentoria para governar, de dentro para fora, aquilo que antes governava você: seus pensamentos, crenças, hábitos, sua relação com o dinheiro, o corpo e a forma como responde à vida.</p>
          <p>Um caminho para romper ciclos, sustentar novas escolhas e acessar a sua Frequência da Prosperidade.</p>
          <CTA>Quero tentar minha vaga</CTA>
        </div>
        <div className="prospere-photo-stack" aria-label="Flávia no Egito">
          <img className="prospere-photo-back" src="/image/cim/flavia-egito-piramides.jpeg" alt="Flávia diante das pirâmides do Egito" />
          <img className="prospere-photo-front" src="/image/cim/flavia-egito-contemplando.jpeg" alt="Flávia contemplando as pirâmides do Egito" />
          <span className="prospere-stamp">Viver<br />por inteiro</span>
        </div>
      </section>

      <section className="prospere-origin prospere-section">
        <div className="prospere-number">25<sup>+</sup><small>anos de experiência</small></div>
        <div>
          <p className="prospere-kicker">De onde nasceu o método</p>
          <h2>Prosperidade não é apenas ter mais dinheiro.</h2>
          <p>Atendendo pessoas e clientes por mais de 25 anos, percebi dois cenários: grandes investidores com uma vida em caos, estresse e ansiedade; e pessoas que geravam renda, mas continuavam aprisionadas na escassez.</p>
          <p>Prosperar é usar o dinheiro de forma inteligente, a serviço do seu bem-estar — para uma vida cheia de paz, leveza, confiança, saúde e sentido.</p>
        </div>
      </section>

      <section className="prospere-pillars prospere-section">
        <div className="prospere-section-heading">
          <p className="prospere-kicker">Prospere C.<span className="prospere-lowercase">i</span>.M.</p>
          <h2>Três pilares que não podem ser separados.</h2>
          <p>Você não recebe apenas conteúdo. Você aprende a integrar cada área para prosperar por inteiro.</p>
        </div>
        <div className="prospere-pillar-list">
          <article><span>C</span><div><small>Corpo</small><h3>O lugar onde tudo começa.</h3><p>Autoconhecimento e consciência corporal. O corpo ama hábitos: quando ele deixa de consumir toda a sua energia, você ganha espaço para prosperar.</p></div></article>
          <article><span>I</span><div><small>Investimentos</small><h3>Dinheiro a serviço da vida.</h3><p>Organização financeira, construção de patrimônio e escolhas simples — de Renda Fixa e Tesouro Direto a Ações e Fundos Imobiliários.</p></div></article>
          <article><span>M</span><div><small>Mentalidade</small><h3>Nova mente, novo você.</h3><p>Ferramentas práticas para reconhecer crenças de escassez, medo do futuro e autossabotagem — e ativar a mente próspera que já habita em você.</p></div></article>
        </div>
        <div className="prospere-centered-cta"><CTA>Quero viver essa transformação</CTA></div>
      </section>

      <section className="prospere-journey">
        <div className="prospere-journey-image">
          <img src="/image/cim/flavia-dubai-burj-khalifa.jpeg" alt="Flávia diante do Burj Khalifa, em Dubai" />
        </div>
        <div className="prospere-journey-copy">
          <p className="prospere-kicker">Uma jornada guiada</p>
          <h2>Não é apenas uma mentoria. É um protocolo ao vivo.</h2>
          <p>Durante três semanas, eu transfiro para você o que eu mesma pratico: método, ferramentas, rotina e minha forma de pensar e me relacionar com o dinheiro, o corpo e a vida.</p>
          <p>Os encontros são online e ao vivo, no conforto da sua casa. Depois da imersão, uma quarta etapa consolida a transformação — e a comunidade continua com você, vitaliciamente.</p>
          <p className="prospere-script">Juntos prosperamos mais.</p>
        </div>
      </section>

      <section className="prospere-receive prospere-section">
        <div className="prospere-section-heading">
          <p className="prospere-kicker">O que você recebe</p>
          <h2>Direção, prática e acompanhamento.</h2>
        </div>
        <div className="prospere-receive-grid">
          {receiveItems.map(([number, title, description]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>
          ))}
          <article className="prospere-bonus"><span>+</span><small>Bônus</small><h3>Investidor de Propósito + Investir é Simples</h3><p>Dois cursos online completos, no valor de R$ 1.997,00, para acompanhar sua jornada como investidor.</p></article>
        </div>
      </section>

      <section className="prospere-audience prospere-section">
        <div className="prospere-audience-title">
          <p className="prospere-kicker">Para quem é</p>
          <h2>Para quem sente que poderia estar vivendo <em>muito mais.</em></h2>
          <CTA>Quero minha liberdade</CTA>
        </div>
        <ul>
          {audience.map((item) => <li key={item}><span>✓</span>{item}</li>)}
        </ul>
      </section>

      <section className="prospere-about">
        <div className="prospere-about-collage">
          <img className="prospere-about-card" src="/image/cim/card-flavia-ricamente.jpeg" alt="Card profissional de Flávia RicaMente" />
          <img className="prospere-about-photo" src="/image/cim/flavia-escritorio-investimentos.jpeg" alt="Flávia em seu ambiente de trabalho" />
        </div>
        <div className="prospere-about-copy">
          <p className="prospere-kicker">Por que comigo?</p>
          <h2>Porque eu não ensino uma vida que eu não vivo.</h2>
          <p>Sou Assessora de Investimentos certificada pela CVM, mentora, treinadora e palestrante, com mais de 25 anos de experiência no mercado financeiro e passagem por grandes instituições nacionais e internacionais.</p>
          <p>Conquistei minha independência financeira aos 33 anos. E entendi que ter dinheiro não significa necessariamente prosperar. Prosperidade é viver bem aquilo que você construiu.</p>
          <p>Integrei conhecimentos de mercado financeiro, comportamento, neurociência, metacognição, PNL, meditação, yoga e desenvolvimento humano. É essa experiência vivida que transfiro para você.</p>
          <div className="prospere-signature">Flávia RicaMente</div>
        </div>
      </section>

      <section className="prospere-objective prospere-section">
        <p className="prospere-kicker">O verdadeiro objetivo</p>
        <h2>Elevar a sua frequência ao nível da <em>prosperidade sustentável.</em></h2>
        <p>Você não precisa controlar tudo para se sentir seguro. A transformação começa quando constrói dentro de si a capacidade de sustentar aquilo que deseja viver.</p>
        <p className="prospere-script">É isso que eu chamo de Frequência da Prosperidade.</p>
      </section>

      <section className="prospere-application">
        <div>
          <p className="prospere-kicker">Atenção</p>
          <h2>Esta não é uma mentoria aberta para qualquer pessoa.</h2>
          <p>Eu quero conhecer você antes. As vagas são selecionadas porque quero acompanhar de perto quem está realmente pronto para aplicar o método.</p>
        </div>
        <ol>
          <li><span>1</span><div><strong>Você se candidata</strong><p>Responde ao formulário e conta seu momento, desafios e objetivos.</p></div></li>
          <li><span>2</span><div><strong>Nós avaliamos o alinhamento</strong><p>Conhecemos sua história e verificamos se esta jornada é para você.</p></div></li>
          <li><span>3</span><div><strong>Você recebe as orientações</strong><p>Havendo alinhamento, enviamos os próximos passos para a turma.</p></div></li>
        </ol>
      </section>

      <section className="prospere-final">
        <p className="prospere-kicker">A pergunta agora é</p>
        <h2>Quanto tempo mais você vai procurar fora o que precisa começar a transformar <em>dentro?</em></h2>
        <p>O Prospere C.i.M. é o convite para parar de apenas desejar uma vida diferente — e começar a governá-la.</p>
        <CTA>Essa vaga é minha</CTA>
        <small>Você não precisa estar pronto. Mas precisa estar disposto a fazer diferente.</small>
      </section>

      <footer className="prospere-footer">
        <a href="/" aria-label="Voltar ao início"><img src="/image/cim.jpeg" alt="Prospere C.i.M." /></a>
        <p>Corpo · Investimentos · Mentalidade</p>
        <p>© {new Date().getFullYear()} Flávia RicaMente</p>
      </footer>
    </main>
  );
}
