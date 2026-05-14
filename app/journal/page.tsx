import { Metadata } from "next";
import JournalClient from "./JournalClient";

export const metadata: Metadata = {
  title: "The Journal | AERIS Editorial",
  description: "A dialogue on vision, material, and the art of enduring beauty. Explore our curated rules of weightless composition.",
  openGraph: {
    title: "The Journal | AERIS Editorial",
    description: "A dialogue on vision, material, and the art of enduring beauty.",
    images: ["/journal.png"],
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Journal by AERIS',
  description: 'A dialogue on vision, material, and the art of enduring beauty.',
  url: 'https://aeris.studio/journal',
  publisher: {
    '@type': 'Organization',
    name: 'AERIS'
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalClient />
    </>
  );
}
