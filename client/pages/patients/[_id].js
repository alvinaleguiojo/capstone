import React from "react";
import Box from "@mui/material/Box";
import Link from "next/link";

const PatientProfile = ({ patient }) => {
  return (
    <>
     <Link href="/patients">Back to Patient Page</Link>
      {patient.map((patientData, key) => {
        return (
          <Box key={key}>
            <h1>Name: {patientData.firstname + " " + patientData.lastname}</h1>
            <h1>Schedule: {patientData.schedule}</h1>
            <h1>Address: {patientData.address}</h1>
            <h1>Phone Number: {patientData.phone}</h1>
          </Box>
        );
      })}
    </>
  );
};

export default PatientProfile;

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/list_appointments");
    const { results } = await res.json();

    return {
      paths: results.map((patient) => {
        return { params: { _id: patient._id } };
      }),
      fallback: false,
    };
  } catch (err) {
    console.log("Ops path in invaid!");
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3001/patients/${params._id}`);
    const patient = await res.json();
    return {
      props: {
        patient,
      },
    };
  } catch (err) {
    console.log("Fetching data error or please your internet connection", err);
  }
}
