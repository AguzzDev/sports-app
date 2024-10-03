import Image from "next/image";
import { Layout } from "components/Layout/Layout";
import { useGroups } from "context/GroupsReducer";
import { allNations } from "data/allNations";
import { dictionaryGroups } from "utils/dict";

const WorldCupPrediction = () => {
  const { dispatch, state } = useGroups();

  const handleClick = async (name: string, img: string, codeC: number) => {
    const top1 =
      Object.keys(state).includes(`${dictionaryGroups[codeC]}1`) &&
      state[`${dictionaryGroups[codeC]}1`].name === name;
    const top2 =
      Object.keys(state).includes(`${dictionaryGroups[codeC]}2`) &&
      state[`${dictionaryGroups[codeC]}2`].name === name;

    if (top1) {
      dispatch({
        type: "REMOVE",
        payload: { code: `${dictionaryGroups[codeC]}1` },
      });
      dispatch({
        type: "ADD",
        payload: {
          name,
          img,
          code: top1
            ? `${dictionaryGroups[codeC]}2`
            : `${dictionaryGroups[codeC]}1`,
        },
      });
    } else if (top2) {
      dispatch({
        type: "REMOVE",
        payload: { code: `${dictionaryGroups[codeC]}2` },
      });

      dispatch({
        type: "ADD",
        payload: {
          name,
          img,
          code: top2
            ? `${dictionaryGroups[codeC]}1`
            : `${dictionaryGroups[codeC]}2`,
        },
      });
    } else {
      const includes =
        Object.keys(state).includes(`${dictionaryGroups[codeC]}1`) &&
        state[`${dictionaryGroups[codeC]}1`].name;

      dispatch({
        type: "ADD",
        payload: {
          name,
          img,
          code: includes
            ? `${dictionaryGroups[codeC]}2`
            : `${dictionaryGroups[codeC]}1`,
        },
      });
    }
  };
  const GroupFases = () => {
    return (
      <>
        <div className="relative col-start-2 row-start-3">
          <h3 className="absolute bottom-3 font-bold">Cuartos</h3>
        </div>
        <div className="relative col-start-7 row-start-3">
          <h3 className="absolute bottom-3 right-0 font-bold">Cuartos</h3>
        </div>
        <div className="relative col-start-3 row-start-9">
          <h3 className="absolute bottom-3 font-bold">Semis</h3>
        </div>
        <div className="relative col-start-6 row-start-9">
          <h3 className="absolute bottom-3 right-0 font-bold">Semis</h3>
        </div>
        <div className="relative col-start-4 col-span-2 row-start-7">
          <h3 className="absolute bottom-3 font-bold">Campeon Mundial 2022</h3>
        </div>
      </>
    );
  };
  const GroupElement = ({
    props,
    value,
    code,
    title,
    children,
  }: {
    value?: string;
    title: string;
    props: string;
    code?: string;
    children?: JSX.Element;
  }) => {
    return (
      <div
        className={`${props} flex overflow-hidden border-2 border-gray2 shadow-xl rounded-tr-2xl rounded-bl-2xl h-[3.5vh]`}
      >
        {children ? (
          children
        ) : (
          <>
            <button
              onClick={() =>
                dispatch({
                  type: "ADD",
                  payload: {
                    name: state[value!]?.name,
                    img: state[value!]?.img,
                    code,
                  },
                })
              }
              className="flex items-center w-full"
            >
              {state[value!]?.img && (
                <Image
                  alt="flag"
                  src={state[value!]?.img}
                  loading="lazy"
                  height={50}
                  width={50}
                  objectFit="contain"
                  className="transform -translate-x-1"
                />
              )}
              <h4 className="font-bold w-full truncate">
                {state[value!]?.name || title}
              </h4>
            </button>
          </>
        )}
      </div>
    );
  };
  const GroupElementLaptop = ({ code, value }: any) => {
    return (
      <div className="my-2 flex overflow-hidden border-2 border-gray2 shadow-xl rounded-tr-2xl rounded-bl-2xl h-[3.5vh] w-full">
        {value.map((v: string, i: number) => (
          <button
            key={i}
            onClick={() =>
              dispatch({
                type: "ADD",
                payload: {
                  name: state[v!]?.name,
                  img: state[v!]?.img,
                  code,
                },
              })
            }
            className={`flex ${
              i === 1 && "flex-row-reverse"
            } items-center w-full`}
          >
            {state[v!]?.img && (
              <Image
                alt="flag"
                src={state[v!]?.img}
                loading="lazy"
                height={50}
                width={50}
                objectFit="contain"
                className={`transform ${
                  i === 0 ? "-translate-x-1" : "translate-x-1"
                }`}
              />
            )}
            <h4 className="font-bold w-full truncate">
              {state[v!]?.name || v}
            </h4>
          </button>
        ))}
      </div>
    );
  };
  return (
    <Layout title="World Cup Prediction" menuTitle="World Cup Prediction">
      <section>
        <h1 className="text-xl pl-5 py-2 bg-stone-500 ">Grupos</h1>

        <div className="mx-10 my-5 grid sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-10">
          {allNations?.map((nation, i) => (
            <div className="flex flex-col" key={i}>
              <h1 className="text-center text-lg">{nation.group}</h1>
              {nation.nations.map(({ name, img }) => (
                <button
                  key={name}
                  onClick={() => handleClick(name, img, i + 1)}
                  className="flex justify-between items-center overflow-hidden border-2 border-gray2 shadow-xl rounded-tr-3xl rounded-bl-3xl my-1 h-[5vh]"
                >
                  <div className="flex items-center">
                    <Image
                      alt="flag"
                      src={img}
                      width={60}
                      height={50}
                      objectFit="contain"
                      className="-translate-x-3"
                    />
                    <h3 className="ml-3">{name}</h3>
                  </div>

                  <div>
                    {state[`${dictionaryGroups[i + 1]}1`]?.name == name ? (
                      <p className="bg-green-800 font-bold px-4 h-[5vh] flex items-center">
                        1
                      </p>
                    ) : state[`${dictionaryGroups[i + 1]}2`]?.name == name ? (
                      <p className="bg-green-800 font-bold px-4 h-[5vh] flex items-center">
                        2
                      </p>
                    ) : null}
                  </div>
                </button>
              ))}

              {state[`${dictionaryGroups[i + 1]}1`] && (
                <button
                  className="bg-gray2 rounded-tr-3xl rounded-bl-3xl text-gray-400 py-1 font-semibold"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE",
                      payload: { code: `${dictionaryGroups[i + 1]}1` },
                    });
                    dispatch({
                      type: "REMOVE",
                      payload: { code: `${dictionaryGroups[i + 1]}2` },
                    });
                  }}
                >
                  Limpiar
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="my-10">
        <h1 className="text-xl pl-5 py-2 bg-stone-500 ">Eliminatorias</h1>

        <div className="mx-5 my-5 hidden xl:grid grid-cols-8 grid-rows-21 gap-x-5 mt-5">
          <GroupElement
            title="A1"
            code="O1"
            props="col-start-1 row-start-1"
            value="A1"
          />
          <GroupElement
            title="B2"
            code="O1"
            props="col-start-1 row-start-3"
            value="B2"
          />
          <GroupElement
            title="C1"
            code="O2"
            props="col-start-1 row-start-7"
            value="C1"
          />
          <GroupElement
            title="D2"
            code="O2"
            props="col-start-1 row-start-9"
            value="D2"
          />
          <GroupElement
            title="E1"
            code="O3"
            props="col-start-1 row-start-13"
            value="E1"
          />
          <GroupElement
            title="F2"
            code="O3"
            props="col-start-1 row-start-15"
            value="F2"
          />
          <GroupElement
            title="G1"
            code="O4"
            props="col-start-1 row-start-19"
            value="G1"
          />
          <GroupElement
            title="H2"
            code="O4"
            props="col-start-1 row-start-21"
            value="H2"
          />

          <GroupElement
            title="A2"
            code="O5"
            props="col-start-8 row-start-1"
            value="A2"
          />
          <GroupElement
            title="B1"
            code="O5"
            props="col-start-8 row-start-3"
            value="B1"
          />
          <GroupElement
            title="C2"
            code="O6"
            props="col-start-8 row-start-7"
            value="C2"
          />
          <GroupElement
            title="D1"
            code="O6"
            props="col-start-8 row-start-9"
            value="D1"
          />
          <GroupElement
            title="E2"
            code="O7"
            props="col-start-8 row-start-13"
            value="E2"
          />
          <GroupElement
            title="F1"
            code="O7"
            props="col-start-8 row-start-15"
            value="F1"
          />
          <GroupElement
            title="G2"
            code="O8"
            props="col-start-8 row-start-19"
            value="G2"
          />
          <GroupElement
            title="H1"
            code="O8"
            props="col-start-8 row-start-21"
            value="H1"
          />

          <GroupElement
            title="O1"
            code="Q1"
            props="col-start-2 row-start-4"
            value="O1"
          />
          <GroupElement
            title="O2"
            code="Q1"
            props="col-start-2 row-start-6"
            value="O2"
          />
          <GroupElement
            title="O3"
            code="Q2"
            props="col-start-2 row-start-16"
            value="O3"
          />
          <GroupElement
            title="O4"
            code="Q2"
            props="col-start-2 row-start-18"
            value="O4"
          />

          <GroupElement
            title="O5"
            code="Q3"
            props="col-start-7 row-start-4"
            value="O5"
          />
          <GroupElement
            title="O6"
            code="Q3"
            props="col-start-7 row-start-6"
            value="O6"
          />
          <GroupElement
            title="O7"
            code="Q4"
            props="col-start-7 row-start-16"
            value="O7"
          />
          <GroupElement
            title="O8"
            code="Q4"
            props="col-start-7 row-start-18"
            value="O8"
          />

          <GroupElement
            title="Q1"
            code="S1"
            props="col-start-3 row-start-10"
            value="Q1"
          />
          <GroupElement
            title="Q2"
            code="S1"
            props="col-start-3 row-start-12"
            value="Q2"
          />

          <GroupElement
            title="Q3"
            code="S2"
            props="col-start-6 row-start-10"
            value="Q3"
          />
          <GroupElement
            title="Q4"
            code="S2"
            props="col-start-6 row-start-12"
            value="Q4"
          />

          <GroupElement
            title="Final"
            props="flex justify-between col-start-4 row-start-11 col-span-2"
          >
            <>
              <button
                className="flex items-center w-full"
                onClick={() =>
                  dispatch({
                    type: "ADD",
                    payload: {
                      name: state["S1"].name,
                      img: state["S1"]?.img,
                      code: "W",
                    },
                  })
                }
              >
                {state["S1"]?.img && (
                  <Image
                    alt="flag"
                    src={state["S1"]?.img}
                    loading="lazy"
                    height={40}
                    width={40}
                    objectFit="contain"
                    className="transform -translate-x-1"
                  />
                )}
                <h4 className="font-bold px-4">
                  {state["S1"]?.name || "Final 1"}
                </h4>
              </button>
              <button
                className="flex items-center justify-end w-full"
                onClick={() =>
                  dispatch({
                    type: "ADD",
                    payload: {
                      name: state["S2"].name,
                      img: state["S2"].img,
                      code: "W",
                    },
                  })
                }
              >
                <h4 className="font-bold px-4">
                  {state["S2"]?.name || "Final 2"}
                </h4>
                {state["S2"]?.img && (
                  <Image
                    alt="flag"
                    src={state["S2"]?.img}
                    loading="lazy"
                    height={40}
                    width={40}
                    objectFit="contain"
                    className="transform translate-x-1"
                  />
                )}
              </button>
            </>
          </GroupElement>

          <GroupElement
            title="Campeon"
            props="col-start-4 col-span-2 row-start-8"
            value="W"
          />
          <GroupFases />
        </div>

        <div className="flex flex-col xl:hidden mx-5 my-3 space-y-2">
          <div>
            <h3>Octavos</h3>
            <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0 sm:space-x-5">
              <div className="w-full">
                <GroupElementLaptop code="O1" value={["A1", "B2"]} />
                <GroupElementLaptop code="O2" value={["C1", "D2"]} />
                <GroupElementLaptop code="O3" value={["E1", "F2"]} />
                <GroupElementLaptop code="O4" value={["G1", "H2"]} />
              </div>
              <div className="w-full">
                <GroupElementLaptop code="O5" value={["A2", "B1"]} />
                <GroupElementLaptop code="O6" value={["C2", "D1"]} />
                <GroupElementLaptop code="O7" value={["E2", "F1"]} />
                <GroupElementLaptop code="O8" value={["G2", "H1"]} />
              </div>
            </div>
          </div>
          <div>
            <h3>Cuartos</h3>
            <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0 sm:space-x-5">
              <div className="w-full">
                <GroupElementLaptop code="Q1" value={["O1", "O2"]} />
                <GroupElementLaptop code="Q2" value={["O3", "O4"]} />
              </div>
              <div className="w-full">
                <GroupElementLaptop code="Q3" value={["O5", "O6"]} />
                <GroupElementLaptop code="Q4" value={["O7", "O8"]} />
              </div>
            </div>
          </div>
          <div>
            <h3>Semis</h3>
            <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0 sm:space-x-5">
              <div className="w-full">
                <GroupElementLaptop code="S1" value={["Q1", "Q2"]} />
              </div>
              <div className="w-full">
                <GroupElementLaptop code="S2" value={["Q3", "Q4"]} />
              </div>
            </div>
          </div>
          <div>
            <h3>Final</h3>
            <div>
              <GroupElementLaptop code="W" value={["S1", "S2"]} />
            </div>
          </div>
          <div>
            <h3>Campeon Mundial 2022</h3>
            <div>
              <GroupElementLaptop value={["W"]} />
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-5">
          <button
            className="bg-gray2 rounded-tr-3xl rounded-bl-3xl text-gray-400 py-1 px-5 font-semibold"
            onClick={() => {
              dispatch({
                type: "REMOVE_ALL",
              });

              setTimeout(() => {
                window.scroll({ top: 0, behavior: "smooth" });
              }, 500);
            }}
          >
            Reiniciar
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default WorldCupPrediction;
