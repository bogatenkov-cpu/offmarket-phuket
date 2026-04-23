import { getDictionary } from "@/lib/i18n";
import { getStats, getFeatured, getDistrictSummary } from "@/lib/properties";
import HomeContent from "@/components/HomeContent";

export default async function HomePage() {
  const dict = await getDictionary("en");
  const stats = getStats();
  const featured = getFeatured(3);
  const districts = getDistrictSummary("en", 4);

  return <HomeContent locale="en" dict={dict} stats={stats} featured={featured} districts={districts} />;
}
