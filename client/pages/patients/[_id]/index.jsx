import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Link from "next/link";
import styles from "../../../styles/Patients.module.css";
import Typography from "@mui/material/Typography";
import Meta from "../../../component/Meta";
import Navbar from "../../../component/Navbar";
import Image from "next/image";
import UserIcon from "../../../assets/image/User.svg";
import MessageIcon from "../../../assets/image/message-circle.svg";
import PrintIcon from "../../../assets/image/Print.svg";
import GridTable from "../../../component/GridTable";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LinearProgress from "@mui/material/LinearProgress";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import CustomWebcam from "../../../component/CustomWebcam";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// get all records from patient ID
const columns = [
  {
    id: "ServiceType",
    label: "Service Type",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Schedule",
    label: "Schedule",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Status",
    label: "Status",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(ServiceType, Schedule, Status) {
  return { ServiceType, Schedule, Status };
}

const PatientProfile = ({ patient, records, patientImage }) => {
  const [sendMessage, setSendMessage] = useState("");
  const router = useRouter();
  const id = router.query._id;
  const [loading, setLoading] = useState(true);

  // Record tab state
  const [value, setValue] = useState(0);

  // pushing patients data to array
  const rows = [];
  records.filter((record) => {
    const date = new Date(record.Schedule).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return (
      record.PatientID == id &&
      rows.push(createData(record.ServiceType, date, record.Status))
    );
  });

  // All appointments state
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  // All Cancalled appointment state
  const [chartDataCancelled, setChartDataCancelled] = useState({
    datasets: [],
  });

  // All Completed appointment state
  const [chartDataCompleted, setChartDataCompleted] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});
  const [chartOptionsCancelled, setChartOptionsCancelled] = useState({});
  const [chartOptionsCompleted, setChartOptionsCompleted] = useState({});

  //All Appointments
  useEffect(() => {
    setChartData({
      labels: ["June", "July", "August"],
      datasets: [
        {
          label: "All Appointments",
          data: [3, 6, 14],
          borderColor: "rgb(152, 189, 4)",
          backgroundColor: "rgba(152, 189, 4, 0.4)",
        },
      ],
    });
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Appointments",
        },
      },
    });
  }, []);

  //  cancelled data
  useEffect(() => {
    setChartDataCancelled({
      labels: ["June", "July", "August"],
      datasets: [
        {
          label: "All Cancelled",
          data: [8, 3, 14],
          borderColor: "rgb(184, 38, 35)",
          backgroundColor: "rgba(184, 38, 35, 0.4)",
        },
      ],
    });
    setChartOptionsCancelled({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Cancelled",
        },
      },
    });
  }, []);

  //  All Completed data
  useEffect(() => {
    setChartDataCompleted({
      labels: ["June", "July", "December"],
      datasets: [
        {
          label: "All Completed",
          data: [9, 6, 2],
          borderColor: "rgb(0, 191, 54)",
          backgroundColor: "rgba(0, 191, 54, 0.4)",
        },
      ],
    });
    setChartOptionsCompleted({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Completed",
        },
      },
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // send sms to patient open modal
  const handleMessageModal = async (phone) => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      allowOutsideClick: false,
    });

    if (text) {
      await axios
        .post("http://localhost:3001/sendMessagetoPatient", {
          text,
          phone,
        })
        .then((response) => {
          Swal.fire("Success!", "Appointment has been set!", "success");
        })
        .catch((err) =>
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            // footer: '<a href="">Why do I have this issue?</a>',
          })
        );
    }
    if (text == "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        // footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  // request medicine and pass this patient to medicine cart
  const handleRequest = () => {
    localStorage.setItem("requestedMedicine", JSON.stringify(patient));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {patient.map((patientData, key) => {
        return (
          <Box key={patientData.PatientID}>
            <Meta
              title="Capstone | Patient"
              description="add or update medicines here"
              keywords="Capstone project, health center, baranggay"
            />
            {/* <Navbar /> */}
            <Box
              className={styles.patientProfile}
              style={{ backgroundColor: "#dbdff3" }}
            >
              <Box className={styles.container}>
                {/* left container starts here */}
                <Box className={styles.left__main}>
                  <Box className={styles.backButton}>
                    <span
                      onClick={() => router.push("/patients")}
                      style={{ cursor: "pointer" }}
                    >
                      Back to Patients {">"}
                    </span>
                    <span style={{ color: "grey" }}>Profile</span>
                  </Box>
                  <Box className={styles.content}>
                    {/* <Typography variant="h5" component="h5" color="#B82623">
                    Patient&apos;s Profile
                  </Typography> */}
                    <Box className={styles.ProfileImageContainer}>
                      {patientImage !== null ? (
                        <Image
                          src={patientImage}
                          alt="user profile"
                          width={80}
                          height={80}
                          className={styles.patientImage}
                        />
                      ) : (
                        <Image src={UserIcon} alt="user profile" />
                      )}
                    </Box>

                    {/* <CustomWebcam/> */}
                    <Typography
                      variant="h5"
                      component="h5"
                      color="#B82623"
                      style={{ textAlign: "center" }}
                    >
                      {patientData.FirstName + " " + patientData.LastName}
                    </Typography>

                    <Box className={styles.cards}>
                      {/* gender here */}
                      <Box className={styles.card}>
                        <Typography
                          variant="caption"
                          component="h5"
                          color="#B82623"
                        >
                          Gender
                        </Typography>
                        <Typography
                          variant="body"
                          component="h4"
                          color="#B82623"
                        >
                          Male
                        </Typography>
                      </Box>
                      {/* gender end here */}

                      {/* contact number here */}
                      <Box className={styles.card}>
                        <Typography
                          variant="caption"
                          component="h5"
                          color="#B82623"
                        >
                          Contact Number
                        </Typography>

                        <Box
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="body"
                            component="h4"
                            color="#B82623"
                          >
                            {patientData.Phone}
                          </Typography>
                          <Button
                            onClick={() => {
                              handleMessageModal(patientData.Phone);
                            }}
                          >
                            <Image
                              src={MessageIcon}
                              alt="user profile"
                              height={25}
                              width={25}
                            />
                          </Button>
                        </Box>
                      </Box>
                      {/* contact end here */}

                      {/* address here */}
                      <Box className={styles.card}>
                        <Typography
                          variant="caption"
                          component="h5"
                          color="#B82623"
                        >
                          Address
                        </Typography>
                        <Typography
                          variant="body"
                          component="h4"
                          color="#B82623"
                        >
                          {patientData.Street +
                            " " +
                            patientData.Baranggay +
                            " " +
                            patientData.City}
                        </Typography>
                      </Box>
                      {/* card end here */}
                    </Box>
                  </Box>
                </Box>
                {/* left container starts here */}

                {/* right container starts here */}
                <Box className={styles.right__container}>
                  {/* right container header  */}
                  <Box className={styles.right__container__header}>
                    {/* <Button
                      className={styles.getStartedBtn}
                      variant="contained"
                      disabled={false}
                      onClick={handleRequest}
                    >
                      Request Medicine
                    </Button> */}
                    {/* <Box className={styles.getStartedBtn} variant="contained">
                      <Link
                        className={styles.getStartedLink}
                        href={`/patients/${patientData.PatientID}/appointment`}
                      >
                        Diagnosis
                      </Link>
                    </Box> */}
                    {/* <Box
                      className={styles.print__button}
                      style={{
                        height: "30px",
                        width: "100px",
                      }}
                    >
                      <Link href={`/patients/${patientData.PatientID}/pdf`}>
                        <Image
                          src={PrintIcon}
                          alt="print"
                          height={30}
                          width={30}
                        />
                      </Link>
                    </Box> */}
                  </Box>
                  {/* right container header end here */}

                  {/* Charts starts here*/}
                  <Box className={styles.chart__cards}>
                    {/* <Box className={styles.chart__card}>
                      <Bar options={chartOptions} data={chartData} />
                    </Box> */}
                    {/* <Box className={styles.chart__card}>
                      <Bar
                        options={chartOptionsCancelled}
                        data={chartDataCancelled}
                      />
                    </Box>
                    <Box className={styles.chart__card}>
                      <Bar
                        options={chartOptionsCompleted}
                        data={chartDataCompleted}
                      />
                    </Box> */}
                  </Box>
                  {/* Charts Ends here*/}

                  {/* patients records */}
                  <Box className={styles.patient__records}>
                    <Box className={styles.patient__records__title}>
                      <Typography variant="body" component="h4" color="#B82623">
                        Patient&apos;s Records
                      </Typography>
                      <Box className={styles.records__tabs}>
                        {/* <Typography
                          variant="body2"
                          component="h4"
                          color="#B82623"
                        >
                          Appointments
                        </Typography>
                        <Typography
                          variant="body2"
                          component="h4"
                          color="#B82623"
                        >
                          Requested Medicines
                        </Typography>

                        <Typography
                          variant="body2"
                          component="h4"
                          color="#B82623"
                          style={{ borderRight: "1px solid #B82623" }}
                        >
                          Diagnosis
                        </Typography> */}

                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              aria-label="basic tabs example"
                            >
                              <Tab label="Appointments" {...a11yProps(0)} />
                              <Tab
                                label="Requested Medicines"
                                {...a11yProps(1)}
                              />
                              <Tab label="Diagnosis" {...a11yProps(2)} />
                            </Tabs>
                          </Box>
                          {loading && (
                            <Box sx={{ width: "100%", color: "#b82623" }}>
                              <LinearProgress color="inherit" />
                            </Box>
                          )}

                          <TabPanel value={value} index={0}>
                            {!loading && (
                              <>
                                <GridTable
                                  rows={rows}
                                  columns={columns}
                                  path="patients"
                                  maxHeight={380}
                                  firstRow={2}
                                  rowPerPage={[2]}
                                />
                                <Box
                                  className={styles.getStartedBtn}
                                  variant="contained"
                                  onClick={() =>
                                    router.push(
                                      `/patients/${patientData.PatientID}/appointment`
                                    )
                                  }
                                >
                                  Add New Appointment
                                </Box>
                              </>
                            )}
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            {!loading && (
                              <>
                                <GridTable
                                  rows={rows}
                                  columns={columns}
                                  path="patients"
                                  maxHeight={380}
                                  firstRow={2}
                                  rowPerPage={[2]}
                                />
                                <Box
                                  className={styles.getStartedBtn}
                                  variant="contained"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "Patient",
                                      JSON.stringify(patientData)
                                    );
                                    router.push(`/medicines`);
                                  }}
                                >
                                  Request Medicine
                                </Box>
                              </>
                            )}
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            Diagnosis Records here
                          </TabPanel>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  {/* patients records */}
                </Box>
                {/* right container ends here */}
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

// Tabs Panel functions
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default PatientProfile;

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/all_patients");
    const { Patients } = await res.json();

    return {
      paths: Patients.map((patient) => {
        return { params: { _id: patient.PatientID.toString() } };
      }),
      fallback: false,
    };
  } catch (err) {
    console.log("Ops path in invaid!");
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`http://localhost:3001/patient/${params._id}`);
    const patient = await res.json();

    // Patient Records
    const patientRecords = await fetch(
      `http://localhost:3001/patient/profile/records/${params._id}`
    );
    const records = await patientRecords.json();

    // feth patient Image
    const patientImageID = await patient[0].ImageID.toString();
    const imageRes = await fetch(
      `http://localhost:3001/image/${patientImageID}`
    );
    const patientProfilePic = await imageRes.json();
    const patientImage = (await patientProfilePic[0].Image) || null;

    return {
      props: {
        patient,
        records,
        patientImage,
      },
    };
  } catch (err) {
    console.log(
      "Fetching data error or please check your internet connection",
      err
    );
  }
}
