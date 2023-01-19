import { createContext, Dispatch, SetStateAction, useState } from "react"
import { childrenType } from "../interface"

interface QueryContextProps {
  league: string
  scrollState: any
  setLeague: Dispatch<SetStateAction<string>>
}
export const QueryContext = createContext<QueryContextProps>({
  league: "",
  setLeague: () => {},
  scrollState: "",
})

export const QueryProvider = ({ children }: childrenType) => {
  let scrollState = ""
  const [league, setLeague] = useState("")

  return (
    <QueryContext.Provider
      value={{ league, scrollState, setLeague }}
    >
      {children}
    </QueryContext.Provider>
  )
}
