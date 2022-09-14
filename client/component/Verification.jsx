import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Verification = ({ user }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    !user && setShow(true);
  }, []);

  useEffect(() => {
    {
      show &&
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Please inform the admin to verify your account.",
          allowOutsideClick: false,
          //   footer: '<a href="">Why do I have this issue?</a>',
        }).then(() => {
          show && router.reload();
        });
    }
  }, []);
};

export default Verification;
