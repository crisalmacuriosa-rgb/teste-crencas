const questions = [
  {
    area: "Autoestima e Merecimento",
    question: "Com que frequência você sente que precisa provar seu valor aos outros?",
  },
  {
    area: "Amor e Relacionamentos",
    question: "Você teme que, se for totalmente autêntico, possa ser rejeitado?",
  },
  {
    area: "Prosperidade e Dinheiro",
    question: "Você se sente culpado quando ganha mais do que outras pessoas?",
  },
  {
    area: "Propósito e Realização",
    question: "Você sente que está vivendo aquém do seu verdadeiro potencial?",
  },
  {
    area: "Espiritualidade e Conexão",
    question: "Você acredita que precisa 'merecer' a ajuda do universo?",
  },
  {
    area: "Corpo e Saúde",
    question: "Você sente culpa ao descansar ou cuidar de si mesmo?",
  },
  {
    area: "Culpa e Perdão",
    question: "Você se cobra por erros antigos mesmo já tendo aprendido com eles?",
  },
  {
    area: "Medo e Controle",
    question: "Você tem dificuldade em confiar no fluxo da vida?",
  },
  {
    area: "Rejeição e Pertencimento",
    question: "Você sente que precisa se adaptar para ser aceito?",
  },
  {
    area: "Sucesso e Visibilidade",
    question: "Você teme ser julgado se brilhar demais?",
  },
];

let currentIndex = 0;
let answers = {};

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");

function renderQuestion(index) {
  const q = questions[index];
  quizContainer.innerHTML = `
    <div class="question">${q.question}</div>
    <div class="options">
      ${["Nunca", "Raramente", "Às vezes", "Frequentemente", "Sempre"]
        .map(
          (opt, i) => `
        <div class="option" data-value="${i + 1}">
          ${opt}
        </div>`
        )
        .join("")}
    </div>
  `;

  document.querySelectorAll(".option").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".option").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      answers[q.area] = parseInt(opt.dataset.value);
      nextBtn.classList.remove("hidden");
    });
  });
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion(currentIndex);
    nextBtn.classList.add("hidden");
  } else {
    showResult();
  }
});

function showResult() {
  quizContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");

  const areas = Object.keys(answers);
  const values = Object.values(answers);

  const ctx = document.createElement("canvas");
  resultDiv.appendChild(ctx);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: areas,
      datasets: [
        {
          data: values,
          backgroundColor: [
            "#4a90e2", "#f39c12", "#2ecc71", "#9b59b6", "#e74c3c", "#1abc9c", "#34495e", "#f1c40f", "#8e44ad", "#e67e22",
          ],
        },
      ],
    },
    options: { responsive: true },
  });

  const dominantAreas = areas
    .map((area, i) => ({ area, value: values[i] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 2);

  const reflections = {
    "Autoestima e Merecimento": "Você pode estar se cobrando demais para se sentir suficiente. Lembre-se: o valor não precisa ser provado.",
    "Amor e Relacionamentos": "Pode haver medo de se abrir totalmente. A vulnerabilidade é a ponte para conexões verdadeiras.",
    "Prosperidade e Dinheiro": "Observe se existe crença de escassez. Prosperar é também permitir-se receber.",
    "Propósito e Realização": "Você sente um chamado para expressar mais de quem é. Ouça o impulso criativo que vem do coração.",
    "Espiritualidade e Conexão": "A espiritualidade não é recompensa, é comunhão. Você já é parte da teia divina.",
    "Corpo e Saúde": "O corpo é o templo da alma. Cuide dele com gentileza, não com exigência.",
    "Culpa e Perdão": "Perdoar-se é libertar-se. Nenhum erro define quem você é.",
    "Medo e Controle": "O controle nasce do medo. Confie: a vida tem sua própria sabedoria.",
    "Rejeição e Pertencimento": "Você pertence por ser quem é. Não há necessidade de ajustar-se para caber.",
    "Sucesso e Visibilidade": "Brilhar não é ego, é serviço. O mundo precisa da sua luz.",
  };

  const practices = {
    "Autoestima e Merecimento": "Prática: olhe-se no espelho e diga em voz alta três qualidades suas, sentindo-as no corpo.",
    "Amor e Relacionamentos": "Prática: escreva uma carta para você mesmo, expressando amor e aceitação incondicional.",
    "Prosperidade e Dinheiro": "Prática: anote 5 formas pelas quais a abundância já se manifesta na sua vida.",
    "Propósito e Realização": "Prática: reserve 10 minutos para fazer algo que te conecte ao prazer de ser quem é.",
    "Espiritualidade e Conexão": "Prática: respire profundamente por 2 minutos e sinta-se parte de algo maior.",
    "Corpo e Saúde": "Prática: permita-se um momento de descanso sem culpa — apenas por merecer existir.",
    "Culpa e Perdão": "Prática: escreva uma frase começando com ‘Eu me libero da necessidade de...’ e repita-a 3 vezes.",
    "Medo e Controle": "Prática: identifique algo pequeno que possa soltar hoje, apenas confiando no resultado.",
    "Rejeição e Pertencimento": "Prática: lembre-se de um momento em que foi aceito exatamente como é. Reviva essa sensação.",
    "Sucesso e Visibilidade": "Prática: compartilhe uma pequena conquista recente com alguém, sem se desculpar por ela.",
  };

  const reflectionText = dominantAreas
    .map(
      (a) => `
      <h3>${a.area}</h3>
      <p>${reflections[a.area]}</p>
      <p><em>${practices[a.area]}</em></p>
    `
    )
    .join("");

  resultDiv.innerHTML = `
    <h2>🌈 Seu Mapa de Crenças</h2>
    <p>Estas áreas mostraram maior intensidade. Veja o que podem estar te revelando:</p>
    ${reflectionText}
  `;
  resultDiv.appendChild(ctx);
  resultDiv.classList.remove("hidden");
}

renderQuestion(currentIndex);
