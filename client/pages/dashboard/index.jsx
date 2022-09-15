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

import checkIcon from "../../assets/image/check.svg";
import clockIcon from "../../assets/image/clock.svg";
import waitingIcon from "../../assets/image/Waiting Room.svg";

import treatmentIcon from "../../assets/image/Treatment.svg";
import userIcon from "../../assets/image/User.svg";
import completedIcon from "../../assets/image/Task Completed.svg";
import cancelIcon from "../../assets/image/Cancel.svg";

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

const index = ({ user }) => {
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
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
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
  }, []);

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
          <Box className={contentStyles.content}>
            <Tabs />
            <Box className={reusableStyle.main__content}>
              {/* Left content starts here */}
              <Box className={styles.left__content}>
                <Box className={styles.banner}>
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
                  My Appointments
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
                    Date
                  </Typography>
                  <Typography
                    variant="body2"
                    component="h6"
                    className={styles.header__cell}
                  >
                    Time
                  </Typography>
                  <Typography
                    variant="body2"
                    component="h6"
                    className={styles.header__cell}
                  >
                    Status
                  </Typography>
                </Box>

                <Box className={styles.cards}>
                  <CustomCard
                    name="Maria Dela Cruz"
                    date="October 4, 2022"
                    time="10:00 AM"
                    icon={waitingIcon}
                    status="Waiting"
                  />
                  <CustomCard
                    name="Maria Dela Cruz"
                    date="October 4, 2022"
                    time="10:00 AM"
                    icon={clockIcon}
                    status="Ongoing"
                  />
                  <CustomCard
                    name="Maria Dela Cruz"
                    date="October 4, 2022"
                    time="10:00 AM"
                    icon={checkIcon}
                    status="Done"
                  />
                  <CustomCard
                    name="Maria Dela Cruz"
                    date="October 4, 2022"
                    time="10:00 AM"
                    icon={waitingIcon}
                    status="Waiting"
                  />
                </Box>
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
                      variant="caption"
                      component="h6"
                      color="#5A5959"
                      className={styles.header__cell}
                    >
                      Last Month
                    </Typography>
                    <IconButton width={10} height={10}>
                      <Image src={arrowDown} height={15} width={15} />
                    </IconButton>
                  </Box>
                </Box>
                <Box className={styles.report__cards}>
                  <Box className={styles.report__card}>
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
                      123
                    </Typography>
                  </Box>
                  <Box className={styles.report__card}>
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
                      123
                    </Typography>
                  </Box>
                  <Box className={styles.report__card}>
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
                  <Box className={styles.report__card}>
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

                  <Box className={styles.monthly__filter} width={100}>
                    <Typography
                      variant="caption"
                      component="h6"
                      color="#5A5959"
                      className={styles.header__cell}
                    >
                      Last Week
                    </Typography>
                    <IconButton width={10} height={10}>
                      <Image src={arrowDown} height={15} width={15} />
                    </IconButton>
                  </Box>
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

// export const getStaticProps = async () => {
//   try {
//     const res = await fetch(
//       `http://localhost:3001/user/631da8f3b25de833b38ae762`
//     );
//     const results = await res.json();

//     return {
//       props: {
//         user: results,
//       },
//     };
//   } catch (error) {
//     console.log("please check your internet connection", error);
//   }
// };
