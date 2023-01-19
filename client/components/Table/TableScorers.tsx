import Image from "next/image"

export const TableScorers = ({ data }:any) => {
  return (
    <div className="border-2 border-gray-500">
      <div className="grid grid-cols-7 py-1 text-center">
        <h1>Puesto</h1>
        <h1 className="col-span-2">Jugador</h1>
        <h1 className="col-span-2">Posicion</h1>
        <h1>Club</h1>
        <h1>Goles</h1>
      </div>
      {data.topScorers.map(
        ({ goals, img, player, position, positionIn, team }:any,i:number) => (
          <div key={i} className="grid items-center grid-cols-7 py-2 text-center border-b border-gray-100 border-opacity-20">
            <p>{position}</p>
            <div className="flex items-center col-span-2 space-x-2">
              <Image
                src={img}
                alt={`${player}-image`}
                width={28}
                height={36}
                objectFit="contain"
              />
              <p>{player}</p>
            </div>
            <div className="col-span-2">
              <p>{positionIn}</p>
            </div>
            <div>
              <Image
                src={team}
                alt="club-image"
                width={18}
                height={20}
                objectFit="contain"
              />
            </div>
            <p>{goals}</p>
          </div>
        )
      )}
    </div>
  )
}
