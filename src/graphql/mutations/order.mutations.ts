import { gql } from '@apollo/client';

export const CREATEORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(createOrderInput: $input) {
      _id
      number
    }
  }
`;
