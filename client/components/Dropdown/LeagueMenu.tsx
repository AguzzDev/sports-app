import Image from "next/image"
import Link from "next/link"
import { Menu } from "@headlessui/react"

import { leagueImg } from "../../utils/leagueImg"
import { IconMD, IconXS } from "../Icon"
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline"
import { LeagueMenuProps } from "../../interface"

export const LeagueMenu = ({ data, league }: LeagueMenuProps) => {
  const image = leagueImg(league, data)

  return (
    <Menu as="div">
      <Menu.Button>
        <div className="flex items-center justify-center p-2 bg-gray3 sm:w-20 h-14 rounded-xl">
          <div className="flex items-center space-x-1">
            {image ? (
              <>
                <Image
                  src={image.img}
                  alt={image.title}
                  height={60}
                  width={40}
                  objectFit="contain"
                />

                <IconXS Icon={ChevronDownIcon} />
              </>
            ) : (
              <>
                <IconMD Icon={GlobeAltIcon} />
                <IconXS Icon={ChevronDownIcon} />
              </>
            )}
          </div>
        </div>
      </Menu.Button>
      <Menu.Items className="z-[999] absolute rounded-md top-20 left-10 w-52 bg-gray3">
        <div className="relative grid grid-cols-3 gap-5 p-4">
          {data.map(({ title, img }: { title: string; img: string }) => (
            <div key={title}>
              <Menu.Item>
                <button>
                  <Link href={`/league/${title}#Inicio`}>
                    <Image src={img} alt={title} height={60} width={50} />
                  </Link>
                </button>
              </Menu.Item>
            </div>
          ))}
        </div>
        <div
          className="absolute w-4 h-3 rotate-180 -top-3 left-4 bg-gray3"
          style={{ clipPath: "polygon(100% 0, 0 0, 50% 100%)" }}
        ></div>
      </Menu.Items>
    </Menu>
  )
}
