import { ReactNode } from "react"

export interface childrenType {
  children: ReactNode | JSX.Element
}

export interface InfoTeamProps {
  balance: string
  img: string
  league: string
  marketValue: string
  stadium: string
  title: string
}
export interface TitlesTeamProps {
  map(arg0: ({ title, img, years }: TitlesTeamSingle, i: number) => JSX.Element): ReactNode
}
interface TitlesTeamSingle {
  img: string
  teamAndYear: string | null
  title: string
  years: string
}

export interface TopMenuProps {
  title: string
  goBack?: string
}
export interface IconProps {
  Icon: any
  color?: string
}
export interface LeagueMenuProps {
  league: string | string[] | undefined
  data: imgProps[]
}
interface imgProps {
  title: string
  img: string
}
export interface PlayerProps {
  img: string
  league: string
  marketValue: string
  name: string
  position: string
  team: string
  teamImg: string
}
