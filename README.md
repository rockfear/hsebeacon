# 環安衛航標 HSE Beacon

靜態網站，正式網域 `hsebeacon.tw`（見 `CNAME`）。目前儲存庫為 Private，尚未開啟 GitHub Pages。

## 檔案

- `index.html`：首頁（刊頭、3D 航標海域、各欄目、關於本站）
- `issue-NN.html`：各期週報
- `article-NN.html`：獨立專文
- `beacon3d.js`：首頁 3D 海域與浮標資料（`NODES` 陣列）
- `style.css`：全站樣式
- `sitemap.xml`、`robots.txt`、`og.png`、`CNAME`、`.nojekyll`

## 每週新增一期

1. 以最新一期的 `issue-NN.html` 為範本建立新檔，內文照週報原文，保留原始連結。
2. 上一期的頁首與頁尾加上通往新一期的連結。
3. `index.html`：更新「最新週報」、期數清單最上方加新一期、海域面板的預設內容。
4. `beacon3d.js` 的 `NODES`：第一筆換成新一期；環安衛趨勢放最新一期的五地動向與事故追蹤，加上最近三期；風險管理實戰放專文與最近兩期的案例。
5. `sitemap.xml` 加入新頁並更新首頁的 `lastmod`。

## 寫作原則

- 作者的專文保留原文語氣，只修錯字與事實。
- 每則標示來源類型：官方來源、作者分析、待驗證問題（調查中）。
- 事件日期、公告日期與資料截止日分開寫。
