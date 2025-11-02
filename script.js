/* ======================================
   Teste de Crenças 4.4 — Espelhos da Alma
   ====================================== */

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

// ============================
// ARQUÉTIPOS E PERGUNTAS
// ============================
const archetypes = {
  "O Pacificador": [
    "Evito conflitos mesmo quando algo me incomoda.",
    "Prefiro ceder do que causar desconforto.",
    "Guardo o que sinto para manter a paz."
  ],
  "O Salvador": [
    "Sinto que é meu dever ajudar todos ao redor.",
    "Me culpo quando não consigo resolver os problemas dos outros.",
    "Às vezes me esqueço de mim tentando cuidar dos outros."
  ],
  "O Autoanulador": [
    "Tenho dificuldade em dizer 'não'.",
    "Coloco as necessidades dos outros acima das minhas.",
    "Sinto culpa ao priorizar meu próprio bem-estar."
  ],
  "A Ferida da Bruxa": [
    "Sinto medo de ser julgada ou punida por me expressar.",
    "Já escondi minha força ou sabedoria para não incomodar.",
    "Sinto que, se eu for verdadeira, posso ser rejeitada."
  ],
  "A Ferida do Amor Condicional": [
    "Sinto que preciso merecer o amor das pessoas.",
    "Quando erro, temo deixar de ser amado(a).",
    "Faço de tudo para não decepcionar quem amo."
  ],
  "A Carência de Valor": [
    "Duvido do meu próprio merecimento.",
    "Comparo-me constantemente com os outros.",
    "Sinto que nunca sou bom o bastante."
  ],
  "A Vulnerabilidade Negada": [
    "Tenho dificuldade em pedir ajuda.",
    "Evito mostrar fraqueza ou emoção.",
    "Acredito que ser forte é não demonstrar dor."
  ],
  "A Independência Punida": [
    "Sinto culpa quando escolho por mim mesmo(a).",
    "Temo ser vista como egoísta por ser independente.",
    "Acredito que se eu for autônomo(a), serei rejeitado(a)."
  ],
  "O Mártir": [
    "Tenho dificuldade de aceitar prazer sem culpa.",
    "Acredito que o sofrimento me torna melhor.",
    "Sinto que preciso pagar um preço por cada conquista."
  ],
  "O Camaleão": [
    "Adapto meu jeito para agradar quem está comigo.",
    "Evito mostrar minhas opiniões verdadeiras.",
    "Às vezes nem sei quem sou sem o olhar dos outros."
  ],
  "O Guardião da Ordem": [
    "Fico ansioso(a) quando as coisas fogem do planejado.",
    "Tenho dificuldade em lidar com o improviso.",
    "Busco controlar o ambiente para evitar surpresas."
  ],
  "O Herdeiro da Dor": [
    "Repito padrões familiares mesmo sem querer.",
    "Sinto que não posso ser mais feliz que meus pais.",
    "Carrego dores que não sei explicar."
  ],
  "O Guerreiro Ferido": [
    "Estou sempre em modo 'batalha', mesmo sem motivo.",
    "A paz me deixa desconfortável.",
    "Sinto que, se relaxar, algo ruim vai acontecer."
  ],
  "O Observador Distante": [
    "Analiso muito o que sinto, mas raramente me deixo sentir.",
    "Prefiro entender do que me vulnerabilizar.",
    "Às vezes me sinto um espectador da minha vida."
  ],
  "O Guardião do Limiar": [
    "Mesmo insatisfeito(a), tenho medo de mudar.",
    "Adio decisões esperando o 'momento certo'.",
    "Saboto-me para não sair da zona de conforto."
  ],
  "O Julgador Interno": [
    "Sou muito crítico comigo mesmo.",
    "Me comparo com os outros com frequência.",
    "Tenho dificuldade em reconhecer minhas conquistas."
  ],
  "O Sonhador Estagnado": [
    "Tenho muitas ideias, mas não as executo.",
    "Falo sobre mudanças, mas raramente ajo.",
    "Temo fracassar e confirmar minhas dúvidas."
  ],
  "O Guardião da Harmonia": [
    "Evito discutir para manter a paz.",
    "Fico desconfortável com emoções intensas.",
    "Prefiro engolir a raiva do que magoar alguém."
  ],
  "O Carregador de Culpa": [
    "Sinto-me responsável por tudo que dá errado.",
    "Tenho dificuldade em me perdoar.",
    "Assumo culpas que não são minhas."
  ],
  "O Silenciador da Alegria": [
    "Tenho medo de mostrar felicidade e gerar inveja.",
    "Disfarço minha alegria para não parecer arrogante.",
    "Sinto que não posso ser 'muito feliz'."
  ],
  "O Medo de Confronto": [
    "Evito expressar opiniões para não gerar atrito.",
    "Prefiro ficar em silêncio mesmo quando discordo.",
    "Sinto medo de que um conflito destrua o vínculo."
  ],
  "O Invisível": [
    "Sinto que passo despercebido(a) nas relações.",
    "Tenho medo de ocupar espaço demais.",
    "Às vezes prefiro ser ignorado do que rejeitado."
  ],
  "O Controlador Disfarçado": [
    "Tenho dificuldade em delegar.",
    "Sinto necessidade de garantir que tudo saia certo.",
    "Confio mais em mim do que nos outros."
  ],
  "O Refém do Passado": [
    "Revivo constantemente lembranças dolorosas.",
    "Tenho dificuldade em perdoar o que já passou.",
    "Sinto que minha história me define."
  ]
};

// ============================
// LÓGICA DO QUIZ
// ============================
let currentQuestionIndex = 0;
let scores = {};
const archetypeKeys = Object.keys(archetypes);
let selectedAnswers = [];

function renderQuestion() {
  quizContainer.innerHTML = "";

  if (currentQuestionIndex >= archetypeKeys.length * 3) {
    showResults();
    return;
  }

  const archetypeIndex = Math.floor(currentQuestionIndex / 3);
  const questionIndex = currentQuestionIndex % 3;
  const archetype = archetypeKeys[archetypeIndex];
  const question = archetypes[archetype][questionIndex];

  const questionEl = document.createElement("div");
  questionEl.className = "fade-in";
  questionEl.innerHTML = `
    <h3 class="question">${question}</h3>
    <div class="options">
      <div class="option" data-value="1">Discordo totalmente</div>
      <div class="option" data-value="2">Discordo</div>
      <div class="option" data-value="3">Neutro</div>
      <div class="option" data-value="4">Concordo</div>
      <div class="option" data-value="5">Concordo totalmente</div>
    </div>
    <button class="btn" id="next-btn">Próxima</button>
  `;

  quizContainer.appendChild(questionEl);

  const options = questionEl.querySelectorAll(".option");
  let selectedValue = null;

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      selectedValue = parseInt(opt.dataset.value);
    });
  });

  const nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", () => {
    if (!selectedValue) {
      alert("Escolha uma opção antes de continuar.");
      return;
    }

    const archetype = archetypeKeys[archetypeIndex];
    if (!scores[archetype]) scores[archetype] = 0;
    scores[archetype] += selectedValue;

    currentQuestionIndex++;
    renderQuestion();
  });
}

function showResults() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const labels = Object.keys(scores);
  const data = Object.values(scores);

  // Normaliza
  const maxScore = Math.max(...data);
  const topArchetype = labels[data.indexOf(maxScore)];

  // Exibe gráfico
  const ctx = document.getElementById("resultChart").getContext("2d");
  new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: [
        {
          label: "Força das Crenças",
          data,
          fill: true,
          borderColor: "#b59ed9",
          backgroundColor: "rgba(181,158,217,0.3)",
          pointBackgroundColor: "#d4a657"
        }
      ]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: Math.ceil(Math.max(...data)),
          ticks: { display: false },
          grid: { color: "rgba(0,0,0,0.1)" },
          angleLines: { color: "rgba(0,0,0,0.1)" }
        }
      },
      plugins: { legend: { display: false } }
    }
  });

  // Mensagem final simbólica
  resultText.innerHTML = `
    <h3>Seu arquétipo predominante: <strong>${topArchetype}</strong></h3>
    <p>Essa força-ferida tem guiado parte do seu caminho. Reconhecê-la não é uma sentença — é um convite à consciência.</p>
    <p><em>Quando olhamos o espelho interno com coragem, o reflexo deixa de ser prisão e se torna portal.</em></p>
  `;
}

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  scores = {};
  quizContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  renderQuestion();
});

// Iniciar quiz
renderQuestion();
