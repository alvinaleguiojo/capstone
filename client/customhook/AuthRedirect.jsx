import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default async function useAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    async function dashboard() {
      await axios
        .get("http://localhost:3001", { withCredentials: true })
        .then(() => {
          router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    dashboard();
  }, [router]);
}
