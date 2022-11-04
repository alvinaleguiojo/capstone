import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Meta from "../../component/Meta";
import styles from "../../styles/Patients.module.css";
import MedicineStyles from "../../styles/Medicines.module.css";
import recordStyles from "../../styles/Records.module.css";
import Typography from "@mui/material/Typography";
import axios from "axios";

import useAuth from "../../customhook/Auth";

import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

import {
  DateRangePickerComponent,
  PresetsDirective,
  PresetDirective,
} from "@syncfusion/ej2-react-calendars";

const Index = () => {
  useAuth(); // this will check if the user is authenticated else return login page
  const router = useRouter();
  const [calendar, setCalendar] = useState([]);

  //  date picker custom dates starts here
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay() - 1
  );
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDay() - 1
  );

  // startDate.setDate(startDate.getDate() + 30);
  // endDate.setDate(endDate.getDate() + 30);

  const today = new Date(new Date().toDateString());
  const weekStart = new Date(
    new Date(
      new Date().setDate(new Date().getDate() - ((new Date().getDay() + 7) % 7))
    ).toDateString()
  );
  const weekEnd = new Date(
    new Date(
      new Date().setDate(
        new Date(
          new Date().setDate(
            new Date().getDate() - ((new Date().getDay() + 7) % 7)
          )
        ).getDate() + 6
      )
    ).toDateString()
  );
  const monthStart = new Date(new Date(new Date().setDate(1)).toDateString());
  const monthEnd = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)
    ).toDateString()
  );
  const lastStart = new Date(
    new Date(
      new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
    ).toDateString()
  );
  const lastEnd = new Date(new Date(new Date().setDate(0)).toDateString());
  const yearStart = new Date(
    new Date(new Date().getFullYear() - 1, 0, 1).toDateString()
  );
  const yearEnd = new Date(
    new Date(new Date().getFullYear() - 1, 11, 31).toDateString()
  );

  // productsList state
  const [productList, setProductList] = useState({
    series: [
      {
        data: [10, 4, 35, 20, 10, 20, 42, 25, 15, 33],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 10,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Biogesic",
          "Salbutamol",
          "Diphenhydramine",
          "Tramadol",
          "Abarelix",
          "Biogesic",
          "Salbutamol",
          "Diphenhydramine",
          "Tramadol",
          "Abarelix",
        ],
      },
    },
  });

  // products state
  const [productsDataSource, setProductsDataSource] = useState({
    series: [
      {
        name: "Products",
        data: [10, 4, 35, 20, 10],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      //   title: {
      //     text: "Product Trends by Month",
      //     align: "left",
      //   },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
  });

  // In-stocks state
  const [inStocksDataSource, setInstocksDataSource] = useState({
    series: [
      {
        name: "In-Stocks",
        data: [10, 27, 42, 26, 49],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "rgb(8, 153, 129)",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      //   title: {
      //     text: "Product Trends by Month",
      //     align: "left",
      //   },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
  });

  // Expire state Datasource
  const [expiredDataSource, setExpireDataSource] = useState({
    series: [
      {
        name: "Expired Medicines",
        data: [10, 41, 21, 51, 49],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#b82623",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      //   title: {
      //     text: "Product Trends by Month",
      //     align: "left",
      //   },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
  });

  //Released state Datasource
  const [releasedDataSource, setReleasedDataSource] = useState({
    series: [
      {
        name: "Released Medicines",
        data: [10, 41, 35, 51, 49],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: { show: false },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: "#bf9d04",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      //   title: {
      //     text: "Product Trends by Month",
      //     align: "left",
      //   },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      },
    },
  });

  // get value from date picker
  const getDateRange = (e) => {
    const selectedDateRange = e.value;
    setCalendar(selectedDateRange);
  };

  return (
    <Box>
      <Meta
        title="Capstone | Medicines Reports"
        description="add or update medicines here"
        keywords="Capstone project, health center, baranggay"
      />

      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content}>
          <Box className={styles.patients} style={{ overflow: "auto" }}>
            <Box className={recordStyles.search}>
              {/* medicines tabs  */}
              <Box className={MedicineStyles.medicineTabs}>
                <Box className={MedicineStyles.tabs}>
                  <Box
                    className={
                      router.route == "/medicines"
                        ? MedicineStyles.active
                        : MedicineStyles.tab
                    }
                    onClick={() => router.push("/medicines")}
                  >
                    <Typography variant="h5" component="h5" color="#B82623">
                      Inventory
                    </Typography>
                  </Box>
                  <Box
                    className={
                      router.route == "/medicines/released"
                        ? MedicineStyles.active
                        : MedicineStyles.tab
                    }
                    onClick={() => router.push("/medicines/released")}
                  >
                    <Typography variant="h5" component="h5" color="#B82623">
                      Released
                    </Typography>
                  </Box>
                  <Box
                    className={
                      router.route == "/medicines/reports"
                        ? MedicineStyles.active
                        : MedicineStyles.tab
                    }
                    onClick={() => router.push("/medicines/reports")}
                  >
                    <Typography variant="h5" component="h5" color="#B82623">
                      Reports
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* end tabs here */}

            <Box
              style={{
                width: "200px",
                alignSelf: "flex-end",
              }}
            >
              <DateRangePickerComponent
                placeholder=" Select Date"
                startDate={startDate}
                endDate={endDate}
                format="MMM-dd-yyyy"
                change={getDateRange}
              >
                <PresetsDirective>
                  <PresetDirective
                    label="Today"
                    start={today}
                    end={today}
                  ></PresetDirective>

                  <PresetDirective
                    label="This Week"
                    start={weekStart}
                    end={weekEnd}
                  ></PresetDirective>
                  <PresetDirective
                    label="This Month"
                    start={monthStart}
                    end={monthEnd}
                  ></PresetDirective>
                  <PresetDirective
                    label="Last Month"
                    start={lastStart}
                    end={lastEnd}
                  ></PresetDirective>
                  <PresetDirective
                    label="Last Year"
                    start={yearStart}
                    end={yearEnd}
                  ></PresetDirective>
                </PresetsDirective>
              </DateRangePickerComponent>
            </Box>

            {/* categories starts here */}
            <Typography variant="h6" component="h6" color="#B82623">
              Reports
            </Typography>
            <Box className={MedicineStyles.catergories}>
              <Box className={MedicineStyles.category}>
                <span>
                  Products <strong>{100}</strong>
                </span>
                <ApexCharts
                  options={productsDataSource.options}
                  series={productsDataSource.series}
                  type="area"
                  height={150}
                  width={280}
                />
              </Box>

              <Box className={MedicineStyles.category}>
                <span>
                  In-Stocks <strong>{60}</strong>
                </span>
                <ApexCharts
                  options={inStocksDataSource.options}
                  series={inStocksDataSource.series}
                  type="area"
                  height={150}
                  width={270}
                />
              </Box>
              <Box className={MedicineStyles.category}>
                <span>
                  Expired <strong>{5}</strong>
                </span>
                <ApexCharts
                  options={expiredDataSource.options}
                  series={expiredDataSource.series}
                  type="area"
                  height={150}
                  width={270}
                />
              </Box>
              <Box className={MedicineStyles.category}>
                <span>
                  Released <strong>{50}</strong>
                </span>
                <ApexCharts
                  options={releasedDataSource.options}
                  series={releasedDataSource.series}
                  type="area"
                  height={150}
                  width={270}
                />
              </Box>
            </Box>
            {/* categories ends here */}

            {/* product list data */}
            <Box className={MedicineStyles.product__list}>
              <Typography variant="h6" component="h6" color="#B82623">
                Product List
              </Typography>
              <ApexCharts
                options={productList.options}
                series={productList.series}
                type="bar"
                height={350}
              />
            </Box>
          </Box>
          {/* product list data */}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
