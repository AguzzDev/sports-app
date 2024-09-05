import { HomeIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconMD } from "components/Icon";
import { LoadingSidemenu } from "components/Loading";
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
  }, [loading]);

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
    <section className="sticky inset-0 w-full xl:w-[10vw] min-h-full z-[9999] flex flex-row items-center h-full border-gray2 pt-4 px-5 bg-black1 xl:flex-col xl:h-screen xl:border-r-2 xl:px-0">
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
              className="flex flex-row w-full h-full overflow-x-auto overflow-y-hidden xl:overflow-x-hidden xl:overflow-y-scroll cursor-pointer xl:flex-col ml-5 mt-1 lg:mt-4 xl:ml-0 xl:mt-5"
            >
              {data?.map(({ img, name }: SidebarItemsProps, i: number) => {
                return (
                  <Link href={`/${goto}/${name}#Overview`} key={i}>
                    <button
                      data-index={i}
                      onClick={() => scrollMenu(i, name)}
                      className={`relative mx-3 xl:mx-0 my-3 flex lg:flex-col hover:opacity-100 -translate-y-2 ${
                        name === router.query.title || router.pathname === "/"
                          ? "opacity-100"
                          : "opacity-40"
                      }`}
                    >
                      <div className="flex lg:flex-col items-center w-full h-full">
                        <Image
                          key={name}
                          src={img}
                          alt={name}
                          width={80}
                          height={80}
                          objectFit="contain"
                        />

                        <p
                          className={`${
                            name === router.query.title && "gradient1"
                          } text-left w-32 lg:text-center text-sm font-extrabold`}
                        >
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
