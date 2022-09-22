import { gql } from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query getCustomers {
    getCustomers {
      name
      value {
        email
        name
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      name
      value {
        Address
        trackingId
        shippingCost
        createdAt
        carrier
        Lng
        Lat
        City
        trackingItems {
          customer_id
          items {
            item_id
            name
            price
            quantity
          }
          customer {
            email
            name
          }
        }
      }
    }
  }
`;
