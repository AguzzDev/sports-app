import {
  HeaderLineupProps,
  LineupProps,
  MatchDetailsPropsWithoutStatistics,
  PlayerLineupProps,
} from "interface";
import Image from "next/image";
import { lineupAwayDict, lineupHomeDict } from "utils/dict";

const Header: React.FC<HeaderLineupProps> = ({
  className,
  data: { name, image, lineup },
}) => (
  <div className={`flex items-center space-x-5 ${className}`}>
    <div className="relative w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14">
      <Image alt={`${name}-image`} src={image} layout="fill" />
    </div>
    <div>
      <h2>{name}</h2>
      <p>XI Inicial {lineup}</p>
    </div>
  </div>
);

const Player: React.FC<PlayerLineupProps> = ({ data, type }) => {
  return (
    <div className="flex flex-col items-center mx-auto">
      {data ? (
        <>
          <div
            className={`${
              type == "home" ? "bg-black border-white" : "bg-white border-black"
            } flex justify-center items-center w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border-2`}
          >
            <p
              className={`${
                type == "home" ? "text-white" : "text-black"
              } text-xs md:text-base text-center font-bold`}
            >
              {data.number}
            </p>
          </div>

          <p className="text-xs md:text-base text-center h-5 md:h-10 overflow-ellipsis">{data.name}</p>
        </>
      ) : (
        <div className="relative bg-black w-10 h-10 rounded-full overflow-hidden"></div>
      )}
    </div>
  );
};

const Lineup: React.FC<LineupProps> = ({ lineup, type, players }) => {
  const divider = lineup.split("-").map(Number);

  const playerFilter = (pos: Record<number, number>) => {
    type LineupType = keyof typeof lineupHomeDict;
    const currentLineup: Record<string, string> =
      type === "home"
        ? lineupHomeDict[lineup as LineupType]
        : lineupAwayDict[lineup as LineupType];
    const posKey = `${pos[0]},${pos[1]}`;

    if (!currentLineup) {
      return null;
    }

    return players.filter((p) => p.pos == currentLineup[posKey])[0];
  };

  return (
    <div
      className={`${
        type == "home"
          ? "flex-col sm:flex-row"
          : "flex-col-reverse sm:flex-row-reverse"
      } absolute top-0 left-0 inset-0 flex z-50`}
    >
      {/* arquero */}
      <div
        className={` ${
          type == "home" ? "mt-3 sm:ml-3" : "mb-3 sm:mr-3"
        } flex items-center justify-center w-full h-1/4 sm:w-1/4 sm:h-full`}
      >
        <Player type={type} data={playerFilter([0, 0])} />
      </div>

      {divider.map((numPlayers, index) => (
        <div
          key={`position-${index}`}
          className="flex justify-center w-full h-1/4 sm:h-full sm:w-1/4"
        >
          <div
            className={`grid grid-cols-${numPlayers} sm:grid-cols-1 sm:grid-rows-${numPlayers} w-full h-full`}
          >
            {Array.from({ length: numPlayers }).map((_, playerIndex) => (
              <div
                key={playerIndex}
                className="flex items-center justify-center"
              >
                <Player
                  type={type}
                  data={playerFilter([index + 1, playerIndex + 1])}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const FootballField: React.FC<{
  data: MatchDetailsPropsWithoutStatistics;
}> = ({ data }) => {
  const { homeTeam, awayTeam } = data;

  const {
    name: nameHome,
    image: imageHome,
    lineup: lineupHome,
    titular: titularHome,
  } = homeTeam;
  const {
    name: nameAway,
    image: imageAway,
    lineup: lineupAway,
    titular: titularAway,
  } = awayTeam;

  const Desktop = () => (
    <div className="hidden sm:block relative w-full h-[20rem] sm:h-[30rem] overflow-hidden bg-gray3 border-2 border-gray1">
      {/* left */}
      <div className="absolute -left-2 flex items-center justify-start w-2/4 h-full">
        <div className="relative flex flex-col justify-center w-5/12 h-4/6 border-2 border-gray1 z-40">
          <div className="relative z-10 w-2/4 h-2/4 border-2 border-gray1"></div>
        </div>

        <Lineup type="home" lineup={lineupHome} players={titularHome} />
      </div>

      {/* right */}
      <div className="absolute -right-2 flex items-center justify-end w-2/4 h-full">
        <div className="relative flex flex-col items-end justify-center w-5/12 h-4/6 border-2 border-gray1 z-40">
          <div className="relative z-10 w-2/4 h-2/4 border-2 border-gray1"></div>
        </div>

        <Lineup type="away" lineup={lineupAway} players={titularAway} />
      </div>

      {/* circulo */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-1/6 h-2/6 rounded-full border-2 border-gray1"></div>
      </div>

      {/* linea */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[2px] h-full bg-gray1"></div>
      </div>
    </div>
  );

  const Mobile = () => (
    <div className="block sm:hidden relative w-full h-[30rem] overflow-hidden bg-gray3 border-2 border-gray1">
      {/* top */}
      <div className="absolute -top-2 flex justify-center w-full h-2/4">
        <div className="relative flex flex-col items-center w-4/6 h-2/4 border-2 border-gray1 z-40">
          <div className="relative z-10 w-2/4 h-2/4 border-2 border-gray1"></div>
        </div>

        <Lineup type="home" lineup={lineupHome} players={titularHome} />
      </div>

      {/* bottom */}
      <div className="absolute -bottom-2 flex items-end justify-center w-full h-2/4">
        <div className="relative flex flex-col items-center justify-end w-4/6 h-2/4 border-2 border-gray1 z-40">
          <div className="relative z-10 w-2/4 h-2/4 border-2 border-gray1"></div>
        </div>

        <Lineup type="away" lineup={lineupAway} players={titularAway} />
      </div>

      {/* circulo */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-2/6 h-2/6 rounded-full border-2 border-gray1"></div>
      </div>

      {/* linea */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-full h-[2px] bg-gray1"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Header
        className="pb-3 md:pb-5"
        data={{ name: nameHome, image: imageHome, lineup: lineupHome }}
      />

      <Desktop />
      <Mobile />

      <Header
        className="pt-3 md:pt-5"
        data={{ name: nameAway, image: imageAway, lineup: lineupAway }}
      />
    </div>
  );
};
