import type { QuizResult } from "./types";

// As faixas são inclusivas e podem ser ajustadas sem alterar o motor do quiz.
export const results = [
  {
    id: "survival",
    level: "Nível 1",
    minScore: 27,
    maxScore: 54,
    title: "Frequência da Sobrevivência",
    sections: [
      {
        title: "Onde você está",
        paragraphs: [
          "Hoje, grande parte da sua energia está sendo consumida pela preocupação, pelo medo, pela ansiedade ou pela sensação de que está sempre correndo atrás.",
          "Talvez você trabalhe muito, se esforce bastante e ainda assim sinta que os resultados não acompanham esse esforço.",
          "É comum sentir que nunca consegue realizar tudo o que gostaria, ficar sempre se comparando, carregar uma sensação de atraso em relação aos próprios sonhos e, às vezes, até de dívida consigo mesmo e com as pessoas que ama.",
          "Nesse estado, suas decisões tendem a nascer mais da necessidade de evitar problemas do que da liberdade de construir o futuro que deseja.",
          "Isso não significa falta de inteligência, capacidade ou potencial. Significa apenas que, neste momento, sua frequência está voltada para sobreviver e não para prosperar.",
        ],
      },
      {
        title: "As ameaças desse estado",
        bullets: [
          "Viver ocupado, mas sem sentir que realmente avança.",
          "Não saber por onde começar para transformar a própria realidade.",
          "Tomar decisões impulsivas ou motivadas pelo medo.",
          "Abandonar projetos importantes antes de colher resultados.",
          "Sentir insatisfação constante, mesmo quando conquista algo.",
          "Acreditar que precisa fazer cada vez mais esforço para conquistar cada vez menos tranquilidade.",
        ],
        paragraphs: [
          "Além disso, é comum sentir que a vida está sempre trazendo um novo imprevisto, uma nova urgência ou uma nova emergência. Parece que, quando um problema termina, outro já aparece.",
          "Isso é o reflexo de um sistema interno que permanece programado para sobreviver, sempre esperando o próximo problema em vez de construir o próximo resultado.",
          "Com o tempo, esse estado desgasta o corpo, dificulta enxergar oportunidades e torna cada vez mais difícil sustentar uma vida confortável e próspera.",
        ],
      },
      {
        title: "O seu potencial",
        paragraphs: [
          "A boa notícia é que frequência não é personalidade. É um estado. E estados podem ser transformados.",
          "À medida que você desenvolve novos conhecimentos, muda seus hábitos, toma decisões mais conscientes, escolhe ambientes que fortalecem quem deseja se tornar e constrói uma nova identidade, sua frequência também começa a mudar.",
        ],
      },
      {
        title: "Para onde você pode ir",
        paragraphs: [
          "Quando sua energia deixa de ser consumida pelo medo, pela escassez e pela ansiedade, ela volta a ficar disponível para construir uma nova realidade. É exatamente aí que a verdadeira prosperidade começa.",
        ],
      },
    ],
    ctaLabel: "Quero meu próximo passo",
    ctaUrl: "https://wa.me/message/7LWVU3TUR4C4A1",
  },
  {
    id: "oscillation",
    level: "Nível 2",
    minScore: 55,
    maxScore: 81,
    title: "Frequência da Oscilação",
    sections: [
      {
        title: "Onde você está",
        paragraphs: [
          "Você já percebeu que existe um caminho diferente. Em alguns momentos consegue agir com consciência, disciplina e clareza. Em outros, acaba voltando aos antigos padrões de preocupação, procrastinação, impulsividade ou excesso de esforço.",
          "Você já não vive apenas no modo sobrevivência. Mas ainda não consegue sustentar, com constância, a frequência da prosperidade.",
          "Sua maior característica hoje é a oscilação. Há dias em que você confia em si. E há dias em que duvida.",
          "Há períodos em que cuida do corpo, organiza as finanças, investe em si, mantém bons hábitos e faz escolhas conscientes. Depois interrompe, recomeça e interrompe novamente.",
        ],
      },
      {
        title: "As ameaças desse estado",
        paragraphs: [
          "O maior risco da oscilação não é fracassar. É permanecer anos exatamente no mesmo lugar e sabotar seus sonhos.",
          "Isso gera uma frustração silenciosa, porque, no fundo, você sabe que é capaz de viver muito mais do que vive hoje.",
        ],
        bullets: [
          "Ter conhecimento, mas pouca aplicação.",
          "Ter intenção, mas pouca constância.",
          "Começar muitas coisas e concluir poucas.",
          "Oscilar entre confiança e medo; entre disciplina e impulsividade; entre prosperidade e escassez.",
        ],
      },
      {
        title: "O seu potencial",
        paragraphs: [
          "Você não precisa começar do zero. A base já existe.",
          "O próximo passo não depende de acumular mais informação. Depende de transformar conhecimento em prática, prática em hábito e hábito em identidade.",
          "Quando pensamentos, emoções, decisões e ações caminham na mesma direção, sua frequência deixa de oscilar. Ela se estabiliza. E é essa estabilidade que cria espaço para a prosperidade.",
        ],
      },
      {
        title: "Para onde você pode ir",
        paragraphs: ["Quando a constância substitui a oscilação, prosperidade deixa de ser um momento. Ela passa a ser uma identidade."],
      },
    ],
    ctaLabel: "Quero meu próximo passo",
    ctaUrl: "https://wa.me/message/7LWVU3TUR4C4A1",
  },
  {
    id: "prosperity",
    level: "Nível 3",
    minScore: 82,
    maxScore: 108,
    title: "Frequência da Prosperidade",
    sections: [
      {
        title: "Onde você está",
        paragraphs: [
          "Você demonstra sinais consistentes de equilíbrio interno. Suas decisões tendem a nascer mais da consciência do que da urgência.",
          "Você compreende que prosperidade vai muito além do dinheiro. Ela envolve qualidade de vida, saúde, presença, liberdade, patrimônio e paz.",
          "Você busca equilibrar o ser e o ter, e entende que um fortalece o outro. Sua frequência favorece crescimento, construção e expansão.",
        ],
      },
      {
        title: "O desafio desse nível",
        paragraphs: [
          "Chegar até aqui não significa que o trabalho terminou. Frequência elevada também precisa ser cultivada.",
          "Prosperidade não é apenas ganhar mais dinheiro. É desenvolver a capacidade de preservar, multiplicar e usufruir aquilo que construiu.",
          "É preparar-se para a longevidade, para a independência financeira e para viver com liberdade em todas as fases da vida. Quanto mais refinados se tornam seus hábitos, mais sustentável se torna sua prosperidade.",
        ],
      },
      {
        title: "O seu potencial",
        paragraphs: [
          "Agora o foco deixa de ser apenas construir uma vida melhor para você. Passa a ser viver de forma tão coerente que a sua própria vida inspira outras pessoas.",
          "Você começa a transbordar aquilo que cultivou internamente. Pelos seus frutos os conhecereis.",
          "A prosperidade verdadeira sempre produz frutos visíveis.",
        ],
      },
      {
        title: "Para onde você pode ir",
        paragraphs: ["Quando uma frequência elevada encontra consistência, prosperidade deixa de ser uma conquista. Ela passa a ser a forma como você vive. E essa transformação naturalmente alcança as pessoas ao seu redor."],
      },
    ],
    ctaLabel: "Quero meu próximo passo",
    ctaUrl: "https://wa.me/message/7LWVU3TUR4C4A1",
  },
] as const satisfies readonly QuizResult[];
