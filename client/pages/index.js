import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import banner from "../assets/image/Rectangle 3.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box className={styles.container}>
      <Box className={styles.rightContainer}>
        <Typography variant="h3" component="h1">
          Online <br />
          Barangay Health Center
        </Typography>

        <Box>
          <Typography color="#B82623">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Box>
        <Button variant="contained" className={styles.getStartedBtn}>
          Get Started
        </Button>
      </Box>

      <Image src={banner} width={450} height={400} alt="banner" />
    </Box>
  );
}
