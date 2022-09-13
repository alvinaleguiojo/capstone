import React, { useState, useEffect } from "react";
import Navbar from "../../component/Navbar";
import styles from "../../styles/Dashboard.module.css";
import contentStyles from "../../styles/Content.module.css";
import reusableStyle from "../../styles/Reusable.module.css";
import Box from "@mui/material/Box";
import Tabs from "../../component/Tabs";
import useAuth from "../../customhook/Auth";
import Verification from "../../component/Verification";
import axios from "axios"
import { useRouter } from "next/router";

const index = ({ user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState("") 

  useEffect(() => {
    axios
      .get("http://localhost:3001", { withCredentials: true })
      .then((response) => {
        return setUserData(response.data.id);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);
  

  return (
    <>
      {useAuth() && (
        <Box className={styles.dashboard}>
          <Navbar />
          <Box className={contentStyles.content}>
            <Tabs />
            <Box className={reusableStyle.main__content}>
              Dashboard
              <Verification />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default index;

// export const getStaticProps = async () => {
//   try {
//     const res = await fetch(
//       `http://localhost:3001/user/631da8f3b25de833b38ae762`
//     );
//     const results = await res.json();

//     return {
//       props: {
//         user: results,
//       },
//     };
//   } catch (error) {
//     console.log("please check your internet connection", error);
//   }
// };
