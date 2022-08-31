import "../styles/globals.css";
import NextProgress from "next-progress";
import Layout from "../component/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <NextProgress delay={300} height="5px" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
