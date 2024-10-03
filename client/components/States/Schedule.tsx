import { useRouter } from "next/router";
import { TableSchedule } from "components/Table/TableSchedule";
import { LeagueInterface, ScheduleProps } from "interface";
import { hasProperty } from "utils/hasProperty";
import { ContainerOne } from "components/UI/ContainerOne";

export const Schedule: React.FC<{ data: ScheduleProps }> = ({ data }) => {
  const router = useRouter();
  const leagueRoute = router.pathname.includes("/league");

  const isLeagueInterface = (
    data: ScheduleProps
  ): data is LeagueInterface["calendar"] => {
    return hasProperty(data, "tableAllData");
  };

  const leagueData = isLeagueInterface(data) ? data : undefined;
  const teamData = !isLeagueInterface(data) ? data : undefined;

  return (
    <section>
      {leagueRoute ? (
        <ContainerOne title="Calendario">
          <div className="grid lg:grid-cols-2 gap-5">
            {leagueData!.map(({ title, tableAllData }, i: number) => (
              <TableSchedule
                key={i}
                i={i}
                title={title}
                data={tableAllData}
                mode="league"
              />
            ))}
          </div>
        </ContainerOne>
      ) : (
        <ContainerOne title="Calendario" className="mx-2 md:w-3/4 md:mx-auto">
          <TableSchedule data={teamData} />
        </ContainerOne>
      )}
    </section>
  );
};
