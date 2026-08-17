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

const audienceHighlights = /(dinheiro|medo|escassez|sustentar|apego|investir|gasto|investimento|tempo|pressão|mente acelerada|negativos|corpo|organizar sua vida financeira|potencial)/gi;
const audienceHighlightTest = /^(dinheiro|medo|escassez|sustentar|apego|investir|gasto|investimento|tempo|pressão|mente acelerada|negativos|corpo|organizar sua vida financeira|potencial)$/i;

function HighlightAudience({ children }: { children: string }) {
  return <>{children.split(audienceHighlights).map((part, index) => audienceHighlightTest.test(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part)}</>;
}

const receiveItems = [
  ["01", "3 semanas de mentoria guiada", "Uma imersão prática nos três pilares do Prospere C.i.M."],
  ["02", "Encontros e acompanhamento ao vivo durante a semana", "Para você não ficar sozinho entre uma aula e outra."],
  ["03", "Aplicação prática do método", "Você não apenas aprende. Você executa."],
  ["04", "Direcionamento financeiro e aulas de investimentos", "De acordo com a necessidade e o momento de cada participante."],
  ["05", "Ferramentas de transformação e reprogramação", "Para trabalhar padrões, crenças, pensamentos e comportamentos."],
  ["06", "4ª semana de acompanhamento", "Um período dedicado à consolidação e integração."],
  ["07", "Comunidade vitalícia", ""],
];

const audience = [
  "vive preocupado com dinheiro, mesmo quando consegue ganhar;",
  "sente medo do amanhã e pensa sempre na falta;",
  "carrega pensamentos e crenças de escassez que não consegue transformar sozinho;",
  "começa muitas coisas, mas tem dificuldade de sustentar;",
  "Sente muito apego com dinheiro, medo de gastar, de faltar, de investir.",
  "Não sabe a diferença entre gasto e investimento",
  "sabe o que deveria fazer, mas não consegue colocar em prática;",
  "sente que está sempre correndo e nunca tem tempo para si;",
  "vive sob pressão e com a mente acelerada;",
  "sofre com pensamentos repetitivos e negativos;",
  "quer cuidar melhor do corpo, mas sempre acaba deixando para depois;",
  "Sente que seu corpo está inflamado, lento, agitado ou sempre com dores;",
  "quer organizar sua vida financeira e investir, mas não sabe por onde começar ou como evoluir;",
  "já estudou muito, leu, fez cursos, mas continua procurando a próxima solução;",
  "sente que existe um potencial dentro de você que ainda não está sendo vivido.",
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
          <p className="prospere-kicker prospere-hero-kicker">
            <span>Prospere C.<span className="prospere-lowercase">i</span>.M.</span>
            <i aria-hidden="true" />
            <span>Corpo. Investimentos. Mentalidade.</span>
          </p>
          <h1>Você,<br /><em>prosperando</em><br />por inteiro.</h1>
          <p className="prospere-lead"><strong>Você sabe que pode viver uma vida diferente.</strong></p>
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
          <p>Você começa. Se anima. Decide mudar. Cuida do corpo, organiza a vida financeira, tenta pensar positivo, ter uma rotina melhor. priorizar. Até que ritmo aperta e você se vê repetindo os mesmos padrões.</p>
          <p><strong>A ansiedade volta. O medo do amanhã aparece, aquela angústia de sempre.<br /><br />O dinheiro vira preocupação novamente. A mente vira barulho e agitação.</strong></p>
          <p>Talvez você já saiba muita coisa. Você não precisa de mais uma informação, mais um curso frio e raso, mais uma ferramenta ou mais alguém dizendo o que deveria fazer. <strong>O que falta é transformar conhecimento em prática, e prática em uma nova forma de viver.</strong></p>
        </div>
        <blockquote><strong>Você merece viver com mais <em>liberdade.</em></strong></blockquote>
      </section>

      <section className="prospere-method-intro">
        <div className="prospere-method-copy">
          <p className="prospere-kicker">O método é o autogoverno</p>
          <h2>Prospere com autonomia, constância, direção e resultados sustentáveis em todas as áreas.</h2>
          <p><strong>O “Prospere C.i.M.”</strong> é uma Mentoria para quem quer prosperar com AUTONOMIA, constância, direção e resultados sustentáveis em todas as áreas. No meu Método, <mark>Você se torna o Método!</mark> Porque? <strong>Porque EU SOU o meu Método. E consigo hoje ter “Governança Pessoal e Prosperar em todas as áreas da Vida”, e posso te guiar pelo mesmo caminho.</strong></p>
          <p>Três semanas. Um método, para acessar os resultados que você tanto sonha, no CORPO, Bem estar, DINHEIRO E MENTALIDADE.</p>
          <p>O método é o autogoverno: a capacidade de governar, de dentro para fora, aquilo que antes governava você: seus pensamentos, suas crenças, seus hábitos, sua relação com o dinheiro, o consumismo, a procrastinação com suas finanças, seu corpo, e toda a forma como você responde à vida.</p>
          <p>Para romper ciclos que se repetem, sustentar novas escolhas e acessar a sua Frequência da Prosperidade.</p>
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
          <p>Eu percebi na prática atendendo pessoas e clientes há mais de 25 anos, que elas precisam um sistema que faça tudo isso funcionar junto.</p>
          <p>Deixa eu te contar: <strong>Eu sempre lidei com 2 públicos:</strong> <strong>1 – Pessoas com muito dinheiro</strong>, meus clientes grandes Investidores, mas uma vida em caos, stress, ansiedade, hábitos ruins, conflitos internos e externos.</p>
          <p><strong>2 – Pessoas com uma relação ruim com dinheiro</strong>, que decidiram aprender a Investir porque se viam sempre preocupados demais, trabalhando duro, gerando renda, mas aprisionados na escassez.</p>
          <p>Prosperidade não é apenas ter mais dinheiro. Ele é muito bem vindo, e é por isso eu quero te ajudar a conquistar a vida que você tanto visualiza!</p>
          <p>Mas prosperar, tem a ver com utilizar esse dinheiro que entra de forma Inteligente, a serviço do seu bem estar, de uma vida CHEIA DE PAZ, LEVEZA, CONFIANÇA, SAÚDE E QUE FAÇA SENTIDO PARA QUEM VOCÊ É.</p>
          <CTA>Quero me candidatar</CTA>
        </div>
      </section>

      <section className="prospere-prosperity prospere-section">
        <p className="prospere-kicker">A Frequência da Prosperidade</p>
        <h2>Quem é Próspero, tem hábitos prósperos. A pessoa Vive a PROSPERIDADE.</h2>
        <div className="prospere-tension-grid">
          <p>Já viu aquela pessoa que sempre tem energia alta, disposição? Tem postura, uma imagem Magnética que atrai, vive uma vida interessante, conquista as pessoas, clientes, e passa segurança? Essa pessoa acessou a “Frequência da Prosperidade”.</p>
          <p>Essa nova versão sua vai viver uma relação madura com o dinheiro, e não ficar pensando, preocupando o tempo todo. Dinheiro é algo natural, que simplesmente flui para você. A pessoa próspera também investe com inteligência. Essa pessoa que também pode ser VOCÊ sabe identificar padrões MENTAIS que te mantêm na <strong>ESCASSEZ.</strong></p>
          <p>Se você está aqui você já entendeu que: “quando você muda apenas as circunstâncias externas, precisa passar a vida tentando controlar as circunstâncias.” Isso é pesado demais, e impossível! O que te ensino é retirar o que está impedindo você de viver aquilo que já existe como possibilidade dentro de você. <strong>Não é motivacional! É <mark>ATIVACIONAL!</mark></strong></p>
        </div>
        <blockquote>É aí que começa a verdadeira prosperidade.</blockquote>
        <CTA>Quero aplicar</CTA>
      </section>

      <section className="prospere-pillars prospere-section">
        <div className="prospere-section-heading">
          <p className="prospere-kicker">Prospere C.<span className="prospere-lowercase">i</span>.M.</p>
          <h2>Um método para você PROSPERAR por inteiro!</h2>
          <p>O Prospere C.i.M. integra três pilares que não podem ser separados:</p>
        </div>
        <div className="prospere-pillar-list">
          <article><span>C</span><div><small>Corpo</small><h3>Auto conhecimento, consciência corporal.</h3><p>Você começa pelo corpo. Porque é nele que você vive. Ele vai te ajudar a prosperar, pois o Corpo ama Hábitos. O tempo e energia que você gastava com o corpo, vai sobrar para Prosperar no Dinheiro.</p></div></article>
          <article><span>I</span><div><small>Investimentos</small><h3>Finanças, organização, construção de patrimônio e Investir bem.</h3><p>Você aprende a olhar para o dinheiro sem medo, sem culpa e sem dependência. O dinheiro a serviço do seu bem-estar, melhorando a sua vida. E não você sendo um refém do dinheiro. Isso é viver na escassez.</p><p>E, de acordo com a necessidade de cada participante, eu também entro com minha experiência de mais de 25 anos no mercado financeiro e minha atuação como Assessora de Investimentos. Ensino como começar a Investir, e como distribuir bem uma carteira com escolhas simples, entre Renda Fixa, Tesouro Direto, Ações ou Fundos Imobiliários.</p></div></article>
          <article><span>M</span><div><small>Mentalidade</small><h3>Reprogramação mental e libertação de crenças limitantes.</h3><p>Tudo que não está bom, mostra que você está preso a padrões: Crenças de escassez. Medo do futuro. Autossabotagem. Dificuldade de começar — e principalmente de sustentar.</p><p>Aqui eu te ajudo a ATIVAR a Mente Próspera que habita em você, com ferramentas práticas simples, qualquer pessoa com a direção certa consegue aplicar e se auto reprogramar. Nova Mente, Novo Você.</p></div></article>
        </div>
      </section>

      <section className="prospere-journey">
        <div className="prospere-journey-image">
          <img src="/image/cim/flavia-dubai-burj-khalifa.jpeg" alt="Flávia diante do Burj Khalifa, em Dubai" />
        </div>
        <div className="prospere-journey-copy">
          <p className="prospere-kicker">Uma jornada guiada</p>
          <h2>Não é apenas uma Mentoria. É um protocolo guiado e direcionado por mim ao vivo.</h2>
          <p>Durante três semanas, eu vou transferir para você tudo aquilo que eu mesma pratico.</p>
          <p>Meu método, ferramentas, práticas, rotina, minha forma de pensar. Minha forma de me relacionar com o dinheiro, com o corpo e com a vida.</p>
          <p>Você não vai receber apenas conteúdo. Eu vou pegar na sua mão e te guiar na aplicação.</p>
          <p><strong>Eu vi de perto que essa é a maior dificuldade das pessoas. Porque saber é uma coisa. Fazer é outra.</strong></p>
          <CTA>Quero tentar minha vaga</CTA>
          <p>Os encontros são online e ao vivo! Você faz do conforto de sua casa, e cada sessão é transformadora, justamente por essa sinergia do ao vivo comigo e da comunidade que se forma.</p>
          <p><strong>E A SUA JORNADA PRÓSPERA NASCE, MAS NÃO TERMINA NAS TRÊS SEMANAS.</strong></p>
          <p>Você continua acompanhado. Depois das três semanas de imersão, existe uma quarta etapa de acompanhamento e consolidação diária no nosso grupo.</p>
          <p>E Você continua tendo acesso à comunidade e ao grupo vitaliciamente, para seguir conectado, acompanhado e em movimento.</p>
        </div>
      </section>

      <section className="prospere-receive prospere-section">
        <div className="prospere-section-heading">
          <p className="prospere-kicker">O que você recebe</p>
          <h2>Direção, prática e acompanhamento.</h2>
        </div>
        <div className="prospere-receive-grid">
          {receiveItems.map(([number, title, description]) => (
            <article key={number}><span>{number}</span><h3>{title}</h3>{description && <p>{description}</p>}</article>
          ))}
        </div>
        <div className="prospere-centered-cta"><CTA>Quero tentar minha vaga</CTA></div>
        <p className="prospere-community-note">Você continua conectado mesmo depois do encerramento da mentoria. Porque, <strong>“JUNTOS PROSPERAMOS MAIS”!</strong></p>
        <div className="prospere-receive-grid prospere-bonus-grid">
          <article className="prospere-bonus"><span>+</span><small>Bônus</small><h3>Investidor de Propósito + Investir é Simples</h3><p><strong><span className="prospere-bonus-price">R$ 1.997,00</span> de Presente pra vida toda na sua jornada de crescimento como Investidor.</strong> Dois dos meus cursos online completos. Acesso pelo Hotmart.</p></article>
        </div>
      </section>

      <section className="prospere-audience prospere-section">
        <div className="prospere-audience-title">
          <p className="prospere-kicker">Para quem é</p>
          <h2>Para quem sente que poderia estar vivendo <em>muito mais</em> do que está vivendo hoje.</h2>
          <p>É para você que:</p>
          <CTA>Quero minha liberdade</CTA>
        </div>
        <ul>
          {audience.map((item) => <li key={item}><span aria-hidden="true" /><HighlightAudience>{item}</HighlightAudience></li>)}
        </ul>
        <p className="prospere-audience-note"><strong>Se você se reconhece em alguns desses itens</strong>, o que falta é alguém que consiga enxergar aqueles <strong>“Pontos Cegos”</strong>, que sozinho é quase possível de você enxergar. Eu mesma investi centenas de milhares de reais em grandes Mestres mundo afora! Você Precisa de alguém que <strong>vai caminhar com você até que aquilo se torne prática. E principalmente, alguém que sabe o caminho, porque o trilhou, e já vive essa realidade.</strong></p>
      </section>

      <section className="prospere-about">
        <div className="prospere-about-collage">
          <img className="prospere-about-card" src="/image/cim/card-flavia-ricamente.jpeg" alt="Card profissional de Flávia RicaMente" />
          <img className="prospere-about-photo" src="/image/cim/flavia-escritorio-investimentos.jpeg" alt="Flávia em seu ambiente de trabalho" />
        </div>
        <div className="prospere-about-copy">
          <p className="prospere-kicker">Por que comigo?</p>
          <h2>Porque eu não ensino uma vida que eu não vivo.</h2>
          <p>O Prospere C.i.M. nasceu da minha própria trajetória.</p>
          <p>Eu fui integrando, ao longo da minha vida, conhecimentos e práticas de diferentes áreas: Mercado Financeiro e Investimentos, comportamento, neurociência, metacognição, PNL, meditação, yoga, metafísica e desenvolvimento humano, Experiência no mercado Financeiro, centenas Países e Mentores Internacionais, Milhares de Livros, imersões e Mentorias, etc.</p>
          <p><strong>É essa experiência que eu transfiro para você.</strong></p>
          <h3>MAIS DE 25 ANOS ENTRE DINHEIRO, COMPORTAMENTO E TRANSFORMAÇÃO</h3>
          <p>Sou Assessora de Investimentos CERTIFICADA pela CVM, mentora, treinadora e palestrante, com mais de 25 anos de experiência no mercado financeiro e passagem por grandes instituições nacionais e internacionais.</p>
          <p>Conquistei minha independência financeira aos 33 anos.</p>
          <p>Mas, ao longo da minha própria jornada, entendi uma coisa ainda mais importante: ter dinheiro não significa necessariamente <strong>prosperar.</strong></p>
          <p><strong>Prosperidade</strong> é conseguir viver bem aquilo que você construiu. É ter dinheiro sem ser governado pelo dinheiro. É cuidar do corpo sem abandonar a vida. É construir patrimônio sem perder a paz. Sentir que pode crescer, sem precisar viver em estado permanente de alerta. E aprender a governar a si mesmo.</p>
          <CTA>Quero viver essa prosperidade</CTA>
          <div className="prospere-signature">Flávia RicaMente</div>
        </div>
      </section>

      <section className="prospere-objective prospere-section">
        <p className="prospere-kicker">O verdadeiro objetivo</p>
        <h2>Elevar a sua frequência no nível da <em>prosperidade sustentável.</em></h2>
        <p>Ao descobrir que você tem ferramentas para acessar a PROSPERIDADE, você não sai mais dela. Ninguém te tira isso, não importa as condições externas, entende?</p>
        <p>Não precisa controlar tudo para se sentir seguro.</p>
        <p>Não precisa esperar o próximo salário, o próximo investimento, a loteria, a herança, a promoção no trabalho, o próxima meta, para finalmente sentir que está tudo bem, e que a vida é abundante. <strong>Você se torna isso, e ao emitir esse sinal, tudo isso se alinha até você!</strong></p>
        <p>Você começa a construir dentro de si a capacidade de sustentar aquilo que deseja viver.</p>
        <p className="prospere-script"><strong>É isso que eu chamo de Frequência da Prosperidade.</strong></p>
        <CTA>Quero me candidatar</CTA>
      </section>

      <section className="prospere-application">
        <div>
          <p className="prospere-kicker">Atenção</p>
          <h2>Esta não é uma mentoria aberta para qualquer pessoa.</h2>
          <p>Eu quero conhecer você antes.</p>
          <p>As vagas são selecionadas porque eu quero acompanhar de perto pessoas que estejam realmente prontas para aplicar o método.</p>
          <p>Por isso, o primeiro passo não é comprar.</p>
          <h3>É SE CANDIDATAR!</h3>
          <p>Você responde ao formulário de aplicação e eu vou conhecer o seu momento, seus desafios e seus objetivos.</p>
          <p>Se houver alinhamento com a proposta da Mentoria, você recebe as orientações para entrar na próxima turma.</p>
          <p className="prospere-readiness"><strong>Você não precisa estar pronto.</strong><br /><mark>Mas precisa estar disposto a fazer diferente.</mark></p>
          <CTA>Quero me candidatar à mentoria</CTA>
        </div>
        <ol>
          <li><span>1</span><div><strong>Você se candidata</strong><p>Responde ao formulário de aplicação e conta seu momento, seus desafios e seus objetivos.</p></div></li>
          <li><span>2</span><div><strong>Nós avaliamos o alinhamento</strong><p>Eu conheço a sua história e verifico o alinhamento com a proposta da Mentoria.</p></div></li>
          <li><span>3</span><div><strong>Você recebe as orientações</strong><p>Se houver alinhamento, recebe as orientações para entrar na próxima turma.</p></div></li>
        </ol>
      </section>

      <section className="prospere-final">
        <p className="prospere-kicker">A pergunta agora é</p>
        <h2>“Quanto tempo mais você vai passar procurando fora aquilo que precisa começar a transformar <em>dentro?</em>”</h2>
        <p>O <strong>Prospere C.i.M.</strong> é o meu convite para você parar de apenas desejar uma vida diferente — e começar a governá-la e VIVER essa PROSPERIDADE.</p>
        <p><strong>Vamos juntos ATIVAR sua Nova IDENTIDADE QUE PROSPERA POR INTEIRO!</strong></p>
        <p><strong>Eleve sua Frequência da Prosperidade. Toda a abundância da vida espera por você acessá-la!</strong></p>
        <CTA>Essa vaga é minha</CTA>
      </section>

      <footer className="prospere-footer">
        <a href="/" aria-label="Voltar ao início"><img src="/image/cim.jpeg" alt="Prospere C.i.M." /></a>
        <p>Corpo · Investimentos · Mentalidade</p>
        <p>© {new Date().getFullYear()} Flávia RicaMente</p>
      </footer>
    </main>
  );
}
