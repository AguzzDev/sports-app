import { useState } from "react";
import { motion } from "framer-motion";
import { Tab1 } from "./Tabs/Tab1/Tab1";
import { Tab2 } from "./Tabs/Tab2/Tab2";
import { MatchDetailsProps } from "interface";

const NoInfo = () => <h4>No hay informacion para este partido</h4>;

const MatchDetails: React.FC<{ data: MatchDetailsProps }> = ({ data }) => {
  const [view, setView] = useState(0);

  const { homeTeam, awayTeam, statistics } = data;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0, delay: 0 } }}
      transition={{
        duration: 0.6,
        delay: 0.6,
      }}
      className="min-h-[40rem]"
    >
      <section className="relative w-max my-5 mx-auto">
        <div className="flex space-x-5">
          {["Formacion", "Estadisticas"].map((text, i) => (
            <button key={text} className="relative" onClick={() => setView(i)}>
              <h4>{text}</h4>

              {view === i ? (
                <div
                  className={`absolute -bottom-2 ${
                    i == 1 ? "right-0" : ""
                  } w-2/4 h-1 rounded-md bg-border1`}
                ></div>
              ) : null}
            </button>
          ))}
        </div>
      </section>

      <>
        {view === 0 ? (
          <section className="flex flex-col xl:flex-row xl:space-x-5">
            {!homeTeam.lineup ? (
              <NoInfo />
            ) : (
              <Tab1 data={{ homeTeam, awayTeam }} />
            )}
          </section>
        ) : (
          <section className="flex flex-col space-y-3 flex-1">
            {statistics.length === 0 ? <NoInfo /> : <Tab2 data={statistics} />}
          </section>
        )}
      </>
    </motion.section>
  );
};

export default MatchDetails;
