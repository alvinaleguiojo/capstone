import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import styles from "../../styles/Patients.module.css";
import GridTable from "../../component/GridTable";
import Meta from "../../component/Meta";
import Typography from "@mui/material/Typography";
import useAuth from "../../customhook/Auth";
import { Button } from "@mui/material";

const columns = [
  {
    id: "PatientID",
    label: "Patient's ID",
    minWidth: 50,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Name",
    label: "Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Age",
    label: "Age",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Gender",
    label: "Gender",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "Address", label: "Address", minWidth: 300 },
  {
    id: "Phone",
    label: "Phone Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(PatientID, Name, Age, Gender, Address, Phone) {
  return { PatientID, Name, Age, Gender, Address, Phone };
}

const index = ({ patients }) => {
  const router = useRouter();
  const rows = [];
  patients.map((patient) => {
    return rows.push(
      createData(
        patient.PatientID,
        patient.FirstName + " " + patient.LastName,
        patient.Age,
        patient.Gender,
        patient.Address,
        patient.Phone
      )
    );
  });

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
                <Box className={styles.content__header}>
                  <Typography variant="h5" component="h5" color="#B82623">
                    All Patients
                  </Typography>
                  <Button className={styles.addPatient} onClick={() => router.push("/patients/register")}>
                    Add New Patient
                  </Button>
                </Box>
                <GridTable
                  rows={rows}
                  columns={columns}
                  path="patients"
                  maxHeight={380}
                  firstRow={10}
                  rowPerPage={10}
                />
              </Box>
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
