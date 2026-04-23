import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Record<string, any>;
}

export default function Footer({ locale, dict }: FooterProps) {
  const t = dict.footer;
  return (
    <footer className="mt-20 border-t border-rule bg-surface">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="font-bold text-[17px] tracking-tight">
              offmarket<span className="text-coral">.</span>phuket
            </div>
            <p className="text-[13px] text-ink-mute leading-relaxed mt-2.5 max-w-xs">
              {t.tagline}
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.1em] text-ink-mute mb-3.5">
              {t.col1.title}
            </div>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col1.allListings}
            </Link>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col1.bangTao}
            </Link>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col1.kamala}
            </Link>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col1.ready}
            </Link>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col1.uc}
            </Link>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.1em] text-ink-mute mb-3.5">
              {t.col2.title}
            </div>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col2.requestAccess}
            </Link>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col2.savedSearches}
            </Link>
            <Link href={`/${locale}/properties`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col2.alerts}
            </Link>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.1em] text-ink-mute mb-3.5">
              {t.col3.title}
            </div>
            <Link href={`/${locale}/about`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col3.about}
            </Link>
            <Link href={`/${locale}/about`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col3.brokers}
            </Link>
            <Link href={`/${locale}/about`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col3.terms}
            </Link>
            <Link href={`/${locale}/about`} className="block text-[13px] text-ink-soft hover:text-ink mb-2 transition">
              {t.col3.contact}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-rule flex flex-col md:flex-row justify-between text-xs text-ink-mute gap-2">
          <span>&copy; {new Date().getFullYear()} offmarket.phuket — {t.rights}</span>
          <span>Bang Tao · Bangkok · Singapore</span>
        </div>
      </div>
    </footer>
  );
}
