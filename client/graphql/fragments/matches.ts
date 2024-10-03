import { gql } from "@apollo/client";

export const MATCH_FRAGMENT = gql`
  fragment MatchFragment on Match {
    eventId
    homeTeam
    awayTeam
    homeTeamImg
    awayTeamImg
    result
    league
    status
    info
    statistics {
      text
      homeTeam {
        quantity
        percentage
      }
      awayTeam {
        quantity
        percentage
      }
    }
    lineup {
      homeTeam {
        lineup
        titular {
          name
          image
          number
          pos
        }
        substitutes {
          name
          image
          number
          pos
        }
      }
      awayTeam {
        lineup
        titular {
          name
          image
          number
          pos
        }
        substitutes {
          name
          image
          number
          pos
        }
      }
    }
  }
`;
