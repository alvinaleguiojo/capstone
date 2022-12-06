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
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Index = () => {
  // redirect to dashboard when current user is authenticated
  useAuthRedirect();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [terms, setTerms] = useState(false);
  // const [privacy, setPrivacy] = useState(false);
  const [serverResponse, setServerResponse] = useState("");
  const [modal, setModal] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const handleScroll = () => {
  //   const scrollableDiv = document.getElementById("scrollableDiv");
  //   if (
  //     scrollableDiv.offsetHeight + scrollableDiv.scrollTop + 1 >=
  //     scrollableDiv.scrollHeight
  //   ) {
  //     setDisabled(false);
  //   }
  // };

  // useEffect(() => {
  //   const scrollableDiv = document.getElementById("scrollableDiv");
  //   scrollableDiv.addEventListener("scroll", handleScroll);
  //   return () => scrollableDiv.removeEventListener("scroll", handleScroll);
  // }, []);

  // terms redux
  // const dispatch = useDispatch();
  // const TemsConditionModal = useSelector((state) => state.terms.value);

  useEffect(() => {
    setModal(false);
  }, [modal]);

  // received a response from the server telling the email is not valid or not exist
  useEffect(() => {
    socket.on("error", (data) => {
      setServerResponse(data.message);
    });
  }, [socket]);

  // sending and checking the input email if it is exist
  useEffect(() => {
    socket.emit("email", user.Email);
  }, [user]);

  // to check if the input field is not empty and turn on the button if meets the requirements
  useEffect(() => {
    let userInput = Object.values(user).includes("");
    !userInput &&
    Object.keys(user).length >= 5 &&
    terms &&
    // privacy == true &&
    user.Password === user.ConfirmPassword
      ? setDisabled(false)
      : setDisabled(true);
  }, [user, terms]); //privacy

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
        // setPrivacy(false);
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
    // setPrivacy(false);
  };

  const handleChange = (e) => {
    setServerResponse("");
    setUser({ ...user, Email: e.target.value.toLocaleLowerCase() });
  };

  const handleOpenModal = () => {
    setModal(true);
    handleOpen();
  };

  const handleDisagree = () => {
    setTerms(false);
    setModal(false);
  };

  const handleAgree = () => {
    setTerms(true);
    setModal(false);
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
              onChange={handleChange}
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
              // onClick={() => {
              //   setModal(true);
              //   dispatch(termsModal());
              // }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={terms}
                    // onChange={(e) => setTerms(e.target.checked)}
                  />
                }
                label="I AGREE WITH THE TERMS OF CONDITIONS"
                onClick={() => handleOpenModal()}
              />

              {modal && (
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Box className={styles.popup__settings}>
                      <Box className={styles.terms__conditions}>
                        <h1 style={{ textAlign: "center" }}>
                          Terms and Conditions
                        </h1>
                        <Divider variant="middle" />
                        <Box id="scrollableDiv" className={styles.contents}>
                          <Typography variant="body1" component="h3">
                            1. AGREEMENT TO TERMS
                          </Typography>
                          <span>
                            Please read these Terms and Conditions (“Terms” or
                            “Terms and Conditions”) carefully before using
                            www.baranggayhealthcenter.com (the “Website” or
                            “Site”) and any features or services offered through
                            the Website (“Services”) operated by Baranggay
                            Health Center or any of its subsidiaries or
                            affiliated entities (“us”, “we”, or “our”). our
                            access to and the use of the Website and its
                            Services is conditioned on your acceptance of and
                            compliance with these Terms. These Terms apply to
                            all visitors, users and others who access or use the
                            Website. By accessing or using
                            www.baranggayhealthcenter.com you agree to be bound
                            by these Terms, as may be updated by us from time to
                            time. You should check this page regularly to take
                            notice of any changes we may have made to the Terms.
                            If you do not agree with any of the terms, please
                            exit the Website promptly. Your use of this Website
                            also requires you to comply with, and to ensure
                            compliance with, all laws, ordinances and
                            regulations applicable to your activities on our
                            sites and services. Unless expressly permitted by
                            supplemental terms, this site is intended for
                            general audiences 18 years of age and older. Access
                            by anyone younger is not authorized.
                          </span>

                          <Typography variant="body1" component="h3">
                            2. No Physician/Patient Relationship or Medical
                            Advice
                          </Typography>
                          <span>
                            The information presented on the Website, through
                            any e-mail or electronic communication sent through
                            the Website via any mailing list, or otherwise is
                            intended for your general knowledge only and is NOT
                            intended to provide specific medical advice or be a
                            substitute for professional medical advice,
                            diagnosis, or treatment. You should not use this
                            information to diagnose or treat a health problem or
                            disease without consulting with a qualified
                            healthcare provider. Use of the Website shall not
                            constitute establishment of a physician/patient or
                            clinical relationship with any individual, nor
                            establishment of or offer to enter into a business
                            relationship with any institution or organization.
                            Please consult your healthcare provider with any
                            questions or concerns you may have regarding the
                            diagnosis, care or treatment of a medical condition.
                          </span>

                          <Typography variant="body1" component="h3">
                            3. Intellectual Property
                          </Typography>
                          <span>
                            All intellectual property shared or made available
                            through the Website is the property of Pillar
                            Health, PC. No individual or entity has any right to
                            make any copies of any intellectual property
                            (including any logos, trademarks, or images) shared
                            or made available through the Website unless
                            permission is expressly granted in writing by the
                            Pillar Health, PC.
                          </span>

                          <Typography variant="body1" component="h3">
                            4. Links to Other Websites
                          </Typography>
                          <span>
                            Our Website may contain links to third-party
                            websites or services that are not owned or
                            controlled by us. Links posted on this Website to
                            other websites are provided only as a convenience to
                            our clients. We have no control over, and assume no
                            responsibility for, the content, accuracy, privacy
                            policies or practices of any third-party web sites
                            or services. Links to such websites or resources do
                            not imply any endorsement by or affiliation with
                            Pillar Health, PC. You acknowledge sole
                            responsibility for and assume all risk arising from
                            your use of any such websites or resources.
                          </span>

                          <Typography variant="body1" component="h3">
                            5. No Warranty
                          </Typography>
                          <span>
                            The information presented on www.pillar.health is
                            provided “as is” and “as available,” without
                            representation or warranty of any kind. Pillar
                            Health, PC does not represent or warrant that such
                            information is or will be always current, complete,
                            or accurate. Any representation or warranty that
                            might be otherwise implied is expressly disclaimed.
                          </span>

                          <Typography variant="body1" component="h3">
                            6.Limitation of Liability
                          </Typography>
                          <span>
                            You agree that under no circumstances shall we be
                            liable for direct, indirect, incidental,
                            consequential, special, punitive, exemplary, or any
                            other damages arising out of your use of the Site or
                            Services.
                          </span>

                          <Typography variant="body1" component="h3">
                            7. Indemnification
                          </Typography>
                          <span>
                            You shall indemnify and hold us harmless from and
                            against any and all losses, damages, settlements,
                            liabilities, costs, charges, assessments and
                            expenses, as well as third party claims and causes
                            of action, including, without limitation,
                            attorneys&apos; fees, arising out of any breach by
                            you of any of these Terms and Conditions, or any use
                            by you of the Site or Service. You shall provide us
                            with such assistance, without charge, as we may
                            request in connection with any such defense,
                            including, without limitation, providing us with
                            such information, documents, records and reasonable
                            access to you, as we deem necessary. You shall not
                            settle any third party claim or waive any defense
                            without our prior written consent.
                          </span>

                          <Typography variant="body1" component="h3">
                            8. Website Privacy Policy
                          </Typography>
                          <span>
                            Our Website Privacy Policy sets out how we will use
                            your information and can be found at
                            www.pillar.health By using this Website, you consent
                            to the terms described therein and warrant that all
                            information provided by you is accurate.
                          </span>

                          <Typography variant="body1" component="h3">
                            9. Governing Law | Arbitration
                          </Typography>
                          <span>
                            By using the Website, you agree that the laws of the
                            state of Connecticut without regard to principles of
                            conflict of laws, will govern these Terms of Use and
                            any dispute that might arise between you and
                            www.pillar.health. You agree and expressly consent
                            to the exercise of personal jurisdiction in the
                            courts of the State of Connecticut located in the
                            Stamford/Norwalk Judicial District, in connection
                            with any claim involving the Website.
                          </span>

                          <Typography variant="body1" component="h3">
                            10. Changed Terms
                          </Typography>
                          <span>
                            We reserve the right, at our sole discretion, to
                            update, modify or replace any part of these Terms at
                            any time without further notice to you.
                          </span>

                          <Typography variant="body1" component="h3">
                            Contact Us
                          </Typography>
                          <span>
                            If you have any questions about these Terms, please
                            contact us by emailing developer@capstone.com.
                            Effective Date: November 6, 2022
                          </span>
                        </Box>
                        <Box className={styles.buttons}>
                          <Button
                            // className={
                            //   disabled ? styles.disabled : styles.agree
                            // }
                            className={styles.agree}
                            // disabled={false}
                            variant="contained"
                            onClick={handleAgree}
                          >
                            I AGREE
                          </Button>
                          <Button
                            className={styles.disagree}
                            variant="outlined"
                            onClick={handleDisagree}
                          >
                            I DISAGREE
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Modal>
              )}

              {/* <label
                onClick={() => {
                  dispatch(termsModal());
                }}
              >
                I AGREE WITH THE TERMS OF CONDITIONS
              </label> */}

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
