import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { IconMD } from "../Icon"

interface ScheduleProps {
  data: any
  title?: string
  mode: string
  i?: number
}

export const TableSchedule = ({ data, title, mode, i }: ScheduleProps) => {
  const allItems = data.length

  return (
    <>
      {mode === "league" ? (
        <Disclosure
          key={i}
          defaultOpen={i! < 4}
          as="div"
          className="my-5 border-2 border-gray-500"
        >
          <Disclosure.Button className="w-full p-2">
            {({ open }) => (
              <div className="flex justify-between">
                <h1>{title}</h1>
                <div className={open ? "transform rotate-180" : ""}>
                  <IconMD Icon={ChevronDownIcon} />
                </div>
              </div>
            )}
          </Disclosure.Button>
          <Disclosure.Panel>
            <div className="grid grid-cols-6 text-sm text-center sm:grid-cols-7 sm:text-base">
              <h1>Dato</h1>
              <h1 className="hidden sm:flex">Horario</h1>
              <h1 className="col-span-2">Local</h1>
              <h1>Resultado</h1>
              <h1 className="col-span-2">Visitante</h1>
            </div>
            {data.map(
              (
                {
                  date,
                  localTeam,
                  localTeamImg,
                  result,
                  time,
                  visitantTeam,
                  visitantTeamImg,
                }: any,
                i: any
              ) => (
                <div
                  key={i}
                  className={`text-sm sm:text-base grid grid-cols-6 sm:grid-cols-7 text-center py-1 ${
                    i < allItems - 1 &&
                    "border-b border-gray-100 border-opacity-20"
                  }`}
                >
                  <p className="flex pl-3 text-sm sm:hidden">
                    {date.split(" ")[0]}
                  </p>
                  <p className="hidden pl-3 text-sm sm:flex">
                    {date.split(" ")[1]}
                  </p>
                  <p className="hidden text-sm sm:flex">{time}</p>
                  <div className="flex justify-end col-span-2">
                    <p className="my-auto mr-1 truncate sm:mr-5">{localTeam}</p>
                    <Image
                      src={localTeamImg}
                      width={15}
                      height={20}
                      objectFit="contain"
                    />
                  </div>
                  <p className="font-bold">{result}</p>
                  <div className="flex col-span-2">
                    <Image
                      src={visitantTeamImg}
                      width={15}
                      height={20}
                      objectFit="contain"
                    />
                    <p className="my-auto ml-1 truncate sm:ml-5">
                      {visitantTeam}
                    </p>
                  </div>
                </div>
              )
            )}
          </Disclosure.Panel>
        </Disclosure>
      ) : (
        <div className="border-2 border-gray-500">
          <h1>{title}</h1>
          <div className="grid grid-cols-8 py-1 text-center">
            <h1>Jornada</h1>
            <h1>Fecha</h1>
            <h1>Horario</h1>
            <h1 className="col-span-2">Local</h1>
            <h1>Resultado</h1>
            <h1 className="col-span-2">Visitante</h1>
          </div>
          {data.schedule.map(
            ({ date, game, locality, result, rival, rivalImg, time }: any) => (
              <div className="grid grid-cols-6 py-2 text-sm text-center border-b border-gray-100 sm:text-base sm:grid-cols-8 border-opacity-20">
                <p className="text-sm">{game}</p>
                <p className="hidden text-sm sm:flex">{date}</p>
                <p className="hidden text-sm sm:flex">{time}</p>
                {locality === "H" ? (
                  <>
                    <div className="flex justify-end col-span-2">
                      <p className="my-auto mr-3 truncate sm:mr-5">
                        {data.info.title}
                      </p>
                      <Image
                        src={data.info.img}
                        width={15}
                        height={20}
                        objectFit="contain"
                      />
                    </div>
                    <p className="font-bold">{result}</p>
                    <div className="flex col-span-2">
                      <Image
                        src={rivalImg}
                        width={15}
                        height={20}
                        objectFit="contain"
                      />
                      <p className="my-auto ml-3 truncate sm:ml-5">{rival}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-end col-span-2">
                      <p className="my-auto mr-3 truncate sm:mr-5">{rival}</p>
                      <Image
                        src={rivalImg}
                        width={15}
                        height={20}
                        objectFit="contain"
                      />
                    </div>
                    <p>{result}</p>
                    <div className="flex col-span-2">
                      <Image
                        src={data.info.img}
                        width={15}
                        height={20}
                        objectFit="contain"
                      />
                      <p className="my-auto ml-3 truncate sm:ml-5">
                        {data.info.title}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      )}
    </>
  )
}
