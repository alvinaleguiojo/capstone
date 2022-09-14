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

  const MedicineModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registration",
      html:
        '<div class="medicine__container"><label class="medicine__name">First Name</label><input id="swal-input1" class="swal2-input" placeholder="First Name" required></div>' +
        '<div class="medicine__container"><label class="medicine__name">Last Name</label><input id="swal-input2" class="swal2-input" placeholder="Last Name"></div>' +
        '<div class="medicine__container"><label>Address</label><input id="swal-input3" class="swal2-input" placeholder="Address" type="text"></div>' +
        '<div class="medicine__container"><label>Phone</label><input id="swal-input4" class="swal2-input" placeholder="+63..." type="phone"></div>' +
        '<div class="medicine__container"><label>Select Service</label><select id="swal-input5" class="swal2-input medicine__input" placeholder="Select Service" type="select"><option value="Immunization">Immunization</option><option value="Vaccine">Vaccine</option><option value="Prenatal">Prenatal</option></select></div>' +
        '<div class="medicine__container"><label>Schedule</label><input id="swal-input6" class="swal2-input medicine__input" placeholder="Schedule" type="date" min="2000-01-02"></div>',
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
          document.getElementById("swal-input3").value,
          document.getElementById("swal-input4").value,
          document.getElementById("swal-input5").value,
          document.getElementById("swal-input5").value,
        ];
      },
    });

    const res = JSON.stringify(formValues);
    console.log(res);
    res &&
      (await Swal.fire(
        "Success!",
        `Medicine has been added! + ${res}`,
        "success"
      ));
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
      )}
    </>
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
