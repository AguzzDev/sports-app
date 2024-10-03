import { gql } from "@apollo/client";
import { MATCH_FRAGMENT } from "graphql/fragments/matches";

export const GET_MATCHES_SUB = gql`
  subscription {
    getMatches {
      ...MatchFragment
    }
  }
  ${MATCH_FRAGMENT}
`;
