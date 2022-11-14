import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/image";
import styles from "../../styles/Dashboard.module.css";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "../../component/Tabs";
import useAuth from "../../customhook/Auth";
import axios from "axios";
import Meta from "../../component/Meta";
import adminBanner from "../../assets/image/adminBanner.svg";
import Skeleton from "@mui/material/Skeleton";
import Calendar from "react-calendar";
import waitingIcon from "../../assets/image/Waiting Room.svg";

import treatmentIcon from "../../assets/image/Treatment.svg";
import userIcon from "../../assets/image/User.svg";
import completedIcon from "../../assets/image/Task Completed.svg";
import cancelIcon from "../../assets/image/Cancel.svg";
import NoAppointments from "../../assets/image/NoAppointments.svg";
import ReactLoading from "react-loading";
import CustomCard from "../../component/CustomCard";

import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

import {
  DateRangePickerComponent,
  PresetsDirective,
  PresetDirective,
} from "@syncfusion/ej2-react-calendars";
import moment from "moment";

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

const Index = ({ Appointments, AllAppointments }) => {
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [calendar, setCalendar] = useState([]);
  const [appointments, setAppointments] = useState(Appointments || []);
  const [appointmentsDataSource, setAppointmentsDataSource] = useState({});
  const [completed, setCompleted] = useState(null);
  const [cancelled, setCancelled] = useState(null);
  const [patientsData, setPatients] = useState([]);
  const [AllAppointmentsData, setAllAppointmentsData] =
    useState(AllAppointments);
  const [ongoingPatient, setOngoingPatient] = useState([]);

  const hour = new Date().getHours();
  const dateFormat = "MMM/dd/yyyy";
  const weekFormat = "MM/DD";
  const monthFormat = "YYYY/MM";
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
  const customWeekStartEndFormat = (value) =>
    `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
      .endOf("week")
      .format(weekFormat)}`;

  //get users data from redux
  const user = useSelector((state) => state.user.value);

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

  useEffect(() => {
    const listOfPatients = patientsData.filter((value) => {
      const patientsCreatedDate = moment(value.CreatedDate).format(
        "YYYY-MM-DD"
      );
      console.log(patientsCreatedDate);
      return patientsCreatedDate;
    });
    console.log(listOfPatients);
  }, []);

  // filter the appointment and return the list of completed appointment
  useEffect(() => {
    const completedAppointment = appointments.filter((value) => {
      return value.Status == "Completed";
    });
    setCompleted(completedAppointment);

    const cancelledAppointment = appointments.filter((value) => {
      return value.Status == "Cancelled";
    });
    setCancelled(cancelledAppointment);
  }, [appointments]);

  // startDate.setDate(startDate.getDate() + 30);
  // endDate.setDate(endDate.getDate() + 30);

  const today = new Date(new Date().toDateString());

  // to get the current week days
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();
  const yesterday = moment().subtract(1, "days").calendar();
  const Mon = moment().day(1);
  let Monday = new Date(Mon);
  const MondayOrig = Monday;
  Monday = moment(Monday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Tue = moment().day(2);
  let Tuesday = new Date(Tue);
  const TuesdayOrig = Tuesday;
  Tuesday = moment(Tuesday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Wed = moment().day(3);
  let Wednesday = new Date(Wed);
  const WednesdayOrig = Wednesday;
  Wednesday = moment(Wednesday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Thu = moment().day(4);
  let Thursday = new Date(Thu);
  const ThursdayOrig = Thursday;
  Thursday = moment(Thursday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Fri = moment().day(5);
  let Friday = new Date(Fri);
  const FridayOrig = Friday;
  Friday = moment(Friday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Sat = moment().day(6);
  let Saturday = new Date(Sat);
  const SaturdayOrig = Saturday;
  Saturday = moment(Saturday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Weekdays = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday];

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

  useEffect(() => {
    // filtering all appointment that matches to monday
    const mondaysAppointment = AllAppointmentsData.filter((value) => {
      return (
        moment(value.Schedule).format("YYYY-MM-DD") ===
        moment(MondayOrig).format("YYYY-MM-DD")
      );
    });
    // filtering all mondaysAppointment that has completed status
    // setMondaysAppointment(mondaysAppointment);
    const mondaysCompeletedAppointment = mondaysAppointment.filter((value) => {
      return value.Status === "Completed";
    });
    const mondaysCancelledAppointment = mondaysAppointment.filter((value) => {
      return value.Status === "Cancelled";
    });

    const mondaysOngoingAppointment = mondaysAppointment.filter((value) => {
      return value.Status === "Ongoing";
    });
    setOngoingPatient(mondaysOngoingAppointment);
    console.log(mondaysOngoingAppointment);

    const mondaysCompletedCount = mondaysCompeletedAppointment.length;
    const mondaysCancelledCount = mondaysCancelledAppointment.length;
    /// end of mondays appointment

    // filtering all appointment that matches to Tuesday
    const tuesdayAppointment = AllAppointmentsData.filter((value) => {
      return (
        moment(value.Schedule).format("YYYY-MM-DD") ===
        moment(TuesdayOrig).format("YYYY-MM-DD")
      );
    });

    const tuesdayCompeletedAppointment = tuesdayAppointment.filter((value) => {
      return value.Status === "Completed";
    });
    const tuesdayCancelledAppointment = tuesdayAppointment.filter((value) => {
      return value.Status === "Cancelled";
    });
    const tuesdayCompletedCount = tuesdayCompeletedAppointment.length;
    const tuesdayCancelledCount = tuesdayCancelledAppointment.length;
    /// end of tuesday appointment

    // filtering all appointment that matches to Wednesday
    const wednesdayAppointment = AllAppointmentsData.filter((value) => {
      return (
        moment(value.Schedule).format("YYYY-MM-DD") ===
        moment(WednesdayOrig).format("YYYY-MM-DD")
      );
    });

    const wednesdayCompeletedAppointment = wednesdayAppointment.filter(
      (value) => {
        return value.Status === "Completed";
      }
    );
    const wednesdayCancelledAppointment = wednesdayAppointment.filter(
      (value) => {
        return value.Status === "Cancelled";
      }
    );
    const wednesdayCompletedCount = wednesdayCompeletedAppointment.length;
    const wednesdayCancelledCount = wednesdayCancelledAppointment.length;
    /// end of tuesday appointment

    // filtering all appointment that matches to Thursday
    const thursdayAppointment = AllAppointmentsData.filter((value) => {
      return (
        moment(value.Schedule).format("YYYY-MM-DD") ===
        moment(ThursdayOrig).format("YYYY-MM-DD")
      );
    });
    const thursdayCompeletedAppointment = thursdayAppointment.filter(
      (value) => {
        return value.Status === "Completed";
      }
    );
    const thursdayCancelledAppointment = thursdayAppointment.filter((value) => {
      return value.Status === "Cancelled";
    });

    const thursdayCompletedCount = thursdayCompeletedAppointment.length;
    const thursdayCancelledCount = thursdayCancelledAppointment.length;
    /// end of tuesday appointment

    // filtering all appointment that matches to Friday
    const fridaysAppointment = AllAppointmentsData.filter((value) => {
      return (
        moment(value.Schedule).format("YYYY-MM-DD") ===
        moment(FridayOrig).format("YYYY-MM-DD")
      );
    });

    const fridayCompeletedAppointment = fridaysAppointment.filter((value) => {
      return value.Status === "Completed";
    });
    const fridayCancelledAppointment = fridaysAppointment.filter((value) => {
      return value.Status === "Cancelled";
    });
    const fridayCompletedCount = fridayCompeletedAppointment.length;
    const fridayCancelledCount = fridayCancelledAppointment.length;
    /// end of tuesday appointment

    // filtering all appointment that matches to Saturday
    const saturdayAppointment = AllAppointmentsData.filter((value) => {
      return (
        moment(value.Schedule).format("YYYY-MM-DD") ===
        moment(SaturdayOrig).format("YYYY-MM-DD")
      );
    });

    const saturdayCompeletedAppointment = saturdayAppointment.filter(
      (value) => {
        return value.Status === "Completed";
      }
    );
    const saturdayCancelledAppointment = saturdayAppointment.filter((value) => {
      return value.Status === "Cancelled";
    });

    const saturdayCompletedCount = saturdayCompeletedAppointment.length;
    const saturdayCancelledCount = saturdayCancelledAppointment.length;
    /// end of tuesday appointment

    setAppointmentsDataSource({
      series: [
        {
          name: "Completed",
          data: [
            mondaysCompletedCount,
            tuesdayCompletedCount,
            wednesdayCompletedCount,
            thursdayCompletedCount,
            fridayCompletedCount,
            saturdayCompletedCount,
          ],
        },
        {
          name: "Cancelled",
          data: [
            mondaysCancelledCount,
            tuesdayCancelledCount,
            wednesdayCancelledCount,
            thursdayCancelledCount,
            fridayCancelledCount,
            saturdayCancelledCount,
          ],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        colors: ["#099880", "#b82623"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday],
        },
        yaxis: {
          // title: {
          //   text: "$ (thousands)",
          // },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            // formatter: function (val) {
            //   return "$ " + val + " thousands";
            // },
          },
        },
      },
    });
  }, [appointments]);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  // fetch Appointment with Date Range
  useEffect(() => {
    setLoading(true);
    try {
      const start = calendar[0];
      const end = calendar[1];
      const StartDate = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
      const EndDate = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;
      // StartDate.setDate(StartDate.getDate() + 30);
      // EndDate.setDate(EndDate.getDate() + 30);

      axios
        .get(
          `${process.env.BaseURI}/appointments_daterange?StartDate=${StartDate}&EndDate=${EndDate}`
        )
        .then((response) => {
          setAppointments(response.data.Appointments);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error.message);
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
      labels: ["Completed", "Cancelled"],
      datasets: [
        {
          label: "Completed",
          data: [3, 2, 10, 5, 8],
          borderColor: "rgb(8, 153, 129)",
          backgroundColor: "rgba(8, 153, 129)",
          // borderRadius: 20,
        },
        {
          label: "Cancelled",
          data: [3, 6, 14, 10, 3],
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
    }, 500);
  }, []);

  const handleToggleCalendar = () => {
    setToggleCalendar(!toggleCalendar);
  };

  // get value from date picker
  const getDateRange = (e) => {
    const selectedDateRange = e.value;
    setCalendar(selectedDateRange);
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
          {/* <Navbar /> */}
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
                      {"Good " +
                        ((hour < 12 && "Morning") ||
                          (hour < 18 && "Afternoon") ||
                          "Evening")}
                    </Typography>
                    <Typography variant="body2" component="h5">
                      Have a <span>healthy</span>{" "}
                      {(hour < 12 && "Morning") ||
                        (hour < 18 && "Afternoon") ||
                        "Evening"}
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
                      <Box key={appointment.AppointmentID}>
                        <CustomCard
                          name={appointment.LastName}
                          service={appointment.ServiceType}
                          AppointmentID={appointment.AppointmentID}
                          icon={waitingIcon}
                          status={appointment.Status}
                          color={appointment.Color}
                          loading={loading}
                          patientID={appointment.PatientID}
                        />
                      </Box>
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
                    Reports
                  </Typography>

                  <Box className={styles.monthly__filter}>
                    {/* <IconButton
                      width={10}
                      height={10}
                      onClick={() => handleToggleCalendar()}
                    >
                      <Image src={arrowDown} height={15} width={15} />
                    </IconButton> */}
                    {/* <DateRangePickerComponent
                      placeholder=" Select Date"
                      startDate={startDate}
                      endDate={endDate}
                      format="MMM-dd-yyyy"
                      change={getDateRange}
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
                    </DateRangePickerComponent> */}
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
                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="120px"
                      height="150px"
                      style={{ borderRadius: "10px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  ) : (
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
                        {ongoingPatient.length}
                      </Typography>
                    </Box>
                  )}

                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="120px"
                      height="150px"
                      style={{ borderRadius: "10px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  ) : (
                    <Box
                      className={
                        theme ? styles.report__card__dark : styles.report__card
                      }
                    >
                      <Image
                        src={userIcon}
                        title="icon"
                        height={50}
                        width={50}
                      />
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
                  )}

                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="120px"
                      height="150px"
                      style={{ borderRadius: "10px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  ) : (
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
                        {completed.length}
                      </Typography>
                    </Box>
                  )}

                  {loading ? (
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="120px"
                      height="150px"
                      style={{ borderRadius: "10px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  ) : (
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
                        {cancelled.length}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* line */}
                {/* <Box
                  width="50%"
                  height={3}
                  backgroundColor="#B82623"
                  alignSelf="center"
                ></Box> */}
                {/* line */}

                <Box className={styles.monthly__reports}>
                  {/* <Typography
                    variant="h6"
                    component="h6"
                    color="#B82623"
                    // className={styles.header__cell}
                    // width="100%"
                  >
                   This Week
                  </Typography> */}
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {loading ? (
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ReactLoading type="balls" color="#d9dae0" />
                    </Box>
                  ) : null}

                  {/* <Bar options={chartOptions} data={chartData} /> */}
                  {!loading ? (
                    <ApexCharts
                      options={appointmentsDataSource.options}
                      series={appointmentsDataSource.series}
                      type="bar"
                      height={300}
                      width={600}
                    />
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        router.push("/forbidden")
      )}
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=20, stale-while-revalidate=60"
  );

  try {
    const res = await fetch(`${process.env.BaseURI}/appointments/today`);
    const { Appointments } = await res.json();

    const resPatients = await fetch(`${process.env.BaseURI}/all_patients`);
    const { Patients } = await resPatients.json();

    const appointmentRes = await fetch(`${process.env.BaseURI}/appointments`);
    const { Appointments: AllAppointments } = await appointmentRes.json();

    return {
      props: {
        Patients,
        Appointments,
        AllAppointments,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
