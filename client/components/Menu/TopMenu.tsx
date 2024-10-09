import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { IconMD, IconSM } from "components/Icon/Icon";
import { TopMenuProps } from "interface";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

export const TopMenu = ({ title, goBack }: TopMenuProps) => {
  const router = useRouter();
  const hashPath = router.asPath.split("#")[1];

  const navItem = (title: string) => {
    return (
      <Link href={`#${title}`}>
        <button className="relative flex flex-col mx-5">
          <h4
            className={`font-bold ${
              title === hashPath ? "gradient1" : "text-gray1 hover:gradient1"
            }`}
          >
            {title}
          </h4>

          <div className="absolute mt-8 lg:mt-[35px] xl:mt-9 w-full h-3/4">
            {title === hashPath && (
              <Image
                src="/svg/Arrow.svg"
                alt="arrow_svg"
                layout="fill"
                objectFit="cover"
                className="scale-75"
              />
            )}
          </div>
        </button>
      </Link>
    );
  };
  return (
    <section className="bg-black1 flex flex-col md:flex-row py-5 border-b-2 border-gray2">
      <div className="flex items-center justify-center md:justify-start w-full md:w-2/6 space-x-2 md:pl-5 mb-2 md:mb-0">
        <div className="hidden md:flex">
          <Link href={goBack ? goBack : "/"}>
            <button>
              <IconMD Icon={ChevronLeftIcon} />
            </button>
          </Link>
        </div>

        <h2 className="truncate">{title}</h2>
      </div>

      <div className="flex justify-center items-center w-full">
        {router.pathname.includes("/league") ? (
          <>
            {navItem("Overview")}
            {navItem("Calendar")}
            {navItem("Standings")}
          </>
        ) : router.pathname.includes("/team") ? (
          <>
            {navItem("Overview")}
            {navItem("Calendar")}
            {navItem("Squad")}
          </>
        ) : (
          <div className="flex space-x-5">
            <Link href="/game/HigherOrLower">
              <button className="flex items-center space-x-2 group text-gray1 hover:gradient1">
                <h4>Higher-Lower</h4>
                <div className="flex flex-col">
                  <IconSM
                    Icon={ChevronUpIcon}
                    color="group-hover:text-[#B76C7D]"
                  />
                  <IconSM
                    Icon={ChevronDownIcon}
                    color="group-hover:text-[#B76C7D]"
                  />
                </div>
              </button>
            </Link>
            <Link href="/game/WorldCupPrediction">
              <button className="flex items-center space-x-2 group text-gray1 hover:gradient1">
                <h4>World Cup Prediction</h4>
                <IconSM Icon={FlagIcon} color="group-hover:text-[#B76C7D]" />
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className="w-2/6 xl:w-3/6 px-5"></div>
    </section>
  );
};
