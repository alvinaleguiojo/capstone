import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import ArrowDown from "../assets/image/arrow-down.svg";
import { format } from "date-fns";
import Swal from "sweetalert2";
import axios from "axios";

export default function GridTable({
  rows,
  columns,
  path,
  maxHeight,
  firstRow,
  rowPerPage,
  showModal,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(firstRow);
  const router = useRouter();
  const [staffData, setStaffData] = useState(null);
  const [rowsData, setRowsData] = useState(rows);

  useEffect(() => {
    const PatientID = localStorage.getItem("StaffID");
    axios
      .get(`${process.env.BaseURI}/user/${PatientID}`)
      .then((response) => {
        setStaffData(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });

    // axios.get(`http://localhost:3001/appointments`);
    // then((response) => {
    //   setAppointmentsData()
    // }).catch((error) => {
    //   console.log(error.message);
    // });
  }, [router]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDiagnosis = async (row) => {
    console.log(row)
    const { value: updatedRole } = await Swal.fire({
      title: "Update Appoinment Status",
      input: "select",
      inputOptions: {
        Status: {
          Pending: "Pending",
          Ongoing: "Ongoing",
          Completed: "Completed",
          Cancelled: "Cancelled"
        },
      },
      inputPlaceholder: row.Status,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
            axios
              .patch(
                `${process.env.BaseURI}/appointment/update/${row.AppointmentID}`,
                {
                  ...row,
                  Status: value,
                }
              )
              .then(() => {
                setRowsData([...rowsData, { ...row, Status: updatedRole }]);
                const newValue = { ...row, Status: value };
                const updatedAppointment = rowsData.map(
                  (updateAppoinment) => {
                    return updateAppoinment.AppointmentID === row.AppointmentID
                      ? newValue
                      : updateAppoinment;
                  }
                );
                //setting updated appoinment status to rows data State
                setRowsData(updatedAppointment);
              })
              .then(() => {
                Swal.fire(
                  "Success!",
                  `Changes are saved!`,
                  "success"
                );
              });
          } else {
            resolve("You need to select a Role");
          }
        });
      },
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: maxHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => {
                            showModal
                              ? handleDiagnosis(row)
                              : router.push(`/${path}/${row.PatientID}`);
                          }}
                          disabled={true}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {/* return when no search results */}
        {rows.length <= 0 && (
          <Typography
            variant="body1"
            component="h5"
            color="#b82623"
            style={{
              textAlign: "center",
              padding: "10px",
            }}
          >
            No data or Phrase found
          </Typography>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[rowPerPage]} //Array number of rows per page sample [10, 25, 50]
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
