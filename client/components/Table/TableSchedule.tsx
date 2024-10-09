import Image from "next/image";
import { ScheduleItemProps, TableScheduleProps } from "interface";
import { Table } from "./Table";
import { extractColumn } from "utils/extractColumn";

const Item = ({ text, img }: { text: string; img: string }) => (
  <div className="flex items-center space-x-2">
    <div className="hidden sm:block">
      <Image
        src={img}
        width={15}
        height={20}
        alt="info_img"
        objectFit="contain"
      />
    </div>

    <p className="my-auto mx-3 truncate sm:mr-5">{text}</p>
  </div>
);

export const TableSchedule = ({ title, data, mode, i }: TableScheduleProps) => {
  const isLeagueMode = mode === "league";
  const scheduleData = isLeagueMode ? data : data.schedule;

  const columns = isLeagueMode
    ? [
        extractColumn(scheduleData, "date"),
        extractColumn(scheduleData, "time"),
        scheduleData.map(({ localTeam, localTeamImg }: ScheduleItemProps) => (
          <Item key={`${localTeam}-${i}`} img={localTeamImg} text={localTeam} />
        )),
        extractColumn(scheduleData, "result"),
        scheduleData.map(
          ({ visitantTeam, visitantTeamImg }: ScheduleItemProps) => (
            <Item
              key={`${visitantTeam}-${i}`}
              img={visitantTeamImg}
              text={visitantTeam}
            />
          )
        ),
      ]
    : [
        extractColumn(scheduleData, "game"),
        extractColumn(scheduleData, "date"),
        extractColumn(scheduleData, "time"),
        scheduleData.map(({ locality, rival, rivalImg }: ScheduleItemProps) => (
          <Item
            key={i}
            img={locality === "H" ? data.info.img : rivalImg}
            text={locality === "H" ? data.info.name : rival}
          />
        )),
        extractColumn(scheduleData, "result"),
        scheduleData.map(({ locality, rival, rivalImg }: ScheduleItemProps) => (
          <Item
            key={i}
            img={locality === "H" ? rivalImg : data.info.img}
            text={locality === "H" ? rival : data.info.name}
          />
        )),
      ];

  return (
    <Table
      title={isLeagueMode ? title : ""}
      headers={
        isLeagueMode
          ? ["Fecha", "Horario", "Local", "Resultado", "Visitante"]
          : ["Jornada", "Fecha", "Horario", "Local", "Resultado", "Visitante"]
      }
      dataPerColumn={columns}
    />
  );
};
