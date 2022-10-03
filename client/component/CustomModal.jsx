import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../styles/CustomModal.module.css";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "@mui/material/Skeleton";

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
  const [service, setService] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);

  //Adding New Service to State
  const [addService, setAddService] = useState({
    Availability: false,
    ServiceType: null,
    Description: null,
  });

  // To check if the fields is not empty
  useEffect(() => {
    addService.ServiceType !== null &&
    addService.ServiceType !== "" &&
    addService.Description !== null &&
    addService.Description !== ""
      ? setDisabled(false)
      : setDisabled(true);
  }, [addService]);

  // go to add service tab
  const handleService = () => {
    setService(true);
  };

  //fetch service data
  useEffect(() => {
    axios
      .get("http://localhost:3001/services")
      .then((response) => {
        // set loading to false when data is available
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setServicesData(response.data.Services);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // when toggleSwitch is called
  const ToggleUpdateService = (e, serviceData) => {
    const newValue = { ...serviceData, Availability: e.target.checked };
    const updatedServiceItem = servicesData.map((newServiceItem) => {
      return newServiceItem.ServiceID === serviceData.ServiceID
        ? newValue
        : newServiceItem;
    });
    //setting new services data to array
    setServicesData(updatedServiceItem);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    if (Toast) {
      //passing data to an API call Update Service
      axios.patch(
        `http://localhost:3001/service/update/${serviceData.ServiceID}`,
        { Availability: newValue.Availability }
      );
      Toast.fire({
        icon: "success",
        title: "Changes are saved",
      });
    }
  };

  const submitNewService = () => {
    axios
      .post("http://localhost:3001/service/create", {
        ...addService,
      })
      .then(() => {
        Swal.fire(
          "Success!",
          "Service has been added successfully!",
          "success"
        );
        // clear all the fields
        setAddService({
          Availability: false,
          ServiceType: null,
          Description: null,
        });
        //return to list of services
        setTimeout(() => {
          setService(false);
        }, 1000);

        //Add new service to serviceData state
        return setServicesData([...servicesData, addService]);
      });
  };

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
              <Typography variant="h4" component="h4">
                Services
              </Typography>
              {loading ? (
                <>
                  <Skeleton />
                  <Skeleton animation="wave" sx={{ width: "60%" }} />
                </>
              ) : (
                <Typography variant="body1" component="h3" color="#b82623">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex
                </Typography>
              )}

              <Box className={styles.divider}></Box>
            </Box>

            <Box className={styles.content}>
              {!service && (
                <Box className={styles.content__container}>
                  <Typography variant="h6" component="h6">
                    Create Services
                  </Typography>
                  <Box className={styles.services}>
                    {servicesData.map((serviceData, index) => (
                      <>
                        <Box
                          className={styles.service}
                          key={serviceData.ServiceID}
                        >
                          <FormGroup>
                            {loading ? (
                              <Skeleton
                                animation="wave"
                                variant="rectangular"
                                sx={{ bgcolor: "grey.300", width: "110px" }}
                              />
                            ) : (
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Typography>
                                  {serviceData.ServiceType}
                                </Typography>
                                <AntSwitch
                                  checked={
                                    serviceData.Availability == 1 ? true : false
                                  }
                                  inputProps={{ "aria-label": "ant design" }}
                                  onChange={(e) =>
                                    ToggleUpdateService(e, serviceData)
                                  }
                                />
                              </Stack>
                            )}
                          </FormGroup>
                        </Box>
                      </>
                    ))}

                    {/* <Box className={styles.service}>Immunization</Box>
                    <Box className={styles.service}>Prenatal</Box>
                    <Box className={styles.service}>Any</Box> */}
                  </Box>
                  <Box className={styles.service__new}>
                    <Button className={styles.service} onClick={handleService}>
                      + Add Service
                    </Button>
                  </Box>
                  <Box className={styles.divider}></Box>
                </Box>
              )}

              {service && (
                <motion.div
                  className={styles.register__container}
                  initial={{ x: "-5vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 70 }}
                >
                  <Box className={styles.service__add}>
                    <Box className={styles.service__add__container}>
                      <Box className={styles.button__back}>
                        <Button onClick={() => setService(false)}>
                          <ArrowBackIosIcon fontSize="small" />
                          Go back
                        </Button>
                      </Box>

                      <Typography variant="h6" component="h6">
                        Add New Service
                      </Typography>
                      <Box className={styles.form__container}>
                        <form>
                          <Box className={styles.service__inputs}>
                            <Box className={styles.service__left__inputs}>
                              <Box className={styles.service__input__container}>
                                <label>Name</label>
                                <input
                                  type="text"
                                  placeholder="Name"
                                  onChange={(e) => {
                                    return setAddService({
                                      ...addService,
                                      ServiceType: e.target.value,
                                    });
                                  }}
                                />
                              </Box>
                              <Box className={styles.service__input__container}>
                                <label>Description</label>
                                <input
                                  type="text"
                                  placeholder="Description"
                                  onChange={(e) => {
                                    return setAddService({
                                      ...addService,
                                      Description: e.target.value,
                                    });
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box className={styles.service__options}>
                              <label>Availability</label>
                              <select
                                className={styles.input__register}
                                onChange={(e) => {
                                  return setAddService({
                                    ...addService,
                                    Availability: e.target.value,
                                  });
                                }}
                              >
                                <option value={false}>Disable</option>
                                <option value={true}>Enable</option>
                              </select>
                            </Box>
                          </Box>
                        </form>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={styles.service__save}>
                    <Button
                      className={styles.discard}
                      onClick={() => setService(false)}
                    >
                      Discard
                    </Button>
                    <Button
                      className={styles.save}
                      variant="contained"
                      disabled={disabled}
                      onClick={submitNewService}
                    >
                      Save
                    </Button>
                  </Box>
                </motion.div>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
