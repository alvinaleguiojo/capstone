import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../styles/CustomModal.module.css";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#B82623",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function CustomModal() {
  const router = useRouter();

  return (
    <>
      <Box className={styles.popup__settings}>
        <Box className={styles.setting__close}>
          <IconButton onClick={() => router.push("?settings")}>
            <CloseIcon fontSize="large" className={styles.close__icon} />
          </IconButton>
        </Box>
        <Box className={styles.settings}>
          <Box className={styles.content__left}>
            <Box className={styles.tabs}>
              <Box
                className={
                  router.query.settings == "services"
                    ? styles.tab__active
                    : styles.tab
                }
                onClick={() => router.push("?settings=services")}
              >
                Services
              </Box>
              <Box
                className={
                  router.query.settings == "user_management"
                    ? styles.tab__active
                    : styles.tab
                }
                onClick={() => router.push("?settings=user_management")}
              >
                User Management
              </Box>
            </Box>
          </Box>
          <Box className={styles.content__right}>
            <Box className={styles.content__right__header}>
              <Typography variant="h5" component="h3">
                Services
              </Typography>
              <Typography variant="body1" component="h3" color="#b82623">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex
              </Typography>
              <Box className={styles.divider}></Box>
            </Box>
            <Box className={styles.content}>
              <Typography variant="h7" component="h7">
                Create Services
              </Typography>
              <Box className={styles.services}>
                <Box className={styles.service}>
                  <FormGroup>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Vaccine</Typography>
                      <AntSwitch
                        defaultChecked
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </Stack>
                  </FormGroup>
                </Box>
                <Box className={styles.service}>Immunization</Box>
                <Box className={styles.service}>Prenatal</Box>
                <Box className={styles.service}>Any</Box>
              </Box>
              <Box className={styles.service__new}>
                <Button className={styles.service}>+ Add Service</Button>
              </Box>

              <Box className={styles.service__save}>
                <Button className={styles.discard}>Discard</Button>
                <Button
                  className={styles.save}
                  variant="contained"
                  disabled={true}
                >
                  Save
                </Button>
              </Box>

              <Box className={styles.divider}></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
