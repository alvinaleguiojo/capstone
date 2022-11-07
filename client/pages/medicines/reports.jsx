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
import ReactLoading from "react-loading";
import useAuth from "../../customhook/Auth";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
import Skeleton from "@mui/material/Skeleton";
import {
  DateRangePickerComponent,
  PresetsDirective,
  PresetDirective,
} from "@syncfusion/ej2-react-calendars";

const Index = ({ Medicines, ReleasedMedicines }) => {
  useAuth(); // this will check if the user is authenticated else return login page
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [calendar, setCalendar] = useState([]);
  const [medicinesData, setMedicines] = useState(Medicines);
  const [releasedMedicinesData, setReleasedMedicinesData] =
    useState(ReleasedMedicines);
  const [inStocksCount, setInstocksCount] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  // set loading state
  setTimeout(() => {
    setLoading(false);
  }, 1000);

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
  const [productList, setProductList] = useState({});

  useEffect(() => {
    const abortController = new AbortController();

    // mapping all the product name from medicinesData
    const medicineNames = medicinesData.map((data) => {
      return data.Name;
    });
    // mapping all the product Stocks value from medicinesData
    const medicineStocks = medicinesData.map((data) => {
      return data.Stocks;
    });

    setDataSource({
      series: [
        {
          name: "Stocks",
          data: [10, 41, 35],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "Product Trends by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar"],
        },
      },
    });

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    console.log("abort");
    // mapping all the product name from medicinesData
    const medicineNames = medicinesData.map((data) => {
      return data.Name;
    });
    // mapping all the product Stocks value from medicinesData
    const medicineStocks = medicinesData.map((data) => {
      return data.Stocks;
    });

    // mapping all released medicines
    const releasedQuantities = releasedMedicinesData.map((released, index) => {
      return released.Quantity;
    }, 0);

    const sum = releasedQuantities.reduce((accumulate, value) => {
      return accumulate + value;
    }, 0);
    console.log(sum);

    setProductList({
      series: [
        {
          name: "Stocks",
          data: medicineStocks,
        },
        {
          name: "Released",
          data: [10, 5, 15, 6, 5, 3],
        },
        {
          name: "Expired",
          data: [1, 2 , 1, 1, 1],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 200,
          toolbar: { show: false },
          stacked: true,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        colors: ["#099880", "#c1a00b", "#b82623"],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: medicineNames,
        },
      },
    });

    return () => {
      abortController.abort();
    };
  }, [medicinesData]);

  // products state
  const [productsDataSource, setProductsDataSource] = useState({
    series: [
      {
        name: "Out-of-Stocks",
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
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
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
  const [releasedDataSource, setReleasedDataSource] = useState();
  const [releasedSum, setReleasedSum] = useState(0);

  useEffect(() => {
    // mapping all released medicines quantity
    const releasedQuantities = releasedMedicinesData.map((released, index) => {
      return released.Quantity;
    });

    const sum = releasedQuantities.reduce((accumulate, value) => {
      return accumulate + value;
    }, 0);

    setReleasedSum(sum);

    setReleasedDataSource({
      series: [
        {
          name: "Released Medicines",
          data: [10, 15, 10, 5, 4],
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
  }, [releasedMedicinesData]);

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
              <Box className={MedicineStyles.container__date__picker}>
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
            </Box>
            {/* end tabs here */}

            {/* categories starts here */}
            <Typography variant="h6" component="h6" color="#B82623">
              Overall Reports
            </Typography>

            {/* {loading ? (
              <Box
                style={{
                  alignSelf: "center",
                  height: "100%",
                  width: "100%",
                }}
              > */}

            {/* <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "5px" }}
                  sx={{ bgcolor: "grey.200" }}
                />
              </Box>
            ) : (
              <ApexCharts
                options={dataSource.options}
                series={dataSource.series}
                type="area"
                height={450}
                width="100%"
              />
            )} */}

            <Box className={MedicineStyles.catergories}>
              <Box className={MedicineStyles.category}>
                {loading ? (
                  <Box
                    style={{
                      alignSelf: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {/* <ReactLoading type="balls" color="#B82623" /> */}
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "5px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  </Box>
                ) : (
                  <>
                    <span>
                      Out-of-Stocks <strong>{2}</strong>
                    </span>
                    <ApexCharts
                      options={productsDataSource.options}
                      series={productsDataSource.series}
                      type="area"
                      height={150}
                      width={280}
                    />
                  </>
                )}
              </Box>

              <Box className={MedicineStyles.category}>
                {loading ? (
                  <Box
                    style={{
                      alignSelf: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {/* <ReactLoading type="balls" color="#B82623" /> */}
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "5px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  </Box>
                ) : (
                  <>
                    <span>
                      In-Stocks <strong>{100}</strong>
                    </span>
                    <ApexCharts
                      options={inStocksDataSource.options}
                      series={inStocksDataSource.series}
                      type="area"
                      height={150}
                      width={270}
                    />
                  </>
                )}
              </Box>
              <Box className={MedicineStyles.category}>
                {loading ? (
                  <Box
                    style={{
                      alignSelf: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {/* <ReactLoading type="balls" color="#B82623" /> */}
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "5px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  </Box>
                ) : (
                  <>
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
                  </>
                )}
              </Box>
              <Box className={MedicineStyles.category}>
                {loading ? (
                  <Box
                    style={{
                      alignSelf: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {/* <ReactLoading type="balls" color="#B82623" /> */}
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width="100%"
                      height="100%"
                      style={{ borderRadius: "5px" }}
                      sx={{ bgcolor: "grey.200" }}
                    />
                  </Box>
                ) : (
                  <>
                    <span>
                      Released <strong>{releasedSum}</strong>
                    </span>
                    <ApexCharts
                      options={releasedDataSource.options}
                      series={releasedDataSource.series}
                      type="area"
                      height={150}
                      width={270}
                    />
                  </>
                )}
              </Box>
            </Box>
            {/* categories ends here */}

            {/* product list data */}
            <Box className={MedicineStyles.product__list}>
              <Typography variant="h6" component="h6" color="#B82623">
                Product List
              </Typography>

              {loading ? (
                <Box style={{ alignSelf: "center" }}>
                  <ReactLoading type="balls" color="#d9dae0" />
                </Box>
              ) : (
                <ApexCharts
                  options={productList.options}
                  series={productList.series}
                  type="bar"
                  height={350}
                />
              )}
            </Box>
          </Box>
          {/* product list data */}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;

export const getStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.BaseURI}/allmedicines`);
    const resReleased = await fetch(
      `${process.env.BaseURI}/medicines/released/nopagination`
    );
    const { Medicines } = await res.json();
    const responseReleased = await resReleased.json();
    const ReleasedMedicines = await responseReleased.Medicines;

    return {
      props: {
        Medicines,
        ReleasedMedicines,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
