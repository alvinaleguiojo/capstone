import React from "react";
import Image from "next/image";
import ForbiddenBanner from "../../assets/image/forbidden.svg";
import ForbiddenIcon from "../../assets/image/403.svg";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import styles from "../../styles/Forbidden.module.css";

const index = () => {
  return (
    <Box className={styles.forbidden}>
        <Image src={ForbiddenIcon} alt="forbidden"/>
        <Typography variant="h4" component="h4" color="black">
          ACCESS DENIED/FORBIDDEN
        </Typography>

        <Typography variant="body1" component="h4" color="black">
          The page you&apos;re trying to access has restricted access.
        </Typography>

        <Image src={ForbiddenBanner} alt="forbidden" height={400} width={400}/>
    </Box>
  );
};

export default index;
