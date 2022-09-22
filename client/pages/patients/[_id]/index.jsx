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

const PatientProfile = ({ patient, Appointments }) => {
  const [sendMessage, setSendMessage] = useState("");
  const router = useRouter();
  const id = router.query._id;

  // pushing patients data to array
  const rows = [];
  Appointments.map((appointment) => {
    return rows.push(createData(appointment.ServiceType, appointment.Schedule));
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
      labels: ["Monday", "Wednesday", "Friday"],
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
      labels: ["Monday", "Wednesday", "Friday"],
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
      labels: ["Monday", "Wednesday", "Friday"],
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
            <Navbar />
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
                    <Image src={UserIcon} alt="user profile" />
                    <Typography
                      variant="h5"
                      component="h5"
                      color="#B82623"
                      style={{ textAlign: "center" }}
                    >
                      {patientData.FirstName + " " + patientData.LastName}
                    </Typography>
                    <Box className={styles.getStartedBtn} variant="contained">
                      <Link
                        className={styles.getStartedLink}
                        href={`/patients/${patientData.PatientID}/appointment`}
                      >
                        Add New Appointment
                      </Link>
                    </Box>

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
                          {patientData.Address}
                        </Typography>
                      </Box>
                      {/* card end here */}
                    </Box>
                  </Box>
                </Box>
                {/* left container starts here */}

                {/* right container starts here */}
                <Box className={styles.right__container}>
                  <Box
                    className={styles.print__button}
                    style={{ height: "30px", width: "100px", alignSelf: "end" }}
                  >
                    <Link href={`/patients/${patientData.PatientID}/pdf`}>
                      <Image
                        src={PrintIcon}
                        alt="print"
                        height={30}
                        width={30}
                      />
                    </Link>
                  </Box>
                  {/* Charts starts here*/}
                  <Box className={styles.chart__cards}>
                    <Box className={styles.chart__card}>
                      <Bar options={chartOptions} data={chartData} />
                    </Box>
                    <Box className={styles.chart__card}>
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
                    </Box>
                  </Box>
                  {/* Charts Ends here*/}

                  {/* patients records */}
                  <Box className={styles.patient__records}>
                    <Box className={styles.patient__records__title}>
                      <Typography variant="body" component="h4" color="#B82623">
                        Patient&apos;s Records
                      </Typography>
                      <GridTable
                        rows={rows}
                        columns={columns}
                        path="patients"
                        maxHeight={380}
                        firstRow={2}
                        rowPerPage={[2]}
                      />
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

export default PatientProfile;

export async function getStaticPaths() {
  try {
    const res = await fetch("http://localhost:3001/patients");
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

    const Allres = await fetch("http://localhost:3001/appointments");
    const { Appointments } = await Allres.json();

    return {
      props: {
        patient,
        Appointments,
      },
    };
  } catch (err) {
    console.log("Fetching data error or please your internet connection", err);
  }
}
