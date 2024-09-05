import Image from "next/image";
import { useRouter } from "next/router";
import { TableScorers } from "components/Table/TableScorers";
import { LeagueInterface, OverviewProps } from "interface";

export const Overview = ({ data }: { data: OverviewProps }) => {
  const router = useRouter();
  const isLeagueInterface = (data: OverviewProps): data is LeagueInterface => {
    return "playerMoreExpensive" in data;
  };

  const leagueData = isLeagueInterface(data) ? data : undefined;
  const teamData = !isLeagueInterface(data) ? data : undefined;

  return (
    <section className="flex flex-col justify-between space-y-5 xl:space-y-0 lg:flex-row">
      {router.pathname.includes("/league") ? (
        <>
          <div className="md:w-2/4">
            <h2 className="mb-5">Informacion general</h2>
            <ul className="ml-5 list-disc">
              <li>Numero de jugadores: {leagueData!.numPlayer}</li>
              <li>
                Numero de jugadores extranjeros: {leagueData!.numPlayerForeign}
              </li>
              <li>
                Jugador mas caro:
                <button className="ml-1 hover:gradient1">
                  {leagueData!.playerMoreExpensive}
                </button>
              </li>
              <li>Valor de mercado: {leagueData!.marketValue}</li>
            </ul>
          </div>
          <div className="mt-5 lg:w-2/4 lg:mt-0">
            <h2 className="mb-5">Maximos goleadores</h2>
            <TableScorers data={leagueData!.topScorers} />
          </div>
        </>
      ) : (
        <>
          <div className="md:w-2/4">
            <h2 className="mb-5">Informacion general</h2>
            <ul className="ml-5 list-disc">
              <li>Estadio: {teamData!.info.stadium}</li>
              <li>Valor de mercado: {teamData!.info.marketValue}</li>
              <li>Ranking: {teamData!.info.balance}</li>
            </ul>
          </div>

          {teamData!.titles.length > 0 && (
            <div className="md:w-2/4">
              <h2 className="mb-5">Titulos</h2>
              <div className="w-full  p-2 border-2 border-gray-500">
                <div className="flex flex-wrap pt-2">
                  {teamData!.titles.map(({ title, img, years }, i) => (
                    <div key={i} title={`${title}\n${years}`}>
                      <Image
                        src={img}
                        alt={title}
                        height={80}
                        width={81}
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
