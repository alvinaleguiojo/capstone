import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/RequestCard.module.css";
import { IconButton, Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteMedicineRequest } from "../features/Medicines";
import Link from "next/link";

const RequestCard = (props) => {
  const router = useRouter();
  // medicines data from redux
  const dispatch = useDispatch();
  return (
    <Box className={styles.card}>
      <Box style={{ display: "flex", gap: "1rem" }}>
        <Link href={`/medicines/${props.data.MedicineID}`}>
          <Image
            loader={() => props.data.Image}
            src={"image"}
            alt="Image"
            className={styles.image}
            width={40}
            height={40}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <Box className={styles.box}>
          <Typography variant="caption" component="h5">
            Medicine Name
          </Typography>

          <Link href={`/medicines/${props.data.MedicineID}`}>
            <Typography
              variant="body1"
              component="h5"
              style={{ cursor: "pointer" }}
            >
              {props.data.Name}
            </Typography>
          </Link>
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
