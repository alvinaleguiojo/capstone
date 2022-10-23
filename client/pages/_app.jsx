import React, { useState, useEffect } from "react";
import "../styles/globals.css";
import NextProgress from "next-progress";
import Layout from "../component/Layout";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import "react-calendar/dist/Calendar.css";
import userApiReducer from "../features/Users";
import medicinesRequestReducer from "../features/Medicines";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

const store = configureStore({
  reducer: {
    users: userApiReducer,
    medicines: medicinesRequestReducer,
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
        .get("http://localhost:3001", { withCredentials: true })
        .then((response) => {
          console.log(response);
          return setAuthenticated(true);
        })
        .catch((error) => {
          console.log(error.message);
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
