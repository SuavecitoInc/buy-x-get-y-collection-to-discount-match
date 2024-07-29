const query = `#graphql
  query getDiscount($id: ID!) {
    discountNode(id: $id) {
      id
      discount {
        ... on DiscountCodeBasic {
          title
        }
        ... on DiscountCodeBxgy {
          title
        }
        ... on DiscountCodeFreeShipping {
          title
        }
        ... on DiscountAutomaticApp {
          title
        }
        ... on DiscountAutomaticBasic {
          title
        }
        ... on DiscountAutomaticBxgy {
          title
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
        }
      }
    }
  }
`;

export default query;
