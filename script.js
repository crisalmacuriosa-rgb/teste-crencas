const questions = [
  {
    text: "Evito conflito, mesmo quando algo me incomoda profundamente.",
    archetype: "O Pacificador",
  },
  {
    text: "Sinto que preciso ajudar todos, mesmo que isso me esgote.",
    archetype: "O Salvador",
  },
  {
    text: "Tenho medo de mostrar minha força e ser julgada ou atacada.",
    archetype: "Ferida da Bruxa",
  },
  {
    text: "Sinto que, se eu não controlar tudo, as coisas darão errado.",
    archetype: "Fardo do Controle",
  },
  {
    text: "Associo ser desejada com ser valorizada.",
    archetype: "Ferida do Amor Condicional",
  },
  {
    text: "Acredito que não tenho nada de especial a oferecer.",
    archetype: "Carência de Valor",
  },
  {
    text: "Acho perigoso me mostrar vulnerável.",
    archetype: "Vulnerabilidade Negada",
  },
  {
    text: "Se eu for muito independente, temo ser rejeitada ou explorada.",
    archetype: "Independência Punida",
  },
];

let currentQuestion = 0;
let scores = {};
questions.forEach((q) => (scores[q.archetype] = 0));

const quizEl = document.getElementById("quiz");
const nextButton = document.getElementById("nextButton");
const resultEl = document.getElementById("result");
const resultText = document.getElementById("resultText");
const ctx = document.getElementById("resultChart");

function showQuestion() {
  const q = questions[currentQuestion];
  quizEl.innerHTML = `
    <div class="question">${q.text}</div>
    <div class="options">
      ${["Nunca", "Às vezes", "Frequentemente", "Sempre"]
        .map(
          (opt, i) => `
          <div class="option" data-score="${i}" onclick="selectOption(this)">
            ${opt}
          </div>`
        )
        .join("")}
    </div>
  `;
}

let selected = null;
window.selectOption = (el) => {
  document.querySelectorAll(".option").forEach((opt) => opt.classList.remove("selected"));
  el.classList.add("selected");
  selected = el.getAttribute("data-score");
};

nextButton.addEventListener("click", () => {
  if (selected === null) return alert("Escolha uma opção para continuar.");
  const archetype = questions[currentQuestion].archetype;
  scores[archetype] += parseInt(selected);

  selected = null;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizEl.classList.add("hidden");
  nextButton.classList.add("hidden");
  resultEl.classList.remove("hidden");

  const labels = Object.keys(scores);
  const data = Object.values(scores);
  const maxIndex = data.indexOf(Math.max(...data));
  const dominant = labels[maxIndex];

  new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "Intensidade das Crenças",
          data,
          borderColor: "#5d3fd3",
          backgroundColor: "rgba(93,63,211,0.3)",
        },
      ],
    },
    options: {
      scales: { r: { beginAtZero: true, max: 9, ticks: { stepSize: 3 } } },
    },
  });

  const reflections = {
    "O Pacificador": "Você tende a evitar conflitos, sacrificando sua voz. O convite é honrar sua verdade, mesmo que ela desagrade.",
    "O Salvador": "Sua compaixão é profunda, mas pode se tornar fardo. Amar também é permitir que o outro caminhe por si.",
    "Ferida da Bruxa": "Sua força incomoda quem não a reconhece em si. Expresse-a com amor — é dom, não ameaça.",
    "Fardo do Controle": "O peso que carrega não é todo seu. Soltar não é perder — é confiar no fluxo da vida.",
    "Ferida do Amor Condicional": "Você não precisa ser desejada para ser amada. O amor real nasce quando você se vê inteira.",
    "Carência de Valor": "Você é mais do que o que oferece. O simples fato de existir já tem valor.",
    "Vulnerabilidade Negada": "A couraça te protege, mas também te isola. Mostrar-se é permitir o encontro.",
    "Independência Punida": "Ser autêntica não te faz indesejável. É na liberdade que o amor se torna escolha, não necessidade.",
  };

  resultText.innerHTML = `
    <strong>${dominant}</strong> é o arquétipo/ferida mais ativado(a) neste momento.<br><br>
    ${reflections[dominant]}
  `;
}

showQuestion();
