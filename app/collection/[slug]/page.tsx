import { Metadata } from "next";
import CollectionClient from "./CollectionClient";

const collectionData = {
  "morning-mist": {
    title: "Morning Mist",
    description: "Cool-toned silver capturing the clarity of dawn. Minimalist jewelry designed to hold the light.",
    image: "/mist.png",
  },
  "ethereal-gold": {
    title: "Ethereal Gold",
    description: "Warm 14k pieces designed to hold the light of a fading sun. A permanent anchor for the modern vision.",
    image: "/gold.png",
  }
};

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = collectionData[slug as keyof typeof collectionData];
  
  if (!collection) {
    return { title: 'Collection Not Found | AERIS' }
  }

  return {
    title: `${collection.title} | AERIS Curations`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} | AERIS Curations`,
      description: collection.description,
      url: `https://aeris.studio/collection/${slug}`,
      siteName: 'AERIS',
      images: [
        {
          url: collection.image,
          width: 1200,
          height: 630,
          alt: `${collection.title} Collection`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${collection.title} | AERIS Curations`,
      description: collection.description,
      images: [collection.image],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const collection = collectionData[slug as keyof typeof collectionData];
  
  if (!collection) return <div className="min-h-screen flex items-center justify-center text-foreground/40">Collection not found.</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    image: `https://aeris.studio${collection.image}`,
    url: `https://aeris.studio/collection/${slug}`
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Collections',
        item: 'https://aeris.studio/shop'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: collection.title,
        item: `https://aeris.studio/collection/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <CollectionClient />
    </>
  );
}
