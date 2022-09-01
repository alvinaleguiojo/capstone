import React from "react";
import Navbar from "../../component/Navbar";
import styles from "../../styles/Dashboard.module.css";
import Box from "@mui/material/Box";

const index = () => {
  return (
    <>
      <Navbar />
      <Box className={styles.dashboard}>test</Box>
    </>
  );
};

export default index;
