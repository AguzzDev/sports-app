import { TeamInterface } from "interface";
import { Table } from "./Table";
import { extractColumn } from "utils/extractColumn";
import Image from "next/image";

export const TableSquad = ({ data }: { data: TeamInterface["squad"] }) => {
  return (
    <Table
      headers={["Número", "Jugador", "Posición", "Valor de Mercado"]}
      dataPerColumn={[
        extractColumn(data, "number"),
        data.map(({ img, name }) => (
          <div key={name} className="flex items-center sm:space-x-2">
            <div className="hidden sm:block relative w-10 h-10 rounded-full overflow-hidden border-2 border-border1">
              <Image src={img} alt={`Player ${name}`} layout="fill" />
            </div>
            <span className="text-left">{name}</span>
          </div>
        )),
        extractColumn(data, "position"),
        extractColumn(data, "marketValue"),
      ]}
    />
  );
};
