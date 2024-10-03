import { LeagueInterface } from "interface";
import Image from "next/image";
import { Table } from "./Table";
import { extractColumn } from "utils/extractColumn";

export const TableStanding = ({ data }: { data: LeagueInterface["table"] }) => {
  return (
    <Table
      colSpan={2}
      span={1}
      headers={["Posicion", "Club", "PJ", "G", "E", "P", "GF", "Pts"]}
      dataPerColumn={[
        extractColumn(data, "position"),
        data.map(({ team, img }) => (
          <div key={team} className="flex col-span-5">
            <Image
              src={img}
              alt={`${img}-img`}
              width={15}
              height={20}
              objectFit="contain"
            />
            <p className="pl-5">{team}</p>
          </div>
        )),
        extractColumn(data, "games"),
        extractColumn(data, "win"),
        extractColumn(data, "draw"),
        extractColumn(data, "lose"),
        extractColumn(data, "differenceGoal"),
        extractColumn(data, "points"),
      ]}
    />
  );
};
