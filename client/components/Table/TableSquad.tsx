import { TeamInterface } from "interface";
import Image from "next/image";

export const TableSquad = ({ data }: { data: TeamInterface["squad"] }) => {
  return (
    <div className="border-2 border-gray-500">
      <div className="p-2 border-b-2 border-gray-500">
        <h2>Plantilla</h2>
      </div>
      <div className="p-2">
        <div className="grid grid-cols-5 py-1 text-center">
          <h3>Numero</h3>
          <h3 className="col-span-2">Jugador</h3>
          <h3>Posicion</h3>
          <h3>Valor de mercado</h3>
        </div>
        {data.map(({ position, number, name, marketValue, img }, i: number) => (
          <div
            key={i}
            className="grid items-center grid-cols-5 py-2 text-center border-b border-gray-100 border-opacity-20"
          >
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
            <p>{marketValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
