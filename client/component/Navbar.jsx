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

import { useSelector, useDispatch } from "react-redux";
import { deleteMedicineRequest } from "../features/Medicines";

const Navbar = () => {
  const router = useRouter();
  const today = format(new Date(), "MMMM dd, yyyy");
  const [userData, setUserData] = useState([]);
  const { PatientID } = router.query;
  const [patientData, setPatientData] = useState();

  // medicines data from redux
  const medicinesList = useSelector((state) => state.medicines.value);

  // state management for theme
  const [theme, setTheme] = useState(false);

  // Request Group Focus
  const [requestGroupFocus, setRequestGroupFocus] = useState(false);

  // dropdown state
  const [open, setOpen] = useState(false);

  // fetch color scheme from local storage
  useEffect(() => {
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);

    // fetch Patient dat from local storage
    const Patient = JSON.parse(localStorage.getItem("Patient"));
    setPatientData(Patient);
  }, []);

  const handleClickSettings = () => {
    setRequestGroupFocus(false);
    setOpen(!open);
  };

  const handleRequestMedicineFocus = () => {
    setOpen(false);
    setRequestGroupFocus(!requestGroupFocus);
  };

  return (
    <>
      <Box className={theme ? styles.DarkMode : styles.navbar}>
        <Box className={styles.logo}></Box>
        <Box className={styles.navbar__right}>
          <Box className={styles.user}>
            {/* <Image src={UserIcon} alt="user avatar" heigh={40} width={40} /> */}
            <Box className={styles.avatar}>
              <Typography variant="h5" component="h5">
                {/* {user.userData.Email.substring(0, 1).toUpperCase()} */}
              </Typography>
            </Box>
            <Box className={styles.user__name}>
              <Typography variant="h5" component="h5" color="#b82623">
                {/* {user.userData.Email.substring(0, 10)} */}
              </Typography>
              <Typography variant="caption" component="h5" color="#b82623">
                Barangay Health Worker
              </Typography>
            </Box>

            {/* <IconButton onClick={handleLogout}>
                  <Image
                    src={ArrowDown}
                    alt="drop down"
                    height={10}
                    width={10}
                  />
                </IconButton> */}
          </Box>
          <Box className={styles.line}></Box>

          <Box className={styles.date}>
            <Image src={Today} alt="drop down" heigh={40} width={40} />
            <Box className={styles.date__display}>
              <Typography variant="h5" component="h5" color="#b82623">
                Today
              </Typography>

              <Typography variant="caption" component="h5" color="#b82623">
                {today}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={styles.header__icons}>
          {medicinesList.length > 0 && (
            <Box className={styles.request__count}>
              <Typography variant="caption" component="h5" color="#fff">
                {medicinesList.length}
              </Typography>
            </Box>
          )}

          <IconButton onClick={handleRequestMedicineFocus}>
            <MedicalServicesIcon
              className={
                theme
                  ? styles.header__icon__dark
                  : requestGroupFocus
                  ? styles.header__icon_active
                  : styles.header__icon
              }
            />
          </IconButton>

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

          <IconButton>
            <NotificationsNoneIcon
              className={
                theme ? styles.header__icon__dark : styles.header__icon
              }
            />
          </IconButton>

          <IconButton onClick={handleClickSettings}>
            <ArrowDropDownIcon
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
    </>
  );
};

const MedicineCart = (props) => {
  const router = useRouter();

  // medicines data from redux
  const dispatch = useDispatch();
  const medicinesList = useSelector((state) => state.medicines.value);

  return (
    <Box className={styles.MedicineCart}>
      <Typography variant="h6" component="h6" color="#b82623">
        Requested Medicines
      </Typography>

      <Box className={styles.add__patient}>
        <Box style={{ display: "flex", alignContent: "center" }}>
          <SearchIcon />
          {props.patientName}
        </Box>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* start cards here */}
      <Box className={styles.request__cards}>
        {medicinesList.map((medicine, index) => (
          <Box className={styles.request__card} key={index}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Image src={Today} height={60} width={60} />
              <Box>
                <Typography variant="caption" component="h5" color="#b82623">
                  {medicine.Name}
                </Typography>
                <Typography variant="caption" component="h5" color="#b82623">
                  Quantity
                </Typography>
              </Box>
            </Box>
            <IconButton
              onClick={() =>
                dispatch(deleteMedicineRequest({ id: medicine.MedicineID }))
              }
            >
              <CloseIcon className={styles.request__card__remove} />
            </IconButton>
          </Box>
        ))}

        {/* <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button>View All Request</Button>
        </Box> */}
        {medicinesList <= 0 && <span>No medicine request</span>}
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button disabled={true}>Send Request</Button>
        </Box>
      </Box>
      {/* end cards here.... */}
    </Box>
  );
};

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const nodeRef = useRef(null);
  const router = useRouter();

  function calculateHeight(el) {
    const height = el.offsetHeight + 30;
    setMenuHeight(height);
  }

  useEffect(() => {
    console.log(menuHeight);
  }, [menuHeight]);

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
          .then((response) => {
            Swal.fire("Success!", "You are now in the Login Page.", "success");
            response && router.push("/login");
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
                  ? router.push(`?settings=services`)
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
          <DropdownItem leftIcon={<AccountCircleIcon fontSize="large" />}>
            Profile
          </DropdownItem>
          <DropdownItem
            leftIcon={<DarkModeIcon fontSize="large" />}
            goToMenu="theme"
          >
            Theme
          </DropdownItem>
          <DropdownItem
            leftIcon={<SettingsIcon fontSize="large" />}
            goToMenu="settings"
          >
            Admin Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<LogoutIcon fontSize="large" />}
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
