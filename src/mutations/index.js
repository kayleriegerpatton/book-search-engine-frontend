import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutation($user: UserInput!) {
    login(user: $user) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation Mutation($user: AddUserInput!) {
    addUser(user: $user) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
