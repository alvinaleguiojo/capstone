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
  boderRadius: "100px",
  p: 4,
};

const index = () => {
  const router = useRouter();
  const webRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [imageURL, setImageURL] = useState(null);

  // modal
  const [open, setOpen] = React.useState(false);
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

  const {
    qLastName,
    qFirstName,
    qMiddleName,
    qSuffix,
    qPhone,
    qBirthDate,
    qGender,
    qStreet,
    qBaranggay,
    qCity,
  } = router.query;

  useEffect(() => {
    qLastName !== null &&
      qLastName !== "undefined" &&
      qLastName !== undefined &&
      qLastName !== "" &&
      qFirstName !== null &&
      qFirstName !== "" &&
      qFirstName !== "undefined" &&
      qFirstName !== undefined &&
      qMiddleName !== null &&
      qMiddleName !== "" &&
      qMiddleName !== "undefined" &&
      qMiddleName !== undefined &&
      qSuffix !== null &&
      qSuffix !== "" &&
      qSuffix !== "undefined" &&
      qSuffix !== undefined &&
      qPhone !== null &&
      qPhone !== "" &&
      qPhone !== "undefined" &&
      qPhone !== undefined &&
      qBirthDate !== null &&
      qBirthDate !== "" &&
      qBirthDate !== "undefined" &&
      qBirthDate !== undefined &&
      qGender !== null &&
      qGender !== "" &&
      qGender !== "undefined" &&
      qGender !== undefined &&
      qStreet !== null &&
      qStreet !== "" &&
      qStreet !== "undefined" &&
      qStreet !== undefined &&
      qBaranggay !== null &&
      qBaranggay !== "" &&
      qBaranggay !== "undefined" &&
      qBaranggay !== undefined &&
      qCity !== null &&
      qCity !== "" &&
      qCity !== "undefined" &&
      qCity !== undefined &&
      setPatient({
        ...patient,
        LastName: qLastName,
        FirstName: qFirstName,
        MiddleName: qMiddleName,
        Suffix: qSuffix,
        Phone: qPhone,
        BirthDate: qBirthDate,
        Gender: qGender,
        Street: qStreet,
        Baranggay: qBaranggay,
        City: qCity,
      });
  }, [router]);

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

  useEffect(() => {
    console.log(patient);
  }, [patient]);

  const handleProceed = async (e) => {
    setDisabled(true);
    router.push(
      `/patients/register/history?FirstName=${patient.FirstName}&LastName=${patient.LastName}&MiddleName=${patient.MiddleName}&Suffix=${patient.Suffix}&Street=${patient.Street}&Baranggay=${patient.Baranggay}&City=${patient.City}&BirthDate=${patient.BirthDate}&Gender=${patient.Gender}&Phone=${patient.Phone}&ImageID=${patient.ImageID}`
    );
  };

  // going back to patient page list
  const handleBack = () => {
    router.push("/patients");
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user" || { exact: "environment" },
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webRef.current.getScreenshot();
    setImageURL(imageSrc);
  }, [webRef]);

  const handleSave = () => {
    axios
      .post("http://localhost:3001/image/upload", {
        imageURL,
      })
      .then((response) => {
        setPatient({ ...patient, ImageID: response.data.ImageID });
        Swal.fire("Success!", "Image has been uploaded!", "success");
      });
    setOpen(false);
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
          <Navbar />
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
                      {imageURL ? (
                        <Image
                          src={imageURL}
                          alt="photo"
                          width={200}
                          height={200}
                          className={styles.profilePicture}
                        />
                      ) : (
                        <IconButton onClick={handleOpen}>
                          <Image
                            src={CameraIcon}
                            alt="photo"
                            width={50}
                            height={50}
                          />
                        </IconButton>
                      )}

                      {/* <input
                        className={styles.input__capture}
                        //   onChange={(e) =>
                        //     setUser({ ...user, firstname: e.target.value })
                        //   }
                        type="file"
                        name="uploadPhoto"
                        //   value={user.firstname || ""}
                      /> */}
                    </Box>

                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
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
                          <Button onClick={() => setImageURL(null)}>
                            Retake
                          </Button>
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

export default index;

// export const getStaticProps = async () => {
//   try {
//     const res = await fetch("http://localhost:3001/patients");
//     const { Patients } = await res.json();

//     return {
//       props: {
//         patients: Patients,
//       },
//     };
//   } catch (error) {
//     console.log("please check your internet connection", error);
//   }
// };
