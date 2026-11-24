# 環安衛航標 HSE Beacon

靜態網站，以 GitHub Pages 公開於 https://rockfear.github.io/hsebeacon/ 。頁面中的 canonical、og:url、og:image、JSON-LD、`sitemap.xml` 與 `robots.txt` 都寫成這個網址。

預定正式網域為 `hsebeacon.tw`，尚未設定。接上網域時：加回 `CNAME`（內容為 `hsebeacon.tw`），把上述網址全部改成 `https://hsebeacon.tw/`，並更新 Portaly 贊助頁感謝文字裡的連結。

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
- 專文主視覺放在 `assets/article-NN-hero.png`（1200×630，SVG 原檔同名），放在文章標頭之後，並同時作為該篇與英文版的 `og:image`。圖上放主標題與副標題，分享時就看得到；英文版另做一張 `article-NN-hero-en.png`。
- 每則標示來源類型：官方來源、作者分析、待驗證問題（調查中）。
- 事件日期、公告日期與資料截止日分開寫。

## 分享列

每期週報（在 `</main>` 前）與每篇專文（在延伸閱讀 `nav.next` 前）結尾都有 `<section class="share">` 分享列，並在 `</body>` 前載入 `share.js`。新增期數或專文時沿用範本即可，分享網址由 `share.js` 依當前頁面自動產生。按鈕圖示放在 `assets/`，取自 Facebook、LINE、Instagram 官方品牌素材的單色版，以 CSS 遮罩套用網站顏色。

## 動態圖示

首頁各區標題、最新週報標籤與分享列使用 Ultra Lab Motion Icons v0.3.1（MIT 授權，著作權 Ultra Lab，授權全文見 `vendor/ultralab-icons-LICENSE.txt`）。樣式在 `vendor/ul-icons.css`，每頁 `<head>` 都要載入；圖示以不含 `<style>` 的精簡 SVG 直接寫在 HTML 中。電腦上滑鼠移到該區才會播放，手機上慢速自動播放，系統開啟「減少動態效果」時保持靜止。

## 英文版

`en/` 資料夾放全站英文版，檔名與中文版一一對應（`en/index.html`、`en/issue-NN.html`、`en/article-NN.html`），共用上層的 `style.css`、`vendor/`、`assets/`、`share.js`、`beacon3d.js`（路徑寫成 `../`）。

- 每頁 `<head>` 都有三條 `<link rel="alternate" hreflang>`（zh-Hant-TW、en、x-default），頁首導覽最後一個連結是語言切換：中文頁 `EN` 指向 `en/同檔名`，英文頁 `中文` 指向 `../同檔名`。
- 英文頁 `<html lang="en">`，canonical 與 og:url 指向 `https://rockfear.github.io/hsebeacon/en/…`。品牌顯示為「HSE Beacon」，旁邊以 `lang="zh-Hant-TW"` 保留「環安衛航標」。
- 3D 海域英文文字在 `en/beacon-en.js`（`window.BEACON_I18N`）：欄目名稱、來源標籤與浮標資料，順序、欄目與連結要和 `beacon3d.js` 的 `NODES` 一致；趨勢浮標標英文國名，實戰浮標標英文關鍵字（一兩個字）。
- 翻譯原則：週報忠於原文、用平實英文；作者專文採意譯並保留語氣，頁首註明譯自中文原文並連回中文版。
- 新增一期時：同時建立 `en/issue-NN.html`、更新 `en/index.html`（最新週報、期數清單、海域面板預設內容）、`en/beacon-en.js`、上一期英文頁的導覽與頁尾，以及 `sitemap.xml` 的英文網址。
