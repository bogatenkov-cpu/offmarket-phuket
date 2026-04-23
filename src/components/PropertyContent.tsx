import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Property } from "@/data/types";
import { formatPriceExact } from "@/lib/properties";
import ImageGallery from "@/components/ImageGallery";
import InquiryForm from "@/components/InquiryForm";
import PropertyCard from "@/components/PropertyCard";

interface PropertyContentProps {
  locale: Locale;
  dict: Record<string, any>;
  property: Property;
  similar: Property[];
}

export default function PropertyContent({ locale, dict, property, similar }: PropertyContentProps) {
  const p = property;
  const t = dict.property;
  const isRu = locale === "ru";
  const district = isRu ? p.district : p.district_en;
  const dealType = isRu ? p.deal_type : p.deal_type_en;
  const condition = isRu ? p.condition : p.condition_en;
  const furnished = isRu ? p.furnished : p.furnished_en;
  const notes = isRu ? p.notes : p.notes_en;
  const analystComment = isRu ? p.analyst_comment : (p.analyst_comment_en || p.analyst_comment);
  const floor = isRu ? p.floor : p.floor_en || p.floor;

  const savings = p.market_price_usd - p.sale_price_usd;
  const askPct = Math.min(100, (p.sale_price_usd / Math.max(p.market_price_usd, p.sale_price_usd)) * 100);

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-5 pb-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[13px] text-ink-mute mb-4">
          <Link href={`/${locale}/properties`} className="text-ink-mute hover:text-ink no-underline">
            {dict.nav.properties}
          </Link>
          <span className="mx-2">›</span>
          <Link href={`/${locale}/properties`} className="text-ink-mute hover:text-ink no-underline">
            {district}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-ink">{p.project_name}</span>
        </div>

        {/* Gallery */}
        <ImageGallery photos={p.photos} projectName={p.project_name} propertyType={p.property_type} />

        {/* Title + Price */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-10 mt-7">
          <div>
            <div className="flex flex-wrap gap-2 mb-3.5">
              {p.is_ready ? (
                <span className="inline-flex items-center gap-1 bg-mint-soft text-mint border border-mint-border text-xs font-medium px-3 py-1.5 rounded-full">
                  ● {dict.catalog.card.ready}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-amber-soft text-amber-tone border border-amber-border text-xs font-medium px-3 py-1.5 rounded-full">
                  ◐ {dict.catalog.card.construction}
                </span>
              )}
              {p.discount_pct > 0 && (
                <span className="inline-flex items-center gap-1 bg-coral-soft text-coral border border-coral-border text-xs font-medium px-3 py-1.5 rounded-full">
                  ▼ {p.discount_pct.toFixed(1)}% {dict.catalog.card.offMarket}
                </span>
              )}
              <span className="inline-flex items-center gap-1 bg-ink text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {dealType}
              </span>
            </div>

            <h1 className="text-3xl sm:text-[40px] font-bold tracking-[-0.025em] leading-[1.1]">
              {p.project_name}
              {p.bedrooms > 0 && (
                <span className="font-display text-navy ml-2.5">
                  · {p.bedrooms} {p.bedrooms === 1 ? dict.catalog.card.bed : dict.catalog.card.beds}
                </span>
              )}
            </h1>
            <div className="text-[15px] text-ink-mute mt-2">
              {floor} · {district}, {isRu ? p.city : "Phuket"}
            </div>

            {/* Fact strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 bg-surface border border-rule rounded-xl overflow-hidden">
              {[
                [t.area, `${p.area_sqm} m²`],
                [t.bedrooms, p.bedrooms === 0 ? dict.catalog.filters.studio : `${p.bedrooms}`],
                [t.condition, condition],
                [t.completion, `${p.year_built}`],
              ].map(([k, v], i) => (
                <div
                  key={i}
                  className={`p-4 lg:p-5 ${i < 3 ? "sm:border-r border-rule" : ""} ${i < 2 ? "border-b sm:border-b-0 border-rule" : ""}`}
                >
                  <div className="text-[11px] text-ink-mute uppercase tracking-[0.08em]">{k}</div>
                  <div className="text-lg lg:text-[20px] font-semibold mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Price panel */}
          <div className="bg-white border border-rule rounded-xl p-5 lg:p-6">
            <div className="text-[11px] text-ink-mute uppercase tracking-[0.1em]">{t.askingPrice}</div>
            <div className="text-[36px] lg:text-[42px] font-bold tracking-[-0.025em] mt-1.5 leading-none">
              {formatPriceExact(p.sale_price_usd)}
            </div>
            <div className="text-sm text-ink-mute mt-1">
              {formatPriceExact(p.price_per_sqm)} {t.perSqm}
            </div>

            {p.discount_pct > 0 && (
              <div className="mt-4 px-4 py-3 bg-[#fef1ec] rounded-lg border border-coral-border">
                <div className="flex justify-between text-[13px]">
                  <span className="text-ink-soft">{t.marketEstimate}</span>
                  <span className="font-semibold line-through text-ink-mute">{formatPriceExact(p.market_price_usd)}</span>
                </div>
                <div className="flex justify-between text-[13px] mt-1.5">
                  <span className="text-ink-soft">{t.youSave}</span>
                  <span className="font-bold text-coral">
                    {formatPriceExact(savings)} · −{p.discount_pct.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}

            <button className="w-full mt-4 bg-navy hover:bg-navy-2 text-white font-semibold py-3.5 px-4 rounded-md text-[15px] transition">
              {t.requestDossier}
            </button>
            <button className="w-full mt-2 bg-white border border-rule hover:border-ink-soft text-ink font-medium py-3 px-4 rounded-md text-[15px] transition">
              {t.bookViewing}
            </button>
            <div className="text-[11px] text-ink-mute mt-3 text-center">{t.responseTime}</div>
          </div>
        </div>

        {/* Main + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-10 mt-12">
          <div>
            {/* Overview */}
            <div className="mb-10">
              <h2 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em] mb-3.5">{t.overview}</h2>
              {notes && (
                <p className="text-base text-ink-soft leading-relaxed">{notes}</p>
              )}
              <div className="grid grid-cols-2 sm:grid-cols-3 mt-6 border-t border-b border-rule">
                {[
                  [t.tenure, dealType],
                  [t.condition, condition],
                  [t.furnishing, furnished || (isRu ? "Нет" : "—")],
                  [t.seller, p.seller || "Owner"],
                  [p.rental_yield_pct > 0 ? t.rentalYield : t.completion, p.rental_yield_pct > 0 ? `${p.rental_yield_pct.toFixed(1)}%` : `${p.year_built}`],
                  [t.pricePerSqm, formatPriceExact(p.price_per_sqm)],
                ].map(([k, v], i) => (
                  <div
                    key={i}
                    className={`py-3.5 ${i % 3 < 2 ? "sm:border-r" : ""} border-rule-soft ${i % 3 ? "sm:pl-4" : ""} ${i >= 3 ? "border-t border-rule-soft" : ""}`}
                  >
                    <div className="text-xs text-ink-mute">{k}</div>
                    <div className="text-[15px] font-medium mt-0.5">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analyst note */}
            {analystComment && (
              <div className="mb-10">
                <h2 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em] mb-3.5">{t.analystNote}</h2>
                <div className="bg-surface border border-rule border-l-4 border-l-navy rounded-xl p-5 lg:p-6">
                  <div className="flex items-center gap-2.5 mb-3.5">
                    <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center font-bold text-sm">
                      KP
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.analystName}</div>
                      <div className="text-xs text-ink-mute">{t.analystReviewed} · {new Date().toLocaleDateString(isRu ? "ru-RU" : "en-US")}</div>
                    </div>
                  </div>
                  <p className="font-display text-[20px] lg:text-[22px] leading-[1.45] text-ink m-0">
                    "{analystComment}"
                  </p>
                </div>
              </div>
            )}

            {/* Price benchmark */}
            <div className="mb-10">
              <h2 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em] mb-3.5">{t.analytics}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-rule rounded-xl overflow-hidden">
                {[
                  [t.asking, formatPriceExact(p.sale_price_usd), false],
                  [t.pricePerSqm, formatPriceExact(p.price_per_sqm), false],
                  [t.marketLabel, formatPriceExact(p.market_price_usd), true],
                  [t.marketPerSqm, formatPriceExact(p.market_price_per_sqm), true],
                ].map(([k, v, mute], i) => (
                  <div
                    key={i}
                    className={`p-4 lg:p-5 ${i < 3 ? "sm:border-r" : ""} border-rule ${i < 2 ? "border-b sm:border-b-0" : ""} ${mute ? "bg-surface" : "bg-white"}`}
                  >
                    <div className="text-[11px] text-ink-mute uppercase tracking-[0.08em]">{k as string}</div>
                    <div className={`text-xl lg:text-[24px] font-bold tracking-[-0.01em] mt-1.5 ${mute ? "text-ink-mute" : "text-ink"}`}>
                      {v as string}
                    </div>
                  </div>
                ))}
              </div>
              {p.market_price_usd > 0 && (
                <div className="mt-4 p-4 lg:p-5 bg-surface rounded-xl">
                  <div className="flex items-center gap-3 text-[13px]">
                    <span className="w-16 text-ink-mute">{t.asking}</span>
                    <div className="flex-1 h-3 bg-white border border-rule rounded-full overflow-hidden">
                      <div className="h-full bg-navy rounded-full" style={{ width: `${askPct}%` }} />
                    </div>
                    <span className="w-20 text-right font-semibold">{formatPriceExact(p.sale_price_usd)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[13px] mt-2.5">
                    <span className="w-16 text-ink-mute">{t.marketLabel}</span>
                    <div className="flex-1 h-3 bg-white border border-rule rounded-full overflow-hidden">
                      <div className="h-full bg-coral rounded-full w-full" />
                    </div>
                    <span className="w-20 text-right font-semibold text-coral">{formatPriceExact(p.market_price_usd)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Similar */}
            {similar.length > 0 && (
              <div>
                <div className="flex justify-between items-baseline mb-4">
                  <h2 className="text-xl lg:text-[22px] font-bold tracking-[-0.02em]">{t.similar}</h2>
                  <Link href={`/${locale}/properties`} className="text-sm text-navy font-medium hover:underline underline-offset-4">
                    {t.seeAll}
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {similar.map((s) => (
                    <PropertyCard key={s.id} property={s} locale={locale} dict={dict} compact />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <aside>
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="bg-white border border-rule rounded-xl p-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-full bg-navy text-white flex items-center justify-center font-display text-xl">
                    N
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold">Natcha T.</div>
                    <div className="text-xs text-ink-mute mt-0.5">{t.agentTitle}</div>
                    <div className="text-xs text-mint font-medium mt-0.5">{t.agentStatus}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <InquiryForm dict={dict} propertyName={p.project_name} />
                </div>
              </div>

              <div className="bg-surface border border-rule rounded-xl p-4">
                <div className="text-[11px] text-ink-mute uppercase tracking-[0.1em]">{t.listingInfo}</div>
                <div className="mt-2.5 text-[13px] text-ink-soft flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span>{t.listingId}</span>
                    <span className="text-ink">OMP-{String(p.id).padStart(3, "0")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.listed}</span>
                    <span className="text-ink">{new Date().toLocaleDateString(isRu ? "ru-RU" : "en-US")}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
