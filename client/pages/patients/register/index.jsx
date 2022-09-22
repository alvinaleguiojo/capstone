import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../../component/Navbar";
import Tabs from "../../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../../styles/Content.module.css";
import reusableStyle from "../../../styles/Reusable.module.css";
import styles from "../../../styles/Patients.module.css";
import GridTable from "../../../component/GridTable";
import Meta from "../../../component/Meta";
import Typography from "@mui/material/Typography";
import useAuth from "../../../customhook/Auth";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import CameraIcon from "../../../assets/image/camera.svg";

const index = ({ patients }) => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    console.log(patient);
  }, [patient]);

  const handleProceed = (e) => {
    router.push(
      `/patients/register/history?FirstName=${patient.FirstName}&LastName=${patient.LastName}&MiddleName=${patient.MiddleName}&Suffix=${patient.Suffix}&Street=${patient.Street}&Baranggay=${patient.Baranggay}&City=${patient.City}&BirthDate=${patient.BirthDate}&Gender=${patient.Gender}&ContactNumber=${patient.ContactNumber}`
    );
  };

  const handleBack = () => {
    router.push("/patients");
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
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box className={styles.photo}>
                      <Image src={CameraIcon} alt="photo" />
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
                          <input
                            className={styles.input__register}
                            //   onChange={(e) =>
                            //     setUser({ ...user, firstname: e.target.value })
                            //   }
                            type="text"
                            name="firstname"
                            //   value={user.firstname || ""}
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
                            Street
                          </Typography>
                          <input
                            className={styles.input__register}
                            //   onChange={(e) =>
                            //     setUser({ ...user, firstname: e.target.value })
                            //   }
                            type="text"
                            name="firstname"
                            //   value={user.firstname || ""}
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
                            //   onChange={(e) =>
                            //     setUser({ ...user, firstname: e.target.value })
                            //   }
                            type="text"
                            name="firstname"
                            //   value={user.firstname || ""}
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
                            //   onChange={(e) =>
                            //     setUser({ ...user, firstname: e.target.value })
                            //   }
                            type="text"
                            name="firstname"
                            //   value={user.firstname || ""}
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
                            //   onChange={(e) =>
                            //     setUser({ ...user, firstname: e.target.value })
                            //   }
                            type="date"
                            name="birthdate"
                            //   value={user.firstname || ""}
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
                          <select className={styles.input__register}>
                            <option value="volvo">Male</option>
                            <option value="saab">Female</option>
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
                            //   onChange={(e) =>
                            //     setUser({ ...user, firstname: e.target.value })
                            //   }
                            type="text"
                            name="firstname"
                            //   value={user.firstname || ""}
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
                  <Button onClick={handleProceed}>Proceed</Button>
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

export const getStaticProps = async () => {
  try {
    const res = await fetch("http://localhost:3001/patients");
    const { Patients } = await res.json();

    return {
      props: {
        patients: Patients,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
