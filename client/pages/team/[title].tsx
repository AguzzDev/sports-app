import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { TopMenu } from "components/Menu/TopMenu";
import { Overview } from "components/States/Overview";
import { Schedule } from "components/States/Schedule";
import { Squad } from "components/States/Squad";
import { GET_TEAM } from "graphql/querys";
import { Layout } from "components/Layout";
import { TeamInterface } from "interface";

const Team = () => {
  const router = useRouter();
  const hashPath = router.asPath.split("#")[1];

  const { loading, data } = useQuery<{ getTeam: TeamInterface }>(GET_TEAM, {
    variables: { team: router.query.title },
  });
  
  return (
    <Layout title={data?.getTeam.info.name}>
      <section>
        {loading ? (
          <></>
        ) : (
          <>
            <TopMenu
              title={data!.getTeam.info.name}
              goBack={`/league/${data!.getTeam.info.league}#Overview`}
            />
            <section className="mx-3 my-5 sm:mx-7 sm:my-5">
              {hashPath === "Overview" ? (
                <Overview data={data!.getTeam} />
              ) : hashPath === "Calendar" ? (
                <Schedule data={data!.getTeam} />
              ) : (
                <Squad data={data!.getTeam.squad} />
              )}
            </section>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Team;
