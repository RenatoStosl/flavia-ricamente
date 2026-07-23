import type { QuizOption, QuizQuestion } from "./types";

export const responseScale = [
  { id: "always", label: "Sempre" },
  { id: "mostly", label: "Na maioria das vezes" },
  { id: "sometimes", label: "Às vezes" },
  { id: "rarely-never", label: "Raramente ou nunca" },
] as const satisfies readonly QuizOption[];

const multipleChoiceOptions = {
  desires: [
    { id: "financial-prosperity", label: "Mais prosperidade financeira" },
    { id: "calm", label: "Mais tranquilidade" },
    { id: "energy", label: "Mais energia e disposição" },
    { id: "confidence", label: "Mais confiança para agir" },
    { id: "freedom", label: "Mais liberdade" },
    { id: "health", label: "Mais saúde" },
    { id: "big-dream", label: "Realizar um grande sonho" },
  ],
  leaveBehind: [
    { id: "financial-anxiety", label: "Ansiedade financeira" },
    { id: "future-fear", label: "Medo do futuro" },
    { id: "worry", label: "Excesso de preocupação" },
    { id: "rush", label: "Correria constante" },
    { id: "fatigue", label: "Cansaço físico" },
    { id: "self-criticism", label: "Autocrítica" },
    { id: "scarcity", label: "Sensação de escassez" },
  ],
} as const;

const scoredStatements = [
  "Eu acordo com disposição e tenho energia suficiente para realizar o que preciso ao longo do dia.",
  "Eu espero ser bem-sucedido(a) quando começo algo novo.",
  "Costumo agir por impulso, como comprar, comer ou pegar o celular, mesmo quando sei que não preciso naquele momento.",
  "Sinto ansiedade ao abrir meu aplicativo bancário ou consultar meu saldo.",
  "Eu me pego revivendo situações negativas na minha mente.",
  "Eu acredito que existe abundância suficiente para todos.",
  "Pequenas situações tiram minha paz facilmente.",
  "Eu tenho o hábito de guardar ou investir parte da minha renda.",
  "Eu me sinto satisfeito(a) com meu corpo atualmente.",
  "Eu pratico atividade física com regularidade.",
  "Eu evito tentar coisas novas por medo de falhar ou de ser julgado(a).",
  "Eu passo muito tempo consumindo notícias, conteúdos ou conversas negativas.",
  "Eu sinto que preciso me esforçar muito e lutar o tempo todo para prosperar.",
  "Eu costumo investir em conhecimento para aprender a administrar melhor meu dinheiro.",
  "Eu me critico mais do que me incentivo.",
  "Durante a semana, separo momentos para desacelerar e simplesmente não fazer nada.",
  "Quando algo bom acontece, consigo aproveitar esse momento antes de voltar às preocupações.",
  "Quando recebo um dinheiro inesperado, minha primeira reação é gastá-lo rapidamente, em vez de dar uma direção consciente a esse dinheiro.",
  "Eu costumo me colocar novos objetivos de crescimento, como aumentar minha renda, aprender algo novo, viajar ou realizar um grande projeto.",
  "Eu sinto que os ambientes onde passo mais tempo favorecem meu bem-estar e minha prosperidade.",
  "Meu corpo transmite saúde, energia e vitalidade.",
  "Eu costumo pressupor que as intenções das pessoas em relação a mim são negativas.",
  "Eu consigo permanecer algum tempo sozinho(a), em silêncio, sem precisar recorrer ao celular, à TV, à música ou a outras distrações.",
  "Eu me sinto ansioso(a) ou pressionado(a) quando vejo pessoas falando sobre investimentos, poupar para o futuro ou construir patrimônio.",
  "Eu consigo começar e concluir aquilo que me proponho a fazer, como livros, cursos ou projetos pessoais.",
  "Eu deixo de acompanhar meus investimentos, minha organização financeira ou meu planejamento por longos períodos.",
  "Eu trabalho bastante, mas continuo preocupado(a) com dinheiro.",
] as const;

const scoredQuestions = scoredStatements.map((title, index) => ({
  id: `statement-${index + 1}`,
  title,
  options: responseScale,
}));

const transitionQuestions = [
  {
    id: "transition-celebration",
    title: "Se hoje fosse seu último dia no modo sobrevivência, o que você comemoraria primeiro?",
    options: [
      { id: "coffee", label: "☕ Um café sem culpa" },
      { id: "sleep", label: "💤 Uma noite de sono tranquila" },
      { id: "bank", label: "🚫 Um dia sem checar o banco" },
      { id: "toast", label: "🎉 Um brinde com quem eu amo" },
    ],
  },
  {
    id: "transition-pillar",
    title: "Dos 3 pilares Corpo, Investimentos e Mente, qual você sente mais fragilizado hoje?",
    options: [
      { id: "body", label: "💪 Corpo — minha energia e bem-estar" },
      { id: "investments", label: "💰 Investimentos — minha relação com dinheiro" },
      { id: "mind", label: "🧠 Mente — meus pensamentos e emoções" },
    ],
  },
  {
    id: "transition-money",
    title: "Se o dinheiro falasse com você agora, o que ele diria?",
    options: [
      { id: "calm", label: "💬 Vamos conversar com mais calma." },
      { id: "direction", label: "🧭 Me dê uma direção." },
      { id: "step", label: "🌱 Um passo de cada vez." },
      { id: "growth", label: "✨ Estou pronto para crescer com você." },
    ],
  },
] as const satisfies readonly QuizQuestion[];

export const questions = [
  ...scoredQuestions.slice(0, 9),
  transitionQuestions[0],
  ...scoredQuestions.slice(9, 18),
  transitionQuestions[1],
  ...scoredQuestions.slice(18),
  transitionQuestions[2],
  {
    id: "desired-manifestation",
    title: "O que você mais deseja manifestar nos próximos meses?",
    description: "Você pode marcar mais de uma opção.",
    options: multipleChoiceOptions.desires,
    selectionMode: "multiple",
  },
  {
    id: "leave-behind",
    title: "O que você mais deseja deixar para trás?",
    description: "Você pode marcar mais de uma opção.",
    options: multipleChoiceOptions.leaveBehind,
    selectionMode: "multiple",
  },
] as const satisfies readonly QuizQuestion[];

export const questionIds = questions.map((question) => question.id);
export const scoredQuestionCount = scoredStatements.length;
