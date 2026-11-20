# 環安衛航標 HSE Beacon

靜態網站，以 GitHub Pages 公開於 https://rockfear.github.io/hsebeacon/ 。預定正式網域為 `hsebeacon.tw`，尚未設定：頁面中的 canonical、分享圖、`sitemap.xml` 與 `robots.txt` 已先寫成 `https://hsebeacon.tw/`。接上網域時再加回 `CNAME` 檔（內容為 `hsebeacon.tw`）。

推送到 main 的變更會在一兩分鐘內直接上線。

## 檔案

- `index.html`：首頁（刊頭、3D 航標海域、各欄目、關於本站）
- `issue-NN.html`：各期週報
- `article-NN.html`：獨立專文（新專文要同步更新首頁「風險管理實戰」卡片、`beacon3d.js` 的專文浮標、相關週報的延伸閱讀連結與 `sitemap.xml`）
- `beacon3d.js`：首頁 3D 海域與浮標資料（`NODES` 陣列）
- `style.css`：全站樣式
- `sitemap.xml`、`robots.txt`、`og.png`、`.nojekyll`

## 每週新增一期

1. 以最新一期的 `issue-NN.html` 為範本建立新檔，內文照週報原文，保留原始連結。
2. 上一期的頁首與頁尾加上通往新一期的連結。
3. `index.html`：更新「最新週報」、期數清單最上方加新一期、海域面板的預設內容。
4. `beacon3d.js` 的 `NODES`：
   - 環安衛趨勢（`ch: 't'`）：換成最新一期的五地動向與重大事故追蹤，每個國家一個浮標，`short` 只寫國家名（例如「台灣」「比利時」），同一地區有兩國就拆成兩個浮標。不放期數浮標。
   - 風險管理實戰（`ch: 'p'`）：每篇專文、每個案例一個浮標，`short` 只寫該篇的核心管理關鍵字，2–5 字（例如「控制層級」「有效性驗證」「局部排氣」），不用數字或地名。新一期的三個案例加在專文之後，最舊一期的案例移除，維持約 10 個。
   - `index.html` 海域面板的預設內容要和 `NODES` 第一筆一致。
5. `sitemap.xml` 加入新頁並更新首頁的 `lastmod`。

## 寫作原則

- 作者的專文保留原文語氣，只修錯字與事實。
- 每則標示來源類型：官方來源、作者分析、待驗證問題（調查中）。
- 事件日期、公告日期與資料截止日分開寫。

## 分享列

每期週報（在 `</main>` 前）與每篇專文（在延伸閱讀 `nav.next` 前）結尾都有 `<section class="share">` 分享列，並在 `</body>` 前載入 `share.js`。新增期數或專文時沿用範本即可，分享網址由 `share.js` 依當前頁面自動產生。
