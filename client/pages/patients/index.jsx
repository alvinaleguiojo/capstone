import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import styles from "../../styles/Patients.module.css";
import Meta from "../../component/Meta";
import Typography from "@mui/material/Typography";
import useAuth from "../../customhook/Auth";
import { Button } from "@mui/material";
import CardTemplate from "../../component/CardTemplate";
import SearchIcon from "../../assets/image/search.svg";
import axios from "axios";

const Index = ({ patients }) => {
  const router = useRouter();
  const [patientData, setPatientData] = useState(patients);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [theme, setTheme] = useState(false);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  useEffect(() => {
    router.query.q !== null &&
      router.query.q !== undefined &&
      setSearchTerm(router.query.q);
  }, [router]);

  // fetch patient Data

  useEffect(() => {
    axios
      .get(
        `${process.env.BaseURI}/patients?page=${currentPage}&limit=5&LIKE=${searchTerm}`
      )
      .then((response) => {
        setPreviousPage(response.data.previous);
        setPageNumber(response.data.next);
        setPatientData(response.data.results);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [currentPage, searchTerm]);

  // go back to previous page
  const PreviousPage = () => {
    setLoading(true);
    setCurrentPage(previousPage.page);
  };

  // to trigger the next page
  const NextPage = () => {
    setLoading(true);
    setCurrentPage(pageNumber.page);
  };

  // handling search terms
  const handleSearch = (e) => {
    setCurrentPage(1);
    setLoading(true);
    setSearchTerm(e.target.value);
  };

  // Remove Patient from the local storage
  const AddPatient = () => {
    localStorage.removeItem("image");
    localStorage.removeItem("patient");
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
          {/* <Navbar /> */}
          <Box
            className={theme ? contentStyles.DarkMode : contentStyles.content}
          >
            <Tabs />
            <Box
              className={
                theme
                  ? reusableStyle.main__content_dark
                  : reusableStyle.main__content
              }
            >
              <Box className={styles.patients}>
                <Box className={styles.content__header}>
                  <Typography variant="h5" component="h5" color="#B82623">
                    All Patients
                  </Typography>
                  <Button className={styles.addPatient} onClick={AddPatient}>
                    Add New Patient
                  </Button>
                </Box>

                <Box className={theme ? styles.search__dark : styles.search}>
                  {/* Advance Search */}
                  <input
                    type="text"
                    placeholder="Search for First Name, Last Name , Street, Barrangay and City"
                    className={
                      theme ? styles.search__input__dark : styles.search__input
                    }
                    onChange={handleSearch}
                    value={searchTerm || ""}
                  />
                  <Image
                    src={SearchIcon}
                    alt="search"
                    className={styles.search__icon}
                  />
                </Box>

                {/* fetch all patient data */}
                {patientData.map((patient, key) => {
                  return (
                    <Box
                      key={key}
                      onClick={() =>
                        router.push(`/patients/${patient.PatientID}`)
                      }
                    >
                      <CardTemplate
                        loading={loading}
                        profilePicture={patient.Image}
                        Name={`${patient.FirstName} ${patient.LastName}`}
                        Address={`${patient.Street} ${patient.Baranggay} ${patient.City}`}
                        Phone={patient.Phone}
                      />
                    </Box>
                  );
                })}
                {patientData.length <= 0 && (
                  <Typography variant="body1" component="h6" color="#B82623">
                    No results or phrases found
                  </Typography>
                )}

                <Box className={styles.pagination}>
                  <Button
                    className={currentPage <= 1 ? styles.disabled : styles.page}
                    onClick={PreviousPage}
                    disabled={currentPage <= 1 ? true : false}
                  >
                    Previous
                  </Button>

                  <Button
                    className={
                      patientData.length <= 4 ? styles.disabled : styles.page
                    }
                    onClick={NextPage}
                    disabled={patientData.length <= 4 ? true : false}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=20, stale-while-revalidate=60"
  );
  try {
    const res = await fetch(`${process.env.BaseURI}/patientswithimage`);
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
