import Image from "next/image"

export const TableSquad = ({ data }:any) => {
  return (
    <div className="border-2 border-gray-500">
      <div className="p-2 border-b-2 border-gray-500">
        <h1>Plantilla</h1>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-7 py-1 text-center">
          <h1>Numero</h1>
          <h1 className="col-span-2">Jugador</h1>
          <h1>Posicion</h1>
          <h1>Edad</h1>
          <h1>Valor de mercado</h1>
          <h1>Contrato hasta</h1>
        </div>
        {data.map(
          ({ position, number, name, marketValue, img, contract, age }:any) => (
            <div className="flex grid items-center grid-cols-7 py-2 text-center border-b border-gray-100 border-opacity-20">
              <p>{number}</p>
              <div className="flex items-center col-span-2 space-x-2">
                <Image
                  src={img}
                  alt={`${name}-image`}
                  width={28}
                  height={36}
                  objectFit="contain"
                />
                <p className="font-bold">{name}</p>
              </div>
              <p>{position}</p>
              <p>{age}</p>
              <p>{marketValue}</p>
              <p>{contract}</p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
