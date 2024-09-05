import { ChildrenType } from "interface";
import Head from "next/head";

export const Layout = ({
  children,
  title,
}: {
  children: ChildrenType;
  title: string | undefined;
}) => {
  return (
    <>
      <Head>
        <title>{title} | Sports App</title>
      </Head>

      <>{children}</>
    </>
  );
};
