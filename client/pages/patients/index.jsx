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
import AddIcon from "../../assets/image/plus-circle.svg";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

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

  const MedicineModal = async() =>{
    const { value: formValues } = await Swal.fire({
      title: "Add Patient",
      html:
        '<div class="medicine__container"><label class="medicine__name">Name</label><input id="swal-input1" class="swal2-input" placeholder="Name"></div>' +
        '<div class="medicine__container"><label>Quantity</label><input id="swal-input2" class="swal2-input" placeholder="Quantity" type="number" min="1"></div>' +
        '<div class="medicine__container"><label>Date Arrived</label><input id="swal-input3" class="swal2-input medicine__input" placeholder="Data Arrived" type="date"></div>' +
        '<div class="medicine__container"><label>Expiry Date</label><input id="swal-input4" class="swal2-input medicine__input" placeholder="Expiry Date" type="date"></div>',
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      inputAttributes: {
        required: true,
      },
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
        ];
      },
    });

    const res = JSON.stringify(formValues);
    console.log(res);
    res && (await Swal.fire("Success!", "Medicine has been added!", "success"));
  }

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
              rowPerPage={10}
            />

            <Button
              style={{ backgroundColor: "#dbdff3", color: "#b82623" }}
              onClick={MedicineModal}
            >
              <Image src={AddIcon} alt="add" />
              Add Patient
            </Button>
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
