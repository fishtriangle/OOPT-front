import { gql } from '@apollo/client';

export const GET_HOLIDAY = gql`
  query GetOOPT($holidayUniqueInput: HolidayUniqueInput!) {
    getHoliday(holidayUniqueInput: $holidayUniqueInput) {
      id
      description
      photos {
        id
        small
        large
        description
        alt
      }
      title
      videos {
        id
        path
        description
        alt
      }
    }
  }
`;
