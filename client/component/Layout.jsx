import React, { useMemo } from "react";
import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";
import NoInternet from "./NoInternet";

const Layout = ({ children }) => {
  return (
    <div className={styles.Layout}>
      {/* <Navbar /> */}
      <NoInternet />
      {children}
    </div>
  );
};

export default Layout;
