import { getDictionary } from "@/lib/i18n";
import { getAllProperties, getUniqueDistricts } from "@/lib/properties";
import PropertyFilters from "@/components/PropertyFilters";

export default async function PropertiesPage() {
  const dict = await getDictionary("en");
  const properties = getAllProperties();
  const districts = getUniqueDistricts();

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{dict.catalog.title}</h1>
        <PropertyFilters
          properties={properties}
          districts={districts}
          locale="en"
          dict={dict}
        />
      </div>
    </section>
  );
}
