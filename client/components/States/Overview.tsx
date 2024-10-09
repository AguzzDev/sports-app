import Image from "next/image";
import { useRouter } from "next/router";
import { TableScorers } from "components/Table/TableScorers";
import { LeagueInterface, OverviewProps, TeamInterface } from "interface";
import { ContainerOne } from "components/UI/ContainerOne";

const LeagueInfo: React.FC<{ data: LeagueInterface }> = ({ data }) => (
  <ul className="ml-5 list-disc">
    <li>Numero de jugadores: {data.numPlayer}</li>
    <li>Numero de jugadores extranjeros: {data.numPlayerForeign}</li>
    <li>
      Jugador mas caro:
      <button className="ml-1 hover:gradient1">
        {data.playerMoreExpensive}
      </button>
    </li>
    <li>Valor de mercado: {data.marketValue}</li>
  </ul>
);

const TeamInfo: React.FC<{ data: TeamInterface }> = ({ data }) => (
  <ul className="ml-5 list-disc">
    <li>Estadio: {data!.info.stadium}</li>
    <li>Valor de mercado: {data!.info.marketValue}</li>
    <li>Ranking: {data!.info.balance}</li>
  </ul>
);

export const Overview: React.FC<{ data: OverviewProps }> = ({ data }) => {
  const router = useRouter();
  const leagueRoute = router.pathname.includes("/league");

  const isLeagueInterface = (data: OverviewProps): data is LeagueInterface => {
    return "playerMoreExpensive" in data;
  };

  const leagueData = isLeagueInterface(data) ? data : undefined;
  const teamData = !isLeagueInterface(data) ? data : undefined;

  return (
    <section className="flex flex-col justify-between space-y-5 lg:space-y-0 lg:flex-row">
      <ContainerOne title="Informacion general" className="h-max">
        {leagueRoute ? (
          <LeagueInfo data={leagueData!} />
        ) : (
          <TeamInfo data={teamData!} />
        )}
      </ContainerOne>

      {leagueRoute ? (
        <ContainerOne
          title="Maximos goleadores"
          className="mt-5 lg:w-2/4 lg:mt-0"
        >
          <TableScorers data={leagueData!.topScorers} />
        </ContainerOne>
      ) : (
        <>
          {teamData!.titles.length > 0 && (
            <ContainerOne title="Titulos" className="md:w-2/4">
              <ul className="flex-col space-y-2">
                {teamData!.titles.map(({ title, img, years }, i) => (
                  <li
                    key={i}
                    title={`${title}\n${years}`}
                    className="flex items-center"
                  >
                    <Image
                      src={img}
                      alt={title}
                      height={80}
                      width={81}
                      objectFit="contain"
                    />

                    <h4>{title}</h4>
                  </li>
                ))}
              </ul>
            </ContainerOne>
          )}
        </>
      )}
    </section>
  );
};
