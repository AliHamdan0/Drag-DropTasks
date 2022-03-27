import "../styles/globals.css";
import Head from "next/head";
import { resetServerContext } from "react-beautiful-dnd";

function MyApp({ Component, pageProps }) {
  resetServerContext();
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
export default MyApp;
