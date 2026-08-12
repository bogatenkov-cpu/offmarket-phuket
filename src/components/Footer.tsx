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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div>
              <div className="font-bold text-[17px] tracking-tight leading-none">
                offmarket<span className="text-[#A4FF55]">.</span>phuket
              </div>
              <div className="text-[9px] text-ink-mute tracking-[0.04em] mt-0.5">by Tranio</div>
            </div>
            <p className="text-[13px] text-ink-mute leading-relaxed mt-2.5 max-w-xs">
              {t.tagline}
            </p>
          </div>

          <Link href={`/${locale}/about`} className="inline-flex items-center justify-center bg-navy hover:bg-navy-2 text-white font-medium px-5 py-2.5 rounded-md text-[14px] transition">
            {t.col3.about}
          </Link>
        </div>

        <div className="mt-8 pt-5 border-t border-rule flex flex-col md:flex-row justify-between text-xs text-ink-mute gap-2">
          <span>&copy; {new Date().getFullYear()} offmarket.phuket — {t.rights}</span>
          <span>Phuket, Thailand</span>
        </div>
      </div>
    </footer>
  );
}
