import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { getPropertyBySlug, getAllProperties, getSimilarProperties } from "@/lib/properties";
import PropertyContent from "@/components/PropertyContent";

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary("en");
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const similar = getSimilarProperties(property, 3);

  return <PropertyContent locale="en" dict={dict} property={property} similar={similar} />;
}
