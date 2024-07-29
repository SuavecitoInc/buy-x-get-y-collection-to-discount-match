type BuyXGetYEnabled = null | {
  id: string;
  value: 'true' | 'false';
};

type CollectionVariant = {
  node: {
    id: string;
    sku: string;
    buyXGetY: BuyXGetYEnabled;
  };
};

type CollectionProduct = {
  node: {
    id: string;
    title: string;
    variants: {
      edges: CollectionVariant[];
    };
  };
};

export type CollectionResponse = {
  data: {
    collectionByHandle: {
      id: string;
      handle: string;
      products: {
        edges: CollectionProduct[];
      };
    };
  };
};

export type DiscountResponse = {
  data: {
    discountNode: {
      id: string;
      discount: {
        title: string;
        customerBuys: {
          value: {
            quantity: string;
          };
          items: {
            products: {
              edges: {
                node: {
                  id: string;
                  title: string;
                  variants: {
                    edges: {
                      node: {
                        sku: string;
                      };
                    }[];
                  };
                  variantsCount: {
                    count: number;
                  };
                };
              }[];
            };
            productVariants: {
              edges: {
                node: {
                  id: string;
                  sku: string;
                };
              }[];
            };
          };
        };
        customerGets: {
          value: {
            quantity: string;
          };
          items: {
            products: {
              edges: {
                node: {
                  id: string;
                  title: string;
                  variants: {
                    edges: {
                      node: {
                        sku: string;
                      };
                    }[];
                  };
                  variantsCount: {
                    count: number;
                  };
                };
              }[];
            };
            productVariants: {
              edges: {
                node: {
                  id: string;
                  sku: string;
                };
              }[];
            };
          };
        };
      };
    };
  };
};

export type MetafieldsSetResponse = {
  data: {
    metafieldsSet: {
      metafields: {
        key: string;
        namespace: string;
        value: string;
        createdAt: string;
        updatedAt: string;
      }[];
      userErrors: {
        field: string;
        message: string;
        code: string;
      }[];
    };
  };
};
