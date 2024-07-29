import { shopifyAuthenticatedFetch } from './lib/utils';
import discountQuery from './lib/handlers/discountQuery';
import collectionQuery from './lib/handlers/collectionQuery';
import type { CollectionResponse, DiscountResponse } from './lib/types';

const COLLECTION_HANDLE = 'demo';
const DISCOUNT_ID = 'gid://shopify/DiscountAutomaticNode/1166449606739';

async function getDiscountedItems() {
  try {
    console.log('-----------------------------------------------');
    console.log('Fetching Discounted Items');
    const id = DISCOUNT_ID;
    console.log('Discount ID:', id);
    const response = await shopifyAuthenticatedFetch<DiscountResponse>(discountQuery, {
      id,
    });

    const customerBuysProducts = response.data.discountNode.discount.customerBuys.items.products.edges;
    const customerGetsProducts = response.data.discountNode.discount.customerGets.items.products.edges;
    const customerBuysVariants = response.data.discountNode.discount.customerBuys.items.productVariants.edges;
    const customerGetsVariants = response.data.discountNode.discount.customerGets.items.productVariants.edges;

    let buyProducts = [];
    customerBuysProducts.forEach((product) => {
      product.node.variants.edges.forEach((variant) => {
        buyProducts.push(variant.node.sku);
      });
    });

    let getProducts = [];
    customerGetsProducts.forEach((product) => {
      product.node.variants.edges.forEach((variant) => {
        getProducts.push(variant.node.sku);
      });
    });

    let buyVariants = [];
    customerBuysVariants.forEach((variant) => {
      buyVariants.push(variant.node.sku);
    });

    let getVariants = [];
    customerGetsVariants.forEach((variant) => {
      getVariants.push(variant.node.sku);
    });

    const buyItems = buyProducts.concat(buyVariants);
    const getItems = getProducts.concat(getVariants);

    console.log('Buy Items:', buyItems.length);
    console.log('Get Items:', getItems.length);

    const commonItems = buyItems.filter((item) => getItems.includes(item));

    console.log('Common Items:', commonItems.length);
    console.log('-----------------------------------------------');
    return buyItems;
  } catch (err: any) {
    console.log('Error getting discounted items', err.message);
    return [];
  }
}

async function getCollectionItems() {
  try {
    console.log('-----------------------------------------------');
    console.log('Fetching Collection Items');
    const handle = COLLECTION_HANDLE;
    console.log('Collection Handle:', handle);
    const response = await shopifyAuthenticatedFetch<CollectionResponse>(collectionQuery, {
      handle,
    });

    const products = response.data.collectionByHandle.products.edges;

    let items = [];
    let count = 0;
    products.forEach((product) => {
      product.node.variants.edges.forEach((variant) => {
        // if metafield set
        if (variant.node.buyXGetY?.value === 'true') {
          items.push(variant.node.sku);
        }
        count += 1;
      });
    });
    console.log('Total Variants in Collection:', count);
    console.log('Total Variants Buy X Get Y Eligible:', items.length);
    console.log('-----------------------------------------------');
    return items;
  } catch (err: any) {
    console.log('Error getting collection items', err.message);
    return [];
  }
}

async function main() {
  const discountedItems = await getDiscountedItems();
  console.log('Discounted Items:', discountedItems.length);

  const collectionItems = await getCollectionItems();
  console.log('Collection Items:', collectionItems.length);

  const commonItems = collectionItems.filter((item) => discountedItems.includes(item));

  console.log('Common Items:', commonItems.length);

  // get difference
  const difference = collectionItems.filter((item) => !discountedItems.includes(item));

  console.log('Difference:', difference.length);

  // get items in collection but not in discount
  difference.forEach((item) => console.log(item));
  console.log('-----------------------------------------------');
}

main();
