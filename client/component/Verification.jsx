import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";

const Verification = () => {
  const router = useRouter();

  // // get users data from redux
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    user.length > 0 &&
    user[0].Status === 0 &&
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: `Please inform the admin to verify your account.`,
        allowOutsideClick: false,
        //   footer: '<a href="">Why do I have this issue?</a>',
      }).then(() => {
        axios
          .get(`${process.env.BaseURI}/logout`, { withCredentials: true })
          .then(() => {
            router.push("/login");
            Swal.fire("Success!", "You are now in the Login Page.", "success");
          })
          .catch((error) => console.log(error.message));
      });
  }, [router]);
};

export default Verification;
