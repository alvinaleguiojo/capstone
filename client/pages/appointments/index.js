import React, { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import styles from "../../styles/Appointment.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Typography from "@mui/material/Typography";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Swal from "sweetalert2";
import Meta from "../../component/Meta";

const Index = () => {
  const [appointment, setAppointment] = useState({});
  const [calendar, setCalendar] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log(appointment);
    let appointmentInput = Object.values(appointment).includes("");
    !appointmentInput && Object.keys(appointment).length >= 5 && calendar
      ? setDisabled(false)
      : setDisabled(true);
  }, [appointment, calendar]);

  useEffect(() => {
    setAppointment({ ...appointment, schedule: calendar });
  }, [calendar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/appointment", {
        ...appointment,
      })
      .then(() => {
        Swal.fire("Success!", "Appointment has been set!", "success");
        setLoading(false);
        setAppointment({
          ...appointment,
          firstname: "",
          lastname: "",
          address: "",
          phone: "",
          note: "",
          vaccine: false,
          immunization: false,
          prenatal: false,
          service_type: "",
        });
      })
      .catch((err) => console.log("Error" + err));
  };

  return (
    <Box className={styles.appointment}>
      <Meta
        title="Capstone | Appointments"
        description="set an appointment to schedule your check-up"
        keywords="Capstone project, health center, baranggay"
      />
      <Navbar />
      <Box className={contentStyles.content}>
        <Tabs />
        <Box className={reusableStyle.main__content}>
          {/* left content starts here */}
          <Box className={styles.content__left}>
            <Typography variant="body2" component="h4" color="#585858">
              First Name
            </Typography>
            <input
              className={reusableStyle.input}
              type="text"
              name="firstname"
              value={appointment.firstname}
              maxLength={50}
              onChange={(e) =>
                setAppointment({ ...appointment, firstname: e.target.value })
              }
            />

            <Typography variant="body2" component="h4" color="#585858">
              Last Name
            </Typography>
            <input
              className={reusableStyle.input}
              type="text"
              name="lastname"
              value={appointment.lastname}
              maxLength={50}
              onChange={(e) =>
                setAppointment({ ...appointment, lastname: e.target.value })
              }
            />

            <Typography variant="body2" component="h4" color="#585858">
              Address
            </Typography>
            <input
              className={reusableStyle.input}
              type="text"
              name="address"
              value={appointment.address}
              maxLength={250}
              onChange={(e) =>
                setAppointment({ ...appointment, address: e.target.value })
              }
            />

            <Typography variant="body2" component="h4" color="#585858">
              Phone Number
            </Typography>
            <input
              className={reusableStyle.input}
              type="number"
              name="phone"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              maxLength={11}
              min={0}
              value={appointment.phone}
              onChange={(e) =>
                setAppointment({ ...appointment, phone: e.target.value })
              }
            />

            <Typography variant="body2" component="h4" color="#585858">
              Note (Optional)
            </Typography>
            <textarea
              style={{
                maxWidth: "350px",
                minWidth: "350px",
                minHeight: "100px",
                maxHeight: "110px",
              }}
              className={reusableStyle.input}
              maxLength={250}
              type="text"
              name="purpose"
              value={appointment.note}
              onChange={(e) =>
                setAppointment({ ...appointment, note: e.target.value })
              }
            />
          </Box>

          <Box className={styles.content__right}>
            <Box className={styles.sunrise}>
              <Typography variant="h5" component="h5" color="#585858">
                Date: {calendar.getMonth()}/{calendar.getDate()}/
                {calendar.getFullYear()}
              </Typography>
            </Box>

            {/* calendar start here */}
            <Box className={styles.calendar}>
              <Calendar
                onChange={setCalendar}
                value={appointment.calendar}
                minDate={new Date()}
                tileDisabled={({ date }) => !date.getDay("Sunday")}
              />

              <Typography variant="h5" component="h5" color="#585858">
                Type of Service:
              </Typography>

              <FormControlLabel
                control={
                  <Checkbox
                    value={appointment.vaccine}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        vaccine: e.target.checked,
                        service_type: "Vaccine",
                      })
                    }
                  />
                }
                label="Vaccine"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value={appointment.immunization}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        immunization: e.target.checked,
                        service_type: "Immunization",
                      })
                    }
                  />
                }
                label="Immunization"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value={appointment.prenatal}
                    onChange={(e) =>
                      setAppointment({
                        ...appointment,
                        prenatal: e.target.checked,
                        service_type: "Prenatal",
                      })
                    }
                  />
                }
                label="Prenatal"
              />

              <LoadingButton
                onClick={handleSubmit}
                loading={loading}
                variant="contained"
                className={styles.btn__appointment}
                disabled={disabled}
              >
                Set Appointment
              </LoadingButton>
            </Box>
            {/* calendar end here */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
