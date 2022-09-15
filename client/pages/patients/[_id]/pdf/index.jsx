import React, { useEffect, useRef, useState } from "react";
import CustomPDF from "../../../../component/CustomPDF";

const index = ({ patient }) => {
  return (
    <div>
      {patient.map((value, index) => {
        return (
          <CustomPDF
            key={index}
            firstname={value.firstname}
            lastname={value.lastname}
            phone={value.phone}
            address={value.address}
          />
        );
      })}
    </div>
  );
};

export default index;

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/patients");
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
