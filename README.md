# Digital Brain · 數位筆記

個人化第二大腦：以五層金字塔（Map of Our Mind）索引神經科學、心理動力、臨床精神醫學與東方哲學。

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

花園／Inbox：`/garden`（尚未歸檔的頁面與資源）

## 後門 Lab

隱藏入口：頁尾極淡的 **LAB**，或直接開 `/lab`。

- 開發環境預設金鑰：`NeuroPsychLab`（見 `.env.example` 的 `NPI_LAB_KEY`）
- 生產環境必須自行設定 `NPI_LAB_KEY`，未設定則拒絕登入
- 可新增筆記、頁面／領域、資源（連結、論文、書籍）
- 儲存後寫入 `data/site-content.json`，可用 Export/Import 做版本控管

## 原則

- 不重製 DSM-5 診斷準則原文
- 藥理、刺激與靈性筆記為思考索引，不是處方或修行指導
