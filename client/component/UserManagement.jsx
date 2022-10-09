import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../styles/UserManagement.module.css";
import Image from "next/image";
import UserIcon from "../assets/image/User.svg";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "#177ddc" : "rgb(7, 199, 7)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

// fetch users data from User Endpoint
const UserManagement = () => {
  const [users, setUsers] = useState([{ action: false }]);

  useEffect(() => {
    const users = async () => {
      try {
        const res = await axios.get("http://localhost:3001/users");
        const { Users } = await res.data;
        setUsers(Users);
      } catch (error) {
        console.log(error.message);
      }
    };
    users();
  }, []);

  // Action options will be visible when the user state action is true else hidden
  const toggleAction = (user) => {
    // setting all action state to false
    const actionInVisible = users.map((toggle) => {
      return (toggle.action = false);
    });
    setUsers(actionInVisible);

    const newValue = { ...user, action: !user.action };
    const updatedUser = users.map((newuser) => {
      return newuser.StaffID === user.StaffID ? newValue : newuser;
    });

    setUsers(updatedUser);
  };

  return (
    <Box className={styles.UserManagement}>
      <Typography variant="h5" component="h5">
        List of Users
      </Typography>
      <Box className={styles.users}>
        <Box className={styles.users__headers}>
          <Typography variant="body1" component="h5">
            Name
          </Typography>
          <Typography variant="body1" component="h5">
            Position
          </Typography>
          <Typography variant="body1" component="h5">
            Status
          </Typography>
          <Typography variant="body1" component="h5">
            Actions
          </Typography>
        </Box>
        <Box className={styles.cards}>
          {/* cards starts here */}
          {users.map((user) => (
            <Box className={styles.card} key={user.StaffID}>
              <Box className={styles.user__name}>
                {/* User Profile Picture and Name */}
                <Image src={UserIcon} width="40px" height="40px" />
                <Typography variant="body1" component="h5">
                  {user.FirstName + " " + user.LastName}
                </Typography>
              </Box>
              {/* User position  */}
              <Box className={styles.users__position}>
                <Typography variant="body1" component="h5">
                  {user.Role}
                </Typography>
              </Box>

              {/* User Status  */}
              <Box className={styles.users__status}>
                <Box
                  className={
                    user.Status === 1
                      ? styles.user__status
                      : styles.user__status__deactivate
                  }
                ></Box>
                <Typography variant="body1" component="h5">
                  {user.Status === 1 ? "Activated" : "Deactivated"}
                </Typography>
              </Box>

              <IconButton onClick={() => toggleAction(user)}>
                <MoreVertIcon style={{ color: user.action && "#B82623" }} />
              </IconButton>

              {/* display action option when user action state is true */}
              {user.action && (
                <motion.div
                  //  className={styles.register__container}
                  initial={{ x: "3vw" }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Box className={styles.more}>
                    <Box className={styles.status}>
                      <AntSwitch checked={user.Status == 1 ? true : false} />
                      <Typography variant="body1" component="h5">
                        Status
                      </Typography>
                    </Box>
                    <Box className={styles.edit}>
                      <ModeEditIcon fontSize="small" />
                      <Typography variant="body1" component="h5">
                        Set Role
                      </Typography>
                    </Box>
                    <Box className={styles.delete}>
                      <DeleteIcon fontSize="small" />
                      <Typography variant="body1" component="h5">
                        Remove
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              )}
            </Box>
          ))}
          {/* end card here */}
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
