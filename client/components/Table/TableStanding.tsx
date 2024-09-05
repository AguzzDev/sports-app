import { LeagueInterface } from "interface";
import Image from "next/image";

export const TableStanding = ({ data }: { data: LeagueInterface["table"] }) => {
  return (
    <div className="border-2 border-gray-500">
      <div className="p-2">
        <div className="grid grid-cols-12 py-1 text-center">
          <h3>Posicion</h3>
          <h3 className="col-span-5">Club</h3>
          <h3>PJ</h3>
          <h3>G</h3>
          <h3>E</h3>
          <h3>P</h3>
          <h3>GF</h3>
          <h3>Pts</h3>
        </div>
        {data.map(
          (
            {
              differenceGoal,
              draw,
              games,
              img,
              lose,
              points,
              position,
              team,
              win,
            },
            i: number
          ) => (
            <div
              key={i}
              className="grid grid-cols-12 py-1 text-center border-b border-gray-100 border-opacity-20"
            >
              <p className="text-sm">{position}</p>
              <div className="flex col-span-5">
                <Image
                  src={img}
                  alt={`${img}-img`}
                  width={15}
                  height={20}
                  objectFit="contain"
                />
                <p className="pl-5">{team}</p>
              </div>
              <p className="text-sm">{games}</p>
              <p className="text-sm">{win}</p>
              <p className="text-sm">{draw}</p>
              <p className="text-sm">{lose}</p>
              <p className="text-sm">{differenceGoal}</p>
              <p className="text-sm">{points}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
