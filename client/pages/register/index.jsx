import React, { useState, useEffect } from "react";
import styles from "../../styles/Register.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Meta from "../../component/Meta";
import LoadingButton, { loadingButtonClasses } from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Banner from "../../assets/image/banner_right.png";
import Image from "next/image";
import axios from "axios";

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  useEffect(() => {
    let userInput = Object.values(user).includes("");
    !userInput &&
    Object.keys(user).length >= 5 &&
    terms == true &&
    privacy == true &&
    user.password === user.confirmPassword
      ? setDisabled(false)
      : setDisabled(true);
  }, [user, terms, privacy]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/user", {
        ...user,
      })
      .then(() => {
        setLoading(false);
        setUser({
          ...user,
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setTerms(false);
        setPrivacy(false);
      })
      .catch((err) => console.log("Error" + err));
    setUser({ ...user, firstname: "" });
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
                    setUser({ ...user, firstname: e.target.value })
                  }
                  type="text"
                  name="firstname"
                  value={user.firstname}
                />
              </Box>

              <Box className={styles.lastname}>
                <Typography variant="body2" component="h4" color="#585858">
                  LAST NAME
                </Typography>
                <input
                  className={styles.input__username}
                  onChange={(e) =>
                    setUser({ ...user, lastname: e.target.value })
                  }
                  type="text"
                  name="lastname"
                  value={user.lastname}
                />
              </Box>
            </Box>

            {/* email address field*/}
            <Typography variant="body2" component="h4" color="#585858">
              EMAIL ADDRESS
            </Typography>
            <input
              className={styles.input}
              type="text"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            {/* password field */}
            <Box className={styles.password}>
              <Typography variant="body2" component="h4" color="#585858">
                PASSWORD
              </Typography>
              {user.password !== user.confirmPassword && (
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
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
              value={user.confirmPassword}
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
            />

            <Box className={styles.terms}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                }
                label="I AGREE WITH THE TERMS OF CONDITIONS"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                  />
                }
                label="I AGREE WITH THE PRIVACY POLICY"
              />
            </Box>
          </FormControl>

          <LoadingButton
            onClick={handleSubmit}
            loading={loading}
            variant="contained"
            className={styles.loginBtn}
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
          src={Banner}
          alt="banner"
          height={650}
          width={650}
        />
      </Box>
    </>
  );
};

export default Index;
