import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChevronLeftIcon } from "@heroicons/react/24/solid"

import { IconMD, IconXS } from "../Icon"
import { TopMenuProps } from "../../interface"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FlagIcon,
} from "@heroicons/react/24/outline"

export const TopMenu = ({ title, goBack }: TopMenuProps) => {
  const router = useRouter()
  const hashPath = router.asPath.split("#")[1]

  const navItem = (title: string) => {
    return (
      <Link href={`#${title}`}>
        <button>
          <div className="flex flex-col h-full">
            <div className="relative w-[4.5rem]">
              <h1
                className={`text-sm lg:text-base ${
                  title === hashPath
                    ? "gradient1"
                    : "text-gray1 hover:gradient1"
                }`}
              >
                {title}
              </h1>
            </div>
            <div className="absolute ml-[0.3rem] mt-6 sm:mt-8">
              {title === hashPath && (
                <Image
                  src="/svg/Arrow.svg"
                  alt="arrow_svg"
                  height={15}
                  width={65}
                  objectFit="cover"
                />
              )}
            </div>
          </div>
        </button>
      </Link>
    )
  }
  return (
    <section className="flex w-full py-5 border-b-2 border-gray2">
      {!router.pathname.includes("/game") && (
        <div className="flex items-center w-3/6 pl-3 space-x-2 sm:pl-5">
          {goBack && (
            <Link href={goBack}>
              <button>
                <IconMD Icon={ChevronLeftIcon} />
              </button>
            </Link>
          )}
          <h1 className="hidden text-lg truncate sm:block lg:text-xl">
            {title}
          </h1>
        </div>
      )}

      <div className="flex justify-center w-full space-x-5">
        {router.pathname.includes("/league") ? (
          <>
            {navItem((title = "Inicio"))}
            {navItem((title = "Calendario"))}
            {navItem((title = "Posiciones"))}
          </>
        ) : router.pathname.includes("/team") ? (
          <>
            {navItem((title = "Inicio"))}
            {navItem((title = "Calendario"))}
            {navItem((title = "Plantilla"))}
          </>
        ) : (
          <div className="flex space-x-5">
            <Link href="/game/HigherOrLower">
              <button className="flex items-center space-x-2 group text-gray1 hover:gradient1">
                <h1>Higher-Lower</h1>
                <div className="flex flex-col">
                  <IconXS
                    Icon={ChevronUpIcon}
                    color="group-hover:text-[#B76C7D]"
                  />
                  <IconXS
                    Icon={ChevronDownIcon}
                    color="group-hover:text-[#B76C7D]"
                  />
                </div>
              </button>
            </Link>
            <Link href="/game/WorldCupPrediction">
              <button className="flex items-center space-x-2 group text-gray1 hover:gradient1">
                <h1>World Cup Prediction</h1>
                <IconXS Icon={FlagIcon} color="group-hover:text-[#B76C7D]" />
              </button>
            </Link>
          </div>
        )}
      </div>

      {!router.pathname.includes("/game") && <div className="w-3/6 px-5"></div>}
    </section>
  )
}
