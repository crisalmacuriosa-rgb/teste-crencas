const questions = [
  { area: "O Pacificador", text: "Evito conflitos a qualquer custo, mesmo que me anule." },
  { area: "O Pacificador", text: "Tenho medo de magoar os outros, mesmo quando estou certo(a)." },
  { area: "O Salvador", text: "Sinto que é minha responsabilidade curar a dor dos outros." },
  { area: "O Salvador", text: "Tenho dificuldade em receber ajuda." },
  { area: "A Ferida da Bruxa", text: "Se eu me destacar, vão me atacar." },
  { area: "A Ferida da Bruxa", text: "Minha força assusta." },
  { area: "O Fardo do Controle", text: "Tenho dificuldade em confiar no fluxo das coisas." },
  { area: "O Fardo do Controle", text: "Sinto que, se eu relaxar, tudo vai dar errado." },
  { area: "O Amor Condicional", text: "Acredito que só serei amado(a) se for perfeito(a)." },
  { area: "O Amor Condicional", text: "Me esforço demais para ser aceito(a)." },
  { area: "A Carência de Valor", text: "Não me aceitam porque não tenho nada a oferecer." },
  { area: "A Carência de Valor", text: "Sinto que preciso provar constantemente meu valor." },
  { area: "A Vulnerabilidade Negada", text: "Não posso ser vulnerável." },
  { area: "A Vulnerabilidade Negada", text: "Finjo estar bem, mesmo quando não estou." },
  { area: "A Independência Punida", text: "Tenho que dar conta de tudo sozinha." },
  { area: "A Independência Punida", text: "Se eu for independente, não serei amada ou serei explorada." },
  { area: "O Prisioneiro do Vínculo", text: "Tenho medo de ser abandonado(a)." },
  { area: "O Prisioneiro do Vínculo", text: "Aceito menos do que mereço por medo de ficar só." },
  { area: "O Prisioneiro do Vínculo", text: "Sinto que minha felicidade depende do outro." },
];

let currentQuestion = 0;
let scores = {};

const startBtn = document.getElementById("start-btn");
const testSection = document.getElementById("test-section");
const questionTitle = document.getElementById("question-title");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result-section");
const reflectionText = document.getElementById("reflection-text");

startBtn.addEventListener("click", () => {
  document.querySelector(".instructions").classList.add("hidden");
  testSection.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionTitle.textContent = q.text;
  optionsDiv.innerHTML = `
    <label><input type="radio" name="answer" value="1"> Nunca</label>
    <label><input type="radio" name="answer" value="2"> Às vezes</label>
    <label><input type="radio" name="answer" value="3"> Frequentemente</label>
    <label><input type="radio" name="answer" value="4"> Sempre</label>
  `;
}

nextBtn.addEventListener("click", () => {
  const answer = document.querySelector('input[name="answer"]:checked');
  if (!answer) return alert("Escolha uma opção para continuar.");

  const area = questions[currentQuestion].area;
  scores[area] = (scores[area] || 0) + parseInt(answer.value);

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  testSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const labels = Object.keys(scores);
  const data = labels.map((key) => scores[key]);

  const ctx = document.getElementById("beliefChart");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#a5d8ff",
            "#ffd6a5",
            "#caffbf",
            "#bdb2ff",
            "#ffc6ff",
            "#ffadad",
            "#fdffb6",
            "#caffbf",
          ],
        },
      ],
    },
  });

  const dominant = labels.reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const reflections = {
    "O Pacificador":
      "Talvez você evite o confronto por medo de perder o amor. Lembre-se: paz verdadeira nasce do diálogo, não do silêncio.",
    "O Salvador":
      "Você carrega o mundo nas mãos, mas se esquece que o seu coração também precisa ser cuidado.",
    "A Ferida da Bruxa":
      "Sua luz incomoda quem ainda vive na sombra. Permita-se brilhar mesmo que o mundo não entenda.",
    "O Fardo do Controle":
      "Tentar controlar tudo é um jeito bonito e exausto de querer se sentir seguro. Às vezes, confiar é o maior ato de força.",
    "O Amor Condicional":
      "Você aprendeu que precisa merecer amor, mas o amor verdadeiro não pede provas — ele acolhe.",
    "A Carência de Valor":
      "Você vale pelo que é, não pelo que faz. Reconhecer o próprio brilho é o primeiro passo para que o mundo o veja.",
    "A Vulnerabilidade Negada":
      "Ser forte não é esconder a dor, é permitir-se senti-la. A coragem nasce das rachaduras do coração.",
    "A Independência Punida":
      "Sua força assusta até você. Ser autônomo não significa estar só. Aceite ajuda como um gesto de amor, não de fraqueza.",
    "O Prisioneiro do Vínculo":
      "Você se prende ao amor por medo da solidão. Mas o amor verdadeiro não aprisiona, ele expande.",
  };

  reflectionText.innerHTML = `<p>${reflections[dominant]}</p>`;
}

document.getElementById("restart-btn").addEventListener("click", () => {
  currentQuestion = 0;
  scores = {};
  resultSection.classList.add("hidden");
  document.querySelector(".instructions").classList.remove("hidden");
});
