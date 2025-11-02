// === TESTE DE CRENÇAS PROFUNDO ===
// Áreas: dinheiro, amor, autoestima, identidade, propósito, espiritualidade, corpo, sucesso

const quizData = [
  // DINHEIRO
  {
    question: "Quando pensa em dinheiro, o que sente mais forte?",
    options: [
      { text: "Medo de faltar", type: "dinheiro" },
      { text: "Gratidão e fluidez", type: "equilibrio" },
      { text: "Vergonha de ter ou querer", type: "autoestima" },
    ],
  },
  {
    question: "Quando alguém prospera, o que vem à mente?",
    options: [
      { text: "Sortudo, teve oportunidades", type: "dinheiro" },
      { text: "Que bom, é inspiração pra mim", type: "equilibrio" },
      { text: "Nunca seria possível pra mim", type: "autoestima" },
    ],
  },

  // AMOR
  {
    question: "Sobre o amor, o que mais te descreve?",
    options: [
      { text: "Preciso me adaptar para ser amado(a)", type: "amor" },
      { text: "Posso ser amado(a) sendo quem sou", type: "equilibrio" },
      { text: "Amar é sofrer, sempre foi assim", type: "amor" },
    ],
  },
  {
    question: "Quando pensa em se relacionar, o que sente?",
    options: [
      { text: "Ansiedade ou medo de rejeição", type: "autoestima" },
      { text: "Calma e desejo de compartilhar", type: "equilibrio" },
      { text: "Incerteza sobre quem sou de verdade", type: "identidade" },
    ],
  },

  // AUTOESTIMA
  {
    question: "O que mais define sua relação com você mesmo(a)?",
    options: [
      { text: "Sou muito exigente comigo", type: "autoestima" },
      { text: "Aceito minhas imperfeições", type: "equilibrio" },
      { text: "Me comparo com os outros frequentemente", type: "autoestima" },
    ],
  },
  {
    question: "Como reage ao receber elogios?",
    options: [
      { text: "Fico desconfortável, não sei lidar", type: "autoestima" },
      { text: "Agradeço de coração, sinto merecimento", type: "equilibrio" },
      { text: "Duvido, acho exagero", type: "autoestima" },
    ],
  },

  // IDENTIDADE
  {
    question: "O que mais te desafia em se expressar?",
    options: [
      { text: "Medo de não ser compreendido(a)", type: "identidade" },
      { text: "Vergonha de ser diferente", type: "autoestima" },
      { text: "Nada, me sinto livre para ser", type: "equilibrio" },
    ],
  },
  {
    question: "Quando erra, o que pensa?",
    options: [
      { text: "Falhei, não sou bom o bastante", type: "autoestima" },
      { text: "Tudo é aprendizado", type: "equilibrio" },
      { text: "Quem sou eu sem acertos?", type: "identidade" },
    ],
  },

  // PROPÓSITO
  {
    question: "Quando pensa em propósito, o que sente?",
    options: [
      { text: "Ainda não sei qual é o meu", type: "identidade" },
      { text: "Sei o que me move e sigo com leveza", type: "equilibrio" },
      { text: "Sinto que minha vida não tem direção", type: "proposito" },
    ],
  },
  {
    question: "O que te motiva a seguir em frente?",
    options: [
      { text: "Dever e obrigação", type: "proposito" },
      { text: "Desejo de crescer e servir", type: "espiritualidade" },
      { text: "Alegria de viver o presente", type: "equilibrio" },
    ],
  },

  // ESPIRITUALIDADE
  {
    question: "Qual frase mais ecoa em você?",
    options: [
      { text: "Sinto-me desconectado de algo maior", type: "espiritualidade" },
      { text: "Tudo está interligado, há um sentido", type: "equilibrio" },
      { text: "A vida é um acaso, sem plano", type: "identidade" },
    ],
  },
  {
    question: "Quando pensa no divino, o que sente?",
    options: [
      { text: "Distância, culpa ou medo", type: "espiritualidade" },
      { text: "Proximidade, amor e unidade", type: "equilibrio" },
      { text: "Dúvida constante", type: "identidade" },
    ],
  },

  // CORPO
  {
    question: "Como você percebe seu corpo?",
    options: [
      { text: "Como algo a ser melhorado", type: "corpo" },
      { text: "Como meu lar e companheiro", type: "equilibrio" },
      { text: "Como algo que me limita", type: "autoestima" },
    ],
  },
  {
    question: "Como lida com o descanso?",
    options: [
      { text: "Culpa por parar", type: "corpo" },
      { text: "Reconheço a importância do repouso", type: "equilibrio" },
      { text: "Sinto-me improdutivo ao descansar", type: "autoestima" },
    ],
  },

  // SUCESSO
  {
    question: "O que é sucesso pra você?",
    options: [
      { text: "Reconhecimento e estabilidade", type: "sucesso" },
      { text: "Expressar meu potencial com propósito", type: "equilibrio" },
      { text: "Nunca é suficiente, sempre falta algo", type: "autoestima" },
    ],
  },
  {
    question: "Quando algo dá errado, o que pensa?",
    options: [
      { text: "Eu estraguei tudo", type: "autoestima" },
      { text: "Tudo tem um motivo e aprendizado", type: "equilibrio" },
      { text: "Talvez sucesso não seja pra mim", type: "sucesso" },
    ],
  },
];

// === VARIÁVEIS DE CONTROLE ===
let currentQuestion = 0;
let answers = [];

const quiz = document.getElementById("quiz");
const nextBtn = document.getElementById("nextBtn");
const resultDiv = document.getElementById("result");

// === FUNÇÕES ===
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

  const total = answers.length;

  // === CÁLCULO DE PERCENTUAIS ===
  const areas = [
    "dinheiro",
    "amor",
    "autoestima",
    "identidade",
    "proposito",
    "espiritualidade",
    "corpo",
    "sucesso",
    "equilibrio",
  ];

  let report = "<h3>🌿 Seu mapa de crenças:</h3><ul>";
  areas.forEach((a) => {
    const percent = ((counts[a] || 0) / total * 100).toFixed(0);
    report += `<li>${a.charAt(0).toUpperCase() + a.slice(1)}: ${percent}%</li>`;
  });
  report += "</ul>";

  // === RESULTADO REFLEXIVO ===
  quiz.classList.add("hidden");
  nextBtn.classList.add("hidden");
  resultDiv.classList.remove("hidden");

  resultDiv.innerHTML = `
    <h2>✨ Espelho de Consciência</h2>
    <p>Esses percentuais não são respostas, mas reflexos.  
    Observe as áreas com maior e menor presença.  
    Onde há intensidade, pode haver crenças mais ativas — e também o chamado à cura.</p>
    <div class="report">${report}</div>
    <p style="margin-top:20px; font-style:italic;">
      🌙 Respire, observe e anote o que mais te tocou nas respostas.  
      O autoconhecimento começa quando paramos para escutar o que já está em nós.
    </p>
  `;
}

// === NAVEGAÇÃO ===
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
