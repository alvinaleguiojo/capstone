import React, { useState } from "react";
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
import { format } from "date-fns";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

const Navbar = () => {
  const router = useRouter();
  const today = format(new Date(), "MMMM dd, yyyy");

  const handleLogout = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "grey",
      confirmButtonText: "Confirm",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("http://localhost:3001/logout", { withCredentials: true })
          .then((response) => {
            Swal.fire("Success!", "You are now in the Login Page.", "success");
            response && router.push("/login");
          });
      }
    });
  };

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

          <Button className={styles.btn__dropdown} onClick={handleLogout}>
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
              {today}
            </Typography>
          </Box>

          {/* <CustomizedSwitches /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
