import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import styles from "../styles/Tabs.module.css";
import { useRouter } from "next/router";

const Tabs = ({ href }) => {
  const router = useRouter();
  const  id  = router.query;
  console.log(id);

  // const style = {
  //   color: router.asPath === href ? "red" : "blue",
  // };

  const getRouter = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Box className={styles.tabs}>
      {/* <Box style={style}> */}
        <Link href="/patients">
          PATIENTS
        </Link>
      {/* </Box> */}
{/* 
      <Box style={style}> */}
        <Link href="/records">RECORDS</Link>
      {/* </Box> */}

      {/* <Box style={style}> */}
        <Link href="/medicines">MEDICINE</Link>
      {/* </Box> */}

      {/* <Box style={style}> */}
        <Link href="/services">SERVICES</Link>
      {/* </Box> */}

      {/* <Box style={style}> */}
        <Link href="/appointments">SET APPOINTMENTS</Link>
      {/* </Box> */}
    </Box>
  );
};

export default Tabs;
