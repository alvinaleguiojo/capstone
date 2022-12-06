import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import Swal from "sweetalert2";
import Skeleton from "@mui/material/Skeleton";

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
  const router = useRouter();
  const [users, setUsers] = useState([{ action: false }]);
  const [loading, setLoading] = useState(true);
  const [staffID, setStaffID] = useState(null);

  useEffect(() => {
    const users = async () => {
      try {
        const res = await axios.get(`${process.env.BaseURI}/users`);
        const { Users } = await res.data;
        setUsers(Users);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.log(error.message);
      }
    };
    users();

    const StaffID = localStorage.getItem("StaffID");
    setStaffID(StaffID);
  }, [router]);

  // Action options will be visible when the user state action is true else hidden
  const toggleAction = (user) => {
    // setting all action state to false
    const newValue = { ...user, action: !user.action };
    const updatedUser = users.map((newuser) => {
      return newuser.StaffID === user.StaffID ? newValue : newuser;
    });

    setUsers(updatedUser);
  };

  // Toggle to update the user status
  const ToggleUpdateStatus = async (e, user) => {
    const userStatus = { ...user, Status: e.target.checked };
    const updatedUserStatus = users.map((updateUser) => {
      return updateUser.StaffID === user.StaffID ? userStatus : updateUser;
    });

    const Toast = await Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    if (Toast) {
      //passing data to an API call Update Service
      await axios
        .patch(`${process.env.BaseURI}/user/update/${user.StaffID}`, {
          ...user,
          Status: userStatus.Status,
        })
        .then(() => {
          setUsers(updatedUserStatus);
        });
      Toast.fire({
        icon: "success",
        title: "Changes are saved",
      });
    }
  };

  // setting or updating user role
  const handlesetRole = async (user) => {
    const { value: updatedRole } = await Swal.fire({
      title: "Update User Role",
      input: "select",
      inputOptions: {
        Role: {
          ADMIN: "ADMIN",
          BNS: "BNS",
          // MIDWIFE: "MIDWIFE",
          BHW: "BHW",
        },
      },
      inputPlaceholder: user.Role,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
            axios
              .patch(`${process.env.BaseURI}/user/update/${user.StaffID}`, {
                ...user,
                Role: value,
              })
              .then(() => {
                // setUsers([...users,{ ...user, Role: updatedRole }]);
                const newValue = { ...user, Role: value };
                const updatedUserItem = users.map((updatedUser) => {
                  return updatedUser.StaffID === user.StaffID
                    ? newValue
                    : updatedUser;
                });
                //setting new services data to array
                setUsers(updatedUserItem);
              })
              .then(() => {
                Swal.fire("Success!", `User Role has been updated!`, "success");
              });
          } else {
            resolve("You need to select a Role");
          }
        });
      },
    });
  };

  // deleting or removing user
  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "grey",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.BaseURI}/user/delete/${user.StaffID}`);
        // here we are filtering - the idea is remove an item from the serviceData array on a button click
        const removeItem = users.filter((deleteUser) => {
          // return the rest of the services that don't match the item we are deleting
          return deleteUser.StaffID !== user.StaffID;
        });
        // removeItem returns a new array - so now we are setting the serviceData to the new array
        setUsers(removeItem);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
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
            <>
              {loading ? (
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={50}
                  style={{ borderRadius: "5px" }}
                  // sx={theme && { bgcolor: "grey.900" }}
                />
              ) : (
                <Box className={styles.card} key={user.StaffID}>
                  <Box className={styles.user__name}>
                    {/* User Profile Picture and Name */}
                    <Image src={UserIcon} width="40px" height="40px" />
                    <Typography variant="body1" component="h5">
                      {user.FirstName + " " + user.LastName}
                      {user.StaffID == staffID && " (You)"}
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
                        user.Status
                          ? styles.user__status
                          : styles.user__status__deactivate
                      }
                    ></Box>
                    <Typography variant="body1" component="h5">
                      {user.Status ? "Activated" : "Deactivated"}
                    </Typography>
                  </Box>

                  {user.StaffID != staffID && (
                    <IconButton onClick={() => toggleAction(user)}>
                      <MoreVertIcon
                        style={{ color: user.action && "#B82623" }}
                      />
                    </IconButton>
                  )}
                  {user.StaffID == staffID && (
                    <Box style={{ color: "transparent", width: "40px" }}></Box>
                  )}

                  {/* display action option when user action state is true */}
                  {user.action && (
                    <motion.div
                      //  className={styles.register__container}
                      initial={{ x: "2vw" }}
                      animate={{ x: 0 }}
                      transition={{ type: "spring", stiffness: 450 }}
                    >
                      <Box className={styles.more}>
                        <Box className={styles.status}>
                          <AntSwitch
                            checked={user.Status == 1 ? true : false}
                            onChange={(e) => ToggleUpdateStatus(e, user)}
                          />
                          <Typography variant="body1" component="h5">
                            Status
                          </Typography>
                        </Box>
                        <Box
                          className={styles.edit}
                          onClick={() => handlesetRole(user)}
                        >
                          <ModeEditIcon fontSize="small" />
                          <Typography variant="body1" component="h5">
                            Set Role
                          </Typography>
                        </Box>
                        <Box
                          className={styles.delete}
                          onClick={() => handleDelete(user)}
                        >
                          <DeleteIcon fontSize="small" />
                          <Typography variant="body1" component="h5">
                            Remove
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  )}
                </Box>
              )}
            </>
          ))}
          {/* end card here */}
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
