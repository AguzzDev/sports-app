import { ReactNode } from "react";
import { statusMatchesDict } from "utils/dict";

export type ChildrenType = ReactNode | JSX.Element;

export type StatusKeysType = keyof typeof statusMatchesDict;

//interfaces
export interface MatchInterface {
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamImg: string;
  awayTeamImg: string;
  result: string;
  league: string;
  status: string;
  info: string;
  lineup: Lineup;
  statistics: Statistics[];
}
interface Statistics {
  text: string;
  homeTeam: InfoStatistics;
  awayTeam: InfoStatistics;
}
interface InfoStatistics {
  quantity: string;
  percentage: string;
}
interface Lineup {
  homeTeam: LineupItem;
  awayTeam: LineupItem;
}
interface LineupItem {
  lineup: string;
  titular: PlayerLineup[];
  substitutes: PlayerLineup[];
}
export interface PlayerLineup {
  name: string;
  image: string;
  number: string;
  pos: string;
}
export interface LeagueInterface {
  name: string;
  img: string;
  numPlayer: string;
  numPlayerForeign: string;
  marketValue: string;
  playerMoreExpensive: string;
  logos: { title: string; img: string }[];
  leagueCode: string;
  topScorers: {
    position: string;
    img: string;
    player: string;
    positionIn: string;
    team: string;
    goals: string;
  }[];
  table: {
    position: string;
    img: string;
    team: string;
    games: string;
    win: string;
    draw: string;
    lose: string;
    differenceGoal: string;
    points: string;
  }[];
  calendar: {
    title: string;
    tableAllData: {
      date: string;
      time: string;
      localTeam: string;
      localTeamImg: string;
      result: string;
      visitantTeamImg: string;
      visitantTeam: string;
    }[];
  }[];
}
export interface PlayerInterface {
  name: string;
  number: string;
  img: string;
  birth: string;
  placeToBirth: string;
  nacionality: string;
  height: string;
  position: string;
  nationalTeam: string;
  matches: string;
  marketValue: string;
  team: string;
  teamImg: string;
  league: string;
  stats: { field: string; value: string }[];
  titles: {
    title: string;
    img: string;
    year: {
      year: string;
      team: string;
      teamImg: string;
    };
  }[];
}
export interface TeamInterface {
  info: {
    name: string;
    img: string;
    league: string;
    stadium: string;
    balance: string;
    marketValue: string;
  };
  titles: { title: string; img: string; years: string }[];
  squad: PlayerInterface[];
  schedule: {
    game: string;
    date: string;
    time: string;
    locality: string;
    rivalImg: string;
    rival: string;
    result: string;
  }[];
}

//props
export interface HeaderLineupProps {
  className: string;
  data: { [key: string]: string };
}
export interface SubstitutesProps {
  [key: string]: LineupItem["substitutes"];
}
export type MatchDetailsPropsWithoutStatistics = Omit<
  MatchDetailsProps,
  "statistics"
>;
export interface LineupProps {
  type: string;
  lineup: string;
  players: PlayerLineup[];
}
export interface PlayerLineupProps {
  type: string;
  data?: PlayerLineup | null;
}
export interface MatchDetailsProps {
  homeTeam: MatchDetailsItemsProps;
  awayTeam: MatchDetailsItemsProps;
  statistics: MatchInterface["statistics"];
}
interface MatchDetailsItemsProps extends LineupItem {
  name: string;
  image: string;
}
export interface ContainerProps {
  children: ReactNode | string | number;
  className?: string;
  title?: string;
}
export type ScheduleItemProps = Partial<TableScheduleProps["data"]>;
export interface FooterItemProps {
  [key: string]: string;
}
export interface ListMatchesProps {
  matches: MatchInterface[];
  show: string | null;
  handleClick: (id: string) => void;
}
export interface ListStatusMatchesProps extends ListMatchesProps {
  status: string;
}
export interface TableProps {
  title?: string;
  headers: string[];
  dataPerColumn: Array<Array<string | number | JSX.Element>>;
  span?: number | undefined;
  colSpan?: number | undefined;
}
export type OverviewProps = LeagueInterface | TeamInterface;
export type ScheduleProps = LeagueInterface["calendar"] | TeamInterface;
export interface TableScheduleProps {
  data: any;
  title?: string;
  mode?: string;
  i?: number;
}
export interface SidemenuDataProps {
  logos: SidebarItemsProps[];
  leagues: { [key: string]: SidebarItemsProps[] };
}
export interface TopMenuProps {
  title?: string;
  goBack?: string;
}
export interface IconProps {
  Icon: any;
  color?: string;
}
export interface SidebarItemsProps {
  name: string;
  img: string;
}
