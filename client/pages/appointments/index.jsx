import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import Tabs from "../../component/Tabs";
import Box from "@mui/material/Box";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import Typography from "@mui/material/Typography";
import Meta from "../../component/Meta";

const Index = ({ appointments, services }) => {
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const newAppointments = appointments.map((appointment) => ({
      Id: appointment.AppointmentID,
      Subject: appointment.FirstName + " " + appointment.LastName,
      Location:
        appointment.Street +
        " " +
        appointment.City +
        " " +
        appointment.Baranggay,
      StartTime: appointment.Schedule,
      EndTime: appointment.Schedule,
      Status: appointment.Status,
      ResourceID: appointment.ServiceID,
      IsAllDay: appointment.IsAllDay,
      Description: appointment.Notes,
    }));
    setTimeout(() => {
      setAppointmentsData(newAppointments);
    }, 500);
  }, [servicesData]);

  useEffect(() => {
    const newService = services.map((service) => ({
      Id: service.ServiceID,
      Name: service.ServiceType,
      Color: service.Color,
    }));
    setServicesData(newService);
    console.log("services", newService);
  }, []);

  // const popupOpen = (args) => {
  //   args.cancel = true;
  // };

  return (
    <Box>
      <Meta
        title="Capstone | Appointments"
        description="add or update Appointments here"
        keywords="Capstone project, health center, baranggay"
      />
      <Box className={contentStyles.content}>
        <Tabs />
        <Box
          className={reusableStyle.main__content}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h5" component="h5" color="#B82623">
            List of Appointments
          </Typography>
          {appointmentsData && (
            <ScheduleComponent
              currentView="Month"
              eventSettings={{
                dataSource: appointmentsData,
                fields: {
                  id: "Id",
                  subject: {
                    name: "Subject",
                    title: "Patient Name",
                    validation: {
                      required: true,
                    },
                  },
                  location: {
                    name: "Location",
                    title: "Address",
                    validation: {
                      required: true,
                    },
                  },
                  description: {
                    name: "Description",
                    title: "Event Description",
                  },
                  startTime: { name: "StartTime", title: "Start Duration" },
                  endTime: { name: "EndTime", title: "End Duration" },
                },
              }}
              selectedDate={
                new Date(new Date().getFullYear(), new Date().getMonth())
              }
              // popupOpen={popupOepn}
            >
              <ResourcesDirective>
                <ResourceDirective
                  field="ResourceID"
                  title="Service Name"
                  name="Resources"
                  textField="Name"
                  idField="Id"
                  colorField="Color"
                  dataSource={servicesData}
                ></ResourceDirective>
              </ResourcesDirective>
              <Inject
                services={[
                  Day,
                  Week,
                  WorkWeek,
                  Month,
                  Agenda,
                  Resize,
                  DragAndDrop,
                ]}
              />
            </ScheduleComponent>
          )}

          {!appointmentsData && <h1>Loading...</h1>}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;

export const getServerSideProps = async ({ context }) => {
  try {
    const res = await fetch(`${process.env.BaseURI}/appointmentswithpatients`);
    console.log();
    const { Appointments } = await res.json();

    const serviceRes = await fetch(`${process.env.BaseURI}/services`);
    const { Services } = await serviceRes.json();

    return {
      props: {
        appointments: Appointments,
        services: Services,
      },
    };
  } catch (error) {
    console.log("please check your internet connection", error);
  }
};
