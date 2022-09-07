import React from "react";
import Box from "@mui/material/Box";
import styles from "../styles/Patients.module.css";
import { useRef, useState, useEffect } from "react";

const CustomChart = () => {

  return (
    <Box className={styles.right__container}>
      <Box className={styles.chart__cards}>
        <Box className={styles.chart__card}>
          {/* <Bar data={data} width={100} height={40} ref={chartRef}   datasetIdKey='id'/> */}
          {/* <Line type='bar' data={chartData} /> */}
        
        </Box>
        {/* <Box className={styles.chart__card}>Completed</Box>
        <Box className={styles.chart__card}>Cancelled</Box> */}
      </Box>
    </Box>
  );
};

export default CustomChart;
