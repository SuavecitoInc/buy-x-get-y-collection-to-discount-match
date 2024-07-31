import { shopifyAuthenticatedFetch } from './lib/utils';
import { metafieldsSet, collectionByHandle, discountNode } from './lib/handlers';
import type { MetafieldsSetMutation, CollectionByHandleQuery, DiscountNodeQuery } from './lib/types/admin.generated';

const COLLECTION_HANDLE = 'buy-2-get-1-free'; // demo
const DISCOUNT_ID = 'gid://shopify/DiscountAutomaticNode/1166449606739';

async function getDiscountedItems() {
  try {
    console.log('-----------------------------------------------');
    console.log('Fetching Discounted Items');
    const id = DISCOUNT_ID;
    console.log('Discount ID:', id);
    const response = await shopifyAuthenticatedFetch<DiscountNodeQuery>(discountNode, {
      id,
    });

    // we only care about Automatic Buy X Get Y discounts
    if (response.data.discountNode.discount.type !== 'DiscountAutomaticBxgy') {
      console.log('Discount is not Buy X Get Y');
      return [];
    }

    const { discount } = response.data.discountNode;
    const { customerBuys, customerGets } = discount;

    const customerBuysProducts = customerBuys.items.products.edges;
    const customerGetsProducts = customerGets.items.products.edges;
    const customerBuysVariants = customerBuys.items.productVariants.edges;
    const customerGetsVariants = customerGets.items.productVariants.edges;

    const buyProducts: string[] = [];
    customerBuysProducts.forEach((product) => {
      product.node.variants.edges.forEach((variant) => {
        buyProducts.push(variant.node.sku);
      });
    });

    const getProducts: string[] = [];
    customerGetsProducts.forEach((product) => {
      product.node.variants.edges.forEach((variant) => {
        getProducts.push(variant.node.sku);
      });
    });

    const buyVariants: string[] = [];
    customerBuysVariants.forEach((variant) => {
      buyVariants.push(variant.node.sku);
    });

    const getVariants: string[] = [];
    customerGetsVariants.forEach((variant) => {
      getVariants.push(variant.node.sku);
    });

    const buyItems = buyProducts.concat(buyVariants);
    const getItems = getProducts.concat(getVariants);

    console.log('Buy Items:', buyItems.length);
    console.log('Get Items:', getItems.length);

    const commonItems = buyItems.filter((item) => getItems.includes(item));

    console.log('Common Items:', commonItems.length);

    // get difference
    const difference =
      buyItems.length > getItems.length
        ? buyItems.filter((item) => !getItems.includes(item))
        : getItems.filter((item) => !buyItems.includes(item));
    console.log('Difference:', difference.length);
    difference.forEach((item) => console.log(' - ', item));
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
    const response = await shopifyAuthenticatedFetch<CollectionByHandleQuery>(collectionByHandle, {
      handle,
    });

    const products = response.data.collectionByHandle.products.edges;

    const items: string[] = [];
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

async function setMetafield(id: string) {
  // set metafield
  try {
    console.log('-----------------------------------------------');
    console.log('Setting Metafield for', id);
    const response = await shopifyAuthenticatedFetch<MetafieldsSetMutation>(metafieldsSet, {
      metafields: [
        {
          key: 'enable_buy_x_get_y',
          namespace: 'suavecito',
          ownerId: id,
          type: 'boolean',
          value: 'true',
        },
      ],
    });

    console.log('Response:', response);

    if (response.data.metafieldsSet.userErrors.length > 0) {
      console.log('Error setting metafield', response.data.metafieldsSet.userErrors);
      return false;
    }

    console.log('Metafield set successfully', response.data.metafieldsSet.metafields.length);

    return true;
  } catch (err: any) {
    console.log('Error setting metafield', err.message);
    return false;
  }
}

async function main() {
  const discountedItems = await getDiscountedItems();
  if (discountedItems.length === 0) {
    console.log(
      'No discounted items found. This could be an incorrect discount type. Discount type needs to be Automatic Buy X Get Y.',
    );
    return;
  }

  console.log('Total Discounted Items:', discountedItems.length);

  const collectionItems = await getCollectionItems();
  if (collectionItems.length === 0) {
    console.log('No collection items found. This could mean the collection is empty or the metafield is not set.');
    return;
  }

  console.log('-----------------------------------------------');
  console.log('Discounted Variants:', discountedItems.length);
  console.log('Collection Variants:', collectionItems.length);

  const commonItems = collectionItems.filter((item) => discountedItems.includes(item));

  console.log('Common Variants:', commonItems.length);

  // get difference
  const difference =
    collectionItems.length > discountedItems.length
      ? collectionItems.filter((item) => !discountedItems.includes(item))
      : discountedItems.filter((item) => !collectionItems.includes(item));

  console.log('Difference:', difference.length);

  // get items in collection but not in discount
  difference.forEach((item) => console.log(' -', item));
  console.log('-----------------------------------------------');
}

main();
