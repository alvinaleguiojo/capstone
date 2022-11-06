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
import InfiniteScroll from "react-infinite-scroll-component";
import ReactLoading from "react-loading";

const Index = ({ patients }) => {
  const router = useRouter();
  const [patientData, setPatientData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [previousPage, setPreviousPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const [theme, setTheme] = useState(false);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  // fetch patient Data

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    axios
      .get(
        `${process.env.BaseURI}/patients?page=${currentPage}&limit=6&LIKE=${searchTerm}`,
        { signal: abortController.signal }
      )
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          !searchTerm &&
            setPatientData((prev) => [...prev, ...response.data.results]);
          searchTerm && setPatientData(response.data.results);
        }, 1000);
      })
      .catch((error) => {
        if (!abortController.signal.aborted) {
          console.log(error.message);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [currentPage, searchTerm]);

  const handleScroll = () => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    if (
      scrollableDiv.offsetHeight + scrollableDiv.scrollTop + 1 >=
      scrollableDiv.scrollHeight
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const scrollableDiv = document.getElementById("scrollableDiv");
    scrollableDiv.addEventListener("scroll", handleScroll);
    return () => scrollableDiv.removeEventListener("scroll", handleScroll);
  }, []);

  // handling search terms
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
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
                  />
                  <Image
                    src={SearchIcon}
                    alt="search"
                    className={styles.search__icon}
                  />
                </Box>

                <div id="scrollableDiv" className={styles.scrollableDiv}>
                  {patientData.map((patient, key) => {
                    return (
                      <Box
                        key={key}
                        onClick={() =>
                          router.push(`/patients/${patient.PatientID}`)
                        }
                      >
                        <CardTemplate
                          //   loading={loading}
                          profilePicture={patient.Image}
                          Name={`${patient.FirstName} ${patient.LastName}`}
                          Address={`${patient.Street} ${patient.Baranggay} ${patient.City}`}
                          Phone={patient.Phone}
                        />
                      </Box>
                    );
                  })}
                  {loading && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ReactLoading type="balls" color="#d9dae0" />
                    </div>
                  )}
                </div>

                {patientData.length <= 0 && (
                  <Typography variant="h5" component="h5" color="#B82623">
                    No words or phrases found
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Index;

export const getStaticProps = async ({ context }) => {
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
