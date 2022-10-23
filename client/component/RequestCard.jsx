import React from "react";
import Image from "next/image";
import styles from "../styles/RequestCard.module.css";
import { IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteMedicineRequest } from "../features/Medicines";

const RequestCard = (props) => {
  // medicines data from redux
  const dispatch = useDispatch();
  return (
    <Box className={styles.card}>
      <Box style={{ display: "flex", gap: "1rem" }}>
        <Image
          loader={() => props.data.Image}
          src={"image"}
          alt="Image"
          className={styles.image}
          width={40}
          height={40}
        />
        <Box className={styles.box}>
          <Typography variant="caption" component="h5">
            Medicine Name
          </Typography>
          <Typography variant="body1" component="h5">
            {props.data.Name}
          </Typography>
        </Box>

        <Box className={styles.box}>
          <Typography variant="caption" component="h5">
            Quantity
          </Typography>
          <Typography variant="body1" component="h5">
            {props.data.Quantity}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() =>
          dispatch(deleteMedicineRequest({ id: props.data.MedicineID }))
        }
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default RequestCard;
