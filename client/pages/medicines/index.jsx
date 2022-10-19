import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../../component/Navbar";
import Image from "next/image";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import GridTable from "../../component/GridTable";
import Meta from "../../component/Meta";
import styles from "../../styles/Patients.module.css";
import MedicineStyles from "../../styles/Medicines.module.css";
import recordStyles from "../../styles/Records.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "../../assets/image/search.svg";
import AddIcon from "../../assets/image/plus-circle.svg";
import axios from "axios";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import useAuth from "../../customhook/Auth";
import MedicineCardTemplate from "../../component/MedicineCardTemplate";

const index = ({ Medicines }) => {
  useAuth(); // this will check if the user is authenticated else return login page

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(Medicines);
  const [loading, setLoading] = useState(false);

  return (
    <Box>
      <Meta
        title="Capstone | Medicines"
        description="add or update medicines here"
        keywords="Capstone project, health center, baranggay"
      />
      {/* <Navbar /> */}
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
                <Box className={MedicineStyles.AddMedicine}>
                  <Button onClick={() => router.push("/medicines/register")}>
                    Add New Medicine
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className={styles.search}>
              {/* Advance Search */}
              <input
                type="text"
                placeholder="Search for Medicine Name or Brand  "
                className={styles.search__input}
                // onChange={handleSearch}
              />
              <Image
                src={SearchIcon}
                alt="search"
                className={styles.search__icon}
              />
            </Box>

            {/* Medicine cards here */}
            {Medicines.map((request, index) => {
              return (
                <MedicineCardTemplate
                  key={index}
                  loading={loading}
                  id={request.id}
                  data={request}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default index;

export const getStaticProps = async () => {
  try {
    const res = await fetch(`http://localhost:3001/medicines`);
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
