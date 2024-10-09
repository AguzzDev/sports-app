import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_LEAGUE } from "graphql/querys";
import { Overview } from "components/States/Overview";
import { Schedule } from "components/States/Schedule";
import { Standing } from "components/States/Standing";
import { Layout } from "components/Layout/Layout";
import { LeagueInterface } from "interface";

const League = () => {
  const router = useRouter();
  const hashPath = router.asPath.split("#")[1];

  const { data, loading } = useQuery<{ getLeague: LeagueInterface }>(
    GET_LEAGUE,
    {
      variables: { league: router.query.title },
    }
  );

  return (
    <Layout
      title={data?.getLeague.name}
      menuTitle={data?.getLeague.name}
      menuGoBack="/"
    >
      <>
        {loading ? (
          <></>
        ) : (
          <>
            <section>
              {hashPath === "Overview" ? (
                <Overview data={data!.getLeague} />
              ) : hashPath === "Calendar" ? (
                <Schedule data={data!.getLeague.calendar} />
              ) : (
                <Standing data={data!.getLeague.table} />
              )}
            </section>
          </>
        )}
      </>
    </Layout>
  );
};

export default League;
