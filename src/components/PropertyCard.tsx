import Link from "next/link";
import { Property } from "@/data/types";
import { formatPrice } from "@/lib/properties";
import type { Locale } from "@/lib/i18n";

interface PropertyCardProps {
  property: Property;
  locale: Locale;
  dict: Record<string, any>;
}

export default function PropertyCard({ property, locale, dict }: PropertyCardProps) {
  const t = dict.catalog.card;
  const p = property;

  const bedroomsLabel =
    p.bedrooms === 0
      ? dict.catalog.filters.studio
      : `${p.bedrooms} ${p.bedrooms === 1 ? t.bed : t.beds}`;

  const discountLabel =
    p.discount_pct > 0
      ? `−${p.discount_pct.toFixed(1)}% ${t.discount}`
      : p.discount_pct < 0
      ? `+${Math.abs(p.discount_pct).toFixed(1)}% ${t.aboveMarket}`
      : null;

  const ratingStars = "★".repeat(p.rating) + "☆".repeat(5 - p.rating);

  return (
    <Link
      href={`/${locale}/properties/${p.slug}`}
      className="group block bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-1">{p.property_type === "Дом/Коттедж" ? "🏡" : "🏢"}</div>
          <span className="text-xs text-emerald-700 font-medium">{p.project_name}</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {p.is_ready && (
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {t.ready}
            </span>
          )}
          {!p.is_ready && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {t.construction}
            </span>
          )}
          {p.rating >= 5 && (
            <span className="bg-rose-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              HOT
            </span>
          )}
        </div>

        {discountLabel && (
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              p.discount_pct > 0
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {discountLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition line-clamp-1">
            {p.project_name}
          </h3>
          <span className="text-xs text-amber-500 whitespace-nowrap">{ratingStars}</span>
        </div>

        <p className="text-sm text-gray-500 mb-3">
          {p.district}, {locale === "ru" ? p.city : "Phuket"}
        </p>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
          <span>{p.area_sqm} {t.sqm}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{bedroomsLabel}</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full" />
          <span>{t.floor} {p.floor}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">{formatPrice(p.sale_price_usd)}</p>
            {p.rental_yield_pct > 0 && (
              <p className="text-xs text-emerald-600 font-medium mt-0.5">
                {p.rental_yield_pct.toFixed(1)}% {t.yield}
              </p>
            )}
          </div>
          <span className="text-sm text-emerald-600 font-medium group-hover:translate-x-1 transition-transform">
            {t.details} →
          </span>
        </div>
      </div>
    </Link>
  );
}
