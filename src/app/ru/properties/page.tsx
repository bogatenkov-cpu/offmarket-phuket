import { getDictionary } from "@/lib/i18n";
import CatalogContent from "@/components/CatalogContent";

export default async function PropertiesPage() {
  const dict = await getDictionary("ru");
  return <CatalogContent locale="ru" dict={dict} />;
}
