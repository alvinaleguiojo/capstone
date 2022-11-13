import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../../../../styles/Patients.module.css";
import Box from "@mui/material/Box";
import Meta from "../../../../component/Meta";
import Typography from "@mui/material/Typography";
import { Breadcrumb } from "antd";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";
import { Button, IconButton } from "@mui/material";
import MessageIcon from "../../../../assets/image/message-circle.svg";
import moment from "moment";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import axios from "axios";
import ReactLoading from "react-loading";
import Swal from "sweetalert2";

const Index = ({ patient, Diagnosis, patientImage, Staff }) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(true);
  const [pdfUrl, setPDFUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificate() {
      //setting up the heaaders
      const headers = {
        Authorization: `Bearer ${process.env.PDF_API_SECRET}`,
      };

      try {
        // fetch patient certificate
        const certificate = await axios.get(
          `${process.env.BaseURI}/patient/certificate/${Diagnosis[0].DiagnosisID}`
        );

        // fetch the patient certificate pdf file from API
        const pdf = await axios.get(
          `${process.env.PDF_API_URL}/documents/${certificate.data.Certificates[0].PDFLinkID}`,
          { headers }
        );
        pdf && setDisabled(false);
        pdf && setPDFUrl(pdf.data.document.download_url);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setDisabled(true);
        setLoading(false);
      }
    }
    fetchCertificate();
  }, [router]);

  const handleExportPFD = async (pdfUrl) => {
    setDisabled(true);
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
    await Toast.fire({
      icon: "success",
      title: "Downloading...",
    }).then(() => {
      function download() {
        window.open(pdfUrl);
      }
      download();
    });
  };

  return (
    <>
      {patient.map((patientData) => {
        return (
          <Box key={patientData.PatientID}>
            <Meta
              title="Capstone | Patient"
              description="add or update medicines here"
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
                        onClick={() => router.push("/patients")}
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        Back to Patients
                      </Breadcrumb.Item>
                      <Breadcrumb.Item
                        onClick={() =>
                          router.push(`/patients/${patientData.PatientID}`)
                        }
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        Profile
                      </Breadcrumb.Item>
                      <Breadcrumb.Item style={{ color: "grey" }}>
                        Diagnosis
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </Box>
                  <Box className={styles.content} style={{ minWidth: "330px" }}>
                    <Box className={styles.ProfileImageContainer}>
                      {patientImage !== null ? (
                        <Image
                          src={patientImage}
                          alt="user profile"
                          width={80}
                          height={80}
                          className={styles.patientImage}
                        />
                      ) : (
                        <Image src={UserIcon} alt="user profile" />
                      )}
                    </Box>

                    {/* <CustomWebcam/> */}
                    <Typography
                      variant="h5"
                      component="h5"
                      color="#B82623"
                      style={{ textAlign: "center" }}
                    >
                      {patientData.FirstName + " " + patientData.LastName}
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
                        <Typography
                          variant="body"
                          component="h4"
                          color="#B82623"
                        >
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
                          <Typography
                            variant="body"
                            component="h4"
                            color="#B82623"
                          >
                            {patientData.Phone}
                          </Typography>
                          <Tooltip title="Phone Number should start with +63">
                            <IconButton
                              onClick={() => {
                                handleMessageModal(patientData.Phone);
                              }}
                            >
                              <Image
                                src={MessageIcon}
                                alt="user profile"
                                height={25}
                                width={25}
                              />
                            </IconButton>
                          </Tooltip>
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
                        <Typography
                          variant="body"
                          component="h4"
                          color="#B82623"
                        >
                          {patientData.Street +
                            " " +
                            patientData.Baranggay +
                            " " +
                            patientData.City}
                        </Typography>
                      </Box>
                      {/* card end here */}
                    </Box>
                  </Box>
                </Box>
                {/* left container starts here */}
                {/* right container starts here */}
                <Box className={styles.right__container}>
                  <Typography variant="h6" component="h6">
                    Diagnosis Details
                  </Typography>

                  <label>
                    Date: {moment(Diagnosis[0].Date).format("MMMM DD, YYYY")}
                  </label>
                  <label>
                    Physician: {`${Staff[0].FirstName}  ${Staff[0].LastName}`}
                  </label>
                  <label>Diagnose: {Diagnosis[0].Diagnose}</label>
                  <label>Notes: {Diagnosis[0].Notes}</label>

                  {!pdfUrl && loading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ReactLoading type="balls" color="#d9dae0" />
                    </div>
                  )}
                  {!loading && (
                    <Button
                      variant="contained"
                      // if the disabled is false and has a certificate then enable this button
                      disabled={disabled}
                      onClick={() => handleExportPFD(pdfUrl)}
                      style={{ backgroundColor: !disabled && "#b82623" }}
                    >
                      <FileDownloadIcon />
                      {/* <Link href={pdfUrl}>Export PDF</Link> */}
                      Export MEDICAL CERTIFICATE
                    </Button>
                  )}
                </Box>
                {/* right container ends here */}
              </Box>
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default Index;

export async function getStaticPaths() {
  try {
    const res = await fetch(`${process.env.BaseURI}/diagnosis`);
    const { Diagnosis } = await res.json();

    return {
      paths: Diagnosis.map((diagnose) => {
        return {
          params: {
            _id: JSON.stringify(diagnose.PatientID),
            diagnosis: JSON.stringify(diagnose.DiagnosisID),
          },
        };
      }),
      fallback: "blocking",
    };
  } catch (err) {
    console.log("Ops path in invaid!");
  }
}

export async function getStaticProps({ params }) {
  try {
    // Fetch Patient By ID
    const resPatient = await fetch(
      `${process.env.BaseURI}/patient/${params._id}`
    );
    const patient = await resPatient.json();
    console.log(patient);

    // fetch Diagnosis By ID
    const res = await fetch(
      `${process.env.BaseURI}/patient/diagnosis/data/${params.diagnosis}`
    );
    const { Diagnosis } = await res.json();

    // fetching Staff or Physician
    const resStaff = await fetch(
      `${process.env.BaseURI}/user/${Diagnosis[0].StaffID}`
    );
    const { result } = await resStaff.json();

    // feth patient Image
    const patientImageID = await patient[0].ImageID.toString();
    const imageRes = await fetch(
      `${process.env.BaseURI}/image/${patientImageID}`
    );
    const patientProfilePic = await imageRes.json();
    const patientImage = (await patientProfilePic[0].Image) || null;

    return {
      props: {
        patient,
        Diagnosis,
        patientImage,
        Staff: result,
      },
      revalidate: 1,
    };
  } catch (err) {
    console.log(
      "Fetching data error or please your internet connection",
      err.message
    );
  }
}
