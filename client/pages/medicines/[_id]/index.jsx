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
import Link from "next/link";
import moment from "moment";

const Index = ({ Medicines }) => {
  const router = useRouter();

  const webRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

  // setting image to state
  const [images, setImages] = useState({
    preview: Medicines[0].Image,
    data: "",
  });
  const [filename, setFilename] = useState("");
  const maxNumber = 69;

  const [medicine, setMedicine] = useState(Medicines);

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

  const handleDeleteImage = async (filename) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.BaseURI}/delete_file/${filename}`
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

      const response = await fetch(`${process.env.BaseURI}/upload_file`, {
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
      }, 500);
    } catch (error) {
      console.log(error.message);
    }
  };

  // update medicine
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const Toast = await Swal.mixin({
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
    axios
      .patch(
        `${process.env.BaseURI}/midicine/stocks/update/${medicine[0].MedicineID}`,
        { ...medicine }
      )
      .then(() => {
        setDisabled(true);
        Toast.fire({
          icon: "success",
          title: "Changes are saved",
        });
      })
      .catch((error) => {
        setDisabled(true);
        console.log(error.message);
        Toast.fire({
          icon: "error",
          title: "Please UPDATE the Expiry Date and Stocks",
        });
      });
  };

  const handleEdit = () => {
    setDisabled(false);
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
                    Medicine Details
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
                        <>
                          <Link
                            href={images.preview}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={images.preview}
                              width="100%"
                              height="100%"
                              style={{ borderRadius: "999px" }}
                              alt="image"
                            />
                          </Link>
                        </>
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

                        {/* {images.preview && !filename && (
                          <button
                            type="submit"
                            className={medicineStyles.btn__uploadFile}
                          >
                            Save
                          </button>
                        )} */}
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
                      {/* <Typography variant="h5" component="h5" color="#B82623">
                        Medicine Information
                      </Typography> */}
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
                            value={medicine[0].Name || ""}
                            disabled={true}
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
                            value={
                              disabled
                                ? medicine[0].Stocks || ""
                                : medicine.Stocks
                            }
                            disabled={disabled}
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
                            value={medicine[0].Unit || ""}
                            disabled={true}
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
                            value={medicine[0].Size || ""}
                            disabled={true}
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
                            type={disabled ? "text" : "date"}
                            name="Expiry Date"
                            value={
                              disabled
                                ? new Date(
                                    medicine[0].ExpiryDate
                                  ).toLocaleDateString("en-us", {
                                    // weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }) || ""
                                : medicine.ExpireDate
                            }
                            disabled={disabled}
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
                            value={medicine[0].Manufacturer || ""}
                            disabled={true}
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
                            value={medicine[0].Dosage || ""}
                            disabled={true}
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
                          <textarea
                            style={{
                              height: "100px",
                              maxHeight: "100px",
                              minHeight: "100px",
                              maxWidth: "100%",
                              minWidth: "100%",
                            }}
                            className={styles.input__register}
                            onChange={(e) =>
                              setMedicine({
                                ...medicine,
                                Description: e.target.value,
                              })
                            }
                            type="text"
                            name="Description"
                            value={medicine[0].Description || "No Description"}
                            disabled={true}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
                <Box
                  className={styles.buttonRegister}
                  style={{ display: "flex", gap: "0.5rem" }}
                >
                  <Button style={{ color: "#b82623" }} onClick={handleBack}>
                    Back
                  </Button>

                  {!disabled && (
                    <Button
                      variant="outlined"
                      style={{ color: "#b82623", border: "1px solid #b82623" }}
                      onClick={()=>setDisabled(true)}
                    >
                      Cancel
                    </Button>
                  )}

                  <Button
                    // disabled={disabled}
                    className={
                      disabled ? styles.proceedBtnDisabled : styles.proceedBtn
                    }
                    onClick={(e) =>
                      disabled ? handleEdit(e) : handleUpdateSubmit(e)
                    }
                  >
                    {disabled ? "Edit" : "Save"}
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

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.BaseURI}/allmedicines`);
    const { Medicines } = await res.json();

    return {
      paths: Medicines.map((medicine) => {
        return { params: { _id: medicine.MedicineID.toString() } };
      }),
      fallback: false,
    };
  } catch (err) {
    console.log("Ops path in invaid!");
  }
}

export async function getStaticProps({ params }) {
  try {
    // Get all released Medicines
    const releasedMedicines = await fetch(
      `${process.env.BaseURI}/medicine/detail/${params._id}`
    );
    const { Medicines } = await releasedMedicines.json();

    return {
      props: {
        Medicines,
      },
    };
  } catch (err) {
    console.log(
      "Fetching data error or please check your internet connection",
      err
    );
  }
}
