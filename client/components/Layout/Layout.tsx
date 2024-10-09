import { Footer } from "components/Footer/Footer";
import { Sidemenu } from "components/Menu/Sidemenu";
import { TopMenu } from "components/Menu/TopMenu";
import { ChildrenType } from "interface";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Layout = ({
  children,
  title,
  menuTitle,
  menuGoBack,
}: {
  children: ChildrenType;
  title: string | undefined;
  menuTitle?: string | undefined;
  menuGoBack?: string | undefined;
}) => {
  const [topMenuHeight, setTopMenuHeight] = useState(0);
  const [sum, setSum] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const updateHeight = () => {
    const sideMenuElement = document.getElementById("sideMenu");
    const topMenuElement = document.getElementById("topMenu");

    if (sideMenuElement && topMenuElement) {
      const topHeight = topMenuElement.offsetHeight;
      const sideHeight = sideMenuElement.offsetHeight;
      setTopMenuHeight(topHeight);
      setSum(sideHeight + topHeight);
    }
  };

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Sports App</title>
      </Head>

      <section className="h-screen">
        <div
          id="topMenu"
          className="z-[999] fixed top-0 w-screen xl:left-[10vw]"
        >
          <TopMenu title={menuTitle} goBack={menuGoBack} />
        </div>

        <div
          id="sideMenu"
          className={`z-[999] fixed xl:top-0 xl:left-0 w-screen xl:h-full xl:w-[10vw]`}
          style={{
            top: isDesktop ? `0px` : `${topMenuHeight}px`,
          }}
        >
          <Sidemenu />
        </div>

        <div
          className="m-3 md:m-5 xl:ml-[10vw] px-0 xl:px-7 h-full"
          style={{
            paddingTop: isDesktop ? `${topMenuHeight}px` : `${sum}px`,
          }}
        >
          {children}

          <Footer />
        </div>
      </section>
    </>
  );
};
