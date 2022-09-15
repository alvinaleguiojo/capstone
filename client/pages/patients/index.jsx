import React from "react";
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

const columns = [
  {
    id: "_id",
    label: "Patient's ID",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "age",
    label: "Age",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "last_visited",
    label: "Last Visited",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(_id, name, age, gender, address, phone, last_visited) {
  return { _id, name, gender, age, address, phone , last_visited};
}

const index = ({ patients }) => {
  const rows = [];
  patients.map((patient) => {
    return rows.push(
      createData(
        patient._id,
        patient.firstname + " " + patient.lastname,
        patient.age,
        patient.gender,
        patient.address,
        patient.phone
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
                <Typography variant="h5" component="h5" color="#B82623">
                  All Patients
                </Typography>
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
    const { results } = await res.json();

    // const todayPatients = results.filter((date) =>date.schedule == new Date().toLocaleDateString())
    // console.log(todayPatients)

    return {
      props: {
        patients: results,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
