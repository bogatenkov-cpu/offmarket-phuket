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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rule">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 text-ink no-underline">
            <div className="w-[30px] h-[30px] bg-navy text-white flex items-center justify-center font-display text-lg leading-none">
              o
            </div>
            <div className="font-bold text-[17px] tracking-tight">
              offmarket<span className="text-coral">.</span>phuket
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            <Link
              href={`/${locale}/properties`}
              className="text-sm font-medium text-ink-soft hover:text-ink transition pb-2 border-b-2 border-transparent"
            >
              {t.properties}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-medium text-ink-soft hover:text-ink transition pb-2 border-b-2 border-transparent"
            >
              {t.about}
            </Link>
            <span className="w-px h-4 bg-rule" />
            <Link
              href={`/${otherLocale}`}
              className="px-2.5 py-1.5 border border-rule rounded-md text-xs text-ink-soft hover:border-ink-soft transition"
            >
              {t.language} · USD
            </Link>
            <Link
              href={`/${locale}/properties`}
              className="bg-navy text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-navy-2 transition"
            >
              {t.requestAccess}
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
        <div className="md:hidden border-t border-rule bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href={`/${locale}/properties`}
              className="block text-sm font-medium text-ink-soft"
              onClick={() => setMenuOpen(false)}
            >
              {t.properties}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="block text-sm font-medium text-ink-soft"
              onClick={() => setMenuOpen(false)}
            >
              {t.about}
            </Link>
            <Link
              href={`/${otherLocale}`}
              className="block text-sm font-medium text-ink-soft"
            >
              {t.language}
            </Link>
            <Link
              href={`/${locale}/properties`}
              className="block bg-navy text-white px-4 py-2.5 text-sm font-medium rounded-md text-center mt-3"
              onClick={() => setMenuOpen(false)}
            >
              {t.requestAccess}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
