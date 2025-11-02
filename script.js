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

  let title = "";
  let message = "";

  switch (dominant) {
    case "dinheiro":
      title = "💰 Crença sobre Dinheiro";
      message =
        "Você pode carregar crenças de escassez ou limitação financeira. Reflita sobre o que o dinheiro representa para você e como ele pode ser uma ferramenta de expansão e liberdade.";
      break;
    case "amor":
      title = "💞 Crença sobre Amor";
      message =
        "Talvez existam padrões de dificuldade em se sentir plenamente amado(a). O amor começa na forma como você se acolhe e se permite ser autêntico(a).";
      break;
    case "autoestima":
      title = "🌟 Crença sobre Autoestima";
      message =
        "Há um convite para reconhecer e valorizar quem você é. Lembre-se: o seu valor não depende de desempenho, e sim da sua essência.";
      break;
    case "identidade":
      title = "🪞 Crença sobre Identidade";
      message =
        "Talvez esteja em um momento de redescobrir quem você é e o que faz sentido pra sua jornada. Sua identidade é viva, e isso é lindo.";
      break;
    case "equilíbrio":
      title = "⚖️ Crença de Equilíbrio";
      message =
        "Você demonstra equilíbrio entre diferentes áreas da vida. Continue se observando com gentileza e curiosidade — esse é um bom sinal de autoconhecimento.";
      break;
    default:
      title = "🌱 Autoconhecimento em expansão";
      message =
        "Suas respostas mostram um olhar diversificado. Continue explorando suas crenças e emoções com abertura e leveza.";
  }

  quiz.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultDiv.classList.remove("hidden");
  resultDiv.innerHTML = `<h2>${title}</h2><p>${message}</p>`;
}
