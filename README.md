# Yanis Cheng Note

Yanyan Cheng 的個人網站：專案、讀書筆記、書評與自我反思。

心理學、神經科學與哲學的研讀。繁中版於術語後括注英文，例如：執行功能 (Executive Function)。亦可切換完整英文版。

## 本機

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 http://localhost:3000

固定網址（把 Wix DNS 改成 GitHub 之後）：https://yanischeng.com

你的網域 `yanischeng.com` 名稱伺服器仍在 Wix。請在 Wix → Domains → `yanischeng.com` → Manage DNS Records：

1. **刪掉** 仍指向 Wix 的 A 紀錄（例如 `185.230.63.x`），只留下 GitHub 的四筆 A
2. 把 `www` 的 CNAME 從 `initial.wixdns.net` 改成 `chenghoiyan76-debug.github.io`

正確的紀錄只有這些：

| 類型 | 主機名稱 | 值 |
| --- | --- | --- |
| A | `@`（根網域） | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `chenghoiyan76-debug.github.io` |

| 類型 | 主機名稱 | 值 |
| --- | --- | --- |
| A | `@`（根網域） | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `chenghoiyan76-debug.github.io` |

加好後等幾分鐘到幾小時，再開 https://yanischeng.com 。GitHub 會自動簽 HTTPS。

合併到 `main` 後，GitHub Actions 會發佈到這個網域。後台在 `/admin`，預設密碼 `MindNoteStudio`。若要把編輯永久寫進網站，把下載的 JSON 放到 `data/site-content.json` 再提交。

## 頁面結構

| 區塊 | 路徑 | 說明 |
| --- | --- | --- |
| 專案 | `/projects` | 特殊教育需要、精神健康；各有計劃與資源 |
| 讀書筆記 | `/notes` | 教育、臨床、精神健康、神經科學、心理學 |
| 書評 | `/books` | 依文類：心理學、哲學、神經科學、文學 |
| 自我反思 | `/reflection` | 條列主題與短文 |
| 關於 | `/about` | 個人簡介 |
| 聯絡 | `/contact` | 聯絡表單與方式 |

## 管理後台（不公開）

前台沒有後台連結，訪客看不到。你自己直接開 `/admin`（需密碼）。

- 預設密碼：`MindNoteStudio`（見 `.env.example` 的 `ADMIN_KEY` / `NEXT_PUBLIC_ADMIN_KEY`）
- 本機 `npm run dev` 會把內容寫入 `data/site-content.json`
- GitHub Pages 沒有 API，後台仍可登入：編輯存在這個瀏覽器，按儲存會下載 JSON；把檔案放到倉庫的 `data/site-content.json` 並提交後，公開網站才會永久更新
- 左側資料夾樹對應前台路徑：在哪個資料夾新增頁面，該頁就會出現在該路徑
  - 專案 → 特殊教育需要／精神健康 → 計劃／資源
  - 讀書筆記 → 場次 → 主題（含巢狀，例如介入）→ 筆記
  - 書評 → 文類 → 書評
  - 自我反思、關於我、聯絡、收件匣、匯入／匯出
- 讀書筆記可在場次或主題下新增子資料夾（自訂主題）

## 原則

- 這是個人研讀與實踐筆記，不是臨床指引
- 不重製 DSM-5 受著作權保護的診斷準則原文
- 藥理與介入筆記是思考索引，不是處方
