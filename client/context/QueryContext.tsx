import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenType } from "interface";

interface QueryContextProps {
  scrollState: any;
  league: string | null;
  saveLeague: Function;
}

export const QueryContext = createContext<QueryContextProps>({
  saveLeague: () => {},
  league: "",
  scrollState: "",
});

export const QueryProvider = ({ children }: { children: ChildrenType }) => {
  let scrollState = "";
  const [league, setLeague] = useState<string | null>(null);

  const saveLeague = (name: string) => {
    localStorage.setItem("league", name);
    setLeague(localStorage.getItem("league"));
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      setLeague(localStorage.getItem("league"));
    }
  }, []);

  return (
    <QueryContext.Provider value={{ league, saveLeague, scrollState }}>
      {children}
    </QueryContext.Provider>
  );
};

export const useLeague = () => {
  return useContext(QueryContext);
};
