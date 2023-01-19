import React from "react"
import { TableStanding } from "../Table/TableStanding"

export const Standing = ({ data }:any) => {
  return (
    <div className="mx-2 md:w-3/4 md:mx-auto">
      <TableStanding data={data} />
    </div>
  )
}
