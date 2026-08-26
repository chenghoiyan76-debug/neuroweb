/**
 * Build A4 worksheet PDFs for every SEN resource.
 *
 * Output: public/worksheets/{slug}-zh.pdf and {slug}-en.pdf
 * Override: put a file in public/worksheets/designed/ with the same name
 *           to use your own designed PDF instead of the generated one.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import { senResources } from "../src/data/sen";
import { senAreaBySlug } from "../src/lib/sen-taxonomy";
import { ui, type Locale } from "../src/lib/i18n";
import type { SenResource, WorksheetBlock } from "../src/lib/sen-types";

const root = path.dirname(fileURLToPath(import.meta.url));
const senusRoot = path.resolve(root, "..");
const fontPath = path.join(senusRoot, "assets/fonts/DroidSansFallback.ttf");
const outDir = path.join(senusRoot, "public/worksheets");
const designedDir = path.join(outDir, "designed");

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 42;
const FOOTER = 36;
const INK = "#1b1714";
const SOFT = "#5c564c";
const GOLD = "#d4a017";
const NIGHT = "#12141c";
const PAPER = "#f4efe6";
const RULE = "#d8cfc0";
const TEAL = "#2f7a7a";
const BOX = "#fbf7ef";
const ADULT = "#f4ece2";
const HEADER_BG = "#efe6d6";

function pick(text: { zh: string; en: string }, locale: Locale) {
  return locale === "en" ? text.en : text.zh;
}

function wrap(doc: PDFKit.PDFDocument, text: string, width: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split(/\n/)) {
    let line = "";
    for (const ch of paragraph) {
      const trial = line + ch;
      if (line && doc.widthOfString(trial) > width) {
        lines.push(line);
        line = ch === " " ? "" : ch;
      } else {
        line = trial;
      }
    }
    lines.push(line);
  }
  return lines.length ? lines : [""];
}

class WorksheetPdf {
  private doc: PDFKit.PDFDocument;
  private y = MARGIN;
  private page = 1;
  private locale: Locale;
  private resource: SenResource;
  private contentWidth = PAGE.width - MARGIN * 2;

  constructor(resource: SenResource, locale: Locale) {
    this.resource = resource;
    this.locale = locale;
    this.doc = new PDFDocument({
      size: "A4",
      margin: 0,
      info: {
        Title: pick(resource.title, locale),
        Author: "Sencus",
        Subject: "SEN worksheet",
      },
    });
    this.doc.font(fontPath);
  }

  write(filePath: string) {
    const stream = fs.createWriteStream(filePath);
    this.doc.pipe(stream);
    this.paintPage();
    this.drawCover();
    for (const block of this.resource.worksheet) this.drawBlock(block);
    this.ensure(48);
    this.doc.fontSize(8).fillColor(SOFT).text(ui[this.locale].senDisclaimer, MARGIN, this.y, {
      width: this.contentWidth,
      lineBreak: true,
    });
    this.doc.end();
    return new Promise<void>((resolve, reject) => {
      stream.on("finish", resolve);
      stream.on("error", reject);
    });
  }

  private paintPage() {
    this.doc.rect(0, 0, PAGE.width, PAGE.height).fill(PAPER);
    this.doc.rect(0, 0, 8, PAGE.height).fill(GOLD);
    const footer = this.locale === "en" ? "sencus.com  ·  worksheet" : "sencus.com  ·  工作紙";
    this.doc.fontSize(8).fillColor(SOFT);
    this.doc.text(`${footer}  ·  ${this.page}`, MARGIN, PAGE.height - FOOTER + 8, {
      width: this.contentWidth,
      align: "left",
    });
  }

  private newPage() {
    this.doc.addPage();
    this.page += 1;
    this.y = MARGIN;
    this.paintPage();
    this.doc.fontSize(9).fillColor(TEAL).text("Sencus", MARGIN, this.y);
    this.y += 18;
    this.doc.moveTo(MARGIN, this.y).lineTo(PAGE.width - MARGIN, this.y).strokeColor(RULE).lineWidth(0.6).stroke();
    this.y += 14;
  }

  private ensure(height: number) {
    if (this.y + height > PAGE.height - FOOTER - 8) this.newPage();
  }

  private setFont(size: number, color = INK) {
    this.doc.font(fontPath).fontSize(size).fillColor(color);
  }

  private textBlock(text: string, size: number, color: string, gap = 8) {
    this.setFont(size, color);
    const lines = wrap(this.doc, text, this.contentWidth);
    const height = lines.length * (size + 4) + gap;
    this.ensure(height);
    this.setFont(size, color);
    for (const line of lines) {
      this.doc.text(line, MARGIN, this.y, { lineBreak: false });
      this.y += size + 4;
    }
    this.y += gap;
  }

  private drawCover() {
    const area = senAreaBySlug(this.resource.area);
    const t = ui[this.locale];
    this.y = MARGIN + 6;
    this.setFont(9, GOLD);
    this.doc.text("SENCUS", MARGIN + 8, this.y);
    this.y += 16;
    this.setFont(10, SOFT);
    this.doc.text(t.brandSub, MARGIN + 8, this.y);
    this.y += 22;
    if (area) {
      this.setFont(10, TEAL);
      this.doc.text(`${area.emoji}  ${pick(area.title, this.locale)}`, MARGIN + 8, this.y);
      this.y += 20;
    }
    this.setFont(22, NIGHT);
    const titleLines = wrap(this.doc, pick(this.resource.title, this.locale), this.contentWidth);
    this.ensure(titleLines.length * 28 + 20);
    for (const line of titleLines) {
      this.doc.text(line, MARGIN + 8, this.y, { lineBreak: false });
      this.y += 28;
    }
    this.y += 6;
    this.doc.moveTo(MARGIN, this.y).lineTo(PAGE.width - MARGIN, this.y).strokeColor(GOLD).lineWidth(1.4).stroke();
    this.y += 16;
    this.setFont(9, SOFT);
    this.doc.text(t.howToUse, MARGIN + 8, this.y);
    this.y += 16;
    this.box(pick(this.resource.howToUse, this.locale), HEADER_BG);
  }

  private box(text: string, fill: string, size = 10) {
    this.setFont(size, INK);
    const lines = wrap(this.doc, text, this.contentWidth - 24);
    const height = lines.length * (size + 4) + 20;
    this.ensure(height);
    this.doc.roundedRect(MARGIN, this.y, this.contentWidth, height, 6).fill(fill);
    this.setFont(size, INK);
    let ty = this.y + 10;
    for (const line of lines) {
      this.doc.text(line, MARGIN + 12, ty, { lineBreak: false });
      ty += size + 4;
    }
    this.y += height + 12;
  }

  private heading(text: string) {
    this.setFont(13, NIGHT);
    const lines = wrap(this.doc, text, this.contentWidth);
    this.ensure(lines.length * 18 + 10);
    for (const line of lines) {
      this.doc.text(line, MARGIN, this.y, { lineBreak: false });
      this.y += 18;
    }
    this.y += 6;
  }

  private checkboxRow(label: string, circle = false) {
    this.setFont(10, INK);
    const lines = wrap(this.doc, label, this.contentWidth - 28);
    const height = Math.max(22, lines.length * 14 + 10);
    this.ensure(height);
    this.doc.save();
    this.doc.roundedRect(MARGIN, this.y, this.contentWidth, height, 4).fillAndStroke(BOX, RULE);
    this.doc.restore();
    if (circle) {
      this.doc.circle(MARGIN + 14, this.y + 11, 5).strokeColor(INK).lineWidth(0.8).stroke();
    } else {
      this.doc.rect(MARGIN + 9, this.y + 6, 10, 10).strokeColor(INK).lineWidth(0.8).stroke();
    }
    this.setFont(10, INK);
    let ty = this.y + 6;
    for (const line of lines) {
      this.doc.text(line, MARGIN + 26, ty, { lineBreak: false });
      ty += 14;
    }
    this.y += height + 6;
  }

  private writeLines(count: number) {
    const height = count * 22 + 8;
    this.ensure(height);
    this.doc.save();
    this.doc.roundedRect(MARGIN, this.y, this.contentWidth, height, 4).fillAndStroke("#ffffff", RULE);
    this.doc.restore();
    for (let i = 1; i <= count; i += 1) {
      const ly = this.y + i * 22;
      this.doc.moveTo(MARGIN + 8, ly).lineTo(PAGE.width - MARGIN - 8, ly).strokeColor(RULE).lineWidth(0.5).stroke();
    }
    this.y += height + 8;
  }

  private drawBlock(block: WorksheetBlock) {
    if (block.kind === "goal") {
      this.box(pick(block.text, this.locale), HEADER_BG, 12);
      return;
    }
    if (block.kind === "adult") {
      const title = this.locale === "en" ? "For the adult" : "給成人／老師";
      this.heading(title);
      this.box(block.steps.map((step, i) => `${i + 1}. ${pick(step, this.locale)}`).join("\n"), ADULT, 10);
      return;
    }
    if (block.kind === "student") {
      this.textBlock(pick(block.text, this.locale), 11, INK, 12);
      return;
    }
    if (block.kind === "note") {
      this.textBlock(pick(block.text, this.locale), 9, SOFT, 12);
      return;
    }
    if (block.kind === "checklist") {
      this.heading(pick(block.title, this.locale));
      for (const item of block.items) this.checkboxRow(pick(item, this.locale));
      this.y += 6;
      return;
    }
    if (block.kind === "choice") {
      this.heading(pick(block.title, this.locale));
      for (const option of block.options) this.checkboxRow(pick(option, this.locale), true);
      this.y += 6;
      return;
    }
    if (block.kind === "boxes") {
      this.heading(pick(block.title, this.locale));
      for (const label of block.labels) {
        this.setFont(10, INK);
        this.ensure(18);
        this.doc.text(pick(label, this.locale), MARGIN, this.y);
        this.y += 16;
        this.writeLines(block.lines ?? 2);
      }
      return;
    }
    if (block.kind === "sequence") {
      this.heading(pick(block.title, this.locale));
      block.steps.forEach((step, index) => {
        this.setFont(10, INK);
        const text = pick(step, this.locale);
        const lines = wrap(this.doc, text, this.contentWidth - 36);
        const height = Math.max(26, lines.length * 14 + 12);
        this.ensure(height);
        this.doc.circle(MARGIN + 12, this.y + 12, 9).fill(NIGHT);
        this.setFont(9, PAPER);
        this.doc.text(String(index + 1), MARGIN + 7, this.y + 7, { width: 10, align: "center", lineBreak: false });
        this.setFont(10, INK);
        let ty = this.y + 6;
        for (const line of lines) {
          this.doc.text(line, MARGIN + 28, ty, { lineBreak: false });
          ty += 14;
        }
        this.y += height + 6;
      });
      this.y += 6;
      return;
    }
    if (block.kind === "cards") {
      this.heading(pick(block.title, this.locale));
      const gap = 10;
      const colW = (this.contentWidth - gap) / 2;
      for (let i = 0; i < block.cards.length; i += 2) {
        const left = block.cards[i];
        const right = block.cards[i + 1];
        this.setFont(10, INK);
        const leftLines = [
          ...wrap(this.doc, pick(left.title, this.locale), colW - 16),
          "",
          ...wrap(this.doc, pick(left.body, this.locale), colW - 16),
        ];
        const rightLines = right
          ? [
              ...wrap(this.doc, pick(right.title, this.locale), colW - 16),
              "",
              ...wrap(this.doc, pick(right.body, this.locale), colW - 16),
            ]
          : [];
        const height = Math.max(leftLines.length, rightLines.length) * 13 + 18;
        this.ensure(height);
        this.card(MARGIN, this.y, colW, height, leftLines);
        if (right) this.card(MARGIN + colW + gap, this.y, colW, height, rightLines);
        this.y += height + 8;
      }
      return;
    }
    if (block.kind === "scale") {
      this.heading(pick(block.title, this.locale));
      this.ensure(64);
      this.setFont(8, SOFT);
      this.doc.text(pick(block.min, this.locale), MARGIN, this.y, { width: 90 });
      this.doc.text(pick(block.max, this.locale), PAGE.width - MARGIN - 90, this.y, { width: 90, align: "right" });
      const startX = MARGIN + 100;
      const endX = PAGE.width - MARGIN - 100;
      const step = block.steps > 1 ? (endX - startX) / (block.steps - 1) : 0;
      for (let i = 0; i < block.steps; i += 1) {
        const cx = startX + step * i;
        this.doc.circle(cx, this.y + 28, 8).strokeColor(INK).lineWidth(0.8).stroke();
        this.setFont(8, SOFT);
        this.doc.text(String(i + 1), cx - 6, this.y + 40, { width: 12, align: "center" });
      }
      this.y += 62;
      if (block.labels?.length) {
        for (const label of block.labels) this.textBlock(pick(label, this.locale), 9, SOFT, 4);
      }
      return;
    }
    if (block.kind === "grid") {
      this.heading(pick(block.title, this.locale));
      const cols = block.headers.length;
      const colW = this.contentWidth / cols;
      const rowH = 26;
      this.ensure(rowH * (block.rowCount + 1) + 8);
      this.setFont(9, NIGHT);
      for (let c = 0; c < cols; c += 1) {
        const x = MARGIN + c * colW;
        this.doc.save();
        this.doc.rect(x, this.y, colW, rowH).fillAndStroke(HEADER_BG, RULE);
        this.doc.restore();
        this.setFont(8, NIGHT);
        this.doc.text(pick(block.headers[c], this.locale), x + 4, this.y + 8, {
          width: colW - 8,
          lineBreak: false,
        });
      }
      this.y += rowH;
      const rows = block.starterRows ?? [];
      for (let r = 0; r < block.rowCount; r += 1) {
        this.ensure(rowH);
        for (let c = 0; c < cols; c += 1) {
          const x = MARGIN + c * colW;
          this.doc.save();
          this.doc.rect(x, this.y, colW, rowH).fillAndStroke("#ffffff", RULE);
          this.doc.restore();
          const cell = rows[r]?.[c];
          if (cell && (cell.zh || cell.en)) {
            this.setFont(8, INK);
            this.doc.text(pick(cell, this.locale), x + 4, this.y + 8, { width: colW - 8, lineBreak: false });
          }
        }
        this.y += rowH;
      }
      this.y += 12;
      return;
    }
    if (block.kind === "script") {
      this.heading(pick(block.title, this.locale));
      for (const line of block.lines) {
        this.box(`${pick(line.speaker, this.locale)}：${pick(line.text, this.locale)}`, BOX, 10);
      }
    }
  }

  private card(x: number, y: number, w: number, h: number, lines: string[]) {
    this.doc.save();
    this.doc.roundedRect(x, y, w, h, 6).fillAndStroke("#ffffff", RULE);
    this.doc.restore();
    this.setFont(10, INK);
    let ty = y + 8;
    for (const line of lines) {
      this.doc.text(line, x + 8, ty, { width: w - 16, lineBreak: false });
      ty += 13;
    }
  }
}

async function main() {
  if (!fs.existsSync(fontPath)) {
    throw new Error(`Missing CJK font at ${fontPath}`);
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(designedDir, { recursive: true });

  let generated = 0;
  let copied = 0;
  for (const resource of senResources) {
    for (const locale of ["zh", "en"] as const) {
      const name = `${resource.slug}-${locale}.pdf`;
      const dest = path.join(outDir, name);
      const custom = path.join(designedDir, name);
      if (fs.existsSync(custom)) {
        fs.copyFileSync(custom, dest);
        copied += 1;
        continue;
      }
      await new WorksheetPdf(resource, locale).write(dest);
      generated += 1;
    }
  }
  console.log(`Worksheet PDFs: ${generated} generated, ${copied} from designed/ (${senResources.length} resources)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
