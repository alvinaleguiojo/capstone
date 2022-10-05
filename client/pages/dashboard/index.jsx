import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "../../component/Tabs";
import useAuth from "../../customhook/Auth";
import Verification from "../../component/Verification";
import axios from "axios";
import { useRouter } from "next/router";
import Meta from "../../component/Meta";
import adminBanner from "../../assets/image/adminBanner.svg";
import Skeleton from "@mui/material/Skeleton";
import Calendar from "react-calendar";
import checkIcon from "../../assets/image/check.svg";
import clockIcon from "../../assets/image/clock.svg";
import waitingIcon from "../../assets/image/Waiting Room.svg";

import treatmentIcon from "../../assets/image/Treatment.svg";
import userIcon from "../../assets/image/User.svg";
import completedIcon from "../../assets/image/Task Completed.svg";
import cancelIcon from "../../assets/image/Cancel.svg";
import NoAppointments from "../../assets/image/NoAppointments.svg";

import arrowDown from "../../assets/image/arrowdown.svg";
import CustomCard from "../../component/CustomCard";
import { Button, IconButton } from "@mui/material";

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

const index = ({ Appointments }) => {
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [calendar, setCalendar] = useState(new Date());
  const [appointments, setAppointments] = useState(Appointments || []);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  // fetch Appointment with Date Range
  useEffect(() => {
    if (calendar.length > 0) {
      const start = calendar[0];
      const end = calendar[1];
      const StartDate = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
      const EndDate = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;

      axios
        .get(
          `http://localhost:3001/appointments_daterange?StartDate=${StartDate}&EndDate=${EndDate}`
        )
        .then((response) => {
          setAppointments(response.data.Appointments);
          console.log(response.data.Appointments);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [calendar]);

  // Setting Data for the charts
  useEffect(() => {
    // formatting the date of the appointments
    const schedules = appointments.map((appointment) => {
      const DateEntry = new Date(appointment.Schedule).toLocaleDateString(
        "en-us",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
      return DateEntry;
    });
    if (appointments.length <= 0) return;
    // Setting the chart data labels
    setChartData({ ...chartData, labels: schedules });
  }, [calendar]);

  // All appointments state
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const router = useRouter();
  const [userData, setUserData] = useState("");
  const [chartOptions, setChartOptions] = useState({});

  //All Appointments charts
  useEffect(() => {
    setChartData({
      labels: [],
      datasets: [
        {
          label: "Completed",
          data: [3, 2, 10, 5, 8, 6],
          borderColor: "rgb(8, 153, 129)",
          backgroundColor: "rgba(8, 153, 129)",
          // borderRadius: 20,
        },
        {
          label: "Cancel",
          data: [3, 6, 14, 10, 3, 7],
          borderColor: "rgb(184, 38, 35)",
          backgroundColor: "rgba(184, 38, 35)",
          // borderRadius: 40,
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
          display: false,
          text: "Appointments",
        },
      },
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleToggleCalendar = () => {
    setToggleCalendar(!toggleCalendar);
  };

  return (
    <>
      <Meta
        title="Capstone | Dashboard"
        description="User Dashboard"
        keywords="Capstone project, health center, baranggay"
      />
      {useAuth() ? (
        <Box className={styles.dashboard}>
          <Navbar />
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
              {/* Left content starts here */}
              <Box className={styles.left__content}>
                <Box className={theme ? styles.banner__dark : styles.banner}>
                  <Box>
                    <Typography variant="h6" component="h6" color="#B82623">
                      Good Morning <span>Dr.Dela Cruz</span>
                    </Typography>
                    <Typography variant="body2" component="h5">
                      Have a <span>healthy</span> morning
                    </Typography>
                  </Box>
                  <Image
                    className={styles.ImageBanner}
                    src={adminBanner}
                    alt="banner"
                  />
                </Box>
                <Typography
                  variant="h6"
                  component="h6"
                  color="#B82623"
                  paddingLeft="15px"
                >
                  Appointments
                </Typography>
                <Box className={styles.header}>
                  <Typography
                    variant="body2"
                    component="h6"
                    className={styles.header__cell}
                  >
                    Name
                  </Typography>
                  <Typography
                    variant="body2"
                    component="h6"
                    className={styles.header__cell}
                  >
                    Service
                  </Typography>
                  <Typography
                    variant="body2"
                    component="h6"
                    className={styles.header__cell}
                  >
                    ID Number
                  </Typography>
                  <Typography
                    variant="body2"
                    component="h6"
                    className={styles.header__cell}
                  >
                    Status
                  </Typography>
                </Box>
                {/* List of Appointments  */}
                <Box className={styles.cards}>
                  {appointments.map((appointment) => {
                    return (
                      <>
                        {loading ? (
                          <Skeleton
                            animation="wave"
                            style={{ width: "100%", padding: "20px" }}
                          />
                        ) : (
                          <CustomCard
                            name={appointment.LastName}
                            date={appointment.ServiceType}
                            AppointmentID={appointment.AppointmentID}
                            icon={waitingIcon}
                            status={appointment.Status}
                          />
                        )}
                      </>
                    );
                  })}
                </Box>

                {/* List of Appointments  */}

                {appointments.length <= 0 && (
                  <>
                    <Image
                      // className={styles.ImageBanner}
                      src={NoAppointments}
                      alt="banner"
                    />
                    <h3 style={{ textAlign: "center", color: "#B82623" }}>
                      No Available Appointments
                    </h3>
                  </>
                )}
              </Box>

              <Box className={styles.right__content}>
                <Box className={styles.monthly__reports}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="#B82623"
                    className={styles.header__cell}
                  >
                    Monthly Reports
                  </Typography>

                  <Box className={styles.monthly__filter} width={100}>
                    <Typography
                      variant="body1"
                      component="h6"
                      color="#5A5959"
                      className={styles.header__cell}
                    >
                      Calendar
                    </Typography>
                    <IconButton
                      width={10}
                      height={10}
                      onClick={() => handleToggleCalendar()}
                    >
                      <Image src={arrowDown} height={15} width={15} />
                    </IconButton>
                  </Box>

                  {/* calendar  */}
                  {toggleCalendar && (
                    <Box className={styles.calendar}>
                      <Calendar
                        selectRange={true}
                        onChange={setCalendar}
                        value={calendar}
                        // minDate={new Date()}
                        // tileDisabled={({ date }) => !date.getDay("Sunday")}
                      />
                    </Box>
                  )}
                </Box>
                <Box className={styles.report__cards}>
                  <Box
                    className={
                      theme ? styles.report__card__dark : styles.report__card
                    }
                  >
                    <Image src={treatmentIcon} title="icon" />
                    <Typography
                      variant="caption"
                      component="h6"
                      color="#5A5959"
                    >
                      Patients
                    </Typography>

                    <Typography
                      variant="h4"
                      component="h4"
                      style={{
                        backgroundColor: "#B82623",
                        width: "100%",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      {appointments.length}
                    </Typography>
                  </Box>
                  <Box
                    className={
                      theme ? styles.report__card__dark : styles.report__card
                    }
                  >
                    <Image src={userIcon} title="icon" height={50} width={50} />
                    <Typography
                      variant="caption"
                      component="h6"
                      color="#5A5959"
                    >
                      Appointments
                    </Typography>

                    <Typography
                      variant="h4"
                      component="h4"
                      style={{
                        textAlign: "center",
                        color: "#B82623",
                      }}
                    >
                      {appointments.length}
                    </Typography>
                  </Box>
                  <Box
                    className={
                      theme ? styles.report__card__dark : styles.report__card
                    }
                  >
                    <Image src={completedIcon} title="icon" />
                    <Typography
                      variant="caption"
                      component="h6"
                      color="#5A5959"
                    >
                      Completed
                    </Typography>

                    <Typography
                      variant="h4"
                      component="h4"
                      style={{
                        textAlign: "center",
                        color: "#B82623",
                      }}
                    >
                      123
                    </Typography>
                  </Box>
                  <Box
                    className={
                      theme ? styles.report__card__dark : styles.report__card
                    }
                  >
                    <Image src={cancelIcon} title="icon" />
                    <Typography
                      variant="caption"
                      component="h6"
                      color="#5A5959"
                    >
                      Cancelled
                    </Typography>

                    <Typography
                      variant="h4"
                      component="h4"
                      style={{
                        textAlign: "center",
                        color: "#B82623",
                      }}
                    >
                      123
                    </Typography>
                  </Box>
                </Box>

                {/* line */}
                <Box
                  width="50%"
                  height={3}
                  backgroundColor="#B82623"
                  alignSelf="center"
                ></Box>
                {/* line */}

                <Box className={styles.monthly__reports}>
                  <Typography
                    variant="h6"
                    component="h6"
                    color="#B82623"
                    // className={styles.header__cell}
                    // width="100%"
                  >
                    Number of Patients
                  </Typography>
                </Box>
                <Box width="100%">
                  <Bar options={chartOptions} data={chartData} />
                </Box>
              </Box>

              <Verification />
            </Box>
          </Box>
        </Box>
      ) : (
        router.push("/forbidden")
      )}
    </>
  );
};

export default index;

export const getStaticProps = async () => {
  try {
    const res = await fetch(`http://localhost:3001/appointments/today`);
    const { Appointments } = await res.json();

    return {
      props: {
        Appointments,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
