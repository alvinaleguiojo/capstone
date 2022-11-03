import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Meta from "../../component/Meta";
import styles from "../../styles/Patients.module.css";
import MedicineStyles from "../../styles/Medicines.module.css";
import recordStyles from "../../styles/Records.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "../../assets/image/search.svg";
import axios from "axios";
import { Button } from "@mui/material";
import useAuth from "../../customhook/Auth";
import MedicineCardTemplate from "../../component/MedicineCardTemplate";

const Index = ({ Medicines }) => {
  useAuth(); // this will check if the user is authenticated else return login page

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(Medicines);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [data]);

  // fetch user data
  useEffect(() => {
    const StaffID = localStorage.getItem("StaffID");
    axios
      .get(`${process.env.BaseURI}/user/${StaffID}`)
      .then((response) => {
        setStaffData(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [router]);

  useEffect(() => {
    axios
      .get(
        `${process.env.BaseURI}/medicines?page=${currentPage}&limit=5&LIKE=${searchTerm}`
      )
      .then((response) => {
        setPreviousPage(response.data.previous);
        setPageNumber(response.data.next);
        setData(response.data.results);
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

  // hamdling search terms
  const handleSearch = (e) => {
    setCurrentPage(1);
    setLoading(true);
    setSearchTerm(e.target.value);
  };

  return (
    <Box>
      <Meta
        title="Capstone | Medicines"
        description="add or update medicines here"
        keywords="Capstone project, health center, baranggay"
      />

      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content}>
          <Box className={styles.patients}>
            <Box className={recordStyles.search}>
              {/* medicines tabs  */}
              <Box className={MedicineStyles.medicineTabs}>
                <Box className={MedicineStyles.tabs}>
                  <Box
                    className={
                      router.route == "/medicines"
                        ? MedicineStyles.active
                        : MedicineStyles.tab
                    }
                    onClick={() => router.push("/medicines")}
                  >
                    <Typography variant="h5" component="h5" color="#B82623">
                      Medicine Inventory
                    </Typography>
                  </Box>
                  <Box
                    className={
                      router.route == "/medicines/released"
                        ? MedicineStyles.active
                        : MedicineStyles.tab
                    }
                    onClick={() => router.push("/medicines/released")}
                  >
                    <Typography variant="h5" component="h5" color="#B82623">
                      Released Medicine
                    </Typography>
                  </Box>
                </Box>
                {staffData && staffData.Role === "BNS" && (
                  <Box className={MedicineStyles.AddMedicine}>
                    <Button
                      onClick={() => router.push("/medicines/register")}
                      style={{ color: "#b82623" }}
                    >
                      Add New Medicine
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={styles.search}>
              {/* Advance Search */}
              <input
                type="text"
                placeholder="Search for Medicine Name"
                className={styles.search__input}
                onChange={handleSearch}
              />
              <Image
                src={SearchIcon}
                alt="search"
                className={styles.search__icon}
              />
            </Box>

            {/* Medicine cards here */}
            {data.map((request, index) => {
              request.Availability == 1;
              return (
                <Box className={styles.medicine__list} key={request.MedicineID}>
                  <MedicineCardTemplate
                    key={index}
                    loading={loading}
                    id={request.id}
                    data={request}
                    staffData={staffData || []}
                  />
                </Box>
              );
            })}
            {data.length <= 0 && (
              <Typography variant="h5" component="h5" color="#B82623">
                No words or phrases found
              </Typography>
            )}

            <Box className={styles.pagination}>
              <Button
                className={styles.page}
                onClick={PreviousPage}
                disabled={currentPage <= 1 ? true : false}
              >
                Previous
              </Button>

              <Button
                className={styles.page}
                onClick={NextPage}
                disabled={data.length <= 1 ? true : false}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;

export const getStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.BaseURI}/medicineswithimage`);
    const { Medicines } = await res.json();

    return {
      props: {
        Medicines,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
