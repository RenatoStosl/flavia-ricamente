export type ApplicationFormQuestion = {
  id: string;
  title: string;
  type: "short" | "paragraph" | "single";
  options?: readonly string[];
};

export const applicationFormQuestions = [
  { id: "age", title: "Qual é a sua idade?", type: "short" },
  { id: "profession", title: "Qual é a sua profissão ou principal atividade hoje?", type: "short" },
  {
    id: "current-life-moment",
    title: "Como você definiria seu momento atual de vida?",
    type: "single",
    options: [
      "Estou vivendo uma fase de expansão.",
      "Estou cansada(o) e preciso reorganizar minha vida.",
      "Sinto que estou pronta(o) para um próximo nível.",
    ],
  },
  {
    id: "financial-situation",
    title: "Como você se sente hoje em relação à sua situação financeira?",
    type: "single",
    options: [
      "Vivo com uma sensação de preocupação e escassez.",
      "Estou em um momento de transformação financeira, mas me sinto meio perdida(o).",
      "Ganho bem, mas sinto que preciso trabalhar demais para manter meu padrão.",
    ],
  },
  {
    id: "current-representation",
    title: "Qual dessas frases mais representa você hoje?",
    type: "single",
    options: [
      "Eu quero trabalhar menos e viver melhor.",
      "Eu quero ter mais equilíbrio entre dinheiro, saúde e qualidade de vida.",
      "Eu já conquistei financeiramente, mas ainda não sinto a prosperidade que imaginava.",
    ],
  },
  {
    id: "change-pattern",
    title: "Quando você decide mudar alguma coisa na sua vida, o que costuma acontecer?",
    type: "single",
    options: [
      "Começo muito motivada(o), mas perco o ritmo.",
      "Tenho dificuldade em criar uma rotina.",
      "Sei exatamente o que preciso fazer, mas tenho dificuldade em colocar em prática.",
      "Consigo ser disciplinada(o) no trabalho, mas não comigo.",
    ],
  },
  {
    id: "consistency-difficulty",
    title: "O que mais dificulta a sua constância hoje?",
    type: "single",
    options: [
      "Falta de tempo e organização.",
      "Cansaço e ansiedade.",
      "Tenho muitas informações, mas não sei como aplicar.",
      "Não sei exatamente por onde começar.",
    ],
  },
  {
    id: "desired-life-quality",
    title: "Você sente que, apesar de fazer muito, a vida que deseja ainda não chegou na qualidade que gostaria?",
    type: "single",
    options: ["Sim, exatamente.", "Às vezes sinto isso.", "Não. Sinto que estou vivendo a vida que escolhi."],
  },
  {
    id: "searching-solutions",
    title: "Você sente que está sempre buscando mais uma solução para melhorar alguma área da sua vida?",
    type: "single",
    options: [
      "Sim. Estou sempre procurando o próximo método, profissional ou ferramenta.",
      "Às vezes.",
      "Nunca tinha percebido isso e quero simplificar minha vida.",
    ],
  },
  {
    id: "prosperity-belief",
    title: "Qual dessas frases mais se aproxima do que você acredita sobre prosperidade?",
    type: "single",
    options: [
      "Prosperidade começa dentro e se manifesta fora.",
      "Minha mentalidade influencia diretamente minhas escolhas e resultados.",
      "Prosperidade envolve dinheiro, mas também corpo, energia, relações e qualidade de vida.",
    ],
  },
  {
    id: "work-connection",
    title: "O que mais fez você se conectar com o meu trabalho?",
    type: "single",
    options: [
      "Meu conhecimento e experiência de 20 anos no mercado financeiro e meu conhecimento sobre dinheiro e investimentos.",
      "A forma como eu falo sobre prosperidade.",
      "Meu estilo de vida equilibrado.",
      "A forma como eu vivo aquilo que ensino.",
      "Minha visão sobre uma vida com mais liberdade e qualidade.",
      "Uma combinação de tudo isso.",
    ],
  },
  {
    id: "three-week-commitment",
    title: "Você está disposta(o) a dedicar atenção e se comprometer com as práticas propostas durante as três semanas?",
    type: "single",
    options: [
      "Sim. Estou pronta(o) para me comprometer.",
      "Sim, mas minha rotina é bastante corrida.",
      "Não tenho certeza se conseguirei manter o compromisso.",
    ],
  },
  {
    id: "why-choose-you",
    title: "Por que eu deveria escolher você para andar junto comigo e te guiar?",
    type: "paragraph",
  },
  {
    id: "investment-readiness",
    title: "O investimento para participar da mentoria é de 12x de R$ 129,99 ou à vista, com desconto, por R$ 1.333,00. Você está disposta(o) a investir em você neste momento?",
    type: "single",
    options: [
      "Sim, posso fazer o investimento parcelado.",
      "Sim, posso fazer o investimento à vista.",
      "Gostaria muito, porém mais uma vez eu não vou me priorizar.",
    ],
  },
] as const satisfies readonly ApplicationFormQuestion[];

export type ApplicationFormAnswers = Record<string, string>;
