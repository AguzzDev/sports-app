import "../styles/globals.css";
import "../styles/scroll.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";
import { QueryProvider } from "../context/QueryContext";

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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryProvider>
    </ApolloProvider>
  );
}

export default MyApp;
