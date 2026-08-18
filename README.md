# NeuroPsych Integrator

面向精神科醫師、臨床心理師及精神醫療從業人員的知識整合網站。專業術語（Terminology）保留英文，主要內容以繁體中文撰寫。

## 本機

```bash
npm install
cp .env.example .env.local
npm run dev
```

開啟 http://localhost:3000

## 五大主軸

| 路徑 | 軸 |
| --- | --- |
| `/dsm` | DSM-5 分類（頂部 Hover Dropdown） |
| `/symptoms` | 精神醫學症狀 Psychiatric Symptoms |
| `/neuropharmacology` | 神經藥理學：Psychosis / Pain killers / Neurodegeneration |
| `/interventions` | 治療神經科學與介入 |
| `/fundamentals` | 核心神經科學基礎 |

## 內容後台（Lab）

隱藏入口：頁尾極淡的 **LAB**，或直接開 `/lab`。

- 開發環境預設金鑰：`NeuroPsychLab`（見 `.env.example` 的 `NPI_LAB_KEY`）
- 生產環境必須自行設定 `NPI_LAB_KEY`，未設定則拒絕登入
- 儲存後寫入 `data/site-content.json`，可用 Export/Import 做版本控管

## 原則

- 不重製 DSM-5 診斷準則原文
- 藥理與腦刺激內容為專業教育，不是處方工具
