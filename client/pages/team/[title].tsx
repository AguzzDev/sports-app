import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useContext } from "react"

import { TopMenu } from "../../components/Menu/TopMenu"
import { Overview } from "../../components/States/Overview"
import { Schedule } from "../../components/States/Schedule"
import { Squad } from "../../components/States/Squad"
import { QueryContext } from "../../context/QueryContext"
import { GET_TEAM } from "../../graphql/querys"
import { Layout2 } from "../../components/Layout2"
import { Loading } from "../../components/Loading"

const Team = () => {
  const router = useRouter()
  const hashPath = router.asPath.split("#")[1]

  const { loading, data } = useQuery(GET_TEAM, {
    variables: { team: router.query.title },
  })

  const { setLeague } = useContext(QueryContext)
  setLeague(data?.getTeam?.info?.league)

  return (
    <Layout2 title={data?.getTeam?.info.title}>
      <section>
        {loading ? (
          <Loading />
        ) : (
          <>
            <TopMenu
              title={data?.getTeam?.info.title}
              goBack={`/league/${data.getTeam.info.league}#Overview`}
            />
            <section className="mx-3 my-5 sm:mx-7 sm:my-5">
              {hashPath === "Overview" ? (
                <Overview info={data.getTeam.info} titles={data.getTeam.titles} />
              ) : hashPath === "Schedule" ? (
                <Schedule data={data.getTeam} />
              ) : (
                <Squad data={data.getTeam.squad} />
              )}
            </section>
          </>
        )}
      </section>
    </Layout2>
  )
}

export default Team
