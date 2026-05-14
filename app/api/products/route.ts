import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

const getProductsQuery = `
  query getProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    // This enforces the architecture rule:
    // Client hits this Next.js endpoint. Next.js securely hits Shopify.
    // Client never sees the Storefront Access Token.
    const { body } = await shopifyFetch({
      query: getProductsQuery,
    });

    return NextResponse.json({ products: body.data.products.edges });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Enforcing architecture rule: Fallback systems fail gracefully, returning empty 200 or polite 500.
    return NextResponse.json({ error: "Unable to retrieve products. The curation is currently resting." }, { status: 500 });
  }
}
