import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../../component/Navbar";
import Tabs from "../../../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../../../styles/Content.module.css";
import styles from "../../../../styles/Appointment.module.css";
import reusableStyle from "../../../../styles/Reusable.module.css";
import Typography from "@mui/material/Typography";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Swal from "sweetalert2";
import Meta from "../../../../component/Meta";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { Divider, Breadcrumb } from "antd";
import * as XLSX from "xlsx";
import moment from "moment";

const Index = ({ patient, Services }) => {
  const [appointment, setAppointment] = useState({});
  const [calendar, setCalendar] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [exportData, setExportData] = useState([]);
  const today = moment(appointment.Schedule).format("MMMM-DD-YYYY");
  // router
  const router = useRouter();
  const routeID = router.query._id;

  useEffect(() => {
    console.log(appointment);
  }, [appointment]);

  useEffect(() => {
    let appointmentInput = Object.values(appointment).includes("");
    !appointmentInput &&
    Object.keys(appointment).length >= 3 &&
    calendar &&
    appointment.ServiceID
      ? setDisabled(false)
      : setDisabled(true);
  }, [appointment, calendar]);

  // set calendar and patientid to state value
  useEffect(() => {
    // calendar.setDate(calendar.getDate() + 31);
    // const date = `${calendar.getFullYear()}-${calendar.getMonth()}-${calendar.getDate()}`;
    setAppointment({
      ...appointment,
      Schedule: calendar,
      PatientID: parseInt(routeID),
    });
  }, [calendar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${process.env.BaseURI}/appointment/create`, {
        ...appointment,
      })
      .then((response) => {
        const exportDataToExcel = [
          {
            FirstName: patient[0].FirstName,
            LastName: patient[0].LastName,
            Schedule: today,
            Notes: appointment.Notes,
            ServiceID: appointment.ServiceID,
            AppointmentID: response.data.appointmentData.insertId,
          },
        ];

        exportDataToExcel && handleExport(exportDataToExcel);

        Swal.fire("Success!", "Appointment has been set!", "success").then(
          () => {
            setLoading(false);
            setTimeout(() => {
              setAppointment({
                ...appointment,
                Notes: "",
                Schedule: "",
                enabled: false,
                ServiceID: 0,
              });
              router.push(`/patients/${routeID}`);
            }, 2000);
          }
        );
      })
      .catch(() => {
        Swal.fire(
          "Error!",
          "Please select a schedule and service type",
          "error"
        );
        setLoading(false);
        setAppointment({
          ...appointment,
          Notes: "",
          Schedule: "",
          enabled: false,
          ServiceID: 0,
        });
      });

    setAppointment({
      ...appointment,
      Notes: "",
      Schedule: "",
      enabled: false,
      ServiceID: 0,
    });
  };

  const handleExport = (exportDataToExcel) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportDataToExcel);

    XLSX.utils.book_append_sheet(wb, ws, "Appointment");
    XLSX.writeFile(wb, "Appointment.xlsx");
  };

  return (
    <>
      {patient.map((patientData, key) => {
        return (
          <Box className={styles.appointment} key={key}>
            <Meta
              title="Capstone | Appointments"
              description="set an appointment to schedule your check-up"
              keywords="Capstone project, health center, baranggay"
            />
            {/* <Navbar /> */}
            <Box className={contentStyles.content}>
              <Tabs />
              <Box className={reusableStyle.main__content}>
                {/* left content starts here */}
                <Box className={styles.content__left}>
                  <Box className={styles.backButton}>
                    {/* <span
                      onClick={() => router.push(`/patients`)}
                      style={{ fontSize: "14px", cursor: "pointer" }}
                    >
                      Back to Patients {">"}
                    </span>
                    <span
                      onClick={() => router.push(`/patients/${routeID}`)}
                      style={{ fontSize: "14px", cursor: "pointer" }}
                    >
                      Profile {">"}
                    </span>
                    <span style={{ color: "grey", fontSize: "14px" }}>
                      Appointment
                    </span> */}
                    <Breadcrumb>
                      <Breadcrumb.Item
                        onClick={() => router.push("/patients")}
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        Back to Patients
                      </Breadcrumb.Item>
                      <Breadcrumb.Item
                        onClick={() =>
                          router.push(`/patients/${patientData.PatientID}`)
                        }
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        Profile
                      </Breadcrumb.Item>
                      <Breadcrumb.Item style={{ color: "grey" }}>
                        Set Appointment
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </Box>
                  <Typography variant="body2" component="h4" color="#585858">
                    First Name
                  </Typography>
                  <input
                    disabled={true}
                    className={reusableStyle.input}
                    type="text"
                    name="firstname"
                    value={appointment.firstname || patientData.FirstName}
                    maxLength={50}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        firstname: e.target.value,
                      })
                    }
                  />

                  <Typography variant="body2" component="h4" color="#585858">
                    Last Name
                  </Typography>
                  <input
                    disabled={true}
                    className={reusableStyle.input}
                    type="text"
                    name="lastname"
                    value={appointment.Lastname || patientData.LastName}
                    maxLength={50}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        lastname: e.target.value,
                      })
                    }
                  />

                  <Typography variant="body2" component="h4" color="#585858">
                    Address
                  </Typography>
                  <input
                    disabled={true}
                    className={reusableStyle.input}
                    type="text"
                    name="address"
                    value={
                      appointment.Street ||
                      patientData.Street +
                        " " +
                        patientData.Baranggay +
                        " " +
                        patientData.City
                    }
                    maxLength={250}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        address: e.target.value,
                      })
                    }
                  />

                  <Typography variant="body2" component="h4" color="#585858">
                    Phone Number
                  </Typography>
                  <input
                    disabled={true}
                    className={reusableStyle.input}
                    type="number"
                    name="phone"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    maxLength={11}
                    min={0}
                    value={appointment.phone || patientData.Phone}
                    onChange={(e) =>
                      setAppointment({ ...appointment, phone: e.target.value })
                    }
                  />

                  <Typography variant="body2" component="h4" color="#585858">
                    Note (Optional)
                  </Typography>
                  <textarea
                    style={{
                      maxWidth: "415px",
                      minWidth: "415px",
                      minHeight: "100px",
                      maxHeight: "110px",
                    }}
                    className={reusableStyle.input}
                    maxLength={250}
                    type="text"
                    name="purpose"
                    value={appointment.Notes}
                    onChange={(e) =>
                      setAppointment({ ...appointment, Notes: e.target.value })
                    }
                  />
                </Box>

                <Box className={styles.content__right}>
                  <Box className={styles.sunrise}>
                    <Typography variant="h5" component="h5" color="#585858">
                      Schedule: {format(calendar, "MMMM dd, yyyy")}
                    </Typography>
                  </Box>

                  {/* calendar start here */}
                  <Box className={styles.calendar}>
                    <Calendar
                      onChange={setCalendar}
                      value={appointment.calendar}
                      minDate={new Date()}
                      tileDisabled={({ date }) => !date.getDay("Sunday")}
                    />

                    <Typography variant="h5" component="h5" color="#585858">
                      Type of Service:
                    </Typography>

                    {Services.map((service) => (
                      <FormControlLabel
                        key={service.ServiceID}
                        control={
                          <Checkbox
                            value={appointment.enabled}
                            onChange={() => {
                              setAppointment({
                                ...appointment,
                                ServiceID: service.ServiceID,
                                // enabled: e.target.checked,
                                // ServiceType: service.ServiceType,
                              });
                            }}
                          />
                        }
                        label={service.ServiceType}
                      />
                    ))}

                    <LoadingButton
                      onClick={handleSubmit}
                      loading={loading}
                      variant="contained"
                      className={
                        disabled ? styles.disabled : styles.btn__appointment
                      }
                      disabled={disabled}
                    >
                      Set Appointment
                    </LoadingButton>
                  </Box>
                  {/* calendar end here */}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Index;

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.BaseURI}/all_patients`);
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
    const res = await fetch(`${process.env.BaseURI}/patient/${params._id}`);
    const patient = await res.json();

    const serviceResponse = await fetch(
      `${process.env.BaseURI}/services_enabled`
    );
    const { Services } = await serviceResponse.json();

    return {
      props: {
        patient,
        Services,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log("Fetching data error or please your internet connection", err);
  }
}
