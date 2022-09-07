import React, { useState } from "react";
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

const columns = [
  {
    id: "_id",
    label: "Medicine's ID",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "service_type",
    label: "Medicine Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "lastcheck",
    label: "Stocks",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Released",
    minWidth: 170,
  },
  {
    id: "phone",
    label: "Remaining Stocks",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Medicine Type",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(_id, service_type, lastcheck, name, phone, address) {
  return { _id, service_type, lastcheck, name, phone, address };
}

const Released = ({ patients }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const rows = [];
  const [data, setData] = useState(patients);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/medicines/released?firstname=${searchTerm}`);
    const searchData = axios
      .get(`http://localhost:3001/search?firstname=${searchTerm}`)
      .then((response) => setData(response.data))
      .catch((error) =>
        console.log("network or server error: " + error.message)
      );
  };

  const MedicineModal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Released Medicine",
      html:
        '<div class="medicine__container"><label class="medicine__name">Name</label><input id="swal-input1" class="swal2-input" placeholder="Name"></div>' +
        '<div class="medicine__container"><label>Quantity</label><input id="swal-input2" class="swal2-input" placeholder="Quantity" type="number" min="1"></div>' +
        '<div class="medicine__container"><label>Date Arrived</label><input id="swal-input3" class="swal2-input medicine__input" placeholder="Data Arrived" type="date"></div>' +
        '<div class="medicine__container"><label>Expiry Date</label><input id="swal-input4" class="swal2-input medicine__input" placeholder="Expiry Date" type="date"></div>',
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
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
  };

  data.map((patient) => {
    return rows.push(
      createData(
        patient._id,
        patient.service_type,
        patient.schedule,
        patient.firstname + " " + patient.lastname,
        patient.phone,
        patient.address
      )
    );
  });

  return (
    <Box>
      <Meta
        title="Capstone | Medicines"
        description="add or update medicines here"
        keywords="Capstone project, health center, baranggay"
      />
      <Navbar />
      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content}>
          <Box className={styles.patients}>
            <Box className={recordStyles.search}>
              {/* medicines tabs  */}
              <Box className={MedicineStyles.medicineTabs}>
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

              <Box className={recordStyles.input_search}>
                <form onSubmit={handleSubmit}>
                  <input
                    placeholder="Search Medicines"
                    type="text"
                    name="Search Medicines"
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
              path="medicines"
              maxHeight={340}
              firstRow={10}
              rowPerPage={[10, 25, 50]}
            />
            <Button
              style={{ backgroundColor: "#dbdff3", color: "#b82623" }}
              onClick={MedicineModal}
            >
              <Image src={AddIcon} alt="add" />
              Released Medicine
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Released;

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
