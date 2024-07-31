# Buy X Get Y - Collection to Discount Match

> A simple tool that fetches a Shopify collection and compares its items against a Buy X Get Y Discount Code's Discounted Items.

### Setup

```bash
SHOPIFY_ADMIN_API_VERSION=2024-04
SHOPIFY_STORE=suavecito
SHOPIFY_ACCESS_TOKEN=
```

```javascript
const COLLECTION_HANDLE = 'demo';
const DISCOUNT_ID = 'gid://shopify/DiscountAutomaticNode/1166449606739';
```

### Generate Types

```bash
npm run generate
```

### Run

```bash
npm run match
```
