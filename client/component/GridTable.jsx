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

  useEffect(() => {
    const PatientID = localStorage.getItem("StaffID");
    axios
      .get(`http://localhost:3001/user/${PatientID}`)
      .then((response) => {
        setStaffData(response.data.result[0]);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [router]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDiagnosis = async () => {
    // const patietnName = `${patient[0].FirstName}  ${patient[0].LastName}`;
    const today = format(new Date(), "MMMM dd, yyyy");

    const { value: formValues } = await Swal.fire({
      title: "Diagnosis",
      html:
        // `<div class="diagnosis"><div class="input__wrapper"><label>Patient's Name</label><span>${patientName}</span></div>` +
        `<div class="input__wrapper"><label>Date</label><span>${today}</span></div>` +
        `<div class="input__wrapper"><label>Physician</label><span>${
          staffData.FirstName + " " + staffData.LastName
        }</span></div>` +
        '<div class="input__wrapper"><label>Diagnosis</label><input id="swal-input1"></div>' +
        '<div class="input__wrapper"><label>Additional Notes</label><textarea id="swal-input2"></textarea></div></div>',
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          // if (value[0] !== '') {
          //   resolve()
          // } else {
          //   resolve('You need to select oranges :)')
          // }
        });
      },
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      const PatientID = patient[0].PatientID;
      const StaffID = staffData.StaffID;
      const Diagnose = formValues[0];
      const Notes = formValues[1];

      try {
        axios
          .post("http://localhost:3001/diagnosis/create", {
            PatientID,
            StaffID,
            Diagnose,
            Notes,
          })
          .then(() => {
            Swal.fire("Success!", "Diagnosis has been added!", "success");
          });
      } catch (error) {
        console.log(error.message);
      }
    }
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
            {rows
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
                              ? handleDiagnosis()
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
