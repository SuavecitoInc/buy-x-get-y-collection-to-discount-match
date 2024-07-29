const query = `#graphql
  query getCollectionIdFromHandle($handle: String!) {
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
