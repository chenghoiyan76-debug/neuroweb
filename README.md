# NeuroWeb

專為心理健康專業人士（精神科醫師、臨床心理師與相關專業）設計的中文知識整合網站。系統整理心理學與認知模型、精神醫學與神經藥理學、心理治療與神經科學介入，並提供文獻回顧、個案研討與中英術語詞彙表。

## 本機開發

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

```bash
npm run lint
npm run build
```

## 資訊架構

| 路徑 | 內容 |
| --- | --- |
| `/models` | 注意力、記憶、執行功能、認知三角、威脅評估、神經多樣性 |
| `/psychiatry` | DSM/ICD 分類邏輯、抗憂鬱劑／抗精神病藥／情緒穩定劑、PK 與副作用監測 |
| `/therapy` | CBT（深度示範）、DBT、EMDR、ACT、神經回饋、TMS、神經可塑性 |
| `/reviews` | 實證文獻的臨床解讀 |
| `/cases` | 合成匿名教學個案 |
| `/glossary` | 中英對照詞彙 |
| `/editorial` | 編委會席位與審閱流程 |
| `/tags/[tag]` | 跨領域標籤 |

## 平台選擇

本計畫採用 **Next.js** 而非 WordPress / Webflow：條目、標籤與審查狀態可進入 Git 版本控管，專業社群能以 pull request 進行同儕修訂。內容以 TypeScript 資料模組存放於 `src/lib/content/`，日後可再接 headless CMS 而不必推翻分類系統。

## 內容原則

- 不重製 DSM-5-TR、ICD-11 受著作權保護的診斷準則條文。
- 藥理與腦刺激內容僅供專業教育，不是處方工具。
- 個案均為合成教學材料。
- 每篇標示審查狀態與證據等級。
