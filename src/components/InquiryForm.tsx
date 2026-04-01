"use client";

import { useState } from "react";

interface InquiryFormProps {
  dict: Record<string, any>;
  propertyName?: string;
}

export default function InquiryForm({ dict, propertyName }: InquiryFormProps) {
  const t = dict.inquiry;
  const [submitted, setSubmitted] = useState(false);
  const [isBroker, setIsBroker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to Supabase or email service
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <p className="text-emerald-800 font-medium">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
        <input
          type="text"
          required
          placeholder={t.namePlaceholder}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
          <input
            type="email"
            required
            placeholder={t.emailPlaceholder}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.phone}</label>
          <input
            type="tel"
            placeholder={t.phonePlaceholder}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isBroker}
            onChange={(e) => setIsBroker(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
          />
          <span className="text-sm text-gray-700">{t.broker}</span>
        </label>
      </div>

      {isBroker && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.company}</label>
          <input
            type="text"
            placeholder="Agency Name"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
        <textarea
          rows={3}
          placeholder={t.messagePlaceholder}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
      >
        {t.submit}
      </button>
    </form>
  );
}
