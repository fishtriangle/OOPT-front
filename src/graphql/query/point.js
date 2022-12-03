import { gql } from '@apollo/client';

export const GET_POINT = gql`
  query GetPoint($pointUniqueInput: PointUniqueInput!) {
    getPoint(pointUniqueInput: $pointUniqueInput) {
      id
      title
      description
      photos {
        id
        small
        large
        description
        alt
      }
      videos {
        id
        path
        description
        alt
      }
      axis {
        id
        title
        axisX
        axisY
      }
      route
    }
  }
`;

export const GET_POINT_PHOTOS = gql`
  query GetPoint($pointUniqueInput: PointUniqueInput!) {
    getPoint(pointUniqueInput: $pointUniqueInput) {
      id
      title
      photos {
        id
        small
        large
        description
        alt
      }
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;
