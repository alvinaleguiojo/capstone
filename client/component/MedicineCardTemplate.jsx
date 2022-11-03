import React, { useState, useEffect } from "react";
import styles from "../styles/MedicineCardTemplate.module.css";
import Image from "next/image";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Button, Box, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addMedicineRequest } from "../features/Medicines";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Checkbox from "@mui/material/Checkbox";
import { deleteMedicineRequest } from "../features/Medicines";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CardTemplate = (props) => {
  const router = useRouter();
  const [theme, setTheme] = useState(false);
  const [medicineIDs, setMedicineIDs] = useState([]);

  const [checked, setChecked] = useState(false);

  // medicine redux
  const dispatch = useDispatch();
  const medicinesList = useSelector((state) => state.medicines.value);

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

  // dispatch an action to add medicine to card request
  const handleRequest = (data) => {
    // dispatch(addMedicineRequest({ ...data, Quantity: 1 }));

    dispatch(
      addMedicineRequest({
        ...data,
        Quantity: 1,
      })
    );

    const removeMedicine = medicinesList.filter((medicine) => {
      return medicine.MedicineID === data.MedicineID;
    });
    removeMedicine.forEach((value) => {
      return dispatch(deleteMedicineRequest({ id: value.MedicineID }));
    });
  };

  const handleChange = (event, data) => {
    setChecked(event.target.checked);
    dispatch(
      addMedicineRequest({
        ...data,
        Quantity: 1,
        checked: event.target.checked,
      })
    );

    const removeMedicine = medicinesList.filter((medicine) => {
      return medicine.MedicineID === data.MedicineID;
    });
    removeMedicine.forEach((value) => {
      setChecked(event.target.checked);
      return dispatch(deleteMedicineRequest({ id: value.MedicineID }));
    });
  };

  return (
    <Box className={theme ? styles.card__dark : styles.card}>
      {props.staffData.Role === "BNS" && (
        <Checkbox
          {...label}
          checked={checked}
          onChange={(event) => handleChange(event, props.data)}
          disabled={props.data.Stocks > 0 ? false : true}
        />
      )}

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
              Dosage
            </Typography>
            <Typography variant="body1" component="h5">
              {props.data.Dosage}
            </Typography>
          </Box>

          <Box className={styles.content}>
            <Typography variant="caption" component="h5">
              Availability
            </Typography>
            <Typography
              variant="body1"
              component="h5"
              style={{
                color: props.data.Availability == 1 ? "rgb(7, 199, 7)" : "red",
              }}
            >
              {props.data.Availability === 1 ? "In-Stocks" : "Out-of-Stocks"}
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
              Expiry Date
            </Typography>
            <Typography variant="body1" component="h5">
              {new Date(props.data.ExpiryDate).toLocaleDateString("en-us", {
                // weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          {/*   */}
          <Button
            onClick={() => router.push(`/medicines/${props.data.MedicineID}`)}
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
