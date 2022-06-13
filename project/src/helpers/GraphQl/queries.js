import { gql } from '@apollo/client'

export const CURRENCIES_LABEL = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`

export const Categories_Product = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        category
        brand
        description
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`
