const startBtn = document.getElementById("start-btn");
const intro = document.getElementById("intro");
const testSection = document.getElementById("test-section");
const resultSection = document.getElementById("result-section");
const questionTitle = document.getElementById("question-title");
const optionsDiv = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const reflectionText = document.getElementById("reflection-text");

let currentQuestion = 0;
let scores = {
  "Autoestima": 0,
  "Amor": 0,
  "Dinheiro": 0,
  "Identidade": 0,
  "Propósito": 0,
  "Espiritualidade": 0,
  "Dependência Emocional": 0
};

// 🪞 PERGUNTAS (mais simbólicas e abrangentes)
const questions = [
  {
    text: "Você evita expressar o que sente para não gerar conflito?",
    category: "Dependência Emocional"
  },
  {
    text: "Você sente que precisa merecer amor através do que faz?",
    category: "Amor"
  },
  {
    text: "Costuma se cobrar por não ser bom o suficiente?",
    category: "Autoestima"
  },
  {
    text: "Sente culpa quando se coloca em primeiro lugar?",
    category: "Autoestima"
  },
  {
    text: "Sente que seu valor depende do quanto é útil para os outros?",
    category: "Identidade"
  },
  {
    text: "Tem medo de ser julgado se mostrar quem realmente é?",
    category: "Identidade"
  },
  {
    text: "Acredita que dinheiro é difícil de manter ou não é para você?",
    category: "Dinheiro"
  },
  {
    text: "Sente que não pode relaxar até ter tudo sob controle?",
    category: "Propósito"
  },
  {
    text: "Percebe-se ajudando os outros a ponto de se anular?",
    category: "Dependência Emocional"
  },
  {
    text: "Costuma sentir-se desconectado de algo maior?",
    category: "Espiritualidade"
  }
];

const options = [
  { text: "Nunca", value: 0 },
  { text: "Às vezes", value: 1 },
  { text: "Frequentemente", value: 2 },
  { text: "Sempre", value: 3 }
];

startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  testSection.classList.remove("hidden");
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  questionTitle.textContent = q.text;
  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => {
      document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      scores[q.category] += opt.value;
    });
    optionsDiv.appendChild(btn);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  testSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const labels = Object.keys(scores);
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const percentages = labels.map(label => Math.round((scores[label] / total) * 100) || 0);

  new Chart(document.getElementById("beliefChart"), {
    type: "pie",
    data: {
      labels: labels,
      datasets: [{
        data: percentages,
        backgroundColor: ["#a87dc2", "#caa5de", "#e3c4ed", "#bfa3e0", "#d1b6e3", "#dfc7ea", "#f1def7"]
      }]
    }
  });

  const max = labels[percentages.indexOf(Math.max(...percentages))];
  reflectionText.innerHTML = `
    <h3>🌙 Sua energia mais ativa: ${max}</h3>
    <p>Essa área pede escuta e acolhimento. Observe onde você se sente mais reativo ou carente — 
    pode ser um espelho da ferida que deseja cura.</p>
  `;
}

restartBtn.addEventListener("click", () => {
  location.reload();
});
