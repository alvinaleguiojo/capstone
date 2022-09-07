import React from "react";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import styles from "../../styles/Patients.module.css";
import GridTable from "../../component/GridTable";
import Meta from "../../component/Meta";
import Typography from "@mui/material/Typography";

const columns = [
  {
    id: "_id",
    label: "Patient's ID",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "service_type",
    label: "Service Type",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "schedule",
    label: "Schedule",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  { id: "address", label: "Address", minWidth: 100 },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(_id, service_type, schedule, name, address, phone) {
  return { _id, service_type, schedule, name, address, phone };
}

const index = ({ patients }) => {
  const rows = [];
  patients.map((patient) => {
    return rows.push(
      createData(
        patient._id,
        patient.service_type,
        patient.schedule,
        patient.firstname + " " + patient.lastname,
        patient.address,
        patient.phone
      )
    );
  });

  return (
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
              Patients for Today
            </Typography>
            <GridTable
              rows={rows}
              columns={columns}
              path="patients"
              maxHeight={380}
              firstRow={10}
              rowPerPage={[10, 25, 50]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default index;

export const getStaticProps = async () => {
  try {
    const res = await fetch("http://localhost:3001/list_appointments");
    const { results } = await res.json();

    return {
      props: {
        patients: results,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
