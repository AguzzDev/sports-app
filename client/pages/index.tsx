import type { NextPage } from "next"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { Layout2 } from "../components/Layout2"
import { TopMenu } from "../components/Menu/TopMenu"

import { QueryContext } from "../context/QueryContext"

const Home: NextPage = () => {
  const { setLeague } = useContext(QueryContext)

  useEffect(() => {
    setLeague("")
  }, [])

  return (
    <>
      <Layout2 title="Inicio">
        <section className="flex flex-col h-full">
          <TopMenu title="Sports App" />

          <section className="grid grid-cols-2 gap-5 m-5">
            <div className="w-full bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
            <div className="w-full bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
            <div className="w-full col-span-2 bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
          </section>
          
          <footer className="flex items-end justify-center h-full py-4 text-sm">
            Pagina hecha por
            <span className="px-1 gradient1">
              <Link href="https://agustin-ribotta.xyz/">
                <a target="_blank" rel="noopener noreferrer">
                  AguzzDev
                </a>
              </Link>
            </span>
            , diseño por
            <span className="pl-1 gradient1">
              <Link href="https://dribbble.com/shots/15745626-Football-Player-Page-Desktop-Version">
                <a target="_blank" rel="noopener noreferrer">
                  PAHRI
                </a>
              </Link>
            </span>
          </footer>
        </section>
      </Layout2>
    </>
  )
}

export default Home
