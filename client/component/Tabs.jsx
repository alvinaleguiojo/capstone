import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Link from "next/link";
import styles from "../styles/Tabs.module.css";
import { useRouter } from "next/router";

const Tabs = () => {
  const router = useRouter();
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  return (
    <Box className={styles.tabs}>
      <Box
        className={
          router.route == "/dashboard"
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
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
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/patients">PATIENTS</Link>
      </Box>

      {/* <Box
        className={
          router.route == "/records"
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/records">RECORDS</Link>
      </Box> */}

      <Box
        className={
          router.route == "/medicines" || router.route == "/medicines/released" || router.route == "/medicines/register"
            ? theme
              ? styles.active__Dark
              : styles.active
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
