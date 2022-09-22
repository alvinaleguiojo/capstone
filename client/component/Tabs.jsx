import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import styles from "../styles/Tabs.module.css";
import { useRouter } from "next/router";

const Tabs = () => {
  const router = useRouter();

  return (
    <Box className={styles.tabs}>
      <Box
        className={router.route == "/dashboard" ? styles.active : styles.tab}
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/dashboard">Dashboard</Link>
      </Box>

      <Box
        className={
          router.route == "/patients" ||
          router.route == "/patients/[_id]/appointment" ||
          router.route == "/patients/register" ||
          router.route == "/patients/register/history"
            ? styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/patients">PATIENTS</Link>
      </Box>

      <Box className={router.route == "/records" ? styles.active : styles.tab}>
        <Box className={styles.vertical__line}></Box>
        <Link href="/records">RECORDS</Link>
      </Box>

      <Box
        className={
          router.route == "/medicines" || router.route == "/medicines/released"
            ? styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/medicines">MEDICINES</Link>
      </Box>

      {/* <Box
        className={router.route == "/appointments" ? styles.active : styles.tab}
      >
        <Box className={styles.vertical__line_appointment}></Box>
        <Link href="/appointments">SET APPOINTMENTS</Link>
      </Box> */}
    </Box>
  );
};

export default Tabs;
