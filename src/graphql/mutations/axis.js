import { gql } from '@apollo/client';

// export const CREATE_AXIS = gql``;

export const UPDATE_AXIS = gql`
  mutation UpdateAxis($data: AxisUpdateInput!) {
    updateAxis(data: $data) {
      axisX
      axisY
      id
      title
    }
  }
`;

// export const DELETE_AXIS = gql``;
