/**
 * AERIS Headless Commerce API
 * This utility handles secure communication with the Shopify Storefront API.
 * It enforces the architecture rule: Frontend never talks directly to Shopify.
 */

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      // Enforce Next.js ISR caching (revalidate every hour)
      next: { revalidate: 3600 },
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error("Error fetching from Shopify API:", error);
    throw error;
  }
}
