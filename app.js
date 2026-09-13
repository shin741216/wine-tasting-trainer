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
      <li>📝 <b>テイスティングコメント選択練習</b> — 本番形式の用語シート（2種類）で解答し採点。ブラインド出題・一時保存・練習の記録つき</li>
      <li>🃏 <b>主要品種フラッシュカード</b> — 品種26種と 🥃 その他の酒類32種の特徴を暗記</li>
      <li>❓ <b>品種当てクイズ</b> — コメントから品種を4択で推測。🥃 その他の酒類モードもあり</li>
      <li>🧭 <b>タイプ別テッパンコメント</b> — 淡い白／濃い白／淡い赤／濃い赤／特殊の5タイプ別 定石早見表</li>
      <li>📊 <b>過去の出題品種 傾向データ</b> — 2011〜2025年の出題実績。品種別・生産国別・🥃 その他の酒類のランキングと年度別一覧</li>
      <li>📖 <b>模範解答 比較閲覧</b> — 品種×生産地でAI参考解答を見比べ</li>
      <li>🗄️ <b>過去問アーカイブ</b> — 本試験で実際に発表された模範解答（2015〜2025年の52本）</li>
      <li>🔍 <b>実物正解 品種×年度 横断</b> — 同じ品種の実物正解を年度横並びで見比べ、全回で共通する語を強調</li>
      <li>📈 <b>用語の採用率</b> — 52本の実物正解から、項目ごとに各用語が採用された回数を集計</li>
      <li>🎓 <b>本番セット練習</b> — 年度と試験区分を選び、その回の出題を番号順にブラインドで通す</li>
      <li>🍷 <b>テイスティング会メモ</b> — テイスティング会で取った手書きメモ6本を模範解答の形で閲覧・比較</li>
      <li>📘 <b>使い方</b> — 全機能の説明と「収録データについて」をまとめて読めます</li>
    </ul>
    <p>各画面の右上 ⓘ でその画面の使い方が見られます。採点や解説の元になっているデータの出所は、📘使い方の「収録データについて」をご覧ください。</p>
    <p><b>共有について</b> — 個人の勉強用に作ったアプリで、教材や解答用紙の用語をそのまま使っている箇所があります。SNSへの投稿や、不特定多数への転送はご遠慮ください。詳しくは📘使い方の「共有についてのお願い」をご覧ください。</p>
    <p><b>アプリの更新について</b> — 画面を開いたままにしていると、更新されても古い表示のままになります。アプリに戻ってきたタイミングで更新を確認し、あれば画面下にバーでお知らせします。「再読み込み」を押すと最新の表示になります。記入中の内容は自動で一時保存し、開いていた画面のまま戻ってくるので、そのまま続けられます。</p>` },
  comment: { title: "コメント選択練習の使い方", body: `
    <p>本番の解答用紙を模した用語シートでコメントを作り、模範解答と照合して採点する練習です。</p>
    <ul>
      <li><b>ワインを選ぶ</b> — 銘柄を見て選ぶか、「ランダム出題」でブラインド練習ができます。ランダムは白・赤を選んでから出題されます</li>
      <li><b>ブラインドテイスティングでの使い方</b> — 実際にワインを飲みながらランダム出題でシートを記入→採点すると本番に近い練習になります</li>
      <li><b>用語シートの切り替え</b> — 画面上部で「ワイン受験.com 2026年版」と「Wine-Flight 2025年版」を選べます。Wine-Flight版は本番同様に選択肢へ番号が付き、「果実」と「花・植物」が1項目に統合されています。模範解答は選んだシートの用語へ自動で読み替えて採点します</li>
      <li><b>練習の記録</b> — 採点結果は自動で記録され、この画面に一覧表示されます（白・赤それぞれ最新5回分。超えた分は古いものから自動で消えます）。行をタップすると当時の選択と採点結果を再表示できます。削除はあなたの操作でのみ行われます（🗑 で1件ずつ、または「記録を全て削除」）</li>
      <li><b>一覧の末尾の27本</b>（名前に「2025年ソムリエ①」のように年度が入っているもの）は、AI参考解答ではなく<b>本試験の模範解答そのもの</b>で採点します。項目ごとの選択数もその年の正解の語数になります</li>
      <li><b>テイスティング会メモの6本</b>はこの一覧には並びません。メニューの「🍷 テイスティング会メモ」にまとめてあり、そこから採点練習に進めます</li>
    </ul>
    <p><b>データの出所</b> — 一覧の各ワインにバッジが付いています。<span class="src-badge ai">🤖 AI参考解答</span> はAIが試験対策の定石に基づいて作成した参考解答、<span class="src-badge transcribed">📝 転記・未検証</span> は本試験で実際に発表された模範解答ですが、会員限定公開分を個人ブログが転記した内容から収録しており原本と照合していません。<span class="src-badge note">🍷 テイスティング会メモ</span> は自分のテイスティングメモ由来で、協会の正解ではありません。</p>` },
  sheet: { title: "用語シートの使い方", body: `
    <p>各項目で指定された数（例：2/2）の用語を選びます。</p>
    <ul>
      <li>選択数の上限に達した状態で別の用語をタップすると、最も古い選択と入れ替わります</li>
      <li><b>グラス</b>は2025年の試験から「小ぶり／中庸／大ぶり」から1つと「バルーン型／チューリップ型」から1つの<b>2語</b>を選ぶ指定になりました。シートでも2段に分けて表示し、同じ段の語をタップすると入れ替わります（実物の模範解答で採点する練習だけは、その年の正解の語数に合わせます）</li>
      <li>全項目を記入したら画面下の「採点する」をタップ。未記入があっても採点できます</li>
      <li><b>💾 一時保存</b> — 採点せずに途中の記入内容を保存します。ワイン選択画面の「練習の記録」に「一時保存」として並び、タップすると同じシート・同じ選択状態で再開できます。採点すると一時保存は採点済みの記録に置き換わります</li>
      <li><b>🔍 推定</b> — 入力し終えたら（または途中でも5語以上選べば）タップすると、あなたの選択を全解答データ（🤖AI参考解答、📜実物過去問、📝転記・未検証）と照合し、一致度の高い品種・生産地・収穫年の候補を出所バッジ付きで表示します。ブラインド練習で採点前に自分の見立てを確かめるのに使えます</li>
      <li>中断するときは左上の ◀（記入内容は破棄されます）</li>
      <li><b>アプリが更新されたとき</b> — 画面下に「新しいバージョンがあります」のバーが出ます。「再読み込み」を押すと、記入中の内容を自動で一時保存してから読み込み直し、同じシートの同じ記入状態で開き直します</li>
      <li>採点結果は「正解（緑）／選び漏れ（黄）／誤って選択（赤）」で色分け表示されます</li>
    </ul>
    <p>※「いくつ選べ」の数は本番で年により変わるため目安です。ただし <span class="src-badge transcribed">📝 転記・未検証</span> が付いた実物由来のワインだけは、目安ではなく<b>その年の正解の語数</b>を使います（色調が4語なら「0/4」）。</p>
    <p><b>データの出所</b> — 採点に使う模範解答の出所は、画面上部の「出題ワイン」欄のバッジで確認できます。用語シートは「ワイン受験.com 2026年版」または「Wine-Flight 2025年版」（ワイン選択画面で切り替え）に準拠し、どちらを使ったかは出題ワイン欄と採点結果に表示されます。</p>` },
  flashcards: { title: "品種フラッシュカードの使い方", body: `
    <ul>
      <li><b>カードをタップ</b>すると裏返り、外観・香り・味わい・決め手・主産地が表示されます</li>
      <li><b>すべて／白／赤／🥃 その他の酒類</b> と <b>生産地</b> の2軸で絞り込めます。その他の酒類（ブランデー・ウイスキー・スピリッツ・リキュールなど32種）は裏面に分類・原料・産地・外観・香り・味わい・度数・決め手が出ます。生産地フィルタはワイン用なので、その他の酒類には効きません</li>
      <li>複数の生産国を持つ品種は、裏面に<b>生産地による違い</b>が表示されます。生産地フィルタ選択中はその国がハイライトされます</li>
      <li>🔀 シャッフルで並びをランダムにできます</li>
    </ul>
    <p><b>データの出所</b> — カードの特徴文・生産地による違い・その他の酒類の特徴は <span class="src-badge ai">🤖 AI参考解答</span>（AI執筆の参考情報）です。本試験で実際に発表された正解は「🗄️ 過去問アーカイブ」で確認できます。</p>` },
  quiz: { title: "品種当てクイズの使い方", body: `
    <ul>
      <li>出題範囲（すべて／白のみ／赤のみ／🥃 その他の酒類）を選ぶとスタート。出題順はランダムです</li>
      <li>テイスティングコメントを読み、4択から品種を選びます。その他の酒類は外観・香り・味わい・度数から酒類名を当てます（誤答は同じ分類から優先して出ます）</li>
      <li>回答すると正誤と正解の解説が表示されます。解説の先頭のバッジで、そのコメントがAI参考解答か実物の模範解答かが分かります（その他の酒類は分類・原料・産地・決め手が出ます）</li>
      <li>全問終了後にスコアが表示されます。中断は左上の ◀</li>
    </ul>
    <p><b>データの出所</b> — 出題コメントの大半は <span class="src-badge ai">🤖 AI参考解答</span> から組み立てています。名前に年度が入った27本だけは <span class="src-badge transcribed">📝 転記・未検証</span> で、本試験の模範解答から組み立てたものです。その他の酒類32問はすべて <span class="src-badge ai">🤖 AI参考解答</span> です。テイスティング会メモの6本は出題されません。</p>` },
  stats: { title: "出題傾向データの見方", body: `
    <ul>
      <li><b>品種別ランキング</b> — 2011〜2025年の出題回数。バーの下の数字は出題年、その後ろは生産国の内訳です。集計対象は<b>ワインエキスパートの出題のみ</b>で、ソムリエ試験分は含めていません。🥃 その他の酒類も同じ方法で集計しています</li>
      <li><b>生産国別ランキング</b> — 同じ出題を生産国で数え直したものです（白・赤別）。出題年の後ろは品種の内訳です</li>
      <li><b>年度別の出題</b> — 各年の出題ワイン（🥂白・🍷赤・🥃その他の酒類）。試験区分ごとに分けて表示します</li>
      <li>品種名の左の数字は<b>出題番号</b>、右の数字は<b>ヴィンテージ</b>です。空欄は出所が見つかっていない箇所です（2025年WE③のテンプラニーリョなど）</li>
      <li><b>📜 付きの品種名</b>はタップすると、過去問アーカイブのその正解へ直接移動します。アーカイブ側の「この正解で採点する練習へ」から、そのまま用語シートで練習できます</li>
    </ul>
    <p><b>データの出所</b> — 品種・生産国はワイン受験.com「過去の出題ワインの品種と生産国」。出題番号・ヴィンテージ・ソムリエ試験分は個人ブログ「ニライカナイCH」から補ったもので<b>未検証</b>です（品種・生産国が両者で一致することは確認済み）。画面下部に出典リンクがあります。頻出品種から優先して対策するのがおすすめです。</p>` },
  data: { title: "収録データについて（重要）", body: `
    <p>このアプリの出力が「何の情報をもとにしているか」の説明です。画面の各所に表示される出所バッジで見分けられます：<span class="src-badge ai">🤖 AI参考解答</span>＝AI作成の参考データ、<span class="src-badge real">📜 実物過去問</span>＝本試験で実際に発表された正解・実績データ、<span class="src-badge transcribed">📝 転記・未検証</span>＝会員限定公開の正解を個人ブログが転記したもの、<span class="src-badge teppan">🧭 ブログ分析の定石</span>＝個人ブログが過去問から逆算した分析、<span class="src-badge note">🍷 テイスティング会メモ</span>＝テイスティング会で取った手書きメモを流し込んだ練習用データ。</p>
    <ul>
      <li><b>用語選択シート（2種類）</b> — 「ワイン受験.com 2026年版」はワイン受験.com公開の「テイスティング解答用紙 2026年版」（白・赤）に、「Wine-Flight 2025年版」はWine-Flight公開の「2025年版テイスティング用語選択シート（白・赤）」に、それぞれ項目・用語・並び順を準拠しています。模範解答はワイン受験.com版の用語で作られており、Wine-Flight版で採点するときは用語を自動で読み替えます（シートにない用語は採点対象外）。各項目の「いくつ選べ」の数は本番で年により変わるため、本アプリ独自の目安です。ただし<b>グラス</b>だけは2025年の試験から「大きさ1つ＋形1つ」の2語指定になったため、両シートともその形にしています</li>
      <li><b>模範解答（コメント練習用）</b> — コメント選択練習の採点・品種当てクイズ・模範解答比較閲覧で使われる正解データです。<b>実際の試験の正解ではなく、AI（Claude）がソムリエ・ワインエキスパート試験対策の定石に基づいて作成した参考解答</b>です。過去15年（2011〜2025年）に出題された品種×生産地の組み合わせは全てカバーしています</li>
      <li><b>テイスティング会メモ（6本）</b> — ${NOTE_SESSION.label} のテイスティング会で、${NOTE_SESSION.sheet}の用語選択シートに取った手書きメモを模範解答に流し込んだ練習ワインです。メモにある香りの語はそのまま、メモにない項目はタイプ別テッパンと実物過去問の定石で補っています。銘柄名は手書きの判読で、読み違いの可能性があります</li>
      <li><b>品種フラッシュカード（26品種）とその他の酒類（32種）</b> — 特徴文・生産地による違い・酒類の特徴も同じくAI執筆の参考情報です。その他の酒類は本試験で出題された19種（出題実績データより）に定番の候補を加えたものです</li>
      <li><b>過去の出題実績（2011〜2025年）</b> — 品種と生産国はワイン受験.com「過去の出題ワインの品種と生産国」から。<b>ヴィンテージ・出題番号・ソムリエ試験分</b>は個人ブログ「ニライカナイCH」2026年版シリーズから補ったもので、こちらは未検証です（品種・生産国が両者で一致することは確認済み）</li>
      <li><b>タイプ別テッパン</b> — 同じ個人ブログが過去5年の模範解答から逆算した定石です。<b>協会の公式見解ではなく</b>、「採用率100%」などの数値も筆者の集計で、こちらで検証していません</li>
    </ul>
    <p><b>過去問アーカイブ</b> — 本試験で実際に発表された正解です。2015・2017・2018年の21本は一般公開されている正解PDFから（📜）、2021〜2025年の31本は会員限定公開の正解を個人ブログが記事中に転記した内容から収録しています（📝・原本と未照合）。2016年は正解未公表、2019・2020年は転記元にも記載がないため収録できていません。2021〜2025年では2025年WE③と2022年ソムリエ3本が未収録です。</p>
    <p>AI作成の参考解答、および個人ブログ由来のデータには誤りが含まれる可能性があります。お手元の教材と記述が異なる場合は教材を優先してください。</p>` },
  sharing: { title: "共有についてのお願い", body: `
    <p>個人の勉強用に作ったアプリです。<b>市販の教材や解答用紙の用語をそのまま使っている箇所があり、著作権まわりの整理をしていません。</b></p>
    <ul>
      <li>用語選択シートの項目・用語・並び順は、ワイン受験.com「テイスティング解答用紙 2026年版」と Wine-Flight「2025年版 テイスティング用語選択シート」に準拠しています</li>
      <li>過去問アーカイブの模範解答には、会員限定公開分を個人ブログが記事中に転記した内容から収録したものが含まれます</li>
      <li>タイプ別テッパンも、同じ個人ブログの分析をもとにしています</li>
    </ul>
    <p>そのため、<b>SNSへの投稿や、不特定多数への転送はご遠慮ください</b>。身のまわりの方と使っていただく分には問題ありません。</p>
    <p>出所の詳細は「収録データについて」をご覧ください。</p>` },
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
      <li>列は画面に合わせて狭くしてあり、長い用語はセル内で折り返します。それでも収まらないときは横にスクロールできます</li>
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
  feedback: { title: "ご意見・不具合の報告の使い方", body: `
    <p>使っていて気づいたこと（不具合・追加してほしい機能・その他）を送るフォームです。送り先はこのアプリのGitHubリポジトリで、<b>Issue</b>として登録されます。</p>
    <ul>
      <li><b>種類</b>を選び、<b>件名</b>と<b>内容</b>を書きます。不具合のときは「何をしたら」「どうなると思ったか」「実際どうなったか」の3点があると直しやすくなります</li>
      <li><b>📮 GitHubでIssueを作る</b> — 入力内容を埋め込んだGitHubの新規Issue画面がブラウザで開きます。内容を確認して「Submit new issue」を押すと登録完了です（GitHubへのログインが必要です）</li>
      <li><b>📋 内容をコピー</b> — GitHubを使わないときはこちら。整形した文面がクリップボードに入るので、メールやメモに貼って渡せます</li>
      <li><b>自動で付く情報</b> — アプリのバージョン・用語シート・画面サイズ・ブラウザ・日時が付きます。中身は送信前に確認でき、チェックを外せば付けません</li>
      <li>書きかけの内容は自動で保存され、次に開いたときに残っています。送ったあとの控えもこの画面に残ります</li>
    </ul>
    <p>送られた内容はGitHubのIssueとして公開されます。個人情報や見られたくない内容は書かないでください。</p>` },
  notes: { title: "テイスティング会メモの見方", body: `
    <p><b>${NOTE_SESSION.label}</b> のテイスティング会（白3本・赤3本）で、${NOTE_SESSION.sheet}の用語選択シートに取った手書きメモを、<b>模範解答の形に流し込んで</b>並べた画面です。他の機能（コメント練習の一覧・クイズ・推定）には含めていません。</p>
    <ul>
      <li>上の用語シートで「Wine-Flight 2025年版」を選ぶと、本番と同じ<b>番号付き</b>で正解が表示されます</li>
      <li><b>📋 1本ずつ／📊 比較表</b>を切り替えられます。比較表は白3本・赤3本を横並びにし、同色の全本で共通する語を太字にします（列幅は画面に合わせて折り返すので横スクロールは不要です）</li>
      <li>「1本ずつ」で各ワインを開くと、<b>元のメモ</b>（手書きの転記）、<b>補い方</b>（メモにない項目をどの定石で埋めたか）、全項目の正解が見られます</li>
      <li>「この正解で採点する練習へ」で、その正解を使って用語シートの練習ができます。採点結果からはこの画面に戻ります</li>
      <li>メモは香りが中心なので、外観・味わい・総合評価はタイプ別テッパンと実物過去問の定石で補っています。銘柄名は手書きの判読で、読み違いの可能性があります</li>
    </ul>
    <p><b>データの出所</b> — <span class="src-badge note">🍷 テイスティング会メモ</span>（自分のテイスティングメモ）です。協会の正解でもAI参考解答でもありません。data.js の <code>origin: "note"</code> のワインを編集すると反映されます。</p>` },
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
      <li>その品種の模範解答が<b>生産地ごとに横並びの表</b>で表示されます。収まらないときは横にスクロールできます</li>
      <li><b>赤色の用語</b>は生産地間で答えが異なる箇所＝生産地当ての決め手です</li>
    </ul>
    <p><b>データの出所</b> — この画面は <span class="src-badge ai">🤖 AI参考解答</span> だけを比較対象にしています。実物の模範解答から作った27本とテイスティング会メモの6本は、生産地が重複して表が読みにくくなるため除いています。本試験の正解は「🗄️ 過去問アーカイブ」で確認できます。</p>` },
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
  if (view === "notes") return "notes";
  if (view === "feedback") return "feedback";
  return "launcher";
}

function openModal(title, bodyHtml) {
  document.getElementById("help-title").textContent = title;
  document.getElementById("help-body").innerHTML = bodyHtml;
  document.getElementById("help-modal").classList.remove("hidden");
}

function openHelp(key) {
  const h = HELP[key];
  if (!h) return;
  openModal(h.title, h.body);
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
//   note        : テイスティング会で取った手書きメモを流し込んだもの（WINES の origin:"note"）
//   ai          : AI参考解答（WINES / GRAPES）
function srcBadge(kind) {
  if (kind === "real") return '<span class="src-badge real">📜 実物過去問</span>';
  if (kind === "transcribed") return '<span class="src-badge transcribed">📝 転記・未検証</span>';
  if (kind === "teppan") return '<span class="src-badge teppan">🧭 ブログ分析の定石</span>';
  if (kind === "note") return '<span class="src-badge note">🍷 テイスティング会メモ</span>';
  return '<span class="src-badge ai">🤖 AI参考解答</span>';
}

// 練習ワイン（WINES）の出所バッジ種別
function srcKindOf(wine) {
  if (wine.origin === "past") return "transcribed";
  if (wine.origin === "note") return "note";
  return "ai";
}

// 画面下部に必ず出すデータの出所。どの画面でも出所が分かる状態を保つ
function srcNote(kind) {
  const notes = {
    wines: `<b>データの出所</b> — 模範解答の大半は ${srcBadge("ai")}（AIが試験対策の定石に基づいて作成した参考解答）です。
      名前に年度が入った27本だけは ${srcBadge("transcribed")} で、本試験で実際に発表された模範解答ですが、
      会員限定公開分を個人ブログが転記した内容から収録しており、原本と照合していません。
      テイスティング会の手書きメモから作った6本（${srcBadge("note")}）はこの一覧には含めず、メニューの「🍷 テイスティング会メモ」にまとめてあります。`,
    grapes: `<b>データの出所</b> — カードの特徴文と生産地による違い、その他の酒類の特徴は ${srcBadge("ai")}（AI執筆の参考情報）です。
      本試験で実際に発表された正解は「🗄️ 過去問アーカイブ」で確認できます。`,
  };
  return `<p class="reveal-note">${notes[kind]}</p>`;
}

// 比較表の列定義。列幅は colgroup で指定する。幅そのものは style.css の
// 「比較表の共通仕様」（--ct-item / --ct-col）で決める
function ctCols(dataCols) {
  return `<colgroup><col class="ct-col-item">${"<col>".repeat(dataCols)}</colgroup>`;
}
// 横スクロールする比較表の <table> に付ける幅。
// table-layout:fixed は幅が auto のままだと無効になり自動レイアウトに戻ってしまうので、
// 列数から幅を計算して確定させる（画面より狭くなるときは CSS の min-width:100% が効く）
function ctWidth(dataCols) {
  return `style="width: calc(var(--ct-item) + ${dataCols} * var(--ct-col))"`;
}

// ---------------- 選択からの品種・生産地・収穫年の推定 ----------------
// ユーザーの選択用語を、AI参考解答（WINES）と過去問の模範解答（PAST_ANSWERS＝
// 実物過去問＋転記・未検証）の両方と照合し、一致度の高い順に候補を表示する。
// WINES の origin:"past"（実物解答から作った練習ワイン）は PAST_ANSWERS と
// 重複するため候補から除く。表記ゆれは TERM_ALIASES で吸収する。
const TERM_ALIASES = {
  "すいかずら": "スイカズラ", "洋ナシ": "洋梨", "ハチミツ": "蜂蜜",
  "パン・ド・ミ": "パン・ドゥ・ミ", "丁字": "丁子", "すみれ": "スミレ",
  "アーモンド": "フレッシュ・アーモンド", "コリアンダー": "コリアンダーシード",
  "赤ピーマン": "ピーマン", "なめし革": "なめし皮", "カカオ": "チョコレート",
  "スムースな": "スムーズな", "溌剌とした": "はつらつとした",
  "骨格のしっかりとした": "骨格のしっかりした", "腐葉土": "スーボア",
  // Wine-Flight 2025 シートの表記 → 現行シートの表記
  "10.9%以下": "11%未満", "11.0-11.9%": "11%～12%未満", "12.0-12.9%": "12%～13%未満",
  "13.0-13.9%": "13%～14%未満", "14.0%以上": "14%以上",
  "8-10度": "8～10度", "11-14度": "11～14度", "15-18度": "15～18度",
  "10-13度": "10～13度", "14-16度": "14～16度", "17-20度": "17～20度",
  "コク（深み）を与える": "コク(深み)を与える", "強い（突出した）": "強い(突出した)",
  "ヘーゼル・ナッツ": "ヘーゼルナッツ",
};
const normTerm = (t) => TERM_ALIASES[t] || t;
const ESTIMATE_EXCLUDE = ["vintage", "country", "grape"]; // 結論欄は照合対象外

function runEstimate() {
  const wine = currentWine;
  const userTerms = new Set();
  for (const sec of sheetVocab(wine.color)) {
    if (ESTIMATE_EXCLUDE.includes(sec.id)) continue;
    for (const t of (selections[sec.id] || [])) userTerms.add(normTerm(t));
  }
  if (userTerms.size < 5) {
    openModal("推定するには選択が足りません", "<p>外観・香り・味わいの項目を5語以上選んでから推定してください。</p>");
    return;
  }

  const cands = [];
  for (const w of WINES) {
    if (w.color !== wine.color || w.origin === "past" || w.origin === "note") continue;
    const s = new Set();
    for (const [id, arr] of Object.entries(w.answers)) {
      if (ESTIMATE_EXCLUDE.includes(id)) continue;
      arr.forEach(t => s.add(normTerm(t)));
    }
    cands.push({ src: srcKindOf(w), grape: w.answers.grape[0], country: w.answers.country[0],
                 vintage: w.answers.vintage[0], color: w.color, terms: s });
  }
  for (const a of PAST_ANSWERS) {
    if (a.color !== wine.color) continue;
    const s = new Set();
    for (const [, , arr] of a.sections) arr.forEach(t => s.add(normTerm(t)));
    cands.push({ src: a.source === "blog" ? "transcribed" : "real", grape: a.grape, country: a.country,
                 vintage: `${a.vintage}／${a.examYear}年出題`, color: a.color, terms: s });
  }

  for (const c of cands) {
    let inter = 0;
    for (const t of userTerms) if (c.terms.has(t)) inter++;
    c.score = Math.round(200 * inter / (userTerms.size + c.terms.size)); // F1風の一致度%
    c.hit = inter;
  }
  cands.sort((x, y) => y.score - x.score);
  const top = cands.slice(0, 5);

  openModal("🔍 あなたの選択からの推定", `
    <p>選択された ${userTerms.size} 語と一致度の高い順に表示しています（同色の候補 全${cands.length}本と照合）。</p>
    <ol class="est-list">
      ${top.map(c => `
        <li class="est-row">
          <div class="est-main">${wine.color === "white" ? "🥂" : "🍷"} <b>${c.grape}</b>（${c.country}）</div>
          <div class="est-sub">収穫年: ${c.vintage}　一致 ${c.hit}語 <span class="est-score">${c.score}%</span> ${srcBadge(c.src)}</div>
        </li>
      `).join("")}
    </ol>
    <p class="est-note">※ 一致度は選択語と各解答データの重なりの割合です。推定を確認したら「採点する」で正解と照合できます。</p>
  `);
}

// ---------------- 練習結果の一時保存 ----------------
const RESULTS_KEY = "wtt-practice-results";

const RESULTS_PER_COLOR = 5; // 白・赤それぞれ最新5回分を保持

function loadResults() {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY)) || []; } catch { return []; }
}
function savePracticeResult(entry) {
  let list = loadResults();
  // 採点したら、同じワイン×シートの一時保存は役目を終えるので消す
  list = list.filter(r => !(r.draft && r.wineId === entry.wineId && r.sheet === entry.sheet));
  list.push(entry);
  // 採点済みは色ごとに最新 RESULTS_PER_COLOR 件だけ残す（古いものから自動で消える）。一時保存は対象外
  const drafts = list.filter(r => r.draft);
  const graded = ["white", "red"].flatMap(c => list.filter(r => !r.draft && r.color === c).slice(-RESULTS_PER_COLOR));
  list = [...graded, ...drafts].sort((a, b) => a.t - b.t);
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(list)); } catch {}
}
// 一時保存: 採点せずに途中の選択内容を保存する（同じワイン×シートの一時保存は上書き）
// silent=true では確認モーダルを出さない。更新の再読み込み前に自動保存するときに使う。
// 保存したら true、選択が空で保存しなかったら false を返す
function saveDraft(silent = false) {
  const wine = currentWine;
  if (!wine) return false;
  const sheet = activeSheet();
  const sel = Object.fromEntries(Object.entries(selections).map(([k, v]) => [k, [...v]]));
  const filled = Object.values(sel).filter(a => a.length).length;
  if (filled === 0) {
    if (!silent) openModal("一時保存するものがありません", "<p>1項目以上選択してから一時保存してください。</p>");
    return false;
  }
  let list = loadResults().filter(r => !(r.draft && r.wineId === wine.id && r.sheet === sheet.key));
  list.push({
    t: Date.now(), draft: true, wineId: wine.id, name: wine.name, color: wine.color,
    blind: !!wine._blind, sheet: sheet.key, sel,
    filled, total: sheetVocab(wine.color, sheet).length,
  });
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(list)); } catch {}
  if (silent) return true;
  openModal("💾 一時保存しました", `
    <p><b>${wine._blind ? (wine.color === "white" ? "白ワイン（銘柄非公開）" : "赤ワイン（銘柄非公開）") : wine.name}</b> の記入内容（${filled} / ${sheetVocab(wine.color, sheet).length} 項目）を保存しました。</p>
    <p>ワイン選択画面の「練習の記録」からいつでも再開できます。このまま記入を続けても構いません（再度一時保存すると上書きされます）。</p>`);
  return true;
}
// 一時保存から作業を再開する
function resumeDraft(rec) {
  const wine = WINES.find(w => w.id === rec.wineId);
  if (!wine) {
    openModal("再開できません", "<p>このワインは現在のデータに存在しないため、再開できません。</p>");
    return;
  }
  if (rec.sheet && SHEETS[rec.sheet]) setActiveSheet(rec.sheet);
  setState = null;
  startPractice(wine, !!rec.blind, rec);
}
function deleteResult(t) {
  const list = loadResults().filter(r => r.t !== t);
  try { localStorage.setItem(RESULTS_KEY, JSON.stringify(list)); } catch {}
}
function clearResults() {
  localStorage.removeItem(RESULTS_KEY);
}

// ---------------- 用語シートの選択 ----------------
const SHEET_KEY = "wtt-sheet";
function activeSheet() {
  let k = null;
  try { k = localStorage.getItem(SHEET_KEY); } catch {}
  return SHEETS[k] || SHEETS.jyuken2026;
}
function setActiveSheet(key) {
  try { localStorage.setItem(SHEET_KEY, key); } catch {}
}
function sheetVocab(color, sheet = activeSheet()) { return sheet.vocab[color]; }
// 模範解答を選択中シートの項目・用語に変換したもの（{answers, dropped}）
function modelAnswers(wine, sheet = activeSheet()) { return sheetAnswers(wine, sheet); }
// チップの表示（番号付きシートは本番同様に番号を前置）
function chipLabel(sheet, i, t) { return sheet.numbered ? `<span class="chip-no">${i + 1}</span>${t}` : t; }

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
    if (currentWine && currentWine.origin === "note") showNotes(); else showHome();
  } else if (view === "result") {
    if (currentWine && currentWine.origin === "note") showNotes(); else showHome();
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
document.getElementById("btn-estimate").addEventListener("click", () => {
  if (view === "sheet") runEstimate();
});
document.getElementById("btn-draft").addEventListener("click", () => {
  if (view === "sheet") saveDraft();
});

// ---------------- launcher ----------------
const FEATURES = [
  { id: "comment", icon: "📝", title: "テイスティングコメント選択練習", desc: "本番の解答用紙を模した用語シートで練習", active: true, src: "ai" },
  { id: "flashcard", icon: "🃏", title: "主要品種フラッシュカード", desc: "品種ごとの特徴を暗記（🥃 その他の酒類も）", active: true, src: "ai" },
  { id: "quiz", icon: "❓", title: "品種当てクイズ", desc: "コメントから品種を推測（🥃 その他の酒類も）", active: true, src: "ai" },
  { id: "teppan", icon: "🧭", title: "タイプ別テッパンコメント", desc: "4タイプ＋特殊の定石を暗記", active: true, src: "teppan" },
  { id: "stats", icon: "📊", title: "過去の出題品種 傾向データ", desc: "出題実績をチェック", active: true, src: "real" },
  { id: "compare", icon: "📖", title: "模範解答 比較閲覧", desc: "品種×生産地でコメント正解を見比べ", active: true, src: "ai" },
  { id: "archive", icon: "🗄️", title: "過去問アーカイブ", desc: "本試験の実物の正解（2015〜2025年の52本）", active: true, src: "real" },
  { id: "realcmp", icon: "🔍", title: "実物正解 品種×年度 横断", desc: "同じ品種の模範解答を年度横並びで見比べ、共通する語を探す", active: true, src: "real" },
  { id: "termstats", icon: "📈", title: "用語の採用率", desc: "52本の実物正解から、項目ごとに各用語が採用された回数を集計", active: true, src: "real" },
  { id: "examset", icon: "🎓", title: "本番セット練習", desc: "年度と試験区分を選び、その回の出題を番号順にブラインドで通す", active: true, src: "transcribed" },
  { id: "notes", icon: "🍷", title: "テイスティング会メモ", desc: "テイスティング会の手書きメモ6本を模範解答の形で閲覧（番号付き）", active: true, src: "note" },
  { id: "guide", icon: "📘", title: "使い方", desc: "各機能の説明・操作方法", active: true },
  { id: "feedback", icon: "📮", title: "ご意見・不具合の報告", desc: "気づいたことを送る。GitHubのIssueとして届きます", active: true },
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
    <button class="share-note" id="btn-share-note">
      <span class="share-note-icon">🤝</span>
      <span class="share-note-text"><b>個人の勉強用に作ったアプリです。</b>SNSや不特定多数への共有はご遠慮ください。</span>
      <span class="share-note-more">詳しく</span>
    </button>
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

  document.getElementById("btn-share-note").addEventListener("click", () => openHelp("sharing"));

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
      if (tile.dataset.feature === "notes") showNotes();
      if (tile.dataset.feature === "feedback") showFeedback();
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
    rows += `<tr><th class="rc-item">${item}</th>${cells.map(c => `<td>${c.map(t => `<span class="ct-term ${common.includes(t) ? "rc-common" : ""}">${t}</span>`).join("") || "<span class='rc-none'>—</span>"}</td>`).join("")}</tr>`;
  }
  const totalCommon = Object.values(commonCount).reduce((s, n) => s + n, 0);
  document.getElementById("rc-body").innerHTML = `
    <div class="section-card">
      <div class="section-head"><span class="section-title">${color === "white" ? "🥂" : "🍷"} ${rcGrape}（${list.length}回）</span></div>
      ${list.length >= 2 ? `<p class="rc-summary">${list.length}回すべてで採用された語: <b>${totalCommon}語</b></p>` : `<p class="rc-summary">出題は1回のみです。比較対象がないため共通語は出しません。</p>`}
      <div class="rc-wrap"><table class="rc-table" ${ctWidth(list.length)}>
        ${ctCols(list.length)}
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

// その他の酒類（OTHERS）はカード用に color:"other" を付けて品種と同じ山に入れる。
// 生産地フィルタはワイン用なので、その他の酒類には適用しない（「すべて」＋生産地指定のときは除く）
function fcAllCards() { return [...GRAPES, ...OTHERS.map(o => ({ ...o, color: "other" }))]; }
function fcDeck() {
  return fcState.order.filter(g =>
    (fcState.filter === "all" || g.color === fcState.filter) &&
    (g.color === "other" ? fcState.country === "all" || fcState.filter === "other"
                         : fcState.country === "all" || (g.countries || []).includes(fcState.country)));
}

function showFlashcards() {
  view = "flashcards";
  headerTitle.textContent = "品種フラッシュカード";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  if (fcState.order.length === 0) fcState.order = fcAllCards();
  fcState.index = 0;
  fcState.flipped = false;

  screen.innerHTML = `
    <div class="fc-filters">
      <button class="chip fc-filter" data-f="all">すべて</button>
      <button class="chip fc-filter" data-f="white">白</button>
      <button class="chip fc-filter" data-f="red">赤</button>
      <button class="chip fc-filter" data-f="other">🥃 その他の酒類</button>
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
  if (g.color === "other") {
    document.getElementById("fc-front").innerHTML = `
      <span class="fc-glass">🥃</span>
      <span class="fc-name">${g.name}</span>
      <span class="fc-colorlabel">その他の酒類 ・ ${g.cat}</span>
    `;
    document.getElementById("fc-back").innerHTML = `
      <div class="fc-back-name">${g.name} ${srcBadge("ai")}</div>
      <dl class="fc-facts">
        <dt>🏷 分類・原料</dt><dd>${g.cat}／${g.base}</dd>
        <dt>🌍 産地</dt><dd>${g.origin}</dd>
        <dt>👁 外観</dt><dd>${g.appearance}</dd>
        <dt>👃 香り</dt><dd>${g.aroma}</dd>
        <dt>👅 味わい</dt><dd>${g.taste}</dd>
        <dt>🔥 度数の目安</dt><dd>${g.abv}</dd>
        <dt>🔑 決め手</dt><dd>${g.key}</dd>
      </dl>
    `;
    return;
  }
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
      <span><span class="wine-label">すべて（${quizPool("all").length}問）</span>
      <span class="wine-sub" style="display:block">白・赤の全ワインから出題</span></span>
      <span class="chev">▶</span>
    </button>
    <button class="wine-card" data-mode="white">
      <span class="glass">🥂</span>
      <span><span class="wine-label">白ワインのみ（${quizPool("white").length}問）</span>
      <span class="wine-sub" style="display:block">白ワイン用品種から出題</span></span>
      <span class="chev">▶</span>
    </button>
    <button class="wine-card" data-mode="red">
      <span class="glass">🍷</span>
      <span><span class="wine-label">赤ワインのみ（${quizPool("red").length}問）</span>
      <span class="wine-sub" style="display:block">赤ワイン用品種から出題</span></span>
      <span class="chev">▶</span>
    </button>
    <button class="wine-card" data-mode="other">
      <span class="glass">🥃</span>
      <span><span class="wine-label">その他の酒類（${OTHERS.length}問）</span>
      <span class="wine-sub" style="display:block">外観・香り・味わい・度数から酒類名を当てる（本試験の5問目対策）</span></span>
      <span class="chev">▶</span>
    </button>
    ${srcNote("wines")}
  `;
  screen.querySelectorAll(".wine-card").forEach(b =>
    b.addEventListener("click", () => startQuiz(b.dataset.mode)));
  window.scrollTo(0, 0);
}

// クイズの出題プール（テイスティング会メモの6本は専用画面に分けているので除く）
function quizPool(mode) {
  if (mode === "other") return OTHERS.map(o => ({ ...o, kind: "other" }));
  return WINES.filter(w => w.origin !== "note" && (mode === "all" || w.color === mode));
}

function startQuiz(mode) {
  quizState.queue = shuffleArray(quizPool(mode));
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

  const isOther = wine.kind === "other";
  let correct, choices, questionHtml;
  if (isOther) {
    // その他の酒類: 同じ分類から誤答を優先して選び、足りなければ他の分類から補う
    correct = wine.name;
    const same = shuffleArray(OTHERS.filter(o => o.cat === wine.cat && o.name !== correct).map(o => o.name));
    const rest = shuffleArray(OTHERS.filter(o => o.cat !== wine.cat).map(o => o.name));
    choices = shuffleArray([correct, ...[...same, ...rest].slice(0, 3)]);
    questionHtml = `
      <div class="section-card quiz-comment">
        <div class="section-head"><span class="section-title">この酒類は？（その他の酒類）</span></div>
        ${[["👁", "外観", wine.appearance], ["👃", "香り", wine.aroma], ["👅", "味わい", wine.taste], ["🔥", "度数", wine.abv]].map(([icon, label, text]) => `
          <div class="quiz-comment-row"><span class="quiz-comment-label">${icon} ${label}</span><span class="quiz-comment-text">${text}</span></div>`).join("")}
      </div>`;
  } else {
    const grapeSection = VOCAB[wine.color].find(s => s.id === "grape");
    correct = wine.answers.grape[0];
    const distractors = shuffleArray(grapeSection.terms.filter(t => t !== correct)).slice(0, 3);
    choices = shuffleArray([correct, ...distractors]);
    questionHtml = `
      <div class="section-card quiz-comment">
        <div class="section-head"><span class="section-title">このワインの品種は？（${wine.color === "white" ? "白" : "赤"}ワイン）</span></div>
        ${buildQuizComment(wine)}
      </div>`;
  }

  screen.innerHTML = `
    ${questionHtml}
    <div class="quiz-choices">
      ${choices.map(c => `<button class="quiz-choice" data-grape="${c}">${c}</button>`).join("")}
    </div>
    <div class="quiz-feedback hidden" id="quiz-feedback">
      <div class="quiz-verdict" id="quiz-verdict"></div>
      <div class="quiz-explain" id="quiz-explain"></div>
      <button class="btn-primary" id="quiz-next"></button>
    </div>
    ${srcNote(isOther ? "grapes" : "wines")}
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
      document.getElementById("quiz-explain").innerHTML = isOther
        ? `${srcBadge("ai")} 正解：${wine.name}（${wine.cat}／${wine.base}／${wine.origin}） — 決め手: ${wine.key}`
        : `${srcBadge(srcKindOf(wine))} 正解：${wine.name} — ${wine.note}`;
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
  const counts = { white: new Map(), red: new Map(), other: new Map() };
  // 生産国ごとの出題回数（白・赤別）。sub に品種の内訳を持つ
  const byCountry = { white: new Map(), red: new Map() };
  const add = (m, key, year, sub) => {
    if (!m.has(key)) m.set(key, { count: 0, years: [], sub: new Map() });
    const rec = m.get(key);
    rec.count++;
    rec.years.push(year);
    if (sub) rec.sub.set(sub, (rec.sub.get(sub) || 0) + 1);
  };
  for (const exam of PAST_EXAMS) {
    for (const item of exam.items) {
      add(counts[item.type], item.name, exam.year, item.country || null);
      if (item.country) add(byCountry[item.type], item.country, exam.year, item.name);
    }
  }

  // ランキング表示。sub（内訳）があれば出題年の後ろに「フランス3・ドイツ2」のように添える
  const rankingHtml = (map, type, title, icon) => {
    const sorted = [...map.entries()].sort((a, b) => b[1].count - a[1].count || Math.max(...b[1].years) - Math.max(...a[1].years));
    const max = sorted[0][1].count;
    const subText = rec => rec.sub.size ? [...rec.sub.entries()].sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k}${n}`).join("・") : "";
    return `
      <div class="section-card">
        <div class="section-head"><span class="section-title">${icon} ${title}（出題回数）</span></div>
        ${sorted.map(([name, rec]) => `
          <div class="stat-row">
            <span class="stat-name">${name}</span>
            <span class="stat-bar-wrap"><span class="stat-bar ${type}" style="width:${(rec.count / max) * 100}%"></span></span>
            <span class="stat-count">${rec.count}回</span>
          </div>
          <div class="stat-years">${rec.years.slice().sort((a, b) => b - a).map(y => `'${String(y).slice(2)}`).join(" ")}${subText(rec) ? `<span class="stat-sub">${subText(rec)}</span>` : ""}</div>
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
    ${rankingHtml(counts.white, "white", "白ワイン", "🥂")}
    ${rankingHtml(counts.red, "red", "赤ワイン", "🍷")}
    ${rankingHtml(counts.other, "other", "その他の酒類", "🥃")}
    <h2 class="group-title">生産国別ランキング</h2>
    <p class="reveal-note">出題年の後ろは品種の内訳です（品種別ランキングでは生産国の内訳）。</p>
    ${rankingHtml(byCountry.white, "white", "白ワイン 生産国", "🥂")}
    ${rankingHtml(byCountry.red, "red", "赤ワイン 生産国", "🍷")}
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

// ---------------- notes (テイスティング会メモ) ----------------
// 手書きメモから作った練習ワイン（WINES の origin:"note"）だけを、模範解答の形で
// 番号順に閲覧する画面。用語シートは他の画面と共通の設定（activeSheet）を使い、
// Wine-Flight 2025年版なら本番と同じ番号を付けて表示する。
let ntMode = "list"; // list（1本ずつ）| table（白3本・赤3本を横並び）

function showNotes(focusId) {
  view = "notes";
  currentWine = null;
  selections = {};
  headerTitle.textContent = "テイスティング会メモ";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const sheet = activeSheet();
  const wines = WINES.filter(w => w.origin === "note").sort((a, b) => (a.noteNo || 0) - (b.noteNo || 0));
  const circled = ["", "①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
  const termHtml = (sec, t) => sheet.numbered ? `<span class="ct-term"><span class="chip-no">${sec.terms.indexOf(t) + 1}</span>${t}</span>` : `<span class="ct-term">${t}</span>`;

  screen.innerHTML = `
    <p class="home-lead">テイスティング会で取った手書きメモ${wines.length}本を、模範解答の形に流し込んで並べています。${srcBadge("note")}</p>
    <p class="nt-session">📅 ${NOTE_SESSION.date} ${NOTE_SESSION.time}　📍 ${NOTE_SESSION.venue}　📄 用語シート: ${NOTE_SESSION.sheet}</p>
    <div class="sheet-switch">
      <span class="sheet-switch-label">用語シート</span>
      ${Object.values(SHEETS).map(sh => `<button class="chip sheet-opt ${sh.key === sheet.key ? "on" : ""}" data-sheet="${sh.key}">${sh.label}</button>`).join("")}
    </div>
    <p class="reveal-note sheet-note">${sheet.numbered ? "本番と同じ番号付きで表示しています。" : "番号付きで見るには「Wine-Flight 2025年版」を選んでください。"}メモにある語はそのまま、メモにない項目は定石で補っています（各ワインの「補い方」参照）。</p>
    <div class="fc-filters nt-mode">
      <button class="chip nt-mode-opt ${ntMode === "list" ? "on" : ""}" data-mode="list">📋 1本ずつ</button>
      <button class="chip nt-mode-opt ${ntMode === "table" ? "on" : ""}" data-mode="table">📊 比較表（横並び）</button>
    </div>
    ${ntMode === "table" ? notesTableHtml(wines, sheet, circled) : ""}
    <div class="ar-year" ${ntMode === "table" ? "hidden" : ""}>
      ${wines.map(w => {
        const { answers, dropped } = modelAnswers(w, sheet);
        let rows = "", lastG = null;
        for (const sec of sheetVocab(w.color, sheet)) {
          if (sec.group !== lastG) { rows += `<div class="ar-group">${sec.group}</div>`; lastG = sec.group; }
          rows += `<div class="ar-row"><span class="ar-title">${sec.title}</span><span class="ar-terms">${(answers[sec.id] || []).map(t => termHtml(sec, t)).join("、")}</span></div>`;
        }
        return `
        <details class="ar-wine" data-id="${w.id}">
          <summary>${w.color === "white" ? "🥂" : "🍷"} <span class="ar-exam">${circled[w.noteNo] || w.noteNo}</span> ${w.name.replace(/｜.*$/, "")} ${srcBadge("note")}</summary>
          <div class="ar-body">
            <div class="ar-note"><b>元のメモ：</b>${w.memo}<br><b>補い方：</b>${w.note}${dropped ? `<br>ℹ️ ${dropped} 語はこのシートに無いため表示していません。` : ""}</div>
            <button class="btn-secondary ar-practice" data-id="${w.id}">📝 この正解で採点する練習へ</button>
            ${rows}
          </div>
        </details>`;
      }).join("")}
    </div>
    <p class="reveal-note"><b>データの出所</b> — ${srcBadge("note")} は自分のテイスティングメモ由来で、協会の正解でもAI参考解答でもありません。銘柄名は手書きの判読です。コメント練習の一覧・クイズ・推定には含めていません。</p>
  `;
  screen.querySelectorAll(".sheet-opt").forEach(b => b.addEventListener("click", () => {
    setActiveSheet(b.dataset.sheet);
    showNotes();
  }));
  screen.querySelectorAll(".nt-mode-opt").forEach(b => b.addEventListener("click", () => {
    ntMode = b.dataset.mode;
    showNotes();
  }));
  screen.querySelectorAll(".ar-practice").forEach(b => b.addEventListener("click", e => {
    e.preventDefault();
    const w = WINES.find(x => x.id === b.dataset.id);
    if (w) startPractice(w, false);
  }));
  if (focusId) {
    const target = screen.querySelector(`.ar-wine[data-id="${focusId}"]`);
    if (target) { target.open = true; target.scrollIntoView({ block: "start" }); return; }
  }
  window.scrollTo(0, 0);
}

// 白・赤それぞれの比較表。行＝項目、列＝ワイン。同色の全本で採用された語は太字（rc-common）、
// 番号付きシートなら本番の番号を付ける。1本しかない色は共通語を出さない
const NT_SHORT_TITLE = {
  "特徴（果実・花・植物）": "果実・花・植物", "特徴（香辛料・芳香・化学物質）": "香辛料・芳香・化学物質",
  "果実": "果実", "花・植物": "花・植物", "香辛料・芳香・化学物質": "香辛料・芳香・化学物質",
  "甘み（アルコールのボリューム感も含む）": "甘み", "甘み（アルコールのボリューム感を含む）": "甘み",
  "主なブドウ品種": "品種",
};
function notesTableHtml(wines, sheet, circled) {
  const tables = [];
  for (const color of ["white", "red"]) {
    const list = wines.filter(w => w.color === color);
    if (!list.length) continue;
    const answers = list.map(w => modelAnswers(w, sheet).answers);
    let rows = "", lastG = null, totalCommon = 0;
    for (const sec of sheetVocab(color, sheet)) {
      if (sec.group !== lastG) { rows += `<tr class="cmp-group"><th class="rc-item">${sec.group}</th><td colspan="${list.length}"></td></tr>`; lastG = sec.group; }
      const cells = answers.map(a => a[sec.id] || []);
      const common = list.length >= 2 ? cells[0].filter(t => cells.every(c => c.includes(t))) : [];
      totalCommon += common.length;
      rows += `<tr><th class="rc-item">${NT_SHORT_TITLE[sec.title] || sec.title}</th>${cells.map(c => `<td>${c.map(t =>
        `<span class="ct-term ${common.includes(t) ? "rc-common" : ""}">${sheet.numbered ? `<span class="chip-no">${sec.terms.indexOf(t) + 1}</span>` : ""}${t}</span>`).join("") || "<span class='rc-none'>—</span>"}</td>`).join("")}</tr>`;
    }
    tables.push(`
      <div class="section-card nt-table-card">
        <div class="section-head"><span class="section-title">${color === "white" ? "🥂 白ワイン" : "🍷 赤ワイン"}（${list.length}本）</span></div>
        ${list.length >= 2 ? `<p class="rc-summary">${list.length}本すべてで共通する語: <b>${totalCommon}語</b>（<span class="rc-common">太字</span>）。</p>` : ""}
        <div class="rc-wrap">
          <table class="rc-table">
            ${ctCols(list.length)}
            <thead><tr><th class="rc-item"></th>${list.map(w => `<th>${circled[w.noteNo] || w.noteNo} ${w.answers.grape[0]}<br><span class="rc-sub">${w.answers.country[0]}・${w.answers.vintage[0]}</span></th>`).join("")}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`);
  }
  return tables.join("");
}

// ---------------- feedback (ご意見・不具合の報告) ----------------
// このアプリはサーバーを持たない静的サイトなので、報告の受け口は GitHub の Issue にしている。
// フォームの内容を新規IssueのプリフィルURLに載せて開くだけで、送信処理はアプリ側に無い。
// GitHubを使わない人向けに、同じ文面をクリップボードへコピーする経路も用意している。
const REPO_SLUG = "shin741216/wine-tasting-trainer";
const FEEDBACK_KEY = "wtt-feedback";        // 送信した報告の控え
const FEEDBACK_DRAFT_KEY = "wtt-feedback-draft"; // 書きかけの内容
const FEEDBACK_KINDS = [
  { id: "bug", icon: "🐞", label: "不具合", prefix: "[不具合]", ghLabel: "bug",
    hint: "何をしたら／どうなると思ったか／実際どうなったか、の3点が分かると直しやすくなります。" },
  { id: "feature", icon: "✨", label: "機能の追加", prefix: "[機能追加]", ghLabel: "enhancement",
    hint: "どんな場面で何ができると嬉しいかを書いてください。" },
  { id: "other", icon: "💬", label: "その他", prefix: "[その他]", ghLabel: "",
    hint: "使いにくいところ、データの誤りなど、何でもどうぞ。" },
];
// 報告フォームの「どの画面か」で選べる一覧
const VIEW_LABELS = {
  "": "（選択しない）",
  launcher: "メニュー", wineList: "コメント選択練習（ワイン選択）", sheet: "用語シート", result: "採点結果",
  flashcards: "主要品種フラッシュカード", quiz: "品種当てクイズ", stats: "出題傾向データ",
  compare: "模範解答 比較閲覧", archive: "過去問アーカイブ", teppan: "タイプ別テッパンコメント",
  realcmp: "実物正解 品種×年度 横断", termstats: "用語の採用率", examset: "本番セット練習",
  notes: "テイスティング会メモ", guide: "使い方", other: "上記以外・全体のこと",
};
const esc = (t) => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function loadFeedback() { try { return JSON.parse(localStorage.getItem(FEEDBACK_KEY)) || []; } catch { return []; } }
function loadFeedbackDraft() { try { return JSON.parse(localStorage.getItem(FEEDBACK_DRAFT_KEY)) || {}; } catch { return {}; } }
function saveFeedbackDraft(d) { try { localStorage.setItem(FEEDBACK_DRAFT_KEY, JSON.stringify(d)); } catch {} }

// 端末や状況の情報。個人を特定するものは含めない
function feedbackContext() {
  return {
    "アプリ": APP_VERSION,
    "用語シート": activeSheet().label,
    "画面サイズ": `${window.innerWidth}×${window.innerHeight}（DPR ${window.devicePixelRatio || 1}）`,
    "表示モード": window.matchMedia("(display-mode: standalone)").matches || navigator.standalone ? "ホーム画面から起動" : "ブラウザ",
    "ブラウザ": navigator.userAgent,
    "日時": new Date().toLocaleString("ja-JP"),
  };
}

// GitHub の Issue に貼る本文（Markdown）
function feedbackBody(d, ctx) {
  const kind = FEEDBACK_KINDS.find(k => k.id === d.kind) || FEEDBACK_KINDS[0];
  let out = `### 種類\n${kind.icon} ${kind.label}\n\n### 内容\n${d.body || ""}\n`;
  if (d.screen) out += `\n### 該当の画面\n${VIEW_LABELS[d.screen] || d.screen}\n`;
  if (ctx) {
    out += `\n---\n<details><summary>自動で付いた情報</summary>\n\n| 項目 | 値 |\n|---|---|\n`;
    for (const [k, v] of Object.entries(ctx)) out += `| ${k} | ${String(v).replace(/\|/g, "\\|")} |\n`;
    out += `\n</details>\n`;
  }
  return out;
}

function feedbackIssueUrl(d, ctx) {
  const kind = FEEDBACK_KINDS.find(k => k.id === d.kind) || FEEDBACK_KINDS[0];
  const q = new URLSearchParams({ title: `${kind.prefix} ${d.title || ""}`.trim(), body: feedbackBody(d, ctx) });
  if (kind.ghLabel) q.set("labels", kind.ghLabel);
  return `https://github.com/${REPO_SLUG}/issues/new?${q}`;
}

function showFeedback() {
  view = "feedback";
  currentWine = null;
  headerTitle.textContent = "ご意見・不具合の報告";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  const d = { kind: "bug", title: "", body: "", screen: "", ctx: true, ...loadFeedbackDraft() };
  const sent = loadFeedback().sort((a, b) => b.t - a.t).slice(0, 10);

  screen.innerHTML = `
    <p class="home-lead">使っていて気づいたことを送れます。送り先はこのアプリのGitHubリポジトリで、Issueとして登録されます。</p>
    <div class="section-card">
      <div class="section-head"><span class="section-title">種類</span></div>
      <div class="chips">${FEEDBACK_KINDS.map(k => `<button class="chip fb-kind ${k.id === d.kind ? "on" : ""}" data-kind="${k.id}">${k.icon} ${k.label}</button>`).join("")}</div>
      <p class="fb-hint" id="fb-hint"></p>

      <label class="fb-label" for="fb-title">件名</label>
      <input class="fb-input" id="fb-title" type="text" maxlength="80" placeholder="ひとことで（例：採点結果の色が見分けにくい）" value="${esc(d.title)}">

      <label class="fb-label" for="fb-body">内容</label>
      <textarea class="fb-input fb-area" id="fb-body" rows="7" maxlength="2000" placeholder="詳しく書いてください">${esc(d.body)}</textarea>

      <label class="fb-label" for="fb-screen">どの画面のことか</label>
      <select class="fb-input" id="fb-screen">
        ${Object.entries(VIEW_LABELS).map(([k, v]) => `<option value="${k}" ${k === d.screen ? "selected" : ""}>${v}</option>`).join("")}
      </select>

      <label class="fb-check"><input type="checkbox" id="fb-ctx" ${d.ctx ? "checked" : ""}> 端末と状況の情報を付ける</label>
      <details class="fb-ctx-detail"><summary>付く内容を確認する</summary>
        <div class="fb-ctx-body">${Object.entries(feedbackContext()).map(([k, v]) => `<div><b>${k}</b>：${esc(v)}</div>`).join("")}</div>
      </details>

      <div class="fb-actions">
        <button class="btn-secondary" id="fb-copy">📋 内容をコピー</button>
        <button class="btn-primary" id="fb-send">📮 GitHubでIssueを作る</button>
      </div>
      <p class="reveal-note">「GitHubでIssueを作る」を押すと、入力内容を埋め込んだ新規Issue画面がブラウザで開きます。内容を確認して「Submit new issue」を押すと登録完了です（GitHubへのログインが必要です）。GitHubを使わないときは「内容をコピー」から文面を持ち出せます。</p>
    </div>
    ${sent.length ? `
    <h2 class="wine-section-title">送った報告の控え（${sent.length}件）</h2>
    <div class="section-card">
      ${sent.map(r => `
        <div class="pr-row">
          <span>${(FEEDBACK_KINDS.find(k => k.id === r.kind) || {}).icon || "💬"}</span>
          <span class="pr-name">${esc(r.title)}</span>
          <span class="pr-time">${new Date(r.t).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          <button class="pr-del" data-del="${r.t}" aria-label="この控えを削除">🗑</button>
        </div>`).join("")}
      <p class="reveal-note">この控えは端末内だけの記録です。GitHub側の状況（対応済みかどうか）とは連動しません。</p>
    </div>` : ""}
    <p class="reveal-note">⚠ 送った内容はGitHubのIssueとして<b>公開</b>されます。個人情報や見られたくない内容は書かないでください。</p>
  `;

  const el = id => document.getElementById(id);
  const read = () => ({ kind: d.kind, title: el("fb-title").value.trim(), body: el("fb-body").value.trim(),
                        screen: el("fb-screen").value, ctx: el("fb-ctx").checked });
  const renderHint = () => { el("fb-hint").textContent = (FEEDBACK_KINDS.find(k => k.id === d.kind) || {}).hint || ""; };
  renderHint();

  screen.querySelectorAll(".fb-kind").forEach(b => b.addEventListener("click", () => {
    d.kind = b.dataset.kind;
    screen.querySelectorAll(".fb-kind").forEach(x => x.classList.toggle("on", x.dataset.kind === d.kind));
    renderHint();
    saveFeedbackDraft(read());
  }));
  ["fb-title", "fb-body", "fb-screen", "fb-ctx"].forEach(id =>
    el(id).addEventListener("input", () => saveFeedbackDraft(read())));

  // 件名と内容がそろっているか確かめる。足りなければ送らせない
  const validate = (v) => {
    if (!v.title) { openModal("件名が空です", "<p>ひとことで分かる件名を入れてください。</p>"); return false; }
    if (!v.body) { openModal("内容が空です", "<p>詳しい内容を入れてください。</p>"); return false; }
    return true;
  };
  const remember = (v) => {
    const list = loadFeedback();
    list.push({ t: Date.now(), kind: v.kind, title: v.title, body: v.body, screen: v.screen });
    try { localStorage.setItem(FEEDBACK_KEY, JSON.stringify(list.slice(-30))); } catch {}
    try { localStorage.removeItem(FEEDBACK_DRAFT_KEY); } catch {}
  };

  el("fb-send").addEventListener("click", () => {
    const v = read();
    if (!validate(v)) return;
    const url = feedbackIssueUrl(v, v.ctx ? feedbackContext() : null);
    remember(v);
    window.open(url, "_blank", "noopener");
    showFeedback();
    openModal("📮 GitHubの画面を開きました", `
      <p>開いたページで内容を確認し、「Submit new issue」を押すと登録が完了します。</p>
      <p>ページが開かない場合は、下のリンクから開いてください。</p>
      <p><a href="${esc(url)}" target="_blank" rel="noopener">GitHubで新しいIssueを作る</a></p>`);
  });

  el("fb-copy").addEventListener("click", async () => {
    const v = read();
    if (!validate(v)) return;
    const kind = FEEDBACK_KINDS.find(k => k.id === v.kind) || FEEDBACK_KINDS[0];
    const text = `${kind.prefix} ${v.title}\n\n${feedbackBody(v, v.ctx ? feedbackContext() : null)}`;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch {}
    remember(v);
    showFeedback();
    openModal(ok ? "📋 コピーしました" : "内容はこちらです",
      ok ? "<p>メールやメモに貼り付けて渡せます。</p>"
         : `<p>自動でコピーできませんでした。下の文面を選んでコピーしてください。</p><textarea class="fb-input fb-area" rows="10" readonly>${esc(text)}</textarea>`);
  });

  screen.querySelectorAll(".pr-del").forEach(b => b.addEventListener("click", () => {
    if (!confirm("この控えを削除しますか？")) return;
    try { localStorage.setItem(FEEDBACK_KEY, JSON.stringify(loadFeedback().filter(r => r.t !== +b.dataset.del))); } catch {}
    showFeedback();
  }));
  window.scrollTo(0, 0);
}

// ---------------- guide (使い方ページ) ----------------
function showGuide() {
  view = "guide";
  headerTitle.textContent = "使い方";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");
  const order = ["launcher", "sharing", "data", "comment", "sheet", "flashcards", "quiz", "teppan", "stats", "compare", "archive", "realcmp", "termstats", "examset", "notes", "feedback"];
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
  // 実物の模範解答から作った練習ワイン（origin: "past"）とテイスティング会メモ（origin: "note"）は
  // 生産地が重複するため比較表からは除く（この画面はAI参考解答だけを見比べる）
  const grapes = [];
  for (const color of ["white", "red"]) {
    for (const g of VOCAB[color].find(s => s.id === "grape").terms) {
      if (WINES.some(w => !w.origin && w.color === color && w.answers.grape[0] === g)) grapes.push({ name: g, color });
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
  const wines = WINES.filter(w => !w.origin && w.answers.grape[0] === cmpGrape);
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
        return `<span class="ct-term ${shared || wines.length < 2 ? "" : "cmp-diff"}">${t}</span>`;
      }).join("");
    });
    rows += `<tr><th class="cmp-item">${sec.title}</th>${cells.map(c => `<td>${c}</td>`).join("")}</tr>`;
  }

  document.getElementById("cmp-body").innerHTML = `
    <div class="cmp-wrap">
      <table class="cmp-table" ${ctWidth(wines.length)}>
        ${ctCols(wines.length)}
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

  const whites = WINES.filter(w => w.origin !== "note" && w.color === "white");
  const reds = WINES.filter(w => w.origin !== "note" && w.color === "red");

  const results = loadResults();
  const nWhite = results.filter(r => !r.draft && r.color === "white").length;
  const nRed = results.filter(r => !r.draft && r.color === "red").length;
  const nDraft = results.filter(r => r.draft).length;
  const recordRow = r => `
        <div class="pr-row pr-clickable ${r.draft ? "pr-row-draft" : ""}" data-t="${r.t}" title="${r.draft ? "タップで作業を再開" : "タップで採点結果を再表示"}">
          <span>${r.color === "white" ? "🥂" : "🍷"}</span>
          <span class="pr-name">${r.blind && r.draft ? (r.color === "white" ? "白ワイン（銘柄非公開）" : "赤ワイン（銘柄非公開）") : r.name}${r.blind ? '<span class="pr-blind">ブラインド</span>' : ""}${r.sheet && SHEETS[r.sheet] ? `<span class="pr-sheet">${SHEETS[r.sheet].short}</span>` : ""}</span>
          <span class="pr-score${r.draft ? " pr-draft" : ""}">${r.draft ? `💾 一時保存 ${r.filled}/${r.total}` : `${r.pct}点`}</span>
          <span class="pr-time">${new Date(r.t).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
          <button class="pr-del" data-del="${r.t}" aria-label="この記録を削除">🗑</button>
        </div>`;
  const resultsHtml = results.length === 0 ? "" : `
    <h2 class="wine-section-title">練習の記録（採点済 白 ${nWhite}/${RESULTS_PER_COLOR}・赤 ${nRed}/${RESULTS_PER_COLOR}${nDraft ? `・一時保存 ${nDraft}件` : ""}）</h2>
    <div class="section-card">
      ${[...results].sort((a, b) => b.t - a.t).map(recordRow).join("")}
      <p class="reveal-note">採点済みの行をタップすると採点結果を再表示、💾 一時保存の行をタップすると同じシート・同じ選択状態で作業を再開できます（採点すると一時保存は採点済みに置き換わります）。採点済みは白・赤それぞれ最新${RESULTS_PER_COLOR}回分を保存し、超えた分は古いものから自動で消えます。🗑 で1件ずつ、下のボタンで全件削除できます。</p>
      <button class="btn-secondary pr-clear" id="btn-finish-practice">🗑 記録を全て削除</button>
    </div>
  `;
  const curSheet = activeSheet();
  const sheetSwitchHtml = `
    <div class="sheet-switch">
      <span class="sheet-switch-label">用語シート</span>
      ${Object.values(SHEETS).map(sh => `<button class="chip sheet-opt ${sh.key === curSheet.key ? "on" : ""}" data-sheet="${sh.key}">${sh.label}</button>`).join("")}
    </div>
    <p class="reveal-note sheet-note">${curSheet.note}</p>
  `;

  screen.innerHTML = `
    <p class="home-lead">ワインを選んで、本番形式の用語選択シートでコメントを作成しましょう。採点すると模範解答と照合できます。</p>
    ${sheetSwitchHtml}
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
        const pool = WINES.filter(w => w.origin !== "note" && w.color === card.dataset.random);
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
      if (!confirm(`練習の記録 ${results.length}件 を全て削除しますか？`)) return;
      clearResults();
      showHome();
    });
  }
  screen.querySelectorAll(".pr-del").forEach(b => b.addEventListener("click", e => {
    e.stopPropagation();
    if (!confirm("この記録を削除しますか？")) return;
    deleteResult(+b.dataset.del);
    showHome();
  }));
  screen.querySelectorAll(".pr-clickable").forEach(row => row.addEventListener("click", () => {
    const rec = results.find(r => r.t === +row.dataset.t);
    if (!rec) return;
    if (rec.draft) resumeDraft(rec); else showResult({ record: rec });
  }));
  screen.querySelectorAll(".sheet-opt").forEach(b => b.addEventListener("click", () => {
    setActiveSheet(b.dataset.sheet);
    showHome();
  }));
  window.scrollTo(0, 0);
}

function wineCardHtml(w) {
  return `
    <button class="wine-card" data-id="${w.id}">
      <span class="glass">${w.color === "white" ? "🥂" : "🍷"}</span>
      <span>
        <span class="wine-label">${w.name}</span>
        <span class="wine-sub" style="display:block">${w.note}</span>
        <span class="wine-src">${srcBadge(srcKindOf(w))}</span>
      </span>
      <span class="chev">▶</span>
    </button>
  `;
}

// ---------------- practice sheet ----------------
function startPractice(wine, blind, restore = null) {
  view = "sheet";
  currentWine = wine;
  currentWine._blind = blind;
  selections = {};
  headerTitle.textContent = wine.color === "white" ? "白ワイン 用語選択" : "赤ワイン 用語選択";
  btnHome.classList.remove("hidden");
  footerBar.classList.remove("hidden");
  btnGrade.textContent = "採点する";
  btnGrade.disabled = false;

  const sheet = activeSheet();
  const vocab = sheetVocab(wine.color, sheet);
  const blindName = wine.color === "white" ? "白ワイン（銘柄非公開）" : "赤ワイン（銘柄非公開）";
  const setLabel = setState ? `${setState.title}｜ワイン${"①②③④"[(setState.queue[setState.index].no || 1) - 1]}` : "出題ワイン";
  let html = `
    <div class="sheet-wine-banner">
      <div class="b-label">${setLabel} ${srcBadge(srcKindOf(wine))}</div>
      <div class="b-name">${blind ? blindName : wine.name}</div>
      ${setState ? `<div class="b-sub">${setState.index + 1} / ${setState.queue.length} 本目</div>` : ""}
      <div class="b-sub">用語シート: ${sheet.label}</div>
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
          <span class="section-title">${sec.title}${subsetsFor(wine, sec) ? `<span class="section-hint">${subsetsFor(wine, sec).map(g => g.label).join("と")}から1つずつ</span>` : ""}</span>
          <span class="section-count" data-count>0/${pickFor(wine, sec, sheet)}</span>
        </div>
        ${subsetsFor(wine, sec)
          ? subsetsFor(wine, sec).map(g => `<div class="chips chips-sub"><span class="chip-sub">${g.label}</span>${g.terms.map(t => `<button class="chip" data-term="${t}">${chipLabel(sheet, sec.terms.indexOf(t), t)}</button>`).join("")}</div>`).join("")
          : `<div class="chips">
          ${sec.terms.map((t, i) => `<button class="chip" data-term="${t}">${chipLabel(sheet, i, t)}</button>`).join("")}
        </div>`}
      </div>
    `;
  }
  screen.innerHTML = html;

  screen.querySelectorAll(".section-card").forEach(card => {
    const secId = card.dataset.sec;
    const sec = vocab.find(s => s.id === secId);
    const pick = pickFor(wine, sec, sheet);
    selections[secId] = new Set();
    card.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const term = chip.dataset.term;
        const set = selections[secId];
        if (set.has(term)) {
          set.delete(term);
          chip.classList.remove("on");
        } else {
          const unselect = t => {
            set.delete(t);
            const c = card.querySelector(`.chip[data-term="${CSS.escape(t)}"]`);
            if (c) c.classList.remove("on");
          };
          // グループ制約（例: グラスは大きさから1つ＋形から1つ）: 同じグループで選択済みの語と入れ替える
          const subsets = subsetsFor(wine, sec);
          const grp = subsets && subsets.find(g => g.terms.includes(term));
          const sameGrp = grp ? [...set].find(t => grp.terms.includes(t)) : null;
          if (sameGrp) unselect(sameGrp);
          else if (set.size >= pick) {
            // 上限に達していたら最も古い選択を外す（pick=1ならワンタップ切替）
            unselect(set.values().next().value);
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

  // 一時保存から再開: 保存されていた選択を復元してチップを点灯
  if (restore && restore.sel) {
    for (const [secId, terms] of Object.entries(restore.sel)) {
      const card = screen.querySelector(`.section-card[data-sec="${CSS.escape(secId)}"]`);
      if (!card || !selections[secId]) continue;
      const sec = vocab.find(s => s.id === secId);
      const pick = pickFor(wine, sec, sheet);
      for (const t of terms) {
        const chip = card.querySelector(`.chip[data-term="${CSS.escape(t)}"]`);
        if (!chip || selections[secId].size >= pick) continue;
        selections[secId].add(t);
        chip.classList.add("on");
      }
      const countEl = card.querySelector("[data-count]");
      countEl.textContent = `${selections[secId].size}/${pick}`;
      countEl.classList.toggle("full", selections[secId].size === pick);
    }
  }

  updateProgress();
  window.scrollTo(0, 0);
}

// 項目内のグループ制約（例: グラスは「大きさ」と「形」から1つずつ）。
// 実物の模範解答で採点する練習ワイン（origin: "past"）は、正解が「中庸・大ぶり」のように
// 同じグループから複数選んでいる年があるため、制約を外して正解の語数だけで数える
function subsetsFor(wine, sec) {
  if (!sec.subsets || (wine && wine.origin === "past")) return null;
  return sec.subsets;
}

// 項目ごとの選択数。実物の模範解答から作った練習ワイン（origin: "past"）だけは
// 用語シート既定の pick ではなく、その年の正解の語数に合わせる
function pickFor(wine, sec, sheet = activeSheet()) {
  if (wine && wine.origin === "past") {
    const a = modelAnswers(wine, sheet).answers[sec.id];
    if (a && a.length) return a.length;
  }
  return sec.pick;
}

function updateProgress() {
  const sheet = activeSheet();
  const vocab = sheetVocab(currentWine.color, sheet);
  const done = vocab.filter(s => selections[s.id] && selections[s.id].size === pickFor(currentWine, s, sheet)).length;
  footerProgress.textContent = `記入済み ${done} / ${vocab.length} 項目`;
}

// ---------------- result ----------------
// opts.record を渡すと、保存済みの記録（ワイン・シート・選択内容）から採点結果を再表示する
function showResult(opts = {}) {
  view = "result";
  const record = opts.record || null;
  const wine = record ? WINES.find(w => w.id === record.wineId) : currentWine;
  if (record && !wine) {
    openModal("記録を表示できません", "<p>このワインは現在のデータに存在しないため、採点結果を再表示できません。</p>");
    return;
  }
  const sheet = record ? (SHEETS[record.sheet] || activeSheet()) : activeSheet();
  const vocab = sheetVocab(wine.color, sheet);
  const sel = record
    ? Object.fromEntries(Object.entries(record.sel || {}).map(([k, v]) => [k, new Set(v)]))
    : selections;
  const blind = record ? !!record.blind : !!wine._blind;
  const { answers: modelAll, dropped } = modelAnswers(wine, sheet);
  headerTitle.textContent = record ? "採点結果（記録）" : "採点結果";
  btnHome.classList.remove("hidden");
  footerBar.classList.add("hidden");

  let totalModel = 0;
  let totalHit = 0;
  let sectionsHtml = "";
  let lastGroup = null;

  for (const sec of vocab) {
    const model = new Set(modelAll[sec.id] || []);
    const chosen = sel[sec.id] || new Set();
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
          <span class="section-score ${scoreClass}">${model.size ? `${hits}/${model.size}` : "採点対象外"}</span>
        </div>
        <div class="chips">
          ${sec.terms.map((t, i) => {
            const inModel = model.has(t);
            const picked = chosen.has(t);
            let cls = "r-dim";
            if (inModel && picked) cls = "r-ok";
            else if (inModel && !picked) cls = "r-miss";
            else if (!inModel && picked) cls = "r-wrong";
            return `<span class="chip ${cls}">${chipLabel(sheet, i, t)}</span>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  const pct = totalModel ? Math.round((totalHit / totalModel) * 100) : 0;
  if (!record) {
    savePracticeResult({
      t: Date.now(), wineId: wine.id, name: wine.name, color: wine.color,
      blind, pct, hit: totalHit, total: totalModel, sheet: sheet.key,
      sel: Object.fromEntries(Object.entries(selections).map(([k, v]) => [k, [...v]])),
    });
  }
  const srcKind = srcKindOf(wine);
  screen.innerHTML = `
    <div class="score-card">
      <div class="s-wine">${wine.name}${blind ? "（ブラインド）" : ""}</div>
      <div class="s-score">${pct}点</div>
      <div class="s-detail">模範解答 ${totalModel} 語中 ${totalHit} 語一致 ${srcBadge(srcKind)}</div>
      <div class="s-detail">用語シート: ${sheet.label}${record ? `　記録 ${new Date(record.t).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}` : ""}</div>
    </div>
    <div class="legend">
      <span class="l-ok">正解（選択して一致）</span>
      <span class="l-miss">選び漏れ</span>
      <span class="l-wrong">誤って選択</span>
    </div>
    ${dropped ? `<div class="ar-note">ℹ️ 模範解答のうち ${dropped} 語は「${sheet.label}」のシートに存在しないため、採点から除外しています（例：このシートにない品種・収穫年・用語）。</div>` : ""}
    ${wine.origin === "past" ? `<div class="ar-note">📝 この正解は本試験で発表された模範解答ですが、会員限定公開分を個人ブログが転記した内容から収録したもので、原本と照合していません。${wine.caveat ? `<br>${wine.caveat}` : ""}${wine.archiveKey ? `<br><a href="#" id="btn-archive-link">🗄️ 過去問アーカイブで原本どおりの正解を見る</a>` : ""}</div>` : ""}
    ${wine.origin === "note" ? `<div class="ar-note">🍷 この正解は ${NOTE_SESSION.label} のテイスティング会で取った手書きメモを模範解答に流し込んだもので、協会の正解でもAI参考解答でもありません。メモにない項目は定石で補っています。<br><b>元のメモ：</b>${wine.memo}<br><b>補い方：</b>${wine.note}</div>` : ""}
    ${sectionsHtml}
    ${record ? `
    <div class="result-actions">
      <button class="btn-primary" id="btn-next">ワイン選択へ戻る</button>
    </div>` : setState ? `
    <div class="result-actions">
      <button class="btn-primary" id="btn-set-next">${setState.index + 1 < setState.queue.length ? `次のワイン（${"①②③④"[(setState.queue[setState.index + 1].no || 2) - 1]}）へ` : "セットの結果を見る"}</button>
    </div>` : `
    <div class="result-actions">
      <button class="btn-secondary" id="btn-retry">同じワインでもう一度</button>
      <button class="btn-primary" id="btn-next">${wine.origin === "note" ? "テイスティング会メモへ戻る" : "ワイン選択へ"}</button>
    </div>`}
    ${srcNote("wines")}
  `;

  if (record) {
    document.getElementById("btn-next").addEventListener("click", () => showHome());
  } else if (setState) {
    setState.results.push({ wine, pct, hit: totalHit, total: totalModel });
    document.getElementById("btn-set-next").addEventListener("click", () => {
      setState.index++;
      if (setState.index < setState.queue.length) startPractice(setState.queue[setState.index].wine, setState.blind);
      else showSetSummary();
    });
  } else {
    document.getElementById("btn-retry").addEventListener("click", () => startPractice(wine, wine._blind));
    document.getElementById("btn-next").addEventListener("click", () => wine.origin === "note" ? showNotes() : showHome());
  }
  const archiveLink = document.getElementById("btn-archive-link");
  if (archiveLink) archiveLink.addEventListener("click", e => { e.preventDefault(); showArchive(wine.archiveKey); });
  window.scrollTo(0, 0);
}

// ================= アプリの更新検知・画面の復元 =================
// 画面を開いたままにしているユーザーは、裏でアプリが更新されても古い表示のまま
// 使い続けてしまう。復帰時にバージョンを確かめ、更新があればバーで知らせる。
// 再読み込みの前に、記入中の内容を一時保存し、開いていた画面を控えておき、
// 読み込み後は元の場所へ戻す。

const VIEW_KEY = "wtt-last-view";
const RESUME_MAX_AGE = 30 * 60 * 1000;         // 通常の復帰でここまで前なら元の画面へ戻す
const UPDATE_RESTORE_MAX_AGE = 60 * 60 * 1000; // 更新の再読み込みはもう少し猶予を持たせる
const UPDATE_CHECK_MIN_INTERVAL = 60 * 1000;   // 短時間の連続チェックを抑える
const UPDATE_POLL_INTERVAL = 30 * 60 * 1000;   // 開きっぱなしのときの定期チェック
let lastUpdateCheck = Date.now();
let updateBarVersion = null;   // バーで知らせ中のバージョン
let dismissedVersion = null;   // 「後で」を押されたバージョン（同じ版では再表示しない）
let updatingNow = false;       // 更新の再読み込み中。控えた画面を上書きさせないための目印

// ---------------- 画面の記録と復元 ----------------
// 復元できない画面（クイズや本番セット練習の途中）は、いちばん近い一覧に戻す
function snapshotView(extra = {}) {
  // 更新の再読み込み中は pagehide などが後から走る。せっかく控えた内容を
  // 素の記録で上書きしてしまわないよう、更新用の記録だけを残す
  if (updatingNow && !extra.reason) return;
  const s = { view, t: Date.now(), ...extra };
  try {
    if (view === "sheet" && currentWine) {
      s.wineId = currentWine.id; s.blind = !!currentWine._blind; s.sheet = activeSheet().key;
    } else if (view === "result" && currentWine) {
      s.wineId = currentWine.id;
    } else if (view === "flashcards") {
      s.fc = { filter: fcState.filter, country: fcState.country, index: fcState.index };
    } else if (view === "teppan") { s.tp = tpState.id;
    } else if (view === "realcmp") { s.rc = rcGrape;
    } else if (view === "termstats") { s.ts = { color: tsState.color, scope: tsState.scope };
    } else if (view === "compare") { s.cmp = cmpGrape;
    } else if (view === "notes") { s.nt = ntMode; }
    localStorage.setItem(VIEW_KEY, JSON.stringify(s));
  } catch {}
}

function readViewSnapshot() {
  try {
    const s = JSON.parse(localStorage.getItem(VIEW_KEY));
    if (!s || !s.view) return null;
    const maxAge = s.reason === "update" ? UPDATE_RESTORE_MAX_AGE : RESUME_MAX_AGE;
    return Date.now() - (s.t || 0) > maxAge ? null : s;
  } catch { return null; }
}

// 記録した画面を開き直す。開けたら true
function restoreView(s) {
  switch (s.view) {
    case "sheet": {
      const wine = WINES.find(w => w.id === s.wineId);
      if (!wine) return false;
      if (s.sheet && SHEETS[s.sheet]) setActiveSheet(s.sheet);
      // 記入していた内容は一時保存から戻す
      const draft = loadResults().find(r => r.draft && r.wineId === s.wineId && r.sheet === s.sheet);
      startPractice(wine, !!s.blind, draft || null);
      return true;
    }
    case "result": {
      const rec = loadResults().filter(r => !r.draft && r.wineId === s.wineId).sort((a, b) => b.t - a.t)[0];
      if (rec) showResult({ record: rec }); else showHome();
      return true;
    }
    case "wineList": showHome(); return true;
    case "flashcards":
      showFlashcards();
      if (s.fc) {
        fcState.filter = s.fc.filter; fcState.country = s.fc.country; fcState.index = s.fc.index || 0;
        renderFlashcard();
      }
      return true;
    case "quiz": case "quizStart": showQuizStart(); return true;
    case "stats": showStats(); return true;
    case "archive": showArchive(); return true;
    case "guide": showGuide(); return true;
    case "examset": case "setSummary": showExamSets(); return true;
    case "teppan": if (s.tp) tpState.id = s.tp; showTeppan(); return true;
    case "realcmp": if (s.rc) rcGrape = s.rc; showRealCompare(); return true;
    case "termstats":
      if (s.ts) { tsState.color = s.ts.color; tsState.scope = s.ts.scope; }
      showTermStats(); return true;
    case "compare": if (s.cmp) cmpGrape = s.cmp; showCompare(); return true;
    case "notes": if (s.nt) ntMode = s.nt; showNotes(); return true;
    case "feedback": showFeedback(); return true;
    default: return false;
  }
}

// 起動時の入口。記録が壊れていても必ずメニューは開く
function restoreOrLaunch() {
  const s = readViewSnapshot();
  try { localStorage.removeItem(VIEW_KEY); } catch {}
  let restored = false;
  if (s) { try { restored = restoreView(s); } catch { restored = false; } }
  if (!restored) showLauncher();
  if (s && s.reason === "update") showUpdatedBar(s, restored);
}

// ---------------- 更新の検知 ----------------
// version.js を取り直して、動作中の APP_VERSION と比べる。サービスワーカーの状態に
// 左右されないので、復帰直後でも判定できる。オフラインなら失敗するだけで何も起きない。
async function checkForUpdate(force = false) {
  const now = Date.now();
  if (!force && now - lastUpdateCheck < UPDATE_CHECK_MIN_INTERVAL) return;
  lastUpdateCheck = now;
  try {
    const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration();
    if (reg) reg.update();
  } catch {}
  try {
    const res = await fetch(`version.js?_=${now}`, { cache: "no-store" });
    if (!res.ok) return;
    const m = (await res.text()).match(/APP_VERSION\s*=\s*"([^"]+)"/);
    if (!m || m[1] === APP_VERSION || m[1] === dismissedVersion) return;
    showUpdateBar(m[1]);
  } catch {}
}

function removeUpdateBar() {
  const el = document.getElementById("update-bar");
  if (el) el.remove();
  document.body.classList.remove("has-update-bar");
  document.documentElement.style.removeProperty("--update-bar-h");
}

// バーは画面下に固定する。高さは文字の折り返しで変わるので測ってCSS変数に入れ、
// 用語シートのフッター（採点するボタン）とページ末尾をその分だけ持ち上げる
function mountUpdateBar(className, html) {
  removeUpdateBar();
  const bar = document.createElement("div");
  bar.className = className;
  bar.id = "update-bar";
  bar.innerHTML = html;
  document.body.appendChild(bar);
  document.body.classList.add("has-update-bar");
  const measure = () => {
    const el = document.getElementById("update-bar");
    if (el) document.documentElement.style.setProperty("--update-bar-h", `${el.offsetHeight}px`);
  };
  measure();
  window.addEventListener("resize", measure);
  return bar;
}

function showUpdateBar(latest) {
  if (updateBarVersion === latest) return;
  updateBarVersion = latest;
  mountUpdateBar("update-bar", `
    <span class="ub-text">🔄 新しいバージョン <b>${latest}</b> があります
      <span class="ub-sub">この画面は更新前の内容です。再読み込みすると最新になります（記入中の内容は自動保存します）</span></span>
    <span class="ub-actions">
      <button class="btn-secondary ub-btn" id="ub-later">後で</button>
      <button class="btn-primary ub-btn" id="ub-now">再読み込み</button>
    </span>`);
  document.getElementById("ub-later").addEventListener("click", () => {
    dismissedVersion = latest;
    updateBarVersion = null;
    removeUpdateBar();
  });
  document.getElementById("ub-now").addEventListener("click", () => applyUpdate(latest));
}

// 更新を適用する。失うと困るものを先に保存してから読み込み直す
async function applyUpdate(latest) {
  if (view === "quiz" || setState) {
    if (!confirm("進行中のクイズ・本番セット練習は最初からになります。再読み込みしますか？")) return;
  }
  const savedDraft = view === "sheet" ? saveDraft(true) : false;
  updatingNow = true;
  snapshotView({ reason: "update", from: APP_VERSION, to: latest, savedDraft });
  try {
    const reg = navigator.serviceWorker && await navigator.serviceWorker.getRegistration();
    if (reg) await reg.update();
  } catch {}
  location.reload();
}

// 更新後に一度だけ出す確認バー
function showUpdatedBar(s, restored) {
  const sub = restored
    ? (s.savedDraft ? "記入中だった内容を保存して、同じ画面で開き直しました。" : "元の画面で開き直しました。")
    : (s.savedDraft ? "記入中だった内容は「練習の記録」に一時保存してあります。" : "メニューから続けてください。");
  mountUpdateBar("update-bar done", `
    <span class="ub-text">✅ <b>${s.to || ""}</b> に更新しました<span class="ub-sub">${sub}</span></span>
    <span class="ub-actions"><button class="btn-secondary ub-btn" id="ub-close">閉じる</button></span>`);
  document.getElementById("ub-close").addEventListener("click", removeUpdateBar);
  setTimeout(() => {
    const el = document.getElementById("update-bar");
    if (el && el.classList.contains("done")) removeUpdateBar();
  }, 12000);
}

// ---------------- 復帰の検知 ----------------
// ホーム画面から起動したPWAをアプリスイッチャーから戻すと visibilitychange、
// 履歴で戻ると pageshow が発火する。背面に回るたびに画面を控えておけば、
// OSにアプリを終了させられても元の場所へ戻れる。
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") checkForUpdate();
  else snapshotView();
});
window.addEventListener("pageshow", () => checkForUpdate());
window.addEventListener("pagehide", () => snapshotView());
setInterval(() => { if (document.visibilityState === "visible") checkForUpdate(); }, UPDATE_POLL_INTERVAL);

restoreOrLaunch();
