import fetch from 'node-fetch';
import { STORE, API_VERSION, ACCESS_TOKEN } from './const';

export async function shopifyAuthenticatedFetch<T>(query: string, variables?: object): Promise<T> {
  try {
    const endpoint = `https://${STORE}.myshopify.com/admin/api/${API_VERSION}/graphql.json`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();

    return json as T;
  } catch (error: any) {
    console.log(error);
  }
}