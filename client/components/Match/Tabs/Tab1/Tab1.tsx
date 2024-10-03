import { MatchDetailsPropsWithoutStatistics } from "interface";
import { FootballField } from "./FootballField";
import { Substitutes } from "./Substitutes";

export const Tab1: React.FC<{
  data: MatchDetailsPropsWithoutStatistics;
}> = ({ data: { homeTeam, awayTeam } }) => {
  return (
    <>
      <FootballField data={{ homeTeam, awayTeam }} />

      <Substitutes
        homeTeam={homeTeam.substitutes}
        awayTeam={awayTeam.substitutes}
      />
    </>
  );
};
