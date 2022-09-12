import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import styles from "../../styles/Dashboard.module.css";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Box from "@mui/material/Box";
import Tabs from "../../component/Tabs";
import useAuth from "../../customhook/Auth";

const index = () => {
  return (
    <>
      {useAuth() && (
        <Box className={styles.dashboard}>
          <Navbar />
          <Box className={contentStyles.content}>
            <Tabs />
            <Box className={reusableStyle.main__content}>Dashboard</Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default index;
