import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default async function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function dashboard() {
      try {
        await axios
          .get(`${process.env.BaseURI}`, { withCredentials: true })
          .then((response) => {
            router.push("/dashboard");
            return response;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
    dashboard();
  }, [router]);
}
