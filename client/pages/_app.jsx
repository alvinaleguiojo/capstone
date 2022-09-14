import React, { useEffect } from "react";
import "../styles/globals.css";
// import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import NextProgress from "next-progress";
import Layout from "../component/Layout";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import userApiReducer from "../features/Users";

const store = configureStore({
  reducer: {
    users: userApiReducer,
  },
});

function MyApp({ Component, pageProps }) {
  // Hide splash screen shen we are server side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.style.display = "none";
    }
  }, []);

  return (
    <Layout>
      <Provider store={store}>
        <NextProgress
          color="red"
          delay={300}
          height="5px"
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;
