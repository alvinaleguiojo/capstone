import Image from "next/image";
import styles from "../styles/Home.module.css";
import banner from "../assets/image/Rectangle 3.png";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Footer from "../component/Footer";
import Button from "@mui/material/Button";
import Meta from "../component/Meta";

export default function Home() {
  return (
    <>
      <Meta title="Capstone Project" />
      <Box className={styles.container}>
        <Box className={styles.container__left}>
          <Typography variant="h3" component="h1">
            Online <br />
            Barangay Health <br />
            Center
          </Typography>
          <Box>
            <Typography color="#B82623">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
          <Box className={styles.getStartedBtn} variant="contained">
            <Link className={styles.getStartedBtn} href="/login">
              Get Started
            </Link>
          </Box> 
        </Box>

        <Box className={styles.banner__image}>
          <Image src={banner} width={450} height={400} alt="banner" />
        </Box>

        <Box className={styles.footer}>
          <Footer />
        </Box>
      </Box>
    </>
  );
}
