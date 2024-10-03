import { HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconMD } from "components/Icon/Icon";
import { LoadingSidemenu } from "components/Loading/Loading";
import { SidebarItemsProps } from "interface";
import { useLeague } from "context/QueryContext";
import { SidemenuData } from "data/SidemenuData";

export const Sidemenu = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const { league, saveLeague } = useLeague();
  const query: any = router.pathname === "/" || router.pathname === "/team";
  const goto = query ? "league" : "team";

  const data = query ? SidemenuData.logos : SidemenuData.leagues[league!];
  const scrollMenu = (i: number, name: string) => {
    localStorage.setItem("scrollNav", `${i}`);
    if (router.pathname === "/") {
      saveLeague(name);
    }
  };

  useEffect(() => {
    if (loading || router.pathname === "/" || router.pathname.includes("/game"))
      return;

    const element = localStorage.getItem("scrollNav");

    const to = document.querySelector(
      `#sidebar button[data-index="${element}"]`
    );

    to!.scrollIntoView({
      block: "start",
      inline: "start",
    });
  }, [loading, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    interval = setTimeout(() => {
      setLoading(false);
      clearInterval(interval);
    }, 1500);

    return () => {
      clearInterval(interval);
      setLoading(true);
    };
  }, [router]);

  return (
    <section className="flex flex-row xl:flex-col items-center h-full border-gray2 pt-2 pl-5 xl:pt-4 xl:px-0 border-b-2 xl:border-r-2 bg-black1">
      {loading ? (
        <LoadingSidemenu />
      ) : (
        <>
          <button className="xl:w-3/4 mx-auto">
            <Link href="/">
              <div className="flex items-center justify-center p-3 bg-gray3 rounded-xl mb-5">
                <IconMD Icon={HomeIcon} />
              </div>
            </Link>
          </button>

          {!router.pathname.includes("/game") && (
            <section
              id="sidebar"
              className="flex flex-row xl:flex-col overflow-x-scroll xl:overflow-y-scroll xl:overflow-x-hidden cursor-pointer ml-5 xl:ml-0 pt-2"
            >
              {data?.map(({ img, name }: SidebarItemsProps, i: number) => {
                return (
                  <Link href={`/${goto}/${name}#Overview`} key={i}>
                    <button
                      data-index={i}
                      onClick={() => scrollMenu(i, name)}
                      className={`relative flex lg:flex-col xl:my-2 mx-3 xl:mx-0 hover:opacity-100 -translate-y-2 ${
                        name === router.query.title || router.pathname === "/"
                          ? "opacity-100"
                          : "opacity-60"
                      }`}
                    >
                      <div className="flex lg:flex-col items-center w-full h-full">
                        <div className="relative logoSize">
                          <Image
                            key={name}
                            src={img}
                            alt="league-logo"
                            objectFit="contain"
                            layout="fill"
                          />
                        </div>

                        <p className="text-sm text-left w-28 md:w-32 lg:text-center font-extrabold ml-2 md:ml-0">
                          {name}
                        </p>
                      </div>
                    </button>
                  </Link>
                );
              })}
            </section>
          )}
        </>
      )}
    </section>
  );
};
