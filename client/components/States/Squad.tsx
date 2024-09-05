import { TableSquad } from "components/Table/TableSquad";
import { PlayerInterface } from "interface";

export const Squad = ({ data }: { data: PlayerInterface[] }) => {
  return (
    <div className="mx-2 md:w-3/4 md:mx-auto">
      <TableSquad data={data} />
    </div>
  );
};
