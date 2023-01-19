import Image from "next/image"

export const TableStanding = ({ data }: any) => {
  return (
    <div className="border-2 border-gray-500">
      <div className="p-2">
        <div className="grid grid-cols-12 py-1 text-center">
          <h1>Posicion</h1>
          <h1 className="col-span-5">Club</h1>
          <h1>PJ</h1>
          <h1>G</h1>
          <h1>E</h1>
          <h1>P</h1>
          <h1>GF</h1>
          <h1>Pts</h1>
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
            }: any,
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
  )
}
