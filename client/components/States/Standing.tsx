import React from "react";
import { TableStanding } from "components/Table/TableStanding";
import { LeagueInterface } from "interface";

export const Standing = ({ data }: { data: LeagueInterface["table"] }) => {
  return (
    <div className="mx-2 md:w-3/4 md:mx-auto">
      <TableStanding data={data} />
    </div>
  );
};
