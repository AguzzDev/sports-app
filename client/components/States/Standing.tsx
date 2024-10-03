import React from "react";
import { TableStanding } from "components/Table/TableStanding";
import { LeagueInterface } from "interface";
import { ContainerOne } from "components/UI/ContainerOne";

export const Standing: React.FC<{ data: LeagueInterface["table"] }> = ({
  data,
}) => {
  return (
    <ContainerOne title="Tabla de posiciones" className="md:w-3/4 md:mx-auto">
      <TableStanding data={data} />
    </ContainerOne>
  );
};
