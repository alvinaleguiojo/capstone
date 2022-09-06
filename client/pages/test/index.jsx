import React, { useEffect, useState } from "react";
import * as Realm from "realm-web";

const index = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(async () => {
    async function fethData() {
      const app = new Realm.App({ id: process.env.REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const appointmentsData = await user.functions.getAppointments();
        setAppointments(appointmentsData);
      } catch (err) {
        console.log("Failed to log in", err);
      }
    }
    fethData();
  }, []);

  return (
    <div>
      {appointments &&
        appointments.map((appointment) => {
          return <h1 key={appointment._id}>{appointment.firstname}</h1>;
        })}
    </div>
  );
};

export default index;
