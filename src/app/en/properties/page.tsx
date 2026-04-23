import { getDictionary } from "@/lib/i18n";
import CatalogContent from "@/components/CatalogContent";

export default async function PropertiesPage() {
  const dict = await getDictionary("en");
  return <CatalogContent locale="en" dict={dict} />;
}
