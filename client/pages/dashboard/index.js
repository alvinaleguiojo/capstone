import React from "react";
import Navbar from "../../component/Navbar";
import styles from "../../styles/Dashboard.module.css";
import contentStyles from "../../styles/Content.module.css";
import Box from "@mui/material/Box";
import Tabs from "../../component/Tabs";
import Content from "../../component/Content";

const index = () => {
  return (
    <>
      <Box className={styles.dashboard}>
        <Navbar />
        <Box className={contentStyles.content}>
          <Tabs />
          <Content />
        </Box>
      </Box>
    </>
  );
};

export default index;
