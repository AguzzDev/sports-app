import { TableSquad } from "../Table/TableSquad"

export const Squad = ({ data }:any) => {
  return (
    <div className="mx-2 md:w-3/4 md:mx-auto">
       <TableSquad data={data}/>
    </div>
  )
}
