import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Box from "@mui/material/Box";
import Image from "next/image";
import UserIcon from "../assets/image/User.svg";
import ArrowDown from "../assets/image/arrow-down.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    <Box className={styles.navbar}>
      <Box className={styles.logo}></Box>
      <Box className={styles.navbar__right}>
        <Image src={UserIcon} alt="user avatar" />
        <Box className={styles.user}>
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
      </Box>
    </Box>
  );
};

export default Navbar;
