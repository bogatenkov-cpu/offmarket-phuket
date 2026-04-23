"use client";

import { useState } from "react";

interface InquiryFormProps {
  dict: Record<string, any>;
  propertyName?: string;
}

export default function InquiryForm({ dict }: InquiryFormProps) {
  const t = dict.inquiry;
  const [submitted, setSubmitted] = useState(false);
  const [isBroker, setIsBroker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
      <input type="text" required placeholder={t.namePlaceholder} className={inputClass} />
      <input type="email" required placeholder={t.emailPlaceholder} className={inputClass} />
      <input type="tel" placeholder={t.phonePlaceholder} className={inputClass} />
      <textarea rows={3} placeholder={t.messagePlaceholder} className={`${inputClass} resize-none`} />

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
        <input type="text" placeholder={t.company} className={inputClass} />
      )}

      <button
        type="submit"
        className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-3 px-4 rounded-md text-[15px] transition mt-2"
      >
        {t.submit}
      </button>
      <div className="text-[11px] text-ink-mute text-center pt-1">{t.confidential}</div>
    </form>
  );
}
