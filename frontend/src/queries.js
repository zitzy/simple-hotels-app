import gql from 'graphql-tag';

export const GET_HOTELS = gql`
  query hotel {
    hotel {
      name
      description
      location
      pricePerNight
      imageUrl
      rating
    }
  }
`;
