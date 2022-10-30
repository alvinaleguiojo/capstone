import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../../component/Navbar";
import Tabs from "../../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../../styles/Content.module.css";
import reusableStyle from "../../../styles/Reusable.module.css";
import styles from "../../../styles/Patients.module.css";
import Meta from "../../../component/Meta";
import Typography from "@mui/material/Typography";
import useAuth from "../../../customhook/Auth";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import CameraIcon from "../../../assets/image/camera.svg";
import Modal from "@mui/material/Modal";
import LinearProgress from "@mui/material/LinearProgress";
import Webcam from "react-webcam";
import { IconButton } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

// modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Index = () => {
  const router = useRouter();

  const webRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [imageURL, setImageURL] = useState(null);

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // modal

  const [patient, setPatient] = useState({
    LastName: null,
    FirstName: null,
    MiddleName: null,
    Suffix: "None",
    Phone: null,
    BirthDate: null,
    Gender: "Male",
    Street: null,
    Baranggay: null,
    City: null,
    ImageID: null,
  });

  useEffect(() => {
    patient.LastName !== null &&
    patient.LastName !== "" &&
    patient.FirstName !== null &&
    patient.FirstName !== "" &&
    patient.Phone !== null &&
    patient.Phone !== "" &&
    patient.BirthDate !== null &&
    patient.BirthDate !== "" &&
    patient.Street !== null &&
    patient.Street !== "" &&
    patient.Baranggay !== null &&
    patient.Baranggay !== "" &&
    patient.City !== null &&
    patient.City !== ""
      ? setDisabled(false)
      : setDisabled(true);
  }, [patient]);

  const handleProceed = async (e) => {
    console.log(patient);
    localStorage.setItem("patient", JSON.stringify(patient));
    setDisabled(true);
    router.push(`/patients/register/history`);
  };

  // going back to patient page list
  const handleBack = () => {
    router.push("/patients");
  };

  // Webcam

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user" || { exact: "environment" },
  };

  // capturing image
  const handleCapture = useCallback(() => {
    const imageSrc = webRef.current.getScreenshot();
    setImageURL(imageSrc);
  }, [webRef]);

  //retrieving from local storage
  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("patient"));
    const profilePicture = JSON.parse(localStorage.getItem("image"));
    patient && setPatient(patient);
    profilePicture && setImageURL(profilePicture);
  }, []);

  // saving image to local storage
  const handleSave = () => {
    axios
      .post("http://localhost:3001/image/upload", {
        imageURL,
      })
      .then(async (response) => {
        setPatient({ ...patient, ImageID: response.data.ImageID });
        await Swal.fire("Success!", "Image has been uploaded!", "success").then(
          () => {
            localStorage.setItem("image", JSON.stringify(imageURL));
          }
        );
      })
      .catch((error) => {
        Swal.fire("Error!", "Paduol sa camera mam sir hahaha", "error");
        setImageURL(null);
      });
    setOpen(false);
  };

  // removing image from local storage
  const handleRetake = () => {
    setImageURL(null);
    localStorage.removeItem("image");
  };

  return (
    <>
      {/* useAuth is to check if the user is authenticated */}
      {useAuth() && (
        <Box>
          <Meta
            title="Capstone | Patients"
            description="set an appointment to schedule your check-up"
            keywords="Capstone project, health center, baranggay"
          />
          {/* <Navbar /> */}
          <Box className={contentStyles.content}>
            <Tabs />
            <Box className={reusableStyle.main__content}>
              <Box className={styles.patients}>
                <Box className={styles.registration__header}>
                  <Typography variant="h4" component="h4" color="#B82623">
                    Patients Registration
                  </Typography>
                </Box>
                {/* <Box className={styles.register__containers}> */}
                <motion.div
                  className={styles.register__container}
                  initial={{ x: "-50vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 70 }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box className={styles.photo}>
                      {imageURL && (
                        <Image
                          src={imageURL || ""}
                          alt="photo"
                          width={200}
                          height={200}
                          className={styles.profilePicture}
                        />
                      )}

                      <IconButton
                        onClick={handleOpen}
                        style={{ position: "absolute" }}
                      >
                        <Image
                          src={CameraIcon}
                          alt="photo"
                          width={50}
                          height={50}
                        />
                      </IconButton>
                    </Box>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                      className={styles.modal}
                    >
                      <Box sx={style}>
                        <Webcam
                          ref={webRef}
                          width="100%"
                          height="100%"
                          screenshotFormat="image/jpeg"
                          videoConstraints={videoConstraints}
                        />
                        {imageURL && (
                          <Image
                            src={imageURL}
                            alt="profile picture"
                            width="80%"
                            height="80%"
                            layout="fill"
                          />
                        )}
                        {/* <LinearProgress /> */}
                        {!imageURL ? (
                          <Button onClick={handleCapture}>Capture</Button>
                        ) : (
                          <Button onClick={handleRetake}>Retake</Button>
                        )}
                        {imageURL && <Button onClick={handleSave}>Save</Button>}
                      </Box>
                    </Modal>

                    <Box
                      style={{
                        width: "84%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Typography variant="h5" component="h5" color="#B82623">
                        Patient Information
                      </Typography>
                      <Box className={styles.name}>
                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            First Name
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                FirstName: e.target.value,
                              })
                            }
                            type="text"
                            name="firstname"
                            value={patient.FirstName || ""}
                          />
                        </Box>

                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Last Name
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                LastName: e.target.value,
                              })
                            }
                            type="text"
                            name="lastname"
                            value={patient.LastName || ""}
                          />
                        </Box>
                        <Box style={{ width: "30%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Middle Name
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                MiddleName: e.target.value,
                              })
                            }
                            type="text"
                            name="middleName"
                            value={patient.MiddleName || ""}
                          />
                        </Box>
                        <Box style={{ width: "30%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Suffix
                          </Typography>
                          <select
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                Suffix: e.target.value,
                              })
                            }
                          >
                            <option value="None">None</option>
                            <option value="JR">JR</option>
                            <option value="SR">SR</option>
                          </select>
                        </Box>
                      </Box>

                      <Box className={styles.input__address}>
                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Street
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({ ...patient, Street: e.target.value })
                            }
                            type="text"
                            name="Street"
                            value={patient.Street || ""}
                          />
                        </Box>

                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Baranggay
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                Baranggay: e.target.value,
                              })
                            }
                            type="text"
                            name="Baranggay"
                            value={patient.Baranggay || ""}
                          />
                        </Box>

                        <Box style={{ width: "40%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            City
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({ ...patient, City: e.target.value })
                            }
                            type="text"
                            name="City"
                            value={patient.City || ""}
                          />
                        </Box>
                      </Box>
                      <Box className={styles.input__address}>
                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Birth Date
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                BirthDate: e.target.value,
                              })
                            }
                            type="date"
                            name="birthdate"
                            value={patient.BirthDate || ""}
                          />
                        </Box>

                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Gender
                          </Typography>
                          <select
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                Gender: e.target.value,
                              })
                            }
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </Box>

                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Contact Number
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setPatient({
                                ...patient,
                                Phone: e.target.value,
                              })
                            }
                            type="text"
                            name="Phone"
                            value={patient.Phone || ""}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
                <Box className={styles.buttonRegister}>
                  <Button style={{ color: "#b82623" }} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    disabled={disabled}
                    className={
                      disabled ? styles.proceedBtnDisabled : styles.proceedBtn
                    }
                    onClick={handleProceed}
                  >
                    Proceed
                  </Button>
                </Box>
              </Box>
              {/* </Box> */}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Index;
