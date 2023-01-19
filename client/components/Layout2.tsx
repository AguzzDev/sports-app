import Head from "next/head"
import { ReactNode } from "react"

export const Layout2 = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) => {
  return (
    <>
      <Head>
        <title>{title} | Sports App</title>
      </Head>

      <>{children}</>
    </>
  )
}
