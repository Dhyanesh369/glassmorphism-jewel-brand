import { Metadata } from "next";
import ProductClient from "./ProductClient";

// Using the same static data block for simulation as the original page
const productData = {
  "orb-ring": {
    name: "The Orb Ring",
    price: "$240",
    category: "Rings — Morning Mist",
    description: "A dialogue between raw material and minimalist vision. The Orb Ring features a single, perfectly smooth silver orb anchored to a hand-hammered band. Designed to catch and hold the soft morning light.",
    details: [
      "925 Sterling Silver",
      "Hand-polished Finish",
      "Weightless Architecture",
      "Est. 2024 Collection"
    ],
    images: ["/ring.png", "/ring-2.png", "/ring-3.png"]
  },
  "mist-pendant": {
    name: "Mist Pendant",
    price: "$380",
    category: "Necklaces — Morning Mist",
    description: "An organic droplet of sterling silver suspended on a weightless chain. Captures the clarity of the dawn and the fluidity of light.",
    details: [
      "925 Sterling Silver",
      "18-inch Fine Chain",
      "Water-drop Silhouette",
      "Signature Mist Finish"
    ],
    images: ["/pendant.png", "/pendant-2.png", "/mist.png"]
  },
  "solis-bracelet": {
    name: "Solis Bracelet",
    price: "$420",
    category: "Bracelets — Ethereal Gold",
    description: "Warm 14k gold chain featuring hand-hammered Solis discs. Designed to settle into your daily ritual with a soft, enduring glow.",
    details: [
      "14k Recycled Gold",
      "Hammered Texture",
      "Adjustable Length",
      "Glow-capture Polishing"
    ],
    images: ["/bracelet.png", "/bracelet-2.png", "/gold.png"]
  },
  "gold-earrings": {
    name: "Gold Artifacts",
    price: "$310",
    category: "Earrings — Ethereal Gold",
    description: "Minimalist gold hoops with a subtle organic texture. A permanent anchor for the modern vision.",
    details: [
      "14k Gold-filled",
      "Organic Surface",
      "Weightless Daily Wear",
      "Hypoallergenic"
    ],
    images: ["/earrings.png", "/gold.png", "/edit-hero.png"]
  }
};

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = productData[id as keyof typeof productData];
  
  if (!product) {
    return { title: 'Artifact Not Found | AERIS' }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | AERIS`,
      description: product.description,
      url: `https://aeris.studio/product/${id}`,
      siteName: 'AERIS',
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | AERIS`,
      description: product.description,
      images: [product.images[0]],
    },
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = productData[id as keyof typeof productData];
  
  if (!product) return <div className="min-h-screen flex items-center justify-center text-foreground/40">Artifact not found.</div>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map(img => `https://aeris.studio${img}`),
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'AERIS'
    },
    offers: {
      '@type': 'Offer',
      url: `https://aeris.studio/product/${id}`,
      priceCurrency: 'USD',
      price: product.price.replace('$', ''),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Shop',
        item: 'https://aeris.studio/shop'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: product.name,
        item: `https://aeris.studio/product/${id}`
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
      <ProductClient />
    </>
  );
}
