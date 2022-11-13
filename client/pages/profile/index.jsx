import React, { useState, UseEffect } from "react";
import Box from "@mui/material/Box";
import Meta from "../../component/Meta";
import styles from "../../styles/Patients.module.css";
import Profile from "../../styles/Profile.module.css";
import { Breadcrumb } from "antd";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const [staffData, setStaffData] = useState({});

  return (
    <div>
      <Box>
        <Meta
          title="Capstone | Profile Settings"
          description="Edit User Profile"
          keywords="Capstone project, health center, baranggay"
        />
        {/* <Navbar /> */}
        <Box
          className={styles.patientProfile}
          style={{ backgroundColor: "#dbdff3" }}
        >
          <Box className={styles.container}>
            {/* left container starts here */}
            <Box className={styles.left__main}>
              <Box className={styles.backButton}>
                <Breadcrumb>
                  <Breadcrumb.Item
                    onClick={() => router.push("/dashboard")}
                    style={{ cursor: "pointer", color: "black" }}
                  >
                    Back to Home
                  </Breadcrumb.Item>
                  <Breadcrumb.Item style={{ color: "grey" }}>
                    User Profile
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Box>
              <Box className={styles.content} style={{ minWidth: "330px" }}>
                <Box className={styles.ProfileImageContainer}>
                  {/* {patientImage !== null ? (
                    <Image
                      src={patientImage}
                      alt="user profile"
                      width={80}
                      height={80}
                      className={styles.patientImage}
                    />
                  ) : (
                    <Image src={UserIcon} alt="user profile" />
                  )} */}
                </Box>

                {/* <CustomWebcam/> */}
                <Typography
                  variant="h5"
                  component="h5"
                  color="#B82623"
                  style={{ textAlign: "center" }}
                >
                  {staffData.FirstName + " " + staffData.LastName}
                </Typography>

                <Box className={styles.cards}>
                  {/* gender here */}
                  <Box className={styles.card}>
                    <Typography
                      variant="caption"
                      component="h5"
                      color="#B82623"
                    >
                      Gender
                    </Typography>
                    <Typography variant="body" component="h4" color="#B82623">
                      Male
                    </Typography>
                  </Box>
                  {/* gender end here */}

                  {/* contact number here */}
                  <Box className={styles.card}>
                    <Typography
                      variant="caption"
                      component="h5"
                      color="#B82623"
                    >
                      Contact Number
                    </Typography>

                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="body" component="h4" color="#B82623">
                        {staffData.Phone}
                      </Typography>

                      <IconButton
                      //   onClick={() => {
                      //     handleMessageModal(staffData.Phone);
                      //   }}
                      >
                        {/* <Image
                            src={MessageIcon}
                            alt="user profile"
                            height={25}
                            width={25}
                          /> */}
                      </IconButton>
                    </Box>
                  </Box>
                  {/* contact end here */}

                  {/* address here */}
                  <Box className={styles.card}>
                    <Typography
                      variant="caption"
                      component="h5"
                      color="#B82623"
                    >
                      Address
                    </Typography>
                    <Typography variant="body" component="h4" color="#B82623">
                      {staffData.Street +
                        " " +
                        staffData.Baranggay +
                        " " +
                        staffData.City}
                    </Typography>
                  </Box>
                  {/* card end here */}
                </Box>
              </Box>
            </Box>
            {/* left container starts here */}

            {/* right container starts here */}
            <Box className={styles.right__container}>
              <Box className={Profile.reset__password}>
                <Typography variant="Body1" component="h3" color="#B82623">
                  Login
                </Typography>

                <Box className={Profile.inputs}>
                  <input type="email" placeholder="email" />
                  <input type="password" placeholder="password" />
                  <IconButton>
                    <Tooltip title="Edit">
                      <EditIcon />
                    </Tooltip>
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {/* right container ends here */}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Index;
