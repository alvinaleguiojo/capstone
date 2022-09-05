import React from "react";
import Image from "next/image";
import ErrorBanner from "../../assets/image/errorBanner.svg";
import ErrorIcon from "../../assets/image/404.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "../../styles/Error.module.css";

const index = () => {
  return (
    <Box className={styles.error}>
      <Box className={styles.left__container}>
        <Image src={ErrorBanner} alt="erro" />
      </Box>
      <Box className={styles.right__container}>
        <Image src={ErrorIcon} alt="erro" />
        <Typography variant="h4" component="h4" color="black">
          LOOKS LIKE YOU&apos;RE LOST
        </Typography>
        <Typography variant="body1" component="h4" color="black">
          Something went wrong. Please try again
        </Typography>
        <Box className={styles.loginBtn}>
          <Link href="/patients">Go Back</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default index;
