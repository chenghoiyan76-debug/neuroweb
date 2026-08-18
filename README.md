# Mind-Note

Study on psychology, neuroscience and philosophy.

心理學、神經科學與哲學的研讀筆記。以五層金字塔（Map of Our Mind）作為索引。

繁中版於術語後括注英文，例如：依附理論 (Attachment Theory)。亦可切換完整英文版。

## 本機

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 http://localhost:3000

## 五層金字塔

| 層 | 路徑 | 定位 |
| --- | --- | --- |
| 1 | `/level/1` | 心智的本質與結構 |
| 2 | `/level/2` | 心智的測量 |
| 3 | `/level/3` | 心智的互動 |
| 4 | `/level/4` | 健康與疾病的界線 |
| 5 | `/level/5` | 超越心智與形而上學 |

自我反思：`/reflection`（頂部導覽獨立頁，可在後台新增筆記）

## 精神醫學與分類（Level 4）

路徑：`/domain/psychiatry-dsm5`

依 DSM-5 十九類展開。每個疾患有五個子頁：認知模式、行為、衡鑑、藥物簡介與心理介入、案例分享。**不重製診斷準則原文**；案例為合成教學敘事。

## 管理後台

入口：頁尾 **Admin**，或直接開 `/admin`（需密碼）。

- 開發環境預設密碼：`NeuroPsychLab`（見 `.env.example` 的 `NPI_LAB_KEY`）
- 生產環境必須自行設定 `NPI_LAB_KEY`，未設定則拒絕登入
- 可新增／編輯／刪除筆記、頁面與資源（連結、論文、書籍）
- 儲存後寫入 `data/site-content.json`，可用匯出／匯入做版本控管
- 舊路徑 `/lab`、`/garden` 會轉到 `/admin`

## 原則

- 不重製 DSM-5 診斷準則原文
- 藥理、刺激與靈性筆記為思考索引，不是處方或修行指導
