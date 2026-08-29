// テイスティングコメント練習 アプリロジック

const screen = document.getElementById("screen");
const headerTitle = document.getElementById("header-title");
const btnHome = document.getElementById("btn-home");
const btnInfo = document.getElementById("btn-info");
const footerBar = document.getElementById("footer-bar");
const footerProgress = document.getElementById("footer-progress");
const btnGrade = document.getElementById("btn-grade");

// ---------------- help (使い方) ----------------
const HELP = {
  launcher: { title: "このアプリについて", body: `
    <p>ワインエキスパート2次試験（テイスティング）対策の練習アプリです。タイルをタップして機能を選びます。</p>
    <ul>
      <li>📝 <b>コメント選択練習</b> — 本番形式の用語シートで解答し採点</li>
      <li>🃏 <b>品種フラッシュカード</b> — 品種の特徴を暗記</li>
      <li>❓ <b>品種当てクイズ</b> — コメントから品種を推測</li>
      <li>📊 <b>出題傾向データ</b> — 過去15年の出題実績</li>
      <li>📖 <b>模範解答 比較閲覧</b> — 品種×生産地で正解を見比べ</li>
    </ul>
    <p>各画面の右上 ⓘ でその画面の使い方が見られます。</p>` },
  comment: { title: "コメント選択練習の使い方", body: `
    <p>本番の解答用紙を模した用語シートでコメントを作り、模範解答と照合して採点する練習です。</p>
    <ul>
      <li><b>ワインを選ぶ</b> — 銘柄を見て選ぶか、「ランダム出題」でブラインド練習ができます。ランダムは白・赤を選んでから出題されます</li>
      <li><b>ブラインドテイスティングでの使い方</b> — 実際にワインを飲みながらランダム出題でシートを記入→採点すると本番に近い練習になります</li>
      <li><b>結果の一時保存</b> — 採点結果は自動で一時保存され、この画面に一覧表示されます。複数本の練習が終わったら「練習完了」で記録を削除できます</li>
    </ul>` },
  sheet: { title: "用語シートの使い方", body: `
    <p>各項目で指定された数（例：2/2）の用語を選びます。</p>
    <ul>
      <li>選択数の上限に達した状態で別の用語をタップすると、最も古い選択と入れ替わります</li>
      <li>全項目を記入したら画面下の「採点する」をタップ。未記入があっても採点できます</li>
      <li>中断するときは左上の ◀（記入内容は破棄されます）</li>
      <li>採点結果は「正解（緑）／選び漏れ（黄）／誤って選択（赤）」で色分け表示されます</li>
    </ul>
    <p>※「いくつ選べ」の数は本番で年により変わるため目安です。</p>` },
  flashcards: { title: "品種フラッシュカードの使い方", body: `
    <ul>
      <li><b>カードをタップ</b>すると裏返り、外観・香り・味わい・決め手・主産地が表示されます</li>
      <li><b>すべて／白／赤</b> と <b>生産地</b> の2軸で絞り込めます</li>
      <li>複数の生産国を持つ品種は、裏面に<b>生産地による違い</b>が表示されます。生産地フィルタ選択中はその国がハイライトされます</li>
      <li>🔀 シャッフルで並びをランダムにできます</li>
    </ul>` },
  quiz: { title: "品種当てクイズの使い方", body: `
    <ul>
      <li>出題範囲（すべて／白のみ／赤のみ）を選ぶとスタート。出題順はランダムです</li>
      <li>テイスティングコメントを読み、4択から品種を選びます</li>
      <li>回答すると正誤と正解ワインの解説が表示されます</li>
      <li>全問終了後にスコアが表示されます。中断は左上の ◀</li>
    </ul>` },
  stats: { title: "出題傾向データの見方", body: `
    <ul>
      <li><b>品種別ランキング</b> — 2011〜2025年の出題回数。バーの下の数字は出題年です</li>
      <li><b>年度別の出題</b> — 各年の出題ワイン（🥂白・🍷赤・🥃その他の酒類）</li>
    </ul>
    <p>出典はワイン受験.com「過去の出題ワインの品種と生産国」。頻出品種から優先して対策するのがおすすめです。</p>` },
  compare: { title: "模範解答 比較閲覧の使い方", body: `
    <ul>
      <li>「白ワイン品種」「赤ワイン品種」のタブを開いて品種を選びます</li>
      <li>その品種の模範解答が<b>生産地ごとに横並びの表</b>で表示されます（横スクロール可）</li>
      <li><b>赤色の用語</b>は生産地間で答えが異なる箇所＝生産地当ての決め手です</li>
    </ul>
    <p>※ 模範解答はAIが試験対策の定石に基づき作成した参考解答です。</p>` },
};

function viewHelpKey() {
  if (view === "wineList" || view === "result") return "comment";
  if (view === "sheet") return "sheet";
  if (view === "flashcards") return "flashcards";
  if (view === "quizStart" || view === "quiz") return "quiz";
  if (view === "stats") return "stats";
  if (view === "compare") return "compare";
  return "launcher";
}

function openHelp(key) {
  const h = HELP[key];
  if (!h) return;
  document.getElementById("help-title").textContent = h.title;
  document.getElementById("help-body").innerHTML = h.body;
  document.getElementById("help-modal").classList.remove("hidden");
}
btnInfo.addEventListener("click", () => openHelp(viewHelpKey()));
document.getElementById("help-close").addEventListener("click", () =>
  document.getElementById("help-modal").classList.add("hidden"));
document.getElementById("help-backdrop").addEventListener("click", () =>
  document.getElementById("help-modal").classList.add("hidden"));

// ---------------- 練習結果の一時保存 ----------------
const RESULTS_KEY = "wtt-practice-results";

function loadResults() {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY)) || []; } catch { return []; }
}
function savePracticeResult(entry) {
  const list = loadResults();
  list.push(entry);
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(list)); } catch {}
}
function clearResults() {
  localStorage.removeItem(RESULTS_KEY);
}

let currentWine = null;
let selections = {}; // sectionId -> Set of terms
let view = "launcher"; // launcher | wineList | sheet | result | flashcards | quizStart | quiz

btnHome.addEventListener("click", () => {
  if (view === "sheet") {
    if (!confirm("練習を中断してワイン選択に戻りますか？")) return;
    showHome();
  } else if (view === "result") {
    showHome();
  } else if (view === "quiz") {
    if (!confirm("クイズを中断してメニューに戻りますか？")) return;
    showQuizStart();
  } else if (view === "wineList" || view === "flashcards" || view === "quizStart" || view === "stats" || view === "compare" || view === "guide") {
    showLauncher();
  }
});

btnGrade.addEventListener("click", () => showResult());

// ---------------- launcher ----------------
const FEATURES = [
  { id: "comment", icon: "📝", title: "テイスティングコメント選択練習", desc: "本番の解答用紙を模した用語シートで練習", active: true },
  { id: "flashcard", icon: "🃏", title: "主要品種フラッシュカード", desc: "品種ごとの特徴を暗記", active: true },
  { id: "quiz", icon: "❓", title: "品種当てクイズ", desc: "コメントから品種を推測", active: true },
  { id: "stats", icon: "📊", title: "過去の出題品種 傾向データ", desc: "出題実績をチェック", active: true },
  { id: "compare", icon: "📖", title: "模範解答 比較閲覧", desc: "品種×生産地でコメント正解を見比べ", active: true },
  { id: "guide", icon: "📘", title: "使い方", desc: "各機能の説明・操作方法", active: true },
];

function showLauncher() {
  view = "launcher";
  currentWine = null;
  selections = {};
  headerTitle.textContent = "ワインエキスパート 2次試験対策";
  btnHome.classList.add("hidden");
  footerBar.classList.add("hidden");

  screen.innerHTML = `
    <p class="home-lead">機能を選んでください。今後、機能を順次追加していきます。</p>
    <div class="tile-grid">
      ${FEATURES.map(f => `
        <button class="tile ${f.active ? "" : "disabled"}" data-feature="${f.id}" ${f.active ? "" : "disabled"}>
          ${f.active ? "" : '<span class="tile-badge">Coming Soon</span>'}
          <span class="tile-icon">${f.icon}</span>
          <span class="tile-title">${f.title}</span>
          <span class="tile-desc">${f.desc}</span>
        </button>
      `).join("")}
    </div>
  `;

  screen.querySelectorAll(".tile:not(.disabled)").forEach(tile => {
    tile.addEventListener("click", () => {
      if (tile.dataset.feature === "comment") showHome();
      if (tile.dataset.feature === "flashcard") showFlashcards();
      if (tile.dataset.feature === "quiz") showQuizStart();
      if (tile.dataset.feature === "stats") showStats();
      if (tile.dataset.feature === "compare") showCompare();
      if (tile.dataset.feature === "guide") showGuide();
    });
  });
  window.scrollTo(0, 0);
}

// ---------------- flashcards (品種フラッシュカード) ----------------
const fcState = { filter: "all", country: "all", order: [], index: 0, flipped: false };

const FC_COUNTRIES = ["フランス", "イタリア", "スペイン", "ドイツ", "アメリカ", "オーストラリア",
                      "ニュージーランド", "チリ", "アルゼンチン", "南アフリカ", "日本"];

function fcDeck() {
  return fcState.order.filter(g =>
    (fcState.filter === "all" || g.color === fcState.filter) &&
    (fcState.country === "all" || (g.countries || []).includes(fcState.country)));
}

function showFlashcards() {
  view = "flashcards";
  headerTitle.textContent = "品種フラッシュカード";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  if (fcState.order.length === 0) fcState.order = [...GRAPES];
  fcState.index = 0;
  fcState.flipped = false;

  screen.innerHTML = `
    <div class="fc-filters">
      <button class="chip fc-filter" data-f="all">すべて</button>
      <button class="chip fc-filter" data-f="white">白</button>
      <button class="chip fc-filter" data-f="red">赤</button>
      <button class="chip fc-shuffle" id="fc-shuffle">🔀 シャッフル</button>
    </div>
    <div class="fc-filters fc-countries">
      <button class="chip fc-country" data-c="all">🌍 全生産地</button>
      ${FC_COUNTRIES.map(c => `<button class="chip fc-country" data-c="${c}">${c}</button>`).join("")}
    </div>
    <div class="fc-stage">
      <div class="fc-card" id="fc-card">
        <div class="fc-inner" id="fc-inner">
          <div class="fc-face fc-front" id="fc-front"></div>
          <div class="fc-face fc-back" id="fc-back"></div>
        </div>
      </div>
    </div>
    <p class="fc-hint">カードをタップすると裏返ります</p>
    <div class="fc-nav">
      <button class="btn-secondary" id="fc-prev">◀ 前へ</button>
      <span class="fc-counter" id="fc-counter"></span>
      <button class="btn-secondary" id="fc-next">次へ ▶</button>
    </div>
  `;

  screen.querySelectorAll(".fc-filter").forEach(b => {
    b.addEventListener("click", () => {
      fcState.filter = b.dataset.f;
      fcState.index = 0;
      fcState.flipped = false;
      renderFlashcard();
    });
  });
  screen.querySelectorAll(".fc-country").forEach(b => {
    b.addEventListener("click", () => {
      fcState.country = b.dataset.c;
      fcState.index = 0;
      fcState.flipped = false;
      renderFlashcard();
    });
  });
  document.getElementById("fc-shuffle").addEventListener("click", () => {
    for (let i = fcState.order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fcState.order[i], fcState.order[j]] = [fcState.order[j], fcState.order[i]];
    }
    fcState.index = 0;
    fcState.flipped = false;
    renderFlashcard();
  });
  document.getElementById("fc-card").addEventListener("click", () => {
    fcState.flipped = !fcState.flipped;
    document.getElementById("fc-inner").classList.toggle("flipped", fcState.flipped);
  });
  document.getElementById("fc-prev").addEventListener("click", () => moveFlashcard(-1));
  document.getElementById("fc-next").addEventListener("click", () => moveFlashcard(1));

  renderFlashcard();
  window.scrollTo(0, 0);
}

function moveFlashcard(dir) {
  const deck = fcDeck();
  if (deck.length === 0) return;
  fcState.index = (fcState.index + dir + deck.length) % deck.length;
  fcState.flipped = false;
  renderFlashcard();
}

function renderFlashcard() {
  const deck = fcDeck();
  screen.querySelectorAll(".fc-filter").forEach(b =>
    b.classList.toggle("on", b.dataset.f === fcState.filter));
  screen.querySelectorAll(".fc-country").forEach(b =>
    b.classList.toggle("on", b.dataset.c === fcState.country));

  if (deck.length === 0) {
    document.getElementById("fc-inner").classList.remove("flipped");
    document.getElementById("fc-counter").textContent = "0 / 0";
    document.getElementById("fc-front").innerHTML = `
      <span class="fc-glass">🤷</span>
      <span class="fc-name">この組み合わせは収録外です</span>
      <span class="fc-colorlabel">本アプリは2次試験対策として主要品種のみ収録しています</span>
    `;
    document.getElementById("fc-back").innerHTML = "";
    return;
  }
  if (fcState.index >= deck.length) fcState.index = 0;
  const g = deck[fcState.index];
  document.getElementById("fc-inner").classList.toggle("flipped", fcState.flipped);
  document.getElementById("fc-counter").textContent = `${fcState.index + 1} / ${deck.length}`;
  document.getElementById("fc-front").innerHTML = `
    <span class="fc-glass">${g.color === "white" ? "🥂" : "🍷"}</span>
    <span class="fc-name">${g.name}</span>
    <span class="fc-colorlabel">${g.color === "white" ? "白ワイン用品種" : "赤ワイン用品種"}${fcState.country !== "all" ? " ・ " + fcState.country : ""}</span>
  `;
  const byCountryHtml = g.byCountry ? `
    <dt>🌐 生産地による違い</dt>
    <dd>
      ${Object.entries(g.byCountry).map(([c, desc]) => `
        <div class="fc-bycountry ${fcState.country === c ? "highlight" : ""}">
          <span class="fc-bc-country">${c}</span>${desc}
        </div>
      `).join("")}
    </dd>
  ` : "";
  document.getElementById("fc-back").innerHTML = `
    <div class="fc-back-name">${g.name}</div>
    <dl class="fc-facts">
      <dt>👁 外観</dt><dd>${g.appearance}</dd>
      <dt>👃 香り</dt><dd>${g.aroma}</dd>
      <dt>👅 味わい</dt><dd>${g.taste}</dd>
      <dt>🔑 決め手</dt><dd>${g.key}</dd>
      <dt>🌍 主産地</dt><dd>${g.region}</dd>
      ${byCountryHtml}
    </dl>
  `;
}

// ---------------- quiz (品種当てクイズ) ----------------
const quizState = { queue: [], index: 0, correct: 0, answered: false };

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showQuizStart() {
  view = "quizStart";
  headerTitle.textContent = "品種当てクイズ";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  screen.innerHTML = `
    <p class="home-lead">テイスティングコメントを読んで、どの品種かを4択で当てるクイズです。出題範囲を選んでください。</p>
    <button class="wine-card" data-mode="all">
      <span class="glass">🍇</span>
      <span><span class="wine-label">すべて（${WINES.length}問）</span>
      <span class="wine-sub" style="display:block">白・赤の全ワインから出題</span></span>
      <span class="chev">▶</span>
    </button>
    <button class="wine-card" data-mode="white">
      <span class="glass">🥂</span>
      <span><span class="wine-label">白ワインのみ（${WINES.filter(w => w.color === "white").length}問）</span>
      <span class="wine-sub" style="display:block">白ワイン用品種から出題</span></span>
      <span class="chev">▶</span>
    </button>
    <button class="wine-card" data-mode="red">
      <span class="glass">🍷</span>
      <span><span class="wine-label">赤ワインのみ（${WINES.filter(w => w.color === "red").length}問）</span>
      <span class="wine-sub" style="display:block">赤ワイン用品種から出題</span></span>
      <span class="chev">▶</span>
    </button>
  `;
  screen.querySelectorAll(".wine-card").forEach(b =>
    b.addEventListener("click", () => startQuiz(b.dataset.mode)));
  window.scrollTo(0, 0);
}

function startQuiz(mode) {
  quizState.queue = shuffleArray(WINES.filter(w => mode === "all" || w.color === mode));
  quizState.index = 0;
  quizState.correct = 0;
  renderQuizQuestion();
}

// 模範解答から出題用コメント文を組み立てる（品種・生産国・収穫年は伏せる）
function buildQuizComment(wine) {
  const a = wine.answers;
  const join = (ids) => ids.flatMap(id => a[id] || []).join("、");
  const groups = [
    { icon: "👁", label: "外観", text: join(["clarity", "brightness", "color", "intensity", "viscosity", "appearanceImpression"]) },
    { icon: "👃", label: "香り", text: join(["aromaFirst", "aromaFruit", "aromaFlora", "aromaSpice", "aromaImpression"]) },
    { icon: "👅", label: "味わい", text: join(["attack", "sweetness", "acidity", "bitterness", "tannin", "balance", "alcohol", "finish"]) },
  ];
  return groups.map(g => `
    <div class="quiz-comment-row">
      <span class="quiz-comment-label">${g.icon} ${g.label}</span>
      <span class="quiz-comment-text">${g.text}</span>
    </div>
  `).join("");
}

function renderQuizQuestion() {
  view = "quiz";
  const wine = quizState.queue[quizState.index];
  quizState.answered = false;
  headerTitle.textContent = `品種当てクイズ ${quizState.index + 1}/${quizState.queue.length}`;
  footerBar.classList.add("hidden");

  const grapeSection = VOCAB[wine.color].find(s => s.id === "grape");
  const correct = wine.answers.grape[0];
  const distractors = shuffleArray(grapeSection.terms.filter(t => t !== correct)).slice(0, 3);
  const choices = shuffleArray([correct, ...distractors]);

  screen.innerHTML = `
    <div class="section-card quiz-comment">
      <div class="section-head"><span class="section-title">このワインの品種は？（${wine.color === "white" ? "白" : "赤"}ワイン）</span></div>
      ${buildQuizComment(wine)}
    </div>
    <div class="quiz-choices">
      ${choices.map(c => `<button class="quiz-choice" data-grape="${c}">${c}</button>`).join("")}
    </div>
    <div class="quiz-feedback hidden" id="quiz-feedback">
      <div class="quiz-verdict" id="quiz-verdict"></div>
      <div class="quiz-explain" id="quiz-explain"></div>
      <button class="btn-primary" id="quiz-next"></button>
    </div>
  `;

  screen.querySelectorAll(".quiz-choice").forEach(btn => {
    btn.addEventListener("click", () => {
      if (quizState.answered) return;
      quizState.answered = true;
      const picked = btn.dataset.grape;
      const isCorrect = picked === correct;
      if (isCorrect) quizState.correct++;
      screen.querySelectorAll(".quiz-choice").forEach(b => {
        b.disabled = true;
        if (b.dataset.grape === correct) b.classList.add("correct");
        else if (b.dataset.grape === picked) b.classList.add("wrong");
      });
      const fb = document.getElementById("quiz-feedback");
      document.getElementById("quiz-verdict").textContent = isCorrect ? "⭕ 正解！" : "❌ 不正解…";
      document.getElementById("quiz-verdict").className = "quiz-verdict " + (isCorrect ? "good" : "bad");
      document.getElementById("quiz-explain").textContent = `正解：${wine.name} — ${wine.note}`;
      const nextBtn = document.getElementById("quiz-next");
      nextBtn.textContent = quizState.index + 1 < quizState.queue.length ? "次の問題へ" : "結果を見る";
      nextBtn.addEventListener("click", () => {
        quizState.index++;
        if (quizState.index < quizState.queue.length) renderQuizQuestion();
        else showQuizResult();
      });
      fb.classList.remove("hidden");
      fb.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  });
  window.scrollTo(0, 0);
}

function showQuizResult() {
  view = "quizStart";
  headerTitle.textContent = "クイズ結果";
  const total = quizState.queue.length;
  const pct = Math.round((quizState.correct / total) * 100);
  const msg = pct === 100 ? "完璧です！🎉" : pct >= 70 ? "いい調子です！" : pct >= 40 ? "もう一息！" : "繰り返し挑戦しましょう";
  screen.innerHTML = `
    <div class="score-card">
      <div class="s-wine">品種当てクイズ</div>
      <div class="s-score">${quizState.correct} / ${total} 問正解</div>
      <div class="s-detail">正答率 ${pct}%　${msg}</div>
    </div>
    <div class="result-actions">
      <button class="btn-secondary" id="quiz-retry">もう一度挑戦</button>
      <button class="btn-primary" id="quiz-home">メニューへ</button>
    </div>
  `;
  document.getElementById("quiz-retry").addEventListener("click", () => showQuizStart());
  document.getElementById("quiz-home").addEventListener("click", () => showLauncher());
  window.scrollTo(0, 0);
}

// ---------------- stats (過去の出題品種 傾向データ) ----------------
function showStats() {
  view = "stats";
  headerTitle.textContent = "出題傾向データ";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const years = PAST_EXAMS.map(e => e.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  // 品種ごとの出題回数を集計（白・赤別）
  const counts = { white: new Map(), red: new Map() };
  for (const exam of PAST_EXAMS) {
    for (const item of exam.items) {
      if (item.type === "other") continue;
      const m = counts[item.type];
      if (!m.has(item.name)) m.set(item.name, { count: 0, years: [] });
      const rec = m.get(item.name);
      rec.count++;
      rec.years.push(exam.year);
    }
  }

  const rankingHtml = (type, title, icon) => {
    const sorted = [...counts[type].entries()].sort((a, b) => b[1].count - a[1].count);
    const max = sorted[0][1].count;
    return `
      <div class="section-card">
        <div class="section-head"><span class="section-title">${icon} ${title}（出題回数）</span></div>
        ${sorted.map(([name, rec]) => `
          <div class="stat-row">
            <span class="stat-name">${name}</span>
            <span class="stat-bar-wrap"><span class="stat-bar ${type}" style="width:${(rec.count / max) * 100}%"></span></span>
            <span class="stat-count">${rec.count}回</span>
          </div>
          <div class="stat-years">${rec.years.slice().sort((a, b) => b - a).map(y => `'${String(y).slice(2)}`).join(" ")}</div>
        `).join("")}
      </div>
    `;
  };

  const yearHtml = PAST_EXAMS.map(exam => `
    <div class="section-card">
      <div class="section-head"><span class="section-title">${exam.year}年</span></div>
      ${exam.items.map(item => `
        <div class="stat-exam-item">
          <span>${item.type === "white" ? "🥂" : item.type === "red" ? "🍷" : "🥃"}</span>
          <span class="stat-exam-name">${item.name}</span>
          <span class="stat-exam-country">${item.country || "その他の酒類"}</span>
        </div>
      `).join("")}
    </div>
  `).join("");

  screen.innerHTML = `
    <p class="home-lead">ワインエキスパート二次試験の出題実績（${minYear}〜${maxYear}年）です。頻出品種を優先して対策しましょう。</p>
    <h2 class="group-title">品種別ランキング</h2>
    ${rankingHtml("white", "白ワイン", "🥂")}
    ${rankingHtml("red", "赤ワイン", "🍷")}
    <h2 class="group-title">年度別の出題</h2>
    ${yearHtml}
    <p class="reveal-note">出典: <a href="https://www.wine-jyuken.com/second_exam/kakonosyutudai" target="_blank" rel="noopener">ワイン受験.com「過去の出題ワインの品種と生産国」</a>（2026年8月取得）。シラーズはシラーとして集計しています。最新情報や訂正は data.js の PAST_EXAMS を編集してください。</p>
  `;
  window.scrollTo(0, 0);
}

// ---------------- guide (使い方ページ) ----------------
function showGuide() {
  view = "guide";
  headerTitle.textContent = "使い方";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  const order = ["launcher", "comment", "sheet", "flashcards", "quiz", "stats", "compare"];
  screen.innerHTML = order.map(k => `
    <div class="section-card">
      <div class="section-head"><span class="section-title">${HELP[k].title}</span></div>
      <div class="help-body">${HELP[k].body}</div>
    </div>
  `).join("");
  window.scrollTo(0, 0);
}

// ---------------- compare (模範解答 比較閲覧) ----------------
let cmpGrape = null;

function showCompare() {
  view = "compare";
  headerTitle.textContent = "模範解答 比較閲覧";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  // WINESに存在する品種を白→赤の順で列挙（重複除去）
  const grapes = [];
  for (const color of ["white", "red"]) {
    for (const g of VOCAB[color].find(s => s.id === "grape").terms) {
      if (WINES.some(w => w.color === color && w.answers.grape[0] === g)) grapes.push({ name: g, color });
    }
  }
  if (!cmpGrape || !grapes.some(g => g.name === cmpGrape)) cmpGrape = grapes[0].name;
  const currentColor = grapes.find(g => g.name === cmpGrape).color;

  const grapeChipsHtml = (color) => grapes.filter(g => g.color === color)
    .map(g => `<button class="chip cmp-grape" data-g="${g.name}">${g.name}</button>`).join("");
  const whiteGrapes = grapes.filter(g => g.color === "white");
  const redGrapes = grapes.filter(g => g.color === "red");

  screen.innerHTML = `
    <p class="home-lead">品種を選ぶと、生産地ごとの模範解答コメントを並べて比較できます。<span class="cmp-diff">色付き</span>の用語は生産地間で答えが異なる箇所です。</p>
    <details class="cmp-acc" ${currentColor === "white" ? "open" : ""}>
      <summary>🥂 白ワイン品種（${whiteGrapes.length}）</summary>
      <div class="fc-filters cmp-acc-body">${grapeChipsHtml("white")}</div>
    </details>
    <details class="cmp-acc" ${currentColor === "red" ? "open" : ""}>
      <summary>🍷 赤ワイン品種（${redGrapes.length}）</summary>
      <div class="fc-filters cmp-acc-body">${grapeChipsHtml("red")}</div>
    </details>
    <div id="cmp-body"></div>
    <p class="reveal-note">※ 模範解答はAIが試験対策の定石に基づき作成した参考解答です。お手元の教材と併せてご活用ください。</p>
  `;

  screen.querySelectorAll(".cmp-grape").forEach(b => {
    b.addEventListener("click", () => {
      cmpGrape = b.dataset.g;
      renderCompareTable();
    });
  });
  renderCompareTable();
  window.scrollTo(0, 0);
}

function renderCompareTable() {
  screen.querySelectorAll(".cmp-grape").forEach(b =>
    b.classList.toggle("on", b.dataset.g === cmpGrape));
  const wines = WINES.filter(w => w.answers.grape[0] === cmpGrape);
  const color = wines[0].color;
  const sections = VOCAB[color].filter(s => !["grape", "country", "vintage"].includes(s.id));

  let rows = "";
  let lastGroup = null;
  for (const sec of sections) {
    if (sec.group !== lastGroup) {
      rows += `<tr class="cmp-group"><th class="cmp-item">${sec.group}</th><td colspan="${wines.length}"></td></tr>`;
      lastGroup = sec.group;
    }
    // 全ワイン共通で選ばれている用語か判定し、違う箇所をハイライト
    const cells = wines.map(w => {
      const terms = w.answers[sec.id] || [];
      return terms.map(t => {
        const shared = wines.every(x => (x.answers[sec.id] || []).includes(t));
        return shared || wines.length < 2 ? t : `<span class="cmp-diff">${t}</span>`;
      }).join("、");
    });
    rows += `<tr><th class="cmp-item">${sec.title}</th>${cells.map(c => `<td>${c}</td>`).join("")}</tr>`;
  }

  document.getElementById("cmp-body").innerHTML = `
    <div class="cmp-wrap">
      <table class="cmp-table">
        <thead><tr>
          <th class="cmp-item">項目</th>
          ${wines.map(w => `<th class="cmp-head">${w.answers.country[0]}<span class="cmp-vintage">${w.answers.vintage[0]}</span></th>`).join("")}
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    ${wines.length < 2 ? '<p class="reveal-note">この品種は現在1つの生産地のみ収録しています。ワインを追加すると自動的に比較列が増えます。</p>' : ""}
  `;
}

// ---------------- wine list (コメント練習) ----------------
function showHome() {
  view = "wineList";
  currentWine = null;
  selections = {};
  headerTitle.textContent = "コメント選択練習";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const whites = WINES.filter(w => w.color === "white");
  const reds = WINES.filter(w => w.color === "red");

  const results = loadResults();
  const resultsHtml = results.length === 0 ? "" : `
    <h2 class="wine-section-title">練習結果（一時保存中 ${results.length}件）</h2>
    <div class="section-card">
      ${results.map(r => `
        <div class="pr-row">
          <span>${r.color === "white" ? "🥂" : "🍷"}</span>
          <span class="pr-name">${r.name}${r.blind ? '<span class="pr-blind">ブラインド</span>' : ""}</span>
          <span class="pr-score">${r.pct}点</span>
          <span class="pr-time">${new Date(r.t).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      `).join("")}
      <button class="btn-secondary pr-clear" id="btn-finish-practice">✅ 練習完了（記録を削除）</button>
    </div>
  `;

  screen.innerHTML = `
    <p class="home-lead">ワインを選んで、本番形式の用語選択シートでコメントを作成しましょう。採点すると模範解答と照合できます。</p>
    <button class="wine-card random" data-random="white">
      <span class="glass">🥂</span>
      <span>
        <span class="wine-label">白ワインからランダム出題（銘柄非公開）</span>
        <span class="wine-sub" style="display:block">ブラインドテイスティング用。白のどれかを伏せて出題</span>
      </span>
      <span class="chev">▶</span>
    </button>
    <button class="wine-card random" data-random="red">
      <span class="glass">🍷</span>
      <span>
        <span class="wine-label">赤ワインからランダム出題（銘柄非公開）</span>
        <span class="wine-sub" style="display:block">ブラインドテイスティング用。赤のどれかを伏せて出題</span>
      </span>
      <span class="chev">▶</span>
    </button>
    ${resultsHtml}
    <h2 class="wine-section-title">白ワイン</h2>
    ${whites.map(wineCardHtml).join("")}
    <h2 class="wine-section-title">赤ワイン</h2>
    ${reds.map(wineCardHtml).join("")}
    <p class="reveal-note">※ データは data.js で自由に追加・編集できます。実際にワインを飲みながら該当する銘柄を選んで練習するのがおすすめです。</p>
  `;

  screen.querySelectorAll(".wine-card").forEach(card => {
    card.addEventListener("click", () => {
      if (card.dataset.random) {
        const pool = WINES.filter(w => w.color === card.dataset.random);
        const w = pool[Math.floor(Math.random() * pool.length)];
        startPractice(w, true);
      } else {
        startPractice(WINES.find(w => w.id === card.dataset.id), false);
      }
    });
  });
  const finishBtn = document.getElementById("btn-finish-practice");
  if (finishBtn) {
    finishBtn.addEventListener("click", () => {
      if (!confirm(`一時保存中の練習結果 ${results.length}件 を削除して練習を完了しますか？`)) return;
      clearResults();
      showHome();
    });
  }
  window.scrollTo(0, 0);
}

function wineCardHtml(w) {
  return `
    <button class="wine-card" data-id="${w.id}">
      <span class="glass">${w.color === "white" ? "🥂" : "🍷"}</span>
      <span>
        <span class="wine-label">${w.name}</span>
        <span class="wine-sub" style="display:block">${w.note}</span>
      </span>
      <span class="chev">▶</span>
    </button>
  `;
}

// ---------------- practice sheet ----------------
function startPractice(wine, blind) {
  view = "sheet";
  currentWine = wine;
  currentWine._blind = blind;
  selections = {};
  headerTitle.textContent = wine.color === "white" ? "白ワイン 用語選択" : "赤ワイン 用語選択";
  btnHome.classList.remove("hidden");
  footerBar.classList.remove("hidden");
  btnGrade.textContent = "採点する";
  btnGrade.disabled = false;

  const vocab = VOCAB[wine.color];
  let html = `
    <div class="sheet-wine-banner">
      <div class="b-label">出題ワイン</div>
      <div class="b-name">${blind ? (wine.color === "white" ? "白ワイン（銘柄非公開）" : "赤ワイン（銘柄非公開）") : wine.name}</div>
    </div>
  `;

  let lastGroup = null;
  for (const sec of vocab) {
    if (sec.group !== lastGroup) {
      html += `<h2 class="group-title">${sec.group}</h2>`;
      lastGroup = sec.group;
    }
    html += `
      <div class="section-card" data-sec="${sec.id}">
        <div class="section-head">
          <span class="section-title">${sec.title}</span>
          <span class="section-count" data-count>0/${sec.pick}</span>
        </div>
        <div class="chips">
          ${sec.terms.map(t => `<button class="chip" data-term="${t}">${t}</button>`).join("")}
        </div>
      </div>
    `;
  }
  screen.innerHTML = html;

  screen.querySelectorAll(".section-card").forEach(card => {
    const secId = card.dataset.sec;
    const sec = vocab.find(s => s.id === secId);
    selections[secId] = new Set();
    card.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const term = chip.dataset.term;
        const set = selections[secId];
        if (set.has(term)) {
          set.delete(term);
          chip.classList.remove("on");
        } else {
          if (set.size >= sec.pick) {
            // 上限に達していたら最も古い選択を外す（pick=1ならワンタップ切替）
            const oldest = set.values().next().value;
            set.delete(oldest);
            const oldChip = card.querySelector(`.chip[data-term="${CSS.escape(oldest)}"]`);
            if (oldChip) oldChip.classList.remove("on");
          }
          set.add(term);
          chip.classList.add("on");
        }
        const countEl = card.querySelector("[data-count]");
        countEl.textContent = `${set.size}/${sec.pick}`;
        countEl.classList.toggle("full", set.size === sec.pick);
        updateProgress();
      });
    });
  });

  updateProgress();
  window.scrollTo(0, 0);
}

function updateProgress() {
  const vocab = VOCAB[currentWine.color];
  const done = vocab.filter(s => selections[s.id] && selections[s.id].size === s.pick).length;
  footerProgress.textContent = `記入済み ${done} / ${vocab.length} 項目`;
}

// ---------------- result ----------------
function showResult() {
  view = "result";
  const wine = currentWine;
  const vocab = VOCAB[wine.color];
  headerTitle.textContent = "採点結果";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  let totalModel = 0;
  let totalHit = 0;
  let sectionsHtml = "";
  let lastGroup = null;

  for (const sec of vocab) {
    const model = new Set(wine.answers[sec.id] || []);
    const chosen = selections[sec.id] || new Set();
    const hits = [...chosen].filter(t => model.has(t)).length;
    totalModel += model.size;
    totalHit += hits;

    if (sec.group !== lastGroup) {
      sectionsHtml += `<h2 class="group-title">${sec.group}</h2>`;
      lastGroup = sec.group;
    }

    const scoreClass = model.size > 0 && hits === model.size ? "good" : (hits === 0 ? "bad" : "");
    sectionsHtml += `
      <div class="section-card">
        <div class="section-head">
          <span class="section-title">${sec.title}</span>
          <span class="section-score ${scoreClass}">${hits}/${model.size}</span>
        </div>
        <div class="chips">
          ${sec.terms.map(t => {
            const inModel = model.has(t);
            const picked = chosen.has(t);
            let cls = "r-dim";
            if (inModel && picked) cls = "r-ok";
            else if (inModel && !picked) cls = "r-miss";
            else if (!inModel && picked) cls = "r-wrong";
            return `<span class="chip ${cls}">${t}</span>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  const pct = totalModel ? Math.round((totalHit / totalModel) * 100) : 0;
  savePracticeResult({
    t: Date.now(), name: wine.name, color: wine.color,
    blind: !!wine._blind, pct, hit: totalHit, total: totalModel,
  });
  screen.innerHTML = `
    <div class="score-card">
      <div class="s-wine">${wine.name}</div>
      <div class="s-score">${pct}点</div>
      <div class="s-detail">模範解答 ${totalModel} 語中 ${totalHit} 語一致</div>
    </div>
    <div class="legend">
      <span class="l-ok">正解（選択して一致）</span>
      <span class="l-miss">選び漏れ</span>
      <span class="l-wrong">誤って選択</span>
    </div>
    ${sectionsHtml}
    <div class="result-actions">
      <button class="btn-secondary" id="btn-retry">同じワインでもう一度</button>
      <button class="btn-primary" id="btn-next">ワイン選択へ</button>
    </div>
  `;

  document.getElementById("btn-retry").addEventListener("click", () => startPractice(wine, wine._blind));
  document.getElementById("btn-next").addEventListener("click", () => showHome());
  window.scrollTo(0, 0);
}

showLauncher();
