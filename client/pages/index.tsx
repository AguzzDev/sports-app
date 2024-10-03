import type { NextPage } from "next";
import { Layout } from "components/Layout/Layout";
import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { sortStatusDict, statusMatchesDict } from "utils/dict";
import {
  ListMatchesProps,
  ListStatusMatchesProps,
  MatchInterface,
  StatusKeysType,
} from "interface";
import MatchDetails from "components/Match/MatchDetails";
import { ContainerOne } from "components/UI/ContainerOne";
import { IconSM } from "components/Icon/Icon";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { GET_MATCHES_SUB } from "graphql/subscriptions";
import { GET_MATCHES } from "graphql/querys";
import { Footer } from "components/Footer/Footer";

const ListStatusMatches = ({
  status,
  matches,
  show,
  handleClick,
}: ListStatusMatchesProps) => {
  const filteredGames = matches.filter((game) => game.status === status);
  const leaguesForStatus = Array.from(
    new Set(filteredGames.map((game) => game.league))
  ) as string[];

  return (
    <ContainerOne className="mb-5 md:mb-10">
      <h2 className="text-center">
        {statusMatchesDict[status as StatusKeysType]}
      </h2>

      {leaguesForStatus.map((league) => {
        const gamesInLeague = filteredGames.filter(
          (game) => game.league === league
        );

        return (
          <section key={league} className="mt-2">
            <h3 className="mb-3 py-1 text-center">{league}</h3>
            <ListMatches
              matches={gamesInLeague}
              show={show}
              handleClick={handleClick}
            />
          </section>
        );
      })}
    </ContainerOne>
  );
};

const ListMatches = ({ matches, show, handleClick }: ListMatchesProps) => (
  <section className="flex flex-col space-y-2">
    {matches.map((game) => (
      <div
        key={game.eventId}
        className={`${
          game.status === "live" ? "bg-gray2" : ""
        } p-2 md:p-5 rounded-md`}
      >
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="relative logoSize">
              <Image src={game.homeTeamImg} layout="fill" alt="team-image" />
            </div>
            <h5>{game.homeTeam}</h5>
          </div>

          <div className="flex flex-col space-y-2 items-center justify-center">
            <h4>{game.result}</h4>
            <p className="text-center">{game.info}</p>
            {game.status !== "next" ? (
              <button
                className="bg-border2 hover:opacity-80 hover:duration-100 p-2 rounded-md flex items-center md:space-x-3"
                onClick={() => handleClick(game.eventId)}
              >
                <div className="hidden md:block">
                  <IconSM Icon={ChartBarIcon} />
                </div>
                <p>
                  {show === game.eventId
                    ? "Dejar de ver partido"
                    : "Ver partido"}
                </p>
              </button>
            ) : null}
          </div>

          <div className="flex flex-col items-center">
            <div className="relative logoSize">
              <Image src={game.awayTeamImg} layout="fill" alt="team-image" />
            </div>
            <h5>{game.awayTeam}</h5>
          </div>
        </div>

        <AnimatePresence>
          {show === game.eventId ? (
            <motion.div
              initial={{ height: "0px" }}
              animate={{ height: "auto" }}
              exit={{ height: "0px" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className=""
            >
              <MatchDetails
                data={{
                  homeTeam: {
                    ...game.lineup.homeTeam,
                    name: game.homeTeam,
                    image: game.homeTeamImg,
                  },
                  awayTeam: {
                    ...game.lineup.awayTeam,
                    name: game.awayTeam,
                    image: game.awayTeamImg,
                  },
                  statistics: game.statistics,
                }}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    ))}
  </section>
);

const Home: NextPage = () => {
  const [matches, setMatches] = useState<MatchInterface[]>([]);
  const [status, setStatus] = useState<StatusKeysType[]>([]);

  const [show, setShow] = useState<string | null>(null);

  const handleClick = async (id: string) => {
    setShow((prevId) => (prevId === id ? null : id));
  };

  const { data, loading } = useQuery(GET_MATCHES);
  const { data: subData, loading: subLoading } =
    useSubscription(GET_MATCHES_SUB);

  useEffect(() => {
    if (loading) return;

    const matches = subData?.getMatches || data?.getMatches;

    const StatusKeysType = Array.from(
      new Set(matches.map(({ status }: { status: string }) => status))
    ) as StatusKeysType[];

    const sorted = StatusKeysType.sort(
      (a, b) => sortStatusDict[a] - sortStatusDict[b]
    );

    setStatus(sorted);
    setMatches(matches);
  }, [loading, subLoading, data, subData]);

  return (
    <Layout title="Inicio" menuTitle="Sports App">
      {matches.length > 0 ? (
        <>
          {status.map((status) => (
            <ListStatusMatches
              key={status}
              status={status}
              matches={matches}
              show={show}
              handleClick={handleClick}
            />
          ))}
        </>
      ) : (
        <section className="grid grid-cols-2 gap-5">
          <div className="w-full bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
          <div className="w-full bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
          <div className="w-full col-span-2 bg-opacity-50 rounded-md h-60 lg:h-64 bg-gray2"></div>
        </section>
      )}

      <Footer />
    </Layout>
  );
};

export default Home;
