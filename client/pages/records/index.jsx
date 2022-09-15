import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import GridTable from "../../component/GridTable";
import Meta from "../../component/Meta";
import styles from "../../styles/Patients.module.css";
import recordStyles from "../../styles/Records.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "../../assets/image/search.svg";
import axios from "axios";
import useAuth from "../../customhook/Auth";
import { Button } from "@mui/material";
import AddIcon from "../../assets/image/plus-circle.svg";
import Swal from "sweetalert2";

const columns = [
  {
    id: "_id",
    label: "Patient's ID",
    minWidth: 200,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Name",
    minWidth: 250,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "age",
    label: "Age",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "address", label: "Address", minWidth: 250 },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 200,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(_id, name, age, gender, address, phone) {
  return { _id, name, age, gender, address, phone };
}

const index = ({ patients }) => {
  useAuth(); // this will check if the user is authenticated else return login page

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const rows = [];
  const [data, setData] = useState(patients);

  // useEffect(() => {
  //   setSearchTerm(router.query.firstname);
  //   router.push(`/records?firstname=${router.query.firstname}`);
  //   router.query.firstname &&
  //     axios
  //       .get(`http://localhost:3001/search?firstname=${router.query.firstname}`)
  //       .then((response) => setData(response.data))
  //       .catch((error) =>
  //         console.log("network or server error: " + error.message)
  //       );
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/records?firstname=${searchTerm}`);
    const searchData = axios
      .get(`http://localhost:3001/search?firstname=${searchTerm}`)
      .then((response) => setData(response.data))
      .catch((error) =>
        console.log("network or server error: " + error.message)
      );
  };

  data.map((patient) => {
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

  // modal
  const openModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Registration",
      html:
        '<div class="medicine__container"><label class="medicine__name">First Name</label><input id="swal-input1" class="swal2-input" placeholder="First Name" required type="text"></div>' +
        '<div class="medicine__container"><label class="medicine__name">Last Name</label><input id="swal-input2" class="swal2-input" placeholder="Last Name" required type="text"></div>' +
        '<div class="medicine__container"><label class="medicine__name">Age</label><input id="swal-input3" class="swal2-input" placeholder="Age" required type="number"></div>' +
        '<div class="medicine__container"><label>Address</label><input id="swal-input4" class="swal2-input" placeholder="Address" required type="text"></div>' +
        '<div class="medicine__container"><label>Phone</label><input id="swal-input5" class="swal2-input" placeholder="+63..." required type="tel"></div>' +
        '<div class="medicine__container"><label>Gender</label><select id="swal-input6" class="swal2-input medicine__input" placeholder="Gender" type="select"><option value="Male">Male</option><option value="Female">Female</option></select></div>',
      // '<div class="medicine__container"><label>Select Service</label><select id="swal-input7" class="swal2-input medicine__input" placeholder="Select Service" type="select"><option value="Immunization">Immunization</option><option value="Vaccine">Vaccine</option><option value="Prenatal">Prenatal</option></select></div>' +
      // '<div class="medicine__container"><label>Schedule</label><input id="swal-input8" class="swal2-input medicine__input" placeholder="Schedule" type="date" min="2000-01-02"></div>',
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
          document.getElementById("swal-input6").value,
          // document.getElementById("swal-input5").value,
          // document.getElementById("swal-input5").value,
        ];
      },
    });

    // const res = JSON.stringify(formValues);
    formValues &&
      axios
        .post("http://localhost:3001/patient/register", {
          ...formValues,
        })
        .then(() => {
          Swal.fire("Success!", `Patient has been added!`, "success");
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <Box>
      <Meta
        title="Capstone | Records"
        description="check patients recors here"
        keywords="Capstone project, health center, baranggay"
      />
      <Navbar />
      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content}>
          <Box className={styles.patients}>
            <Box className={recordStyles.search}>
              <Typography variant="h5" component="h5" color="#B82623">
                Records
              </Typography>

              <Box className={recordStyles.input_search}>
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="Search Patient"
                    type="text"
                    name="Search Patient"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                  />
                </form>

                <Image
                  src={SearchIcon}
                  alt="search"
                  className={recordStyles.search__icon}
                />
              </Box>
            </Box>
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
              onClick={openModal}
            >
              <Image src={AddIcon} alt="add" />
              <span> Register Patient</span>
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
    const res = await fetch(`http://localhost:3001/search?firstname=`);
    const results = await res.json();

    return {
      props: {
        patients: results,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
