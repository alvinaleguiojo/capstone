import React, { useRef } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../styles/CustomPdf.module.css";
import { Button } from "@mui/material";
import UserIcon from "../assets/image/User.svg";

const CustomPDF = ({ firstname, lastname, address, phone }) => {
  const component = useRef();

  const handlePrint = useReactToPrint({
    content: () => component.current,
    documentTitle: "form",
  });

  return (
    <>
      <Button
        onClick={handlePrint}
        style={{ padding: "20px", width: "100%", fontWeight: "bold" }}
      >
        Print
      </Button>

      <Box
        ref={component}
        style={{
          padding: "50px",
          height: "100vh",
        }}
      >
        <Typography variant="subtitle2" component="body1" color="black">
          10/20/2022
        </Typography>

        <Typography variant="subtitle2" component="subtitle1" color="black">
          <br /> 3 Shata Terrace Yakima, Washington
        </Typography>

        <Typography
          variant="h4"
          component="h4"
          color="#b82623"
          style={{ fontWeight: "600" }}
        >
          Patient Medical Record
        </Typography>

        <Box style={{ display: "flex", gap: "10rem" }}>
          <Box className={styles.information}>
            <Typography variant="h6" component="h6" color="#b82623">
              Patient Information
            </Typography>

            <Typography variant="subtitle2" component="h4" color="black">
              Name: {firstname + " " + lastname}
            </Typography>

            <Typography variant="subtitle2" component="h4" color="black">
              Phone: {phone}
            </Typography>

            <Typography variant="subtitle2" component="subtitle2" color="black">
              Address: {address}
            </Typography>

            <Typography variant="h6" component="h6" color="#b82623">
              Birth Date
            </Typography>

            <Typography variant="subtitle2" component="subtitle2" color="black">
              10/10/2020
            </Typography>
          </Box>

          <Box className={styles.information}>
            <Box className={styles.profilePicture}>
              <Image src={UserIcon} />
            </Box>
            <Typography variant="h6" component="h6" color="#b82623">
              Weight
            </Typography>

            <Typography variant="subtitle2" component="h6" color="black">
              100
            </Typography>

            <Typography variant="h6" component="h6" color="#b82623">
              Height
            </Typography>
            <Typography variant="subtitle2" component="h6" color="black">
              314
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            variant="h6"
            component="h6"
            color="#b82623"
            style={{ fontWeight: "bold", borderBottom: "solid 2px #b82623" }}
          >
            In Case of Emergy
          </Typography>

          <Typography variant="subtitle1" component="subtitle1" color="black">
            Ewen Haswell
          </Typography>

          <Typography variant="h6" component="h6" color="#b82623">
            Home Phone
          </Typography>
          <Typography variant="subtitle2" component="h6" color="black">
            +63091222313
          </Typography>

          <Typography variant="subtitle2" component="h6" color="black">
            430 Artisan Way <br /> Rochester, New York, 14683 <br /> United
            States
          </Typography>
          <Typography variant="h6" component="h6" color="#b82623">
            Work Phone
          </Typography>

          <Typography
            variant="h6"
            component="h6"
            color="#b82623"
            style={{ fontWeight: "bold", borderBottom: "solid 2px #b82623" }}
          >
            General Medical History
          </Typography>
          <Typography variant="h6" component="h6" color="#b82623">
            Prental
          </Typography>

          <Typography variant="h6" component="h6" color="#b82623">
            Expiry Date
          </Typography>
          <Typography variant="subtitle2" component="h6" color="black">
            4/12/2022
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CustomPDF;
