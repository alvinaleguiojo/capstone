import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default async function useAuth() {
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3001", { withCredentials: true })
      .then(() => {})
      .catch(() => {
        router.push("/login")
      });
  }, [router]);
}
