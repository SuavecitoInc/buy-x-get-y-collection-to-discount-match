const query = `#graphql
  query collectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      handle
      products(first: 250) {
        edges {
          node {
            id
            title
            variants(first: 25) {
              edges {
                node {
                  id
                  sku
                  buyXGetY: metafield(namespace: "debut", key: "enable_b2g1f") {
                    id
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default query;
