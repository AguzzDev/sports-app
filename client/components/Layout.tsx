import { childrenType } from "../interface";
import { Sidemenu } from "./Menu/Sidemenu";

export const Layout = ({ children }: childrenType) => {
  return (
    <main className="flex flex-col w-full xl:flex-row">
      <section className="w-full xl:w-[10vw] h-[10vh]">
        <Sidemenu />
      </section>
      <section className="w-full xl:w-[90vw]">{children}</section>
    </main>
  );
};
