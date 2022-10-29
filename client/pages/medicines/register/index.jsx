import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Tabs from "../../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../../styles/Content.module.css";
import reusableStyle from "../../../styles/Reusable.module.css";
import styles from "../../../styles/Patients.module.css";
import medicineStyles from "../../../styles/Medicines.module.css";
import Meta from "../../../component/Meta";
import Typography from "@mui/material/Typography";
import useAuth from "../../../customhook/Auth";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";
import ImageUploading from "react-images-uploading";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Swal from "sweetalert2";

const Index = () => {
  const router = useRouter();

  const webRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  // setting image to state
  const [images, setImages] = useState({ preview: "", data: "" });
  const [filename, setFilename] = useState("");
  const maxNumber = 69;

  const [medicine, setMedicine] = useState({
    Name: null,
    Stocks: 0,
    Unit: "microgram",
    Size: 0,
    ExpiryDate: null,
    Manufacturer: null,
    Dosage: null,
    Description: null,
    ImageID: null,
  });

  useEffect(() => {
    console.log(medicine);
    medicine.Name !== null &&
      medicine.Name !== "" &&
      medicine.Stocks !== 0 &&
      medicine.Stocks !== "" &&
      medicine.Unit !== null &&
      medicine.Unit !== "" &&
      medicine.Size !== 0 &&
      medicine.Size !== "" &&
      medicine.ExpiryDate !== null &&
      medicine.ExpiryDate !== "" &&
      medicine.Manufacturer !== null &&
      medicine.Manufacturer !== "" &&
      medicine.Dosage !== null &&
      medicine.Dosage !== "";
    medicine.Description !== null && medicine.Description !== ""
      ? // medicine.ImageID !== null && medicine.ImageID !== ""
        setDisabled(false)
      : setDisabled(true);
  }, [medicine]);

  const handleSubmitMedicine = async (e) => {
    e.preventDefault();
    try {
      const newMedicine = await axios.post(
        "http://localhost:3001/medicine/register",
        {
          ...medicine,
        }
      );
      newMedicine &&
        (await Swal.fire(
          "Success!",
          "Medicine successfully registered!",
          "success"
        ).then(() => {
          router.push("/medicines");
        }));
    } catch (error) {
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
        title: "Please check the input field value",
      });

      console.log(error.message);
    }
  };

  // going back to patient page list
  const handleBack = () => {
    router.push("/medicines");
  };

  //retrieving from local storage
  useEffect(() => {
    const medicine = JSON.parse(localStorage.getItem("medicine"));
    const profilePicture = JSON.parse(localStorage.getItem("image"));
    medicine && setMedicine(medicine);
    profilePicture && setImageURL(profilePicture);
  }, []);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  // saving image to local storage
  // const handleSave = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   let formData = new FormData();
  //   formData.append("file", images.data);

  //   const response = await fetch("http://localhost:3001/upload_file", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const res = await response.json();
  //   setTimeout(() => {
  //     res && setLoading(false);
  //     res && setFilename(res.filename);
  //   }, 2000);
  // };

  const handleDeleteImage = async (filename) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3001/delete_file/${filename}`
      );

      setLoading(false);
      response && setImages({ preview: "", data: "" });
      setFilename("");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    try {
      const file = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      };

      setLoading(true);
      let formData = new FormData();
      formData.append("file", file.data);

      const response = await fetch("http://localhost:3001/upload_file", {
        method: "POST",
        body: formData,
      });

      const res = await response.json();
      console.log(res);
      setTimeout(() => {
        setImages(file);
        res && setLoading(false);
        res && setMedicine({ ...medicine, ImageID: res.ImageID });
        res && setFilename(res.file.filename);
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {/* useAuth is to check if the user is authenticated */}
      {useAuth() && (
        <Box>
          <Meta
            title="Capstone | Medicine"
            description="set an appointment to schedule your check-up"
            keywords="Capstone project, health center, baranggay"
          />
          {/* <Navbar /> */}
          <Box className={contentStyles.content}>
            <Tabs />
            <Box className={reusableStyle.main__content}>
              <Box className={styles.patients}>
                <Box className={styles.registration__header}>
                  <Typography variant="h4" component="h4" color="#B82623">
                    Add New Medicine
                  </Typography>
                </Box>

                {/* <Box className={styles.register__containers}> */}
                <motion.div
                  className={styles.register__container}
                  initial={{ x: "-50vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 70 }}
                >
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box className={styles.photo}>
                      {imageURL && (
                        <Image
                          src={imageURL || ""}
                          alt="photo"
                          width={200}
                          height={200}
                          className={styles.profilePicture}
                        />
                      )}

                      {/* <IconButton
                        onClick={handleOpen}
                        style={{ position: "absolute" }}
                      >
                        <Image
                          src={CameraIcon}
                          alt="photo"
                          width={50}
                          height={50}
                        />
                      </IconButton> */}
                      {images.preview && (
                        <img src={images.preview} width="100" height="100" />
                      )}

                      <form>
                        {!images.preview && (
                          <Box style={{ color: "#B82623" }}>
                            <input
                              type="file"
                              name="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className={medicineStyles.file__input}
                              hidden
                              id="actual-btn"
                            ></input>
                            {loading === false && (
                              <label
                                htmlFor="actual-btn"
                                style={{ cursor: "pointer" }}
                              >
                                Choose File
                              </label>
                            )}

                            {loading && <CircularProgress color="inherit" />}
                          </Box>
                        )}

                        {images.preview && !filename && (
                          <button
                            type="submit"
                            className={medicineStyles.btn__uploadFile}
                          >
                            Save
                          </button>
                        )}
                      </form>
                      {filename && (
                        <button
                          onClick={() => handleDeleteImage(filename)}
                          className={medicineStyles.btn__cancelFile}
                        >
                          Cancel
                        </button>
                      )}
                    </Box>

                    {/* upload section here */}

                    <Box
                      style={{
                        width: "84%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <Typography variant="h5" component="h5" color="#B82623">
                        Medicine Information
                      </Typography>
                      <Box className={styles.name}>
                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Generic Name
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Name: e.target.value,
                              })
                            }
                            type="text"
                            name="Generic Name"
                            value={medicine.Name || ""}
                          />
                        </Box>

                        <Box style={{ width: "60%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Stocks
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Stocks: e.target.value,
                              })
                            }
                            type="number"
                            name="Stocks"
                            value={medicine.Stocks || ""}
                          />
                        </Box>
                        <Box style={{ width: "30%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Unit
                          </Typography>
                          <select
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Unit: e.target.value,
                              })
                            }
                          >
                            <option value="microgram">microgram μg</option>
                            <option value="miligram">miligram</option>
                            <option value="gram">gram</option>
                          </select>
                        </Box>

                        <Box style={{ width: "30%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Size
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Size: e.target.value,
                              })
                            }
                            type="number"
                            name="middleName"
                            value={medicine.Size || ""}
                          />
                        </Box>
                      </Box>

                      <Box className={styles.input__address}>
                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Expiry Date
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                ExpiryDate: e.target.value,
                              })
                            }
                            type="date"
                            name="Expiry Date"
                            value={medicine.ExpiryDate || ""}
                          />
                        </Box>

                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Manufacturer
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Manufacturer: e.target.value,
                              })
                            }
                            type="text"
                            name="City"
                            value={medicine.Manufacturer || ""}
                          />
                        </Box>

                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Dosage
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Dosage: e.target.value,
                              })
                            }
                            type="text"
                            name="Dosage"
                            value={medicine.Dosage || ""}
                          />
                        </Box>
                      </Box>
                      <Box className={styles.input__address}>
                        <Box style={{ width: "100%" }}>
                          <Typography
                            variant="body1"
                            component="h5"
                            color="#B82623"
                          >
                            Description
                          </Typography>
                          <input
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Description: e.target.value,
                              })
                            }
                            type="text"
                            name="Description"
                            value={medicine.Description || ""}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
                <Box className={styles.buttonRegister}>
                  <Button style={{ color: "#b82623" }} onClick={handleBack}>
                    Back
                  </Button>
                  <Button
                    disabled={disabled}
                    className={
                      disabled ? styles.proceedBtnDisabled : styles.proceedBtn
                    }
                    onClick={(e) => handleSubmitMedicine(e)}
                  >
                    Add Medicine
                  </Button>
                </Box>
              </Box>
              {/* </Box> */}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Index;
