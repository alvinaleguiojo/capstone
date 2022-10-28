import React, { useState, useEffect } from "react";
import styles from "../styles/MedicineCardTemplate.module.css";
import Image from "next/image";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CardTemplate = (props) => {
  const router = useRouter();
  const [theme, setTheme] = useState(false);
  const [medicineIDs, setMedicineIDs] = useState([]);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicineIDs));
    return () => {};
  }, [medicineIDs]);

  return (
    <Box className={theme ? styles.card__dark : styles.card}>
      <Box className={styles.imageContainer}>
        {props.loading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={55}
            height={55}
            // sx={theme && { bgcolor: "grey.900" }}
          />
        ) : (
          <Image
            loader={() => props.data.Image}
            src={props.data.Image}
            alt="Image"
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
          // sx={theme && { bgcolor: "grey.900" }}
        />
      ) : (
        <Box className={styles.contents}>
          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Name
            </Typography>
            <Typography variant="body1" component="h5">
              {props.data.Name}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Patient Name
            </Typography>
            <Typography variant="body1" component="h5">
              {props.data.FirstName + " " + props.data.LastName}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Quantity
            </Typography>
            <Typography variant="body1" component="h5">
              {props.data.Quantity}
            </Typography>
          </Box>


          <Box
            className={styles.content}
            style={{
              color:
                props.data.ExpiryDate >
                  new Date().toLocaleDateString("en-us", {
                    // weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }) && "red",
            }}
          >
            <Typography variant="caption" component="h5">
              Released Date
            </Typography>
            <Typography variant="body1" component="h5">
              {new Date(props.data.ReleasedDate).toLocaleDateString("en-us", {
                // weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          <Button
            onClick={() =>
              router.push(`/medicines/released/detail/${props.data.MedicineID}`)
            }
            style={{ display: "flex", alignItems: "center", color: "#8a8fa0" }}
          >
            <VisibilityIcon />
            view
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CardTemplate;
