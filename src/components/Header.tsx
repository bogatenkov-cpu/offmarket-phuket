"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  dict: Record<string, any>;
}

export default function Header({ locale, dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const otherLocale = locale === "en" ? "ru" : "en";
  const t = dict.nav;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">
              OffMarket <span className="text-emerald-600">Phuket</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/${locale}/properties`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              {t.properties}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
            >
              {t.about}
            </Link>
            <Link
              href={`/${otherLocale}`}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition border border-emerald-200 rounded-full px-3 py-1"
            >
              {t.language}
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              href={`/${locale}/properties`}
              className="block text-sm font-medium text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              {t.properties}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="block text-sm font-medium text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              href={`/${otherLocale}`}
              className="block text-sm font-medium text-emerald-600"
            >
              {t.language}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
