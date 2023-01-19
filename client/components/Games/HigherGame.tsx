import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useRandomPlayer } from "../../graphql/hooks"
import { PlayerProps } from "../../interface"
import { addCeroToMarketValue } from "../../utils/addCeroToMarketValue"
import { IconMD } from "../Icon"

export const HigherGame = () => {
  const [counter, setCounter] = useState(0)
  const [showPrice, setShowPrice] = useState(false)
  const [click, setClick] = useState(false)

  const { data, loading, refetch } = useRandomPlayer()

  const player1Value = addCeroToMarketValue(
    data?.getRandomPlayer[0]?.marketValue.split(" ")[0],
    data?.getRandomPlayer[0]?.marketValue.split(" ")[1]
  )
  const player2Value = addCeroToMarketValue(
    data?.getRandomPlayer[1]?.marketValue.split(" ")[0],
    data?.getRandomPlayer[1]?.marketValue.split(" ")[1]
  )

  const resolving = (value: string) => {
    setClick(true)
    setShowPrice(true)
    const higher = player2Value > player1Value
    const lower = player2Value < player1Value

    const finalResult = value === "higher" ? higher : lower

    if (finalResult) {
      setCounter(counter + 1)
    } else {
      setCounter(0)
    }
    refetch()
  }

  useEffect(() => {
    setShowPrice(false)
    setClick(false)
  }, [data])

  return (
    <>
      {loading ? (
        <div className="grid h-full place-content-center">
          <h1>loading</h1>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute z-10 flex items-center justify-center border-2 rounded-full -top-10 -left-10 w-14 h-14 border-gray2 bg-black1">
            <p className="text-3xl font-bold text-gradient1">{counter}</p>
          </div>
          <div className="flex flex-col justify-between">
            {data?.getRandomPlayer.map(
              (
                {
                  img,
                  league,
                  marketValue,
                  name,
                  position,
                  team,
                  teamImg,
                }: PlayerProps,
                i: number
              ) => (
                <>
                  <div className="flex pb-2 space-x-3">
                    <Image
                      src={img}
                      alt={`${name}-image`}
                      width={200}
                      height={200}
                      objectFit="contain"
                    />
                    <div className="flex flex-col w-3/4 space-y-1">
                      <h1>{name}</h1>
                      <div className="flex space-x-2">
                        <Image
                          src={teamImg}
                          alt={`${team}-logo`}
                          width={20}
                          height={20}
                          objectFit="contain"
                        />
                        <p>{team}</p>
                      </div>
                      <p>Liga: {league}</p>
                      <p>Posicion: {position}</p>

                      {i == 0 && <p>Valor de mercado: {marketValue}</p>}
                      {i == 1 && (
                        <p>
                          Valor de mercado:
                          {i > 0 && showPrice && (
                            <span className="ml-2">{marketValue}</span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    {i === 1 && (
                      <div className="flex flex-col space-y-2">
                        <>
                          <button
                            disabled={click && true}
                            className="flex justify-center p-2 space-x-2 font-bold border-2 border-green-700"
                            onClick={() => resolving("higher")}
                          >
                            <p>Higher</p>
                            <IconMD
                              Icon={ChevronUpIcon}
                              color="text-green-700"
                            />
                          </button>
                          <button
                            disabled={click && true}
                            className="flex justify-center p-2 space-x-2 font-bold border-2 border-red-700"
                            onClick={() => resolving("lower")}
                          >
                            <p>Lower</p>
                            <IconMD
                              Icon={ChevronDownIcon}
                              color="text-red-700"
                            />
                          </button>
                        </>
                      </div>
                    )}
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </>
  )
}
