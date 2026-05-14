import { Metadata } from "next";
import ShopClient from "./ShopClient";

export const metadata: Metadata = {
  title: "The Atelier | Shop AERIS",
  description: "Explore our full collection of weightless artifacts. Minimalist 14k gold and sterling silver jewelry designed to settle into your daily ritual.",
  openGraph: {
    title: "The Atelier | Shop AERIS",
    description: "Explore our full collection of weightless artifacts.",
    images: ["/hero.png"],
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'The Atelier by AERIS',
  description: 'Full collection of minimalist jewelry artifacts.',
  url: 'https://aeris.studio/shop'
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ShopClient />
    </>
  );
}
