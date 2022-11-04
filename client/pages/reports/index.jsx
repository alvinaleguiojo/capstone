import React, { useEffect, useState } from "react";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import styles from "../../styles/Reports.module.css";
import Typography from "@mui/material/Typography";

const Index = () => {
  const [datSource, setDataSource] = useState({
    series: [
      {
        name: "Patients",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      // {
      //   name: "Appointments",
      //   data: [11, 32, 45, 32, 34, 52, 41],
      // },
    ],
    options: {
      theme: {
        monochrome: {
          enabled: true,
          color: "#b82623",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  return (
    <Box>
      <Box className={contentStyles.content}>
        <Tabs />
        <Box
          className={reusableStyle.main__content}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1 rem",
            justifyContent: "flex-start",
            // overflowY: "auto"
          }}
        >
          {/* <h1>Reports</h1> */}
          <Typography variant="h5" component="h5" color="#B82623">
           Reports
          </Typography>
          <Box className={styles.catergories}>
            <Box className={styles.category}>Patients</Box>
            <Box className={styles.category}>Appointments</Box>
            <Box className={styles.category}>Services</Box>
            <Box className={styles.category}>Medicines</Box>
          </Box>
          <ApexCharts
            options={datSource.options}
            series={datSource.series}
            type="area"
            height={350}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
