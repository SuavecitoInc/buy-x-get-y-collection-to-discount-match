const query = `#graphql
  query discountNode($id: ID!) {
    discountNode(id: $id) {
      id
      discount {
        ... on DiscountCodeBasic {
          title
          type: __typename
        }
        ... on DiscountCodeBxgy {
          title
          type: __typename
        }
        ... on DiscountCodeFreeShipping {
          title
          type: __typename
        }
        ... on DiscountAutomaticApp {
          title
          type: __typename
        }
        ... on DiscountAutomaticBasic {
          title
          type: __typename
        }
        ... on DiscountAutomaticBxgy {
          title
          type: __typename
          customerBuys {
            value {
              ... on DiscountQuantity {
                quantity
              }
            }
            items {
              ... on DiscountProducts {
                products(first: 250) {
                  edges {
                    node {
                      id
                      title
                      variants(first: 25) {
                        edges {
                          node {
                            sku
                          }
                        }
                      }
                      variantsCount {
                        count
                      }
                    }
                  }
                }
                productVariants(first: 250) {
                  edges {
                    node {
                      id
                      sku
                    }
                  }
                }
              }
            }
          }
          customerGets {
            value {
              ... on DiscountOnQuantity {
                quantity {
                  quantity
                }
              }
            }
            items {
              ... on DiscountProducts {
                products(first: 250) {
                  edges {
                    node {
                      id
                      title
                      variants(first: 25) {
                        edges {
                          node {
                            sku
                          }
                        }
                      }
                      variantsCount {
                        count
                      }
                    }
                  }
                }
                productVariants(first: 250) {
                  edges {
                    node {
                      id
                      sku
                    }
                  }
                }
              }
            }
          }
        }
        ... on DiscountAutomaticFreeShipping {
          title
          type: __typename

        }
      }
    }
  }
`;

export default query;
