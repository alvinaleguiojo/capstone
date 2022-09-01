import { Box } from "@mui/material";
import React from "react";
import styles from "../styles/Footer.module.css";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Doctor from "../assets/image/Doctor Male.png";
import Location from "../assets/image/Location.png";
import Services from "../assets/image/Services.png";
import Ambulance from "../assets/image/Ambulance.png";

const Footer = () => {
  return (
    <Box className={styles.footer}>
      <Typography variant="h4" fontWeight={600} component="h4" marginLeft={10}  color="white">
        Explore by
        <br />
        Category
      </Typography>
      <Box className={styles.category}>
        <Box className={styles.categoryBox}>
          <Image src={Doctor} width={40} height={40} alt="banner" />
          <Typography variant="body2" component="h1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Typography>
        </Box>
        <Box className={styles.categoryBox}>
          <Image src={Location} width={40} height={40} alt="banner" objectFit="contained" />
          <Typography variant="body2" component="h1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Typography>
        </Box>
        <Box className={styles.categoryBox}>
          <Image src={Services} width={40} height={40} alt="banner" />
          <Typography variant="body2" component="h1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Typography>
        </Box>
        <Box className={styles.categoryBox}>
          <Image src={Ambulance} width={40} height={40} alt="banner" />
          <Typography variant="body2" component="h1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
