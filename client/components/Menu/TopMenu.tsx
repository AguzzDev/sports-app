import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { IconMD, IconSM } from "components/Icon";
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
          <h3
            className={` ${
              title === hashPath ? "gradient1" : "text-gray1 hover:gradient1"
            }`}
          >
            {title}
          </h3>

          <div className="absolute mt-6 md:mt-7 w-full h-full">
            {title === hashPath && (
              <Image src="/svg/Arrow.svg" alt="arrow_svg" layout="fill" objectFit="cover" className="scale-90"/>
            )}
          </div>
        </button>
      </Link>
    );
  };
  return (
    <section className="sticky top-[6.45rem] lg:top-[11.6rem] xl:top-0 bg-black1 flex flex-col md:flex-row py-5 border-b-2 border-gray2 z-[9999]">
      {!router.pathname.includes("/game") && (
        <div className="flex items-center w-full md:w-2/4 pl-3 space-x-2 md:pl-5 mb-2 md:mb-0">
          {goBack && (
            <Link href={goBack}>
              <button>
                <IconMD Icon={ChevronLeftIcon} />
              </button>
            </Link>
          )}
          <h2 className="w-full truncate">{title}</h2>
        </div>
      )}

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
                <h3>Higher-Lower</h3>
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
                <h3>World Cup Prediction</h3>
                <IconSM Icon={FlagIcon} color="group-hover:text-[#B76C7D]" />
              </button>
            </Link>
          </div>
        )}
      </div>

      {!router.pathname.includes("/game") && <div className="w-3/6 px-5"></div>}
    </section>
  );
};
