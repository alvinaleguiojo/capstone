import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../styles/CustomCard.module.css";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

const CustomCard = ({
  icon,
  name,
  service,
  AppointmentID,
  status,
  color,
  loading,
  patientID,
}) => {
  const [theme, setTheme] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={50}
          sx={{ borderRadius: "6px" }}
        />
      ) : (
        <Box
          className={theme ? styles.card__dark : styles.card}
          onClick={() => router.push(`/patients/${patientID}`)}
        >
          <Typography
            variant="body2"
            component="h6"
            className={styles.card__cell}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            component="h6"
            className={styles.card__cell}
          >
            {service}
          </Typography>
          <Typography
            variant="body2"
            component="h6"
            className={styles.card__cell}
          >
            {AppointmentID}
          </Typography>
          <Box className={styles.status}>
            {/* <Image src={icon} title="icon" /> */}
            <Typography
              variant="body2"
              component="h6"
              className={styles.card__cell}
              style={{
                backgroundColor:
                  (status == "Completed" && "rgb(8, 153, 129)") ||
                  (status == "Ongoing" && "#00ad0e") ||
                  (status == "Pending" && "#ce8900") ||
                  (status == "Waiting" && "#B82623") ||
                  (status == "Cancelled" && "#B82623"),
                borderRadius: "10px",
                color: "#fff",
                width: "80px",
                textAlign: "center",
              }}
            >
              {status}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CustomCard;
