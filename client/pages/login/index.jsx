import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuthRedirect from "../../customhook/AuthRedirect";
import Image from "next/image";
import styles from "../../styles/Login.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Meta from "../../component/Meta";
import loginBanner from "../../assets/image/loginBanner.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Swal from "sweetalert2";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const Index = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [serverResponse, setServerResponse] = useState(false);

  // redirect to dashboard when current user is authenticated
  useAuthRedirect();

  // show modal when server response is true
  useEffect(() => {
    if (serverResponse) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Please check you email and password.",
      });
      setLoading(false);
      setServerResponse(false);
    }
  }, [serverResponse]);

  // set error modal to true when server response sends error
  useEffect(() => {
    socket.on("error", (data) => {
      data.error && setServerResponse(true);
    });
  }, [socket]);

  // to check if the input fields are not empty then turn on the button if meets the requirements
  useEffect(() => {
    let userInput = Object.values(user).includes("");
    !userInput && Object.keys(user).length >= 2
      ? setDisabled(false)
      : setDisabled(true);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("login", { ...user });
    setLoading(true);
    axios
      .post(
        "http://localhost:3001/login",
        {
          ...user,
        },
        { withCredentials: true }
      )
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        setTimeout(() => {
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          router.push("/dashboard");
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });

    setUser({
      ...user,
      Email: "",
      Password: "",
    });
  };

  return (
    <>
      <Meta
        title="Capstone | Login"
        description="login here"
        keywords="login"
      />
      <Box className={styles.container}>
        <Box className={styles.container__left}>
          <Image
            className={styles.ImageBanner}
            src={loginBanner}
            height={650}
            width={650}
          />
        </Box>
        <Box className={styles.container__right}>
          <Box className={styles.title}>
            <Typography variant="h4" component="h4" color="#585858">
              Welcome
            </Typography>
            <Typography variant="body1" component="h4" color="#585858">
              Please log in your account.
            </Typography>
          </Box>

          <FormControl
            sx={{ marginTop: "20px", marginBottom: "20px", gap: "0.5rem" }}
          >
            <Typography variant="body2" component="h4" color="#585858">
              EMAIL ADDRESS
            </Typography>
            <input
              className={styles.input}
              required={true}
              type="email"
              name="email"
              onChange={(e) =>
                setUser({ ...user, Email: e.target.value.toLocaleLowerCase() })
              }
              value={user.Email || ""}
            />

            <Typography variant="body2" component="h4" color="#585858">
              PASSWORD
            </Typography>
            <input
              className={styles.input}
              required={true}
              type="password"
              name="password"
              onChange={(e) => setUser({ ...user, Password: e.target.value })}
              value={user.Password || ""}
            />

            <Box className={styles.remember__me}>
              <FormControlLabel
                control={<Checkbox value={false} />}
                label="Remember me"
              />
            </Box>

            <LoadingButton
              onClick={handleSubmit}
              loading={loading}
              disabled={disabled}
              variant="contained"
              className={disabled ? styles.btnDisabled : styles.loginBtn}
            >
              Login
            </LoadingButton>
          </FormControl>
          <Typography
            variant="body2"
            component="h4"
            className={styles.registerLink}
          >
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Index;
