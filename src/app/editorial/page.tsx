import { editorialSeats, reviewSteps } from "@/lib/content/editorial";

export const metadata = {
  title: "專業審核機制",
  description: "NeuroWeb 編輯委員會席位與同儕審閱流程。",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-copper">Peer Review Mechanism</p>
      <h1 className="mt-2 font-serif text-4xl">專業審核機制</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
        中文圈精神醫學與心理學內容若缺少透明審閱，很容易在翻譯、劑量印象與療法口號之間失真。NeuroWeb 以席位制編委會運作，並把審查狀態寫在每篇條目上。
      </p>

      <h2 className="mt-12 font-serif text-3xl">編輯委員會席位</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {editorialSeats.map((seat) => (
          <article key={seat.seat} className="rounded-2xl border border-rule bg-paper-2 p-5">
            <p className="text-xs text-copper">{seat.credential}</p>
            <h3 className="mt-1 font-serif text-2xl">{seat.seat}</h3>
            <p className="mt-1 text-sm">{seat.domain}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{seat.duty}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-3xl">審閱流程</h2>
      <ol className="mt-6 grid gap-4">
        {reviewSteps.map((item) => (
          <li key={item.step} className="grid gap-2 rounded-2xl border border-rule bg-paper-2 p-5 md:grid-cols-[3rem_1fr]">
            <span className="font-serif text-2xl text-copper">{item.step}</span>
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
