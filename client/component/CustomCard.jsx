import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../styles/CustomCard.module.css";
import Image from "next/image";

const CustomCard = ({ icon, name, date, AppointmentID, status }) => {
  return (
    <Box className={styles.card}>
      <Typography variant="body2" component="h6" className={styles.card__cell}>
        {name}
      </Typography>
      <Typography variant="body2" component="h6" className={styles.card__cell}>
        {date}
      </Typography>
      <Typography variant="body2" component="h6" className={styles.card__cell}>
        {AppointmentID}
      </Typography>
      <Box className={styles.status}>
        <Image src={icon} title="icon" />
        <Typography
          variant="body2"
          component="h6"
          className={styles.card__cell}
          color={status == "Done" && "#02c923" || status == "Ongoing" && "#DB9B04" || status == "Waiting" && "#B82623"}
        >
          {status}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomCard;
