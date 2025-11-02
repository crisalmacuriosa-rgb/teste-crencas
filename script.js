/* Teste de Crenças 4.0 — v4
 - Likert 1..5 por pergunta
 - Áreas ampliadas, arquétipos, gráfico em pizza, devolutiva e práticas
*/

// === Perguntas (amplas) ===
// Cada item: { area, archetype, text }
const questions = [
  // Autoestima / Inadequação / Rejeição / Merecimento
  { area: "Autoestima", archetype: "Inadequação", text: "Costumo criticar fortemente minhas falhas." },
  { area: "Autoestima", archetype: "Rejeição", text: "Sinto que preciso agradar para ser aceito(a)." },
  { area: "Autoestima", archetype: "Merecimento", text: "Tenho dificuldade em acreditar que mereço coisas boas." },

  // Relacionamentos / Rejeição / Vulnerabilidade / Controle
  { area: "Relacionamentos", archetype: "Rejeição", text: "Tenho medo de ser rejeitado(a) se for autêntico(a)." },
  { area: "Relacionamentos", archetype: "Vulnerabilidade", text: "Evito mostrar fraqueza para pessoas importantes." },
  { area: "Relacionamentos", archetype: "Controle", text: "Sinto necessidade de controlar relações para me proteger." },

  // Prosperidade / Dinheiro / Culpa / Merecimento
  { area: "Prosperidade", archetype: "Culpa", text: "Sinto culpa ao pensar em querer prosperar financeiramente." },
  { area: "Prosperidade", archetype: "Escassez", text: "Penso que nunca há o suficiente para mim." },
  { area: "Prosperidade", archetype: "Merecimento", text: "Tenho dificuldade em aceitar que posso solicitar mais recursos." },

  // Propósito / Desconexão / Invisibilidade
  { area: "Propósito", archetype: "Desconexão", text: "Às vezes sinto que minha vida não tem um sentido claro." },
  { area: "Propósito", archetype: "Invisibilidade", text: "Acho que minhas escolhas quase não importam para os outros." },

  // Espiritualidade / Sacrifício / Merecimento
  { area: "Espiritualidade", archetype: "Sacrifício", text: "Acho que sofrer é parte necessária do meu crescimento espiritual." },
  { area: "Espiritualidade", archetype: "Merecimento", text: "Sinto-me desconectado(a) de algo maior que me acolhe." },

  // Corpo / Culpa / Autoimagem
  { area: "Corpo", archetype: "Culpa", text: "Tenho culpa quando tiro tempo para cuidar do meu corpo." },
  { area: "Corpo", archetype: "Autoimagem", text: "Me culpo ou critico muito meu corpo." },

  // Sucesso / Medo / Visibilidade
  { area: "Sucesso", archetype: "Medo", text: "Tenho medo de que o sucesso mude quem eu sou." },
  { area: "Sucesso", archetype: "Visibilidade", text: "Evito me expor por medo do julgamento." },

  // Controle / Confiança / Medo
  { area: "Controle", archetype: "Controle", text: "Sinto necessidade de controlar para me sentir seguro(a)." },
  { area: "Confiança", archetype: "Confiança", text: "Tenho dificuldade em confiar nas minhas decisões." },

  // Rejeição / Solidão
  { area: "Rejeição", archetype: "Rejeição", text: "Quando fico sozinho(a), concluo que fui esquecido(a)." },

  // Medo profundo / Medo
  { area: "Medo", archetype: "Medo", text: "Frequentemente sinto uma apreensão difícil de nomear." },

  // Complementares - profundidade
  { area: "Autoestima", archetype: "Inadequação", text: "Comparo minha trajetória com outras pessoas e me sinto menor." },
  { area: "Prosperidade", archetype: "Escassez", text: "Acredito que oportunidades são para poucos." },
  { area: "Relacionamentos", archetype: "Vulnerabilidade", text: "Prefiro evitar falar sobre meus sonhos por medo de julgamento." },
  { area: "Propósito", archetype: "Desconexão", text: "Tenho dificuldade de perceber minhas contribuições no dia a dia." },
  { area: "Corpo", archetype: "Autoimagem", text: "Minha imagem corporal interfere em como me apresento ao mundo." }
];

// --- UI references
const quizDiv = document.getElementById("quiz");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const resultSection = document.getElementById("result");
const percentList = document.getElementById("percentList");
const topArchetypesDiv = document.getElementById("topArchetypes");
const reflectionDiv = document.getElementById("reflection");
const practicesDiv = document.getElementById("practices");
const restartBtn = document.getElementById("restartBtn");

let currentIndex = 0;
let responses = new Array(questions.length).fill(null);

// --- Helper: render one question
function renderQuestion(index) {
  const q = questions[index];
  quizDiv.innerHTML = `
    <div class="question-card">
      <p><strong>${index + 1}. ${q.text}</strong> <em style="color:#666">(${q.area})</em></p>
      <div class="options">
        <label class="option"><input type="radio" name="q${index}" value="1"> 1 — Discordo totalmente</label>
        <label class="option"><input type="radio" name="q${index}" value="2"> 2 — Discordo parcialmente</label>
        <label class="option"><input type="radio" name="q${index}" value="3"> 3 — Neutro</label>
        <label class="option"><input type="radio" name="q${index}" value="4"> 4 — Concordo parcialmente</label>
        <label class="option"><input type="radio" name="q${index}" value="5"> 5 — Concordo totalmente</label>
      </div>
    </div>
  `;

  // restore previous selection if exists
  if (responses[index]) {
    const selector = document.querySelector(`input[name="q${index}"][value="${responses[index]}"]`);
    if (selector) selector.checked = true;
  }

  // show/hide controls
  prevBtn.classList.toggle("hidden", index === 0);
  nextBtn.classList.toggle("hidden", index >= questions.length - 1);
  submitBtn.classList.toggle("hidden", index < questions.length - 1);
}

// --- Navigation
nextBtn.addEventListener("click", () => {
  const sel = document.querySelector(`input[name="q${currentIndex}"]:checked`);
  if (!sel) { alert("Por favor, escolha uma opção antes de avançar."); return; }
  responses[currentIndex] = parseInt(sel.value);
  currentIndex++;
  renderQuestion(currentIndex);
});

prevBtn.addEventListener("click", () => {
  // save if selected
  const sel = document.querySelector(`input[name="q${currentIndex}"]:checked`);
  if (sel) responses[currentIndex] = parseInt(sel.value);
  if (currentIndex > 0) currentIndex--;
  renderQuestion(currentIndex);
});

submitBtn.addEventListener("click", () => {
  const sel = document.querySelector(`input[name="q${currentIndex}"]:checked`);
  if (!sel) { alert("Por favor, escolha uma opção antes de ver o resultado."); return; }
  responses[currentIndex] = parseInt(sel.value);
  computeResults();
});

// restart
restartBtn.addEventListener("click", () => {
  // reset
  currentIndex = 0;
  responses = new Array(questions.length).fill(null);
  resultSection.classList.add("hidden");
  quizDiv.classList.remove("hidden");
  renderQuestion(currentIndex);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// --- Compute and show results
function computeResults() {
  // accumulate area scores and archetype scores
  const areaScores = {};
  const archetypeScores = {};
  let answered = 0;

  questions.forEach((q, i) => {
    const val = responses[i];
    if (!val) return;
    answered++;
    areaScores[q.area] = (areaScores[q.area] || 0) + val;
    archetypeScores[q.archetype] = (archetypeScores[q.archetype] || 0) + val;
  });

  if (answered === 0) { alert("Responda ao menos uma pergunta."); return; }

  // normalize area scores to percentage (based on max possible per area)
  const areaNames = Object.keys(areaScores);
  const areaPercent = areaNames.map(a => {
    // count how many questions belong to this area
    const count = questions.filter(q => q.area === a).length;
    const max = count * 5; // max points
    const percent = Math.round((areaScores[a] / max) * 100);
    return { area: a, percent, raw: areaScores[a], count };
  });

  // sort by percent descending
  areaPercent.sort((x,y) => y.percent - x.percent);

  // Chart: build labels and values (keep order by percent)
  const labels = areaPercent.map(x => x.area);
  const values = areaPercent.map(x => x.percent);

  // create chart (destroy previous if exists)
  const ctx = document.getElementById("resultChart").getContext("2d");
  if (window._testChart) window._testChart.destroy();
  window._testChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: [
          '#6c63ff','#ff6584','#3ecf8e','#ffb347','#46a2f1',
          '#b78cff','#88d7c7','#ffd3a6','#cbe86b','#a0b4ff'
        ].slice(0, labels.length)
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed}%` } }
      }
    }
  });

  // render percent list
  percentList.innerHTML = '<h3>Percentual por área</h3>' + 
    '<div class="percent-grid">' + 
    areaPercent.map(a => `<div class="percent-item"><strong>${a.area}</strong><div>${a.percent}% <small>(${a.count} perguntas)</small></div></div>`).join('') +
    '</div>';

  // top archetypes
  const archeEntries = Object.entries(archetypeScores);
  archeEntries.sort((a,b) => b[1] - a[1]);
  const topArchetypes = archeEntries.slice(0,3).map(e => ({ name: e[0], score: e[1] }));

  topArchetypesDiv.innerHTML = `<h3>Arquétipos em destaque</h3>
    <p>${topArchetypes.map(a => `${a.name} (${a.score})`).join(' — ')}</p>`;

  // Reflexão: montagem de texto acolhedor baseado nos top archetypes e nas áreas mais altas
  const dominantAreas = areaPercent.slice(0,3).map(a => a.area);
  const archeNames = topArchetypes.map(a => a.name);

  const reflectionText = buildReflection(dominantAreas, archeNames);
  reflectionDiv.innerHTML = `<h3>Reflexão</h3><p>${reflectionText}</p>`;

  // Práticas: fornecer sugestões por área (para as áreas com percent >= 35% ou top3)
  const practicesHTML = buildPractices(areaPercent);
  practicesDiv.innerHTML = `<h3>Práticas sugeridas</h3>${practicesHTML}`;

  // show result, hide quiz
  resultSection.classList.remove("hidden");
  quizDiv.classList.add("hidden");
  document.querySelector('.controls').classList.add('hidden');
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --- Reflection builder (simple rule-based text assembly)
function buildReflection(dominantAreas, archeNames) {
  // gentle, therapeutic tone
  const areaPhrase = dominantAreas.length ? `As áreas com maior presença nas suas respostas foram: ${dominantAreas.join(', ')}.` : '';
  const archePhrase = archeNames.length ? `Os arquétipos que mais apareceram: ${archeNames.join(', ')}.` : '';
  const gentle = `Esses padrões não são uma sentença — são convites para olhar. Quando observar ${dominantAreas[0] ? dominantAreas[0].toLowerCase() : 'essas áreas'}, acolha a sensação primeiro, sem pressa.`;
  const question = `Você pode se perguntar: "Quando comecei a acreditar nisso?" e "O que preciso ouvir de mim agora?"`;
  return `${areaPhrase} ${archePhrase} ${gentle} ${question}`;
}

// --- Practices builder: short, actionáveis por área (top areas get stronger suggestions)
function buildPractices(areaPercent) {
  // map area -> suggested practices
  const map = {
    "Autoestima": [
      "Escreva 3 pequenas ações que você fez bem hoje.",
      "Ao se olhar no espelho, repita: 'Eu sou suficiente' — por 30 segundos."
    ],
    "Relacionamentos": [
      "Escolha uma pessoa segura e compartilhe um sentimento pequeno.",
      "Observe quando você tenta agradar e pergunte: 'Isso é por mim ou por medo?'"
    ],
    "Prosperidade": [
      "Registre uma pequena intenção financeira: economizar R$X ou pedir uma oportunidade.",
      "Pratique afirmar: 'Eu mereço recursos e posso administrá-los com cuidado.'"
    ],
    "Propósito": [
      "Faça um mapa rápido de interesses (30 minutos). Experimente uma ação pequena ligada a um interesse.",
      "Pergunte-se: 'Qual passo pequeno posso dar esta semana?'"
    ],
    "Espiritualidade": [
      "Reserve 5 minutos diários para silêncio ou respiração consciente.",
      "Leia / escute algo que nutra sua sensação de conexão."
    ],
    "Corpo": [
      "Permita 10–20 minutos de movimento que você goste (caminhar, dançar).",
      "Ao descansar, desligue telas por 15 minutos sem culpa."
    ],
    "Sucesso": [
      "Escreva 1 realização da semana, por menor que seja.",
      "Defina um microobjetivo para expor uma ideia pequena (sem pressões)."
    ],
    "Controle": [
      "Pratique soltar uma pequena decisão: delegue algo ou aceite não saber.",
      "Observe a respiração quando sentir necessidade de controlar."
    ],
    "Confiança": [
      "Registre decisões que deram certo; reconheça sua intuição.",
      "Faça uma ação que dependa só de você e anote o resultado."
    ],
    "Rejeição": [
      "Liste 3 pessoas que te aceitam; leia quando se sentir só.",
      "Reframe: escreva uma lembrança que contrarie a sensação de rejeição."
    ],
    "Medo": [
      "Nomeie o medo por escrito (o que ele pede?).",
      "Pratique uma exposição pequena e segura (passo a passo)."
    ],
    "Visibilidade": [
      "Compartilhe um pensamento curto em um grupo seguro.",
      "Comece com um post anônimo/pequeno para testar sensação."
    ],
    "Inadequação": [
      "Anote evidências que contradizem a sensação de inadequação.",
      "Relembre um momento em que sua presença foi valiosa."
    ]
  };

  // determine important areas: percent >= 35 or top 3
  const important = areaPercent.filter(p => p.percent >= 35).map(p => p.area);
  const top3 = areaPercent.slice(0,3).map(p => p.area);
  const selected = Array.from(new Set([...important, ...top3]));

  if (selected.length === 0) {
    return `<p>Você está em equilíbrio ou ainda não respondeu o suficiente para destacar áreas fortes. Experimente revisar as respostas ou repetir o teste em outro momento.</p>`;
  }

  // build html
  let html = '';
  selected.forEach(area => {
    const practices = map[area] || ["Observe essa área com compaixão e anote pequenos passos práticos."];
    html += `<div style="margin-bottom:10px"><strong>${area}</strong><ul>${practices.map(p => `<li>${p}</li>`).join('')}</ul></div>`;
  });

  return html;
}

// --- init
renderQuestion(currentIndex);
