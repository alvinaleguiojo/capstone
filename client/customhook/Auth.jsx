import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
// adding user to the redux
import { addUser } from "../features/Users";

export default async function useAuth() {
  const router = useRouter();

  // medicine redux
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios
        .get(`${process.env.BaseURI}`, { withCredentials: true })
        .then((response) => {
          // set User to to global state redux
          dispatch(addUser(response.data.userData));
          localStorage.setItem("StaffID", response.data.userData._id);
          return response;
        })
        .catch(() => {
          router.push("/forbidden");
        });
    } catch (error) {
      console.log(error);
    }
  }, [router]);
}
