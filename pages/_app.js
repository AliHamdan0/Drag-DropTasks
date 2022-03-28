import "../styles/globals.css";
import Head from "next/head";
import { resetServerContext } from "react-beautiful-dnd";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  resetServerContext();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700&family=El+Messiri:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
