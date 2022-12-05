import { gql } from '@apollo/client';

export const CREATE_AXIS = gql`
  mutation CreateAxis($data: AxisCreateInput!) {
    createAxis(data: $data) {
      axisY
      axisX
      disabled
      id
      title
    }
  }
`;

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

export const DELETE_AXIS = gql`
  mutation DeleteAxis($deleteAxisId: Float!) {
    deleteAxis(id: $deleteAxisId) {
      axisX
      axisY
      disabled
      id
      title
    }
  }
`;
