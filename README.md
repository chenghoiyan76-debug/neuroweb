# Mind-Note

Yanyan Cheng 的網站：SEN 學生教材庫（按實際困難而非診斷分類），以及心理學、神經科學與哲學的研讀筆記。

公開網站：[https://senus.com](https://senus.com)（GitHub Pages 自訂網域）

## 教材庫怎麼用

首頁問的是「你今日想幫學生解決甚麼？」——例如坐唔定、唔肯開始做功課、睇完文章唔知講乜——而不是 ADHD／ASD／讀寫障礙入口。

1. **第一層：我想改善甚麼？** 十個能力區域（專注、閱讀、寫作、數學、溝通、社交、情緒、生活技能、感覺動作、支援工具）
2. **第二層：篩選** 年齡、能力程度、SEN 類型（只作標籤）、教材形式、所需時間、難度
3. **第三層：打開／列印／下載** 每份教材有使用說明與可列印工作紙（瀏覽器「列印 → 儲存為 PDF」）

目前約 100 份教材。同一份教材可用多個標籤，不必複製三次。方向符合通用學習設計（UDL）：因應不同學習者提供不同接收、理解與表達方式。

這些教材是課堂與家庭支架，不是診斷或治療。

## 本機

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 http://localhost:3000

合併到 `main` 後，GitHub Actions 會自動更新公開網址。後台編輯內容若要出現在公開網站，需把 `data/site-content.json` 一併提交。

## 網域 senus.com

程式已設定為用 `senus.com` 發佈（不再用 `/neuroweb` 路徑）。你還需要在網域註冊商加入 DNS，指向 GitHub Pages：

**A 紀錄（主域名 `senus.com`）**

| 類型 | 主機 | 值 |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

**可選：www**

| 類型 | 主機 | 值 |
| --- | --- | --- |
| CNAME | `www` | `chenghoiyan76-debug.github.io` |

DNS 生效後，到 GitHub 倉庫 **Settings → Pages** 確認 Custom domain 是 `senus.com`，並勾選 Enforce HTTPS。舊網址 `https://chenghoiyan76-debug.github.io/neuroweb/` 之後可能無法正確載入資源。

## 頁面結構

| 區塊 | 路徑 | 說明 |
| --- | --- | --- |
| 首頁／困難入口 | `/` | 按今日困難搵教材 |
| 能力區域 | `/improve` | 十個能力區域 |
| 情境 | `/improve/[area]/[situation]` | 例如專注 → 開始做功課 |
| 全部教材 | `/resources` | 篩選與搜尋 |
| 教材頁 | `/resources/[slug]` | 說明、標籤、工作紙 |
| 列印 | `/print/[slug]` | 列印／儲存 PDF |
| 專案 | `/projects` | 特殊教育需要、精神健康 |
| 讀書筆記 | `/notes` | 教育、臨床、精神健康、神經科學、心理學 |
| 書評 | `/books` | 依文類 |
| 自我反思 | `/reflection` | 條列主題與短文 |
| 關於 | `/about` | 個人簡介 |
| 聯絡 | `/contact` | 聯絡表單 |
| 管理後台 | `/admin` | 新增／編輯／刪除筆記類內容 |

## 管理後台

入口：頁尾 **Admin**，或直接開 `/admin`（需密碼）。後台只在本機 `npm run dev` 可用，GitHub Pages 靜態站沒有 API。

- 開發環境預設密碼：`MindNoteStudio`（見 `.env.example` 的 `ADMIN_KEY`）
- 生產環境必須自行設定 `ADMIN_KEY`，未設定則拒絕登入

## 原則

- 教材與筆記都不是臨床指引
- 不以診斷作為教材主分類
- 不重製 DSM-5 受著作權保護的診斷準則原文
