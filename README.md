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

入口：頁尾 **Admin**，或直接開 `/admin`（需密碼）。

- 開發環境預設密碼：`MindNoteStudio`（見 `.env.example` 的 `ADMIN_KEY`）
- 生產環境必須自行設定 `ADMIN_KEY`，未設定則拒絕登入
- 可新增／編輯／刪除專案、筆記、書評、反思，並修改關於我與聯絡資料
- 訪客留言會進後台收件匣
- 儲存後寫入 `data/site-content.json`，可用匯出／匯入做版本控管

## 原則

- 這是個人研讀與實踐筆記，不是臨床指引
- 不重製 DSM-5 受著作權保護的診斷準則原文
- 藥理與介入筆記是思考索引，不是處方
