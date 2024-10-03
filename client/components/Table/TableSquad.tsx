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
          <div key={name} className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image src={img} alt={`Player ${name}`} />
            </div>
            <span>{name}</span>
          </div>
        )),
        extractColumn(data, "position"),
        extractColumn(data, "marketValue"),
      ]}
    />
  );
};
