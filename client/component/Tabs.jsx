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
          router.route.includes("patients")
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/patients">Patients</Link>
      </Box>

      <Box
        className={
          router.route.includes("medicines")
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/medicines">Medicines</Link>
      </Box>


      <Box
        className={
          router.route.includes("appointments")
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/appointments">Appointments</Link>
      </Box>

      <Box
        className={
          router.route.includes("reports")
            ? theme
              ? styles.active__Dark
              : styles.active
            : styles.tab
        }
      >
        <Box className={styles.vertical__line}></Box>
        <Link href="/reports">Reports</Link>
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
