import Image from "next/image"
import { useRouter } from "next/router"
import { InfoTeamProps, TitlesTeamProps } from "../../interface"
import { TableScorers } from "../Table/TableScorers"

export const Overview = ({
  data,
  info,
  titles,
}: {
  data?: any
  info?: InfoTeamProps
  titles?: TitlesTeamProps
}) => {
  const router = useRouter()

  return (
    <section className="flex flex-col justify-between space-y-5 xl:space-y-0 lg:flex-row">
      {router.pathname.includes("/league") ? (
        <>
          <div className="w-2/4">
            <h2 className="mb-5">Informacion general</h2>
            <ul className="ml-5 list-disc">
              <li>Actual campeon: {data?.actuallyWinner}</li>
              <li>Equipo mas ganador: {data?.moreCups}</li>
              <li>
                Jugador mas caro:
                <button className="ml-1 hover:gradient1">
                  {data?.playerMoreExpensive}
                </button>
              </li>
              <li>Ranking: {data?.ranking}</li>
            </ul>
          </div>
          <div className="mt-5 lg:w-2/4 lg:mt-0">
            <h2 className="mb-5">Maximos goleadores</h2>
            <TableScorers data={data} />
          </div>
        </>
      ) : (
        <>
          <div className="w-2/4">
            <h2 className="mb-5">Informacion general</h2>
            <ul className="ml-5 list-disc">
              <li>Estadio: {info?.stadium}</li>
              <li>Valor de mercado: {info?.marketValue}</li>
              <li>Ranking: {info?.balance}</li>
            </ul>
          </div>

          <div className="w-2/4">
            <h2 className="mb-5">Titulos</h2>
            <div className="w-full p-2 border-2 border-gray-500">
              <div className="flex flex-wrap pt-2">
                {titles?.map(({ title, img, years }, i) => (
                  <div key={i} title={`${title}\n${years}`}>
                    <Image
                      src={img}
                      alt={title}
                      height={80}
                      width={81}
                      objectFit="contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
