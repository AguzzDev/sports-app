import { LeagueInterface } from "interface";
import Image from "next/image";

export const TableScorers = ({
  data,
}: {
  data: LeagueInterface["topScorers"];
}) => {
  return (
    <div className="border-2 border-gray-500">
      <div className="grid grid-cols-7 py-1 text-center">
        <h3>Puesto</h3>
        <h3 className="col-span-2">Jugador</h3>
        <h3 className="col-span-2">Posicion</h3>
        <h3>Club</h3>
        <h3>Goles</h3>
      </div>
      {data.map(
        ({ goals, img, player, position, positionIn, team }, i: number) => (
          <div
            key={i}
            className="grid items-center grid-cols-7 py-2 text-center border-b border-gray-100 border-opacity-20"
          >
            <p>{position}</p>
            <div className="flex items-center col-span-2 space-x-2">
              {img && (
                <Image
                  src={img}
                  alt={`${player}-image`}
                  width={28}
                  height={36}
                  objectFit="contain"
                />
              )}
              <p>{player}</p>
            </div>
            <div className="col-span-2">
              <p>{positionIn}</p>
            </div>
            <div>
              {team && (
                <Image
                  src={team}
                  alt="club-image"
                  width={18}
                  height={20}
                  objectFit="contain"
                />
              )}
            </div>
            <p>{goals}</p>
          </div>
        )
      )}
    </div>
  );
};
