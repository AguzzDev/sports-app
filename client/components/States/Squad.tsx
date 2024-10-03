import { TableSquad } from "components/Table/TableSquad";
import { ContainerOne } from "components/UI/ContainerOne";
import { PlayerInterface } from "interface";

export const Squad: React.FC<{ data: PlayerInterface[] }> = ({ data }) => {
  return (
    <ContainerOne title="Plantilla" className="md:w-3/4 md:mx-auto">
      <TableSquad data={data} />
    </ContainerOne>
  );
};
