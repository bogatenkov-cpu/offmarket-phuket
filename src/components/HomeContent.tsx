import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Property } from "@/data/types";
import PropertyCard from "./PropertyCard";

interface HomeContentProps {
  locale: Locale;
  dict: Record<string, any>;
  stats: {
    total: number;
    minPrice: number;
    avgYield: number;
    biggestMarkdown: number;
    biggestMarkdownName: string;
  };
  featured: Property[];
  districts: { name: string; count: number; minPrice: number; img: string }[];
}

const formatK = (n: number) => `$${Math.round(n / 1000)}k`;

export default function HomeContent({ locale, dict, stats, featured, districts }: HomeContentProps) {
  const t = dict;

  return (
    <>
      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-end">
          <div>
            <span className="inline-block bg-[#23322E]/90 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {t.hero.badgePre}<span className="text-[#A4FF55]">{t.hero.badgeAccent}</span>{t.hero.badgePost}
            </span>
            <h1 className="font-sans font-bold text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.98] tracking-[-0.035em] mt-5 mb-5">
              {t.hero.title}{" "}
              <span className="font-display text-[#499E00]">{t.hero.titleAccent}</span>{" "}
              {t.hero.titleTail}
              <span className="text-[#A4FF55]">.</span>
            </h1>
            <p className="text-[17px] lg:text-[19px] text-ink-soft leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>
          </div>

          <div className="bg-[#23322E]/90 backdrop-blur-sm rounded-xl p-4 lg:p-5">
            <div className="text-xs uppercase tracking-[0.1em] text-white/60 mb-2.5">
              {t.hero.searchTitle}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select className="px-3 py-2.5 bg-white/10 border border-white/20 rounded-md text-[14px] text-white outline-none">
                <option className="text-ink bg-white">{t.hero.searchAllPhuket}</option>
                <option className="text-ink bg-white">Bang Tao</option>
                <option className="text-ink bg-white">Kamala</option>
                <option className="text-ink bg-white">Rawai</option>
              </select>
              <select className="px-3 py-2.5 bg-white/10 border border-white/20 rounded-md text-[14px] text-white outline-none">
                <option className="text-ink bg-white">{t.hero.searchAnyType}</option>
                <option className="text-ink bg-white">{t.catalog.filters.apartment}</option>
                <option className="text-ink bg-white">{t.catalog.filters.villa}</option>
              </select>
              <select className="px-3 py-2.5 bg-white/10 border border-white/20 rounded-md text-[14px] text-white outline-none">
                <option className="text-ink bg-white">{t.hero.searchAnyPrice}</option>
                <option className="text-ink bg-white">Up to $300k</option>
                <option className="text-ink bg-white">$300k–$600k</option>
                <option className="text-ink bg-white">$600k+</option>
              </select>
              <select className="px-3 py-2.5 bg-white/10 border border-white/20 rounded-md text-[14px] text-white outline-none">
                <option className="text-ink bg-white">{t.hero.searchAnyStage}</option>
                <option className="text-ink bg-white">{t.catalog.filters.ready}</option>
                <option className="text-ink bg-white">{t.catalog.filters.construction}</option>
              </select>
            </div>
            <Link
              href={`/${locale}/properties`}
              className="block bg-white hover:bg-white/90 text-navy text-center text-[15px] font-medium px-4 py-3.5 rounded-md mt-3 transition"
            >
              🔍 {t.hero.searchCta.replace("{n}", stats.total)}
            </Link>
          </div>
        </div>

        {/* Quick chips */}
        <div className="max-w-[1440px] mx-auto mt-8 flex flex-wrap gap-2">
          {(t.hero.quickChips as [string, string][]).map(([k, c], i) => (
            <Link
              key={i}
              href={`/${locale}/properties`}
              className="inline-flex items-center gap-2 bg-white border border-rule rounded-full px-4 py-2 text-[13px] text-ink hover:border-ink-soft transition"
            >
              <span>{k}</span>
              <span className="text-ink-mute text-xs">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 lg:pt-14">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 bg-[#23322E]/90 text-white rounded-xl overflow-hidden">
          <div className="p-5 lg:p-6 lg:border-r border-white/10 border-b lg:border-b-0">
            <div className="text-3xl lg:text-[40px] font-medium tracking-[-0.02em]">{stats.total}</div>
            <div className="text-sm font-medium mt-1 text-white/70">{t.stats.liveListings}</div>
            <div className="text-xs text-white/40 mt-0.5">&nbsp;</div>
          </div>
          <div className="p-5 lg:p-6 lg:border-r border-white/10 border-b lg:border-b-0">
            <div className="text-3xl lg:text-[40px] font-medium tracking-[-0.02em] text-[#A4FF55]">
              −{stats.biggestMarkdown.toFixed(1)}%
            </div>
            <div className="text-sm font-medium mt-1 text-white/70">{t.stats.biggestMarkdown}</div>
            <div className="text-xs text-white/40 mt-0.5">{stats.biggestMarkdownName}</div>
          </div>
          <div className="p-5 lg:p-6 lg:border-r border-white/10">
            <div className="text-3xl lg:text-[40px] font-medium tracking-[-0.02em]">
              {stats.avgYield.toFixed(1)}%
            </div>
            <div className="text-sm font-medium mt-1 text-white/70">{t.stats.avgYield}</div>
            <div className="text-xs text-white/40 mt-0.5">{t.stats.avgYieldSub}</div>
          </div>
          <div className="p-5 lg:p-6">
            <div className="text-3xl lg:text-[40px] font-medium tracking-[-0.02em]">
              {formatK(stats.minPrice)}
            </div>
            <div className="text-sm font-medium mt-1 text-white/70">{t.stats.lowestEntry}</div>
            <div className="text-xs text-white/40 mt-0.5">{t.stats.lowestEntrySub}</div>
          </div>
        </div>
      </section>

      {/* Featured rail */}
      <section className="px-4 sm:px-6 lg:px-8 pt-14 lg:pt-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-baseline mb-5">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] text-coral font-semibold">
                {t.featured.kicker}
              </div>
              <h2 className="text-2xl sm:text-[32px] font-bold tracking-[-0.02em] mt-1.5">
                {t.featured.title}
              </h2>
            </div>
            <Link
              href={`/${locale}/properties`}
              className="text-sm text-navy font-medium hover:underline underline-offset-4"
            >
              {t.featured.seeAll.replace("{n}", stats.total)}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} locale={locale} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-12">
          <div>
            <div className="text-xs uppercase tracking-[0.12em] text-navy font-semibold">
              {t.advantages.kicker}
            </div>
            <h2 className="text-3xl lg:text-[40px] font-bold tracking-[-0.025em] leading-[1.05] mt-2 mb-4">
              {t.advantages.title}{" "}
              <span className="font-display text-navy">{t.advantages.titleAccent}</span>{" "}
              {t.advantages.titleTail}
            </h2>
            <p className="text-[15px] text-ink-soft leading-relaxed">
              {t.advantages.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(t.advantages.items as { title: string; desc: string }[]).map((item, i) => (
              <div key={i} className="bg-white border border-rule rounded-xl p-5 lg:p-6">
                <div className="font-display text-coral text-[36px] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-[17px] font-semibold mt-2.5 tracking-[-0.01em]">{item.title}</div>
                <p className="text-[13.5px] text-ink-mute leading-relaxed mt-1.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Districts rail */}
      <section className="px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex justify-between items-baseline mb-5">
            <h2 className="text-2xl lg:text-[28px] font-bold tracking-[-0.02em]">{t.districts.title}</h2>
            <Link href={`/${locale}/properties`} className="text-sm text-navy font-medium hover:underline underline-offset-4">
              {t.districts.all}
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {districts.map((d) => (
              <Link
                key={d.name}
                href={`/${locale}/properties`}
                className="group block rounded-xl overflow-hidden hover:shadow-lg transition no-underline relative"
              >
                <div className="h-48 lg:h-56 bg-black overflow-hidden">
                  <img src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#23322E] via-[#23322E]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 lg:p-4 text-white">
                  <div className="text-[17px] font-semibold tracking-[-0.01em]">{d.name}</div>
                  <div className="text-xs text-white/70 mt-1 flex gap-3">
                    <span>{d.count} {t.districts.listings}</span>
                    <span>{t.districts.from} {formatK(d.minPrice)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mt-20 bg-navy text-white px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-[#7da88e] font-semibold">
              {t.ctaBand.kicker}
            </div>
            <h2 className="text-3xl sm:text-[40px] lg:text-[48px] font-bold tracking-[-0.025em] leading-[1.05] mt-2.5 mb-4">
              {t.ctaBand.title}{" "}
              <span className="font-display text-[#A4FF55]">{t.ctaBand.titleAccent}</span>.
            </h2>
            <p className="text-[15px] lg:text-base text-[#8fa89b] leading-relaxed max-w-xl">
              {t.ctaBand.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link
              href={`/${locale}/properties`}
              className="bg-white hover:bg-white/90 text-navy text-center font-semibold px-5 py-4 rounded-md text-[15px] transition"
            >
              {t.ctaBand.primary}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="bg-transparent border border-white/30 hover:bg-white/10 text-white text-center font-medium px-5 py-3.5 rounded-md text-[15px] transition"
            >
              {t.ctaBand.secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
