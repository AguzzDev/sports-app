import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"

import { GET_LEAGUE } from "../../graphql/querys"
import { TopMenu } from "../../components/Menu/TopMenu"
import { Overview } from "../../components/States/Overview"
import { Schedule } from "../../components/States/Schedule"
import { Standing } from "../../components/States/Standing"
import { Loading } from "../../components/Loading"
import { Layout2 } from "../../components/Layout2"

const League = () => {
  const router = useRouter()
  const hashPath = router.asPath.split("#")[1]

  const { data, loading } = useQuery(GET_LEAGUE, {
    variables: { league: router.query.title }
  })
  return (
    <Layout2 title={data?.getLeague?.title}>
      <section>
        {loading ? (
          <Loading/>
        ) : (
          <>
            <TopMenu title={data?.getLeague?.title} goBack="/" />
            <section className="mx-3 sm:mx-7 my-5 sm:my-5">
              {hashPath === "Overview" ? (
                <Overview data={data.getLeague} />
              ) : hashPath === "Schedule" ? (
                <Schedule data={data.getLeague.calendar} />
              ) : (
                <Standing data={data.getLeague.table} />
              )}
            </section>
          </>
        )}
      </section>
    </Layout2>
  )
}

export default League
