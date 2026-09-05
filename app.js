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
      <li>🧭 <b>タイプ別テッパン</b> — 5タイプ別の定石コメント早見表</li>
      <li>📊 <b>出題傾向データ</b> — 過去15年の出題実績</li>
      <li>📖 <b>模範解答 比較閲覧</b> — 品種×生産地で正解を見比べ</li>
      <li>🗄️ <b>過去問アーカイブ</b> — 本試験で実際に発表された模範解答（2015〜2025年の29本）</li>
    </ul>
    <p>各画面の右上 ⓘ でその画面の使い方が見られます。採点や解説の元になっているデータの出所は、📘使い方の「収録データについて」をご覧ください。</p>` },
  comment: { title: "コメント選択練習の使い方", body: `
    <p>本番の解答用紙を模した用語シートでコメントを作り、模範解答と照合して採点する練習です。</p>
    <ul>
      <li><b>ワインを選ぶ</b> — 銘柄を見て選ぶか、「ランダム出題」でブラインド練習ができます。ランダムは白・赤を選んでから出題されます</li>
      <li><b>ブラインドテイスティングでの使い方</b> — 実際にワインを飲みながらランダム出題でシートを記入→採点すると本番に近い練習になります</li>
      <li><b>結果の一時保存</b> — 採点結果は自動で一時保存され、この画面に一覧表示されます。複数本の練習が終わったら「練習完了」で記録を削除できます</li>
      <li><b>一覧の末尾の5本</b>（名前に「2025年ソムリエ①」のように年度が入っているもの）は、AI参考解答ではなく<b>本試験の模範解答そのもの</b>で採点します。<span class="src-badge transcribed">📝 転記・未検証</span> のバッジが付き、項目ごとの選択数もその年の正解の語数になります</li>
    </ul>` },
  sheet: { title: "用語シートの使い方", body: `
    <p>各項目で指定された数（例：2/2）の用語を選びます。</p>
    <ul>
      <li>選択数の上限に達した状態で別の用語をタップすると、最も古い選択と入れ替わります</li>
      <li>全項目を記入したら画面下の「採点する」をタップ。未記入があっても採点できます</li>
      <li>中断するときは左上の ◀（記入内容は破棄されます）</li>
      <li>採点結果は「正解（緑）／選び漏れ（黄）／誤って選択（赤）」で色分け表示されます</li>
    </ul>
    <p>※「いくつ選べ」の数は本番で年により変わるため目安です。ただし <span class="src-badge transcribed">📝 転記・未検証</span> が付いた実物由来のワインだけは、目安ではなく<b>その年の正解の語数</b>を使います（色調が4語なら「0/4」）。</p>` },
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
      <li>回答すると正誤と正解ワインの解説が表示されます。解説の先頭のバッジで、そのコメントがAI参考解答か実物の模範解答かが分かります</li>
      <li>全問終了後にスコアが表示されます。中断は左上の ◀</li>
    </ul>` },
  stats: { title: "出題傾向データの見方", body: `
    <ul>
      <li><b>品種別ランキング</b> — 2011〜2025年の出題回数。バーの下の数字は出題年です。集計対象は<b>ワインエキスパートの出題のみ</b>で、ソムリエ試験分は含めていません</li>
      <li><b>年度別の出題</b> — 各年の出題ワイン（🥂白・🍷赤・🥃その他の酒類）。試験区分ごとに分けて表示します</li>
      <li>品種名の左の数字は<b>出題番号</b>、右の数字は<b>ヴィンテージ</b>です。空欄は出所が見つかっていない箇所です（2025年WE③のテンプラニーリョなど）</li>
    </ul>
    <p>品種・生産国の出典はワイン受験.com「過去の出題ワインの品種と生産国」。出題番号・ヴィンテージ・ソムリエ試験分は個人ブログ「ニライカナイCH」から補ったもので<b>未検証</b>です（品種・生産国が両者で一致することは確認済み）。頻出品種から優先して対策するのがおすすめです。</p>` },
  data: { title: "収録データについて（重要）", body: `
    <p>このアプリの出力が「何の情報をもとにしているか」の説明です。画面の各所に表示される出所バッジで見分けられます：<span class="src-badge ai">🤖 AI参考解答</span>＝AI作成の参考データ、<span class="src-badge real">📜 実物過去問</span>＝本試験で実際に発表された正解・実績データ、<span class="src-badge transcribed">📝 転記・未検証</span>＝会員限定公開の正解を個人ブログが転記したもの、<span class="src-badge teppan">🧭 ブログ分析の定石</span>＝個人ブログが過去問から逆算した分析。</p>
    <ul>
      <li><b>用語選択シート</b> — ワイン受験.com公開の「テイスティング解答用紙 2026年版」（白・赤）に項目・用語・並び順を準拠しています。ただし各項目の「いくつ選べ」の数は本番で年により変わるため、本アプリ独自の目安です</li>
      <li><b>模範解答（コメント練習用）</b> — コメント選択練習の採点・品種当てクイズ・模範解答比較閲覧で使われる正解データです。<b>実際の試験の正解ではなく、AI（Claude）がソムリエ・ワインエキスパート試験対策の定石に基づいて作成した参考解答</b>です。過去15年（2011〜2025年）に出題された品種×生産地の組み合わせは全てカバーしています</li>
      <li><b>品種フラッシュカード（26品種）</b> — 特徴文・生産地による違いも同じくAI執筆の参考情報です</li>
      <li><b>過去の出題実績（2011〜2025年）</b> — 品種と生産国はワイン受験.com「過去の出題ワインの品種と生産国」から。<b>ヴィンテージ・出題番号・ソムリエ試験分</b>は個人ブログ「ニライカナイCH」2026年版シリーズから補ったもので、こちらは未検証です（品種・生産国が両者で一致することは確認済み）</li>
      <li><b>タイプ別テッパン</b> — 同じ個人ブログが過去5年の模範解答から逆算した定石です。<b>協会の公式見解ではなく</b>、「採用率100%」などの数値も筆者の集計で、こちらで検証していません</li>
    </ul>
    <p><b>過去問アーカイブ</b> — 本試験で実際に発表された正解です。2015・2017・2018年の21本は一般公開されている正解PDFから（📜）、2021〜2025年の8本は会員限定公開の正解を個人ブログが記事中に転記した内容から収録しています（📝・原本と未照合）。2016年は正解未公表、2019・2020・2022年は転記元にも記載がないため収録できていません。</p>
    <p>AI作成の参考解答、および個人ブログ由来のデータには誤りが含まれる可能性があります。お手元の教材と記述が異なる場合は教材を優先してください。</p>` },
  archive: { title: "過去問アーカイブの使い方", body: `
    <ul>
      <li>本試験で実際に発表された正解（模範解答）を年度別に閲覧できます。<b>AI作成ではない実物のデータ</b>です</li>
      <li>年度をタップして開き、ワインをタップすると全項目の正解が表示されます</li>
      <li>📜 <b>実物過去問</b> — 一般公開されている正解PDF（2015・2017・2018年の21本）から収録</li>
      <li>📝 <b>転記・未検証</b> — 2019年以降の正解はJ.S.A.会員限定公開のため、個人ブログが記事中に転記した内容から収録（2021〜2025年の8本）。<b>原本と照合していません</b>。公式PDFを入手できたら差し替えてください</li>
      <li>ワイン名の前の「WE③」「ソムリエ②」は試験区分と出題番号です</li>
      <li>項目・用語は出題当時の解答用紙の様式のままなので、現在のシート（コメント練習）と一部異なります</li>
    </ul>` },
  teppan: { title: "タイプ別テッパンの使い方", body: `
    <p>ワインを「淡い白／濃い白／淡い赤／濃い赤／特殊」の5タイプに振り分け、そのタイプで採用率の高いコメントを機械的に置くための早見表です。</p>
    <ul>
      <li>上のタブでタイプを切り替えます</li>
      <li><b>判定サイン</b>で目の前のワインがどのタイプかを決めてから、<b>項目別テッパン</b>を上から置いていきます</li>
      <li>各項目の下の細い行は<b>条件分岐</b>です。下位タイプ（軽やか型／骨格型など）で選ぶ用語が変わる箇所を書いています</li>
    </ul>
    <p>⚠ この内容は<b>協会の公式見解ではありません</b>。個人ブログの筆者が過去5年の模範解答から逆算した分析で、採用率の数値も筆者の集計です。実物の正解は「🗄️ 過去問アーカイブ」で確認してください。</p>` },
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
  if (view === "archive") return "archive";
  if (view === "teppan") return "teppan";
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

// ---------------- 解答の出所バッジ ----------------
// データの出所を見分けるための表示
//   real        : 一般公開されている実物の模範解答（PAST_ANSWERS の 2015/2017/2018年）
//   transcribed : 会員専用公開分を個人ブログが転記したもの（PAST_ANSWERS の 2021〜2025年）
//   teppan      : 個人ブログが過去問から逆算した定石（TEPPAN）
//   ai          : AI参考解答（WINES / GRAPES）
function srcBadge(kind) {
  if (kind === "real") return '<span class="src-badge real">📜 実物過去問</span>';
  if (kind === "transcribed") return '<span class="src-badge transcribed">📝 転記・未検証</span>';
  if (kind === "teppan") return '<span class="src-badge teppan">🧭 ブログ分析の定石</span>';
  return '<span class="src-badge ai">🤖 AI参考解答</span>';
}

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
  } else {
    // 上記以外の一覧系画面（wineList / flashcards / quizStart / teppan / stats /
    // compare / archive / guide）はメニューへ戻る。画面を足したときの戻し忘れを防ぐため
    // 画面名の列挙ではなく既定の動作にしている
    showLauncher();
  }
});

btnGrade.addEventListener("click", () => showResult());

// ---------------- launcher ----------------
const FEATURES = [
  { id: "comment", icon: "📝", title: "テイスティングコメント選択練習", desc: "本番の解答用紙を模した用語シートで練習", active: true, src: "ai" },
  { id: "flashcard", icon: "🃏", title: "主要品種フラッシュカード", desc: "品種ごとの特徴を暗記", active: true, src: "ai" },
  { id: "quiz", icon: "❓", title: "品種当てクイズ", desc: "コメントから品種を推測", active: true, src: "ai" },
  { id: "teppan", icon: "🧭", title: "タイプ別テッパンコメント", desc: "4タイプ＋特殊の定石を暗記", active: true, src: "teppan" },
  { id: "stats", icon: "📊", title: "過去の出題品種 傾向データ", desc: "出題実績をチェック", active: true, src: "real" },
  { id: "compare", icon: "📖", title: "模範解答 比較閲覧", desc: "品種×生産地でコメント正解を見比べ", active: true, src: "ai" },
  { id: "archive", icon: "🗄️", title: "過去問アーカイブ", desc: "本試験の実物の正解（2015〜2025年の29本）", active: true, src: "real" },
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
          ${f.src ? srcBadge(f.src) : ""}
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
      if (tile.dataset.feature === "archive") showArchive();
      if (tile.dataset.feature === "teppan") showTeppan();
    });
  });
  window.scrollTo(0, 0);
}

// ---------------- teppan (タイプ別テッパンコメント) ----------------
const tpState = { id: null };

function showTeppan() {
  view = "teppan";
  headerTitle.textContent = "タイプ別テッパン";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  if (!tpState.id) tpState.id = TEPPAN[0].id;
  renderTeppan();
}

function renderTeppan() {
  const t = TEPPAN.find(x => x.id === tpState.id) || TEPPAN[0];

  let itemsHtml = "", lastG = null;
  for (const it of t.items) {
    if (it.g !== lastG) { itemsHtml += `<div class="tp-group">${it.g}</div>`; lastG = it.g; }
    itemsHtml += `
      <div class="tp-row">
        <div class="tp-item">${it.item}</div>
        <div class="tp-base">${it.base}</div>
        ${it.branch ? `<div class="tp-branch">${it.branch}</div>` : ""}
      </div>`;
  }

  screen.innerHTML = `
    <p class="home-lead">タイプを見極めてから、その型のコメントを機械的に置いていくための早見表です。${srcBadge("teppan")}</p>
    <div class="tp-tabs">
      ${TEPPAN.map(x => `
        <button class="chip tp-tab ${x.id === t.id ? "active" : ""}" data-tp="${x.id}">${x.icon} ${x.title}</button>
      `).join("")}
    </div>

    <div class="section-card">
      <div class="section-head"><span class="section-title">${t.icon} ${t.title}｜${t.subtitle}</span></div>
      <p class="tp-lead">${t.lead}</p>
      <div class="tp-sub">代表品種</div>
      <p class="tp-text">${t.grapes}</p>
      <div class="tp-sub">このタイプと判定するサイン</div>
      <ul class="tp-list">${t.signs.map(s => `<li>${s}</li>`).join("")}</ul>
      <div class="tp-sub">下位タイプ</div>
      <ul class="tp-list">${t.subtypes.map(s => `<li><b>${s.name}</b> — ${s.grapes}</li>`).join("")}</ul>
    </div>

    <h2 class="group-title">項目別テッパン</h2>
    <div class="section-card tp-table">${itemsHtml}</div>

    <h2 class="group-title">過去5年から読み取れる法則</h2>
    <div class="section-card">
      <ul class="tp-list">${t.laws.map(l => `<li>${l}</li>`).join("")}</ul>
      <div class="tp-caution">⚠ ${t.caution}</div>
    </div>

    <p class="reveal-note">出典: <a href="https://niraikanao-ch1.com/tastingmatome-2026/" target="_blank" rel="noopener">個人ブログ「ニライカナイCH」2026年版 二次試験対策シリーズ</a>（2026年9月取得）。<b>協会の公式見解ではなく、筆者が過去5年の模範解答から逆算した分析</b>です。採用率の数値も筆者の集計で、こちらで検証していません。実物の正解は「🗄️ 過去問アーカイブ」を参照してください。用語の表記はこのアプリの用語シート（data.js の VOCAB）に合わせているため、本番の用紙とは一部異なります。</p>
  `;

  screen.querySelectorAll(".tp-tab").forEach(b => {
    b.addEventListener("click", () => {
      tpState.id = b.dataset.tp;
      renderTeppan();
      window.scrollTo(0, 0);
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
    <div class="fc-back-name">${g.name} ${srcBadge("ai")}</div>
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
      document.getElementById("quiz-explain").innerHTML =
        `${srcBadge(wine.origin === "past" ? "transcribed" : "ai")} 正解：${wine.name} — ${wine.note}`;
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

  const itemRow = item => `
    <div class="stat-exam-item">
      <span>${item.type === "white" ? "🥂" : item.type === "red" ? "🍷" : "🥃"}</span>
      <span class="stat-exam-no">${item.no ? `${item.no}` : ""}</span>
      <span class="stat-exam-name">${item.name}</span>
      <span class="stat-exam-country">${item.country || "その他の酒類"}</span>
      <span class="stat-exam-vintage">${item.vintage ? `${item.vintage}` : ""}</span>
    </div>
  `;

  const yearHtml = PAST_EXAMS.map(exam => `
    <div class="section-card">
      <div class="section-head"><span class="section-title">${exam.year}年</span></div>
      <div class="stat-exam-sub">ワインエキスパート</div>
      ${exam.items.map(itemRow).join("")}
      ${exam.sommelier ? `
        <div class="stat-exam-sub sommelier">ソムリエ</div>
        ${exam.sommelier.map(itemRow).join("")}
      ` : ""}
    </div>
  `).join("");

  screen.innerHTML = `
    <p class="home-lead">ワインエキスパート二次試験の出題実績（${minYear}〜${maxYear}年）です。頻出品種を優先して対策しましょう。</p>
    <h2 class="group-title">品種別ランキング</h2>
    ${rankingHtml("white", "白ワイン", "🥂")}
    ${rankingHtml("red", "赤ワイン", "🍷")}
    <h2 class="group-title">年度別の出題</h2>
    <p class="reveal-note">左の数字は出題番号、右の数字はヴィンテージです。ランキングの集計対象はワインエキスパートの出題のみで、ソムリエ試験分は参考表示です。</p>
    ${yearHtml}
    <p class="reveal-note">出典: 品種・生産国は <a href="https://www.wine-jyuken.com/second_exam/kakonosyutudai" target="_blank" rel="noopener">ワイン受験.com「過去の出題ワインの品種と生産国」</a>（2026年8月取得）。ヴィンテージ・出題番号・ソムリエ試験分は<a href="https://niraikanao-ch1.com/tastingmatome-2026/" target="_blank" rel="noopener">個人ブログ「ニライカナイCH」2026年版シリーズ</a>（2026年9月取得）から補いました。後者は未検証の転記です（品種・生産国が両者で一致することは確認済み）。シラーズはシラーとして集計しています。最新情報や訂正は data.js の PAST_EXAMS を編集してください。</p>
  `;
  window.scrollTo(0, 0);
}

// ---------------- archive (過去問アーカイブ) ----------------
function showArchive() {
  view = "archive";
  headerTitle.textContent = "過去問アーカイブ";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const years = [...new Set(PAST_ANSWERS.map(a => a.examYear))].sort((a, b) => b - a);
  const circled = ["", "①", "②", "③", "④", "⑤"];
  const examLabel = a => {
    const e = a.exam === "sommelier" ? "ソムリエ" : a.exam === "we" ? "WE" : "";
    if (!e) return "";
    return `<span class="ar-exam">${e}${circled[a.no] || ""}</span>`;
  };
  screen.innerHTML = `
    <p class="home-lead">本試験で実際に発表された正解（模範解答）です。全${PAST_ANSWERS.length}本。ソムリエ・ワインエキスパート両方の出題を含みます。</p>
    <p class="reveal-note">📜 は一般公開されている正解PDF（2015・2017・2018年）から、📝 は2019年以降の会員専用公開分を個人ブログが転記したものからの収録です。<b>📝 は原本と照合していない未検証データ</b>なので、公式PDFを入手できたら差し替えてください。</p>
    ${years.map((y, yi) => `
      <details class="cmp-acc" ${yi === 0 ? "open" : ""}>
        <summary>📅 ${y}年出題（${PAST_ANSWERS.filter(a => a.examYear === y).length}本）</summary>
        <div class="cmp-acc-body ar-year">
          ${PAST_ANSWERS.filter(a => a.examYear === y).map((a, i) => `
            <details class="ar-wine">
              <summary>${a.color === "white" ? "🥂" : "🍷"} ${examLabel(a)} ${a.grape}（${a.country}）<span class="ar-vintage">${a.vintage}</span> ${srcBadge(a.source === "blog" ? "transcribed" : "real")}</summary>
              <div class="ar-body">
                ${a.note ? `<div class="ar-note">⚠ ${a.note}</div>` : ""}
                ${(() => {
                  let html = "", lastG = null;
                  for (const [g, title, terms] of a.sections) {
                    if (g !== lastG) { html += `<div class="ar-group">${g}</div>`; lastG = g; }
                    html += `<div class="ar-row"><span class="ar-title">${title}</span><span class="ar-terms">${terms.join("、")}</span></div>`;
                  }
                  return html;
                })()}
              </div>
            </details>
          `).join("")}
        </div>
      </details>
    `).join("")}
    <p class="reveal-note">出典: 📜 は <a href="https://www.wine-jyuken.com/second_exam/kakonoseikai" target="_blank" rel="noopener">ワイン受験.com「過去の出題のテイスティングコメントの正解（模範解答）」</a>。📝 は<a href="https://niraikanao-ch1.com/tastingmatome-2026/" target="_blank" rel="noopener">個人ブログ「ニライカナイCH」2026年版シリーズ</a>（2026年9月取得）。項目・用語は出題当時の解答用紙の様式のままです（現在のシートと一部異なります）。2016年・2019年・2020年・2022年は正解を収録できていません。</p>
  `;
  window.scrollTo(0, 0);
}

// ---------------- guide (使い方ページ) ----------------
function showGuide() {
  view = "guide";
  headerTitle.textContent = "使い方";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  const order = ["launcher", "data", "comment", "sheet", "flashcards", "quiz", "teppan", "stats", "compare", "archive"];
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
  // 実物の模範解答から作った練習ワイン（origin: "past"）は生産地が重複するため比較表からは除く
  const grapes = [];
  for (const color of ["white", "red"]) {
    for (const g of VOCAB[color].find(s => s.id === "grape").terms) {
      if (WINES.some(w => w.origin !== "past" && w.color === color && w.answers.grape[0] === g)) grapes.push({ name: g, color });
    }
  }
  if (!cmpGrape || !grapes.some(g => g.name === cmpGrape)) cmpGrape = grapes[0].name;
  const currentColor = grapes.find(g => g.name === cmpGrape).color;

  const grapeChipsHtml = (color) => grapes.filter(g => g.color === color)
    .map(g => `<button class="chip cmp-grape" data-g="${g.name}">${g.name}</button>`).join("");
  const whiteGrapes = grapes.filter(g => g.color === "white");
  const redGrapes = grapes.filter(g => g.color === "red");

  screen.innerHTML = `
    <p class="home-lead">品種を選ぶと、生産地ごとの模範解答コメントを並べて比較できます。<span class="cmp-diff">色付き</span>の用語は生産地間で答えが異なる箇所です。 ${srcBadge("ai")}</p>
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
  const wines = WINES.filter(w => w.origin !== "past" && w.answers.grape[0] === cmpGrape);
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
      <div class="b-label">出題ワイン ${srcBadge(wine.origin === "past" ? "transcribed" : "ai")}</div>
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
          <span class="section-count" data-count>0/${pickFor(wine, sec)}</span>
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
    const pick = pickFor(wine, sec);
    selections[secId] = new Set();
    card.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const term = chip.dataset.term;
        const set = selections[secId];
        if (set.has(term)) {
          set.delete(term);
          chip.classList.remove("on");
        } else {
          if (set.size >= pick) {
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
        countEl.textContent = `${set.size}/${pick}`;
        countEl.classList.toggle("full", set.size === pick);
        updateProgress();
      });
    });
  });

  updateProgress();
  window.scrollTo(0, 0);
}

// 項目ごとの選択数。実物の模範解答から作った練習ワイン（origin: "past"）だけは
// 用語シート既定の pick ではなく、その年の正解の語数に合わせる
function pickFor(wine, sec) {
  if (wine && wine.origin === "past") {
    const a = wine.answers[sec.id];
    if (a && a.length) return a.length;
  }
  return sec.pick;
}

function updateProgress() {
  const vocab = VOCAB[currentWine.color];
  const done = vocab.filter(s => selections[s.id] && selections[s.id].size === pickFor(currentWine, s)).length;
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
      <div class="s-detail">模範解答 ${totalModel} 語中 ${totalHit} 語一致 ${srcBadge(wine.origin === "past" ? "transcribed" : "ai")}</div>
    </div>
    <div class="legend">
      <span class="l-ok">正解（選択して一致）</span>
      <span class="l-miss">選び漏れ</span>
      <span class="l-wrong">誤って選択</span>
    </div>
    ${wine.origin === "past" ? `<div class="ar-note">📝 この正解は本試験で発表された模範解答ですが、会員限定公開分を個人ブログが転記した内容から収録したもので、原本と照合していません。${wine.caveat ? `<br>${wine.caveat}` : ""}</div>` : ""}
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
