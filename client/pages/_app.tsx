import "styles/globals.css";
import type { AppProps } from "next/app";
import { QueryProvider } from "context/QueryContext";
import client from "graphql/client";
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </ApolloProvider>
  );
}

export default MyApp;
