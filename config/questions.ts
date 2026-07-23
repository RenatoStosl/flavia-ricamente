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
  { id: "statement-1", title: "Eu acordo com disposição e tenho energia suficiente para realizar o que preciso ao longo do dia." },
  { id: "statement-2", title: "Eu espero ser bem-sucedido(a) quando começo algo novo." },
  { id: "statement-3", title: "Costumo agir por impulso, como comprar, comer ou pegar o celular, mesmo quando sei que não preciso naquele momento." },
  { id: "statement-4", title: "Sinto ansiedade ao abrir meu aplicativo bancário ou consultar meu saldo." },
  { id: "statement-5", title: "Eu me pego revivendo situações negativas na minha mente." },
  { id: "statement-6", title: "Eu acredito que existe abundância suficiente para todos." },
  { id: "statement-7", title: "Pequenas situações tiram minha paz facilmente." },
  { id: "statement-8", title: "Eu tenho o hábito de guardar ou investir parte da minha renda." },
  { id: "statement-9", title: "Eu me sinto satisfeito(a) com meu corpo atualmente." },
  { id: "statement-10", title: "Eu pratico atividade física com regularidade." },
  { id: "statement-11", title: "Eu evito tentar coisas novas por medo de falhar ou de ser julgado(a)." },
  { id: "statement-12", title: "Eu passo muito tempo consumindo notícias, mídias ou entretenimento de telas." },
  { id: "statement-13", title: "Eu sinto que preciso me esforçar muito e lutar o tempo todo para prosperar." },
  { id: "statement-14", title: "Eu costumo investir em conhecimento para aprender a administrar melhor meu dinheiro." },
  { id: "statement-15", title: "Eu me critico mais do que me incentivo." },
  { id: "statement-18", title: "Quando recebo um dinheiro inesperado, minha primeira reação é gastá-lo rapidamente." },
  { id: "statement-19", title: "Eu costumo me colocar novos objetivos de crescimento, como aumentar minha renda, aprender algo novo, viajar ou realizar um grande projeto." },
  { id: "statement-20", title: "Eu sinto que os ambientes onde passo mais tempo favorecem meu bem-estar e minha prosperidade." },
  { id: "statement-21", title: "Meu corpo transmite saúde, energia e vitalidade." },
  { id: "statement-22", title: "Eu costumo pressupor que as intenções das pessoas em relação a mim são negativas." },
  { id: "statement-23", title: "Eu consigo permanecer algum tempo sozinho(a), em silêncio, sem precisar recorrer ao celular, à TV, à música ou a outras distrações." },
  { id: "statement-24", title: "Eu me sinto ansioso(a) ou pressionado(a) quando vejo pessoas falando sobre investimentos, poupar para o futuro ou construir patrimônio." },
  { id: "statement-25", title: "Eu consigo começar e concluir aquilo que me proponho a fazer, como livros, cursos ou projetos pessoais." },
  { id: "statement-27", title: "Eu trabalho bastante, mas continuo preocupado(a) com dinheiro." },
] as const;

const scoredQuestions = scoredStatements.map((statement) => ({
  ...statement,
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
  ...scoredQuestions.slice(0, 8),
  transitionQuestions[0],
  ...scoredQuestions.slice(8, 16),
  transitionQuestions[1],
  ...scoredQuestions.slice(16, 21),
  transitionQuestions[2],
  ...scoredQuestions.slice(21),
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
