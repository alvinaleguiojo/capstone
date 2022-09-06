import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Box from "@mui/material/Box";
import Image from "next/image";
import UserIcon from "../assets/image/User.svg";
import ArrowDown from "../assets/image/arrow-down.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Today from "../assets/image/Today.svg";
import CustomizedSwitches from "./CustomizedSwitches";

const Navbar = () => {
  return (
    <Box className={styles.navbar}>
      <Box className={styles.logo}></Box>
      <Box className={styles.navbar__right}>
        <Box className={styles.user}>
          <Image src={UserIcon} alt="user avatar" heigh={40} width={40} />
          <Box className={styles.user__name}>
            <Typography variant="h5" component="h5" color="#b82623">
              User
            </Typography>
            <Typography variant="caption" component="h5" color="#b82623">
              Barangay Health Worker
            </Typography>
          </Box>

          <Button className={styles.btn__dropdown}>
            <Image src={ArrowDown} alt="drop down" heigh={15} width={15} />
          </Button>
        </Box>
        <Box className={styles.line}></Box>

        <Box className={styles.date}>
          <Image src={Today} alt="drop down" heigh={40} width={40} />
          <Box className={styles.date__display}>
            <Typography variant="h5" component="h5" color="#b82623">
              Today
            </Typography>

            <Typography variant="caption" component="h5" color="#b82623">
              MM - DD - YYYY
            </Typography>
          </Box>

          {/* <CustomizedSwitches /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
