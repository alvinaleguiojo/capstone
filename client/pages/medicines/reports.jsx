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
import { LegendToggle, SignalCellularNullSharp } from "@mui/icons-material";
import moment from "moment";
import PrintIcon from "@mui/icons-material/Print";
import Tooltip from "@mui/material/Tooltip";
import GetAppIcon from "@mui/icons-material/GetApp";
import { IconButton } from "@mui/material";
import * as XLSX from "xlsx";

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
  const [reports, setReports] = useState([]);

  // set loading state
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  // reports
  useEffect(() => {
    setReports([
      {
        Inventory: medicinesData.length,
        "Out-Of-Stocks": outOfStocksCount.length,
        "On-hand": inStocks.length,
        expired: expiredStocks.length,
      },
    ]);
  }, [medicinesData, releasedMedicinesData]);

  const Mon = moment().day(1);
  let Monday = new Date(Mon);
  Monday = moment(Monday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Tue = moment().day(2);
  let Tuesday = new Date(Tue);
  Tuesday = moment(Tuesday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Wed = moment().day(3);
  let Wednesday = new Date(Wed);
  Wednesday = moment(Wednesday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Thu = moment().day(4);
  let Thursday = new Date(Thu);
  Thursday = moment(Thursday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Fri = moment().day(5);
  let Friday = new Date(Fri);
  Friday = moment(Friday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Sat = moment().day(6);
  let Saturday = new Date(Sat);
  Saturday = moment(Saturday).format("MMM. DD, YYYY"); // November 5th 2022, 9:14:37 am
  const Weekdays = [
    `${Monday}, ${Tuesday}, ${Wednesday}, ${Thursday}, ${Friday}, ${Saturday}`,
  ];

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
  }, [medicinesData]);

  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    const abortController = new AbortController();

    // mapping all the product name from medicinesData
    const medicineNames = medicinesData.map((data) => {
      return data.Name;
    });
    // mapping all the product Stocks value from medicinesData
    const medicineStocks = medicinesData.map((data) => {
      return data.Stocks;
    });

    // referring to availability of the product
    // if expiry date is greater than today's date then the product is not expired
    // if it is not expired then push 0 value to array else push the stock to the array
    let expired = [];
    medicinesData.forEach((data) => {
      data.ExpiryDate > today ? expired.push(0) : expired.push(data.Stocks);
    });

    // to check the unique value of the array
    // don't return the same value twice
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    // filter unique dates from state
    // map all the MedicineID from ReleasedMedicines
    const listOfID = releasedMedicinesData.map((id) => {
      return id.MedicineID;
    });
    //filter all the the same IDs
    const MedicineIDs = listOfID.filter(unique);
    console.log(MedicineIDs.length)
    // Inititalize the quantity of the released Medicines
    let SumAllQuantity1 = 0;
    // store the quantity base on the ID of the medicines
    let array = [];

    MedicineIDs.forEach((id) => {
      // filter the Released Medicines by ID then the Data
      const releasedMedicinesCount = releasedMedicinesData.filter(
        (released) => {
          return released.MedicineID === id;
        }
      );

      // map all the medicines data then add all the quantity
      releasedMedicinesCount.map((data, index) => {
        SumAllQuantity1 = SumAllQuantity1 + data.Quantity;

        // check the length medicines data
        // if it is equal to the last index of the array
        // then push the quantity to the new array
        if (releasedMedicinesCount.length - 1 == index) {
          array.push(SumAllQuantity1);
        }
      });
    });

    setProductList({
      series: [
        {
          name: "On-hold",
          data: medicineStocks,
        },
        {
          name: "Released",
          data: array,
        },
        {
          name: "Expired",
          data: expired,
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
  const [outOfStocksDataSource, setOutOfStocksDataSource] = useState({});
  const [outOfStocksCount, setOutOfStockCount] = useState({});

  useEffect(() => {
    // mapping all the product name from medicinesData
    const OutOfStocksResults = medicinesData.filter((data) => {
      const Stocks = data.Stocks === 0;
      return Stocks;
    });

    setOutOfStockCount(OutOfStocksResults);

    setOutOfStocksDataSource({
      series: [
        {
          name: "Out-of-Stocks",
          data: [10, 20, 30, 23, 5],
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
  }, [medicinesData]);

  // In-stocks state or onhold
  const [inStocksDataSource, setInstocksDataSource] = useState();
  const [inStocks, setInstocks] = useState({});

  useEffect(() => {
    // mapping all the product name from medicinesData
    const today = moment().format("YYYY-MM-DD");

    const InStocksResults = medicinesData.filter((data) => {
      const Stocks = data.Stocks > 0;
      return Stocks;
    });

    setInstocks(InStocksResults);

    setInstocksDataSource({
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
  }, [medicinesData]);

  // Expire state Datasource
  const [expiredDataSource, setExpireDataSource] = useState({});
  const [expiredStocks, setExpiredStocks] = useState({});

  useEffect(() => {
    // mapping all the product name from medicinesData
    const today = moment().format("YYYY-MM-DD");

    const ExpiredStocksResults = medicinesData.filter((data) => {
      const Stocks = data.ExpiryDate < today;
      return Stocks;
    });

    setExpiredStocks(ExpiredStocksResults);

    setExpireDataSource({
      series: [
        {
          name: "Expired Medicines",
          data: [10, 41, 21, 51, 49],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
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
  }, [medicinesData]);

  // Releasesd Medicines here
  const [releasedMedicinesDataSource, setReleasedMedicinesDataSource] =
    useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const today = moment().format("YYYY-MM-DD");

    // return unique date value from array
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };

    // filter unique dates from state
    const listOfDates = releasedMedicinesData.map((date) => {
      return moment(date.ReleasedDate).format("YYYY-MM-DD");
    });
    const Dates = listOfDates.filter(unique);

    // mapping released Medicines
    let SumAllQuantity1 = 0;
    let array = [];
    console.log(array);

    Dates.forEach((date) => {
      const releasedMedicinesCount = releasedMedicinesData.filter(
        (released) => {
          return moment(released.ReleasedDate).format("YYYY-MM-DD") === date;
        }
      );

      releasedMedicinesCount.map((data, index) => {
        SumAllQuantity1 = SumAllQuantity1 + data.Quantity;

        if (releasedMedicinesCount.length - 1 == index) {
          // console.log("date:"+ date)
          array.push(SumAllQuantity1);
        }
      });
    });

    setReleasedMedicinesDataSource({
      series: [
        {
          name: "Released",
          data: array.slice(0, 6),
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
          zoom: {
            enabled: false,
          },
          toolbar: { show: false },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#feb019",
            shadeTo: "light",
            shadeIntensity: 0.65,
          },
        },
        // title: {
        //   text: "Total Released Medicines  Trend By Date",
        //   align: "left",
        // },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: Dates.slice(0, 6),
        },
      },
    });
    return () => {
      abortController.abort();
    };
  }, []);

  const [servicesDataSource, setServicesDataSource] = useState({});
  useEffect(() => {
    const abortController = new AbortController();
    // to get percentage
    // total registered product divide by total value then multiply by 100

    // const outOfStocksPercentage =
    //   (outOfStocksCount.length / medicinesData.length) * 100;
    // const onHandPercentage = (inStocks.length / medicinesData.length) * 100;
    // const expiredPercentage =
    //   (expiredStocks.length / medicinesData.length) * 100;

    const outOfStocksPercentage = outOfStocksCount.length;
    const onHandPercentage = inStocks.length;
    const expiredPercentage = expiredStocks.length;

    setServicesDataSource({
      series: [outOfStocksPercentage, onHandPercentage, expiredPercentage],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Out-of-Stocks", "On-hand", "Expired"],
        colors: ["#8a8fa0", "#099880", "#b82623"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });
    return () => {
      abortController.abort();
    };
  }, [outOfStocksCount, inStocks, expiredStocks]);

  // get value from date picker
  const getDateRange = (e) => {
    const selectedDateRange = e.value;
    setCalendar(selectedDateRange);
  };

  // export over all reports data
  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(reports);

    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "Reports.xlsx");
  };

  /// export released medicines data
  const handleExportReleased = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(releasedMedicinesData);

    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "ReleasedMedicines.xlsx");
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

            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h6" component="h6" color="#B82623">
                Overall Reports
              </Typography>
              <IconButton onClick={handleExport}>
                <Tooltip title="Export Reports">
                  <GetAppIcon style={{ color: "#8a8fa0" }} />
                </Tooltip>
              </IconButton>
            </Box>

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

            <Box
              className={styles.main}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Box className={MedicineStyles.catergories}>
                <Box className={MedicineStyles.category__header}>
                  {loading ? (
                    <Box
                      style={{
                        alignSelf: "center",
                        height: "100%",
                        width: "100%",
                      }}
                    >
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
                      {/* <ApexCharts
                      options={releasedDataSource.options}
                      series={releasedDataSource.series}
                      type="area"
                      height={150}
                      width={270}
                    /> */}
                      <Typography variant="h2" component="h2" color="#B82623">
                        {medicinesData.length}
                      </Typography>
                      <span>Registered Products</span>
                    </>
                  )}
                </Box>

                <Box className={MedicineStyles.category__header}>
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
                      {/* <ApexCharts
                      options={outOfStocksDataSource.options}
                      series={outOfStocksDataSource.series}
                      type="area"
                      height={150}
                      width={280}
                    /> */}
                      <Typography variant="h2" component="h2" color="#B82623">
                        {outOfStocksCount.length}
                      </Typography>
                      <span>Out-of-Stocks Products</span>
                    </>
                  )}
                </Box>

                <Box className={MedicineStyles.category__header}>
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
                      {/* <ApexCharts
                      options={inStocksDataSource.options}
                      series={inStocksDataSource.series}
                      type="area"
                      height={150}
                      width={270}
                    /> */}
                      <Typography variant="h2" component="h2" color="#B82623">
                        {inStocks.length}
                      </Typography>
                      <span>On-Hand Products</span>
                    </>
                  )}
                </Box>
                <Box className={MedicineStyles.category__header}>
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
                      {/* <ApexCharts
                      options={expiredDataSource.options}
                      series={expiredDataSource.series}
                      type="area"
                      height={150}
                      width={270}
                    /> */}
                      <Typography variant="h2" component="h2" color="#B82623">
                        {expiredStocks.length}
                      </Typography>
                      <span>Expired Products</span>
                    </>
                  )}
                </Box>
              </Box>
              {/* categories ends here */}

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Box
                  className={MedicineStyles.category}
                  style={{ width: "49.3%", height: "300px" }}
                >
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
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Released Medicines </span>
                        <IconButton onClick={handleExportReleased}>
                          <Tooltip title="Export Released Medicines Excel">
                            <GetAppIcon style={{ color: "#8a8fa0" }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                      <ApexCharts
                        options={releasedMedicinesDataSource.options}
                        series={releasedMedicinesDataSource.series}
                        type="area"
                        height="85%"
                        width="100%"
                      />
                    </>
                  )}
                </Box>

                <Box
                  className={MedicineStyles.category}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "49.3%",
                    height: "300px",
                  }}
                >
                  {loading && servicesDataSource != null ? (
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
                      <span>Percentage</span>
                      <ApexCharts
                        options={servicesDataSource.options}
                        series={servicesDataSource.series}
                        type="pie"
                        height={250}
                        // width={380}
                      />
                    </>
                  )}
                </Box>
              </Box>

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
    </Box>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=20, stale-while-revalidate=60"
  );

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
