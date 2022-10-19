import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default async function useAuth() {
  const router = useRouter();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001", { withCredentials: true })
        .then((response) => {
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

