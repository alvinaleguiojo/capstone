import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Meta from "../../component/Meta";
import Tabs from "../../component/Tabs";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import styles from "../../styles/RequestMedicine.module.css";
import { Button } from "@mui/material";
import RequestCard from "../../component/RequestCard";
import SearchPatient from "../../component/SearchPatient";
import Swal from "sweetalert2";
import Link from "next/link";
import axios from "axios";
import { format } from "date-fns";
import { Steps, Divider, Breadcrumb } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteMedicineRequest } from "../../features/Medicines";

const Request = () => {
  // medicines data from redux
  const router = useRouter();
  const medicinesList = useSelector((state) => state.medicines.value);
  const [searchModal, setSearchModal] = useState(false);
  const [patient, setPatient] = useState(null);
  const [patientID, setPatientID] = useState(null);
  const [note, setNote] = useState(null);

  // initialize the dispatch action
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch Patient dat from local storage
    const Patient = JSON.parse(localStorage.getItem("Patient"));
    setPatient(Patient);
    Patient && setPatientID(Patient.PatientID);
  }, [router]);

  const PatientSearchModal = async () => {
    const ipAPI = `${process.env.BaseURI}/all_patients`;

    const inputValue = fetch(ipAPI)
      .then((response) => response.json())
      .then((data) => console.log(data));

    const { value: patient } = await Swal.fire({
      title: "Patient ID",
      input: "text",
      inputValue: inputValue,
      showCancelButton: true,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (value) {
          return "You need to write something!";
        }
      },
    });

    if (patient) {
      Swal.fire(`Patient Name is ${patient}`);
    }
  };

  const handleReleaseMedicine = async () => {
    await medicinesList.map((medicine) =>
      dispatch(deleteMedicineRequest({ id: medicine.MedicineID }))
    );

    const PatientID = patientID;
    try {
      const releaseNew = await axios.post(
        `${process.env.BaseURI}/medicine/release`,
        {
          medicinesList,
          PatientID,
          note,
        }
      );
      releaseNew &&
        Swal.fire("Sucess!", "Medicine has been released", "success").then(
          () => {
            router.push(`/patients/${patient.PatientID}`);
          }
        );
    } catch (error) {
      console.log(error);
    }
    setNote("");
    localStorage.removeItem("Patient");
  };

  return (
    <Box>
      <Meta
        title="Capstone | Request Medicines"
        description="Request Medicines"
        keywords="Capstone project, health center, baranggay"
      />

      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content}>
          <Box className={styles.request}>
            <Box className={styles.left__container}>
              <Breadcrumb>
                <Breadcrumb.Item
                  onClick={() => router.push("/medicines")}
                  style={{ cursor: "pointer", color: "black" }}
                >
                  Back to Medicines List
                </Breadcrumb.Item>
                <Breadcrumb.Item style={{ color: "grey" }}>
                  Selected Item{medicinesList.length > 1 && "s"}
                </Breadcrumb.Item>
              </Breadcrumb>
              <Box className={styles.cards}>
                {medicinesList.map((medicine, index) => (
                  <div key={medicine.MedicineID}>
                    <RequestCard data={medicine} />
                  </div>
                ))}
              </Box>
              {medicinesList.length <= 0 && (
                <div>
                  <h3>No medicine selected</h3>
                  {/* <Link href="/medicines">
                    Click here to go back Medicine list
                  </Link> */}
                </div>
              )}
            </Box>

            <Box className={styles.right__container}>
              <Box className={styles.header}>
                <Box>
                  <Typography variant="h6" component="h6">
                    Total Item{medicinesList.length > 1 && "s"}
                  </Typography>
                  <Typography variant="h6" component="h6" color="#b82623">
                    {medicinesList.length}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h6" component="h6">
                    Date
                  </Typography>
                  <Typography variant="h6" component="h6" color="#b82623 ">
                    {format(new Date(), "MMMM dd, yyyy")}
                  </Typography>
                </Box>
              </Box>
              <Box style={{ marginBottom: "10px" }}>
                <form className={styles.form}>
                  <label>Patient Name</label>
                  <Button
                    className={styles.add__patient}
                    // onClick={() => PatientSearchModal()}
                    onClick={() => router.push("/patients")}
                    disabled={patient && true}
                    style={{ textAlign: "left" }}
                  >
                    {patient
                      ? patient.FirstName + " " + patient.LastName
                      : "Add Patient"}
                  </Button>

                  <label>Additional Notes</label>
                  <textarea
                    type="text"
                    placeholder="Additional Notes"
                    value={note || ""}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </form>
              </Box>
              <Button
                variant="contained"
                disabled={medicinesList.length <= 0 && true}
                onClick={() => handleReleaseMedicine()}
                style={{
                  backgroundColor: medicinesList.length > 0 && "#b82623",
                  color: medicinesList.length > 0 && "white",
                }}
              >
                Release
              </Button>
            </Box>
            {searchModal && <SearchPatient />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Request;
