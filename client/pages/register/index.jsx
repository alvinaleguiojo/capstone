import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuthRedirect from "../../customhook/AuthRedirect";
import styles from "../../styles/Register.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Meta from "../../component/Meta";
import LoadingButton, { loadingButtonClasses } from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import registerBanner from "../../assets/image/registerBanner.svg";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import io from "socket.io-client";
import TermsConditions from "../../component/TermsConditions";
const socket = io.connect(process.env.BaseURI);
import { termsModal } from "../../features/TermsCondition";
import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  // redirect to dashboard when current user is authenticated
  useAuthRedirect();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [modal, setModal] = useState(false);

  // terms redux
  const dispatch = useDispatch();
  const TemsConditionModal = useSelector((state) => state.terms.value);
  
  useEffect(() => {
    setModal(false)
  },[modal])

  // received a response from the server telling the email is not valid or not exist
  useEffect(() => {
    socket.on("error", (data) => {
      setServerResponse(data.message);
    });
  }, [socket]);

  // sending and checking the input email if it is exist
  useEffect(() => {
    socket.emit("email", user.Email);
  }, [user.Email]);

  // to check if the input field is not empty and turn on the button if meets the requirements
  useEffect(() => {
    let userInput = Object.values(user).includes("");
    !userInput &&
    Object.keys(user).length >= 5 &&
    terms == true &&
    privacy == true &&
    user.Password === user.ConfirmPassword
      ? setDisabled(false)
      : setDisabled(true);
  }, [user, terms, privacy]);

  // send a request for registration to the server
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.defaults.withCredentials = true;
    axios
      .post(
        `${process.env.BaseURI}/register`,
        {
          ...user,
        },
        { withCredentials: true }
      )
      .then(() => {
        Swal.fire("Success!", "Successfully Registered!", "success");
        setLoading(false);
        setUser({
          ...user,
          FirstName: "",
          LastName: "",
          Email: "",
          Password: "",
          ConfirmPassword: "",
        });
        router.push("/dashboard");
        setTerms(false);
        setPrivacy(false);
      })
      .catch((err) => {
        console.log("Error" + err);
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
          title: "Please check the details and try again.",
        });
        setLoading(false);
      });
    setUser({
      ...user,
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    });
    setTerms(false);
    setPrivacy(false);
  };

  return (
    <>
      <Meta
        title="Capstone | Register"
        description="Register here"
        keywords="Register to Barangay Health Center"
      />
      <Box className={styles.container}>
        <Box className={styles.container__left}>
          <Box className={styles.title}>
            <Typography variant="h4" component="h4" color="#585858">
              Let&apos;s get started
            </Typography>
          </Box>

          <Typography variant="body1" component="h4" color="#585858">
            First things first, Let&apos;s Create you a account
          </Typography>

          <FormControl
            sx={{ marginTop: "20px", marginBottom: "20px", gap: "0.5rem" }}
          >
            <Box className={styles.username}>
              <Box className={styles.firstname}>
                <Typography variant="body2" component="h4" color="#585858">
                  FIRST NAME
                </Typography>
                <input
                  className={styles.input__username}
                  onChange={(e) =>
                    setUser({ ...user, FirstName: e.target.value })
                  }
                  type="text"
                  name="firstname"
                  value={user.FirstName || ""}
                />
              </Box>

              <Box className={styles.lastname}>
                <Typography variant="body2" component="h4" color="#585858">
                  LAST NAME
                </Typography>
                <input
                  className={styles.input__username}
                  onChange={(e) =>
                    setUser({ ...user, LastName: e.target.value })
                  }
                  type="text"
                  name="lastname"
                  value={user.LastName || ""}
                />
              </Box>
            </Box>

            {/* email address field*/}
            <Box className={styles.email}>
              <Typography variant="body2" component="h4" color="#585858">
                EMAIL ADDRESS
              </Typography>
              <Typography variant="caption" component="h5" color="#B82623">
                {serverResponse}
              </Typography>
            </Box>
            <input
              className={styles.input}
              type="email"
              name="email"
              value={user.Email || ""}
              onChange={(e) =>
                setUser({ ...user, Email: e.target.value.toLocaleLowerCase() })
              }
            />

            {/* password field */}
            <Box className={styles.password}>
              <Typography variant="body2" component="h4" color="#585858">
                PASSWORD
              </Typography>
              {user.Password !== user.ConfirmPassword && (
                <Typography variant="caption" component="h5" color="#B82623">
                  *Password and Confirm Password doesn&apos;t match!
                </Typography>
              )}
            </Box>
            <Box className={styles.inputPassword}>
              <input
                className={styles.input}
                type="password"
                name="password"
                value={user.Password || ""}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
              />
            </Box>

            {/* confirm password field */}
            <Typography variant="body2" component="h4" color="#585858">
              CONFIRM PASSWORD
            </Typography>
            <input
              className={styles.input}
              type="password"
              name="confirm password"
              value={user.ConfirmPassword || ""}
              onChange={(e) =>
                setUser({ ...user, ConfirmPassword: e.target.value })
              }
            />

            <Box
              className={styles.terms}
              onClick={() => {
                setModal(true);
                dispatch(termsModal());
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                }
                label="I AGREE WITH THE TERMS OF CONDITIONS"
              />
              {/* <label
                onClick={() => {
                  dispatch(termsModal());
                }}
              >
                I AGREE WITH THE TERMS OF CONDITIONS
              </label> */}

              {modal && <TermsConditions />}

              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                  />
                }
                label="I AGREE WITH THE PRIVACY POLICY"
              /> */}
            </Box>
          </FormControl>

          <LoadingButton
            onClick={handleSubmit}
            loading={loading}
            variant="contained"
            className={disabled ? styles.btnDisabled : styles.loginBtn}
            disabled={disabled}
          >
            Submit
          </LoadingButton>

          <Typography
            variant="body2"
            component="h4"
            className={styles.registerLink}
          >
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </Box>

        <Image
          className={styles.ImageBanner}
          src={registerBanner}
          alt="banner"
          height={650}
          width={650}
        />
      </Box>
    </>
  );
};

export default Index;
