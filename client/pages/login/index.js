import React, { useState } from "react";
import Image from "next/image";
import styles from "../../styles/Login.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Meta from "../../component/Meta";
import GroupBanner from "../../assets/image/Group 8.png";
import LoadingButton from "@mui/lab/LoadingButton";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const index = () => {
  const [loading, setLoading] = useState(false);

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
            src={GroupBanner}
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
            <input className={styles.input} type="text" name="email" />

            <Typography variant="body2" component="h4" color="#585858">
              PASSWORD
            </Typography>
            <input className={styles.input} type="password" name="password" />

            <Box className={styles.remember__me}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
            </Box>

            <LoadingButton
              onClick={() => setLoading(true)}
              loading={loading}
              variant="contained"
              className={styles.loginBtn}
            >
              Submit
            </LoadingButton>
          </FormControl>
          <Typography
            variant="body2"
            component="h4"
            className={styles.registerLink}
          >
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default index;
