import React from "react";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";

const index = () => {
  return (
    <Box>
      <Navbar />
      <Box className={contentStyles.content}>
        <Tabs />
        PATIENTS
      </Box>
    </Box>
  );
};

export default index;
