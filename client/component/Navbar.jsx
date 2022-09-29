import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import Box from "@mui/material/Box";
import Image from "next/image";
import UserIcon from "../assets/image/User.svg";
import ArrowDown from "../assets/image/arrow-down.svg";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Today from "../assets/image/Today.svg";
import { format } from "date-fns";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { IconButton } from "@mui/material";
import CustomizedSwitches from "./CustomizedSwitches";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { CSSTransition } from "react-transition-group";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const router = useRouter();
  const today = format(new Date(), "MMMM dd, yyyy");
  const [userData, setUserData] = useState([]);

  // state management for theme
  const [theme, setTheme] = useState(false);

  // dropdown state
  const [open, setOpen] = useState(false);

  //modal
  // const [fullscreen, setFullscreen] = useState(true);

  useEffect(() => {
    // fetch color scheme from local storage
    const enabled = JSON.parse(localStorage.getItem("theme"));
    setTheme(enabled);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001", { withCredentials: true })
      .then((response) => {
        return setUserData([...userData, response.data]);
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  return (
    <>
      {userData.map((user, key) => {
        return (
          <Box className={theme ? styles.DarkMode : styles.navbar} key={key}>
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
              <IconButton>
                <NotificationsNoneIcon
                  fontSize="large"
                  className={
                    theme ? styles.header__icon__dark : styles.header__icon
                  }
                />
              </IconButton>

              <IconButton onClick={() => setOpen(!open)}>
                <ArrowDropDownIcon
                  fontSize="large"
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
            {open && <DropdownMenu />}
          </Box>
        );
      })}
    </>
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
            My Profile
          </DropdownItem>
          <DropdownItem
            leftIcon={<DarkModeIcon fontSize="large" />}
            goToMenu="theme"
          >
            Theme
          </DropdownItem>
          <DropdownItem leftIcon={<SettingsIcon fontSize="large" />}>
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<LogoutIcon fontSize="large" />}
            goToMenu="logout"
          >
            Logout
          </DropdownItem>
        </div>
      </CSSTransition>

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
