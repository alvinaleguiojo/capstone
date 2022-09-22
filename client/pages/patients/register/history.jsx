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

const index = ({ patients }) => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/patients/register");
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
                  initial={{ x: "50vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 120 }}
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
                      //   onChange={(e) =>
                      //     setUser({ ...user, firstname: e.target.value })
                      //   }
                      type="text"
                      name="firstname"
                      //   value={user.firstname || ""}
                    />
                  </Box>

                  <Box style={{ width: "100%" }}>
                    <Typography variant="body1" component="h5" color="#B82623">
                      Do you have any medication allergies?
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
                  </Box>

                  <Box className={styles.history__options}>
                    <Box style={{ width: "100%" }}>
                      <Typography
                        variant="body1"
                        component="h5"
                        color="#B82623"
                      >
                        Measles
                      </Typography>
                      <select className={styles.input__register}>
                        <option value="volvo">Yes</option>
                        <option value="saab">No</option>
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
                      <select className={styles.input__register}>
                        <option value="volvo">Yes</option>
                        <option value="saab">No</option>
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
                      <select className={styles.input__register}>
                        <option value="volvo">Yes</option>
                        <option value="saab">No</option>
                      </select>
                    </Box>
                  </Box>
                </motion.div>
                <Box className={styles.buttonRegister}>
                  <Button style={{ color: "#b82623" }} onClick={handleNext}>
                    Back
                  </Button>
                  <Button onClick={handleNext} disabled={true}>
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
