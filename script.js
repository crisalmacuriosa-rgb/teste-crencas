const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultContainer = document.getElementById("result");
const resultText = document.getElementById("resultText");

const questions = [
  {
    area: "Dinheiro",
    text: "Quando penso em prosperar financeiramente, sinto culpa ou medo?",
  },
  {
    area: "Amor",
    text: "Tenho dificuldade em confiar que sou digno(a) de amor?",
  },
  {
    area: "Autoestima",
    text: "Costumo me comparar com os outros e me sentir inferior?",
  },
  {
    area: "Identidade",
    text: "Sinto que preciso agradar para ser aceito(a)?",
  },
  {
    area: "Propósito",
    text: "Sinto que minha vida não tem uma direção clara?",
  },
  {
    area: "Espiritualidade",
    text: "Sinto-me desconectado(a) de algo maior ou sem fé?",
  },
  {
    area: "Corpo",
    text: "Tenho dificuldade em aceitar ou cuidar do meu corpo?",
  },
  {
    area: "Sucesso",
    text: "Temo que o sucesso traga rejeição ou solidão?",
  },
  {
    area: "Equilíbrio",
    text: "Sinto que estou sempre em desequilíbrio entre trabalho e descanso?",
  }
];

function buildQuiz() {
  quizContainer.innerHTML = questions.map((q, index) => `
    <div class="question">
      <h3>${index + 1}. ${q.text}</h3>
      <div class="options">
        <label><input type="radio" name="q${index}" value="1"> Nunca</label>
        <label><input type="radio" name="q${index}" value="2"> Raramente</label>
        <label><input type="radio" name="q${index}" value="3"> Às vezes</label>
        <label><input type="radio" name="q${index}" value="4"> Frequentemente</label>
        <label><input type="radio" name="q${index}" value="5"> Sempre</label>
      </div>
    </div>
  `).join("");
}

function calculateResults() {
  const scores = {};
  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name=q${i}]:checked`);
    if (selected) {
      if (!scores[q.area]) scores[q.area] = 0;
      scores[q.area] += parseInt(selected.value);
    }
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const percentages = {};
  for (const area in scores) {
    percentages[area] = Math.round((scores[area] / total) * 100);
  }

  showResults(percentages);
}

function showResults(percentages) {
  quizContainer.classList.add("hidden");
  submitButton.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  // Gráfico
  const ctx = document.getElementById("chart").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(percentages),
      datasets: [{
        data: Object.values(percentages),
        backgroundColor: [
          "#93c5fd", "#fda4af", "#fde68a", "#a7f3d0",
          "#c7d2fe", "#f9a8d4", "#fdba74", "#86efac", "#fcd34d"
        ],
      }],
    },
  });

  // Texto reflexivo
  let maior = Object.entries(percentages).sort((a, b) => b[1] - a[1])[0];
  const reflexoes = {
    "Dinheiro": "Pode haver crenças ligadas à escassez, merecimento ou medo de perder.",
    "Amor": "Talvez existam padrões relacionados a rejeição ou autossabotagem nos relacionamentos.",
    "Autoestima": "Você pode estar sendo chamado(a) a reconhecer seu valor genuíno.",
    "Identidade": "Questões sobre quem você é e o quanto se expressa livremente podem estar ativas.",
    "Propósito": "Pode haver um chamado para se alinhar mais com o que dá sentido à sua vida.",
    "Espiritualidade": "Um convite para reconectar-se com sua fé, sentido ou espiritualidade pessoal.",
    "Corpo": "Talvez seu corpo esteja pedindo mais cuidado, presença e aceitação.",
    "Sucesso": "Há possivelmente crenças sobre merecimento ou medo da exposição.",
    "Equilíbrio": "Pode haver necessidade de restaurar ritmos e cuidar melhor do seu tempo interno."
  };

  resultText.innerHTML = `
    <h3>🌿 Seu mapa de crenças:</h3>
    ${Object.entries(percentages)
      .map(([area, perc]) => `<p><strong>${area}:</strong> ${perc}%</p>`)
      .join("")}
    <p><em>${reflexoes[maior[0]]}</em></p>
    <p>🌙 Respire, observe e anote o que mais te tocou nas respostas.
       O autoconhecimento começa quando paramos para escutar o que já está em nós.</p>
  `;
}

buildQuiz();
submitButton.addEventListener("click", calculateResults);
