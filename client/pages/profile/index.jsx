import React, { useState, UseEffect, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Meta from "../../component/Meta";
import styles from "../../styles/Patients.module.css";
import Profile from "../../styles/Profile.module.css";
import { Breadcrumb } from "antd";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified";

const Index = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [staffData, setStaffData] = useState({});
  const [searchLocations, setSearchLocations] = useState(null);
  const [location, setLocation] = useState(null);
  const [resultLocation, setResultLocation] = useState([]);
  const [address, setAddress] = useState([]);

  // setting address input fields
  const [street, setStreet] = useState(null);
  const [baranggay, setBaranggay] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [country, setCountry] = useState(null);
  const [zipcode, setZipcode] = useState(null);

  useEffect(() => {
    getGeocode();
  }, [searchLocations]);

  const getGeocode = () => {
    axios
      .get(process.env.Geocode_URL, {
        params: {
          address: searchLocations,
          key: process.env.Geocode_key,
        },
      })
      .then((res) => {
        setResultLocation(res.data.results[0].address_components);

        setLocation(res.data.results[0].formatted_address);
      })
      .catch((error) => console.log(error));
  };

  const handleFindLocation = (e) => {
    e.preventDefault();
    setSearchLocations(e.target.value);
  };

  const handleSetAddres = (location) => {
    setSearchLocations(location);
    const addressInfo = resultLocation.map((loc, index) => {
      return { [resultLocation[index].types[0]]: loc.long_name };
    });

    setAddress(addressInfo);
    // street
    const street = addressInfo.filter((value) => {
      return value.route;
    });

    try {
      setStreet(street[0].route);
    } catch (error) {
      setStreet("Not available");
    }

    // baranggay
    const neighborhood = addressInfo.filter((value) => {
      return value.neighborhood;
    });
    try {
      setBaranggay(neighborhood[0].neighborhood);
    } catch (e) {
      setBaranggay("Not Available");
    }

    // city
    const locality = addressInfo.filter((value) => {
      return value.locality;
    });
    try {
      setCity(locality[0].locality);
    } catch (e) {
      setCity("Not Available");
    }

    // Provice
    const province = addressInfo.filter((value) => {
      return value.administrative_area_level_2;
    });
    try {
      setProvince(province[0].administrative_area_level_2);
    } catch (e) {
      setProvince("Not Available");
    }

    // Country
    const country = addressInfo.filter((value) => {
      return value.country;
    });
    try {
      setCountry(country[0].country);
    } catch (e) {
      setCountry("Not Available");
    }

    // Postal Code or Zipcode
    const zipcode = addressInfo.filter((value) => {
      return value.postal_code;
    });
    try {
      setZipcode(zipcode[0].postal_code);
    } catch (e) {
      setZipcode("Not Available");
    }
  };

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
                  variant="body1"
                  component="h6"
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
                        {staffData.Phone || "No contact number"}
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
                  {/* <Box className={styles.card}>
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
                  </Box> */}
                  {/* card end here */}
                </Box>
              </Box>
            </Box>
            {/* left container starts here */}

            {/* right container starts here */}

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                className={Profile.profile}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.7rem",
                }}
              >
                <Typography variant="Body1" component="h3" color="#B82623">
                  Profile Settings
                </Typography>

                <Box className={Profile.inputs}>
                
                  <Box className={Profile.input__container}>
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" />
                  </Box>
                  <Box className={Profile.input__container}>
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" />
                  </Box>
                  <Box className={Profile.input__container}>
                    <label>Middle Name</label>
                    <input type="text" placeholder="Middle Name" />
                  </Box>
                </Box>

                <Box className={Profile.inputs}>
                  <Box
                    className={Profile.input__container}
                    style={{ width: "100%" }}
                  >
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Search location"
                      onChange={handleFindLocation}
                      value={searchLocations}
                    />
                    {location !== searchLocations && searchLocations ? (
                      <Box className={Profile.location}>
                        <span
                          className={Profile.search__result}
                          onClick={() => {
                            handleSetAddres(location);
                          }}
                        >
                          {location}
                        </span>
                        {/* {resultLocation &&
                          resultLocation.map((loc, index) => {
                            return (
                              <Box key={index} style={{ display: "flex" }}>
                                <strong>
                                  {resultLocation[index].types[0]}:{" "}
                                </strong>
                                <span>{loc.long_name}</span>
                              </Box>
                            );
                          })} */}
                      </Box>
                    ) : null}

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box className={Profile.input__container}>
                        <label>Street</label>
                        <input
                          type="text"
                          placeholder="Street"
                          value={street || ""}
                          onChange={(e) => setStreet(e.target.value)}
                        />
                      </Box>

                      <Box className={Profile.input__container}>
                        <label>Baranggay</label>
                        <input
                          type="text"
                          placeholder="Baranggay"
                          value={baranggay || ""}
                          onChange={(e) => setBaranggay(e.target.value)}
                        />
                      </Box>
                      <Box className={Profile.input__container}>
                        <label>City</label>
                        <input
                          type="text"
                          placeholder="City"
                          value={city || ""}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Box>
                    </Box>

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box className={Profile.input__container}>
                        <label>Province</label>
                        <input
                          type="text"
                          placeholder="Province"
                          value={province || ""}
                          onChange={(e) => setProvince(e.target.value)}
                        />
                      </Box>

                      <Box className={Profile.input__container}>
                        <label>Country</label>
                        <input
                          type="text"
                          placeholder="Country"
                          value={country || ""}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </Box>
                      <Box className={Profile.input__container}>
                        <label>Zipcode</label>
                        <input
                          type="text"
                          placeholder="Zipcode"
                          value={zipcode || ""}
                          onChange={(e) => setZipcode(e.target.value)}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Button
                  variant="outlined"
                  style={{
                    border: !disabled && "1px solid #b82623",
                    color: !disabled && "#b82623",
                  }}
                  disabled={disabled}
                >
                  Update
                </Button>
              </Box>
              {/* bottom content starts here */}
              <Box>
                {/* <Box>Security</Box> */}
                <Box className={Profile.verified}>
                  <VerifiedIcon fontSize="small" />
                  Verified October 12, 2022
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
