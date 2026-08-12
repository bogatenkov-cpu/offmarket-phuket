"use client";

import { useState } from "react";

interface InquiryFormProps {
  dict: Record<string, any>;
  propertyName?: string;
}

export default function InquiryForm({ dict, propertyName }: InquiryFormProps) {
  const t = dict.inquiry;
  const isRu = /[а-яА-Я]/.test(t.submit || "");
  const [submitted, setSubmitted] = useState(false);
  const [isBroker, setIsBroker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          company: data.get("company"),
          isBroker,
          property: propertyName,
          lang: isRu ? "ru" : "en",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-mint-soft border border-mint-border rounded-xl p-6 text-center">
        <div className="text-3xl mb-2">✓</div>
        <p className="text-mint font-medium">{t.success}</p>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2.5 border border-rule rounded-md text-[14px] text-ink placeholder:text-ink-mute outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy/50 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <input type="text" name="name" required placeholder={t.namePlaceholder} className={inputClass} />
      <input type="email" name="email" required placeholder={t.emailPlaceholder} className={inputClass} />
      <input type="tel" name="phone" placeholder={t.phonePlaceholder} className={inputClass} />
      <textarea name="message" rows={3} placeholder={t.messagePlaceholder} className={`${inputClass} resize-none`} />

      <label className="flex items-center gap-2 text-[13px] text-ink-soft cursor-pointer pt-1">
        <input
          type="checkbox"
          checked={isBroker}
          onChange={(e) => setIsBroker(e.target.checked)}
          className="w-4 h-4 accent-navy"
        />
        {t.broker}
      </label>

      {isBroker && (
        <input type="text" name="company" placeholder={t.company} className={inputClass} />
      )}

      {error && (
        <p className="text-[13px] text-red-600 text-center">
          {isRu ? "Что-то пошло не так. Попробуйте ещё раз." : "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-navy hover:bg-navy-2 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-md text-[15px] transition mt-2"
      >
        {loading ? (isRu ? "Отправка…" : "Sending…") : t.submit}
      </button>
      <div className="text-[11px] text-ink-mute text-center pt-1">{t.confidential}</div>
    </form>
  );
}
