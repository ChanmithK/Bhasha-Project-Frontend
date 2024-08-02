import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import ButtonAppBar from "./AppBar";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    address: "",
    contactNumber: "",
    course: "",
  });

  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
  }, [user.token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      course: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://bhasha-project-backend-production.up.railway.app/api/students",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setFormData({
          firstName: "",
          lastName: "",
          birthday: "",
          address: "",
          contactNumber: "",
          course: "",
        });
        navigate("/students");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box>
      <ButtonAppBar />
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Student
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Birthday"
            name="birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthday}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth required>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              name="course"
              value={formData.course}
              onChange={handleSelectChange}
              fullWidth
            >
              {courses.map((course) => (
                <MenuItem key={course._id} value={course._id}>
                  {course.courseName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Student
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddStudent;
