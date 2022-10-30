import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import axios from "axios";
import Swal from "sweetalert2";

const Index = ({ patients }) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [patient, setPatient] = useState({});
  const [history, setHistory] = useState({
    MedicineIntake: null,
    Allergies: null,
    Measles: false,
    Immunization: false,
    Tuberculosis: false,
  });

  useEffect(() => {
    history.MedicineIntake !== null &&
    history.MedicineIntake !== "" &&
    history.Allergies !== null &&
    history.Allergies !== "" &&
    history.Measles !== null &&
    history.Measles !== "" &&
    history.Immunization !== null &&
    history.Immunization !== "" &&
    history.Tuberculosis !== null &&
    history.Tuberculosis !== ""
      ? setDisabled(false)
      : setDisabled(true);
  }, [history]);

  //retrieving from local storage
  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem("patient"));
    patient && setPatient(patient);
    console.log(patient);
  }, []);

  const handleBack = () => {
    router.push(`/patients/register`);
  };

  const handleSubmit = async () => {
    setDisabled(true);
    await Swal.fire({
      title: "Are you sure?",
      text: "Would you like to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "grey",
      confirmButtonText: "Confirm",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setDisabled(true);
        try {
          await axios.post("http://localhost:3001/patient/register", {
            ...patient,
            ...history,
          });
          await Swal.fire(
            "Success!",
            "Patient successfully registered!",
            "success"
          ).then(() => {
            localStorage.removeItem("image");
            localStorage.removeItem("patient");
            router.push("/patients");
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill the  required fields ",
          }).then(() => {
            router.push(`/patients/register`);
          });
        }
      }
      setDisabled(false);
    });
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
                  initial={{ x: "50vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 70 }}
                >
                  <Typography variant="h5" component="h5" color="#B82623">
                    Medical History
                  </Typography>

                  <Box style={{ width: "100%" }}>
                    <Typography variant="body1" component="h5" color="#B82623">
                      Are you currently taking any medicine ?
                    </Typography>
                    <input
                      className={styles.input__register}
                      onChange={(e) =>
                        setHistory({
                          ...history,
                          MedicineIntake: e.target.value,
                        })
                      }
                      type="text"
                      name="TakingMedicine"
                      value={history.MedicineIntake || ""}
                    />
                  </Box>

                  <Box style={{ width: "100%" }}>
                    <Typography variant="body1" component="h5" color="#B82623">
                      Do you have any medication allergies?
                    </Typography>
                    <input
                      className={styles.input__register}
                      onChange={(e) =>
                        setHistory({ ...history, Allergies: e.target.value })
                      }
                      type="text"
                      name="Allergies"
                      value={history.Allergies || ""}
                    />
                  </Box>

                  {/* <Box style={{ width: "100%" }}>
                    <Typography variant="body1" component="h5" color="#B82623">
                      Do you use or history of using tobacco?
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
                  </Box> */}

                  <Box className={styles.history__options}>
                    <Box style={{ width: "100%" }}>
                      <Typography
                        variant="body1"
                        component="h5"
                        color="#B82623"
                      >
                        Measles
                      </Typography>
                      <select
                        className={styles.input__register}
                        onChange={(e) =>
                          setHistory({
                            ...history,
                            Measles: e.target.value,
                          })
                        }
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </Box>
                    <Box style={{ width: "100%" }}>
                      <Typography
                        variant="body1"
                        component="h5"
                        color="#B82623"
                      >
                        Immunization
                      </Typography>
                      <select
                        className={styles.input__register}
                        onChange={(e) =>
                          setHistory({
                            ...history,
                            Immunization: e.target.value,
                          })
                        }
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </Box>
                    <Box style={{ width: "100%" }}>
                      <Typography
                        variant="body1"
                        component="h5"
                        color="#B82623"
                      >
                        Tuberculosis
                      </Typography>
                      <select
                        className={styles.input__register}
                        onChange={(e) =>
                          setHistory({
                            ...history,
                            Tuberculosis: e.target.value,
                          })
                        }
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </Box>
                  </Box>
                </motion.div>
                <Box className={styles.buttonRegister}>
                  <Button style={{ color: "#b82623" }} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={disabled}
                    className={
                      disabled ? styles.proceedBtnDisabled : styles.proceedBtn
                    }
                  >
                    Submit
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
