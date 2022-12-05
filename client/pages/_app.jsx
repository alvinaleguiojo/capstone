import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import "antd/dist/antd.css";
import NextProgress from "next-progress";
import Layout from "../component/Layout";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import "react-calendar/dist/Calendar.css";
import userApiReducer from "../features/Users";
import medicinesRequestReducer from "../features/Medicines";
import termsReducer from "../features/TermsCondition";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

import { registerLicense } from "@syncfusion/ej2-base";

// Registering Syncfusion license key
registerLicense(process.env.SYNCFUSION_KEY);

const store = configureStore({
  reducer: {
    user: userApiReducer,
    medicines: medicinesRequestReducer,
    terms: termsReducer,
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  // Hide splash screen when we are in server side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.style.display = "none";
    }

    // console.log(useAuth);
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${process.env.BaseURI}`, { withCredentials: true })
        .then((response) => {
          return setAuthenticated(true);
        })
        .catch((error) => {
          return setAuthenticated(false);
          // router.push("/forbidden");
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <Layout>
      <Provider store={store}>
        <CookiesProvider>
          {authenticated && <Navbar />}

          <NextProgress
            color="red"
            delay={300}
            height="5px"
            options={{ showSpinner: false }}
          />

          <Component {...pageProps} />
        </CookiesProvider>
      </Provider>
    </Layout>
  );
}

export default MyApp;
