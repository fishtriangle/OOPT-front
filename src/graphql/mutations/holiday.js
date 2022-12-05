import { gql } from '@apollo/client';

export const CREATE_HOLIDAY = gql`
  mutation CreateHoliday($data: HolidayCreateInput!) {
    createHoliday(data: $data) {
      description
      id
      title
      disabled
    }
  }
`;

export const UPDATE_HOLIDAY = gql`
  mutation Mutation($data: HolidayUpdateInput!) {
    updateHoliday(data: $data) {
      id
      disabled
      description
      title
      contacts {
        description
        id
      }
    }
  }
`;

export const DELETE_HOLIDAY = gql`
  mutation DeleteHoliday($deleteHolidayId: Float!) {
    deleteHoliday(id: $deleteHolidayId) {
      title
      description
    }
  }
`;
