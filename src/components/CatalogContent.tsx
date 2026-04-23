import type { Locale } from "@/lib/i18n";
import { getAllProperties, getUniqueDistricts } from "@/lib/properties";
import PropertyFilters from "@/components/PropertyFilters";

interface CatalogContentProps {
  locale: Locale;
  dict: Record<string, any>;
}

export default function CatalogContent({ locale, dict }: CatalogContentProps) {
  const properties = getAllProperties();
  const districts = getUniqueDistricts(locale);
  const t = dict.catalog;

  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-[34px] font-bold tracking-[-0.025em]">{t.title}</h1>
          <p className="text-[14px] text-ink-mute mt-1.5">{t.subtitle}</p>
        </div>

        <PropertyFilters
          properties={properties}
          districts={districts}
          locale={locale}
          dict={dict}
        />
      </div>
    </section>
  );
}
