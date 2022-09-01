import React, { useState } from "react";
import styles from "../../styles/Register.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Meta from "../../component/Meta";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Banner from "../../assets/image/banner_right.png";
import Image from "next/image";

const index = () => {
  const [loading, setLoading] = useState(false);
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
              Let's get started
            </Typography>
          </Box>

          <Typography variant="body1" component="h4" color="#585858">
            First things first, Let's Create you a account
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
                  type="text"
                  name="firstname"
                />
              </Box>

              <Box className={styles.lastname}>
                <Typography variant="body2" component="h4" color="#585858">
                  LAST NAME
                </Typography>
                <input
                  className={styles.input__username}
                  type="text"
                  name="lastname"
                />
              </Box>
            </Box>

            {/* email address field*/}
            <Typography variant="body2" component="h4" color="#585858">
              EMAIL ADDRESS
            </Typography>
            <input className={styles.input} type="text" name="email" />

            {/* password field */}
            <Typography variant="body2" component="h4" color="#585858">
              PASSWORD
            </Typography>
            <input className={styles.input} type="password" name="password" />

            {/* confirm password field */}
            <Typography variant="body2" component="h4" color="#585858">
              CONFIRM PASSWORD
            </Typography>
            <input
              className={styles.input}
              type="password"
              name="confirm password"
            />

            <Box className={styles.terms}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I AGREE WITH THE TERMS OF CONDITIONS"
              />

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="I AGREE WITH THE PRIVACY POLICY"
              />
            </Box>
          </FormControl>

          <LoadingButton
            onClick={() => setLoading(true)}
            loading={loading}
            variant="contained"
            className={styles.loginBtn}
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

export default index;
