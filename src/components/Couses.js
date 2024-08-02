import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import ButtonAppBar from "./AppBar";
import { AuthContext } from "../context/AuthContext";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(
        "https://bhasha-project-backend-production.up.railway.app/api/courses",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  return (
    <Box>
      <ButtonAppBar />
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Courses List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Course Name</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell align="center">{course.courseName}</TableCell>
                  <TableCell align="center">{course.department}</TableCell>
                  <TableCell align="center">{course.fee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CoursesTable;
