import { gql } from "@apollo/client";

export const GETME = gql`
  query Query {
    me {
      savedBooks {
        title
        authors
        bookId
        description
        image
      }
    }
  }
`;
