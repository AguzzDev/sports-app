import { ReactNode } from "react";

export type ChildrenType = ReactNode | JSX.Element;

//interfaces
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
  title: string;
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
