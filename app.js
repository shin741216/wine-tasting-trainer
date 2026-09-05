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
      <li>🗄️ <b>過去問アーカイブ</b> — 本試験で実際に発表された模範解答（2015〜2025年の52本）</li>
    </ul>
    <p>各画面の右上 ⓘ でその画面の使い方が見られます。採点や解説の元になっているデータの出所は、📘使い方の「収録データについて」をご覧ください。</p>` },
  comment: { title: "コメント選択練習の使い方", body: `
    <p>本番の解答用紙を模した用語シートでコメントを作り、模範解答と照合して採点する練習です。</p>
    <ul>
      <li><b>ワインを選ぶ</b> — 銘柄を見て選ぶか、「ランダム出題」でブラインド練習ができます。ランダムは白・赤を選んでから出題されます</li>
      <li><b>ブラインドテイスティングでの使い方</b> — 実際にワインを飲みながらランダム出題でシートを記入→採点すると本番に近い練習になります</li>
      <li><b>結果の一時保存</b> — 採点結果は自動で一時保存され、この画面に一覧表示されます。複数本の練習が終わったら「練習完了」で記録を削除できます</li>
      <li><b>一覧の末尾の27本</b>（名前に「2025年ソムリエ①」のように年度が入っているもの）は、AI参考解答ではなく<b>本試験の模範解答そのもの</b>で採点します。項目ごとの選択数もその年の正解の語数になります</li>
    </ul>
    <p><b>データの出所</b> — 一覧の各ワインにバッジが付いています。<span class="src-badge ai">🤖 AI参考解答</span> はAIが試験対策の定石に基づいて作成した参考解答、<span class="src-badge transcribed">📝 転記・未検証</span> は本試験で実際に発表された模範解答ですが、会員限定公開分を個人ブログが転記した内容から収録しており原本と照合していません。</p>` },
  sheet: { title: "用語シートの使い方", body: `
    <p>各項目で指定された数（例：2/2）の用語を選びます。</p>
    <ul>
      <li>選択数の上限に達した状態で別の用語をタップすると、最も古い選択と入れ替わります</li>
      <li>全項目を記入したら画面下の「採点する」をタップ。未記入があっても採点できます</li>
      <li>中断するときは左上の ◀（記入内容は破棄されます）</li>
      <li>採点結果は「正解（緑）／選び漏れ（黄）／誤って選択（赤）」で色分け表示されます</li>
    </ul>
    <p>※「いくつ選べ」の数は本番で年により変わるため目安です。ただし <span class="src-badge transcribed">📝 転記・未検証</span> が付いた実物由来のワインだけは、目安ではなく<b>その年の正解の語数</b>を使います（色調が4語なら「0/4」）。</p>
    <p><b>データの出所</b> — 採点に使う模範解答の出所は、画面上部の「出題ワイン」欄のバッジで確認できます。用語シートの項目・用語・並び順はワイン受験.com公開の「テイスティング解答用紙 2026年版」に準拠しています。</p>` },
  flashcards: { title: "品種フラッシュカードの使い方", body: `
    <ul>
      <li><b>カードをタップ</b>すると裏返り、外観・香り・味わい・決め手・主産地が表示されます</li>
      <li><b>すべて／白／赤</b> と <b>生産地</b> の2軸で絞り込めます</li>
      <li>複数の生産国を持つ品種は、裏面に<b>生産地による違い</b>が表示されます。生産地フィルタ選択中はその国がハイライトされます</li>
      <li>🔀 シャッフルで並びをランダムにできます</li>
    </ul>
    <p><b>データの出所</b> — カードの特徴文と生産地による違いは <span class="src-badge ai">🤖 AI参考解答</span>（AI執筆の参考情報）です。本試験で実際に発表された正解は「🗄️ 過去問アーカイブ」で確認できます。</p>` },
  quiz: { title: "品種当てクイズの使い方", body: `
    <ul>
      <li>出題範囲（すべて／白のみ／赤のみ）を選ぶとスタート。出題順はランダムです</li>
      <li>テイスティングコメントを読み、4択から品種を選びます</li>
      <li>回答すると正誤と正解ワインの解説が表示されます。解説の先頭のバッジで、そのコメントがAI参考解答か実物の模範解答かが分かります</li>
      <li>全問終了後にスコアが表示されます。中断は左上の ◀</li>
    </ul>
    <p><b>データの出所</b> — 出題コメントの大半は <span class="src-badge ai">🤖 AI参考解答</span> から組み立てています。名前に年度が入った27本だけは <span class="src-badge transcribed">📝 転記・未検証</span> で、本試験の模範解答から組み立てたものです。</p>` },
  stats: { title: "出題傾向データの見方", body: `
    <ul>
      <li><b>品種別ランキング</b> — 2011〜2025年の出題回数。バーの下の数字は出題年です。集計対象は<b>ワインエキスパートの出題のみ</b>で、ソムリエ試験分は含めていません</li>
      <li><b>年度別の出題</b> — 各年の出題ワイン（🥂白・🍷赤・🥃その他の酒類）。試験区分ごとに分けて表示します</li>
      <li>品種名の左の数字は<b>出題番号</b>、右の数字は<b>ヴィンテージ</b>です。空欄は出所が見つかっていない箇所です（2025年WE③のテンプラニーリョなど）</li>
      <li><b>📜 付きの品種名</b>はタップすると、過去問アーカイブのその正解へ直接移動します。アーカイブ側の「この正解で採点する練習へ」から、そのまま用語シートで練習できます</li>
    </ul>
    <p><b>データの出所</b> — 品種・生産国はワイン受験.com「過去の出題ワインの品種と生産国」。出題番号・ヴィンテージ・ソムリエ試験分は個人ブログ「ニライカナイCH」から補ったもので<b>未検証</b>です（品種・生産国が両者で一致することは確認済み）。画面下部に出典リンクがあります。頻出品種から優先して対策するのがおすすめです。</p>` },
  data: { title: "収録データについて（重要）", body: `
    <p>このアプリの出力が「何の情報をもとにしているか」の説明です。画面の各所に表示される出所バッジで見分けられます：<span class="src-badge ai">🤖 AI参考解答</span>＝AI作成の参考データ、<span class="src-badge real">📜 実物過去問</span>＝本試験で実際に発表された正解・実績データ、<span class="src-badge transcribed">📝 転記・未検証</span>＝会員限定公開の正解を個人ブログが転記したもの、<span class="src-badge teppan">🧭 ブログ分析の定石</span>＝個人ブログが過去問から逆算した分析。</p>
    <ul>
      <li><b>用語選択シート</b> — ワイン受験.com公開の「テイスティング解答用紙 2026年版」（白・赤）に項目・用語・並び順を準拠しています。ただし各項目の「いくつ選べ」の数は本番で年により変わるため、本アプリ独自の目安です</li>
      <li><b>模範解答（コメント練習用）</b> — コメント選択練習の採点・品種当てクイズ・模範解答比較閲覧で使われる正解データです。<b>実際の試験の正解ではなく、AI（Claude）がソムリエ・ワインエキスパート試験対策の定石に基づいて作成した参考解答</b>です。過去15年（2011〜2025年）に出題された品種×生産地の組み合わせは全てカバーしています</li>
      <li><b>品種フラッシュカード（26品種）</b> — 特徴文・生産地による違いも同じくAI執筆の参考情報です</li>
      <li><b>過去の出題実績（2011〜2025年）</b> — 品種と生産国はワイン受験.com「過去の出題ワインの品種と生産国」から。<b>ヴィンテージ・出題番号・ソムリエ試験分</b>は個人ブログ「ニライカナイCH」2026年版シリーズから補ったもので、こちらは未検証です（品種・生産国が両者で一致することは確認済み）</li>
      <li><b>タイプ別テッパン</b> — 同じ個人ブログが過去5年の模範解答から逆算した定石です。<b>協会の公式見解ではなく</b>、「採用率100%」などの数値も筆者の集計で、こちらで検証していません</li>
    </ul>
    <p><b>過去問アーカイブ</b> — 本試験で実際に発表された正解です。2015・2017・2018年の21本は一般公開されている正解PDFから（📜）、2021〜2025年の31本は会員限定公開の正解を個人ブログが記事中に転記した内容から収録しています（📝・原本と未照合）。2016年は正解未公表、2019・2020年は転記元にも記載がないため収録できていません。2021〜2025年では2025年WE③と2022年ソムリエ3本が未収録です。</p>
    <p>AI作成の参考解答、および個人ブログ由来のデータには誤りが含まれる可能性があります。お手元の教材と記述が異なる場合は教材を優先してください。</p>` },
  archive: { title: "過去問アーカイブの使い方", body: `
    <ul>
      <li>本試験で実際に発表された正解（模範解答）を年度別に閲覧できます。<b>AI作成ではない実物のデータ</b>です</li>
      <li>年度をタップして開き、ワインをタップすると全項目の正解が表示されます</li>
      <li>📜 <b>実物過去問</b> — 一般公開されている正解PDF（2015・2017・2018年の21本）から収録</li>
      <li>📝 <b>転記・未検証</b> — 2019年以降の正解はJ.S.A.会員限定公開のため、個人ブログが記事中に転記した内容から収録（2021〜2025年の31本）。<b>原本と照合していません</b>。公式PDFを入手できたら差し替えてください</li>
      <li>2021〜2025年で収録できていないのは、2025年WE③テンプラニーリョ（スペイン）と2022年ソムリエの3本です（転記元に記載なし）</li>
      <li>ワイン名の前の「WE③」「ソムリエ②」は試験区分と出題番号です</li>
      <li>正解の上にある<b>「この正解で採点する練習へ」</b>を押すと、その模範解答で採点する用語シートが開きます（2021〜2025年の27本。収穫年が用語シートの範囲外の2017年ヴィンテージなどは対象外）</li>
      <li>項目・用語は出題当時の解答用紙の様式のままなので、現在のシート（コメント練習）と一部異なります</li>
    </ul>
    <p><b>データの出所</b> — 📜 はワイン受験.com が一般公開している正解PDF、📝 は個人ブログ「ニライカナイCH」2026年版シリーズが記事中に転記した内容です。画面下部に出典リンクがあります。</p>` },
  teppan: { title: "タイプ別テッパンの使い方", body: `
    <p>ワインを「淡い白／濃い白／淡い赤／濃い赤／特殊」の5タイプに振り分け、そのタイプで採用率の高いコメントを機械的に置くための早見表です。</p>
    <ul>
      <li>上のタブでタイプを切り替えます</li>
      <li><b>判定サイン</b>で目の前のワインがどのタイプかを決めてから、<b>項目別テッパン</b>を上から置いていきます</li>
      <li>各項目の下の細い行は<b>条件分岐</b>です。下位タイプ（軽やか型／骨格型など）で選ぶ用語が変わる箇所を書いています</li>
    </ul>
    <p><b>データの出所</b> — 個人ブログ「ニライカナイCH」2026年版 二次試験対策シリーズ（<span class="src-badge teppan">🧭 ブログ分析の定石</span>）です。画面下部に出典リンクがあります。</p>
    <p>⚠ この内容は<b>協会の公式見解ではありません</b>。筆者が過去5年の模範解答から逆算した分析で、採用率の数値も筆者の集計です。実物の正解は「🗄️ 過去問アーカイブ」で確認してください。</p>` },
  realcmp: { title: "実物正解 品種×年度 横断の使い方", body: `
    <p>過去問アーカイブの正解（52本）を<b>品種ごとに年度横並び</b>で見比べる画面です。AI参考解答は含みません。</p>
    <ul>
      <li>品種のチップを選ぶと、その品種が出題された回の正解が列に並びます（列見出しは 年度・試験区分・番号・生産国・ヴィンテージ）</li>
      <li><b>色付きの太字</b>は、並んだすべての回で採用された語です。年をまたいで共通する語＝その品種の定石が、ブログの主張ではなく実データで見えます</li>
      <li>横に長い表は横スクロールできます</li>
      <li>「果実」「花・植物」が分かれていた旧様式（2015〜2018年）は「果実・花・植物」にまとめて並べています</li>
    </ul>
    <p><b>データの出所</b> — 📜 一般公開の正解PDF（2015・2017・2018年）と 📝 個人ブログの転記（2021〜2025年・未検証）を混ぜて並べています。列見出しのバッジで区別できます。</p>` },
  termstats: { title: "用語の採用率の見方", body: `
    <p>過去問アーカイブの正解から、<b>項目ごとに各用語が何本の正解で採用されたか</b>を数えた画面です。</p>
    <ul>
      <li>白／赤と、集計範囲（全年度／2021〜2025年の現行様式／2015〜2018年の旧様式）を切り替えられます</li>
      <li>バーの長さは「その用語を含む正解の本数 ÷ 集計対象の本数」です。協会の正解は1項目に複数の語を含むので、合計は100%を超えます</li>
      <li>「タンニン 力強い 100%」のようなテッパンの主張を、自分の手元のデータで検証する用途を想定しています</li>
    </ul>
    <p><b>データの出所</b> — 📜 一般公開の正解PDF と 📝 個人ブログの転記（未検証）を合算しています。旧様式の用語（「やや強め」など）はそのまま数えているので、現行の用語シートで比べたいときは範囲を「2021〜2025年」に絞ってください。</p>` },
  examset: { title: "本番セット練習の使い方", body: `
    <p>実際の試験と同じ組み合わせ・順番で通し練習をする画面です。年度と試験区分（ワインエキスパートは4本、ソムリエは3本）を選ぶと、その回の出題を番号順に出します。</p>
    <ul>
      <li>既定はブラインド（銘柄非公開・白か赤かだけ表示）。「銘柄を表示する」をオンにすると名前を見ながら練習できます</li>
      <li>1本ごとに採点結果が出て、「次のワインへ」で進みます。最後に全本のスコアと平均が出ます</li>
      <li>途中でやめるときは左上の ◀。セットは破棄されます</li>
      <li>模範解答が用語シートに載せられない回（2017年ヴィンテージなど）は、その本だけ飛ばして「3本中2本」のように出します</li>
    </ul>
    <p><b>データの出所</b> — 採点に使う正解はすべて <span class="src-badge transcribed">📝 転記・未検証</span>（個人ブログが転記した2021〜2025年の模範解答を用語シートの語に合わせたもの）です。読み替えた箇所は各採点結果の注記に出ます。</p>` },
  compare: { title: "模範解答 比較閲覧の使い方", body: `
    <ul>
      <li>「白ワイン品種」「赤ワイン品種」のタブを開いて品種を選びます</li>
      <li>その品種の模範解答が<b>生産地ごとに横並びの表</b>で表示されます（横スクロール可）</li>
      <li><b>赤色の用語</b>は生産地間で答えが異なる箇所＝生産地当ての決め手です</li>
    </ul>
    <p><b>データの出所</b> — この画面は <span class="src-badge ai">🤖 AI参考解答</span> だけを比較対象にしています。実物の模範解答から作った27本は、生産地が重複して表が読みにくくなるため除いています。本試験の正解は「🗄️ 過去問アーカイブ」で確認できます。</p>` },
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
  if (view === "realcmp") return "realcmp";
  if (view === "termstats") return "termstats";
  if (view === "examset" || view === "setSummary") return "examset";
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

// 画面下部に必ず出すデータの出所。どの画面でも出所が分かる状態を保つ
function srcNote(kind) {
  const notes = {
    wines: `<b>データの出所</b> — 模範解答の大半は ${srcBadge("ai")}（AIが試験対策の定石に基づいて作成した参考解答）です。
      名前に年度が入った27本だけは ${srcBadge("transcribed")} で、本試験で実際に発表された模範解答ですが、
      会員限定公開分を個人ブログが転記した内容から収録しており、原本と照合していません。`,
    grapes: `<b>データの出所</b> — カードの特徴文と生産地による違いは ${srcBadge("ai")}（AI執筆の参考情報）です。
      本試験で実際に発表された正解は「🗄️ 過去問アーカイブ」で確認できます。`,
  };
  return `<p class="reveal-note">${notes[kind]}</p>`;
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
  if (setState && (view === "sheet" || view === "result")) {
    if (view === "sheet" && !confirm("本番セット練習を中断してセット一覧に戻りますか？（このセットの記録は破棄されます）")) return;
    setState = null;
    showExamSets();
  } else if (view === "setSummary") {
    showExamSets();
  } else if (view === "sheet") {
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
  { id: "archive", icon: "🗄️", title: "過去問アーカイブ", desc: "本試験の実物の正解（2015〜2025年の52本）", active: true, src: "real" },
  { id: "realcmp", icon: "🔍", title: "実物正解 品種×年度 横断", desc: "同じ品種の模範解答を年度横並びで見比べ、共通する語を探す", active: true, src: "real" },
  { id: "termstats", icon: "📈", title: "用語の採用率", desc: "52本の実物正解から、項目ごとに各用語が採用された回数を集計", active: true, src: "real" },
  { id: "examset", icon: "🎓", title: "本番セット練習", desc: "年度と試験区分を選び、その回の出題を番号順にブラインドで通す", active: true, src: "transcribed" },
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
      if (tile.dataset.feature === "realcmp") showRealCompare();
      if (tile.dataset.feature === "termstats") showTermStats();
      if (tile.dataset.feature === "examset") showExamSets();
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

// ---------------- 過去問アーカイブの正規化（横断ビュー・採用率で共用） ----------------
// 旧様式（2015〜2018年）と現行様式で項目名が違う箇所を寄せる
const AR_ITEM_ALIAS = {
  "果実": "果実・花・植物", "花・植物": "果実・花・植物",
  "芳香・香辛料・化学物質": "香辛料・芳香・化学物質",
};
const AR_ITEMS = {
  white: ["清澄度", "輝き", "色調", "濃淡", "粘性", "外観の印象", "第一印象", "果実・花・植物", "香辛料・芳香・化学物質", "香りの印象",
          "アタック", "甘み", "酸味", "苦味", "バランス", "アルコール", "余韻", "評価", "適正温度", "グラス"],
  red:   ["清澄度", "輝き", "色調", "濃淡", "粘性", "外観の印象", "第一印象", "果実・花・植物", "香辛料・芳香・化学物質", "香りの印象",
          "アタック", "甘み", "酸味", "タンニン分", "バランス", "アルコール", "余韻", "評価", "適正温度", "グラス"],
};
const AR_GRAPE_ALIAS = { "メルロー": "メルロ", "シラー/シラーズ": "シラー", "シラーズ": "シラー", "サンジョベーゼ": "サンジョヴェーゼ" };
function arGrape(a) { const g = a.grape.replace(/[（(].*$/, ""); return AR_GRAPE_ALIAS[g] || g; }
function arItemMap(a) {
  const m = {};
  for (const [, title, terms] of a.sections) {
    const k = AR_ITEM_ALIAS[title] || title;
    (m[k] = m[k] || []).push(...terms.filter(t => !m[k].includes(t)));
  }
  return m;
}
function arColLabel(a) {
  const circled = ["", "①", "②", "③", "④", "⑤"];
  const e = a.exam === "sommelier" ? "ソムリエ" : a.exam === "we" ? "WE" : "";
  return `${a.examYear}年 ${e}${circled[a.no] || ""}`;
}

// ---------------- realcmp (実物正解 品種×年度 横断) ----------------
let rcGrape = null;

function showRealCompare() {
  view = "realcmp";
  headerTitle.textContent = "実物正解 品種×年度";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const counts = new Map();
  for (const a of PAST_ANSWERS) { const g = arGrape(a); counts.set(g, (counts.get(g) || 0) + 1); }
  const order = [...VOCAB.white.find(s => s.id === "grape").terms.map(g => ({ g, color: "white" })),
                 ...VOCAB.red.find(s => s.id === "grape").terms.map(g => ({ g: g.replace(/（.*$/, ""), color: "red" }))];
  const grapes = [];
  for (const { g, color } of order) if (counts.has(g) && !grapes.some(x => x.g === g)) grapes.push({ g, color, n: counts.get(g) });
  for (const [g, n] of counts) if (!grapes.some(x => x.g === g)) grapes.push({ g, color: PAST_ANSWERS.find(a => arGrape(a) === g).color, n });
  if (!rcGrape || !grapes.some(x => x.g === rcGrape)) rcGrape = grapes.sort((a, b) => b.n - a.n)[0].g;
  const chips = color => grapes.filter(x => x.color === color).sort((a, b) => b.n - a.n)
    .map(x => `<button class="chip rc-grape ${x.g === rcGrape ? "on" : ""}" data-g="${x.g}">${x.g}<span class="rc-n">${x.n}</span></button>`).join("");

  screen.innerHTML = `
    <p class="home-lead">品種を選ぶと、その品種が出題された回の<b>実物の模範解答</b>が年度横並びで表示されます。<span class="rc-common">色付きの太字</span>は並んだ全回で採用された語です。</p>
    <details class="cmp-acc" open><summary>🥂 白ワイン品種</summary><div class="fc-filters cmp-acc-body">${chips("white")}</div></details>
    <details class="cmp-acc" open><summary>🍷 赤ワイン品種</summary><div class="fc-filters cmp-acc-body">${chips("red")}</div></details>
    <div id="rc-body"></div>
    <p class="reveal-note"><b>データの出所</b> — 過去問アーカイブと同じ52本です。📜 は一般公開の正解PDF、📝 は個人ブログの転記（未検証）。旧様式の「果実」「花・植物」は「果実・花・植物」にまとめて並べています。</p>
  `;
  screen.querySelectorAll(".rc-grape").forEach(b => b.addEventListener("click", () => {
    rcGrape = b.dataset.g;
    screen.querySelectorAll(".rc-grape").forEach(x => x.classList.toggle("on", x.dataset.g === rcGrape));
    renderRealCompare();
  }));
  renderRealCompare();
  window.scrollTo(0, 0);
}

function renderRealCompare() {
  const list = PAST_ANSWERS.filter(a => arGrape(a) === rcGrape)
    .sort((a, b) => b.examYear - a.examYear || ((a.exam === "we") - (b.exam === "we")) || ((a.no || 0) - (b.no || 0)));
  const color = list[0].color;
  const maps = list.map(arItemMap);
  const items = [...AR_ITEMS[color]];
  for (const m of maps) for (const k of Object.keys(m)) if (!items.includes(k)) items.push(k);
  const commonCount = {};
  let rows = "";
  for (const item of items) {
    const cells = maps.map(m => m[item] || []);
    const common = list.length >= 2 ? cells[0].filter(t => cells.every(c => c.includes(t))) : [];
    commonCount[item] = common.length;
    rows += `<tr><th class="rc-item">${item}</th>${cells.map(c => `<td>${c.map(t => `<span class="${common.includes(t) ? "rc-common" : ""}">${t}</span>`).join("、") || "<span class='rc-none'>—</span>"}</td>`).join("")}</tr>`;
  }
  const totalCommon = Object.values(commonCount).reduce((s, n) => s + n, 0);
  document.getElementById("rc-body").innerHTML = `
    <div class="section-card">
      <div class="section-head"><span class="section-title">${color === "white" ? "🥂" : "🍷"} ${rcGrape}（${list.length}回）</span></div>
      ${list.length >= 2 ? `<p class="rc-summary">${list.length}回すべてで採用された語: <b>${totalCommon}語</b></p>` : `<p class="rc-summary">出題は1回のみです。比較対象がないため共通語は出しません。</p>`}
      <div class="rc-wrap"><table class="rc-table">
        <thead><tr><th class="rc-item"></th>${list.map(a => `<th>${arColLabel(a)}<br><span class="rc-sub">${a.country}・${a.vintage.replace(/（.*$/, "")}</span><br>${srcBadge(a.source === "blog" ? "transcribed" : "real")}</th>`).join("")}</tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>
  `;
}

// ---------------- termstats (用語の採用率) ----------------
const tsState = { color: "white", scope: "all" };

function showTermStats() {
  view = "termstats";
  headerTitle.textContent = "用語の採用率";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  screen.innerHTML = `
    <p class="home-lead">過去問アーカイブの正解（52本）から、項目ごとに<b>各用語が何本の正解で採用されたか</b>を数えています。協会の正解は1項目に複数の語を含むため、合計は100%を超えます。</p>
    <div class="fc-filters">
      <button class="chip ts-color" data-c="white">🥂 白</button>
      <button class="chip ts-color" data-c="red">🍷 赤</button>
    </div>
    <div class="fc-filters">
      <button class="chip ts-scope" data-s="all">全年度</button>
      <button class="chip ts-scope" data-s="recent">2021〜2025年（現行様式）</button>
      <button class="chip ts-scope" data-s="old">2015〜2018年（旧様式）</button>
    </div>
    <div id="ts-body"></div>
    <p class="reveal-note"><b>データの出所</b> — 過去問アーカイブと同じ52本（📜 一般公開の正解PDF＋📝 個人ブログの転記・未検証）を合算しています。旧様式の用語はそのまま数えているので、現行の用語シートで比べるときは範囲を「2021〜2025年」に絞ってください。</p>
  `;
  screen.querySelectorAll(".ts-color").forEach(b => b.addEventListener("click", () => { tsState.color = b.dataset.c; renderTermStats(); }));
  screen.querySelectorAll(".ts-scope").forEach(b => b.addEventListener("click", () => { tsState.scope = b.dataset.s; renderTermStats(); }));
  renderTermStats();
  window.scrollTo(0, 0);
}

function renderTermStats() {
  screen.querySelectorAll(".ts-color").forEach(b => b.classList.toggle("on", b.dataset.c === tsState.color));
  screen.querySelectorAll(".ts-scope").forEach(b => b.classList.toggle("on", b.dataset.s === tsState.scope));
  const list = PAST_ANSWERS.filter(a => a.color === tsState.color &&
    (tsState.scope === "all" || (tsState.scope === "recent" ? a.examYear >= 2021 : a.examYear <= 2018)));
  const n = list.length;
  const maps = list.map(arItemMap);
  const items = [...AR_ITEMS[tsState.color]];
  for (const m of maps) for (const k of Object.keys(m)) if (!items.includes(k)) items.push(k);
  let html = `<p class="ts-n">集計対象 <b>${n}本</b>（${tsState.color === "white" ? "白" : "赤"}・${{ all: "全年度", recent: "2021〜2025年", old: "2015〜2018年" }[tsState.scope]}）</p>`;
  for (const item of items) {
    const cnt = new Map();
    for (const m of maps) for (const t of (m[item] || [])) cnt.set(t, (cnt.get(t) || 0) + 1);
    if (cnt.size === 0) continue;
    const sorted = [...cnt.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"));
    html += `
      <div class="section-card">
        <div class="section-head"><span class="section-title">${item}</span></div>
        ${sorted.map(([t, c]) => `
          <div class="stat-row">
            <span class="stat-name ts-term">${t}</span>
            <span class="stat-bar-wrap"><span class="stat-bar ${tsState.color}" style="width:${Math.round((c / n) * 100)}%"></span></span>
            <span class="stat-count">${c}本<span class="ts-pct">${Math.round((c / n) * 100)}%</span></span>
          </div>`).join("")}
      </div>`;
  }
  document.getElementById("ts-body").innerHTML = html;
}

// ---------------- examset (本番セット練習) ----------------
// setState: { title, queue: [{no, wine}], index, results: [{wine,pct,hit,total}], blind }
let setState = null;
let esBlind = true;

function examSetList() {
  const sets = [];
  for (const exam of PAST_EXAMS) {
    for (const [kind, items] of [["we", exam.items], ["sommelier", exam.sommelier || []]]) {
      const wines = items.filter(i => i.type !== "other").map(i => ({
        no: i.no, name: i.name, country: i.country, type: i.type,
        wine: i.no ? WINES.find(w => w.origin === "past" && w.archiveKey === `${exam.year}|${kind}|${i.no}`) : null,
      }));
      if (wines.length && wines.some(w => w.wine)) sets.push({ year: exam.year, kind, wines });
    }
  }
  return sets;
}

function showExamSets() {
  view = "examset";
  setState = null;
  headerTitle.textContent = "本番セット練習";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  const sets = examSetList();
  const circled = ["", "①", "②", "③", "④", "⑤"];
  screen.innerHTML = `
    <p class="home-lead">年度と試験区分を選ぶと、その回の出題を<b>番号順に通しで</b>練習できます。採点はその回の実物の模範解答で行います。${srcBadge("transcribed")}</p>
    <label class="es-toggle"><input type="checkbox" id="es-blind" ${esBlind ? "checked" : ""}> ブラインド（銘柄非公開）で出題する</label>
    ${sets.map((s, i) => {
      const avail = s.wines.filter(w => w.wine).length;
      return `
      <div class="section-card es-card">
        <div class="section-head"><span class="section-title">${s.year}年 ${s.kind === "we" ? "ワインエキスパート" : "ソムリエ"}</span><span class="es-count">${avail} / ${s.wines.length}本</span></div>
        <div class="es-list">
          ${s.wines.map(w => `<div class="es-row ${w.wine ? "" : "es-na"}"><span>${w.type === "white" ? "🥂" : "🍷"}</span><span class="es-no">${circled[w.no] || "–"}</span><span class="es-name">${esBlind ? (w.type === "white" ? "白ワイン" : "赤ワイン") : `${w.name}（${w.country}）`}</span><span class="es-status">${w.wine ? "" : "正解を用語シートに載せられないため対象外"}</span></div>`).join("")}
        </div>
        <button class="btn-primary es-start" data-i="${i}">この回を通しで練習する</button>
      </div>`;
    }).join("")}
    <p class="reveal-note"><b>データの出所</b> — 出題の組み合わせは出題傾向データ（ワイン受験.com＋個人ブログ）、採点に使う正解は個人ブログが転記した模範解答を用語シートの語に合わせたもの（📝 転記・未検証）です。読み替えた箇所は各採点結果の注記に出ます。</p>
  `;
  document.getElementById("es-blind").addEventListener("change", e => { esBlind = e.target.checked; showExamSets(); });
  screen.querySelectorAll(".es-start").forEach(b => b.addEventListener("click", () => {
    const s = sets[+b.dataset.i];
    setState = {
      title: `${s.year}年 ${s.kind === "we" ? "WE" : "ソムリエ"}`,
      queue: s.wines.filter(w => w.wine).map(w => ({ no: w.no, wine: w.wine })),
      index: 0, results: [], blind: esBlind,
    };
    startPractice(setState.queue[0].wine, esBlind);
  }));
  window.scrollTo(0, 0);
}

function showSetSummary() {
  view = "setSummary";
  headerTitle.textContent = "セットの結果";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  const s = setState;
  const circled = ["", "①", "②", "③", "④", "⑤"];
  const avg = Math.round(s.results.reduce((sum, r) => sum + r.pct, 0) / s.results.length);
  screen.innerHTML = `
    <div class="score-card">
      <div class="s-wine">${s.title}${s.blind ? "（ブラインド）" : ""}</div>
      <div class="s-score">平均 ${avg}点</div>
      <div class="s-detail">${s.results.length}本 ${srcBadge("transcribed")}</div>
    </div>
    <div class="section-card">
      ${s.results.map((r, i) => `
        <div class="pr-row">
          <span>${r.wine.color === "white" ? "🥂" : "🍷"}</span>
          <span class="pr-name">${circled[s.queue[i].no] || ""} ${r.wine.name}</span>
          <span class="pr-score">${r.pct}点</span>
          <span class="pr-time">${r.hit}/${r.total}語</span>
        </div>`).join("")}
    </div>
    <div class="result-actions">
      <button class="btn-secondary" id="es-again">同じ回をもう一度</button>
      <button class="btn-primary" id="es-back">セット一覧へ</button>
    </div>
    <p class="reveal-note">各ワインの原本どおりの正解は「🗄️ 過去問アーカイブ」で確認できます（採点結果の一時保存にも1本ずつ記録されています）。</p>
  `;
  document.getElementById("es-again").addEventListener("click", () => {
    setState = { ...s, index: 0, results: [] };
    startPractice(setState.queue[0].wine, setState.blind);
  });
  document.getElementById("es-back").addEventListener("click", () => showExamSets());
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
    ${srcNote("grapes")}
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
    ${srcNote("wines")}
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
    ${srcNote("wines")}
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

  // 過去問アーカイブに同じ出題（年度・試験区分・番号）の正解があれば品種名をリンクにする
  const archiveKeyFor = (year, examKind, item) =>
    item.no && PAST_ANSWERS.some(a => a.examYear === year && a.exam === examKind && a.no === item.no)
      ? `${year}|${examKind}|${item.no}` : null;
  const itemRow = (item, year, examKind) => {
    const key = archiveKeyFor(year, examKind, item);
    return `
    <div class="stat-exam-item">
      <span>${item.type === "white" ? "🥂" : item.type === "red" ? "🍷" : "🥃"}</span>
      <span class="stat-exam-no">${item.no ? `${item.no}` : ""}</span>
      <span class="stat-exam-name">${key ? `<a href="#" class="stat-link" data-archive="${key}">${item.name} <span class="stat-link-mark">📜</span></a>` : item.name}</span>
      <span class="stat-exam-country">${item.country || "その他の酒類"}</span>
      <span class="stat-exam-vintage">${item.vintage ? `${item.vintage}` : ""}</span>
    </div>
  `;
  };

  const yearHtml = PAST_EXAMS.map(exam => `
    <div class="section-card">
      <div class="section-head"><span class="section-title">${exam.year}年</span></div>
      <div class="stat-exam-sub">ワインエキスパート</div>
      ${exam.items.map(i => itemRow(i, exam.year, "we")).join("")}
      ${exam.sommelier ? `
        <div class="stat-exam-sub sommelier">ソムリエ</div>
        ${exam.sommelier.map(i => itemRow(i, exam.year, "sommelier")).join("")}
      ` : ""}
    </div>
  `).join("");

  screen.innerHTML = `
    <p class="home-lead">ワインエキスパート二次試験の出題実績（${minYear}〜${maxYear}年）です。頻出品種を優先して対策しましょう。</p>
    <h2 class="group-title">品種別ランキング</h2>
    ${rankingHtml("white", "白ワイン", "🥂")}
    ${rankingHtml("red", "赤ワイン", "🍷")}
    <h2 class="group-title">年度別の出題</h2>
    <p class="reveal-note">左の数字は出題番号、右の数字はヴィンテージです。📜 付きの品種名はタップすると、過去問アーカイブのその正解へ移動します。ランキングの集計対象はワインエキスパートの出題のみで、ソムリエ試験分は参考表示です。</p>
    ${yearHtml}
    <p class="reveal-note">出典: 品種・生産国は <a href="https://www.wine-jyuken.com/second_exam/kakonosyutudai" target="_blank" rel="noopener">ワイン受験.com「過去の出題ワインの品種と生産国」</a>（2026年8月取得）。ヴィンテージ・出題番号・ソムリエ試験分は<a href="https://niraikanao-ch1.com/tastingmatome-2026/" target="_blank" rel="noopener">個人ブログ「ニライカナイCH」2026年版シリーズ</a>（2026年9月取得）から補いました。後者は未検証の転記です（品種・生産国が両者で一致することは確認済み）。シラーズはシラーとして集計しています。最新情報や訂正は data.js の PAST_EXAMS を編集してください。</p>
  `;
  screen.querySelectorAll(".stat-link").forEach(a => a.addEventListener("click", e => {
    e.preventDefault();
    showArchive(a.dataset.archive);
  }));
  window.scrollTo(0, 0);
}

// ---------------- archive (過去問アーカイブ) ----------------
// focusKey: "年度|exam|番号"。指定があればその正解を開いてスクロールする（出題傾向データからのリンク用）
function showArchive(focusKey) {
  view = "archive";
  headerTitle.textContent = "過去問アーカイブ";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const keyOf = a => a.exam && a.no ? `${a.examYear}|${a.exam}|${a.no}` : "";
  const practiceFor = a => WINES.find(w => w.origin === "past" && w.archiveKey === keyOf(a));
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
    ${years.map(y => `
      <details class="cmp-acc">
        <summary>📅 ${y}年出題（${PAST_ANSWERS.filter(a => a.examYear === y).length}本）</summary>
        <div class="cmp-acc-body ar-year">
          ${PAST_ANSWERS.filter(a => a.examYear === y)
            // 同じ年度内はソムリエ→WE、出題番号順に並べる（exam/no の無い古い年はファイル順のまま）
            .sort((a, b) => ((a.exam === "we") - (b.exam === "we")) || ((a.no || 0) - (b.no || 0)))
            .map((a, i) => `
            <details class="ar-wine" data-key="${keyOf(a)}">
              <summary>${a.color === "white" ? "🥂" : "🍷"} ${examLabel(a)} ${a.grape}（${a.country}）<span class="ar-vintage">${a.vintage}</span> ${srcBadge(a.source === "blog" ? "transcribed" : "real")}</summary>
              <div class="ar-body">
                ${a.note ? `<div class="ar-note">⚠ ${a.note}</div>` : ""}
                ${practiceFor(a) ? `<button class="btn-secondary ar-practice" data-id="${practiceFor(a).id}">📝 この正解で採点する練習へ</button>` : ""}
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
    <p class="reveal-note">出典: 📜 は <a href="https://www.wine-jyuken.com/second_exam/kakonoseikai" target="_blank" rel="noopener">ワイン受験.com「過去の出題のテイスティングコメントの正解（模範解答）」</a>。📝 は<a href="https://niraikanao-ch1.com/tastingmatome-2026/" target="_blank" rel="noopener">個人ブログ「ニライカナイCH」2026年版シリーズ</a>（2026年9月取得）。項目・用語は出題当時の解答用紙の様式のままです（現在のシートと一部異なります）。2016年・2019年・2020年、および2025年WE③・2022年ソムリエ3本は正解を収録できていません。</p>
  `;
  screen.querySelectorAll(".ar-practice").forEach(b => b.addEventListener("click", e => {
    e.preventDefault();
    const w = WINES.find(x => x.id === b.dataset.id);
    if (w) startPractice(w, false);
  }));
  if (focusKey) {
    const target = screen.querySelector(`.ar-wine[data-key="${focusKey}"]`);
    if (target) {
      target.open = true;
      target.closest("details.cmp-acc").open = true;
      target.scrollIntoView({ block: "start" });
      return;
    }
  }
  window.scrollTo(0, 0);
}

// ---------------- guide (使い方ページ) ----------------
function showGuide() {
  view = "guide";
  headerTitle.textContent = "使い方";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  const order = ["launcher", "data", "comment", "sheet", "flashcards", "quiz", "teppan", "stats", "compare", "archive", "realcmp", "termstats", "examset"];
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
    <p class="reveal-note"><b>データの出所</b> — この画面で見比べているのは ${srcBadge("ai")}（AIが試験対策の定石に基づいて作成した参考解答）だけです。本試験で実際に発表された正解は「🗄️ 過去問アーカイブ」で確認できます。お手元の教材と併せてご活用ください。</p>
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
    ${srcNote("wines")}
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
        <span class="wine-src">${srcBadge(w.origin === "past" ? "transcribed" : "ai")}</span>
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
  const blindName = wine.color === "white" ? "白ワイン（銘柄非公開）" : "赤ワイン（銘柄非公開）";
  const setLabel = setState ? `${setState.title}｜ワイン${"①②③④"[(setState.queue[setState.index].no || 1) - 1]}` : "出題ワイン";
  let html = `
    <div class="sheet-wine-banner">
      <div class="b-label">${setLabel} ${srcBadge(wine.origin === "past" ? "transcribed" : "ai")}</div>
      <div class="b-name">${blind ? blindName : wine.name}</div>
      ${setState ? `<div class="b-sub">${setState.index + 1} / ${setState.queue.length} 本目</div>` : ""}
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
    ${wine.origin === "past" ? `<div class="ar-note">📝 この正解は本試験で発表された模範解答ですが、会員限定公開分を個人ブログが転記した内容から収録したもので、原本と照合していません。${wine.caveat ? `<br>${wine.caveat}` : ""}${wine.archiveKey ? `<br><a href="#" id="btn-archive-link">🗄️ 過去問アーカイブで原本どおりの正解を見る</a>` : ""}</div>` : ""}
    ${sectionsHtml}
    ${setState ? `
    <div class="result-actions">
      <button class="btn-primary" id="btn-set-next">${setState.index + 1 < setState.queue.length ? `次のワイン（${"①②③④"[(setState.queue[setState.index + 1].no || 2) - 1]}）へ` : "セットの結果を見る"}</button>
    </div>` : `
    <div class="result-actions">
      <button class="btn-secondary" id="btn-retry">同じワインでもう一度</button>
      <button class="btn-primary" id="btn-next">ワイン選択へ</button>
    </div>`}
    ${srcNote("wines")}
  `;

  if (setState) {
    setState.results.push({ wine, pct, hit: totalHit, total: totalModel });
    document.getElementById("btn-set-next").addEventListener("click", () => {
      setState.index++;
      if (setState.index < setState.queue.length) startPractice(setState.queue[setState.index].wine, setState.blind);
      else showSetSummary();
    });
  } else {
    document.getElementById("btn-retry").addEventListener("click", () => startPractice(wine, wine._blind));
    document.getElementById("btn-next").addEventListener("click", () => showHome());
  }
  const archiveLink = document.getElementById("btn-archive-link");
  if (archiveLink) archiveLink.addEventListener("click", e => { e.preventDefault(); showArchive(wine.archiveKey); });
  window.scrollTo(0, 0);
}

showLauncher();
