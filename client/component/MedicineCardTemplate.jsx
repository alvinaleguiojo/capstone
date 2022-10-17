import React, { useState, useEffect } from "react";
import styles from "../styles/MedicineCardTemplate.module.css";
import Image from "next/image";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Skeleton, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { addMedicineRequest } from "../features/Medicines";

const CardTemplate = (props) => {
  const [theme, setTheme] = useState(false);
  const [medicineIDs, setMedicineIDs] = useState([]);

  // medicine redux
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicineIDs));
    console.log(medicineIDs);
    return () => {};
  }, [medicineIDs]);

  const handleRequest = (data) => {
    // console.log(data);
    // setMedicineIDs([...medicineIDs, data.id]);

    dispatch(addMedicineRequest(data));
  };

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
          sx={theme && { bgcolor: "grey.900" }}
        />
      ) : (
        <Box className={styles.contents}>
          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Name
            </Typography>
            <Typography variant="Body1" component="h5">
              {props.data.Name}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Stocks
            </Typography>
            <Typography variant="Body1" component="h5">
              {props.data.Stocks}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Availability
            </Typography>
            <Typography
              variant="Body1"
              component="h5"
              style={{
                color:
                  props.data.Availability == "In-Stocks" ? "rgb(7, 199, 7)" : "red",
              }}
            >
              {props.data.Availability === 1 ? "In-Stocks" : "Out-of-Stocks"}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Expiry Date
            </Typography>
            <Typography variant="Body1" component="h5">
              {props.data.ExpiryDate}
            </Typography>
          </Box>

          <Box
            className={styles.content}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Button
              onClick={() => handleRequest(props.data)}
              disabled={props.data.Stocks > 0 ? false : true}
            >
              <AddCircleOutlineIcon /> Request
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CardTemplate;
