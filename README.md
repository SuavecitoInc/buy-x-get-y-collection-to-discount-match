# Buy X Get Y - Collection to Discount Match

> A simple tool that fetches a Shopify collection and compares its items against a Buy X Get Y Discount Code's Discounted Items.

### Setup

```bash
SHOPIFY_ADMIN_API_VERSION=2024-07
SHOPIFY_STORE=suavecito
SHOPIFY_ACCESS_TOKEN=
```

```javascript
const COLLECTION_HANDLE = 'demo';
const DISCOUNT_ID = 'gid://shopify/DiscountAutomaticNode/11223431455';
```

### Generate Types

```bash
npm run generate
```

### Run

```bash
npm run match
```

```bash
> buy-x-get-y@0.0.1 match
> tsx src/index.ts

-----------------------------------------------
Fetching Discounted Items
Discount ID: gid://shopify/DiscountAutomaticNode/11223431455
Buy Items: 161
Get Items: 161
Common Items: 161
Difference: 0
-----------------------------------------------
Total Discounted Items: 161
-----------------------------------------------
Fetching Collection Items
Collection Handle: some-collection
Total Variants in Collection: 260
Total Variants Buy X Get Y Eligible: 161
-----------------------------------------------
-----------------------------------------------
Discounted Variants: 161
Collection Variants: 161
Common Variants: 161
Difference: 0
-----------------------------------------------
```
