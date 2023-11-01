import { useQuery } from "@apollo/client";
import { HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { QueryContext } from "../../context/QueryContext";
import { SidemenuData } from "../../data/SidemenuData";
import { GET_LEAGUES } from "../../graphql/querys";
import { IconMD } from "../Icon";
import { LoadingSidemenu } from "../Loading";
import { LeagueMenu } from "../Dropdown/LeagueMenu";

export const Sidemenu = () => {
  const router = useRouter();

  const { league } = useContext(QueryContext);

  const query: any =
    (router.pathname.includes("/league") && router.query.title) ||
    (router.pathname.includes("/team") && league);

  const { loading, data } = useQuery(GET_LEAGUES);

  const menuData = query ? SidemenuData[query] : null;

  const scrollMenu = (i: number) => {
    localStorage.setItem("scrollNav", `${i}`);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const element = localStorage.getItem("scrollNav");

      if (element) {
        const to = document.querySelector(
          `#sidebar button:nth-child(${element})`
        );

        to?.scrollIntoView();
        window.scroll({ top: 0 });
      }
    }
  }, [loading]);

  return (
    <section className="sticky top-0 flex flex-row items-center w-full mt-2 border-r-2 xl:flex-col xl:mt-0 xl:h-screen border-gray2">
      {loading ? (
        <LoadingSidemenu path={router.pathname} />
      ) : (
        <>
          {router.pathname.includes("/game") ? (
            <button className="py-2 mx-auto">
              <Link href="/">
                <div className="flex items-center justify-center w-20 p-2 bg-gray3 h-14 rounded-xl">
                  <IconMD Icon={HomeIcon} />
                </div>
              </Link>
            </button>
          ) : (
            <>
              <div className="flex justify-center ml-3 sm:ml-7 xl:ml-0 xl:my-0 sm:py-2 sm:px-0 xl:pr-0 xl:w-full">
                <LeagueMenu league={query} data={data.getAllLeagues} />
              </div>
              <div className="flex flex-row w-full mt-2 space-x-5 overflow-x-hidden overflow-y-hidden cursor-pointer sm:space-x-0 xl:flex-col xl:overflow-y-scroll">
                {menuData?.map(
                  (
                    { img, title }: { img: string; title: string },
                    i: number
                  ) => {
                    return (
                      <Link href={`/team/${title}#Overview`} key={i}>
                        <button
                          onClick={() => scrollMenu(i)}
                          className={`lg:h-full lg:w-full flex lg:flex-col py-4 hover:opacity-100 -translate-y-2 ${
                            router.query.title === title
                              ? "opacity-100"
                              : "opacity-40"
                          }`}
                        >
                          <div className="xl:mx-3 min-w-[13vw] xl:min-w-0 flex lg:flex-col items-center">
                            <Image
                              key={title}
                              src={img}
                              alt={title}
                              width={66}
                              height={66}
                              objectFit="contain"
                            />
                            <p className="hidden w-32 text-xs truncate lg:block xl:text-sm">
                              {title}
                            </p>
                          </div>
                        </button>
                      </Link>
                    );
                  }
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};
