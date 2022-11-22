import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Tabs from "../../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../../styles/Content.module.css";
import reusableStyle from "../../../styles/Reusable.module.css";
import Meta from "../../../component/Meta";
import styles from "../../../styles/Patients.module.css";
import MedicineStyles from "../../../styles/Medicines.module.css";
import recordStyles from "../../../styles/Records.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "../../../assets/image/search.svg";
import axios from "axios";
import { Button } from "@mui/material";
import useAuth from "../../../customhook/Auth";
import ReleasedMedicine from "../../../component/ReleasedMedicine";
import ReactLoading from "react-loading";

const Index = ({ Medicines }) => {
  useAuth(); // this will check if the user is authenticated else return login page

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(Medicines);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(0);
  const [previousPage, setPreviousPage] = useState(0);

  useEffect(() => {
    setSearchTerm(router.query.q);
  }, [router]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [data]);

  useEffect(() => {
    setLoading(true);
    const abortController = new AbortController();
    axios
      .get(
        `${process.env.BaseURI}/medicines/released?page=${currentPage}&limit=5&LIKE=${searchTerm}`,
        { signal: abortController.signal }
      )
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          !searchTerm && setData((prev) => [...prev, ...response.data.results]);
          searchTerm && setData(response.data.results);
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
    e.preventDefault();
    setCurrentPage(1);
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
                      Inventory
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
                      Released
                    </Typography>
                  </Box>
                  <Box
                    className={
                      router.route == "/medicines/reports"
                        ? MedicineStyles.active
                        : MedicineStyles.tab
                    }
                    onClick={() => router.push("/medicines/reports")}
                  >
                    <Typography variant="h5" component="h5" color="#B82623">
                      Reports
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.search}>
              {/* Advance Search */}
              <input
                type="text"
                placeholder="Search for Medicine Name or Patient Name"
                className={styles.search__input}
                onChange={handleSearch}
                value={searchTerm || ""}
              />
              <Image
                src={SearchIcon}
                alt="search"
                className={styles.search__icon}
              />
            </Box>

            {/* Medicine cards here */}
            <div id="scrollableDiv" className={styles.scrollableDiv}>
              {data.map((request, index) => {
                return (
                  <Box className={styles.medicine__list} key={index}>
                    <ReleasedMedicine
                      key={request.ReleasedID}
                      loading={loading}
                      data={request}
                    />
                  </Box>
                );
              })}
              {loading && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReactLoading
                    type="balls"
                    color="#d9dae0"
                    height={50}
                    width={50}
                  />
                </div>
              )}
            </div>
            {data.length <= 0 && (
              <Typography variant="body1" component="h6" color="#B82623">
                No results or phrases found
              </Typography>
            )}

            {/* <Box className={styles.pagination}>
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
                disabled={data.length <= 4 ? true : false}
              >
                Next
              </Button>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;

export const getServerSideProps = async () => {
  try {
    const res = await fetch(
      `${process.env.BaseURI}/medicines/released/nopagination`
    );
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
