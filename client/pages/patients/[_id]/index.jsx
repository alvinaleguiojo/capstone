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
import { format } from "date-fns";
import { Steps, Divider, Breadcrumb } from "antd";
const { Step } = Steps;
import Tooltip from "@mui/material/Tooltip";

import { useSelector, useDispatch } from "react-redux";

import {
  DateRangePickerComponent,
  PresetsDirective,
  PresetDirective,
} from "@syncfusion/ej2-react-calendars";
import { IconButton } from "@mui/material";
import GridTableDiagnosis from "../../../component/GridTableDiagnosis";
import GridTableReleased from "../../../component/GridTableReleased";
import { borderRadius } from "@mui/system";

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

// get all diagnosis from patient ID
const diagnosiscolumns = [
  {
    id: "Diagnose",
    label: "Diagnose",
    width: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Date",
    label: "Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Notes",
    label: "Additional Notes",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

// Released Medicines
const releasedMedicinesColumns = [
  {
    id: "Name",
    label: "Medicine Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Quantity",
    label: "Quantity",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ReleasedDate",
    label: "Released Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "ExpiryDate",
    label: "Expiry Date",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(AppointmentID, ServiceType, Schedule, Status) {
  return { AppointmentID, ServiceType, Schedule, Status };
}

function createDataMedicines(Name, Quantity, ReleasedDate, ExpiryDate) {
  return { Name, Quantity, ReleasedDate, ExpiryDate };
}

function createDiagnosisData(DiagnosisID, Diagnose, Date, Notes) {
  return { DiagnosisID, Diagnose, Date, Notes };
}

const PatientProfile = ({
  patient,
  Diagnosis,
  records,
  patientImage,
  Medicines,
  History,
}) => {
  const [sendMessage, setSendMessage] = useState("");
  const [medicinesData, setMedicinesData] = useState(Medicines);
  const [appointmentsData, setAppointmentsData] = useState(records);
  const [diagnosisData, setDiagnosisData] = useState(Diagnosis);
  const router = useRouter();
  const id = router.query._id;
  const [loading, setLoading] = useState(true);
  const [staffData, setStaffData] = useState(null);
  const [diagnosisID, setDiagnosisID] = useState(null);

  // date picker state
  const [calendar, setCalendar] = useState([]);

  //get users data from redux
  // const user = useSelector((state) => state.user.value);

  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log("onChange:", current);
    setCurrent(value);
  };

  //  date picker custom dates starts here
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay() - 1
  );
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay() - 1
  );

  const today = new Date(new Date().toDateString());
  const weekStart = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 7) % 7))
    ).toDateString()
  );
  const weekEnd = new Date(
    new Date(
      new Date().setDate(
        new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 7) % 7)
          )
        ).getDate() + 6
      )
    ).toDateString()
  );
  const monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
  const monthEnd = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
    ).toDateString()
  );
  const lastStart = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
    ).toDateString()
  );
  const lastEnd = new Date(new Date(new Date().setDate(0)).toDateString());
  const yearStart = new Date(
    new Date(new Date().getFullYear() - 1, 0, 1).toDateString()
  );
  const yearEnd = new Date(
    new Date(new Date().getFullYear() - 1, 11, 31).toDateString()
  );
  //date picker custom dates ends here

  // Record tab state
  const [value, setValue] = useState(0);

  // pushing patients data to array
  const rows = [];
  appointmentsData.filter((record) => {
    const date = new Date(record.Schedule).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    record.PatientID == id &&
      rows.push(
        createData(
          record.AppointmentID,
          record.ServiceType,
          date,
          record.Status
        )
      );
  });

  // // Create row for diagnosis
  const diagnosisRows = [];
  diagnosisData.map((data) => {
    const date = new Date(data.Date).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return diagnosisRows.push(
      createDiagnosisData(data.DiagnosisID, data.Diagnose, date, data.Notes)
    );
  });

  // pushing patients data to array
  const medicinesRows = [];
  medicinesData.map((medicine) => {
    const ReleasedDate = new Date(medicine.ReleasedDate).toLocaleDateString(
      "en-us",
      {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    const ExpiryDate = new Date(medicine.ExpiryDate).toLocaleDateString(
      "en-us",
      {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
    return medicinesRows.push(
      createDataMedicines(
        medicine.Name,
        medicine.Quantity,
        ReleasedDate,
        ExpiryDate
      )
    );
  });

  // Fetch current user data
  useEffect(() => {
    const PatientID = localStorage.getItem("StaffID");
    axios
      .get(`${process.env.BaseURI}/user/${PatientID}`)
      .then((response) => {
        setStaffData(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [router]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [calendar]);

  // Promise data filtering by Date
  useEffect(() => {
    try {
      const start = calendar[0];
      const end = calendar[1];
      const StartDate = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
      const EndDate = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;

      const URLs = [
        `${process.env.BaseURI}/medicines/date/${router.query._id}?StartDate=${StartDate}&EndDate=${EndDate}`,
        `${process.env.BaseURI}/patient/appointments/${router.query._id}?StartDate=${StartDate}&EndDate=${EndDate}`,
      ];

      // map every url to the promise of the fetch
      let requests = URLs.map((url) => fetch(url));
      Promise.all(requests)
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        })
        .then((data) => {
          setMedicinesData(data[0].Medicines);
          setAppointmentsData(data[1]);
        })
        .catch((error) => console.log(error.message));
    } catch (error) {
      console.log(error.message);
    }
  }, [calendar]);

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
      try {
        await axios
          .post(`${process.env.BaseURI}/sendMessagetoPatient`, {
            text,
            phone,
          })
          .then(() => {
            Swal.fire("Success!", "Appointment has been set!", "success");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error.response.data.message}`,
              // footer: '<a href="">Why do I have this issue?</a>',
            });
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.message}`,
          // footer: '<a href="">Why do I have this issue?</a>',
        });
      }
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

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleDiagnosis = async () => {
    //setting up the heaaders
    const headers = {
      Authorization: `Bearer ${process.env.PDF_API_SECRET}`,
    };

    const patientName = `${patient[0].FirstName}  ${patient[0].LastName}`;
    const today = format(new Date(), "MMMM dd, yyyy");

    const { value: formValues } = await Swal.fire({
      title: "Diagnosis",
      html:
        `<div class="diagnosis"><div class="input__wrapper"><label>Patient's Name</label><span>${patientName}</span></div>` +
        `<div class="input__wrapper"><label>Date</label><span>${today}</span></div>` +
        `<div class="input__wrapper"><label>Physician</label><span>${
          staffData.FirstName + " " + staffData.LastName
        }</span></div>` +
        '<div class="input__wrapper"><label>Diagnosis</label><textarea id="swal-input1"></textarea></div>' +
        '<div class="input__wrapper"><label>Additional Notes</label><textarea id="swal-input2"></textarea></div></div>',
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          // if (value[0] !== '') {
          //   resolve()
          // } else {
          //   resolve('You need to select oranges :)')
          // }
        });
      },
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const PatientID = patient[0].PatientID;
      const StaffID = staffData.StaffID;
      const Diagnose = formValues[0];
      const Notes = formValues[1];
      let DiagnosisID = null;

      try {
        axios
          .post(`${process.env.BaseURI}/diagnosis/create`, {
            PatientID,
            StaffID,
            Diagnose,
            Notes,
          })
          .then((response) => {
            setDiagnosisID(response.data.DiagnosisID.insertId);
            DiagnosisID = response.data.DiagnosisID.insertId;

            // revalidate the path of the new created diagnoses
            axios
              .get(
                `${process.env.Revalidate_Path}/patients/${PatientID}&secret=${process.env.MY_SECRET_TOKEN}`
              )
              .then(() => {
                console.log("revalidated");
                axios
                  .get(
                    `${process.env.Revalidate_Path}/patients/${PatientID}/diagnosis/${DiagnosisID}&secret=${process.env.MY_SECRET_TOKEN}`
                  )
                  .then(() => {
                    console.log("revalidate the diagnosis path");
                  });
              })
              .catch(() => {
                console.log("error revalidation");
              });

            setDiagnosisData([
              {
                Diagnose,
                Date: today,
                Notes,
              },
              ...diagnosisData,
            ]);
            Swal.fire("Success!", "Diagnosis has been added!", "success");
          })
          .then(() => {
            axios
              .post(
                `${process.env.PDF_API_URL}/documents`,
                {
                  document: {
                    document_template_id: process.env.PDF_API_TemaplateID,
                    payload: {
                      Name: patientName,
                      Address: `${patient[0].Street} ${patient[0].Baranggay} ${patient[0].City}}`,
                      date: today,
                      diagnosis: Diagnose,
                      Physician: `${staffData.FirstName} ${staffData.LastName}`,
                    },
                    meta: {
                      clientId: "ABC1234-DE",
                      _filename: `${patientName}-medical-certificate.pdf`,
                    },
                    status: "pending",
                  },
                },
                { headers }
              )
              .then((response) =>
                axios
                  .post(`${process.env.BaseURI}/certificates/create`, {
                    DiagnosisID,
                    PDFLinkID: response.data.document.id,
                  })
                  .then()
                  .catch((error) => {
                    console.log(error);
                  })
              )
              .catch((error) => {
                console.log(error);
              });
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  // get value from date picker
  const getDateRange = (e) => {
    setLoading(true);
    setCalendar(e.value);
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
                    <Breadcrumb>
                      <Breadcrumb.Item
                        onClick={() => router.push("/patients")}
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        Back to Patients
                      </Breadcrumb.Item>
                      <Breadcrumb.Item style={{ color: "grey" }}>
                        Profile
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </Box>
                  <Box className={styles.content} style={{ minWidth: "330px" }}>
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
                      variant="body1"
                      component="h6"
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
                          <Tooltip title="Phone Number should start with +63">
                            <IconButton
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
                            </IconButton>
                          </Tooltip>
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
                  {/* patients records */}
                  <Box className={styles.patient__records}>
                    <Box className={styles.patient__records__title}>
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
                          Patient&apos;s Records
                        </Typography>
                        <DateRangePickerComponent
                          placeholder="Select Date"
                          startDate={startDate}
                          endDate={endDate}
                          format="MMM-dd-yyyy"
                          change={getDateRange}
                          width={190}
                        >
                          <PresetsDirective>
                            <PresetDirective
                              label="Today"
                              start={today}
                              end={today}
                            ></PresetDirective>

                            <PresetDirective
                              label="This Week"
                              start={weekStart}
                              end={weekEnd}
                            ></PresetDirective>
                            <PresetDirective
                              label="This Month"
                              start={monthStart}
                              end={monthEnd}
                            ></PresetDirective>
                            <PresetDirective
                              label="Last Month"
                              start={lastStart}
                              end={lastEnd}
                            ></PresetDirective>
                            <PresetDirective
                              label="Last Year"
                              start={yearStart}
                              end={yearEnd}
                            ></PresetDirective>
                          </PresetsDirective>
                        </DateRangePickerComponent>
                      </Box>
                      <Box className={styles.records__tabs}>
                        <Box sx={{ width: "100%" }}>
                          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              aria-label="basic tabs example"
                            >
                              <Tab label="Appointments" {...a11yProps(0)} />
                              <Tab label="Diagnosis" {...a11yProps(1)} />
                              <Tab
                                label="Released Medicines"
                                {...a11yProps(2)}
                              />
                              <Tab label="History" {...a11yProps(3)} />
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
                                  firstRow={4}
                                  rowPerPage={[4]}
                                  showModal={true}
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
                                  Add Appointment
                                </Box>
                              </>
                            )}
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            {!loading && (
                              <>
                                <GridTableDiagnosis
                                  rows={diagnosisRows}
                                  columns={diagnosiscolumns}
                                  path="diagnosis"
                                  maxHeight={380}
                                  firstRow={4}
                                  rowPerPage={[4]}
                                  // showModal={true}
                                  id={patientData.PatientID}
                                />
                                {staffData.Role == "MIDWIFE" ||
                                  (staffData.Role == "ADMIN" && (
                                    <Box
                                      className={styles.getStartedBtn}
                                      variant="contained"
                                      onClick={
                                        () => handleDiagnosis()
                                        // localStorage.setItem(
                                        //   "Patient",
                                        //   JSON.stringify(patientData)
                                        // );
                                        // router.push(`/medicines`);
                                      }
                                    >
                                      Add Diagnosis
                                    </Box>
                                  ))}
                              </>
                            )}
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            {!loading && (
                              <>
                                <GridTableReleased
                                  rows={medicinesRows}
                                  columns={releasedMedicinesColumns}
                                  path="/medicines/released"
                                  maxHeight={380}
                                  firstRow={4}
                                  rowPerPage={[4]}
                                />

                                {staffData.Role == "BNS" ||
                                  (staffData.Role == "ADMIN" && (
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
                                      Select Medicine
                                    </Box>
                                  ))}
                              </>
                            )}
                          </TabPanel>

                          <TabPanel value={value} index={3}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              {History.map((data, index) => {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      border: "1px solid #dbdff3",
                                      padding: "10px",
                                    }}
                                  >
                                    <h3>History</h3>
                                    <label>
                                      Medice Intake: {data.MedicineIntake}
                                    </label>
                                    <label>Allergies: {data.Allergies}</label>
                                    <label>
                                      Measles:{" "}
                                      {data.Measles === 1 ? "Yes" : "No"}
                                    </label>
                                    <label>
                                      Immunization:{" "}
                                      {data.Immunization === 1 ? "Yes" : "No"}
                                    </label>
                                    <label>
                                      Tuberculosis:{" "}
                                      {data.Tuberculosis === 1 ? "Yes" : "No"}
                                    </label>
                                  </div>
                                );
                              })}
                              {History.length <= 0 && <h4>No history</h4>}
                            </div>
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
    <Box
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
    </Box>
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
    const res = await fetch(`${process.env.BaseURI}/all_patients`);
    const { Patients } = await res.json();

    return {
      paths: Patients.map((patient) => {
        return { params: { _id: JSON.stringify(patient.PatientID) } };
      }),
      fallback: "blocking",
    };
  } catch (err) {
    console.log("Ops path in invaid!");
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`${process.env.BaseURI}/patient/${params._id}`);
    const patient = await res.json();

    // Patient Records
    const patientRecords = await fetch(
      `${process.env.BaseURI}/patient/profile/records/${params._id}`
    );
    const records = await patientRecords.json();

    // Get all released Medicines
    const releasedMedicines = await fetch(
      `${process.env.BaseURI}/medicines/${params._id}`
    );
    const { Medicines } = await releasedMedicines.json();

    // Patient Diagnosis
    const patientDiagnosis = await fetch(
      `${process.env.BaseURI}/patient/diagnosis/${params._id}`
    );
    const { Diagnosis } = await patientDiagnosis.json();

    // feth patient Image
    const patientImageID = await patient[0].ImageID.toString();
    const imageRes = await fetch(
      `${process.env.BaseURI}/image/${patientImageID}`
    );
    const patientProfilePic = await imageRes.json();
    const patientImage = (await patientProfilePic[0].Image) || null;

    const resHistory = await fetch(
      `${process.env.BaseURI}/patient/history/${params._id}`
    );
    const { History } = await resHistory.json();

    return {
      props: {
        patient,
        records,
        patientImage,
        Medicines,
        Diagnosis,
        History,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(
      "Fetching data error or please check your internet connection",
      err
    );
  }
}
