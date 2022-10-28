import React from "react";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  width: "100%",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const index = () => {
  return (
    <Box>
      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content} style={{display: "flex", flexDirection:"column", gap: '0.5 rem'}}>
          Reports Here
        </Box>
      </Box>
    </Box>
  );
};

export default index;
