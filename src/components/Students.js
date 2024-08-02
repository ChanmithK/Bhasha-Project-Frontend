import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import ButtonAppBar from "./AppBar";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        "https://bhasha-project-backend-production.up.railway.app/api/students",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the students!", error);
      });
  }, [user.token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <ButtonAppBar />
      <Box sx={{ marginTop: 4, padding: 2 }}>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
          Student Details
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search students..."
          fullWidth
          sx={{ marginBottom: 2 }}
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Birthday</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Contact Number</TableCell>
                <TableCell align="center">Course</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell align="center">{student.firstName}</TableCell>
                  <TableCell align="center">{student.lastName}</TableCell>
                  <TableCell align="center">
                    {new Date(student.birthday).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">{student.address}</TableCell>
                  <TableCell align="center">{student.contactNumber}</TableCell>
                  <TableCell align="center">
                    {student.course ? student.course.courseName : "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    {student.course ? student.course.department : "N/A"}
                  </TableCell>
                  <TableCell align="center">
                    {student.course ? student.course.fee : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Students;
