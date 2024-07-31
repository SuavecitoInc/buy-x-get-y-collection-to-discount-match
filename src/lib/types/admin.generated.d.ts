/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as AdminTypes from './admin.types';

export type MetafieldsSetMutationVariables = AdminTypes.Exact<{
  metafields: Array<AdminTypes.MetafieldsSetInput> | AdminTypes.MetafieldsSetInput;
}>;


export type MetafieldsSetMutation = { metafieldsSet?: AdminTypes.Maybe<{ metafields?: AdminTypes.Maybe<Array<Pick<AdminTypes.Metafield, 'key' | 'namespace' | 'value' | 'createdAt' | 'updatedAt'>>>, userErrors: Array<Pick<AdminTypes.MetafieldsSetUserError, 'field' | 'message' | 'code'>> }> };

export type CollectionByHandleQueryVariables = AdminTypes.Exact<{
  handle: AdminTypes.Scalars['String']['input'];
}>;


export type CollectionByHandleQuery = { collectionByHandle?: AdminTypes.Maybe<(
    Pick<AdminTypes.Collection, 'id' | 'handle'>
    & { products: { edges: Array<{ node: (
          Pick<AdminTypes.Product, 'id' | 'title'>
          & { variants: { edges: Array<{ node: (
                Pick<AdminTypes.ProductVariant, 'id' | 'sku'>
                & { buyXGetY?: AdminTypes.Maybe<Pick<AdminTypes.Metafield, 'id' | 'value'>> }
              ) }> } }
        ) }> } }
  )> };

export type DiscountNodeQueryVariables = AdminTypes.Exact<{
  id: AdminTypes.Scalars['ID']['input'];
}>;


export type DiscountNodeQuery = { discountNode?: AdminTypes.Maybe<(
    Pick<AdminTypes.DiscountNode, 'id'>
    & { discount: (
      Pick<AdminTypes.DiscountAutomaticApp, 'title'>
      & { type: 'DiscountAutomaticApp' }
    ) | (
      Pick<AdminTypes.DiscountAutomaticBasic, 'title'>
      & { type: 'DiscountAutomaticBasic' }
    ) | (
      Pick<AdminTypes.DiscountAutomaticBxgy, 'title'>
      & { type: 'DiscountAutomaticBxgy' }
      & { customerBuys: { value: Pick<AdminTypes.DiscountQuantity, 'quantity'>, items: { products: { edges: Array<{ node: (
                Pick<AdminTypes.Product, 'id' | 'title'>
                & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'sku'> }> }, variantsCount?: AdminTypes.Maybe<Pick<AdminTypes.Count, 'count'>> }
              ) }> }, productVariants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'sku'> }> } } }, customerGets: { value: { quantity: Pick<AdminTypes.DiscountQuantity, 'quantity'> }, items: { products: { edges: Array<{ node: (
                Pick<AdminTypes.Product, 'id' | 'title'>
                & { variants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'sku'> }> }, variantsCount?: AdminTypes.Maybe<Pick<AdminTypes.Count, 'count'>> }
              ) }> }, productVariants: { edges: Array<{ node: Pick<AdminTypes.ProductVariant, 'id' | 'sku'> }> } } } }
    ) | (
      Pick<AdminTypes.DiscountAutomaticFreeShipping, 'title'>
      & { type: 'DiscountAutomaticFreeShipping' }
    ) | (
      Pick<AdminTypes.DiscountCodeBasic, 'title'>
      & { type: 'DiscountCodeBasic' }
    ) | (
      Pick<AdminTypes.DiscountCodeBxgy, 'title'>
      & { type: 'DiscountCodeBxgy' }
    ) | (
      Pick<AdminTypes.DiscountCodeFreeShipping, 'title'>
      & { type: 'DiscountCodeFreeShipping' }
    ) }
  )> };

interface GeneratedQueryTypes {
  "#graphql\n  query collectionByHandle($handle: String!) {\n    collectionByHandle(handle: $handle) {\n      id\n      handle\n      products(first: 250) {\n        edges {\n          node {\n            id\n            title\n            variants(first: 25) {\n              edges {\n                node {\n                  id\n                  sku\n                  buyXGetY: metafield(namespace: \"debut\", key: \"enable_b2g1f\") {\n                    id\n                    value\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": {return: CollectionByHandleQuery, variables: CollectionByHandleQueryVariables},
  "#graphql\n  query discountNode($id: ID!) {\n    discountNode(id: $id) {\n      id\n      discount {\n        ... on DiscountCodeBasic {\n          title\n          type: __typename\n        }\n        ... on DiscountCodeBxgy {\n          title\n          type: __typename\n        }\n        ... on DiscountCodeFreeShipping {\n          title\n          type: __typename\n        }\n        ... on DiscountAutomaticApp {\n          title\n          type: __typename\n        }\n        ... on DiscountAutomaticBasic {\n          title\n          type: __typename\n        }\n        ... on DiscountAutomaticBxgy {\n          title\n          type: __typename\n          customerBuys {\n            value {\n              ... on DiscountQuantity {\n                quantity\n              }\n            }\n            items {\n              ... on DiscountProducts {\n                products(first: 250) {\n                  edges {\n                    node {\n                      id\n                      title\n                      variants(first: 25) {\n                        edges {\n                          node {\n                            sku\n                          }\n                        }\n                      }\n                      variantsCount {\n                        count\n                      }\n                    }\n                  }\n                }\n                productVariants(first: 250) {\n                  edges {\n                    node {\n                      id\n                      sku\n                    }\n                  }\n                }\n              }\n            }\n          }\n          customerGets {\n            value {\n              ... on DiscountOnQuantity {\n                quantity {\n                  quantity\n                }\n              }\n            }\n            items {\n              ... on DiscountProducts {\n                products(first: 250) {\n                  edges {\n                    node {\n                      id\n                      title\n                      variants(first: 25) {\n                        edges {\n                          node {\n                            sku\n                          }\n                        }\n                      }\n                      variantsCount {\n                        count\n                      }\n                    }\n                  }\n                }\n                productVariants(first: 250) {\n                  edges {\n                    node {\n                      id\n                      sku\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n        ... on DiscountAutomaticFreeShipping {\n          title\n          type: __typename\n\n        }\n      }\n    }\n  }\n": {return: DiscountNodeQuery, variables: DiscountNodeQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {\n    metafieldsSet(metafields: $metafields) {\n      metafields {\n        key\n        namespace\n        value\n        createdAt\n        updatedAt\n      }\n      userErrors {\n        field\n        message\n        code\n      }\n    }\n  }\n": {return: MetafieldsSetMutation, variables: MetafieldsSetMutationVariables},
}
declare module '@shopify/admin-api-client' {
  type InputMaybe<T> = AdminTypes.InputMaybe<T>;
  interface AdminQueries extends GeneratedQueryTypes {}
  interface AdminMutations extends GeneratedMutationTypes {}
}
