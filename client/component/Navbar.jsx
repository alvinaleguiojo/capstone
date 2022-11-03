import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.css";
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Today from "../assets/image/Today.svg";
import { format } from "date-fns";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, IconButton } from "@mui/material";
import CustomizedSwitches from "./CustomizedSwitches";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CSSTransition } from "react-transition-group";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomModal from "./CustomModal";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteMedicineRequest,
  addQuantity,
  deductQuantity,
} from "../features/Medicines";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import Link from "next/link";
import Tooltip from "@mui/material/Tooltip";

import { TransitionGroup } from "react-transition-group";
import Collapse from "@mui/material/Collapse";

// date validation and manipulation functions
import moment from "moment";

// user Verification
import Verification from "./Verification";

const Navbar = () => {
  const router = useRouter();
  const today = format(new Date(), "MMMM dd, yyyy");
  const [userData, setUserData] = useState([]);
  const { PatientID } = router.query;
  const [patientData, setPatientData] = useState();
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const userRole = [
    "Administrator",
    "Baranggay Nutritionist Scholar",
    "MidWife",
    "Baranggay Health Worker",
  ];

  // Display realtime date and time
  setInterval(() => {
    const currentDateTime = moment().format("MMMM DD YYYY, h:mm:ss a");
    setDateTime(currentDateTime);
  }, 1000);

  // get medicines data from redux
  const medicinesList = useSelector((state) => state.medicines.value);

  // state management for theme
  const [theme, setTheme] = useState(false);

  // Request Group Focus
  const [requestGroupFocus, setRequestGroupFocus] = useState(false);

  // Notification Group Focus
  const [notificationGroupFocus, setNotificationGroupFocus] = useState(false);

  // dropdown state
  const [open, setOpen] = useState(false);

  // fetch color scheme from local storage
  useEffect(() => {
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);

    // fetch Patient dat from local storage
    const Patient = JSON.parse(localStorage.getItem("Patient"));
    setPatientData(Patient);

    const StaffID = localStorage.getItem("StaffID");
    axios
      .get(`http://localhost:3001/user/${StaffID}`)
      .then((response) => {
        setStaffData(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [router]);

  const handleClickSettings = () => {
    setRequestGroupFocus(false);
    setNotificationGroupFocus(false);
    setOpen(!open);
  };

  // to open and close medicine list view
  const handleRequestMedicineFocus = () => {
    setOpen(false);
    setNotificationGroupFocus(false);
    setRequestGroupFocus(!requestGroupFocus);
  };

  const handleNotificationFocus = () => {
    setOpen(false);
    setRequestGroupFocus(false);
    setNotificationGroupFocus(!notificationGroupFocus);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [router]);

  return (
    <>
      <Verification />
      {loading && (
        <Box
          sx={{ width: "100%", color: "red" }}
          style={{ position: "absolute", zIndex: 5 }}
        >
          <LinearProgress color="inherit" />
        </Box>
      )}
      {router.route !== "/" &&
        router.route !== "/login" &&
        router.route !== "/register" && (
          <Box className={theme ? styles.DarkMode : styles.navbar}>
            <Box
              className={styles.logo}
              onClick={() => router.push("/dashboard")}
            ></Box>
            <Box className={styles.navbar__right}>
              <Box className={styles.user}>
                {/* <Image src={UserIcon} alt="user avatar" heigh={40} width={40} /> */}
                <Box className={styles.avatar}>
                  <Typography variant="h5" component="h5" color="#fff">
                    {staffData &&
                      staffData.FirstName.substring(0, 1).toUpperCase()}
                  </Typography>
                </Box>
                <Box className={styles.user__name}>
                  <Typography variant="h5" component="h5" color="#b82623">
                    {staffData && staffData.LastName.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" component="h5" color="#b82623">
                    {staffData && staffData.Role === "ADMIN" && userRole[0]}
                    {staffData && staffData.Role === "BNS" && userRole[1]}
                    {staffData && staffData.Role === "MIDWIFE" && userRole[2]}
                    {staffData && staffData.Role === "BHW" && userRole[3]}
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.line}></Box>

              <Box className={styles.date}>
                <Image src={Today} alt="drop down" heigh={40} width={40} />
                <Box className={styles.date__display}>
                  <Typography variant="h5" component="h5" color="#b82623">
                    Today
                  </Typography>

                  <Typography variant="caption" component="h5" color="#b82623">
                    {dateTime}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box className={styles.header__icons}>
              {medicinesList.length > 0 && staffData.Role === "BNS" && (
                <Box className={styles.request__count}>
                  <Typography variant="caption" component="h5" color="#fff">
                    {medicinesList.length >= 9 ? "9+" : medicinesList.length}
                  </Typography>
                </Box>
              )}
              {staffData && staffData.Role === "BNS" && (
                <Tooltip title="Medicine Cart">
                  <IconButton
                    onClick={handleRequestMedicineFocus}
                    style={{ backgroundColor: "#dbdff3" }}
                  >
                    <MedicalServicesIcon
                      fontSize="small"
                      className={
                        theme
                          ? styles.header__icon__dark
                          : requestGroupFocus
                          ? styles.header__icon_active
                          : styles.header__icon
                      }
                    />
                  </IconButton>
                </Tooltip>
              )}

              {requestGroupFocus && (
                <MedicineCart
                  medicines={medicinesList}
                  patientName={
                    patientData !== null && patientData !== undefined
                      ? patientData.FirstName + " " + patientData.LastName
                      : "  Add Patient to this request"
                  }
                />
              )}

              {/* {medicinesList.length > 0 && (
                <Box className={styles.notification__count}>
                  <Typography variant="caption" component="h5" color="#fff">
                    {medicinesList.length >= 9 ? "9+" : medicinesList.length}
                  </Typography>
                </Box>
              )} */}

              <Tooltip title="Notification">
                <IconButton
                  style={{ backgroundColor: "#dbdff3" }}
                  onClick={handleNotificationFocus}
                >
                  <svg
                    viewBox="0 0 28 28"
                    alt=""
                    className={
                      theme
                        ? styles.header__icon__dark
                        : notificationGroupFocus
                        ? styles.header__icon_active
                        : styles.header__icon
                    }
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path d="M7.847 23.488C9.207 23.488 11.443 23.363 14.467 22.806 13.944 24.228 12.581 25.247 10.98 25.247 9.649 25.247 8.483 24.542 7.825 23.488L7.847 23.488ZM24.923 15.73C25.17 17.002 24.278 18.127 22.27 19.076 21.17 19.595 18.724 20.583 14.684 21.369 11.568 21.974 9.285 22.113 7.848 22.113 7.421 22.113 7.068 22.101 6.79 22.085 4.574 21.958 3.324 21.248 3.077 19.976 2.702 18.049 3.295 17.305 4.278 16.073L4.537 15.748C5.2 14.907 5.459 14.081 5.035 11.902 4.086 7.022 6.284 3.687 11.064 2.753 15.846 1.83 19.134 4.096 20.083 8.977 20.506 11.156 21.056 11.824 21.986 12.355L21.986 12.356 22.348 12.561C23.72 13.335 24.548 13.802 24.923 15.73Z"></path>
                  </svg>
                </IconButton>
              </Tooltip>

              {notificationGroupFocus && <Notification />}

              <IconButton
                onClick={handleClickSettings}
                style={{ backgroundColor: "#dbdff3", marginRight: "5px" }}
              >
                <ArrowDropDownIcon
                  fontSize="small"
                  className={
                    theme
                      ? styles.header__icon__dark
                      : open
                      ? styles.header__icon_active
                      : styles.header__icon
                  }
                />
              </IconButton>
            </Box>
            {open && !router.query.settings && <DropdownMenu />}
            {router.query.settings && <CustomModal />}
          </Box>
        )}
    </>
  );
};

const MedicineCart = () => {
  const router = useRouter();

  // medicines data from redux
  const dispatch = useDispatch();
  const medicinesList = useSelector((state) => state.medicines.value);

  return (
    <Box className={styles.MedicineCart}>
      <Typography
        variant="h6"
        component="h6"
        color="#b82623"
        style={{ textAlign: "center" }}
      >
        Selected Medicines
      </Typography>

      {/* start cards here */}
      <Box className={styles.request__cards}>
        <TransitionGroup>
          {medicinesList.map(
            (medicine, index) =>
              index <= 7 && (
                <Collapse key={index}>
                  <Box className={styles.request__card}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Link href={`/medicines/${medicine.MedicineID}`}>
                        <Image
                          loader={() => medicine.Image}
                          src={medicine.Image}
                          height={60}
                          width={60}
                        />
                      </Link>
                      <Box>
                        <Typography
                          variant="Body1"
                          component="h5"
                          color="#b82623"
                        >
                          <Link href={`/medicines/${medicine.MedicineID}`}>
                            {medicine.Name}
                          </Link>
                        </Typography>
                        <Box className={styles.quantity}>
                          <span> Quantity:</span>
                          <IconButton
                            onClick={() =>
                              dispatch(
                                deductQuantity({ id: medicine.MedicineID })
                              )
                            }
                            disabled={medicine.Quantity === 1 && true}
                            className={styles.btn__quantity}
                          >
                            <IndeterminateCheckBoxIcon />
                          </IconButton>
                          {medicine.Quantity}
                          <IconButton
                            deductQuantity
                            onClick={() =>
                              dispatch(addQuantity({ id: medicine.MedicineID }))
                            }
                            className={styles.btn__quantity}
                          >
                            <AddBoxIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                    <IconButton
                      onClick={() =>
                        dispatch(
                          deleteMedicineRequest({ id: medicine.MedicineID })
                        )
                      }
                    >
                      <CloseIcon className={styles.request__card__remove} />
                    </IconButton>
                  </Box>
                </Collapse>
              )
          )}
        </TransitionGroup>

        <Box style={{ display: "flex", justifyContent: "center" }}>
          {medicinesList <= 0 && (
            <span style={{ textAlign: "center" }}>
              No medicine being request
            </span>
          )}
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button
            disabled={medicinesList.length <= 0 && true}
            onClick={() => router.push("/medicines/request")}
          >
            View All
          </Button>
        </Box>
      </Box>
      {/* end cards here.... */}
    </Box>
  );
};

function Notification() {
  const router = useRouter();
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    const StaffID = localStorage.getItem("StaffID");
    try {
      axios
        .get(`http://localhost:3001/staff/notifications/${StaffID}`)
        .then((response) => {
          console.log(response);
          setNotificationData(response.data.Notifications);
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [router]);

  return (
    <Box className={styles.Notification}>
      <h2>Notifications</h2>
      {notificationData.map((notification, index) => (
        <NotificationCard key={index} data={notification} />
      ))}
    </Box>
  );
}

function NotificationCard(props) {
  const router = useRouter();
  const dateNow = moment(props.data.Date).startOf("hour").fromNow();

  return (
    <Box
      className={styles.notificationCard}
      style={{
        backgroundColor: props.data.Unread == 0 ? "#fcf2f2" : "transparent",
        borderRadius: "5px",
        padding: "5px",
      }}
      onClick={() => router.push(`?${props.data.Route}`)}
    >
      <span>{props.data.Type}</span>
      <span>{props.data.Description}</span>
      <span>{dateNow + " ago"} </span>
    </Box>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const nodeRef = useRef(null);
  const router = useRouter();
  const [staffData, setStaffData] = useState(null);

  useEffect(() => {
    const StaffID = localStorage.getItem("StaffID");
    axios
      .get(`http://localhost:3001/user/${StaffID}`)
      .then((response) => {
        setStaffData(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [router]);

  function calculateHeight(el) {
    const height = el.offsetHeight + 30;
    setMenuHeight(height);
  }

  const handleLogout = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "grey",
      confirmButtonText: "Confirm",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("http://localhost:3001/logout", { withCredentials: true })
          .then(() => {
            setTimeout(() => {
              router.push("/login");
              Swal.fire(
                "Success!",
                "You are now in the Login Page.",
                "success"
              );
            }, 500);
          });
      }
    });
  };

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className={styles.menu__item}
        onClick={
          props.goToMenu === "logout"
            ? handleLogout
            : () =>
                (props.goToMenu && setActiveMenu(props.goToMenu)) ||
                props.goToMenu === "settings"
                  ? router.query._id
                    ? router.push(`${router.query._id}?settings=services`)
                    : router.push(`?settings=services`)
                  : () => props.goToMenu && setActiveMenu(props.goToMenu)
        }
      >
        <span className={styles.icon__button}>{props.leftIcon}</span>
        {props.children}
        <span className={styles.icon__button}>{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calculateHeight}
      >
        <div className={styles.menu}>
          <DropdownItem
            leftIcon={
              <IconButton style={{ backgroundColor: "#dbdff3" }}>
                <AccountCircleIcon fontSize="medium" />
              </IconButton>
            }
          >
            Profile
          </DropdownItem>
          {/* <DropdownItem
            leftIcon={
              <IconButton style={{ backgroundColor: "#dbdff3" }}>
                <DarkModeIcon fontSize="medium" />
              </IconButton>
            }
            goToMenu="theme"
          >
            Theme
          </DropdownItem> */}
          {staffData && staffData.Role.includes("ADMIN") && (
            <DropdownItem
              leftIcon={
                <IconButton style={{ backgroundColor: "#dbdff3" }}>
                  <SettingsIcon fontSize="medium" />
                </IconButton>
              }
              goToMenu="settings"
            >
             Management Settings
            </DropdownItem>
          )}

          <DropdownItem
            leftIcon={
              <IconButton style={{ backgroundColor: "#dbdff3" }}>
                <LogoutIcon fontSize="medium" />
              </IconButton>
            }
            goToMenu="logout"
          >
            Logout
          </DropdownItem>
        </div>
      </CSSTransition>

      {/* theme */}
      <CSSTransition
        in={activeMenu === "theme"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calculateHeight}
      >
        <div className={styles.menu}>
          <DropdownItem
            leftIcon={<ArrowBackIcon />}
            goToMenu="main"
          ></DropdownItem>
          <DropdownItem>
            <CustomizedSwitches />
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Navbar;
