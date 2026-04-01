import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Record<string, any>;
}

export default function Footer({ locale, dict }: FooterProps) {
  const t = dict.footer;
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OM</span>
            </div>
            <span className="font-semibold text-lg text-white tracking-tight">
              OffMarket <span className="text-emerald-500">Phuket</span>
            </span>
          </div>
          <p className="text-sm text-center">{t.tagline}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/properties`} className="text-sm hover:text-white transition">
              {dict.nav.properties}
            </Link>
            <Link href={`/${locale}/about`} className="text-sm hover:text-white transition">
              {dict.nav.about}
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          &copy; {new Date().getFullYear()} OffMarket Phuket. {t.rights}
        </div>
      </div>
    </footer>
  );
}
