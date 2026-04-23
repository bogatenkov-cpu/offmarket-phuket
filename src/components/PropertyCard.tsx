import Link from "next/link";
import { Property } from "@/data/types";
import { formatPriceExact } from "@/lib/properties";
import type { Locale } from "@/lib/i18n";

interface PropertyCardProps {
  property: Property;
  locale: Locale;
  dict: Record<string, any>;
  compact?: boolean;
}

export default function PropertyCard({ property, locale, dict, compact = false }: PropertyCardProps) {
  const t = dict.catalog.card;
  const p = property;
  const pricePerSqm = Math.round(p.sale_price_usd / p.area_sqm);

  const bedroomsLabel =
    p.bedrooms === 0
      ? dict.catalog.filters.studio
      : `${p.bedrooms} ${p.bedrooms === 1 ? t.bed : t.beds}`;

  return (
    <Link
      href={`/${locale}/properties/${p.slug}`}
      className="group block bg-white border border-rule rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 no-underline text-ink"
    >
      <div className={`relative bg-black overflow-hidden ${compact ? "h-44" : "h-60"}`}>
        {p.photos && p.photos.length > 0 ? (
          <img
            src={p.photos[0]}
            alt={p.project_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-2">
            <div className="text-center">
              <div className="text-4xl mb-1">{p.property_type === "Дом/Коттедж" ? "🏡" : "🏢"}</div>
              <span className="text-xs text-ink-soft font-medium">{p.project_name}</span>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {p.is_ready ? (
            <span className="inline-flex items-center gap-1 bg-mint-soft text-mint border border-mint-border text-[11px] font-medium px-2.5 py-1 rounded-full">
              ● {t.ready}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-amber-soft text-amber-tone border border-amber-border text-[11px] font-medium px-2.5 py-1 rounded-full">
              ◐ {t.construction}
            </span>
          )}
          {p.discount_pct >= 10 && (
            <span className="inline-flex items-center gap-1 bg-coral-soft text-coral border border-coral-border text-[11px] font-medium px-2.5 py-1 rounded-full">
              ▼ {p.discount_pct.toFixed(1)}% {t.offMarket}
            </span>
          )}
        </div>

        {p.rating >= 5 && (
          <span className="absolute top-3 right-3 bg-coral text-white border border-coral text-[11px] font-medium px-2.5 py-1 rounded-full">
            ★ {t.featured}
          </span>
        )}

        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          📷 {p.photos?.length || 0}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-2.5">
          <div className="text-[22px] font-bold tracking-tight">{formatPriceExact(p.sale_price_usd)}</div>
          <div className="text-xs text-ink-mute">${pricePerSqm.toLocaleString()}/m²</div>
        </div>
        <div className="text-[15px] font-medium mt-1.5 tracking-tight line-clamp-1">{p.project_name}</div>
        <div className="text-[13px] text-ink-mute mt-0.5">
          {locale === "ru" ? p.district : p.district_en}, {locale === "ru" ? p.city : "Phuket"} · {locale === "ru" ? p.deal_type : p.deal_type_en}
        </div>

        <div className="flex gap-0 mt-3.5 pt-3 border-t border-rule-soft text-[13px] text-ink-soft">
          <span className="flex-1">{p.area_sqm} m²</span>
          <span className="flex-1">{bedroomsLabel}</span>
          <span className={`flex-1 text-right ${p.rental_yield_pct > 0 ? "text-mint font-semibold" : "text-ink-mute"}`}>
            {p.rental_yield_pct > 0 ? `${p.rental_yield_pct.toFixed(1)}% ${t.yield}` : `${t.floor} ${locale === "ru" ? p.floor : p.floor_en || p.floor}`}
          </span>
        </div>
      </div>
    </Link>
  );
}
