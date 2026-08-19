"use client";

import { useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { useLocale } from "@/components/LocaleProvider";
import { PageHero } from "@/components/Ui";
import { pick, ui } from "@/lib/i18n";

export default function ContactPage() {
  const locale = useLocale();
  const content = useContent();
  const t = ui[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(form: FormData) {
    setStatus("sending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        message: String(form.get("message") ?? ""),
      }),
    });
    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHero kicker={t.contact} title={t.contactTitle} summary={pick(content.profile.contactNote, locale)} />
      <div className="mt-8 grid gap-2 text-sm text-ink-soft">
        <p>{pick(content.profile.personName, locale)}</p>
        <p>{pick(content.profile.location, locale)}</p>
        <a className="text-teal hover:underline" href={`mailto:${content.profile.email}`}>
          {content.profile.email}
        </a>
        {content.profile.socials.map((social) => (
          <a key={social.url} href={social.url} className="hover:underline">
            {social.label}
          </a>
        ))}
      </div>
      <form
        className="mt-10 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit(new FormData(event.currentTarget));
        }}
      >
        <label className="grid gap-1 text-sm">
          {t.contactName}
          <input name="name" required className="rounded-xl border border-rule bg-paper-2 px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          {t.contactEmail}
          <input name="email" type="email" required className="rounded-xl border border-rule bg-paper-2 px-3 py-2" />
        </label>
        <label className="grid gap-1 text-sm">
          {t.contactMessage}
          <textarea name="message" required rows={6} className="rounded-xl border border-rule bg-paper-2 px-3 py-2" />
        </label>
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="w-fit rounded-full bg-night px-5 py-2 text-sm text-paper-2 disabled:opacity-60"
        >
          {status === "sent" ? t.contactSent : t.contactSend}
        </button>
        {status === "error" ? <p className="text-sm text-rose">{t.contactError}</p> : null}
      </form>
    </div>
  );
}
