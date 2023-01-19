import { useRouter } from "next/router"
import { TableSchedule } from "../Table/TableSchedule"

export const Schedule = ({ data }:any) => {
  const router = useRouter()

  return (
    <section>
      {router.pathname.includes("/league") ? (
        <div className="mx-2 md:w-3/4 md:mx-auto">
          {data.map(({ title, tableAllData }:any,i:number) => (
            <TableSchedule key={i} i={i} title={title} data={tableAllData} mode="league" />
          ))}
        </div>
      ) : (
        <div className="mx-2 md:w-3/4 md:mx-auto">
          {data.schedule.length > 0 ? (
            <TableSchedule data={data} mode="team" />
          ) : (
            <h3>La pelota descansa</h3>
          )}
        </div>
      )}
    </section>
  )
}
