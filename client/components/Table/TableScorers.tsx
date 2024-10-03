import { LeagueInterface } from "interface";
import Image from "next/image";
import { Table } from "./Table";
import { extractColumn } from "utils/extractColumn";

export const TableScorers = ({
  data,
}: {
  data: LeagueInterface["topScorers"];
}) => {
  return (
    <Table
      colSpan={2}
      span={1}
      headers={["Puesto", "Jugador", "Posicion", "Club", "Goles"]}
      dataPerColumn={[
        extractColumn(data, "position"),
        data.map(({ img, player }) => (
          <div key={player} className="flex items-center col-span-2 space-x-2">
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
        )),
        extractColumn(data, "positionIn"),
        data.map(({ team }) => (
          <div key={team}>
            {team && (
              <Image
                src={team}
                alt={`${team}-image`}
                width={18}
                height={20}
                objectFit="contain"
              />
            )}
          </div>
        )),
        extractColumn(data, "goals"),
      ]}
    />
  );
};
