const quizData = [
  {
    question: "Quando pensa em dinheiro, qual frase mais combina com você?",
    options: [
      { text: "Dinheiro é difícil de conseguir", type: "dinheiro" },
      { text: "Dinheiro vem e vai, e está tudo bem", type: "equilíbrio" },
      { text: "Eu mereço abundância financeira", type: "autoestima" },
    ],
  },
  {
    question: "Sobre o amor, você acredita que...",
    options: [
      { text: "Preciso me esforçar muito para ser amado(a)", type: "autoestima" },
      { text: "O amor acontece quando sou eu mesmo(a)", type: "identidade" },
      { text: "Relacionamentos são sempre complicados", type: "amor" },
    ],
  },
  {
    question: "Quando olha pra si mesmo(a), o que sente?",
    options: [
      { text: "Que ainda não sou bom o suficiente", type: "autoestima" },
      { text: "Que tenho muito valor, mesmo com falhas", type: "equilíbrio" },
      { text: "Que às vezes nem sei quem sou de verdade", type: "identidade" },
    ],
  },
];

let currentQuestion = 0;
let answers = [];

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  quiz.innerHTML = `
    <div class="question">${q.question}</div>
    <div class="options">
      ${q.options
        .map(
          (opt, index) =>
            `<div class="option" data-type="${opt.type}" data-index="${index}">${opt.text}</div>`
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", (e) => {
      const type = e.target.dataset.type;
      answers.push(type);
      nextBtn.classList.remove("hidden");
    });
  });
}

function showResult() {
  const counts = answers.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const dominant = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  let message = "";
  switch (dominant) {
    case "dinheiro":
      message =
        "Parece que suas crenças sobre dinheiro ainda carregam escassez. Reflita sobre o que o dinheiro representa pra você e como ele pode ser uma ferramenta de expansão.";
      break;
    case "amor":
      message =
        "Você pode ter crenças ligadas a relacionamentos desafiadores. O amor começa na forma como você se acolhe e se permite ser vulnerável.";
      break;
    case "autoestima":
      message =
        "Há um convite para fortalecer sua autoestima. Reconheça seu valor, mesmo sem precisar provar nada a ninguém.";
      break;
    case "identidade":
      message =
        "Talvez seja hora de se reconectar com quem você é de verdade. Sua identidade é um espaço em constante evolução — e isso é lindo.";
      break;
    default:
      message =
        "Você demonstra equilíbrio entre várias áreas da vida. Continue se observando com gentileza e curiosidade.";
  }

  quiz.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `<h2>Seu resultado:</h2><p>${message}</p>`;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.classList.add("hidden");

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

loadQuestion();
