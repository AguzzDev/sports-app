import "styles/globals.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { QueryProvider } from "context/QueryContext";
import { Sidemenu } from "components/Menu/Sidemenu";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5000/graphql"
        : "https://api.sports-app.agustin-ribotta.xyz/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <QueryProvider>
        <main className="flex flex-col w-full xl:flex-row">
          <Sidemenu />

          <section className="w-full xl:w-[90vw]">
            <Component {...pageProps} />
          </section>
        </main>
      </QueryProvider>
    </ApolloProvider>
  );
}

export default MyApp;
