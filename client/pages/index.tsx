import type { NextPage } from "next";
import Link from "next/link";
import { Layout } from "components/Layout";
import { TopMenu } from "components/Menu/TopMenu";

const Home: NextPage = () => {
  return (
    <>
      <Layout title="Inicio">
        <section className="flex flex-col h-full">
          <TopMenu title="Sports App" />

          <section className="grid grid-cols-2 gap-5 m-5">
            <div className="w-full bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
            <div className="w-full bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
            <div className="w-full col-span-2 bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
          </section>

          <footer className="flex items-end justify-center h-full py-4">
            Develop by
            <span className="font-bold px-1 gradient1">
              <Link href="https://agustin-ribotta.xyz/">
                <a target="_blank" rel="noopener noreferrer">
                  AguzzDev
                </a>
              </Link>
            </span>
            | Design by
            <span className="font-bold pl-1 gradient1">
              <Link href="https://dribbble.com/shots/15745626-Football-Player-Page-Desktop-Version">
                <a target="_blank" rel="noopener noreferrer">
                  PAHRI
                </a>
              </Link>
            </span>
          </footer>
        </section>
      </Layout>
    </>
  );
};

export default Home;
