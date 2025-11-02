// script.js – Teste de Crenças 4.5: Mapas das Crenças e Arquétipos Internos

// Frase-portal inicial
const introText = "Respire. O que você está prestes a descobrir é um reflexo, não um julgamento. Cada resposta é um espelho que te aproxima de si mesmo.";

// Arquétipos e perguntas
const archetypes = {
  "O Pacificador": [
    "Evito conflitos mesmo quando algo me incomoda.",
    "Tenho dificuldade em dizer 'não' por medo de desagradar.",
    "Costumo ceder para manter a harmonia, mesmo me sentindo injustiçado(a)."
  ],
  "O Salvador": [
    "Sinto que preciso ajudar os outros para ser valorizado(a).",
    "Carrego a dor alheia como se fosse minha.",
    "Sinto culpa quando coloco minhas necessidades em primeiro lugar."
  ],
  "O Controlador": [
    "Sinto ansiedade quando não tenho o controle das situações.",
    "Acredito que, se eu não cuidar de tudo, algo dará errado.",
    "Tenho dificuldade em confiar no ritmo e nas decisões dos outros."
  ],
  "O Ferido pelo Amor Condicional": [
    "Acho que preciso ser perfeito(a) para ser amado(a).",
    "Evito mostrar vulnerabilidade para não ser rejeitado(a).",
    "Sinto que o amor vem apenas quando desempenho bem meus papéis."
  ],
  "O Invisível": [
    "Tenho medo de ocupar espaço e ser criticado(a).",
    "Minhas ideias raramente são ouvidas.",
    "Prefiro me calar a correr o risco de errar."
  ],
  "O Prisioneiro do Vínculo": [
    "Tenho medo de ser deixado(a), então me esforço demais para agradar.",
    "Sinto que não sei quem sou fora de uma relação.",
    "Confundo presença com amor e silêncio com rejeição."
  ],
  "O Autoanulador": [
    "Evito mostrar o que quero para não gerar atrito.",
    "Costumo priorizar o bem-estar alheio acima do meu.",
    "Sinto que expressar raiva é errado ou perigoso."
  ],
  "A Bruxa Ferida": [
    "Sinto que minha força ou sensibilidade assustam as pessoas.",
    "Tenho medo de ser julgada por ser autêntica.",
    "Quando me destaco, sinto que serei atacada ou invejada."
  ],
  "O Independente Punido": [
    "Acredito que, se eu for independente, serei rejeitado(a) ou explorado(a).",
    "Tenho dificuldade em pedir ajuda, mesmo quando preciso.",
    "Sinto que amar é perder liberdade."
  ],
  "O Carente de Valor": [
    "Tenho dificuldade em reconhecer minhas qualidades.",
    "Busco aprovação constante para me sentir seguro(a).",
    "Sinto que nunca sou bom(a) o suficiente."
  ]
};

// Reflexões por arquétipo
const reflections = {
  "O Pacificador": "Você busca harmonia, mas às vezes à custa da própria voz. Aprender a se posicionar é um ato de amor próprio, não de confronto.",
  "O Salvador": "Seu coração é generoso, mas cuidar de si também é um serviço ao mundo. Amor não é dívida, é presença.",
  "O Controlador": "Sua necessidade de controle nasce do medo da perda. Confiar é permitir que a vida te surpreenda de forma gentil.",
  "O Ferido pelo Amor Condicional": "Você aprendeu que amor precisa ser conquistado. A cura começa quando você percebe que já é digno sem precisar provar.",
  "O Invisível": "O silêncio te protegeu por muito tempo, mas o mundo precisa ouvir sua voz. Visibilidade é vulnerabilidade — e também coragem.",
  "O Prisioneiro do Vínculo": "Você confunde amor com sobrevivência emocional. O vínculo saudável nasce quando você aprende a permanecer inteiro, mesmo sozinho.",
  "O Autoanulador": "Negar a si mesmo por amor é uma forma de abandono. Sua autenticidade é o maior presente que pode oferecer.",
  "A Bruxa Ferida": "Sua força e sensibilidade não são perigosas — são dons. Quando você as assume, inspira outros a fazerem o mesmo.",
  "O Independente Punido": "A independência não precisa excluir o afeto. Amar sem perder a si é a verdadeira liberdade.",
  "O Carente de Valor": "A validação que procura fora nasce de um vazio que pede reconhecimento interno. Você já é suficiente, mesmo em silêncio."
};

// Exibição da frase-portal
const intro = document.createElement("p");
intro.textContent = introText;
intro.classList.add("intro-text");
document.body.prepend(intro);

// Função principal
const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const chartContainer = document.getElementById("chart");
let currentQuestion = 0;
let scores = {};
Object.keys(archetypes).forEach(k => scores[k] = 0);

let questions = [];
for (const [type, qs] of Object.entries(archetypes)) {
  qs.forEach(q => questions.push({ type, text: q }));
}
questions = questions.sort(() => Math.random() - 0.5);

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question-card">
      <h2>${q.text}</h2>
      <div class="options">
        ${[1, 2, 3, 4, 5].map(val => `
          <label class="option">
            <input type="radio" name="q${currentQuestion}" value="${val}">
            ${val}
          </label>`).join('')}
      </div>
      <button class="next-btn">Próxima</button>
    </div>
  `;

  document.querySelector(".next-btn").addEventListener("click", () => {
    const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (!selected) {
      alert("Por favor, selecione uma opção antes de continuar.");
      return;
    }
    scores[q.type] += parseInt(selected.value);
    currentQuestion++;
    showQuestion();
  });
}

function showResult() {
  quizContainer.innerHTML = "";
  const labels = Object.keys(scores);
  const data = Object.values(scores);

  const ctx = document.createElement("canvas");
  chartContainer.innerHTML = "";
  chartContainer.appendChild(ctx);

  new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          "#f4a261", "#e76f51", "#2a9d8f", "#264653", "#8ab17d",
          "#b5838d", "#6d6875", "#ffb4a2", "#a8dadc", "#457b9d"
        ]
      }]
    },
    options: {
      plugins: {
        legend: { position: "right" }
      }
    }
  });

  const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const reflection = reflections[dominant];

  resultContainer.innerHTML = `
    <h2>Arquétipo em destaque: ${dominant}</h2>
    <p class="reflection-text">${reflection}</p>
  `;
}

showQuestion();
