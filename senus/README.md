# Sencus

獨立的 SEN 學生教材庫：按實際困難搵介入工具，而不是按診斷分類。公開網址：[https://sencus.com](https://sencus.com)

這不是 Mind-Note 個人筆記站。

## 本機

在倉庫根目錄：

```bash
npm run dev:senus
```

或：

```bash
cd senus
npm install
npm run dev
```

開啟 http://localhost:3001（Cursor 雲端預覽請開 **3001** 埠）。

## 下載 PDF

每份教材都有「下載 PDF」。建置時會自動產生工作紙檔。

若要用你自己設計的 PDF，把檔案放到 `public/worksheets/designed/`，檔名例如：

`five-minute-start-card-zh.pdf`  
`five-minute-start-card-en.pdf`
