# Mind-Note

Yanyan Cheng 的個人網站：專案、讀書筆記、書評與自我反思。

心理學、神經科學與哲學的研讀。繁中版於術語後括注英文，例如：執行功能 (Executive Function)。亦可切換完整英文版。

## 本機

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 http://localhost:3000

公開網站（GitHub Pages）：https://chenghoiyan76-debug.github.io/neuroweb/

合併到 `main` 後，GitHub Actions 會自動更新這個網址。後台編輯內容若要出現在公開網站，需把 `data/site-content.json` 一併提交。

## 頁面結構

| 區塊 | 路徑 | 說明 |
| --- | --- | --- |
| 專案 | `/projects` | 特殊教育需要、精神健康；各有計劃與資源 |
| 讀書筆記 | `/notes` | 教育、臨床、精神健康、神經科學、心理學 |
| 書評 | `/books` | 依文類：心理學、哲學、神經科學、文學 |
| 自我反思 | `/reflection` | 條列主題與短文 |
| 關於 | `/about` | 個人簡介 |
| 聯絡 | `/contact` | 聯絡表單與方式 |
| 管理後台 | `/admin` | 新增／編輯／刪除所有內容 |

## 管理後台

入口：頁尾 **Admin**，或直接開 `/admin`（需密碼）。後台只在本機 `npm run dev` 可用，GitHub Pages 靜態站沒有 API。

- 開發環境預設密碼：`MindNoteStudio`（見 `.env.example` 的 `ADMIN_KEY`）
- 生產環境必須自行設定 `ADMIN_KEY`，未設定則拒絕登入
- 左側資料夾樹對應前台路徑：在哪個資料夾新增頁面，該頁就會出現在該路徑
  - 專案 → 特殊教育需要／精神健康 → 計劃／資源
  - 讀書筆記 → 場次 → 主題（含巢狀，例如介入）→ 筆記
  - 書評 → 文類 → 書評
  - 自我反思、關於我、聯絡、收件匣、匯入／匯出
- 讀書筆記可在場次或主題下新增子資料夾（自訂主題）
- 儲存後寫入 `data/site-content.json`，可用匯入／匯出做版本控管

## 原則

- 這是個人研讀與實踐筆記，不是臨床指引
- 不重製 DSM-5 受著作權保護的診斷準則原文
- 藥理與介入筆記是思考索引，不是處方
