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
    id: "lastcheck",
    label: "Last Check-up",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Patient's Name",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Phone Number",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "status",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(_id, service_type, lastcheck, name, phone, address) {
  return { _id, service_type, lastcheck, name, phone, address };
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
