import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../styles/CardTemplate.module.css";
import Image from "next/image";
import User from "../assets/image/User.svg";
import Skeleton from "@mui/material/Skeleton";

const CardTemplate = (props) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  return (
    <Box className={theme ? styles.card__dark : styles.card}>
      <Box className={styles.imageContainer}>
        {props.loading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={55}
            height={55}
            sx={theme && { bgcolor: "grey.900" }}
          />
        ) : (
          <Image
            src={props.profilePicture}
            alt="profile"
            className={styles.image}
            width={100}
            height={100}
          />
        )}
      </Box>

      {props.loading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={55}
          style={{ borderRadius: "5px" }}
          sx={theme && { bgcolor: "grey.900" }}
        />
      ) : (
        <Box className={styles.contents}>
          <Box className={styles.content}>
            <Typography variant="caption" component="h5" >
              Name
            </Typography>
            <Typography variant="body1" component="h5">
              {props.Name}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Address
            </Typography>
            <Typography variant="body1" component="h5">
              {props.Address}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Phone
            </Typography>
            <Typography variant="body1" component="h5">
              {props.Phone}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CardTemplate;
